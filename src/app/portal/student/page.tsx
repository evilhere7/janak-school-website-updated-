"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  GraduationCap,
  Search,
  BookOpen,
  Calendar,
  Download,
  CheckCircle2,
  FileSpreadsheet,
  AlertCircle,
  Lock,
  User,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { SCHOOL_INFO } from "@/lib/data/schoolData";

export default function StudentPortalPage() {
  const [activeTab, setActiveTab] = useState<"result" | "login">("result");
  
  // Result Search State
  const [symbolNumber, setSymbolNumber] = useState("");
  const [dob, setDob] = useState("");
  const [examType, setExamType] = useState("SEE Pre-Board 2083");
  const [searched, setSearched] = useState(false);
  const [resultData, setResultData] = useState<any | null>(null);

  // Login State
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const handleResultSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!symbolNumber.trim()) return;

    // Simulated result lookup
    setSearched(true);
    setResultData({
      studentName: "Aarav Sharma",
      symbolNo: symbolNumber.toUpperCase(),
      dob: dob || "2066-04-15",
      school: SCHOOL_INFO.name,
      grade: "Class 10 (English Medium)",
      gpa: "3.85",
      gradeLetter: "A+",
      subjects: [
        { name: "Compulsory English", credit: 4.0, grade: "A+" },
        { name: "Compulsory Mathematics", credit: 4.0, grade: "A+" },
        { name: "Science & Technology", credit: 4.0, grade: "A" },
        { name: "Compulsory Nepali", credit: 4.0, grade: "A" },
        { name: "Social Studies", credit: 4.0, grade: "A+" },
        { name: "Optional Computer Science", credit: 4.0, grade: "A+" },
      ],
    });
  };

  return (
    <div className="min-h-screen bg-off-white">
      {/* Hero Header */}
      <section className="relative hero-gradient py-16 lg:py-24 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-gold-lighter text-xs font-semibold uppercase tracking-widest mb-4">
            <GraduationCap size={14} /> Student & Parent Services
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            JHSS Student <span className="text-gradient-gold">Portal & Results</span>
          </h1>
          <p className="text-white/80 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Check terminal and board examination marksheets, access syllabus downloads, and manage student resources online.
          </p>
        </div>
      </section>

      {/* Main Portal Section */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto px-6">
          {/* Tab Selector */}
          <div className="flex bg-white p-1.5 rounded-2xl border border-gray-200 shadow-sm mb-10 max-w-md mx-auto">
            <button
              onClick={() => setActiveTab("result")}
              className={`flex-1 py-3 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === "result"
                  ? "bg-navy text-white shadow-md"
                  : "text-gray-600 hover:text-navy"
              }`}
            >
              <FileSpreadsheet size={16} /> Online Result Lookup
            </button>
            <button
              onClick={() => setActiveTab("login")}
              className={`flex-1 py-3 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === "login"
                  ? "bg-navy text-white shadow-md"
                  : "text-gray-600 hover:text-navy"
              }`}
            >
              <Lock size={16} /> Student Sign In
            </button>
          </div>

          {/* Tab 1: Result Search */}
          {activeTab === "result" && (
            <div className="space-y-8 animate-fade-in">
              <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-100 shadow-xl">
                <div className="max-w-2xl mx-auto">
                  <h2 className="font-display font-bold text-navy text-2xl text-center mb-2">
                    Terminal & Board Result Search
                  </h2>
                  <p className="text-gray-500 text-xs text-center mb-8">
                    Enter your official Symbol Number or Registration Number as mentioned on your admit card.
                  </p>

                  <form onSubmit={handleResultSearch} className="space-y-5">
                    <div>
                      <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">
                        Examination *
                      </label>
                      <select
                        value={examType}
                        onChange={(e) => setExamType(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:bg-white focus:border-gold outline-none transition-all text-navy font-medium"
                      >
                        <option value="SEE Pre-Board 2083">Class 10 — SEE Pre-Board Examination 2083</option>
                        <option value="Second Terminal Exam 2083">Class 1 to 12 — Second Terminal Exam 2083</option>
                        <option value="First Terminal Exam 2083">Class 1 to 12 — First Terminal Exam 2083</option>
                        <option value="+2 Class 11 Annual Exam 2082">+2 Science/Mgmt — Class 11 Annual Exam 2082</option>
                      </select>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">
                          Symbol Number / Roll No. *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. 0481203A"
                          value={symbolNumber}
                          onChange={(e) => setSymbolNumber(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:bg-white focus:border-gold outline-none uppercase font-mono tracking-wider"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">
                          Date of Birth (BS / AD)
                        </label>
                        <input
                          type="text"
                          placeholder="YYYY-MM-DD (e.g. 2065-03-12)"
                          value={dob}
                          onChange={(e) => setDob(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:bg-white focus:border-gold outline-none"
                        />
                      </div>
                    </div>

                    <div className="pt-2 text-center">
                      <button
                        type="submit"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-navy hover:bg-gold text-white text-sm font-bold shadow-navy transition-all duration-300 cursor-pointer"
                      >
                        <Search size={16} /> View Marksheet / Grade
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              {/* Result Output Card */}
              {searched && resultData && (
                <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gold/40 shadow-2xl animate-fade-up">
                  {/* Marksheet Header */}
                  <div className="border-b border-gray-200 pb-6 mb-6 text-center">
                    <span className="text-xs font-bold tracking-widest text-gold uppercase block mb-1">
                      Academic Progress Report
                    </span>
                    <h3 className="font-display font-bold text-navy text-2xl">
                      {SCHOOL_INFO.name}
                    </h3>
                    <p className="text-xs text-gray-500">{SCHOOL_INFO.location}</p>
                    <div className="mt-2 inline-block bg-navy/5 text-navy text-xs font-semibold px-4 py-1 rounded-full">
                      {examType}
                    </div>
                  </div>

                  {/* Student Details */}
                  <div className="grid sm:grid-cols-2 gap-4 bg-gray-50 rounded-2xl p-5 mb-6 text-xs text-gray-700">
                    <div>
                      <span className="text-gray-400 block">Student Name:</span>
                      <strong className="text-navy text-sm font-display">{resultData.studentName}</strong>
                    </div>
                    <div>
                      <span className="text-gray-400 block">Symbol Number:</span>
                      <strong className="text-navy font-mono text-sm">{resultData.symbolNo}</strong>
                    </div>
                    <div>
                      <span className="text-gray-400 block">Grade / Section:</span>
                      <strong className="text-navy">{resultData.grade}</strong>
                    </div>
                    <div>
                      <span className="text-gray-400 block">Date of Birth:</span>
                      <strong className="text-navy">{resultData.dob}</strong>
                    </div>
                  </div>

                  {/* Grade Breakdown Table */}
                  <div className="overflow-x-auto mb-6">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-gray-200 text-gray-400 uppercase font-bold">
                          <th className="py-2.5 px-3">Subject</th>
                          <th className="py-2.5 px-3 text-center">Credit Hours</th>
                          <th className="py-2.5 px-3 text-right">Grade Point</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                        {resultData.subjects.map((sub: any, idx: number) => (
                          <tr key={idx} className="hover:bg-gray-50">
                            <td className="py-3 px-3 font-semibold text-navy">{sub.name}</td>
                            <td className="py-3 px-3 text-center text-gray-500">{sub.credit}</td>
                            <td className="py-3 px-3 text-right font-bold text-gold">{sub.grade}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Summary GPA */}
                  <div className="flex items-center justify-between bg-navy text-white rounded-2xl p-6 mb-6">
                    <div>
                      <span className="text-white/60 text-xs block">Overall Cumulative GPA</span>
                      <div className="text-3xl font-black text-gold-light">{resultData.gpa} / 4.0</div>
                    </div>
                    <div className="text-right">
                      <span className="text-white/60 text-xs block">Letter Grade</span>
                      <div className="text-2xl font-bold">{resultData.gradeLetter} (Distinction)</div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap justify-between items-center gap-4 pt-2">
                    <span className="text-[11px] text-gray-400">
                      * Provisional online marksheet for verification. Collect verified signed copies from the school office.
                    </span>
                    <button
                      onClick={() => window.print()}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gray-100 hover:bg-gold hover:text-white text-navy font-bold text-xs transition-colors cursor-pointer"
                    >
                      <Download size={14} /> Print Marksheet
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Tab 2: Student Sign In */}
          {activeTab === "login" && (
            <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-100 shadow-xl max-w-xl mx-auto animate-fade-in">
              <div className="text-center mb-8">
                <div className="w-14 h-14 rounded-2xl bg-navy/5 text-navy flex items-center justify-center mx-auto mb-4">
                  <User size={24} />
                </div>
                <h2 className="font-display font-bold text-navy text-2xl mb-1">
                  Student & Parent Portal Login
                </h2>
                <p className="text-gray-500 text-xs">
                  Access attendance records, e-learning materials, and fee status.
                </p>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setLoginError("Student portal synchronization active. Please contact the ICT lab coordinator for your 2083 credentials.");
                }}
                className="space-y-5"
              >
                <div>
                  <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">
                    Student ID / Admission Roll *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. JHSS-2083-094"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:bg-white focus:border-gold outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">
                    Password / Date of Birth *
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:bg-white focus:border-gold outline-none"
                  />
                </div>

                {loginError && (
                  <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800 flex items-start gap-2">
                    <AlertCircle size={16} className="text-amber-600 flex-shrink-0 mt-0.5" />
                    <span>{loginError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-navy hover:bg-gold text-white text-sm font-bold shadow-navy transition-all duration-300 cursor-pointer"
                >
                  Secure Log In
                </button>
              </form>

              <div className="mt-8 pt-6 border-t border-gray-100 text-center text-xs text-gray-500">
                Forgot your password or credentials? Visit the Saraswati Block ICT office or email{" "}
                <a href={`mailto:${SCHOOL_INFO.emails[0]}`} className="text-navy font-bold hover:underline">
                  {SCHOOL_INFO.emails[0]}
                </a>
              </div>
            </div>
          )}

          {/* Quick Student Resources */}
          <div className="mt-16 grid sm:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center">
              <BookOpen className="w-8 h-8 text-gold mx-auto mb-3" />
              <h4 className="font-bold text-navy text-sm mb-1">E-Library & Guides</h4>
              <p className="text-gray-500 text-xs mb-3">CEHRD curriculum books & guides</p>
              <Link href="/academics#curriculum" className="text-xs font-bold text-gold hover:underline">
                Access Resources &rarr;
              </Link>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center">
              <Calendar className="w-8 h-8 text-gold mx-auto mb-3" />
              <h4 className="font-bold text-navy text-sm mb-1">Exam Schedules</h4>
              <p className="text-gray-500 text-xs mb-3">Terminal and pre-board dates</p>
              <Link href="/notices" className="text-xs font-bold text-gold hover:underline">
                View Notice Board &rarr;
              </Link>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center">
              <ShieldCheck className="w-8 h-8 text-gold mx-auto mb-3" />
              <h4 className="font-bold text-navy text-sm mb-1">Fee & Scholarship</h4>
              <p className="text-gray-500 text-xs mb-3">Payment structure & trust aid</p>
              <Link href="/contact" className="text-xs font-bold text-gold hover:underline">
                Inquire Office &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
