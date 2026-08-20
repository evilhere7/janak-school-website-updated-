import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  BookOpen,
  GraduationCap,
  Sparkles,
  Building2,
  Trophy,
} from "lucide-react";
import { SCHOOL_INFO } from "@/lib/data/schoolData";

const FacebookIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const YoutubeIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-navy text-white selection:bg-gold selection:text-white">
      {/* Admissions CTA Ribbon */}
      <div className="bg-gradient-to-r from-gold via-gold-light to-gold text-navy-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-navy/10 text-navy font-bold text-xs uppercase tracking-wider mb-2">
              <Sparkles size={13} /> Admissions Open 2083
            </span>
            <h3 className="text-navy font-display font-black text-xl sm:text-2xl">
              Begin Your Educational Journey With JHSS
            </h3>
            <p className="text-navy/80 text-xs sm:text-sm mt-1 max-w-xl">
              Offering premier English & Nepali medium education from Play Group to Grade 12 (+2 Science, Management & Humanities).
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 flex-shrink-0">
            <Link
              href="/admissions"
              className="px-6 py-3 rounded-full bg-navy text-white text-xs sm:text-sm font-bold hover:bg-navy-dark transition-all shadow-md hover:-translate-y-0.5"
            >
              Admissions Portal
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 rounded-full bg-white text-navy text-xs sm:text-sm font-bold hover:bg-gray-100 transition-all shadow-md hover:-translate-y-0.5"
            >
              Contact Office
            </Link>
          </div>
        </div>
      </div>

      {/* Main 5-Column Navigation Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Column 1: School Identity */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-gold/40 bg-white p-0.5 flex-shrink-0">
                <Image
                  src="/assets/logo/jhss-logo3_1.png"
                  alt="JHSS Logo"
                  fill
                  sizes="48px"
                  className="object-contain"
                />
              </div>
              <div>
                <div className="font-display font-black text-white text-base leading-tight">JHSS</div>
                <div className="text-gold-light text-xs font-semibold">Est. {SCHOOL_INFO.establishedBS}</div>
              </div>
            </div>
            <p className="text-white/60 text-xs leading-relaxed mb-5">
              {SCHOOL_INFO.nepaliName} — A recognized Model Public School delivering academic distinction and character development in Nawalparasi.
            </p>
            <div className="flex gap-3">
              <a
                href={SCHOOL_INFO.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-gold hover:text-navy-dark flex items-center justify-center transition-colors"
              >
                <FacebookIcon size={14} />
              </a>
              <a
                href={SCHOOL_INFO.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-gold hover:text-navy-dark flex items-center justify-center transition-colors"
              >
                <YoutubeIcon size={14} />
              </a>
              <a
                href={`mailto:${SCHOOL_INFO.emails[0]}`}
                aria-label="Email"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-gold hover:text-navy-dark flex items-center justify-center transition-colors"
              >
                <Mail size={14} />
              </a>
            </div>
          </div>

          {/* Column 2: About JHSS */}
          <div>
            <h4 className="font-display font-bold text-white text-sm uppercase tracking-wider mb-4 flex items-center gap-1.5 text-gold-light">
              <BookOpen size={14} /> About JHSS
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/about" className="text-white/60 hover:text-white transition-colors">
                  Institutional Overview
                </Link>
              </li>
              <li>
                <Link href="/about/history" className="text-white/60 hover:text-white transition-colors">
                  History & Milestones
                </Link>
              </li>
              <li>
                <Link href="/about/mission" className="text-white/60 hover:text-white transition-colors">
                  Mission & Philosophy
                </Link>
              </li>
              <li>
                <Link href="/about/vision" className="text-white/60 hover:text-white transition-colors">
                  Vision for the Future
                </Link>
              </li>
              <li>
                <Link href="/about/values" className="text-white/60 hover:text-white transition-colors">
                  Our Core Values
                </Link>
              </li>
              <li>
                <Link href="/about/principal" className="text-white/60 hover:text-white transition-colors">
                  Principal&apos;s Message
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Academics & Programs */}
          <div>
            <h4 className="font-display font-bold text-white text-sm uppercase tracking-wider mb-4 flex items-center gap-1.5 text-gold-light">
              <GraduationCap size={14} /> Academics
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/academics" className="text-white/60 hover:text-white transition-colors">
                  Academic Streams
                </Link>
              </li>
              <li>
                <Link href="/academics/programs" className="text-white/60 hover:text-white transition-colors">
                  School Level (PG–10)
                </Link>
              </li>
              <li>
                <Link href="/academics/programs" className="text-white/60 hover:text-white transition-colors">
                  +2 Science Stream
                </Link>
              </li>
              <li>
                <Link href="/academics/programs" className="text-white/60 hover:text-white transition-colors">
                  +2 Management Stream
                </Link>
              </li>
              <li>
                <Link href="/academics/programs" className="text-white/60 hover:text-white transition-colors">
                  +2 Humanities Stream
                </Link>
              </li>
              <li>
                <Link href="/faculty" className="text-white/60 hover:text-white transition-colors">
                  Faculty Directory
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Admissions & Campus */}
          <div>
            <h4 className="font-display font-bold text-white text-sm uppercase tracking-wider mb-4 flex items-center gap-1.5 text-gold-light">
              <Building2 size={14} /> Campus Life
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/admissions/process" className="text-white/60 hover:text-white transition-colors">
                  Admission Roadmap
                </Link>
              </li>
              <li>
                <Link href="/admissions/requirements" className="text-white/60 hover:text-white transition-colors">
                  Eligibility & Documents
                </Link>
              </li>
              <li>
                <Link href="/admissions/faq" className="text-white/60 hover:text-white transition-colors">
                  Admissions FAQ
                </Link>
              </li>
              <li>
                <Link href="/campus" className="text-white/60 hover:text-white transition-colors">
                  Campus Showcase
                </Link>
              </li>
              <li>
                <Link href="/campus/facilities" className="text-white/60 hover:text-white transition-colors">
                  Facilities Directory
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-white/60 hover:text-white transition-colors">
                  Photo Archive
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Contact & Inquiries */}
          <div>
            <h4 className="font-display font-bold text-white text-sm uppercase tracking-wider mb-4 text-gold-light">
              Contact Office
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin size={14} className="text-gold flex-shrink-0 mt-0.5" />
                <span className="text-white/70">{SCHOOL_INFO.location}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Phone size={14} className="text-gold flex-shrink-0 mt-0.5" />
                <div>
                  <a href={`tel:${SCHOOL_INFO.phones[0]}`} className="block text-white/70 hover:text-white">
                    {SCHOOL_INFO.phones[0]}
                  </a>
                  <a href={`tel:${SCHOOL_INFO.phones[1]}`} className="block text-white/70 hover:text-white">
                    {SCHOOL_INFO.phones[1]}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Mail size={14} className="text-gold flex-shrink-0 mt-0.5" />
                <div>
                  <a href={`mailto:${SCHOOL_INFO.emails[0]}`} className="block text-white/70 hover:text-white truncate">
                    {SCHOOL_INFO.emails[0]}
                  </a>
                  <a href={`mailto:${SCHOOL_INFO.emails[1]}`} className="block text-white/70 hover:text-white truncate">
                    {SCHOOL_INFO.emails[1]}
                  </a>
                </div>
              </div>
              <div className="pt-2">
                <Link
                  href="/portal/student"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-gold hover:text-navy text-white text-[11px] font-semibold transition-all"
                >
                  <GraduationCap size={13} /> Results Portal
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <p className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Shree Janak Secondary School (JHSS)</span>
            <span className="hidden sm:inline text-gold">•</span>
            <span className="hidden sm:inline">Gaindakot-5, Nawalparasi, Nepal</span>
          </p>
          <div className="flex flex-wrap gap-4 items-center">
            <Link href="/privacy" className="hover:text-white/70 transition-colors">Privacy Policy</Link>
            <Link href="/contact" className="hover:text-white/70 transition-colors">Contact Office</Link>
            <Link href="/portal/student" className="hover:text-white/70 transition-colors">Student Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
