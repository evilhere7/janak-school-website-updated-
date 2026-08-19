import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { GraduationCap, ArrowLeft, CheckCircle2, ArrowRight, BookOpen, FlaskConical, Briefcase, Layers } from "lucide-react";
import { DETAILED_PROGRAMS } from "@/lib/data/schoolData";

export const metadata: Metadata = {
  title: "Academic Programs (PG – 12) | Shree Janak Secondary School",
  description:
    "Explore detailed programs at Shree Janak Secondary School: Foundation Level, Primary, Secondary SEE, +2 Science, Management, and Humanities.",
};

export default function ProgramsPage() {
  return (
    <div className="min-h-screen bg-off-white selection:bg-gold selection:text-white">
      {/* Hero Header */}
      <section className="relative hero-gradient text-white py-20 sm:py-28 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link
            href="/academics"
            className="inline-flex items-center gap-1.5 text-gold-light text-xs font-bold uppercase tracking-wider mb-6 hover:underline"
          >
            <ArrowLeft size={14} /> Back to Academics Overview
          </Link>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-gold-light text-xs font-bold uppercase tracking-wider mb-4 mx-auto block w-fit">
            <GraduationCap size={14} /> Comprehensive Curriculum
          </div>
          <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight text-white mb-4">
            Academic Programs (PG to Class 12)
          </h1>
          <p className="text-white/80 text-base sm:text-lg max-w-2xl mx-auto">
            Comprehensive stream overviews, core subject combinations, and learning objectives.
          </p>
        </div>
      </section>

      {/* Programs List */}
      <section className="py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {DETAILED_PROGRAMS.map((prog, idx) => (
          <div
            key={prog.id}
            id={prog.slug}
            className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-lg p-8 sm:p-12 scroll-mt-24"
          >
            <div className="grid lg:grid-cols-12 gap-8 items-center mb-8">
              <div className="lg:col-span-7 space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-navy text-white text-xs font-bold uppercase tracking-wider">
                    {prog.level}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-gold/20 text-navy font-bold text-xs">
                    {prog.medium}
                  </span>
                </div>
                <h2 className="font-display font-black text-2xl sm:text-3xl text-navy">
                  {prog.name}
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {prog.description}
                </p>
              </div>

              <div className="lg:col-span-5">
                <div className="relative aspect-video sm:aspect-[4/3] rounded-2xl overflow-hidden shadow-md">
                  <Image
                    src={prog.image}
                    alt={prog.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 pt-8 border-t border-gray-100">
              {/* Highlights */}
              <div className="space-y-3">
                <h3 className="font-display font-bold text-navy text-base">Key Program Features</h3>
                <div className="space-y-2">
                  {prog.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-gray-700">
                      <CheckCircle2 size={15} className="text-gold flex-shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Core Subjects */}
              <div className="space-y-3">
                <h3 className="font-display font-bold text-navy text-base">Key Subjects & Syllabus</h3>
                <ul className="space-y-2">
                  {prog.curriculum.map((c, i) => (
                    <li key={i} className="text-xs text-gray-600 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-navy" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
              <Link
                href="/admissions/requirements"
                className="text-xs font-bold text-navy hover:text-gold transition-colors inline-flex items-center gap-1.5"
              >
                View Admission Eligibility & Requirements <ArrowRight size={14} />
              </Link>
              <Link
                href="/contact"
                className="px-6 py-2.5 rounded-full bg-gold text-navy-dark font-bold text-xs hover:bg-gold-light transition-all shadow-sm"
              >
                Inquire for Admission 2083
              </Link>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
