import { supabase } from "@/lib/supabase";
import type { EventRow } from "@/types/database";
import { EVENTS } from "@/lib/data/schoolData";

export interface SchoolEvent {
  id: string;
  title: string;
  category: string;
  date: string;
  time: string;
  venue: string;
  description: string;
  isUpcoming: boolean;
  image: string;
}

export const eventService = {
  /**
   * Fetch all calendar events from Supabase with fallback
   */
  async getEvents(): Promise<SchoolEvent[]> {
    try {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("event_date", { ascending: true });

      if (error || !data || data.length === 0) {
        return EVENTS.map((e) => ({
          id: e.id,
          title: e.title,
          category: e.category,
          date: e.date,
          time: e.time,
          venue: e.venue,
          description: e.description,
          isUpcoming: e.isUpcoming,
          image: e.image,
        }));
      }

      return data.map((row: EventRow) => ({
        id: row.id,
        title: row.title,
        category: row.category,
        date: row.event_date,
        time: row.time,
        venue: row.location,
        description: row.description,
        isUpcoming: row.is_upcoming,
        image: row.image_url || "/assets/gallery/golden-jubilee_30.jpg",
      }));
    } catch {
      return EVENTS.map((e) => ({
        id: e.id,
        title: e.title,
        category: e.category,
        date: e.date,
        time: e.time,
        venue: e.venue,
        description: e.description,
        isUpcoming: e.isUpcoming,
        image: e.image,
      }));
    }
  },

  /**
   * Add a new event to Supabase
   */
  async createEvent(event: Omit<SchoolEvent, "id">): Promise<boolean> {
    try {
      const { error } = await supabase.from("events").insert({
        title: event.title,
        description: event.description,
        category: event.category,
        event_date: event.date,
        time: event.time,
        location: event.venue,
        image_url: event.image,
        is_upcoming: event.isUpcoming,
      });

      if (error) {
        console.error("Error creating event:", error);
        return false;
      }
      return true;
    } catch (err) {
      console.error("Event creation error:", err);
      return false;
    }
  },
};
