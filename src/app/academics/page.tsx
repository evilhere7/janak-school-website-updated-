import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, BookOpen, FlaskConical, Monitor, GraduationCap } from "lucide-react";
import { CURRICULUM } from "@/lib/data/schoolData";

export const metadata: Metadata = {
  title: "Academics",
  description: "Explore JHSS's academic programs from Class 1 to +2 Science, Management, and Humanities. View curriculum and teacher guides.",
};

const STREAM_ICONS: Record<string, React.ReactNode> = {
  Science: <FlaskConical size={20} />,
  Management: <Monitor size={20} />,
  Humanities: <GraduationCap size={20} />,
};

export default function AcademicsPage() {
  return (
    <div>
      {/* Header */}
      <div className="hero-gradient py-20 text-center text-white">
        <div className="max-w-3xl mx-auto px-6">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white/70 text-xs font-semibold uppercase tracking-widest mb-4">
            Academic Programs
          </span>
          <h1 className="font-display text-5xl font-bold mb-4">Academics at JHSS</h1>
          <p className="text-white/70 text-lg">
            A comprehensive, NEB-aligned curriculum for every stage of learning — from primary foundations to higher secondary specializations.
          </p>
        </div>
      </div>

      {/* Overview Cards */}
      <section className="section-padding bg-white" id="school">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-navy/8 text-navy text-xs font-semibold uppercase tracking-widest mb-4">
              Levels Offered
            </span>
            <h2 className="font-display text-4xl font-bold text-navy">
              Education for Every <span className="text-gradient-gold">Stage</span>
            </h2>
          </div>

          <div className="space-y-8">
            {CURRICULUM.map((level, i) => (
              <div
                key={level.level}
                className="bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden shadow-sm"
                id={
                  level.level.toLowerCase().includes("higher")
                    ? "higher-secondary"
                    : level.level.toLowerCase().includes("primary")
                    ? "primary"
                    : level.level.toLowerCase().includes("lower")
                    ? "secondary"
                    : "early"
                }
              >
                <div className="flex items-start gap-6 p-6 lg:p-8">
                  <div className="w-12 h-12 rounded-xl bg-navy flex items-center justify-center text-gold-light font-bold text-xl flex-shrink-0">
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
                      <div>
                        <h3 className="font-bold text-navy text-xl">{level.level}</h3>
                        <p className="text-gold text-sm font-semibold">{level.grades}</p>
                      </div>
                    </div>

                    {/* Regular subjects */}
                    {level.subjects.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {level.subjects.map((sub) => (
                          <span
                            key={sub}
                            className="bg-white border border-gray-200 text-navy text-xs font-medium px-3 py-1.5 rounded-full"
                          >
                            {sub}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Teacher guides */}
                    {level.guideLinks && level.guideLinks.length > 0 && (
                      <div className="mt-4">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                          Teacher Guides (CEHRD/MOECD)
                        </p>
                        <div className="grid sm:grid-cols-2 gap-2">
                          {level.guideLinks.map((g) => (
                            <a
                              key={g.label}
                              href={g.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-sm text-navy hover:text-gold transition-colors bg-white border border-gray-100 rounded-xl px-4 py-2"
                            >
                              <ExternalLink size={14} className="text-gold flex-shrink-0" />
                              <span className="truncate">{g.label}</span>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Streams */}
                    {level.streams && (
                      <div className="grid sm:grid-cols-3 gap-4 mt-4">
                        {level.streams.map((stream) => (
                          <div
                            key={stream.name}
                            className="bg-white border border-gray-100 rounded-2xl p-5"
                            id={stream.name.toLowerCase()}
                          >
                            <div className="flex items-center gap-2 mb-3">
                              <div className="text-navy">{STREAM_ICONS[stream.name]}</div>
                              <h4 className="font-bold text-navy">{stream.name}</h4>
                            </div>
                            <ul className="space-y-1.5">
                              {stream.subjects.map((s) => (
                                <li key={s} className="flex items-center gap-2 text-sm text-gray-600">
                                  <div className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                                  {s}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum Resources */}
      <section className="section-padding hero-gradient" id="curriculum">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white/70 text-xs font-semibold uppercase tracking-widest mb-4">
            Digital Resources
          </span>
          <h2 className="font-display text-4xl font-bold text-white mb-4">
            Online Learning <span className="text-gradient-gold">Materials</span>
          </h2>
          <p className="text-white/70 text-base mb-10">
            Access official CEHRD/MOECD teacher guides, textbook policies, and the national e-learning platform.
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { label: "CEHRD E-Library", url: "http://202.45.146.138/elibrary/", desc: "Teacher guides & curriculum materials" },
              { label: "Sikai Chautari", url: "http://learning.cehrd.gov.np/", desc: "Government e-learning platform" },
              { label: "MOECD Resources", url: "https://moecdc.gov.np/", desc: "Official curriculum & textbooks" },
            ].map((r) => (
              <a
                key={r.label}
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all group text-left"
              >
                <BookOpen size={24} className="text-gold-light mb-3" />
                <div className="font-bold text-white mb-1">{r.label}</div>
                <div className="text-white/50 text-sm">{r.desc}</div>
                <div className="mt-3 flex items-center gap-1 text-gold-light text-xs font-semibold group-hover:gap-2 transition-all">
                  Visit Resource <ExternalLink size={12} />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
