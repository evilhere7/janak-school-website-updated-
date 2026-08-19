import type { Metadata } from "next";
import Link from "next/link";
import { FileText, ArrowLeft, ArrowRight, CheckCircle2, AlertCircle, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Admission Requirements | Shree Janak Secondary School",
  description:
    "Check required documents, age criteria, and eligibility rules for admissions at Shree Janak Secondary School.",
};

const REQUIRED_DOCS = [
  "Copy of official Birth Registration Certificate issued by local ward/municipality",
  "Previous class grade sheet / progress report card (for transfer applicants)",
  "Original Transfer Certificate (T.C.) & Character Certificate from previous school",
  "SEE Grade-sheet and Character Certificate (mandatory for +2 Science, Management & Humanities admissions)",
  "Recent passport-size color photographs (4 copies with clear white/blue background)",
  "Copy of Citizenship or National ID card of Parent / Legal Guardian",
];

const ELIGIBILITY_CRITERIA = [
  {
    stream: "Play Group & Early Childhood (ECD)",
    criteria: "Minimum age of 3+ years completed by Baisakh 1. Welcoming readiness assessment.",
  },
  {
    stream: "Primary Level (Class 1 to 5)",
    criteria: "Age appropriate promotion with foundational literacy/numeracy evaluation for English medium sections.",
  },
  {
    stream: "Secondary Level (Class 6 to 10)",
    criteria: "Successful completion of preceding grade with transfer clearance and good behavioral conduct.",
  },
  {
    stream: "+2 Science Stream",
    criteria: "Minimum GPA 2.0+ in SEE with minimum grade C+ in Compulsory Mathematics and Science & Technology.",
  },
  {
    stream: "+2 Management Stream",
    criteria: "Minimum GPA 1.6+ in SEE with passing grades across all compulsory subjects.",
  },
  {
    stream: "+2 Humanities Stream",
    criteria: "Minimum GPA 1.6+ in SEE with an inclination towards literature, sociology, and language studies.",
  },
];

export default function RequirementsPage() {
  return (
    <div className="min-h-screen bg-off-white selection:bg-gold selection:text-white">
      {/* Hero Header */}
      <section className="relative hero-gradient text-white py-20 sm:py-28 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link
            href="/admissions"
            className="inline-flex items-center gap-1.5 text-gold-light text-xs font-bold uppercase tracking-wider mb-6 hover:underline"
          >
            <ArrowLeft size={14} /> Back to Admissions Overview
          </Link>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-gold-light text-xs font-bold uppercase tracking-wider mb-4 mx-auto block w-fit">
            <FileText size={14} /> Eligibility Checklist
          </div>
          <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight text-white mb-4">
            Requirements & Documentation
          </h1>
          <p className="text-white/80 text-base sm:text-lg max-w-2xl mx-auto">
            Essential documentation and academic criteria required for successful admission.
          </p>
        </div>
      </section>

      {/* Document Checklist */}
      <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-100 shadow-sm">
          <span className="text-gold font-bold text-xs uppercase tracking-widest block mb-2">
            Mandatory Paperwork
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-navy mb-6">
            Document Checklist
          </h2>

          <div className="space-y-4">
            {REQUIRED_DOCS.map((doc, idx) => (
              <div key={idx} className="flex items-start gap-3 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                <CheckCircle2 size={18} className="text-gold flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 text-xs sm:text-sm leading-relaxed">{doc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stream Eligibility Table */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-100 shadow-sm">
          <span className="text-gold font-bold text-xs uppercase tracking-widest block mb-2">
            Academic Standards
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-navy mb-6">
            Eligibility & Minimum Criteria
          </h2>

          <div className="space-y-4">
            {ELIGIBILITY_CRITERIA.map((crit, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-gray-50 border border-gray-100">
                <h3 className="font-display font-bold text-navy text-base mb-1">{crit.stream}</h3>
                <p className="text-gray-600 text-xs sm:text-sm">{crit.criteria}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center pt-4">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-navy text-white text-xs sm:text-sm font-bold hover:bg-gold hover:text-navy transition-all shadow-md"
          >
            Submit an Admission Enquiry <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
