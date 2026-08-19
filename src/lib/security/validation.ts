import { z } from "zod";

/**
 * Common regex patterns and custom validators
 */
export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
export const PHONE_NEPAL_REGEX = /^(\+977)?[9][6-8]\d{8}$|^0\d{8,9}$/;
export const SYMBOL_NUMBER_REGEX = /^[A-Za-z0-9\-\/]{4,20}$/;

/**
 * Login Schema
 */
export const LoginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email address is required")
    .email("Please provide a valid email address")
    .max(100, "Email address is too long"),
  password: z
    .string()
    .min(1, "Password is required")
    .max(128, "Password must not exceed 128 characters"),
  rememberMe: z.boolean().optional(),
});

export type LoginInput = z.infer<typeof LoginSchema>;

/**
 * Password Complexity Schema (Used for registration and password changes)
 */
export const PasswordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long")
  .max(128, "Password cannot exceed 128 characters")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/\d/, "Password must contain at least one number");

/**
 * Registration Schema
 */
export const RegisterSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name cannot exceed 100 characters")
    .regex(/^[a-zA-Z\s\.\'\-]+$/, "Full name contains invalid characters"),
  email: z
    .string()
    .trim()
    .min(1, "Email address is required")
    .email("Please enter a valid email address")
    .max(100, "Email address is too long"),
  password: PasswordSchema,
  role: z.enum(["student", "teacher", "parent", "admin"], {
    error: "Invalid role selected",
  }),
  phoneNumber: z
    .string()
    .trim()
    .optional()
    .refine(
      (val) => !val || PHONE_NEPAL_REGEX.test(val) || val.length >= 7,
      "Please enter a valid contact phone number"
    ),
  // Student Specific
  studentId: z.string().trim().max(30).optional(),
  grade: z.string().trim().max(50).optional(),
  rollNumber: z.string().trim().max(20).optional(),
  // Teacher Specific
  employeeId: z.string().trim().max(30).optional(),
  department: z.string().trim().max(50).optional(),
  // Parent Specific
  wardName: z.string().trim().max(100).optional(),
  wardStudentId: z.string().trim().max(30).optional(),
});

export type RegisterInput = z.infer<typeof RegisterSchema>;

/**
 * Profile Update Schema
 */
export const ProfileUpdateSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name cannot exceed 100 characters")
    .optional(),
  phoneNumber: z.string().trim().max(20).optional(),
  photoURL: z.string().url("Invalid image URL").optional().nullable().or(z.literal("")),
  grade: z.string().trim().max(50).optional(),
  section: z.string().trim().max(10).optional(),
  rollNumber: z.string().trim().max(20).optional(),
  department: z.string().trim().max(50).optional(),
  wardName: z.string().trim().max(100).optional(),
  wardStudentId: z.string().trim().max(30).optional(),
});

export type ProfileUpdateInput = z.infer<typeof ProfileUpdateSchema>;

/**
 * Marksheet Result Search Schema
 */
export const ResultSearchSchema = z.object({
  symbolNumber: z
    .string()
    .trim()
    .min(3, "Symbol number must be at least 3 characters")
    .max(30, "Symbol number cannot exceed 30 characters")
    .regex(SYMBOL_NUMBER_REGEX, "Symbol number contains invalid characters"),
  dob: z
    .string()
    .trim()
    .optional()
    .refine((val) => !val || /^\d{4}-\d{2}-\d{2}$/.test(val), "Date of Birth must be in YYYY-MM-DD format"),
});

export type ResultSearchInput = z.infer<typeof ResultSearchSchema>;

/**
 * Contact / Inquiry Form Schema
 */
export const ContactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name is required (at least 2 characters)")
    .max(100, "Name is too long"),
  email: z
    .string()
    .trim()
    .email("Please provide a valid email address")
    .max(100, "Email is too long"),
  phone: z
    .string()
    .trim()
    .optional()
    .refine((val) => !val || val.length >= 7, "Phone number is too short"),
  subject: z
    .string()
    .trim()
    .min(3, "Subject must be at least 3 characters")
    .max(150, "Subject cannot exceed 150 characters"),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message cannot exceed 2000 characters"),
});

export type ContactFormInput = z.infer<typeof ContactFormSchema>;

/**
 * Notice Creation / Edit Schema
 */
export const NoticeSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters")
    .max(200, "Title is too long"),
  description: z
    .string()
    .trim()
    .min(5, "Description must be at least 5 characters")
    .max(5000, "Description is too long"),
  category: z.enum(["GENERAL", "ACADEMIC", "EXAM", "ADMISSION", "TENDER", "EVENT", "HOLIDAY"]),
  attachmentUrl: z.string().url("Invalid URL").optional().nullable().or(z.literal("")),
  isImportant: z.boolean().default(false),
  publishedAt: z.string().optional(),
});

export type NoticeInput = z.infer<typeof NoticeSchema>;

/**
 * Event Creation / Edit Schema
 */
export const EventSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Event title must be at least 3 characters")
    .max(200, "Event title is too long"),
  description: z
    .string()
    .trim()
    .min(5, "Event description must be at least 5 characters")
    .max(5000, "Event description is too long"),
  category: z.string().trim().min(2).max(50),
  eventDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Event date must be in YYYY-MM-DD format"),
  time: z.string().trim().min(1).max(50),
  location: z.string().trim().min(2).max(150),
  imageUrl: z.string().url("Invalid image URL").optional().nullable().or(z.literal("")),
  isUpcoming: z.boolean().default(true),
});

export type EventInput = z.infer<typeof EventSchema>;

/**
 * Helper to validate data and return structured error messages or typed data
 */
export function validateData<T>(schema: z.ZodSchema<T>, data: unknown): { success: true; data: T } | { success: false; errors: Record<string, string> } {
  const result = schema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }

  const errors: Record<string, string> = {};
  for (const issue of result.error.issues) {
    const path = issue.path.join(".") || "form";
    if (!errors[path]) {
      errors[path] = issue.message;
    }
  }

  return { success: false, errors };
}
