import type { Metadata } from "next";
import Link from "next/link";
import { Compass, CheckCircle2, ArrowLeft, ArrowRight, BookOpen, Shield, Sparkles, Target } from "lucide-react";
import { SCHOOL_INFO } from "@/lib/data/schoolData";

export const metadata: Metadata = {
  title: "Our Mission | Shree Janak Secondary School",
  description:
    "Explore the institutional mission, educational philosophy, and student development commitments of Shree Janak Secondary School in Gaindakot.",
};

const MISSION_PILLARS = [
  {
    title: "Quality Education for All",
    desc: "Delivering equitable, high-standard academic instruction across both English and Nepali medium streams without socio-economic barrier.",
    icon: BookOpen,
  },
  {
    title: "Holistic Character & Discipline",
    desc: "Nurturing self-reliance, moral empathy, mutual respect, and civic responsibility in every student from early childhood.",
    icon: Shield,
  },
  {
    title: "Curiosity & Scientific Inquiry",
    desc: "Fostering hands-on STEM experimentation, digital literacy, and critical problem-solving in modern laboratories.",
    icon: Sparkles,
  },
  {
    title: "Community & Cultural Roots",
    desc: "Cultivating pride in Nepalese cultural heritage while preparing learners with modern global competencies.",
    icon: Target,
  },
];

export default function MissionPage() {
  return (
    <div className="min-h-screen bg-off-white selection:bg-gold selection:text-white">
      {/* Hero Header */}
      <section className="relative hero-gradient text-white py-20 sm:py-28 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link
            href="/about"
            className="inline-flex items-center gap-1.5 text-gold-light text-xs font-bold uppercase tracking-wider mb-6 hover:underline"
          >
            <ArrowLeft size={14} /> Back to About Overview
          </Link>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-gold-light text-xs font-bold uppercase tracking-wider mb-4 mx-auto block w-fit">
            <Compass size={14} /> Institutional Purpose
          </div>
          <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight text-white mb-4">
            Our Mission & Purpose
          </h1>
          <p className="text-white/80 text-base sm:text-lg max-w-2xl mx-auto">
            Where curiosity becomes knowledge, and knowledge becomes confidence.
          </p>
        </div>
      </section>

      {/* Core Mission Statement */}
      <section className="py-20 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-gold font-bold text-xs uppercase tracking-widest block mb-4">
            Official Mission Statement
          </span>
          <blockquote className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-navy leading-snug mb-8">
            &ldquo;To provide inclusive, high-quality education that empowers every learner to think critically, act with moral integrity, embrace cultural heritage, and contribute meaningfully to our nation.&rdquo;
          </blockquote>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            At Shree Janak Secondary School, we create an academic environment where students learn with clear purpose, question with confidence, and grow into empathetic leaders of tomorrow.
          </p>
        </div>
      </section>

      {/* 4 Pillars Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-gold font-bold text-xs uppercase tracking-widest block mb-2">
            Strategic Focus
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-navy">
            Our Four Educational Pillars
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {MISSION_PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex items-start gap-6"
              >
                <div className="w-14 h-14 rounded-2xl bg-navy/5 text-navy flex items-center justify-center flex-shrink-0">
                  <Icon size={26} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl text-navy mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center gap-4 pt-16">
          <Link
            href="/about/vision"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-navy text-white text-xs sm:text-sm font-bold hover:bg-gold hover:text-navy transition-all shadow-md"
          >
            Read Our Vision <ArrowRight size={16} />
          </Link>
          <Link
            href="/about/values"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-navy text-xs sm:text-sm font-bold border border-gray-200 hover:bg-gray-50 transition-all"
          >
            Core Values
          </Link>
        </div>
      </section>
    </div>
  );
}
