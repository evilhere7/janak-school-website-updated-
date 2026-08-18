export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          firebase_uid: string;
          full_name: string;
          email: string;
          phone: string | null;
          profile_photo_url: string | null;
          role: "student" | "teacher" | "parent" | "admin";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          firebase_uid: string;
          full_name: string;
          email: string;
          phone?: string | null;
          profile_photo_url?: string | null;
          role?: "student" | "teacher" | "parent" | "admin";
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          firebase_uid?: string;
          full_name?: string;
          email?: string;
          phone?: string | null;
          profile_photo_url?: string | null;
          role?: "student" | "teacher" | "parent" | "admin";
          created_at?: string;
          updated_at?: string;
        };
      };
      students: {
        Row: {
          id: string;
          profile_id: string;
          student_id: string;
          class_id: string | null;
          grade_name: string | null;
          section: string | null;
          roll_number: string | null;
          date_of_birth: string | null;
          guardian_id: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          profile_id: string;
          student_id: string;
          class_id?: string | null;
          grade_name?: string | null;
          section?: string | null;
          roll_number?: string | null;
          date_of_birth?: string | null;
          guardian_id?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          profile_id?: string;
          student_id?: string;
          class_id?: string | null;
          grade_name?: string | null;
          section?: string | null;
          roll_number?: string | null;
          date_of_birth?: string | null;
          guardian_id?: string | null;
          created_at?: string;
        };
      };
      teachers: {
        Row: {
          id: string;
          profile_id: string;
          employee_id: string;
          department: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          profile_id: string;
          employee_id: string;
          department: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          profile_id?: string;
          employee_id?: string;
          department?: string;
          created_at?: string;
        };
      };
      classes: {
        Row: {
          id: string;
          name: string;
          section: string;
          academic_year: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          section: string;
          academic_year: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          section?: string;
          academic_year?: string;
          created_at?: string;
        };
      };
      subjects: {
        Row: {
          id: string;
          name: string;
          code: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          code: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          code?: string;
          created_at?: string;
        };
      };
      attendance: {
        Row: {
          id: string;
          student_id: string;
          date: string;
          status: "present" | "absent" | "late" | "excused";
          marked_by: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          student_id: string;
          date: string;
          status: "present" | "absent" | "late" | "excused";
          marked_by?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          student_id?: string;
          date?: string;
          status?: "present" | "absent" | "late" | "excused";
          marked_by?: string | null;
          created_at?: string;
        };
      };
      notices: {
        Row: {
          id: string;
          title: string;
          description: string;
          category: string;
          attachment_url: string | null;
          is_important: boolean;
          published_by: string | null;
          published_at: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          category: string;
          attachment_url?: string | null;
          is_important?: boolean;
          published_by?: string | null;
          published_at?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          category?: string;
          attachment_url?: string | null;
          is_important?: boolean;
          published_by?: string | null;
          published_at?: string;
          created_at?: string;
        };
      };
      assignments: {
        Row: {
          id: string;
          title: string;
          description: string;
          subject_name: string;
          class_name: string;
          teacher_id: string | null;
          due_date: string;
          attachment_url: string | null;
          is_completed: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          subject_name: string;
          class_name: string;
          teacher_id?: string | null;
          due_date: string;
          attachment_url?: string | null;
          is_completed?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          subject_name?: string;
          class_name?: string;
          teacher_id?: string | null;
          due_date?: string;
          attachment_url?: string | null;
          is_completed?: boolean;
          created_at?: string;
        };
      };
      results: {
        Row: {
          id: string;
          student_name: string;
          symbol_number: string;
          exam_name: string;
          grade_level: string;
          dob: string | null;
          gpa: string;
          grade_letter: string;
          subjects_data: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          student_name: string;
          symbol_number: string;
          exam_name: string;
          grade_level: string;
          dob?: string | null;
          gpa: string;
          grade_letter: string;
          subjects_data: Json;
          created_at?: string;
        };
        Update: {
          id?: string;
          student_name?: string;
          symbol_number?: string;
          exam_name?: string;
          grade_level?: string;
          dob?: string | null;
          gpa?: string;
          grade_letter?: string;
          subjects_data?: Json;
          created_at?: string;
        };
      };
      events: {
        Row: {
          id: string;
          title: string;
          description: string;
          category: string;
          event_date: string;
          time: string;
          location: string;
          image_url: string | null;
          is_upcoming: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          category: string;
          event_date: string;
          time: string;
          location: string;
          image_url?: string | null;
          is_upcoming?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          category?: string;
          event_date?: string;
          time?: string;
          location?: string;
          image_url?: string | null;
          is_upcoming?: boolean;
          created_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      user_role: "student" | "teacher" | "parent" | "admin";
      attendance_status: "present" | "absent" | "late" | "excused";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

export type ProfileRow = Database["public"]["Tables"]["profiles"]["Row"];
export type StudentRow = Database["public"]["Tables"]["students"]["Row"];
export type TeacherRow = Database["public"]["Tables"]["teachers"]["Row"];
export type NoticeRow = Database["public"]["Tables"]["notices"]["Row"];
export type AssignmentRow = Database["public"]["Tables"]["assignments"]["Row"];
export type ResultRow = Database["public"]["Tables"]["results"]["Row"];
export type EventRow = Database["public"]["Tables"]["events"]["Row"];
export type AttendanceRow = Database["public"]["Tables"]["attendance"]["Row"];
