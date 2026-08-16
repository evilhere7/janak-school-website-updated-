import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";
import { SCHOOL_INFO } from "@/lib/data/schoolData";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Shree Janak Secondary School's rich history, vision, mission, campus blocks, and principal's message.",
};

export default function AboutPage() {
  return (
    <div>
      {/* Page header */}
      <div className="hero-gradient py-20 text-center text-white">
        <div className="max-w-3xl mx-auto px-6">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white/70 text-xs font-semibold uppercase tracking-widest mb-4">
            About JHSS
          </span>
          <h1 className="font-display text-5xl font-bold mb-4">Our Story & Legacy</h1>
          <p className="text-white/70 text-lg">
            A proud institution serving Nawalparasi&apos;s educational needs since {SCHOOL_INFO.establishedBS}.
          </p>
        </div>
      </div>

      {/* History */}
      <section className="section-padding bg-white" id="history">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-navy/8 text-navy text-xs font-semibold uppercase tracking-widest mb-4">
              Our History
            </span>
            <h2 className="font-display text-4xl font-bold text-navy mb-6">
              Established {SCHOOL_INFO.establishedBS}
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Shree Janak Secondary School is one of the oldest, most reputed, and well-established educational institutions located at the lap of Gautam Buddha&apos;s birthplace, Lumbini Zone — specifically at Gaindakot-5, Nawalparasi.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              The school was established in <strong>2015 B.S.</strong> through the outstanding leadership of <strong>Late Surya Bhakta Adhikari</strong> (Ex-Member of Parliament), countless intellectual head teachers, social workers, community members, and members of the school management committee.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              Today, the school runs in two medium streams — <strong>Nepali and English Medium</strong> — from Play Group through Nursery all the way to Class 12 (+2 Science, Management, and Humanities). Adequate facilities and amenities are the main attraction of this institution. About <strong>1,500 learners</strong> are currently pursuing their dreams here.
            </p>
            <p className="text-gray-600 leading-relaxed">
              The main motto of the institution is to provide <em>quality education to all people belonging to different races and ethnic groups</em>. Though a governmental organization, its popularity has spread across national and international arenas, with recognition including a visit from <strong>Former President Dr. Ram Baran Yadav</strong>.
            </p>
          </div>
          <div className="relative">
            <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl">
              <Image src="/assets/gallery/golden-jubilee_30.jpg" alt="JHSS Golden Jubilee" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <div className="text-2xl font-bold">Golden Jubilee</div>
                <div className="text-white/70 text-sm">50+ Years Celebration</div>
              </div>
            </div>
            <div className="absolute -top-6 -right-6 bg-gold text-white p-6 rounded-2xl shadow-gold text-center">
              <div className="text-3xl font-bold">65+</div>
              <div className="text-sm">Years</div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section-padding bg-gray-50" id="vision">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full bg-navy/8 text-navy text-xs font-semibold uppercase tracking-widest mb-4">
              Vision & Mission
            </span>
            <h2 className="font-display text-4xl font-bold text-navy">
              What Guides <span className="text-gradient-gold">Everything We Do</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Our Vision",
                content: "To be the premier educational institution in Nawalparasi, developing well-rounded, morally grounded, and intellectually excellent individuals who positively contribute to Nepal and the global community.",
              },
              {
                title: "Our Mission",
                content: "To provide quality, inclusive education to all learners regardless of socioeconomic background, combining modern pedagogy with strong Nepali values and a commitment to academic excellence.",
              },
              {
                title: "Our Objectives",
                content: "Achieve 100% SEE/SLC results, foster digital literacy, maintain a safe learning environment, empower girls' education, and cultivate leaders through extracurricular excellence.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <div className="w-12 h-1 bg-gold rounded-full mb-4" />
                <h3 className="font-bold text-navy text-xl mb-4">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Campus Blocks */}
      <section className="section-padding bg-white" id="campus">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full bg-navy/8 text-navy text-xs font-semibold uppercase tracking-widest mb-4">
              Campus Blocks
            </span>
            <h2 className="font-display text-4xl font-bold text-navy">
              Our <span className="text-gradient-gold">Campus</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SCHOOL_INFO.campusBlocks.map((block, i) => (
              <div key={block.name} className="bg-navy rounded-2xl p-6 text-white card-hover">
                <div className="w-10 h-10 rounded-xl bg-gold/20 flex items-center justify-center mb-4 text-gold-light font-bold text-lg">
                  {i + 1}
                </div>
                <h3 className="font-bold text-base mb-2">{block.name}</h3>
                <p className="text-white/60 text-sm">{block.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Principal Section */}
      <section className="section-padding bg-gray-50" id="principal">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="grid md:grid-cols-5 gap-0">
              <div className="md:col-span-2 relative min-h-[360px]">
                <Image
                  src={SCHOOL_INFO.principal.image}
                  alt={SCHOOL_INFO.principal.name}
                  fill
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/80 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="font-bold text-xl">{SCHOOL_INFO.principal.name}</div>
                  <div className="text-gold-light text-sm">{SCHOOL_INFO.principal.title}</div>
                </div>
              </div>
              <div className="md:col-span-3 p-8 lg:p-12 flex flex-col justify-center">
                <span className="inline-block px-4 py-1.5 rounded-full bg-gold/10 text-gold text-xs font-semibold uppercase tracking-widest mb-4">
                  Principal&apos;s Message
                </span>
                <div className="text-5xl text-gold/20 font-display leading-none mb-2">&ldquo;</div>
                <blockquote className="text-gray-700 text-base leading-relaxed italic mb-6">
                  {SCHOOL_INFO.principal.message}
                </blockquote>
                <div className="mt-2 text-sm text-gray-400">— {SCHOOL_INFO.principal.name}, {SCHOOL_INFO.principal.title}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="section-padding hero-gradient">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white/70 text-xs font-semibold uppercase tracking-widest mb-4">
            Our Achievements
          </span>
          <h2 className="font-display text-4xl font-bold text-white mb-10">
            Milestones of <span className="text-gradient-gold">Excellence</span>
          </h2>
          <div className="grid sm:grid-cols-2 gap-4 text-left">
            {SCHOOL_INFO.achievements.map((a) => (
              <div key={a} className="flex items-center gap-3 bg-white/5 rounded-2xl p-4 border border-white/10">
                <CheckCircle size={20} className="text-gold flex-shrink-0" />
                <span className="text-white/80 text-sm">{a}</span>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Link href="/facilities" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gold text-white font-semibold text-sm hover:bg-gold-light transition-all shadow-gold">
              Explore Our Facilities <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
