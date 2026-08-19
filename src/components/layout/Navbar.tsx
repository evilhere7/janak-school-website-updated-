"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ChevronDown,
  Phone,
  Mail,
  GraduationCap,
  User,
  LogOut,
  LayoutDashboard,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SCHOOL_INFO } from "@/lib/data/schoolData";
import { useAuth } from "@/contexts/AuthContext";

interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string; desc?: string }[];
}

const NAV_LINKS: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About",
    href: "/about",
    children: [
      { label: "Overview", href: "/about", desc: "Our 68+ year institutional legacy" },
      { label: "Our History", href: "/about/history", desc: "Milestones from 2015 B.S. to present" },
      { label: "Mission", href: "/about/mission", desc: "Our commitment to quality education" },
      { label: "Vision", href: "/about/vision", desc: "Inspiring future-ready learners" },
      { label: "Core Values", href: "/about/values", desc: "Integrity, curiosity, excellence" },
      { label: "Principal's Message", href: "/about/principal", desc: "Message from Mr. Buddhi Prasad Kandel" },
    ],
  },
  {
    label: "Academics",
    href: "/academics",
    children: [
      { label: "Academic Overview", href: "/academics", desc: "Dual medium English & Nepali streams" },
      { label: "Programs (PG – 12)", href: "/academics/programs", desc: "School level, +2 Science, Mgmt, Humanities" },
      { label: "Classes & Curriculum", href: "/academics/classes", desc: "Curriculum guides & syllabus" },
      { label: "Faculty Directory", href: "/faculty", desc: "Meet our experienced educators" },
      { label: "Academic Facilities", href: "/academics/facilities", desc: "Labs, library & ICT smart classrooms" },
    ],
  },
  {
    label: "Admissions",
    href: "/admissions",
    children: [
      { label: "Admissions 2083", href: "/admissions", desc: "Enrollment details & key dates" },
      { label: "Admission Process", href: "/admissions/process", desc: "Visual 5-step application roadmap" },
      { label: "Requirements", href: "/admissions/requirements", desc: "Document checklist & eligibility" },
      { label: "Admissions FAQ", href: "/admissions/faq", desc: "Common questions & fee guidance" },
    ],
  },
  {
    label: "Campus",
    href: "/campus",
    children: [
      { label: "Campus Showcase", href: "/campus", desc: "Real photos of our Gaindakot grounds" },
      { label: "Facilities Directory", href: "/campus/facilities", desc: "Library, science labs & sports arena" },
      { label: "Infrastructure & Blocks", href: "/campus/infrastructure", desc: "Academic wings & architectural highlights" },
    ],
  },
  {
    label: "News & Events",
    href: "/news",
    children: [
      { label: "News & Updates", href: "/news", desc: "Campus announcements & articles" },
      { label: "Events Calendar", href: "/events", desc: "Upcoming programs & meets" },
      { label: "Achievements", href: "/achievements", desc: "SEE toppers & sports awards" },
      { label: "Notice Board", href: "/notices", desc: "Official examination & tender notices" },
    ],
  },
  {
    label: "Gallery",
    href: "/gallery",
    children: [
      { label: "All Photographs", href: "/gallery", desc: "Complete visual archive" },
      { label: "Campus Grounds", href: "/gallery/campus", desc: "Exterior, gardens & buildings" },
      { label: "School Events", href: "/gallery/events", desc: "Golden Jubilee & VVIP visits" },
      { label: "Activities", href: "/gallery/activities", desc: "Red Cross & student clubs" },
      { label: "Sports & Athletics", href: "/gallery/sports", desc: "Inter-house championships" },
      { label: "Cultural Programs", href: "/gallery/cultural", desc: "Parents Day dances & drama" },
    ],
  },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { user, userProfile, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpandedDropdown, setMobileExpandedDropdown] = useState<string | null>(null);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
    setUserDropdownOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleLogout = async () => {
    setUserDropdownOpen(false);
    setMobileOpen(false);
    await logout();
  };

  const isLinkActive = (item: NavItem) => {
    if (item.href === "/" && pathname === "/") return true;
    if (item.href !== "/" && pathname.startsWith(item.href)) return true;
    return false;
  };

  return (
    <>
      {/* Top Bar */}
      <div className="bg-navy text-white text-xs py-2 hidden md:block border-b border-navy-light/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a
              href={`tel:${SCHOOL_INFO.phones[0]}`}
              className="flex items-center gap-1.5 hover:text-gold-light transition-colors"
            >
              <Phone size={13} className="text-gold-light" /> {SCHOOL_INFO.phones[0]}
            </a>
            <a
              href={`mailto:${SCHOOL_INFO.emails[1]}`}
              className="flex items-center gap-1.5 hover:text-gold-light transition-colors"
            >
              <Mail size={13} className="text-gold-light" /> {SCHOOL_INFO.emails[1]}
            </a>
          </div>
          <div className="flex items-center gap-4 text-white/70">
            <span>{SCHOOL_INFO.nepaliName}</span>
            <span>•</span>
            <span className="text-gold-light font-medium">{SCHOOL_INFO.location}</span>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header
        className={cn(
          "sticky top-0 z-40 w-full transition-all duration-300",
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-md border-b border-gray-100"
            : "bg-white shadow-sm"
        )}
      >
        <nav
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          role="navigation"
          aria-label="Main Navigation"
        >
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group" aria-label="JHSS Home">
              <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-gold/30 group-hover:ring-gold transition-all duration-300 shadow-sm bg-white flex-shrink-0">
                <Image
                  src="/assets/logo/jhss-logo3_1.png"
                  alt="JHSS Logo"
                  fill
                  sizes="48px"
                  className="object-contain p-0.5"
                  priority
                />
              </div>
              <div>
                <div className="text-base sm:text-lg font-display font-black text-navy leading-tight tracking-tight">
                  {SCHOOL_INFO.shortName}
                </div>
                <div className="text-[11px] text-gray-500 font-medium leading-tight hidden sm:block">
                  Gaindakot, Nawalparasi
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-0.5 xl:gap-1">
              {NAV_LINKS.map((link) => {
                const active = isLinkActive(link);
                return (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => link.children && setOpenDropdown(link.label)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        "flex items-center gap-1 px-3 py-2 rounded-lg text-xs xl:text-sm font-semibold transition-all duration-200",
                        active
                          ? "text-navy bg-navy/8 font-bold"
                          : "text-gray-700 hover:text-navy hover:bg-navy/5"
                      )}
                    >
                      {link.label}
                      {link.children && (
                        <ChevronDown
                          size={13}
                          className={cn(
                            "transition-transform duration-200 text-gray-400",
                            openDropdown === link.label && "rotate-180 text-navy"
                          )}
                        />
                      )}
                    </Link>

                    {/* Dropdown Menu */}
                    {link.children && openDropdown === link.label && (
                      <div className="absolute top-full left-0 pt-1.5 z-50 animate-scale-in">
                        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-2 min-w-[260px]">
                          {link.children.map((child) => {
                            const isChildActive = pathname === child.href;
                            return (
                              <Link
                                key={child.label}
                                href={child.href}
                                className={cn(
                                  "block px-3.5 py-2.5 rounded-xl transition-all duration-150",
                                  isChildActive
                                    ? "bg-navy text-white"
                                    : "hover:bg-gray-50 text-gray-700 hover:text-navy"
                                )}
                                onClick={() => setOpenDropdown(null)}
                              >
                                <div className={cn("text-xs font-bold", isChildActive ? "text-white" : "text-navy")}>
                                  {child.label}
                                </div>
                                {child.desc && (
                                  <div className={cn("text-[11px] mt-0.5 truncate", isChildActive ? "text-white/80" : "text-gray-400")}>
                                    {child.desc}
                                  </div>
                                )}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Auth Controls & Portal CTA */}
            <div className="flex items-center gap-2 sm:gap-3">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2 p-1.5 pr-3 rounded-full border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-all cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-full bg-navy text-gold-light flex items-center justify-center text-xs font-bold font-display shadow-sm">
                      {userProfile?.photoURL ? (
                        <Image
                          src={userProfile.photoURL}
                          alt="Avatar"
                          width={32}
                          height={32}
                          className="rounded-full object-cover"
                        />
                      ) : (
                        (userProfile?.fullName || user.email || "U").charAt(0).toUpperCase()
                      )}
                    </div>
                    <div className="hidden sm:block text-left">
                      <div className="text-xs font-bold text-navy leading-tight truncate max-w-[100px]">
                        {userProfile?.fullName || "Account"}
                      </div>
                      <div className="text-[10px] font-semibold text-gold uppercase leading-tight">
                        {userProfile?.role || "Member"}
                      </div>
                    </div>
                    <ChevronDown size={13} className="text-gray-500" />
                  </button>

                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50 animate-scale-in">
                      <div className="px-4 py-2.5 border-b border-gray-100">
                        <div className="font-bold text-navy text-xs truncate">
                          {userProfile?.fullName || user.email}
                        </div>
                        <div className="text-[10px] text-gray-500 truncate">{user.email}</div>
                      </div>
                      <Link
                        href="/dashboard"
                        className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-gray-700 hover:text-navy hover:bg-gray-50 transition-colors"
                        onClick={() => setUserDropdownOpen(false)}
                      >
                        <LayoutDashboard size={14} className="text-gold" /> My Dashboard
                      </Link>
                      <Link
                        href="/portal/student"
                        className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-gray-700 hover:text-navy hover:bg-gray-50 transition-colors"
                        onClick={() => setUserDropdownOpen(false)}
                      >
                        <GraduationCap size={14} className="text-navy" /> Results / Marksheet
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-crimson hover:bg-red-50 transition-colors text-left"
                      >
                        <LogOut size={14} /> Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    href="/portal/student"
                    className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-navy/20 text-navy text-xs font-bold hover:bg-navy/5 transition-all"
                  >
                    <GraduationCap size={14} className="text-gold" /> Result Portal
                  </Link>
                  <Link
                    href="/login"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-navy text-white text-xs font-bold hover:bg-gold hover:text-navy transition-all shadow-sm"
                  >
                    <User size={13} /> Sign In
                  </Link>
                </div>
              )}

              {/* Mobile Menu Toggle Button */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 rounded-xl text-navy hover:bg-gray-100 transition-colors cursor-pointer"
                aria-label="Toggle navigation menu"
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Slide-Out Menu */}
        {mobileOpen && (
          <div className="lg:hidden fixed inset-x-0 top-20 bottom-0 bg-white z-50 overflow-y-auto border-t border-gray-100 animate-fade-in p-6">
            <div className="space-y-3 pb-24">
              {NAV_LINKS.map((link) => {
                const isExpanded = mobileExpandedDropdown === link.label;
                const active = isLinkActive(link);
                return (
                  <div key={link.label} className="border-b border-gray-100 pb-2">
                    {link.children ? (
                      <div>
                        <button
                          onClick={() =>
                            setMobileExpandedDropdown(isExpanded ? null : link.label)
                          }
                          className={cn(
                            "w-full flex items-center justify-between py-2 text-sm font-bold",
                            active ? "text-navy" : "text-gray-800"
                          )}
                        >
                          <span>{link.label}</span>
                          <ChevronDown
                            size={16}
                            className={cn(
                              "transition-transform duration-200 text-gray-400",
                              isExpanded && "rotate-180 text-navy"
                            )}
                          />
                        </button>
                        {isExpanded && (
                          <div className="pl-3 py-2 space-y-2 bg-gray-50 rounded-xl my-1">
                            {link.children.map((child) => (
                              <Link
                                key={child.label}
                                href={child.href}
                                className="block py-1.5 text-xs font-medium text-gray-600 hover:text-navy"
                                onClick={() => setMobileOpen(false)}
                              >
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link
                        href={link.href}
                        className={cn(
                          "block py-2 text-sm font-bold",
                          active ? "text-navy" : "text-gray-800"
                        )}
                        onClick={() => setMobileOpen(false)}
                      >
                        {link.label}
                      </Link>
                    )}
                  </div>
                );
              })}

              <div className="pt-4 flex flex-col gap-2">
                <Link
                  href="/admissions"
                  className="w-full text-center py-3 rounded-full bg-gold text-navy font-bold text-xs shadow-md"
                  onClick={() => setMobileOpen(false)}
                >
                  Admissions 2083
                </Link>
                <Link
                  href="/portal/student"
                  className="w-full text-center py-3 rounded-full bg-navy text-white font-bold text-xs shadow-md"
                  onClick={() => setMobileOpen(false)}
                >
                  Student Marksheet Portal
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
