"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Users,
  Award,
  Star,
  GraduationCap,
  BookOpen,
  FlaskConical,
  Monitor,
  Trophy,
  ChevronRight,
  AlertCircle,
  Calendar,
  Newspaper,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import { SCHOOL_INFO, NOTICES, NEWS_ITEMS, FACILITIES, GALLERY_ITEMS, STATS } from "@/lib/data/schoolData";
import { cn, formatDate } from "@/lib/utils";

// ─── Icon map ───────────────────────────────────────────
const ICON_MAP: Record<string, React.ReactNode> = {
  Users: <Users size={24} />,
  GraduationCap: <GraduationCap size={24} />,
  Star: <Star size={24} />,
  Award: <Award size={24} />,
  BookOpen: <BookOpen size={28} />,
  FlaskConical: <FlaskConical size={28} />,
  Monitor: <Monitor size={28} />,
  Trophy: <Trophy size={28} />,
};

// ─── Section header ──────────────────────────────────────
function SectionHeader({ label, title, subtitle, light = false }: {
  label: string; title: React.ReactNode; subtitle?: string; light?: boolean;
}) {
  return (
    <div className="text-center max-w-2xl mx-auto mb-14">
      <span className={cn(
        "inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-4",
        light
          ? "bg-white/10 text-white/80"
          : "bg-navy/8 text-navy"
      )}>
        {label}
      </span>
      <h2 className={cn(
        "font-display text-3xl sm:text-4xl font-bold leading-tight mb-4",
        light ? "text-white" : "text-navy"
      )}>
        {title}
      </h2>
      {subtitle && (
        <p className={cn("text-base leading-relaxed", light ? "text-white/70" : "text-gray-500")}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

// ─── Hero Section ────────────────────────────────────────
function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden hero-gradient"
      aria-label="JHSS Hero"
    >
      {/* Decorative circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #c8921a 0%, transparent 70%)" }}
        />
        <div
          className="absolute -bottom-48 -left-24 w-[500px] h-[500px] rounded-full opacity-8"
          style={{ background: "radial-gradient(circle, #1a3366 0%, transparent 70%)" }}
        />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px"
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 grid lg:grid-cols-2 gap-16 items-center">
        {/* Text content */}
        <div className="text-white animate-fade-up">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 text-sm">
            <span className="w-2 h-2 rounded-full bg-gold-light animate-pulse" />
            <span className="text-white/80">Est. {SCHOOL_INFO.establishedBS} · Gaindakot, Nawalparasi</span>
          </div>

          {/* Logo + Name */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative w-20 h-20 rounded-full overflow-hidden ring-4 ring-gold/30 shadow-gold flex-shrink-0">
              <Image
                src="/assets/logo/jhss-logo3_1.png"
                alt="JHSS Logo"
                fill
                className="object-contain p-1.5"
                priority
              />
            </div>
            <div>
              <div className="text-gold-light text-sm font-semibold tracking-widest uppercase mb-1">
                {SCHOOL_INFO.shortName}
              </div>
              <h1 className="font-display text-2xl sm:text-3xl font-bold leading-tight text-white">
                {SCHOOL_INFO.name}
              </h1>
              <p className="text-white/50 text-sm mt-0.5">{SCHOOL_INFO.nepaliName}</p>
            </div>
          </div>

          <p className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            <span className="text-gradient-gold">&ldquo;</span>
            <span className="text-white">{SCHOOL_INFO.tagline}</span>
            <span className="text-gradient-gold">&rdquo;</span>
          </p>

          <p className="text-white/70 text-lg leading-relaxed mb-10 max-w-xl">
            One of Nepal&apos;s oldest, most reputed institutions serving{" "}
            <span className="text-gold-light font-semibold">1,500+</span> learners from
            Play Group to Class 12 in both English and Nepali medium.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gold text-white font-semibold text-sm hover:bg-gold-light transition-all duration-200 shadow-gold hover:shadow-lg hover:-translate-y-0.5"
              id="hero-explore-btn"
            >
              Explore Our School <ArrowRight size={16} />
            </Link>
            <Link
              href="/portal/student"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full glass text-white font-semibold text-sm hover:bg-white/15 transition-all duration-200 hover:-translate-y-0.5"
              id="hero-portal-btn"
            >
              <GraduationCap size={16} /> Student Portal
            </Link>
          </div>

          {/* Quick stats row */}
          <div className="flex flex-wrap gap-6 mt-12 pt-10 border-t border-white/10">
            {STATS.map((s) => (
              <div key={s.label}>
                <div className="text-2xl font-bold text-gold-light">{s.value}</div>
                <div className="text-white/50 text-xs">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Visual panel */}
        <div className="hidden lg:block animate-fade-up animation-delay-200">
          <div className="relative">
            {/* Main image */}
            <div className="relative w-full aspect-square max-w-[480px] mx-auto">
              <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/assets/gallery/golden-jubilee_30.jpg"
                  alt="Shree Janak Secondary School Campus"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/60 to-transparent" />
              </div>

              {/* Floating cards */}
              <div className="absolute -left-12 top-12 glass-dark rounded-2xl p-4 shadow-xl animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gold/20 flex items-center justify-center">
                    <Award size={20} className="text-gold-light" />
                  </div>
                  <div>
                    <div className="text-white font-bold text-sm">100% SEE</div>
                    <div className="text-white/50 text-xs">Pass Rate</div>
                  </div>
                </div>
              </div>

              <div className="absolute -right-10 bottom-20 glass-dark rounded-2xl p-4 shadow-xl animate-float animation-delay-300">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gold/20 flex items-center justify-center">
                    <Users size={20} className="text-gold-light" />
                  </div>
                  <div>
                    <div className="text-white font-bold text-sm">1,500+</div>
                    <div className="text-white/50 text-xs">Students</div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-6 left-8 glass-dark rounded-2xl p-4 shadow-xl animate-float animation-delay-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gold/20 flex items-center justify-center">
                    <Star size={20} className="text-gold-light" />
                  </div>
                  <div>
                    <div className="text-white font-bold text-sm">65+ Years</div>
                    <div className="text-white/50 text-xs">of Excellence</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <div className="w-5 h-8 rounded-full border-2 border-white/30 flex items-start justify-center p-1">
          <div className="w-1 h-2 bg-gold rounded-full" />
        </div>
      </div>
    </section>
  );
}

// ─── Announcement Banner ─────────────────────────────────
function AnnouncementBanner() {
  const urgent = NOTICES.filter((n) => n.isImportant).slice(0, 2);
  if (urgent.length === 0) return null;
  return (
    <div className="bg-gold text-navy-dark">
      <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-1.5 text-sm font-bold flex-shrink-0">
            <AlertCircle size={16} />
            Important Notice
          </div>
          <div className="h-4 w-px bg-navy/20 hidden sm:block" />
          <div className="flex flex-wrap gap-4 text-sm">
            {urgent.map((n) => (
              <Link key={n.id} href="/notices" className="hover:underline">
                {n.title.slice(0, 60)}…
              </Link>
            ))}
          </div>
          <Link href="/notices" className="ml-auto flex-shrink-0 text-xs font-semibold flex items-center gap-1 hover:underline">
            View All <ChevronRight size={12} />
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─── About Snippet ───────────────────────────────────────
function AboutSection() {
  return (
    <section className="section-padding bg-white" id="about">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Images */}
          <div className="relative">
            <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/assets/gallery/president_31.jpg"
                alt="JHSS Presidential visit"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-navy/40 to-transparent" />
            </div>
            <div className="absolute -bottom-8 -right-8 w-48 h-36 rounded-2xl overflow-hidden shadow-xl border-4 border-white">
              <Image
                src="/assets/gallery/blood-donation_29.jpg"
                alt="JHSS Community"
                fill
                className="object-cover"
              />
            </div>
            {/* Achievement tag */}
            <div
              className="absolute top-6 -left-6 bg-gold text-white px-5 py-3 rounded-xl shadow-gold font-bold"
              style={{ writingMode: "horizontal-tb" }}
            >
              <div className="text-2xl font-bold">65+</div>
              <div className="text-xs font-normal">Years</div>
            </div>
          </div>

          {/* Text */}
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-navy/8 text-navy text-xs font-semibold uppercase tracking-widest mb-4">
              About JHSS
            </span>
            <h2 className="font-display text-4xl font-bold text-navy leading-tight mb-6">
              A Legacy of Excellence <br /> in Nawalparasi
            </h2>
            <p className="text-gray-600 text-base leading-relaxed mb-5">
              Shree Janak Secondary School is one of the oldest, most reputed, and well-established educational institutions in the Lumbini Zone, located at Gaindakot-5, Nawalparasi.
            </p>
            <p className="text-gray-600 text-base leading-relaxed mb-8">
              Established in <strong>2015 B.S.</strong> through the visionary efforts of Late Surya Bhakta Adhikari (Ex-MP) and countless community leaders, the school now serves <strong>~1,500 learners</strong> across Play Group to Class 12 in both English and Nepali medium. The school has achieved <strong>100% SEE pass rate</strong> from its English medium classes.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {SCHOOL_INFO.achievements.slice(0, 4).map((a) => (
                <div key={a} className="flex items-start gap-2 text-sm text-gray-700">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5 flex-shrink-0" />
                  {a}
                </div>
              ))}
            </div>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-navy text-white text-sm font-semibold hover:bg-navy-light transition-all shadow-navy hover:-translate-y-0.5"
            >
              Read Full Story <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Stats Bar ───────────────────────────────────────────
function StatsSection() {
  return (
    <section className="py-16 hero-gradient" aria-label="School Statistics">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={cn("text-center animate-fade-up", `animation-delay-${i * 100 + 100}`)}
            >
              <div className="text-4xl sm:text-5xl font-bold text-gradient-gold mb-2">
                {stat.value}
              </div>
              <div className="text-white/60 text-sm font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Principal's Message ─────────────────────────────────
function PrincipalSection() {
  return (
    <section className="section-padding bg-gray-50" id="principal">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-5 gap-0">
            {/* Photo side */}
            <div className="md:col-span-2 relative min-h-[320px] bg-navy">
              <Image
                src={SCHOOL_INFO.principal.image}
                alt={`${SCHOOL_INFO.principal.name} - Principal JHSS`}
                fill
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/80 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="font-bold text-lg">{SCHOOL_INFO.principal.name}</div>
                <div className="text-gold-light text-sm">{SCHOOL_INFO.principal.title}</div>
                <div className="text-white/50 text-xs mt-1">Shree Janak Secondary School</div>
              </div>
            </div>

            {/* Message side */}
            <div className="md:col-span-3 p-8 lg:p-12 flex flex-col justify-center">
              <span className="inline-block px-4 py-1.5 rounded-full bg-gold/10 text-gold text-xs font-semibold uppercase tracking-widest mb-5">
                Principal&apos;s Message
              </span>
              <div className="text-4xl text-gold/30 font-display leading-none mb-3">&ldquo;</div>
              <blockquote className="text-gray-700 text-base leading-relaxed italic mb-6">
                {SCHOOL_INFO.principal.message}
              </blockquote>
              <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                <Link
                  href="/about#principal"
                  className="inline-flex items-center gap-2 text-navy text-sm font-semibold hover:text-gold transition-colors"
                >
                  Read Full Message <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Facilities ──────────────────────────────────────────
function FacilitiesSection() {
  return (
    <section className="section-padding bg-white" id="facilities">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          label="Our Facilities"
          title={<>World-Class Learning <span className="text-gradient-gold">Environment</span></>}
          subtitle="State-of-the-art infrastructure designed to nurture every dimension of student potential."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FACILITIES.map((facility, i) => (
            <div
              key={facility.id}
              className={cn(
                "group relative rounded-2xl overflow-hidden shadow-md card-hover bg-white border border-gray-100",
                `animate-fade-up animation-delay-${i * 100 + 100}`
              )}
            >
              <div className="relative h-44 overflow-hidden">
                <Image
                  src={facility.image}
                  alt={facility.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
                <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-gold/90 flex items-center justify-center text-white">
                  {ICON_MAP[facility.icon]}
                </div>
              </div>
              <div className="p-5">
                <span className="text-xs font-semibold text-gold uppercase tracking-wide">{facility.category}</span>
                <h3 className="font-bold text-navy text-base mt-1 mb-2">{facility.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
                  {facility.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            href="/facilities"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border-2 border-navy text-navy font-semibold text-sm hover:bg-navy hover:text-white transition-all"
          >
            View All Facilities <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── Academic Programs ───────────────────────────────────
function AcademicsSection() {
  const levels = [
    { title: "School Level", subtitle: "Class 1 – 10 (SEE)", icon: <BookOpen size={24} />, desc: "Comprehensive NEB curriculum in English and Nepali medium with 100% SEE pass record." },
    { title: "+2 Science", subtitle: "Class 11 – 12", icon: <FlaskConical size={24} />, desc: "Physics, Chemistry, Biology/Math, and Computer Science under NEB board." },
    { title: "+2 Management", subtitle: "Class 11 – 12", icon: <Monitor size={24} />, desc: "Accountancy, Economics, Business Studies and Hotel Management stream." },
    { title: "+2 Humanities", subtitle: "Class 11 – 12", icon: <GraduationCap size={24} />, desc: "Social Sciences, Nepali, English, Population & Environment streams." },
  ];

  return (
    <section className="section-padding bg-gray-50" id="academics">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          label="Academic Programs"
          title={<>Shaping Futures Through <span className="text-gradient-gold">Quality Education</span></>}
          subtitle="From foundational primary learning to specialized higher secondary streams, JHSS provides holistic education for every stage."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {levels.map((lvl, i) => (
            <div
              key={lvl.title}
              className={cn(
                "bg-white rounded-2xl p-7 border border-gray-100 shadow-sm card-hover",
                `animate-fade-up animation-delay-${i * 100 + 100}`
              )}
            >
              <div className="w-12 h-12 rounded-xl bg-navy/8 flex items-center justify-center text-navy mb-4">
                {lvl.icon}
              </div>
              <h3 className="font-bold text-navy text-lg mb-1">{lvl.title}</h3>
              <p className="text-gold text-xs font-semibold mb-3">{lvl.subtitle}</p>
              <p className="text-gray-500 text-sm leading-relaxed">{lvl.desc}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            href="/academics"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-navy text-white font-semibold text-sm hover:bg-navy-light transition-all shadow-navy hover:-translate-y-0.5"
          >
            View Full Curriculum <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── News Section ────────────────────────────────────────
function NewsSection() {
  return (
    <section className="section-padding bg-white" id="news">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-12">
          <SectionHeader
            label="Latest News"
            title={<>News & <span className="text-gradient-gold">Events</span></>}
          />
          <Link href="/news" className="hidden sm:flex items-center gap-1 text-navy font-semibold text-sm hover:text-gold transition-colors mb-4">
            View All <ChevronRight size={16} />
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {NEWS_ITEMS.map((item, i) => (
            <Link
              key={item.id}
              href={`/news/${item.slug}`}
              className={cn(
                "group block rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white",
                `animate-fade-up animation-delay-${i * 100 + 100}`
              )}
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent" />
                <span className="absolute top-3 left-3 bg-gold text-white text-xs font-semibold px-3 py-1 rounded-full">
                  {item.category}
                </span>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-2">
                  <Calendar size={12} />
                  {formatDate(item.date)}
                </div>
                <h3 className="font-bold text-navy text-base leading-snug mb-2 group-hover:text-gold transition-colors line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">{item.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Notices Section ─────────────────────────────────────
function NoticesSection() {
  const categoryColor: Record<string, string> = {
    ADMISSION: "bg-blue-100 text-blue-700",
    EXAM: "bg-purple-100 text-purple-700",
    TENDER: "bg-amber-100 text-amber-700",
    GENERAL: "bg-gray-100 text-gray-600",
  };

  return (
    <section className="section-padding hero-gradient" id="notices">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeader
          label="Notice Board"
          title={<>Official <span className="text-gradient-gold">Notices</span></>}
          subtitle="Stay updated with the latest announcements, exam schedules, and important notices from JHSS."
          light
        />
        <div className="space-y-4">
          {NOTICES.map((notice, i) => (
            <div
              key={notice.id}
              className={cn(
                "bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-5 flex items-start gap-4 hover:bg-white/10 transition-all duration-200",
                `animate-fade-up animation-delay-${i * 100 + 100}`
              )}
            >
              {notice.isImportant && (
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gold/20 flex items-center justify-center">
                  <AlertCircle size={18} className="text-gold-light" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  <span className={cn("text-xs font-semibold px-2.5 py-0.5 rounded-full", categoryColor[notice.category] ?? "bg-gray-100 text-gray-600")}>
                    {notice.category}
                  </span>
                  {notice.isImportant && (
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-red-100 text-red-600">URGENT</span>
                  )}
                  <span className="text-white/40 text-xs ml-auto">{formatDate(notice.date)}</span>
                </div>
                <h3 className="text-white font-semibold text-sm leading-snug">{notice.title}</h3>
                <p className="text-white/50 text-xs mt-1 line-clamp-1">{notice.description}</p>
              </div>
              {notice.pdfUrl && (
                <a href={notice.pdfUrl} target="_blank" rel="noopener noreferrer" className="flex-shrink-0 text-gold-light text-xs hover:underline">
                  View
                </a>
              )}
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link
            href="/notices"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border-2 border-gold/40 text-white font-semibold text-sm hover:bg-gold hover:border-gold transition-all"
          >
            <Newspaper size={15} /> All Notices
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── Gallery Preview ─────────────────────────────────────
function GallerySection() {
  return (
    <section className="section-padding bg-white" id="gallery">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          label="Photo Gallery"
          title={<>Moments That <span className="text-gradient-gold">Define Us</span></>}
          subtitle="A glimpse into the vibrant life, events, and achievements at Shree Janak Secondary School."
        />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {GALLERY_ITEMS.slice(0, 6).map((item, i) => (
            <Link
              key={item.id}
              href="/gallery"
              className={cn(
                "relative group overflow-hidden rounded-2xl shadow-sm",
                i === 0 ? "col-span-2 row-span-2 aspect-square" : "aspect-square",
                `animate-fade-up animation-delay-${i * 80}`
              )}
            >
              <Image
                src={item.image}
                alt={item.caption}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/40 transition-all duration-300" />
              <div className="absolute inset-0 flex items-end p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-xs font-medium line-clamp-2">{item.caption}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-navy text-white font-semibold text-sm hover:bg-navy-light transition-all shadow-navy hover:-translate-y-0.5"
          >
            View Full Gallery <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── Contact CTA ─────────────────────────────────────────
function ContactCTA() {
  return (
    <section className="section-padding bg-gray-50" id="contact-cta">
      <div className="max-w-5xl mx-auto px-6">
        <div className="bg-navy rounded-3xl p-10 lg:p-14 grid md:grid-cols-2 gap-12 items-center shadow-navy">
          <div className="text-white">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white/70 text-xs font-semibold uppercase tracking-widest mb-4">
              Find Us
            </span>
            <h2 className="font-display text-3xl font-bold text-white mb-4">
              Come Visit <span className="text-gradient-gold">Our School</span>
            </h2>
            <div className="space-y-4">
              <div className="flex gap-3 text-white/70 text-sm">
                <MapPin size={16} className="text-gold flex-shrink-0 mt-0.5" />
                {SCHOOL_INFO.location}
              </div>
              {SCHOOL_INFO.phones.map((p) => (
                <div key={p} className="flex gap-3 text-white/70 text-sm">
                  <Phone size={16} className="text-gold flex-shrink-0" />
                  <a href={`tel:${p}`} className="hover:text-white transition-colors">{p}</a>
                </div>
              ))}
              {SCHOOL_INFO.emails.map((e) => (
                <div key={e} className="flex gap-3 text-white/70 text-sm">
                  <Mail size={16} className="text-gold flex-shrink-0" />
                  <a href={`mailto:${e}`} className="hover:text-white transition-colors">{e}</a>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <div className="relative h-48 rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/assets/campus/janakmap_11.jpg"
                alt="JHSS Location Map"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex gap-3">
              <Link
                href="/contact"
                className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-gold text-white text-sm font-semibold hover:bg-gold-light transition-all"
              >
                Contact Us <ArrowRight size={14} />
              </Link>
              <Link
                href="/portal/student"
                className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-white/20 text-white text-sm font-semibold hover:bg-white/10 transition-all"
              >
                <GraduationCap size={14} /> Student Portal
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Main Page ───────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AnnouncementBanner />
      <AboutSection />
      <StatsSection />
      <PrincipalSection />
      <FacilitiesSection />
      <AcademicsSection />
      <NewsSection />
      <NoticesSection />
      <GallerySection />
      <ContactCTA />
    </>
  );
}
