import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, ArrowLeft, ArrowRight, CheckCircle2, FileText, Sparkles, UserCheck, HelpCircle } from "lucide-react";
import { ADMISSION_STEPS, SCHOOL_INFO } from "@/lib/data/schoolData";

export const metadata: Metadata = {
  title: "Admission Process | Shree Janak Secondary School",
  description:
    "Learn about the step-by-step admission roadmap for Shree Janak Secondary School, Gaindakot-5, Nawalparasi.",
};

export default function AdmissionProcessPage() {
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
            <Calendar size={14} /> Step-by-Step Roadmap
          </div>
          <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight text-white mb-4">
            The Admission Process
          </h1>
          <p className="text-white/80 text-base sm:text-lg max-w-2xl mx-auto">
            Clear, transparent roadmap to joining Shree Janak Secondary School for the upcoming academic session.
          </p>
        </div>
      </section>

      {/* 5-Step Process Timeline */}
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {ADMISSION_STEPS.map((s, idx) => (
          <div
            key={s.step}
            className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-100 shadow-sm flex flex-col sm:flex-row items-start gap-6 hover:shadow-lg transition-all"
          >
            <div className="w-16 h-16 rounded-2xl bg-navy text-gold-light font-display font-black text-2xl flex items-center justify-center flex-shrink-0 shadow-md">
              {s.step}
            </div>
            <div className="space-y-2 flex-1">
              <span className="text-gold font-bold text-xs uppercase tracking-wider block">
                Stage {idx + 1}
              </span>
              <h2 className="font-display font-bold text-xl sm:text-2xl text-navy">
                {s.title}
              </h2>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                {s.desc}
              </p>
            </div>
          </div>
        ))}

        <div className="flex flex-wrap justify-center gap-4 pt-12">
          <Link
            href="/admissions/requirements"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-navy text-white text-xs sm:text-sm font-bold hover:bg-gold hover:text-navy transition-all shadow-md"
          >
            View Required Documents <ArrowRight size={16} />
          </Link>
          <Link
            href="/admissions/faq"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-navy text-xs sm:text-sm font-bold border border-gray-200 hover:bg-gray-50 transition-all"
          >
            Admissions FAQ
          </Link>
        </div>
      </section>
    </div>
  );
}
