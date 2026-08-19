import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  BookOpen,
  Building2,
  Calendar,
  CheckCircle2,
  Compass,
  GraduationCap,
  History,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { SCHOOL_INFO, CORE_VALUES, STATS } from "@/lib/data/schoolData";

export const metadata: Metadata = {
  title: "About Us | Shree Janak Secondary School",
  description:
    "Discover the 68+ year history, vision, mission, campus blocks, and leadership of Shree Janak Secondary School in Gaindakot-5, Nawalparasi.",
};

const ABOUT_SECTIONS = [
  {
    title: "Our History & Legacy",
    desc: "Founded in 2015 B.S. by Late Surya Bhakta Adhikari and community leaders to bring accessible education to Gaindakot.",
    href: "/about/history",
    icon: History,
    badge: "Est. 2015 B.S.",
  },
  {
    title: "Mission & Purpose",
    desc: "Empowering learners through academic rigor, critical thinking, bilingual fluency, and civic character.",
    href: "/about/mission",
    icon: Compass,
    badge: "Our Mission",
  },
  {
    title: "Vision for the Future",
    desc: "Inspiring every student to discover their true potential and make meaningful contributions to Nepal and the global community.",
    href: "/about/vision",
    icon: Sparkles,
    badge: "Our Vision",
  },
  {
    title: "Core Institutional Values",
    desc: "Integrity, discipline, respect, curiosity, excellence, and community engagement as foundational pillars.",
    href: "/about/values",
    icon: ShieldCheck,
    badge: "Core Values",
  },
  {
    title: "Principal's Message",
    desc: "A warm welcome from Principal Mr. Buddhi Prasad Kandel outlining our pedagogical commitment and accomplishments.",
    href: "/about/principal",
    icon: GraduationCap,
    badge: "Leadership",
  },
  {
    title: "Campus & Facilities",
    desc: "Four academic blocks, science laboratories, Room to Read library, and spacious athletic fields.",
    href: "/campus",
    icon: Building2,
    badge: "Infrastructure",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-off-white selection:bg-gold selection:text-white">
      {/* ─── Hero Header ─── */}
      <section className="relative hero-gradient text-white py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div
            className="w-full h-full"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-semibold uppercase tracking-wider text-gold-light mb-6">
            <Sparkles size={14} /> Institutional Heritage
          </div>
          <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight text-white mb-6">
            About Janak Higher Secondary School
          </h1>
          <p className="text-white/80 text-base sm:text-xl max-w-3xl mx-auto leading-relaxed font-sans">
            Building knowledge, character, and confidence for over six decades as a premier Model Public School in Gaindakot-5, Nawalparasi.
          </p>
        </div>
      </section>

      {/* ─── Who We Are ─── */}
      <section className="py-20 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-block px-3.5 py-1 rounded-full bg-navy/5 text-navy text-xs font-bold uppercase tracking-wider">
                Who We Are
              </div>
              <h2 className="font-display font-black text-2xl sm:text-4xl text-navy leading-tight">
                A Pillar of Academic Distinction in Lumbini Zone
              </h2>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                Shree Janak Secondary School (JHSS) is located at the serene confluence of culture and nature in Gaindakot-5, Nawalparasi. Established in <strong>2015 B.S. (~1958 A.D.)</strong> through the pioneering efforts of <strong>Late Surya Bhakta Adhikari</strong> and local social leaders, JHSS has evolved into a nationally recognized Model School.
              </p>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                Today, our school caters to over <strong>1,500 active learners</strong> across dual-medium sections — offering high-caliber English and Nepali medium instruction from Play Group through Grade 10, as well as specialized Higher Secondary (+2) streams in <strong>Science, Management, and Humanities</strong>.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                  <div className="text-2xl font-black text-gold">100%</div>
                  <div className="text-xs text-gray-500 font-semibold mt-1">SEE Pass Rate in English Medium</div>
                </div>
                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                  <div className="text-2xl font-black text-navy">1,500+</div>
                  <div className="text-xs text-gray-500 font-semibold mt-1">Enrolled Learners</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-gray-200">
                <Image
                  src="/images/school/school-building-1.jpg"
                  alt="Janak Higher Secondary School Main Building"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/70 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-gold-light text-xs font-bold uppercase tracking-wider block mb-1">
                    Main Campus
                  </span>
                  <p className="font-display font-bold text-lg">
                    Model School Congress Chowk Wing & Athletic Grounds
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Explore Section Hubs ─── */}
      <section className="py-20 bg-off-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-gold font-bold text-xs uppercase tracking-widest block mb-2">
              Explore Our Institution
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-navy">
              Discover Every Aspect of JHSS
            </h2>
            <p className="text-gray-600 text-sm mt-3">
              Deep dive into our milestones, leadership, philosophy, and campus facilities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {ABOUT_SECTIONS.map((sec) => {
              const Icon = sec.icon;
              return (
                <Link
                  key={sec.title}
                  href={sec.href}
                  className="group bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-navy/5 text-navy group-hover:bg-gold group-hover:text-navy-dark flex items-center justify-center transition-colors">
                        <Icon size={22} />
                      </div>
                      <span className="px-3 py-1 rounded-full bg-gray-50 text-gray-500 text-xs font-semibold">
                        {sec.badge}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-xl text-navy group-hover:text-gold transition-colors mb-3">
                      {sec.title}
                    </h3>
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-6">
                      {sec.desc}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 text-xs font-bold text-navy group-hover:text-gold transition-colors">
                    Learn More <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Campus Blocks Overview ─── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-gold font-bold text-xs uppercase tracking-widest block mb-2">
              Campus Infrastructure
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-navy">
              Four Specialized Academic Blocks
            </h2>
            <p className="text-gray-600 text-sm mt-3">
              Purpose-built spaces for early childhood, secondary learning, STEM innovation, and administration.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SCHOOL_INFO.campusBlocks.map((block) => (
              <div
                key={block.name}
                className="bg-gray-50 rounded-3xl overflow-hidden border border-gray-100 shadow-sm flex flex-col"
              >
                <div className="relative h-44 w-full">
                  <Image
                    src={block.image}
                    alt={block.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/60 via-transparent to-transparent" />
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display font-bold text-navy text-base mb-2">
                      {block.name}
                    </h3>
                    <p className="text-gray-600 text-xs leading-relaxed">
                      {block.desc}
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-gray-200/60">
                    <Link
                      href="/campus/infrastructure"
                      className="text-xs font-bold text-gold hover:underline inline-flex items-center gap-1"
                    >
                      View Block Details <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
