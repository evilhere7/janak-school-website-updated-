import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { GraduationCap, ArrowLeft, ArrowRight, Mail, Phone, Award, CheckCircle2 } from "lucide-react";
import { SCHOOL_INFO } from "@/lib/data/schoolData";

export const metadata: Metadata = {
  title: "Principal's Message | Shree Janak Secondary School",
  description:
    "Read the official message from Mr. Buddhi Prasad Kandel, Principal of Shree Janak Secondary School, Gaindakot-5, Nawalparasi.",
};

export default function PrincipalPage() {
  const { principal } = SCHOOL_INFO;

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
            <GraduationCap size={14} /> Leadership Welcome
          </div>
          <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight text-white mb-4">
            Message from the Principal
          </h1>
          <p className="text-white/80 text-base sm:text-lg max-w-2xl mx-auto">
            A welcoming address from the executive leadership of Shree Janak Secondary School.
          </p>
        </div>
      </section>

      {/* Main Message Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden">
          <div className="grid lg:grid-cols-12 gap-8 items-center p-8 sm:p-14">
            {/* Principal Photo & Details Card */}
            <div className="lg:col-span-5 flex flex-col items-center text-center">
              <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-full overflow-hidden ring-8 ring-gold/20 shadow-2xl mb-6 bg-gray-50">
                <Image
                  src={principal.image}
                  alt={principal.name}
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>

              <h2 className="font-display font-black text-2xl sm:text-3xl text-navy">
                {principal.name}
              </h2>
              <p className="text-gold font-bold text-sm uppercase tracking-wider mt-1">
                {principal.title}, JHSS
              </p>
              <p className="text-gray-500 text-xs mt-0.5">
                M.Ed., M.A. Mathematics · 25+ Years Experience
              </p>

              <div className="mt-6 pt-6 border-t border-gray-100 w-full space-y-2 text-xs text-gray-600">
                <div className="flex items-center justify-center gap-2">
                  <Mail size={14} className="text-gold" />
                  <a href={`mailto:${SCHOOL_INFO.emails[0]}`} className="hover:underline text-navy font-medium">
                    principal@jhss.edu.np
                  </a>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Phone size={14} className="text-gold" />
                  <a href={`tel:${SCHOOL_INFO.phones[0]}`} className="hover:underline text-navy font-medium">
                    {SCHOOL_INFO.phones[0]}
                  </a>
                </div>
              </div>
            </div>

            {/* Formal Speech / Letter */}
            <div className="lg:col-span-7 lg:border-l lg:border-gray-100 lg:pl-12 space-y-6">
              <span className="text-gold font-bold text-xs uppercase tracking-widest block">
                Official Welcome Note
              </span>
              <h3 className="font-display font-bold text-xl sm:text-2xl text-navy leading-snug">
                Fostering Excellence, Character, and Future-Ready Confidence
              </h3>

              <div className="space-y-4 text-gray-700 text-sm sm:text-base leading-relaxed">
                <p>
                  &ldquo;{principal.message}&rdquo;
                </p>
                <p>
                  As an institution that was envisioned by Late Surya Bhakta Adhikari in 2015 B.S. to empower Gaindakot, our sacred commitment remains unchanged: to ensure every student, regardless of background, receives the highest standard of holistic education.
                </p>
                <p>
                  With modern STEM science laboratories, the Room to Read digital library, active sports tournaments, and our dedicated faculty, we invite parents, guardians, and prospective students to join our thriving community and build a prosperous future together.
                </p>
              </div>

              {/* Signature Block */}
              <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <div className="font-serif italic text-xl text-navy font-bold">
                    Buddhi Prasad Kandel
                  </div>
                  <div className="text-xs text-gray-500 font-semibold mt-0.5">
                    Principal, Shree Janak Secondary School
                  </div>
                </div>

                <Link
                  href="/admissions"
                  className="px-6 py-3 rounded-full bg-navy text-white text-xs font-bold hover:bg-gold hover:text-navy transition-all shadow-md"
                >
                  Admissions 2083
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
