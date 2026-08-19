import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Building2, ArrowLeft, ArrowRight, CheckCircle2, Layers, MapPin, Sparkles } from "lucide-react";
import { SCHOOL_INFO } from "@/lib/data/schoolData";

export const metadata: Metadata = {
  title: "Campus Infrastructure & Blocks | Shree Janak Secondary School",
  description:
    "Discover the architectural wings, classroom blocks, and physical infrastructure of Shree Janak Secondary School in Gaindakot.",
};

const INFRASTRUCTURE_BLOCKS = [
  {
    name: "Model School Congress Chowk Wing",
    category: "Main Administrative & Secondary Wing",
    desc: "The central multi-story academic complex with modern classrooms, executive reception, principal office, and administrative department.",
    features: [
      "Principal & Administration executive chambers",
      "Spacious secondary level classrooms with natural ventilation",
      "Teacher common room and departmental planning desks",
      "Central examination control and records archive",
    ],
    image: "/images/school/school-building-1.jpg",
  },
  {
    name: "+2 Aadarsha Academic Block",
    category: "Higher Secondary (+2) Wing",
    desc: "Purpose-built multi-story complex tailored for Class 11 and 12 students in Science, Management, and Humanities.",
    features: [
      "Modern amphitheater lecture rooms for +2 streams",
      "Advanced multimedia audio-visual projection equipment",
      "Dedicated senior student study lounges",
      "Direct laboratory and faculty access",
    ],
    image: "/images/school/school-building-3.jpg",
  },
  {
    name: "Jhapardi Primary Foundation Block",
    category: "Early Childhood & Primary Wing",
    desc: "Nurturing learning environment designed specifically for Play Group through Grade 5 students with dedicated play equipment.",
    features: [
      "Child-friendly ergonomic classroom furniture",
      "Colorful interactive learning murals and play corners",
      "Dedicated primary teacher support and supervision",
      "Safe, enclosed courtyard and flower gardens",
    ],
    image: "/images/school/school-campus-garden.jpg",
  },
  {
    name: "Saraswati Learning & STEM Block",
    category: "Laboratories & Central Digital Library",
    desc: "The technological and research heartbeat of the school, housing laboratories, library, and ICT centers.",
    features: [
      "5,000+ volume Room to Read Central Library",
      "Physics, Chemistry, and Biology demonstration labs",
      "40+ workstation Computer & ICT Innovation center",
      "High-speed fiber connectivity with solar backup",
    ],
    image: "/assets/facilities/WhatsApp-Image-2024-05-16-at-4.35.18-PM-1_7.jpeg",
  },
];

export default function InfrastructurePage() {
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
            <Building2 size={14} /> Physical Architecture
          </div>
          <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight text-white mb-4">
            Campus Infrastructure & Blocks
          </h1>
          <p className="text-white/80 text-base sm:text-lg max-w-2xl mx-auto">
            Architectural overview of our four specialized academic blocks and learning wings.
          </p>
        </div>
      </section>

      {/* Blocks List */}
      <section className="py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {INFRASTRUCTURE_BLOCKS.map((block, idx) => (
          <div
            key={block.name}
            className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-md p-8 sm:p-12"
          >
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              <div className={`lg:col-span-7 space-y-4 ${idx % 2 === 1 ? "lg:order-2" : ""}`}>
                <span className="text-gold font-bold text-xs uppercase tracking-wider block">
                  {block.category}
                </span>
                <h2 className="font-display font-black text-2xl sm:text-3xl text-navy">
                  {block.name}
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {block.desc}
                </p>

                <div className="space-y-2 pt-2">
                  <span className="text-xs font-bold text-navy uppercase tracking-wider block">
                    Block Highlights:
                  </span>
                  {block.features.map((f, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-gray-700">
                      <CheckCircle2 size={15} className="text-gold flex-shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`lg:col-span-5 ${idx % 2 === 1 ? "lg:order-1" : ""}`}>
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md">
                  <Image
                    src={block.image}
                    alt={block.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="text-center pt-8">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-navy text-white text-xs sm:text-sm font-bold hover:bg-gold hover:text-navy transition-all shadow-md"
          >
            View Photo Gallery Archive <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
