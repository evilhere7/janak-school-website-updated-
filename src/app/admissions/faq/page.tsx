"use client";

import { useState } from "react";
import Link from "next/link";
import { HelpCircle, ChevronDown, Search, ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { ADMISSION_FAQS } from "@/lib/data/schoolData";
import { cn } from "@/lib/utils";

export default function AdmissionsFaqPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "General", "Academics", "Fees & Scholarships", "Documentation", "Campus & Logistics"];

  const filteredFaqs = ADMISSION_FAQS.filter((faq) => {
    const matchesCategory = selectedCategory === "All" || faq.category === selectedCategory;
    const matchesSearch =
      faq.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.a.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-off-white selection:bg-gold selection:text-white">
      {/* Hero Header */}
      <section className="relative hero-gradient text-white py-20 sm:py-28 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link
            href="/admissions"
            className="inline-flex items-center gap-1.5 text-gold-light text-xs font-bold uppercase tracking-wider mb-6 hover:underline"
          >
            <ArrowLeft size={14} /> Back to Admissions Overview
          </Link>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-gold-light text-xs font-bold uppercase tracking-wider mb-4 mx-auto block w-fit">
            <HelpCircle size={14} /> Knowledge Base
          </div>
          <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight text-white mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-white/80 text-base sm:text-lg max-w-2xl mx-auto">
            Everything you need to know about joining Shree Janak Secondary School.
          </p>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search admission questions, fees, documents, or scholarship rules..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-gray-50 border border-gray-200 text-sm focus:bg-white focus:border-gold outline-none transition-all text-gray-800 shadow-sm"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer",
                  selectedCategory === cat
                    ? "bg-navy text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Accordion List */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-3xl p-8 border border-gray-100">
            <p className="text-gray-500 text-sm">No matching questions found for &ldquo;{searchTerm}&rdquo;.</p>
          </div>
        ) : (
          filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full text-left p-6 sm:p-7 flex items-center justify-between gap-4 cursor-pointer hover:bg-gray-50/50 transition-colors"
                >
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-gold block mb-1">
                      {faq.category}
                    </span>
                    <h3 className="font-display font-bold text-navy text-base sm:text-lg">
                      {faq.q}
                    </h3>
                  </div>
                  <div className={cn("w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 transition-transform", isOpen && "rotate-180 bg-navy text-white")}>
                    <ChevronDown size={16} />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 sm:px-7 pb-6 pt-2 text-gray-600 text-xs sm:text-sm leading-relaxed border-t border-gray-50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })
        )}

        <div className="text-center pt-12">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-navy text-white text-xs sm:text-sm font-bold hover:bg-gold hover:text-navy transition-all shadow-md"
          >
            Have Another Question? Contact Admissions <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
