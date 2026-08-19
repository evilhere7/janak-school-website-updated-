import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Trophy, Award, Star, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { ACHIEVEMENTS_DATA } from "@/lib/data/schoolData";

export const metadata: Metadata = {
  title: "School Achievements & Awards | Shree Janak Secondary School",
  description:
    "Explore the academic, sports, institutional, and community milestones achieved by Shree Janak Secondary School in Gaindakot.",
};

export default function AchievementsPage() {
  return (
    <div className="min-h-screen bg-off-white selection:bg-gold selection:text-white">
      {/* Hero Header */}
      <section className="relative hero-gradient text-white py-24 sm:py-32 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-semibold uppercase tracking-wider text-gold-light mb-6">
            <Trophy size={14} /> Milestones of Distinction
          </div>
          <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight text-white mb-6">
            School Achievements & Awards
          </h1>
          <p className="text-white/80 text-base sm:text-xl max-w-3xl mx-auto leading-relaxed">
            Celebrating decades of academic board brilliance, sports championships, national designations, and community impact.
          </p>
        </div>
      </section>

      {/* Achievements Cards Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ACHIEVEMENTS_DATA.map((ach) => (
            <div
              key={ach.id}
              className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
                  <Image
                    src={ach.image}
                    alt={ach.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-navy/80 backdrop-blur-md text-gold-light text-[11px] font-bold uppercase tracking-wider">
                      {ach.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 sm:p-8">
                  <div className="text-xs font-bold text-gold uppercase tracking-wider mb-2 font-mono">
                    {ach.year}
                  </div>
                  <h3 className="font-display font-bold text-xl text-navy group-hover:text-gold transition-colors mb-3">
                    {ach.title}
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                    {ach.summary}
                  </p>
                </div>
              </div>

              <div className="p-6 sm:p-8 pt-0 border-t border-gray-50 mt-4 flex items-center justify-between">
                <Link
                  href={`/achievements/${ach.slug}`}
                  className="text-xs font-bold text-navy group-hover:text-gold transition-colors inline-flex items-center gap-1.5"
                >
                  Read Full Story <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
