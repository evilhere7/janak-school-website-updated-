import type { User as FirebaseUser } from "firebase/auth";

export type UserRole = "student" | "teacher" | "parent" | "admin";

export interface UserProfile {
  uid: string;
  email: string;
  fullName: string;
  role: UserRole;
  photoURL?: string | null;
  phoneNumber?: string;
  
  // Role specific fields
  studentId?: string;       // For students
  grade?: string;           // For students (e.g. "Class 10 - English Medium")
  section?: string;         // For students
  rollNumber?: string;      // For students
  
  employeeId?: string;      // For teachers & staff
  department?: string;      // For teachers (e.g. "Science", "Mathematics")
  subjects?: string[];      // For teachers
  
  wardName?: string;        // For parents (child's name)
  wardStudentId?: string;   // For parents (child's student ID)
  wardGrade?: string;       // For parents (child's class)
  
  adminDesignation?: string;// For administrators
  
  createdAt?: string;
  updatedAt?: string;
  isActive?: boolean;
}

export interface AuthContextType {
  user: FirebaseUser | null;
  userProfile: UserProfile | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    password: string,
    profileData: Omit<UserProfile, "uid" | "email" | "createdAt" | "updatedAt">
  ) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  sendEmailVerificationMail: () => Promise<void>;
  reauthenticateUser: (password: string) => Promise<void>;
  updateProfileData: (data: Partial<UserProfile>) => Promise<void>;
  refreshProfile: () => Promise<void>;
}
