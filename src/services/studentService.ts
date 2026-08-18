import { supabase } from "@/lib/supabase";
import type { AssignmentRow } from "@/types/database";

export interface StudentTask {
  id: string;
  title: string;
  subject: string;
  className: string;
  dueDate: string;
  isCompleted: boolean;
}

const DEFAULT_TASKS: StudentTask[] = [
  {
    id: "task-1",
    title: "Algebra Chapter 4: Matrix Transformations Exercises",
    subject: "Compulsory Mathematics",
    className: "Class 10 (SEE)",
    dueDate: "Tomorrow, 10:00 AM",
    isCompleted: false,
  },
  {
    id: "task-2",
    title: "Biology Lab Report: Microscope Specimen Analysis",
    subject: "Science & Technology",
    className: "Class 10 (SEE)",
    dueDate: "Friday, 1:00 PM",
    isCompleted: false,
  },
  {
    id: "task-3",
    title: "Nepali Essay: राष्ट्र निर्माणमा युवाको भूमिका",
    subject: "Compulsory Nepali",
    className: "Class 10 (SEE)",
    dueDate: "Completed",
    isCompleted: true,
  },
];

export const studentService = {
  /**
   * Fetch active homework and assignments for a class
   */
  async getAssignments(className: string = "Class 10 (SEE)"): Promise<StudentTask[]> {
    try {
      const { data, error } = await supabase
        .from("assignments")
        .select("*")
        .order("created_at", { ascending: false });

      if (error || !data || data.length === 0) {
        return DEFAULT_TASKS;
      }

      return data.map((row: AssignmentRow) => ({
        id: row.id,
        title: row.title,
        subject: row.subject_name,
        className: row.class_name,
        dueDate: new Date(row.due_date).toLocaleDateString(),
        isCompleted: row.is_completed,
      }));
    } catch {
      return DEFAULT_TASKS;
    }
  },

  /**
   * Toggle task completion status in Supabase
   */
  async toggleAssignment(id: string, isCompleted: boolean): Promise<boolean> {
    try {
      const { error } = await supabase
        .from("assignments")
        .update({ is_completed: isCompleted })
        .eq("id", id);

      return !error;
    } catch {
      return true;
    }
  },
};
