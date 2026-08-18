"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Tag,
  Filter,
  Sparkles,
  ChevronRight,
  ArrowRight,
  Plus,
} from "lucide-react";
import { EVENTS } from "@/lib/data/schoolData";

const CATEGORIES = ["All", "Upcoming", "Past Events", "Sports", "Academic", "Cultural", "Community"];

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState("All");

  const filteredEvents = EVENTS.filter((event) => {
    if (activeTab === "All") return true;
    if (activeTab === "Upcoming") return event.isUpcoming;
    if (activeTab === "Past Events") return !event.isUpcoming;
    return event.category.toLowerCase() === activeTab.toLowerCase();
  });

  return (
    <div className="min-h-screen bg-off-white">
      {/* Hero Header */}
      <section className="relative hero-gradient py-20 lg:py-28 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-gold-lighter text-xs font-semibold uppercase tracking-widest mb-4">
            <CalendarIcon size={14} /> School Activities & Schedules
          </span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Events & <span className="text-gradient-gold">Academic Calendar</span>
          </h1>
          <p className="text-white/80 text-lg max-w-3xl mx-auto leading-relaxed">
            From inter-school athletics championships and STEM science exhibitions to Parents&apos; Day cultural galas,
            discover the vibrant life of JHSS.
          </p>
        </div>
      </section>

      {/* Main Events Section */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-6">
          {/* Category Tabs */}
          <div className="flex items-center justify-center gap-2 flex-wrap mb-14">
            {CATEGORIES.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                  activeTab === tab
                    ? "bg-navy text-white shadow-md scale-105"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Events List */}
          <div className="space-y-8">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 grid lg:grid-cols-12 gap-0"
              >
                {/* Date Badge / Image Column */}
                <div className="lg:col-span-4 relative min-h-[240px] bg-gray-100 overflow-hidden">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/70 via-navy-dark/20 to-transparent" />
                  
                  {/* Floating Date Badge */}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md rounded-2xl p-3 text-center shadow-lg border border-white/40">
                    <span className="block text-xs font-bold text-gray-400 uppercase">
                      {new Date(event.date).toLocaleString("default", { month: "short" })}
                    </span>
                    <span className="block text-2xl font-black text-navy leading-tight">
                      {new Date(event.date).getDate()}
                    </span>
                    <span className="block text-[10px] font-semibold text-gold">
                      {new Date(event.date).getFullYear()}
                    </span>
                  </div>

                  {/* Status pill */}
                  <div className="absolute bottom-4 left-4">
                    <span
                      className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                        event.isUpcoming
                          ? "bg-gold text-white shadow-gold"
                          : "bg-white/20 backdrop-blur-md text-white border border-white/20"
                      }`}
                    >
                      {event.isUpcoming ? "Upcoming Event" : "Past Event"}
                    </span>
                  </div>
                </div>

                {/* Content Column */}
                <div className="lg:col-span-8 p-6 sm:p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-gold bg-gold/10 px-3 py-1 rounded-lg">
                        <Tag size={12} /> {event.category}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-navy text-2xl sm:text-3xl leading-snug mb-4">
                      {event.title}
                    </h3>

                    <p className="text-gray-600 text-sm leading-relaxed mb-6">
                      {event.description}
                    </p>

                    {/* Metadata chips */}
                    <div className="grid sm:grid-cols-2 gap-3 mb-6">
                      <div className="flex items-center gap-2.5 text-xs text-gray-600 bg-gray-50 p-3 rounded-xl">
                        <Clock size={16} className="text-navy flex-shrink-0" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-xs text-gray-600 bg-gray-50 p-3 rounded-xl">
                        <MapPin size={16} className="text-navy flex-shrink-0" />
                        <span className="truncate">{event.venue}</span>
                      </div>
                    </div>
                  </div>

                  {/* Footer actions */}
                  <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
                    <Link
                      href="/contact"
                      className="text-xs font-bold text-navy hover:text-gold flex items-center gap-1.5 transition-colors"
                    >
                      Inquire with Organizer <ChevronRight size={14} />
                    </Link>

                    {event.isUpcoming && (
                      <a
                        href={`https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
                          event.title
                        )}&dates=${event.date.replace(/-/g, "")}T040000Z/${event.date.replace(/-/g, "")}T100000Z&details=${encodeURIComponent(
                          event.description
                        )}&location=${encodeURIComponent(event.venue)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs font-bold bg-navy text-white px-5 py-2.5 rounded-full hover:bg-gold transition-colors shadow-sm"
                      >
                        <Plus size={14} /> Add to Google Calendar
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-20 bg-white rounded-3xl border border-gray-100">
              <CalendarIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <h3 className="font-bold text-navy text-lg">No events found in this category</h3>
              <button
                onClick={() => setActiveTab("All")}
                className="mt-4 text-xs font-semibold text-gold hover:underline"
              >
                View all scheduled events
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Annual Event Highlights */}
      <section className="section-padding bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full bg-navy/8 text-navy text-xs font-semibold uppercase tracking-widest mb-4">
              Annual Traditions
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy">
              Year-Round Student <span className="text-gradient-gold">Enrichment</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                season: "Baishakh - Jestha",
                title: "Welcome & House Induction",
                desc: "Welcoming new students, introducing student council, and establishing house captains.",
              },
              {
                season: "Bhadra - Ashwin",
                title: "Mid-Term & Science Fair",
                desc: "Terminal assessments followed by district-level STEM project presentations.",
              },
              {
                season: "Mangsir - Poush",
                title: "Annual Sports Week",
                desc: "7-day inter-house championship in volleyball, football, track, chess, and badminton.",
              },
              {
                season: "Magh - Falgun",
                title: "Parents Day & SEE Farewell",
                desc: "Cultural folk celebrations, student awards, and blessing ceremony for Class 10 & 12.",
              },
            ].map((tradition, idx) => (
              <div
                key={idx}
                className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow"
              >
                <span className="text-xs font-bold uppercase tracking-wider text-gold block mb-2">
                  {tradition.season}
                </span>
                <h3 className="font-bold text-navy text-lg mb-2">{tradition.title}</h3>
                <p className="text-gray-600 text-xs leading-relaxed">{tradition.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
