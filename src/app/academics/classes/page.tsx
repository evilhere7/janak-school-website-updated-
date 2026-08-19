import type { Metadata } from "next";
import Link from "next/link";
import { Layers, ArrowLeft, ArrowRight, BookOpen, Download, FileText, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Classes & Curriculum | Shree Janak Secondary School",
  description:
    "Explore class structure, grade-level syllabus outlines, and curriculum guides at Shree Janak Secondary School.",
};

const CLASS_TIERS = [
  {
    tier: "Early Childhood Development (ECD)",
    grades: "Play Group, Nursery, Kindergarten (KG)",
    medium: "Dual Medium",
    focus: "Sensory learning, phonics, number concepts, motor skill development, creative arts.",
    subjects: ["English Language Phonics", "Nepali वर्णमाला", "Early Mathematics", "Art & Music", "Health & Habits"],
  },
  {
    tier: "Primary Level (Class 1 to 5)",
    grades: "Grade 1, Grade 2, Grade 3, Grade 4, Grade 5",
    medium: "English Medium & Nepali Medium Sections",
    focus: "Core literacy, foundational science, environmental studies, bilingual vocabulary, mental math.",
    subjects: ["My English", "My Mathematics", "Hamro Serophero (हम्रो सेरोफेरो)", "My Nepali", "Science & ICT Basics"],
  },
  {
    tier: "Lower Secondary & Secondary (Class 6 to 10)",
    grades: "Grade 6, Grade 7, Grade 8 (BLE), Grade 9, Grade 10 (SEE)",
    medium: "English Medium & Nepali Medium Sections",
    focus: "Advanced mathematics, laboratory science experiments, social studies, ICT programming, intensive board prep.",
    subjects: [
      "Compulsory English & Nepali",
      "Compulsory & Optional Mathematics",
      "Science & Technology with Lab Sessions",
      "Social Studies & Civic Values",
      "Computer Science / ICT",
    ],
  },
  {
    tier: "Higher Secondary Level (+2)",
    grades: "Grade 11 & Grade 12",
    medium: "English Medium (Science/Mgmt) & Dual Medium (Humanities)",
    focus: "Career specialization in Pre-Medical, Pre-Engineering, Computer Science, Commerce/Banking, and Social Sciences.",
    subjects: [
      "Science: Physics, Chemistry, Biology / Mathematics, Computer Science",
      "Management: Accountancy, Economics, Business Studies / Hotel Management",
      "Humanities: Major English/Nepali, Sociology, Political Science",
    ],
  },
];

export default function ClassesPage() {
  return (
    <div className="min-h-screen bg-off-white selection:bg-gold selection:text-white">
      {/* Hero Header */}
      <section className="relative hero-gradient text-white py-20 sm:py-28 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link
            href="/academics"
            className="inline-flex items-center gap-1.5 text-gold-light text-xs font-bold uppercase tracking-wider mb-6 hover:underline"
          >
            <ArrowLeft size={14} /> Back to Academics Overview
          </Link>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-gold-light text-xs font-bold uppercase tracking-wider mb-4 mx-auto block w-fit">
            <Layers size={14} /> Academic Progression
          </div>
          <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight text-white mb-4">
            Classes & Curriculum Structure
          </h1>
          <p className="text-white/80 text-base sm:text-lg max-w-2xl mx-auto">
            Organized progression from Early Childhood Development through Class 12 Higher Secondary.
          </p>
        </div>
      </section>

      {/* Class Tiers Grid */}
      <section className="py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {CLASS_TIERS.map((tier) => (
          <div
            key={tier.tier}
            className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-100 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <div>
                <span className="text-gold font-bold text-xs uppercase tracking-wider block">
                  {tier.medium}
                </span>
                <h2 className="font-display font-bold text-xl sm:text-2xl text-navy">
                  {tier.tier}
                </h2>
                <div className="text-gray-500 text-xs font-semibold mt-0.5">{tier.grades}</div>
              </div>
            </div>

            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-6">
              {tier.focus}
            </p>

            <div className="pt-6 border-t border-gray-100">
              <span className="text-xs font-bold text-navy uppercase tracking-wider block mb-3">
                Curriculum Subjects:
              </span>
              <div className="flex flex-wrap gap-2">
                {tier.subjects.map((sub, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-full bg-gray-50 text-gray-700 border border-gray-200 text-xs font-medium"
                  >
                    {sub}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}

        <div className="text-center pt-8">
          <Link
            href="/admissions"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-navy text-white text-xs sm:text-sm font-bold hover:bg-gold hover:text-navy transition-all shadow-md"
          >
            Apply for Academic Session 2083 <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
