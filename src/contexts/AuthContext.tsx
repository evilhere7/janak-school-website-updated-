"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile as updateFirebaseProfile,
  type User as FirebaseUser,
} from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/config/firebase";
import { profileService } from "@/services/profileService";
import type { UserProfile, AuthContextType, UserRole } from "@/types/auth";

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
      return "Password is too weak. Please use at least 6 characters with letters and numbers.";
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/user-disabled":
      return "This account has been disabled by the school administrator. Please contact the office.";
    case "auth/too-many-requests":
      return "Access to this account has been temporarily disabled due to many failed login attempts. You can reset your password or try again later.";
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
          profileService.syncProfileWithFirebase(firebaseUser.uid, {
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
          }).catch(() => {});
          return;
        }
      } catch (firestoreErr: any) {
        // Firestore offline / uninitialized in console - silently use local auth user profile
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
      profileService.syncProfileWithFirebase(firebaseUser.uid, {
        fullName: fallbackProfile.fullName,
        email: fallbackProfile.email,
        role: fallbackProfile.role,
      }).catch(() => {});
    } catch (error) {
      // Clean fallback
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

  // Login handler
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email.trim(), password);
      await fetchUserProfile(userCredential.user);
    } finally {
      setLoading(false);
    }
  };

  // Register handler
  const register = async (
    email: string,
    password: string,
    profileData: Omit<UserProfile, "uid" | "email" | "createdAt" | "updatedAt">
  ) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password);
      const newUser = userCredential.user;

      // Update Firebase Auth display name
      await updateFirebaseProfile(newUser, {
        displayName: profileData.fullName,
      });

      // Construct Firestore user record
      const newProfile: UserProfile = {
        ...profileData,
        uid: newUser.uid,
        email: newUser.email || email.trim(),
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

      setUserProfile(newProfile);
    } finally {
      setLoading(false);
    }
  };

  // Logout handler
  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setUser(null);
      setUserProfile(null);
    } finally {
      setLoading(false);
    }
  };

  // Password Reset handler
  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email.trim());
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
