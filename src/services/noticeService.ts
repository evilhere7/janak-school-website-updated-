import { supabase } from "@/lib/supabase";
import type { NoticeRow } from "@/types/database";
import { NOTICES } from "@/lib/data/schoolData";
import { sanitizeHtml, sanitizeText } from "@/lib/security/sanitize";

export interface SchoolNotice {
  id: string;
  title: string;
  category: "ADMISSION" | "EXAM" | "TENDER" | "GENERAL" | string;
  isImportant: boolean;
  date: string;
  description: string;
  pdfUrl?: string | null;
}

export const noticeService = {
  /**
   * Fetch all notices from Supabase with fallback to static seed data
   */
  async getNotices(category?: string): Promise<SchoolNotice[]> {
    try {
      let query = supabase
        .from("notices")
        .select("*")
        .order("published_at", { ascending: false });

      if (category && category !== "ALL") {
        query = query.eq("category", sanitizeText(category));
      }

      const { data, error } = await query;

      if (error || !data || data.length === 0) {
        // Fallback to verified local notices catalog
        return NOTICES.filter(
          (n) => !category || category === "ALL" || n.category === category
        ).map((n) => ({
          id: n.id,
          title: n.title,
          category: n.category,
          isImportant: n.isImportant,
          date: n.date,
          description: n.description,
          pdfUrl: (n as any).pdfUrl || null,
        }));
      }

      return data.map((row: NoticeRow) => ({
        id: row.id,
        title: row.title,
        category: row.category,
        isImportant: row.is_important,
        date: row.published_at,
        description: row.description,
        pdfUrl: row.attachment_url,
      }));
    } catch {
      return NOTICES.map((n) => ({
        id: n.id,
        title: n.title,
        category: n.category,
        isImportant: n.isImportant,
        date: n.date,
        description: n.description,
        pdfUrl: (n as any).pdfUrl || null,
      }));
    }
  },

  /**
   * Publish a new notice to Supabase with input sanitization
   */
  async publishNotice(notice: {
    title: string;
    description: string;
    category: string;
    isImportant?: boolean;
    attachmentUrl?: string | null;
  }): Promise<boolean> {
    try {
      const cleanTitle = sanitizeText(notice.title);
      const cleanDescription = sanitizeHtml(notice.description);
      const cleanCategory = sanitizeText(notice.category).toUpperCase();

      const { error } = await supabase.from("notices").insert({
        title: cleanTitle,
        description: cleanDescription,
        category: cleanCategory,
        is_important: notice.isImportant || false,
        attachment_url: notice.attachmentUrl ? sanitizeText(notice.attachmentUrl) : null,
        published_at: new Date().toISOString().split("T")[0],
      });

      if (error) {
        console.error("Error publishing notice:", error);
        return false;
      }
      return true;
    } catch (err) {
      console.error("Notice publish error:", err);
      return false;
    }
  },
};
