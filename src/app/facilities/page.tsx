import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  BookOpen,
  FlaskConical,
  Monitor,
  Trophy,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  GraduationCap,
  Bus,
  Droplets,
} from "lucide-react";
import { FACILITIES, SCHOOL_INFO } from "@/lib/data/schoolData";

export const metadata: Metadata = {
  title: "Facilities & Infrastructure",
  description:
    "Explore world-class academic, laboratory, digital, and athletic infrastructure at Shree Janak Secondary School in Gaindakot.",
};

const EXTRA_FACILITIES = [
  {
    title: "Smart Digital Classrooms",
    icon: <Zap className="w-6 h-6 text-gold" />,
    description:
      "Interactive flat panel displays and multimedia projectors installed in secondary and higher secondary classrooms for immersive audiovisual learning.",
  },
  {
    title: "Dedicated Science Laboratories",
    icon: <FlaskConical className="w-6 h-6 text-gold" />,
    description:
      "Separate Physics, Chemistry, and Biology workbenches adhering to high safety standards with specialized equipment for practical experiments.",
  },
  {
    title: "Purified Clean Drinking Water",
    icon: <Droplets className="w-6 h-6 text-gold" />,
    description:
      "State-of-the-art multi-stage UV/RO filtration stations across all campus blocks ensuring safe and healthy drinking water for all students.",
  },
  {
    title: "School Transportation & Security",
    icon: <Bus className="w-6 h-6 text-gold" />,
    description:
      "Reliable school bus routes covering Gaindakot and surrounding areas with 24/7 CCTV surveillance and dedicated security staff.",
  },
];

export default function FacilitiesPage() {
  return (
    <div className="min-h-screen bg-off-white">
      {/* Hero Header */}
      <section className="relative hero-gradient py-20 lg:py-28 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div
            className="absolute -top-24 -right-24 w-96 h-96 rounded-full"
            style={{ background: "radial-gradient(circle, #c8921a 0%, transparent 70%)" }}
          />
          <div
            className="absolute bottom-0 left-1/3 w-80 h-80 rounded-full"
            style={{ background: "radial-gradient(circle, #1a3366 0%, transparent 70%)" }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-gold-lighter text-xs font-semibold uppercase tracking-widest mb-4">
            <Sparkles size={14} /> Campus Infrastructure
          </span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            World-Class Facilities for <span className="text-gradient-gold">Holistic Growth</span>
          </h1>
          <p className="text-white/80 text-lg max-w-3xl mx-auto leading-relaxed">
            From modern science & computer labs to the government-accredited Room to Read library,
            JHSS offers the environment your child needs to thrive academically and physically.
          </p>
        </div>
      </section>

      {/* Main Facilities Detailed Showcase */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-navy/8 text-navy text-xs font-semibold uppercase tracking-widest mb-4">
              Core Amenities
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy">
              Designed to Empower <span className="text-gradient-gold">Every Learner</span>
            </h2>
            <p className="text-gray-600 mt-4 text-base">
              Explore our primary academic and extracurricular infrastructure built to serve over 1,500 students.
            </p>
          </div>

          <div className="space-y-16">
            {FACILITIES.map((facility, index) => {
              const isEven = index % 2 === 1;
              return (
                <div
                  key={facility.id}
                  id={facility.id}
                  className={`grid lg:grid-cols-2 gap-12 items-center rounded-3xl p-8 lg:p-12 transition-all ${
                    isEven ? "bg-gray-50/80 border border-gray-100" : "bg-white border border-gray-100 shadow-sm"
                  }`}
                >
                  {/* Content Column */}
                  <div className={`${isEven ? "lg:order-2" : "lg:order-1"}`}>
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-gold/10 text-gold text-xs font-bold uppercase tracking-wider mb-4">
                      {facility.category}
                    </div>
                    <h3 className="font-display text-2xl sm:text-3xl font-bold text-navy mb-4">
                      {facility.title}
                    </h3>
                    <p className="text-gray-600 text-base leading-relaxed mb-6">
                      {facility.description}
                    </p>

                    {/* Bullet Highlights */}
                    <div className="grid sm:grid-cols-2 gap-3 mb-8">
                      {facility.details.map((detail, idx) => (
                        <div key={idx} className="flex items-start gap-2.5">
                          <CheckCircle2 size={18} className="text-gold flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-700 font-medium">{detail}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2">
                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-navy hover:text-gold transition-colors"
                      >
                        Plan a Campus Visit <ArrowRight size={15} />
                      </Link>
                    </div>
                  </div>

                  {/* Image Column */}
                  <div className={`${isEven ? "lg:order-1" : "lg:order-2"}`}>
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl group">
                      <Image
                        src={facility.image}
                        alt={facility.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/60 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Additional Campus Features Grid */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full bg-navy/8 text-navy text-xs font-semibold uppercase tracking-widest mb-4">
              More Facilities
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy">
              Every Amenity for a <span className="text-gradient-gold">Safe Campus</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {EXTRA_FACILITIES.map((feat, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-navy/5 flex items-center justify-center mb-5">
                  {feat.icon}
                </div>
                <h4 className="font-bold text-navy text-lg mb-2">{feat.title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{feat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Campus Blocks Overview */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full bg-navy/8 text-navy text-xs font-semibold uppercase tracking-widest mb-4">
              Block Directory
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy">
              Our Specialized <span className="text-gradient-gold">Wings</span>
            </h2>
            <p className="text-gray-600 mt-3 text-sm">
              Different academic levels operate in dedicated blocks designed for age-appropriate focus.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SCHOOL_INFO.campusBlocks.map((block, idx) => (
              <div
                key={block.name}
                className="relative bg-navy rounded-2xl p-7 text-white shadow-lg overflow-hidden group hover:-translate-y-1 transition-all"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -mr-8 -mt-8" />
                <div className="w-10 h-10 rounded-lg bg-gold/20 flex items-center justify-center text-gold-light font-bold text-base mb-4">
                  0{idx + 1}
                </div>
                <h3 className="font-bold text-lg mb-2 text-white">{block.name}</h3>
                <p className="text-white/70 text-xs leading-relaxed">{block.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="hero-gradient py-16 text-center text-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            Want to see our campus in person?
          </h2>
          <p className="text-white/80 text-base mb-8 max-w-2xl mx-auto">
            We welcome parents, prospective students, and community members to visit our premises during school hours.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="px-8 py-3.5 rounded-full bg-gold text-white font-semibold text-sm hover:bg-gold-light transition-all shadow-gold"
            >
              Contact Administration
            </Link>
            <Link
              href="/gallery"
              className="px-8 py-3.5 rounded-full bg-white/10 text-white font-semibold text-sm hover:bg-white/20 transition-all border border-white/20"
            >
              View Photo Gallery
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
