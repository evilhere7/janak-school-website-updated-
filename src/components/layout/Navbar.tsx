"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown, Phone, Mail, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";
import { SCHOOL_INFO } from "@/lib/data/schoolData";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  {
    label: "About",
    href: "/about",
    children: [
      { label: "Our History", href: "/about#history" },
      { label: "Vision & Mission", href: "/about#vision" },
      { label: "Principal's Message", href: "/about#principal" },
      { label: "Campus Blocks", href: "/about#campus" },
    ],
  },
  {
    label: "Academics",
    href: "/academics",
    children: [
      { label: "School Level (1–10)", href: "/academics#school" },
      { label: "+2 Science", href: "/academics#science" },
      { label: "+2 Management", href: "/academics#management" },
      { label: "+2 Humanities", href: "/academics#humanities" },
      { label: "Curriculum & Guides", href: "/academics#curriculum" },
    ],
  },
  { label: "Facilities", href: "/facilities" },
  { label: "Faculty", href: "/faculty" },
  {
    label: "News & Notices",
    href: "/news",
    children: [
      { label: "News & Events", href: "/news" },
      { label: "Notice Board", href: "/notices" },
      { label: "Events Calendar", href: "/events" },
    ],
  },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      {/* Top bar */}
      <div className="bg-navy text-white text-sm py-2 hidden md:block">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a href={`tel:${SCHOOL_INFO.phones[0]}`} className="flex items-center gap-1.5 hover:text-gold-light transition-colors">
              <Phone size={13} /> {SCHOOL_INFO.phones[0]}
            </a>
            <a href={`mailto:${SCHOOL_INFO.emails[1]}`} className="flex items-center gap-1.5 hover:text-gold-light transition-colors">
              <Mail size={13} /> {SCHOOL_INFO.emails[1]}
            </a>
          </div>
          <span className="text-white/60 font-medium tracking-wide">{SCHOOL_INFO.location}</span>
        </div>
      </div>

      {/* Main Navbar */}
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300",
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-md border-b border-gray-100"
            : "bg-white shadow-sm"
        )}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" role="navigation" aria-label="Main navigation">
          <div className="flex items-center justify-between h-18 py-3">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group" aria-label="JHSS Home">
              <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-gold/20 group-hover:ring-gold/50 transition-all duration-300 shadow-sm">
                <Image
                  src="/assets/logo/jhss-logo3_1.png"
                  alt="JHSS Logo"
                  fill
                  className="object-contain p-1"
                  priority
                />
              </div>
              <div>
                <div className="text-base font-bold text-navy leading-tight tracking-tight">
                  {SCHOOL_INFO.shortName}
                </div>
                <div className="text-xs text-gray-500 leading-tight hidden sm:block">
                  Gaindakot, Nawalparasi
                </div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <div
                  key={link.label}
                  className="relative group"
                  onMouseEnter={() => link.children && setOpenDropdown(link.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                      "text-gray-700 hover:text-navy hover:bg-navy/5"
                    )}
                  >
                    {link.label}
                    {link.children && (
                      <ChevronDown
                        size={14}
                        className={cn(
                          "transition-transform duration-200",
                          openDropdown === link.label && "rotate-180"
                        )}
                      />
                    )}
                  </Link>

                  {/* Dropdown */}
                  {link.children && openDropdown === link.label && (
                    <div className="absolute top-full left-0 pt-1 z-50">
                      <div className="bg-white rounded-xl shadow-xl border border-gray-100 py-2 min-w-[200px] animate-scale-in">
                        {link.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            className="block px-4 py-2.5 text-sm text-gray-700 hover:text-navy hover:bg-navy/5 transition-colors"
                            onClick={() => setOpenDropdown(null)}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* CTA + Mobile Menu toggle */}
            <div className="flex items-center gap-3">
              <Link
                href="/portal/student"
                className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-navy hover:bg-navy-light shadow-navy transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
                id="student-portal-btn"
              >
                <GraduationCap size={15} />
                Student Portal
              </Link>
              <button
                className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
                aria-controls="mobile-menu"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </nav>

        {/* Gold accent underline */}
        <div className="h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent opacity-30" />
      </header>

      {/* Mobile Drawer */}
      <div
        id="mobile-menu"
        className={cn(
          "fixed inset-0 z-40 lg:hidden transition-opacity duration-300",
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        aria-hidden={!mobileOpen}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-navy-dark/60 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
        {/* Panel */}
        <div
          className={cn(
            "absolute top-0 right-0 h-full w-80 max-w-full bg-white shadow-2xl transition-transform duration-300 flex flex-col",
            mobileOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <span className="font-bold text-navy">{SCHOOL_INFO.shortName}</span>
            <button
              onClick={() => setMobileOpen(false)}
              className="p-2 rounded-lg hover:bg-gray-100 text-gray-600"
              aria-label="Close mobile menu"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-4 px-3">
            {NAV_LINKS.map((link) => (
              <div key={link.label}>
                <Link
                  href={link.href}
                  className="flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium text-gray-800 hover:text-navy hover:bg-navy/5 transition-colors"
                  onClick={() => { if (!link.children) setMobileOpen(false); }}
                >
                  {link.label}
                </Link>
                {link.children && (
                  <div className="ml-4 border-l-2 border-gold/20 pl-3 mb-1">
                    {link.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className="block px-3 py-2 text-sm text-gray-600 hover:text-navy hover:bg-navy/5 rounded-lg transition-colors"
                        onClick={() => setMobileOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="p-5 border-t border-gray-100 space-y-3">
            <Link
              href="/portal/student"
              className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-full text-sm font-semibold text-white bg-navy hover:bg-navy-light transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              <GraduationCap size={15} />
              Student Portal
            </Link>
            <div className="text-xs text-gray-500 text-center space-y-1">
              <p>{SCHOOL_INFO.phones[0]} | {SCHOOL_INFO.phones[1]}</p>
              <p>{SCHOOL_INFO.emails[1]}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
