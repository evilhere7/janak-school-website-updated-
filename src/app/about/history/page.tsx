import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { History, Calendar, Award, ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { HISTORY_MILESTONES, SCHOOL_INFO } from "@/lib/data/schoolData";

export const metadata: Metadata = {
  title: "Our History | Shree Janak Secondary School",
  description:
    "Explore the history, foundational milestones, and evolution of Shree Janak Secondary School in Gaindakot since 2015 B.S.",
};

export default function HistoryPage() {
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
          <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight text-white mb-4">
            From Our Beginning to Our Future
          </h1>
          <p className="text-white/80 text-base sm:text-lg max-w-2xl mx-auto">
            Chronicle of institutional resilience, community dedication, and academic growth from 2015 B.S. to 2083 B.S.
          </p>
        </div>
      </section>

      {/* Founder Legacy Spotlight */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-3xl bg-navy text-white relative overflow-hidden shadow-xl">
            <div className="relative z-10 grid md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-8">
                <span className="text-gold-light text-xs font-bold uppercase tracking-wider block mb-2">
                  Founder & Patron Legacy
                </span>
                <h2 className="font-display font-bold text-2xl sm:text-3xl mb-3">
                  {SCHOOL_INFO.founder.name}
                </h2>
                <p className="text-white/70 text-xs sm:text-sm uppercase tracking-wide mb-4">
                  {SCHOOL_INFO.founder.role}
                </p>
                <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                  &ldquo;{SCHOOL_INFO.founder.legacy} Established alongside visionary social workers and community pioneers, JHSS stands as an enduring testament to the transformative power of accessible education.&rdquo;
                </p>
              </div>
              <div className="md:col-span-4 text-center">
                <div className="inline-block p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
                  <div className="font-display font-black text-4xl text-gold-light">2015 B.S.</div>
                  <div className="text-xs text-white/70 mt-1 uppercase font-semibold">Founding Year (~1958 A.D.)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Timeline Section */}
      <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-gold font-bold text-xs uppercase tracking-widest block mb-2">
            Chronological Journey
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-navy">
            Milestones of Educational Excellence
          </h2>
        </div>

        <div className="relative border-l-2 border-gold/30 ml-4 sm:ml-32 space-y-12 pb-8">
          {HISTORY_MILESTONES.map((m, idx) => (
            <div key={m.yearBS} className="relative pl-8 sm:pl-10 group">
              {/* Timeline Bullet Node */}
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-white border-4 border-gold shadow-md group-hover:scale-125 transition-transform" />

              {/* Date Marker for Desktop */}
              <div className="sm:absolute sm:-left-36 sm:top-0 text-left sm:text-right sm:w-28 mb-2 sm:mb-0">
                <div className="font-display font-black text-lg sm:text-xl text-navy">{m.yearBS}</div>
                <div className="text-xs text-gray-500 font-mono">{m.yearAD}</div>
              </div>

              {/* Milestone Card */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-2 text-gold font-bold text-xs uppercase tracking-wider mb-2">
                  <Sparkles size={14} /> Milestone 0{idx + 1}
                </div>
                <h3 className="font-display font-bold text-xl text-navy mb-3">
                  {m.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {m.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-8">
          <Link
            href="/about/mission"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-navy text-white text-xs sm:text-sm font-bold hover:bg-gold hover:text-navy transition-all shadow-md"
          >
            Explore Our Mission & Values <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
