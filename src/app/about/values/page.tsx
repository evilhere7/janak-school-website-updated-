import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  Clock,
  HeartHandshake,
  Compass,
  Award,
  CheckCircle,
  Sparkles,
  Users,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { CORE_VALUES } from "@/lib/data/schoolData";

export const metadata: Metadata = {
  title: "Core Values | Shree Janak Secondary School",
  description:
    "Explore the 8 foundational values that guide students, teachers, and leadership at Shree Janak Secondary School.",
};

const ICON_MAP: Record<string, any> = {
  ShieldCheck,
  Clock,
  HeartHandshake,
  Compass,
  Award,
  CheckCircle,
  Sparkles,
  Users,
};

export default function ValuesPage() {
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
            <ShieldCheck size={14} /> Guiding Principles
          </div>
          <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight text-white mb-4">
            Our Core Values
          </h1>
          <p className="text-white/80 text-base sm:text-lg max-w-2xl mx-auto">
            The enduring moral, academic, and civic principles that define every member of the JHSS family.
          </p>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CORE_VALUES.map((val) => {
            const Icon = ICON_MAP[val.icon] || ShieldCheck;
            return (
              <div
                key={val.id}
                className="group bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-navy/5 text-navy group-hover:bg-gold group-hover:text-navy-dark flex items-center justify-center transition-colors shadow-sm">
                      <Icon size={26} />
                    </div>
                    <span className="text-gray-400 font-serif italic text-sm">
                      {val.nepali}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-xl text-navy group-hover:text-gold transition-colors mb-3">
                    {val.title}
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                    {val.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-gray-100 flex items-center gap-1.5 text-xs font-semibold text-gray-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold" /> JHSS Standard
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center pt-16">
          <Link
            href="/about/principal"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-navy text-white text-xs sm:text-sm font-bold hover:bg-gold hover:text-navy transition-all shadow-md"
          >
            Read Principal&apos;s Message <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
