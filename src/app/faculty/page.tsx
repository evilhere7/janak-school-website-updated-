"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  GraduationCap,
  Mail,
  BookOpen,
  Award,
  Users,
  Search,
  Filter,
  Briefcase,
  ChevronRight,
} from "lucide-react";
import { FACULTY_MEMBERS, SCHOOL_INFO } from "@/lib/data/schoolData";

// Extended faculty list for full school showcase
const ALL_FACULTY = [
  ...FACULTY_MEMBERS,
  {
    id: "fac-mem-5",
    name: "Mr. Narayan Prasad Sharma",
    role: "Head of Department (Management)",
    department: "Management Stream (+2)",
    qualification: "M.B.S. (Finance), B.Ed.",
    image: "/assets/campus/370247302_1832533693862136_5922644568413843616_n_4.jpg",
    email: "management@jhss.edu.np",
  },
  {
    id: "fac-mem-6",
    name: "Mrs. Radhika Bhusal",
    role: "Senior English Lecturer",
    department: "Humanities & Secondary",
    qualification: "M.A. English Literature, B.Ed.",
    image: "/assets/campus/380053908_225067130629786_1209794644896087085_n-2_5.jpg",
    email: "english@jhss.edu.np",
  },
  {
    id: "fac-mem-7",
    name: "Mr. Bishnu Hari Adhikari",
    role: "Senior Physics Faculty",
    department: "Science Stream (+2)",
    qualification: "M.Sc. Physics, TU",
    image: "/assets/campus/janakmap_11.jpg",
    email: "physics@jhss.edu.np",
  },
  {
    id: "fac-mem-8",
    name: "Mrs. Shova Regmi",
    role: "Primary Level Coordinator",
    department: "Primary & Foundation",
    qualification: "B.Ed., Early Childhood Specialist",
    image: "/assets/campus/admission-inquary_27.jpg",
    email: "primary@jhss.edu.np",
  },
];

const DEPARTMENTS = [
  "All Departments",
  "Administration & Leadership",
  "Science Stream (+2)",
  "Management Stream (+2)",
  "Computer Science & ICT",
  "Humanities & Secondary",
  "School Level / SEE",
  "Primary & Foundation",
];

export default function FacultyPage() {
  const [selectedDept, setSelectedDept] = useState("All Departments");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaculty = ALL_FACULTY.filter((member) => {
    const matchesDept =
      selectedDept === "All Departments" ||
      member.department.toLowerCase().includes(selectedDept.toLowerCase()) ||
      (selectedDept.includes("Leadership") && member.role.toLowerCase().includes("principal"));

    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.qualification.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesDept && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-off-white">
      {/* Hero Header */}
      <section className="relative hero-gradient py-20 lg:py-28 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-gold-lighter text-xs font-semibold uppercase tracking-widest mb-4">
            <Users size={14} /> Dedicated Educators
          </span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Meet Our <span className="text-gradient-gold">Distinguished Faculty</span>
          </h1>
          <p className="text-white/80 text-lg max-w-3xl mx-auto leading-relaxed">
            Our qualified, passionate educators are dedicated to mentoring the next generation of thinkers,
            innovators, and civic leaders in Gaindakot.
          </p>
        </div>
      </section>

      {/* Leadership Spotlight: Principal */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-gradient-to-br from-navy to-navy-dark rounded-3xl p-8 lg:p-12 text-white shadow-2xl">
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-4 relative aspect-[4/5] rounded-2xl overflow-hidden shadow-xl border-2 border-gold/30">
                <Image
                  src={SCHOOL_INFO.principal.image}
                  alt={SCHOOL_INFO.principal.name}
                  fill
                  className="object-cover object-top"
                />
              </div>

              <div className="lg:col-span-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/20 text-gold-light text-xs font-bold uppercase tracking-wider mb-4">
                  Institutional Leadership
                </div>
                <h2 className="font-display text-3xl sm:text-4xl font-bold mb-2">
                  {SCHOOL_INFO.principal.name}
                </h2>
                <div className="text-gold-light font-medium text-base mb-6">
                  {SCHOOL_INFO.principal.title} | Shree Janak Secondary School
                </div>

                <div className="relative mb-6">
                  <div className="text-4xl text-gold/20 font-display leading-none absolute -top-4 -left-2">&ldquo;</div>
                  <p className="text-white/90 text-sm sm:text-base leading-relaxed pl-6 italic">
                    {SCHOOL_INFO.principal.message}
                  </p>
                </div>

                <div className="flex flex-wrap gap-4 pt-2">
                  <div className="flex items-center gap-2 text-xs bg-white/10 px-4 py-2 rounded-xl border border-white/10">
                    <GraduationCap size={16} className="text-gold" />
                    <span>M.Ed., M.A. Mathematics</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs bg-white/10 px-4 py-2 rounded-xl border border-white/10">
                    <Award size={16} className="text-gold" />
                    <span>30+ Years Pedagogical Experience</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter and Directory Section */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-6">
          {/* Controls */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-12">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
              {/* Search Bar */}
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search faculty by name or subject..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:bg-white focus:border-gold outline-none transition-all text-gray-800"
                />
              </div>

              {/* Department Dropdown / Filter */}
              <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                <Filter className="text-navy w-4 h-4 flex-shrink-0" />
                <select
                  value={selectedDept}
                  onChange={(e) => setSelectedDept(e.target.value)}
                  className="px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm font-medium text-navy focus:border-gold outline-none cursor-pointer"
                >
                  {DEPARTMENTS.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Quick Pills */}
            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100">
              {DEPARTMENTS.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setSelectedDept(dept)}
                  className={`text-xs px-3.5 py-1.5 rounded-full font-medium transition-all ${
                    selectedDept === dept
                      ? "bg-navy text-white shadow-sm"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between mb-6">
            <span className="text-sm font-semibold text-gray-500">
              Showing {filteredFaculty.length} {filteredFaculty.length === 1 ? "educator" : "educators"}
            </span>
          </div>

          {/* Faculty Cards Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredFaculty.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group"
              >
                {/* Image Container */}
                <div className="relative aspect-[3/3.5] bg-gray-100 overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <a
                      href={`mailto:${member.email}`}
                      className="inline-flex items-center gap-1.5 text-xs text-white bg-gold/90 px-3 py-1.5 rounded-lg hover:bg-gold transition-colors"
                    >
                      <Mail size={12} /> Contact Teacher
                    </a>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-gold mb-1">
                      {member.department}
                    </span>
                    <h3 className="font-display font-bold text-navy text-lg leading-tight group-hover:text-gold transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-xs font-semibold text-gray-600 mt-1">{member.role}</p>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <GraduationCap size={14} className="text-navy flex-shrink-0" />
                      <span className="truncate">{member.qualification}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredFaculty.length === 0 && (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
              <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <h3 className="font-bold text-navy text-lg">No faculty found</h3>
              <p className="text-gray-500 text-sm mt-1">Try changing your search term or department filter.</p>
              <button
                onClick={() => {
                  setSelectedDept("All Departments");
                  setSearchQuery("");
                }}
                className="mt-4 text-xs font-semibold text-navy hover:text-gold underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Teaching Philosophy */}
      <section className="section-padding bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-navy/8 text-navy text-xs font-semibold uppercase tracking-widest mb-4">
                Our Pedagogical Approach
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy mb-6">
                Committed to Student-Centered <span className="text-gradient-gold">Excellence</span>
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                At Shree Janak Secondary School, our faculty undergoes continuous professional development workshops
                in collaboration with CEHRD and educational partners to adopt modern experiential learning methods.
              </p>
              <ul className="space-y-3 mb-6">
                {[
                  "Interactive audio-visual smart classroom delivery",
                  "Regular remedial and tutoring sessions for SEE & +2 board aspirants",
                  "Equal focus on moral ethics, critical inquiry, and digital literacy",
                  "Transparent parent-teacher quarterly reviews and personalized feedback",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm text-gray-700 font-medium">
                    <div className="w-2 h-2 rounded-full bg-gold flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/academics"
                className="inline-flex items-center gap-2 text-sm font-semibold text-navy hover:text-gold transition-colors"
              >
                Explore our Curriculum <ChevronRight size={16} />
              </Link>
            </div>

            <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 text-center">
              <Award className="w-16 h-16 text-gold mx-auto mb-4" />
              <h3 className="font-display text-2xl font-bold text-navy mb-2">100% Board Pass Record</h3>
              <p className="text-gray-600 text-sm leading-relaxed max-w-md mx-auto mb-6">
                Our seasoned educators have consistently guided students from English and Nepali mediums to top positions in
                Nawalparasi district SLC and SEE examinations.
              </p>
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-navy text-white text-xs font-semibold">
                60+ Certified Instructors & Mentors
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
