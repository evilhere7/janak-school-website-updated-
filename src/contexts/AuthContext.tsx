"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  sendEmailVerification,
  reauthenticateWithCredential,
  EmailAuthProvider,
  updateProfile as updateFirebaseProfile,
  type User as FirebaseUser,
} from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/config/firebase";
import { profileService } from "@/services/profileService";
import { auditService } from "@/services/auditService";
import { checkRateLimit, resetRateLimit } from "@/lib/security/rateLimit";
import type { UserProfile, AuthContextType } from "@/types/auth";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Friendly human-readable Firebase Auth error translator
export function getFriendlyAuthErrorMessage(errorCode: string): string {
  switch (errorCode) {
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "Incorrect email or password. Please verify your credentials and try again.";
    case "auth/email-already-in-use":
      return "An account with this email address already exists. Please log in instead.";
    case "auth/weak-password":
      return "Password is too weak. Please use at least 8 characters with uppercase, lowercase, and numbers.";
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/user-disabled":
      return "This account has been disabled by the school administrator. Please contact the office.";
    case "auth/too-many-requests":
      return "Access to this account has been temporarily locked due to many failed login attempts. Please reset your password or try again later.";
    case "auth/network-request-failed":
      return "Network connection failed. Please check your internet connectivity.";
    case "auth/requires-recent-login":
      return "This operation is sensitive and requires recent authentication. Please log in again.";
    default:
      return "An authentication error occurred. Please try again.";
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch or sync user profile from Firestore with Supabase & local fallback
  const fetchUserProfile = useCallback(async (firebaseUser: FirebaseUser) => {
    try {
      // 1. Try fetching from Supabase first
      const supabaseProfile = await profileService.getProfileByFirebaseUid(firebaseUser.uid);
      if (supabaseProfile) {
        setUserProfile({
          uid: firebaseUser.uid,
          email: supabaseProfile.email,
          fullName: supabaseProfile.full_name,
          role: supabaseProfile.role,
          photoURL: supabaseProfile.profile_photo_url,
          phoneNumber: supabaseProfile.phone || undefined,
        });
        return;
      }

      // 2. Try Firestore
      try {
        const userDocRef = doc(db, "users", firebaseUser.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const data = userDocSnap.data() as UserProfile;
          setUserProfile(data);

          // Async sync to Supabase
          profileService
            .syncProfileWithFirebase(firebaseUser.uid, {
              fullName: data.fullName,
              email: data.email,
              role: data.role,
              phone: data.phoneNumber,
              photoURL: data.photoURL,
              studentId: data.studentId,
              grade: data.grade,
              employeeId: data.employeeId,
              department: data.department,
              wardName: data.wardName,
              wardStudentId: data.wardStudentId,
            })
            .catch(() => {});
          return;
        }
      } catch (firestoreErr: any) {
        console.debug("Firestore offline notice, using auth profile:", firestoreErr?.message);
      }

      // 3. Fallback standard profile from Firebase User credentials
      const fallbackProfile: UserProfile = {
        uid: firebaseUser.uid,
        email: firebaseUser.email || "",
        fullName: firebaseUser.displayName || firebaseUser.email?.split("@")[0] || "JHSS Member",
        role: "student",
        photoURL: firebaseUser.photoURL || null,
        createdAt: new Date().toISOString(),
        isActive: true,
      };

      setUserProfile(fallbackProfile);

      // Attempt background sync to Supabase
      profileService
        .syncProfileWithFirebase(firebaseUser.uid, {
          fullName: fallbackProfile.fullName,
          email: fallbackProfile.email,
          role: fallbackProfile.role,
        })
        .catch(() => {});
    } catch {
      setUserProfile({
        uid: firebaseUser.uid,
        email: firebaseUser.email || "",
        fullName: firebaseUser.displayName || "JHSS Member",
        role: "student",
      });
    }
  }, []);

  const refreshProfile = useCallback(async () => {
    if (auth.currentUser) {
      await fetchUserProfile(auth.currentUser);
    }
  }, [fetchUserProfile]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        await fetchUserProfile(currentUser);
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [fetchUserProfile]);

  // Secure Login with Rate Limiting & Audit Logging
  const login = async (email: string, password: string) => {
    const trimmedEmail = email.trim().toLowerCase();

    // Rate Limit Check
    const rateLimit = checkRateLimit(trimmedEmail, "LOGIN");
    if (!rateLimit.allowed) {
      const minutes = Math.ceil(rateLimit.retryAfterSeconds / 60);
      const errMsg = `Too many failed login attempts. For security, please wait ${minutes} minute(s) before trying again.`;
      await auditService.logEvent({
        action: "RATE_LIMIT_EXCEEDED",
        userEmail: trimmedEmail,
        severity: "warning",
        details: { action: "LOGIN", retryAfterSeconds: rateLimit.retryAfterSeconds },
      });
      throw new Error(errMsg);
    }

    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, trimmedEmail, password);
      
      // Reset rate limit on successful authentication
      resetRateLimit(trimmedEmail, "LOGIN");

      // Audit Log Success
      await auditService.logEvent({
        action: "LOGIN_SUCCESS",
        userId: userCredential.user.uid,
        userEmail: trimmedEmail,
        severity: "info",
      });

      await fetchUserProfile(userCredential.user);
    } catch (err: any) {
      // Audit Log Failure
      await auditService.logFailedLogin(trimmedEmail, err?.code || err?.message || "Invalid credentials");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Secure Registration with Rate Limiting & Audit Logging
  const register = async (
    email: string,
    password: string,
    profileData: Omit<UserProfile, "uid" | "email" | "createdAt" | "updatedAt">
  ) => {
    const trimmedEmail = email.trim().toLowerCase();

    // Rate Limit Check for registrations
    const rateLimit = checkRateLimit(trimmedEmail, "REGISTRATION");
    if (!rateLimit.allowed) {
      throw new Error("Registration limit exceeded for this session. Please try again later.");
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, trimmedEmail, password);
      const newUser = userCredential.user;

      // Update Firebase Auth display name
      await updateFirebaseProfile(newUser, {
        displayName: profileData.fullName,
      });

      // Construct Firestore user record
      const newProfile: UserProfile = {
        ...profileData,
        uid: newUser.uid,
        email: newUser.email || trimmedEmail,
        createdAt: new Date().toISOString(),
        isActive: true,
      };

      await setDoc(doc(db, "users", newUser.uid), {
        ...newProfile,
        serverTimestamp: serverTimestamp(),
      });

      // Sync to Supabase PostgreSQL database
      await profileService.syncProfileWithFirebase(newUser.uid, {
        fullName: profileData.fullName,
        email: newProfile.email,
        role: profileData.role,
        phone: profileData.phoneNumber,
        studentId: profileData.studentId,
        grade: profileData.grade,
        employeeId: profileData.employeeId,
        department: profileData.department,
        wardName: profileData.wardName,
        wardStudentId: profileData.wardStudentId,
      });

      // Audit Log Registration
      await auditService.logEvent({
        action: "REGISTER_SUCCESS",
        userId: newUser.uid,
        userEmail: trimmedEmail,
        userRole: profileData.role,
        severity: "info",
      });

      setUserProfile(newProfile);
    } finally {
      setLoading(false);
    }
  };

  // Secure Logout
  const logout = async () => {
    const currentUser = auth.currentUser;
    setLoading(true);
    try {
      if (currentUser) {
        await auditService.logEvent({
          action: "LOGOUT",
          userId: currentUser.uid,
          userEmail: currentUser.email,
          severity: "info",
        });
      }
      await signOut(auth);
      setUser(null);
      setUserProfile(null);
    } finally {
      setLoading(false);
    }
  };

  // Password Reset with Rate Limiting
  const resetPassword = async (email: string) => {
    const trimmedEmail = email.trim().toLowerCase();

    const rateLimit = checkRateLimit(trimmedEmail, "PASSWORD_RESET");
    if (!rateLimit.allowed) {
      throw new Error("Too many password reset requests. Please check your inbox or wait before retrying.");
    }

    await sendPasswordResetEmail(auth, trimmedEmail);

    await auditService.logEvent({
      action: "PASSWORD_RESET_REQUESTED",
      userEmail: trimmedEmail,
      severity: "info",
    });
  };

  // Send Email Verification Mail
  const sendEmailVerificationMail = async () => {
    if (!auth.currentUser) {
      throw new Error("No authenticated user found.");
    }
    await sendEmailVerification(auth.currentUser);
    await auditService.logEvent({
      action: "EMAIL_VERIFICATION_SENT",
      userId: auth.currentUser.uid,
      userEmail: auth.currentUser.email,
      severity: "info",
    });
  };

  // Re-authenticate User with Current Password for sensitive operations
  const reauthenticateUser = async (password: string) => {
    if (!auth.currentUser || !auth.currentUser.email) {
      throw new Error("No authenticated user found.");
    }
    const credential = EmailAuthProvider.credential(auth.currentUser.email, password);
    await reauthenticateWithCredential(auth.currentUser, credential);
  };

  // Update Profile handler
  const updateProfileData = async (data: Partial<UserProfile>) => {
    if (!user) throw new Error("User must be authenticated to update profile");

    const userDocRef = doc(db, "users", user.uid);
    const updated = {
      ...data,
      updatedAt: new Date().toISOString(),
    };

    await updateDoc(userDocRef, updated);

    if (data.fullName && user) {
      await updateFirebaseProfile(user, { displayName: data.fullName });
    }

    // Sync changes to Supabase
    await profileService.syncProfileWithFirebase(user.uid, {
      fullName: data.fullName || userProfile?.fullName || "",
      email: user.email || "",
      role: data.role || userProfile?.role || "student",
      phone: data.phoneNumber,
      photoURL: data.photoURL,
      studentId: data.studentId,
      grade: data.grade,
      employeeId: data.employeeId,
      department: data.department,
      wardName: data.wardName,
      wardStudentId: data.wardStudentId,
    });

    await auditService.logEvent({
      action: "PROFILE_UPDATED",
      userId: user.uid,
      userEmail: user.email,
      userRole: userProfile?.role,
      severity: "info",
      details: { fieldsUpdated: Object.keys(data) },
    });

    setUserProfile((prev) => (prev ? { ...prev, ...updated } : null));
  };

  const value: AuthContextType = {
    user,
    userProfile,
    loading,
    login,
    register,
    logout,
    resetPassword,
    sendEmailVerificationMail,
    reauthenticateUser,
    updateProfileData,
    refreshProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
