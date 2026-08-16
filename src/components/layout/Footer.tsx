import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  BookOpen,
  GraduationCap,
} from "lucide-react";

// Brand icons removed from lucide-react v1.x — using inline SVGs
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
import { SCHOOL_INFO } from "@/lib/data/schoolData";

const QUICK_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Academics", href: "/academics" },
  { label: "Facilities", href: "/facilities" },
  { label: "Faculty", href: "/faculty" },
  { label: "Photo Gallery", href: "/gallery" },
  { label: "News & Events", href: "/news" },
  { label: "Notice Board", href: "/notices" },
  { label: "Contact Us", href: "/contact" },
];

const IMPORTANT_LINKS = [
  { label: "Student Portal", href: "/portal/student" },
  { label: "Results / Portal", href: "/portal/student" },
  { label: "Teaching Materials", href: "/academics#curriculum" },
  { label: "Admission Enquiry", href: "/contact" },
  { label: "Downloads", href: "/notices" },
  { label: "CEHRD / Curriculum", href: "/academics#curriculum" },
];

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      {/* CTA Banner */}
      <div className="bg-gradient-to-r from-gold to-gold-light">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-navy-dark text-xl font-bold">
              Ready to be part of the JHSS family?
            </h3>
            <p className="text-navy/70 text-sm mt-1">
              Admissions open for Class 1 to +2 for academic session 2083 B.S.
            </p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <Link
              href="/contact"
              className="px-6 py-3 rounded-full bg-navy text-white text-sm font-semibold hover:bg-navy-dark transition-colors"
            >
              Admission Enquiry
            </Link>
            <Link
              href="/about"
              className="px-6 py-3 rounded-full bg-white text-navy text-sm font-semibold hover:bg-gray-100 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* School Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-gold/30">
                <Image
                  src="/assets/logo/jhss-logo3_1.png"
                  alt="JHSS Logo"
                  fill
                  className="object-contain p-1"
                />
              </div>
              <div>
                <div className="font-bold text-white text-lg leading-tight">JHSS</div>
                <div className="text-white/50 text-xs">Est. 2015 B.S.</div>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-5">
              {SCHOOL_INFO.nepaliName} — serving the Nawalparasi community with quality English and Nepali medium education since 2015 B.S.
            </p>
            <div className="flex gap-3">
              <a
                href={SCHOOL_INFO.socials.facebook}
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-gold/80 flex items-center justify-center transition-colors"
              >
                <FacebookIcon size={16} />
              </a>
              <a
                href={SCHOOL_INFO.socials.youtube}
                aria-label="YouTube"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-gold/80 flex items-center justify-center transition-colors"
              >
                <YoutubeIcon size={16} />
              </a>
              <a
                href={`mailto:${SCHOOL_INFO.emails[0]}`}
                aria-label="Email"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-gold/80 flex items-center justify-center transition-colors"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-5 flex items-center gap-2">
              <BookOpen size={16} className="text-gold" />
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-white/60 hover:text-gold text-sm transition-colors group"
                  >
                    <ArrowRight
                      size={12}
                      className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-200"
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Important Links */}
          <div>
            <h4 className="font-semibold text-white mb-5 flex items-center gap-2">
              <GraduationCap size={16} className="text-gold" />
              Student Resources
            </h4>
            <ul className="space-y-2.5">
              {IMPORTANT_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-white/60 hover:text-gold text-sm transition-colors group"
                  >
                    <ArrowRight
                      size={12}
                      className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-200"
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-5">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex gap-3">
                <MapPin size={16} className="text-gold flex-shrink-0 mt-0.5" />
                <span className="text-white/60 text-sm leading-relaxed">
                  {SCHOOL_INFO.location}
                </span>
              </div>
              <div className="flex gap-3">
                <Phone size={16} className="text-gold flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  {SCHOOL_INFO.phones.map((p) => (
                    <a
                      key={p}
                      href={`tel:${p}`}
                      className="block text-white/60 hover:text-gold transition-colors"
                    >
                      {p}
                    </a>
                  ))}
                </div>
              </div>
              <div className="flex gap-3">
                <Mail size={16} className="text-gold flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  {SCHOOL_INFO.emails.map((e) => (
                    <a
                      key={e}
                      href={`mailto:${e}`}
                      className="block text-white/60 hover:text-gold transition-colors truncate"
                    >
                      {e}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/40">
          <p>
            © {new Date().getFullYear()} Shree Janak Secondary School. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-white/70 transition-colors">Privacy Policy</Link>
            <Link href="/contact" className="hover:text-white/70 transition-colors">Terms of Use</Link>
            <span>Website by WEBSOFT NEPAL / JHSS 2.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
