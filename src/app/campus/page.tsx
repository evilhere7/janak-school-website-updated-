import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Building2, MapPin, ArrowRight, CheckCircle2, Sparkles, Trophy, BookOpen, FlaskConical } from "lucide-react";
import { SCHOOL_INFO, FACILITIES } from "@/lib/data/schoolData";

export const metadata: Metadata = {
  title: "Explore Our Campus | Shree Janak Secondary School",
  description:
    "Explore the campus of Shree Janak Secondary School in Gaindakot-5, Nawalparasi: academic blocks, marigold gardens, laboratories, and athletic fields.",
};

const CAMPUS_HIGHLIGHTS = [
  {
    title: "Expansive Main Academic Complex",
    desc: "Multi-story earthquake-resilient building housing modern classrooms, executive offices, and secondary wings.",
    image: "/images/school/school-building-1.jpg",
  },
  {
    title: "Blooming Campus Gardens & Green Corridors",
    desc: "Tranquil outdoor courtyards and marigold flower gardens creating an uplifting and botanical learning environment.",
    image: "/images/school/school-campus-garden.jpg",
  },
  {
    title: "Modern +2 Academic Wing & Entrance",
    desc: "Elevated view of modern facilities accommodating +2 Science, Management, and Humanities classrooms.",
    image: "/images/school/school-building-3.jpg",
  },
];

export default function CampusPage() {
  return (
    <div className="min-h-screen bg-off-white selection:bg-gold selection:text-white">
      {/* Hero Header */}
      <section className="relative hero-gradient text-white py-24 sm:py-32 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-semibold uppercase tracking-wider text-gold-light mb-6">
            <Building2 size={14} /> Gaindakot-5, Nawalparasi
          </div>
          <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight text-white mb-6">
            Explore Our Campus
          </h1>
          <p className="text-white/80 text-base sm:text-xl max-w-3xl mx-auto leading-relaxed">
            A dynamic, modern academic environment uniting rich natural beauty, state-of-the-art STEM facilities, and expansive athletic spaces.
          </p>
        </div>
      </section>

      {/* Real Campus Photographs Spotlight */}
      <section className="py-20 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-gold font-bold text-xs uppercase tracking-widest block mb-2">
              Real Campus Visuals
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-navy">
              Campus Environment & Grounds
            </h2>
          </div>

          {CAMPUS_HIGHLIGHTS.map((item, idx) => (
            <div
              key={idx}
              className={`grid lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
                idx % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              <div className={`lg:col-span-6 ${idx % 2 === 1 ? "lg:order-2" : ""}`}>
                <div className="relative aspect-[16/10] sm:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-gray-200">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/40 via-transparent to-transparent" />
                </div>
              </div>

              <div className={`lg:col-span-6 space-y-4 ${idx % 2 === 1 ? "lg:order-1" : ""}`}>
                <span className="text-gold font-bold text-xs uppercase tracking-wider block">
                  Campus Landmark 0{idx + 1}
                </span>
                <h3 className="font-display font-black text-2xl sm:text-3xl text-navy">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  {item.desc}
                </p>
                <div className="pt-2">
                  <Link
                    href="/campus/infrastructure"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-navy hover:text-gold transition-colors"
                  >
                    View Infrastructure Details <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Blocks & Facilities Hub */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-8 sm:p-12 rounded-3xl bg-white border border-gray-100 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-navy/5 text-navy mb-6 flex items-center justify-center">
                <FlaskConical size={24} />
              </div>
              <h3 className="font-display font-bold text-2xl text-navy mb-3">
                Facilities Directory
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-6">
                Explore our Room to Read library, modern physics/chemistry laboratories, high-speed computer center, and athletic arenas.
              </p>
            </div>
            <Link
              href="/campus/facilities"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-navy text-white text-xs font-bold hover:bg-gold hover:text-navy transition-all w-fit shadow-md"
            >
              View Facilities Directory <ArrowRight size={14} />
            </Link>
          </div>

          <div className="p-8 sm:p-12 rounded-3xl bg-white border border-gray-100 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-navy/5 text-navy mb-6 flex items-center justify-center">
                <Building2 size={24} />
              </div>
              <h3 className="font-display font-bold text-2xl text-navy mb-3">
                Infrastructure & Blocks
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-6">
                Discover the architectural design and specialized wings across Model School Congress Chowk, +2 Aadarsha, Jhapardi, and Saraswati blocks.
              </p>
            </div>
            <Link
              href="/campus/infrastructure"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-navy text-white text-xs font-bold hover:bg-gold hover:text-navy transition-all w-fit shadow-md"
            >
              Explore Academic Blocks <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
