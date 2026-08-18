"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Bell,
  Search,
  Download,
  AlertCircle,
  Calendar,
  FileText,
  Filter,
  Eye,
  ExternalLink,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { NOTICES, SCHOOL_INFO } from "@/lib/data/schoolData";

// Extended notices list
const ALL_NOTICES = [
  ...NOTICES,
  {
    id: "not-05",
    title: "Scholarship Scheme Application for Needy & Meritorious Students (2083)",
    category: "ADMISSION" as const,
    isImportant: true,
    date: "2026-08-12",
    description:
      "Shree Janak Secondary School invites scholarship applications under the Government quota and Founder Late Surya Bhakta Adhikari Memorial Trust for deserving students.",
    pdfUrl: "/assets/campus/cover-page_15.jpg",
  },
  {
    id: "not-06",
    title: "Notice regarding School Uniform and Textbooks Distribution",
    category: "GENERAL" as const,
    isImportant: false,
    date: "2026-07-02",
    description:
      "Government-funded free textbooks distribution for Class 1 to 10 will take place in Jhapardi and Saraswati blocks starting Sunday.",
  },
];

const CATEGORIES = ["ALL", "ADMISSION", "EXAM", "TENDER", "GENERAL"];

export default function NoticesPage() {
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNotice, setSelectedNotice] = useState<(typeof ALL_NOTICES)[0] | null>(null);

  const filteredNotices = ALL_NOTICES.filter((notice) => {
    const matchesCategory = selectedCategory === "ALL" || notice.category === selectedCategory;
    const matchesSearch =
      notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notice.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-off-white">
      {/* Header */}
      <section className="relative hero-gradient py-20 lg:py-28 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-gold-lighter text-xs font-semibold uppercase tracking-widest mb-4">
            <Bell size={14} /> Official Announcements
          </span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            School <span className="text-gradient-gold">Notice Board</span>
          </h1>
          <p className="text-white/80 text-lg max-w-3xl mx-auto leading-relaxed">
            Stay informed with the latest updates regarding admissions, examination schedules, tenders,
            holidays, and school administration announcements.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-6">
          {/* Controls Bar */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-10 flex flex-col md:flex-row gap-4 justify-between items-center">
            {/* Search input */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search notices by title or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:bg-white focus:border-gold outline-none transition-all text-gray-800"
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
              <Filter size={16} className="text-navy flex-shrink-0" />
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-xs px-4 py-2 rounded-xl font-bold transition-all ${
                    selectedCategory === cat
                      ? "bg-navy text-white shadow-sm"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Notices Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left: Notices List (2 cols) */}
            <div className="lg:col-span-2 space-y-4">
              {filteredNotices.map((notice) => (
                <div
                  key={notice.id}
                  onClick={() => setSelectedNotice(notice)}
                  className={`bg-white rounded-2xl p-6 border transition-all cursor-pointer hover:shadow-lg ${
                    selectedNotice?.id === notice.id
                      ? "border-gold ring-2 ring-gold/20 shadow-md"
                      : "border-gray-100 hover:border-navy/20 shadow-sm"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                          notice.category === "ADMISSION"
                            ? "bg-green-100 text-green-800"
                            : notice.category === "TENDER"
                            ? "bg-amber-100 text-amber-850"
                            : notice.category === "EXAM"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {notice.category}
                      </span>
                      {notice.isImportant && (
                        <span className="flex items-center gap-1 text-[11px] font-bold text-crimson bg-red-50 px-2.5 py-1 rounded-full border border-red-100 animate-pulse">
                          <AlertCircle size={12} /> URGENT
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-gray-400 font-medium flex items-center gap-1">
                      <Calendar size={12} /> {notice.date}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-navy text-lg sm:text-xl leading-snug mb-2 hover:text-gold transition-colors">
                    {notice.title}
                  </h3>

                  <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
                    {notice.description}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs">
                    <span className="text-gray-400">Notice ID: {notice.id}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedNotice(notice);
                      }}
                      className="text-navy font-semibold hover:text-gold flex items-center gap-1"
                    >
                      View Notice Details <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              ))}

              {filteredNotices.length === 0 && (
                <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
                  <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <h3 className="font-bold text-navy text-lg">No notices found</h3>
                  <p className="text-gray-500 text-sm mt-1">Try resetting your search or filter category.</p>
                </div>
              )}
            </div>

            {/* Right: Selected Notice Preview & Quick Downloads (1 col) */}
            <div className="space-y-6">
              {/* Active Notice View */}
              {selectedNotice ? (
                <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xl sticky top-28">
                  <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-gray-100">
                    <span className="text-xs font-bold uppercase tracking-wider text-gold">
                      Notice Preview
                    </span>
                    <span className="text-xs text-gray-400">{selectedNotice.date}</span>
                  </div>

                  <h3 className="font-display font-bold text-navy text-xl mb-3">
                    {selectedNotice.title}
                  </h3>

                  <p className="text-gray-700 text-sm leading-relaxed mb-6">
                    {selectedNotice.description}
                  </p>

                  {selectedNotice.pdfUrl && (
                    <div className="mb-6 rounded-2xl overflow-hidden border border-gray-200 bg-gray-50 p-2">
                      <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden">
                        <Image
                          src={selectedNotice.pdfUrl}
                          alt={selectedNotice.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-3 text-center">
                        <a
                          href={selectedNotice.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-xs font-bold text-white bg-navy px-4 py-2 rounded-xl hover:bg-gold transition-colors"
                        >
                          <Download size={14} /> Open Full Attachment
                        </a>
                      </div>
                    </div>
                  )}

                  <div className="bg-gray-50 rounded-xl p-4 text-xs text-gray-600 space-y-1.5">
                    <div className="font-semibold text-navy">Need further clarification?</div>
                    <div>Call Administrative Office: <strong>{SCHOOL_INFO.phones[0]}</strong></div>
                    <div>Email: <strong>{SCHOOL_INFO.emails[0]}</strong></div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm text-center">
                  <Eye className="w-10 h-10 text-gold mx-auto mb-3" />
                  <h4 className="font-bold text-navy text-base mb-1">Click a notice to preview</h4>
                  <p className="text-gray-500 text-xs leading-relaxed">
                    Select any announcement on the left to read full text and download attachments.
                  </p>
                </div>
              )}

              {/* Quick Downloads Card */}
              <div className="bg-navy rounded-3xl p-6 text-white shadow-lg">
                <h4 className="font-display font-bold text-lg mb-2 flex items-center gap-2">
                  <Download size={18} className="text-gold-light" /> Official Forms
                </h4>
                <p className="text-white/70 text-xs mb-4">
                  Download standard application forms and academic brochures.
                </p>
                <div className="space-y-2">
                  {[
                    { title: "+2 Admission Application Form", file: "/assets/campus/admission-inquary_27.jpg" },
                    { title: "Scholarship Request Form", file: "/assets/campus/cover-page_15.jpg" },
                    { title: "Academic Calendar 2083", file: "/assets/campus/moecde_20.jpg" },
                  ].map((doc, idx) => (
                    <a
                      key={idx}
                      href={doc.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-xs text-white/90 border border-white/5"
                    >
                      <span className="truncate pr-2">{doc.title}</span>
                      <ExternalLink size={14} className="text-gold-light flex-shrink-0" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
