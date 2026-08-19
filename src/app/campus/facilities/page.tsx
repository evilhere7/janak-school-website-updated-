import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BookOpen, FlaskConical, Monitor, Trophy, ArrowLeft, ArrowRight, CheckCircle2, Building2 } from "lucide-react";
import { FACILITIES } from "@/lib/data/schoolData";

export const metadata: Metadata = {
  title: "School Facilities | Shree Janak Secondary School",
  description:
    "Explore the learning spaces, science laboratories, ICT center, library, and sports grounds at Shree Janak Secondary School.",
};

const ICON_MAP: Record<string, any> = {
  BookOpen,
  FlaskConical,
  Monitor,
  Trophy,
};

export default function CampusFacilitiesPage() {
  return (
    <div className="min-h-screen bg-off-white selection:bg-gold selection:text-white">
      {/* Hero Header */}
      <section className="relative hero-gradient text-white py-20 sm:py-28 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link
            href="/campus"
            className="inline-flex items-center gap-1.5 text-gold-light text-xs font-bold uppercase tracking-wider mb-6 hover:underline"
          >
            <ArrowLeft size={14} /> Back to Campus Overview
          </Link>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-gold-light text-xs font-bold uppercase tracking-wider mb-4 mx-auto block w-fit">
            <Building2 size={14} /> Campus Amenities
          </div>
          <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight text-white mb-4">
            School Facilities Directory
          </h1>
          <p className="text-white/80 text-base sm:text-lg max-w-2xl mx-auto">
            Comprehensive amenities designed for academic, scientific, digital, and athletic enrichment.
          </p>
        </div>
      </section>

      {/* Facilities Cards */}
      <section className="py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {FACILITIES.map((fac) => {
          const Icon = ICON_MAP[fac.icon] || BookOpen;
          return (
            <div
              key={fac.id}
              className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-md p-8 sm:p-12"
            >
              <div className="grid lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center gap-2 text-gold font-bold text-xs uppercase tracking-wider">
                    <Icon size={16} /> {fac.category}
                  </div>
                  <h2 className="font-display font-black text-2xl sm:text-3xl text-navy">
                    {fac.title}
                  </h2>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {fac.description}
                  </p>

                  <div className="space-y-2 pt-2">
                    {fac.details.map((d, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-gray-700">
                        <CheckCircle2 size={15} className="text-gold flex-shrink-0 mt-0.5" />
                        <span>{d}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md">
                    <Image
                      src={fac.image}
                      alt={fac.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        <div className="text-center pt-8">
          <Link
            href="/campus/infrastructure"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-navy text-white text-xs sm:text-sm font-bold hover:bg-gold hover:text-navy transition-all shadow-md"
          >
            Explore Academic Blocks & Infrastructure <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
