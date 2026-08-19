"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  GraduationCap,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Calendar,
  Award,
  BookOpen,
} from "lucide-react";
import { SCHOOL_INFO, STATS } from "@/lib/data/schoolData";
import { cn } from "@/lib/utils";

export interface HeroSlide {
  src: string;
  alt: string;
  title: string;
  caption: string;
  badge: string;
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    src: "/images/school/school-building-1.jpg",
    alt: "Janak Higher Secondary School main building",
    title: "Main Campus & Athletic Ground",
    caption: "Expansive academic infrastructure supporting over 1,500 students in Gaindakot.",
    badge: "Main Building",
  },
  {
    src: "/images/school/school-campus-garden.jpg",
    alt: "Janak Higher Secondary School campus and garden",
    title: "Eco-Green Campus & Gardens",
    caption: "Vibrant, green environment fostering creativity, botanical study, and holistic growth.",
    badge: "Campus Grounds",
  },
  {
    src: "/images/school/school-building-3.jpg",
    alt: "Janak Higher Secondary School main building from an elevated view",
    title: "Modern Multi-Story Academic Complex",
    caption: "State-of-the-art classrooms, science laboratories, and ICT learning facilities.",
    badge: "Academic Complex",
  },
];

export default function Hero() {
  // Deterministic initial visitor assignment (0, 1, or 2)
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isClient, setIsClient] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // 1. Deterministic visitor selection on mount
  useEffect(() => {
    setIsClient(true);

    // Check prefers-reduced-motion
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(motionQuery.matches);
    const handleMotionChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    motionQuery.addEventListener("change", handleMotionChange);

    try {
      // Check existing anonymous visitor preference
      const storedIdx = localStorage.getItem("jhss_hero_visitor_idx");
      if (storedIdx !== null && !isNaN(Number(storedIdx))) {
        const parsed = Number(storedIdx) % HERO_SLIDES.length;
        setCurrentIndex(parsed);
      } else {
        // Assign a deterministic anonymous initial slide (0, 1, or 2)
        const assignedIdx = Math.floor(Math.random() * HERO_SLIDES.length);
        localStorage.setItem("jhss_hero_visitor_idx", String(assignedIdx));
        setCurrentIndex(assignedIdx);
      }
    } catch {
      // LocalStorage unavailable fallback
    }

    return () => {
      motionQuery.removeEventListener("change", handleMotionChange);
    };
  }, []);

  // 2. Subtle rotation timer (8.5 seconds per slide)
  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  const goToSlide = (idx: number) => {
    setCurrentIndex(idx);
  };

  useEffect(() => {
    if (isPaused) return;

    timerRef.current = setInterval(() => {
      nextSlide();
    }, 8500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [nextSlide, isPaused]);

  // 3. Subtle 3D mouse parallax on desktop
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !heroRef.current) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 16; // subtle range -8px to 8px
    const y = (clientY / innerHeight - 0.5) * 16;
    setMousePosition({ x, y });
  };

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => {
        setIsPaused(false);
        setMousePosition({ x: 0, y: 0 });
      }}
      className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center overflow-hidden bg-navy-dark text-white selection:bg-gold selection:text-white"
      aria-label="Janak Higher Secondary School Hero Carousel"
    >
      {/* ─── REAL SCHOOL PHOTOGRAPHY BACKGROUND CAROUSEL ─── */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {HERO_SLIDES.map((slide, idx) => {
          const isActive = idx === currentIndex;
          return (
            <div
              key={slide.src}
              className={cn(
                "absolute inset-0 transition-opacity duration-1500 ease-in-out",
                isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              )}
            >
              <div
                className={cn(
                  "relative w-full h-full transition-transform duration-10000 ease-out",
                  isActive && !prefersReducedMotion ? "scale-105" : "scale-100"
                )}
                style={
                  !prefersReducedMotion && isActive
                    ? {
                        transform: `translate3d(${mousePosition.x * -0.5}px, ${
                          mousePosition.y * -0.5
                        }px, 0)`,
                      }
                    : undefined
                }
              >
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  priority={idx === 0 || idx === currentIndex}
                  loading={idx === 0 || idx === currentIndex ? "eager" : "lazy"}
                  sizes="100vw"
                  className="object-cover object-center"
                  quality={90}
                />
              </div>
            </div>
          );
        })}

        {/* ─── PREMIUM GRADIENT OVERLAYS (Preserves building clarity) ─── */}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-navy-dark/90 via-navy-dark/65 to-transparent sm:w-3/4 lg:w-3/5 pointer-events-none" />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-navy-dark/95 via-transparent to-navy-dark/40 pointer-events-none" />
        
        {/* Subtle grid ambience */}
        <div
          className="absolute inset-0 z-10 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      {/* ─── MAIN HERO CONTENT ─── */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 w-full">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: School Identity & Headlines */}
          <div
            className="lg:col-span-8 text-left transition-transform duration-300 ease-out"
            style={
              !prefersReducedMotion
                ? {
                    transform: `translate3d(${mousePosition.x * 0.4}px, ${
                      mousePosition.y * 0.4
                    }px, 0)`,
                  }
                : undefined
            }
          >
            {/* Location & Establishment Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-medium mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
              <span className="text-white/90">
                Est. {SCHOOL_INFO.establishedBS} B.S. ({SCHOOL_INFO.establishedAD})
              </span>
              <span className="text-white/40">|</span>
              <span className="text-gold-light font-semibold flex items-center gap-1">
                <MapPin size={13} /> {SCHOOL_INFO.location}
              </span>
            </div>

            {/* School Title & Subtitles */}
            <div className="mb-4">
              <span className="text-xs sm:text-sm uppercase tracking-[0.25em] text-gold-light font-bold block mb-1">
                {SCHOOL_INFO.nepaliName}
              </span>
              <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl leading-[1.1] tracking-tight text-white drop-shadow-md">
                JANAK HIGHER SECONDARY SCHOOL
              </h1>
            </div>

            {/* Tagline */}
            <div className="text-xl sm:text-2xl lg:text-3xl font-serif italic text-gold-light font-semibold mb-6 flex items-center gap-2">
              <span>&ldquo;Excellence in Education, Character & Future&rdquo;</span>
            </div>

            {/* Description */}
            <p className="text-white/80 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl mb-8 drop-shadow-sm font-sans">
              Shree Janak Secondary School (JHSS) is a renowned model public academic institution in Gaindakot, Nawalparasi, empowering over{" "}
              <strong className="text-white font-bold">1,500+</strong> students from Early Childhood Development to Grade 12 in English and Nepali mediums.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 items-center">
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-gold text-navy-dark font-bold text-sm hover:bg-gold-light transition-all duration-300 shadow-lg hover:shadow-gold/30 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                id="hero-explore-btn"
              >
                Explore Our School
                <ArrowRight size={16} />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white/15 hover:bg-white/25 text-white font-semibold text-sm backdrop-blur-md border border-white/30 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer shadow-md"
                id="hero-admissions-btn"
              >
                Admissions 2083
                <Sparkles size={16} className="text-gold-light" />
              </Link>

              <Link
                href="/portal/student"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-navy/80 hover:bg-navy text-white font-semibold text-sm border border-gold/30 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer shadow-md"
                id="hero-portal-btn"
              >
                <GraduationCap size={16} className="text-gold" />
                Student Portal
              </Link>
            </div>

            {/* Quick stats ribbon */}
            <div className="grid grid-cols-3 gap-3 sm:gap-6 mt-10 pt-8 border-t border-white/15 max-w-xl">
              <div>
                <div className="text-2xl sm:text-3xl font-black text-gold-light">1,500+</div>
                <div className="text-white/60 text-xs sm:text-sm font-medium mt-0.5">Enrolled Learners</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-gold-light">68+</div>
                <div className="text-white/60 text-xs sm:text-sm font-medium mt-0.5">Years of Legacy</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-gold-light">100%</div>
                <div className="text-white/60 text-xs sm:text-sm font-medium mt-0.5">SEE Pass Rate</div>
              </div>
            </div>
          </div>

          {/* Right Column: Floating Glass Card for Active Photo Spotlight */}
          <div className="hidden lg:block lg:col-span-4">
            <div
              className="bg-navy-dark/70 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl transition-transform duration-500 ease-out"
              style={
                !prefersReducedMotion
                  ? {
                      transform: `perspective(1000px) rotateY(${
                        mousePosition.x * 0.5
                      }deg) rotateX(${mousePosition.y * -0.5}deg)`,
                    }
                  : undefined
              }
            >
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/20 text-gold-light text-xs font-bold uppercase tracking-wider">
                  <Award size={13} /> {HERO_SLIDES[currentIndex].badge}
                </span>
                <span className="text-white/50 text-xs font-mono">
                  0{currentIndex + 1} / 0{HERO_SLIDES.length}
                </span>
              </div>

              <h3 className="font-display text-lg font-bold text-white mb-2 leading-snug">
                {HERO_SLIDES[currentIndex].title}
              </h3>
              <p className="text-white/70 text-xs leading-relaxed mb-4">
                {HERO_SLIDES[currentIndex].caption}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs text-white/60">
                <span className="flex items-center gap-1">
                  <Calendar size={13} className="text-gold" /> Academic Session 2083
                </span>
                <Link
                  href="/facilities"
                  className="text-gold-light font-semibold hover:underline flex items-center gap-0.5"
                >
                  Explore <ChevronRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── BOTTOM CONTROLS & PHOTO INDICATORS ─── */}
      <div className="absolute bottom-6 left-0 right-0 z-30 flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pointer-events-auto">
        {/* Caption on Mobile */}
        <div className="text-xs text-white/70 font-medium truncate max-w-[200px] sm:max-w-xs lg:hidden">
          {HERO_SLIDES[currentIndex].title}
        </div>

        {/* 3 Indicators (● ○ ○) with Manual Click Selection */}
        <div className="flex items-center gap-2.5 mx-auto lg:mx-0 bg-navy-dark/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/15">
          {HERO_SLIDES.map((slide, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={slide.src}
                onClick={() => goToSlide(idx)}
                aria-label={`Switch to ${slide.alt}`}
                aria-current={isActive ? "true" : "false"}
                className={cn(
                  "relative h-2.5 rounded-full transition-all duration-500 cursor-pointer",
                  isActive
                    ? "w-8 bg-gold shadow-gold"
                    : "w-2.5 bg-white/40 hover:bg-white/70"
                )}
              />
            );
          })}
        </div>

        {/* Previous / Next Arrow Controls */}
        <div className="hidden sm:flex items-center gap-2">
          <button
            onClick={prevSlide}
            aria-label="Previous School Photograph"
            className="w-10 h-10 rounded-full bg-navy-dark/60 backdrop-blur-md hover:bg-gold hover:text-navy-dark text-white border border-white/15 flex items-center justify-center transition-all duration-200 cursor-pointer shadow-md"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={nextSlide}
            aria-label="Next School Photograph"
            className="w-10 h-10 rounded-full bg-navy-dark/60 backdrop-blur-md hover:bg-gold hover:text-navy-dark text-white border border-white/15 flex items-center justify-center transition-all duration-200 cursor-pointer shadow-md"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
