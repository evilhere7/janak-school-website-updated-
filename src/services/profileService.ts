import { supabase } from "@/lib/supabase";
import type { ProfileRow } from "@/types/database";
import type { UserRole } from "@/types/auth";

export const profileService = {
  /**
   * Fetch a user profile by their Firebase UID
   */
  async getProfileByFirebaseUid(firebaseUid: string): Promise<ProfileRow | null> {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("firebase_uid", firebaseUid)
        .maybeSingle();

      if (error || !data) {
        return null;
      }
      return data;
    } catch {
      return null;
    }
  },

  /**
   * Create or update a user profile in Supabase linked with Firebase UID
   */
  async syncProfileWithFirebase(
    firebaseUid: string,
    profileData: {
      fullName: string;
      email: string;
      role: UserRole;
      phone?: string;
      photoURL?: string | null;
      studentId?: string;
      grade?: string;
      employeeId?: string;
      department?: string;
      wardName?: string;
      wardStudentId?: string;
    }
  ): Promise<ProfileRow | null> {
    try {
      // 1. Upsert profile table
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .upsert(
          {
            firebase_uid: firebaseUid,
            full_name: profileData.fullName,
            email: profileData.email,
            phone: profileData.phone || null,
            profile_photo_url: profileData.photoURL || null,
            role: profileData.role,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "firebase_uid" }
        )
        .select()
        .single();

      if (profileError || !profile) {
        return null;
      }

      // 2. Upsert role-specific table if relevant
      if (profileData.role === "student" && profileData.studentId) {
        await supabase.from("students").upsert(
          {
            profile_id: profile.id,
            student_id: profileData.studentId,
            grade_name: profileData.grade || null,
          },
          { onConflict: "student_id" }
        );
      } else if (profileData.role === "teacher" && profileData.employeeId) {
        await supabase.from("teachers").upsert(
          {
            profile_id: profile.id,
            employee_id: profileData.employeeId,
            department: profileData.department || "General",
          },
          { onConflict: "employee_id" }
        );
      }

      return profile;
    } catch {
      return null;
    }
  },
};
