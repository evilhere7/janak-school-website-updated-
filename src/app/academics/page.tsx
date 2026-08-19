import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  GraduationCap,
  BookOpen,
  FlaskConical,
  Briefcase,
  Layers,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Users,
  Award,
} from "lucide-react";
import { DETAILED_PROGRAMS, SCHOOL_INFO } from "@/lib/data/schoolData";

export const metadata: Metadata = {
  title: "Academics | Shree Janak Secondary School",
  description:
    "Explore academic streams at Shree Janak Secondary School: Play Group to Class 10 dual-medium, +2 Science, +2 Management, and +2 Humanities.",
};

export default function AcademicsPage() {
  return (
    <div className="min-h-screen bg-off-white selection:bg-gold selection:text-white">
      {/* Hero Header */}
      <section className="relative hero-gradient text-white py-24 sm:py-32 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-semibold uppercase tracking-wider text-gold-light mb-6">
            <GraduationCap size={14} /> Dual Medium Excellence
          </div>
          <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight text-white mb-6">
            Academic Programs & Pedagogy
          </h1>
          <p className="text-white/80 text-base sm:text-xl max-w-3xl mx-auto leading-relaxed">
            Delivering rigorous national curriculum standards from Early Childhood to Class 12 with parallel English and Nepali medium streams.
          </p>
        </div>
      </section>

      {/* Academic Highlights Banner */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100 text-center">
              <div className="text-3xl font-black text-gold">100%</div>
              <div className="text-xs text-gray-500 font-semibold mt-1">SEE English Medium Pass Rate</div>
            </div>
            <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100 text-center">
              <div className="text-3xl font-black text-navy">Dual</div>
              <div className="text-xs text-gray-500 font-semibold mt-1">English & Nepali Mediums</div>
            </div>
            <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100 text-center">
              <div className="text-3xl font-black text-gold">3 Streams</div>
              <div className="text-xs text-gray-500 font-semibold mt-1">+2 Science, Mgmt & Humanities</div>
            </div>
            <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100 text-center">
              <div className="text-3xl font-black text-navy">60+</div>
              <div className="text-xs text-gray-500 font-semibold mt-1">Certified Faculty Members</div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Overview Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-gold font-bold text-xs uppercase tracking-widest block mb-2">
            Educational Levels
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-navy">
            Structured Learning for Every Stage
          </h2>
          <p className="text-gray-600 text-sm mt-3">
            Click on any program to view full curriculum guidelines, subject combinations, and admission eligibility.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {DETAILED_PROGRAMS.map((prog) => (
            <div
              key={prog.id}
              className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-56 w-full">
                  <Image
                    src={prog.image}
                    alt={prog.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/80 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-gold text-navy-dark text-xs font-black uppercase tracking-wider shadow-md">
                      {prog.medium}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-gold-light text-xs font-semibold block">{prog.level}</span>
                    <h3 className="font-display font-bold text-xl sm:text-2xl">{prog.name}</h3>
                  </div>
                </div>

                <div className="p-8 space-y-4">
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                    {prog.description}
                  </p>

                  <div className="space-y-2 pt-2">
                    <span className="text-xs font-bold text-navy uppercase tracking-wider block">
                      Key Highlights:
                    </span>
                    {prog.highlights.slice(0, 3).map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-gray-700">
                        <CheckCircle2 size={14} className="text-gold flex-shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-8 pt-0 border-t border-gray-100 mt-4 flex items-center justify-between">
                <Link
                  href={`/academics/programs#${prog.slug}`}
                  className="text-xs font-bold text-navy hover:text-gold transition-colors inline-flex items-center gap-1.5"
                >
                  Explore Full Curriculum <ArrowRight size={14} />
                </Link>
                <Link
                  href="/admissions"
                  className="px-4 py-2 rounded-full bg-navy/5 text-navy text-xs font-bold hover:bg-gold hover:text-navy transition-all"
                >
                  Apply Now
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Navigation Cards */}
        <div className="grid sm:grid-cols-3 gap-6 pt-16">
          <Link
            href="/academics/classes"
            className="p-6 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all text-center group"
          >
            <div className="w-12 h-12 rounded-2xl bg-navy/5 text-navy group-hover:bg-gold group-hover:text-navy mx-auto mb-4 flex items-center justify-center transition-colors">
              <Layers size={22} />
            </div>
            <h4 className="font-display font-bold text-navy text-base mb-1">Classes & Syllabus</h4>
            <p className="text-gray-500 text-xs">Curriculum breakdown & teacher guide references</p>
          </Link>

          <Link
            href="/faculty"
            className="p-6 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all text-center group"
          >
            <div className="w-12 h-12 rounded-2xl bg-navy/5 text-navy group-hover:bg-gold group-hover:text-navy mx-auto mb-4 flex items-center justify-center transition-colors">
              <Users size={22} />
            </div>
            <h4 className="font-display font-bold text-navy text-base mb-1">Faculty Directory</h4>
            <p className="text-gray-500 text-xs">Meet our department heads and subject teachers</p>
          </Link>

          <Link
            href="/academics/facilities"
            className="p-6 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all text-center group"
          >
            <div className="w-12 h-12 rounded-2xl bg-navy/5 text-navy group-hover:bg-gold group-hover:text-navy mx-auto mb-4 flex items-center justify-center transition-colors">
              <FlaskConical size={22} />
            </div>
            <h4 className="font-display font-bold text-navy text-base mb-1">Academic Labs</h4>
            <p className="text-gray-500 text-xs">Science laboratories, library & ICT smart rooms</p>
          </Link>
        </div>
      </section>
    </div>
  );
}
