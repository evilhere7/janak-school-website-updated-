import type { Metadata } from "next";
import Link from "next/link";
import { Sparkles, CheckCircle2, ArrowRight, Calendar, FileText, HelpCircle, Phone, Mail, MapPin } from "lucide-react";
import { ADMISSION_STEPS, ADMISSION_FAQS, SCHOOL_INFO } from "@/lib/data/schoolData";

export const metadata: Metadata = {
  title: "Admissions 2083 | Shree Janak Secondary School",
  description:
    "Join Shree Janak Secondary School for Academic Session 2083. Explore admission requirements, step-by-step application process, and scholarship opportunities.",
};

export default function AdmissionsPage() {
  return (
    <div className="min-h-screen bg-off-white selection:bg-gold selection:text-white">
      {/* Hero Header */}
      <section className="relative hero-gradient text-white py-24 sm:py-32 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-semibold uppercase tracking-wider text-gold-light mb-6">
            <Sparkles size={14} /> Admissions Open 2083
          </div>
          <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight text-white mb-6">
            Begin Your Journey With JHSS
          </h1>
          <p className="text-white/80 text-base sm:text-xl max-w-3xl mx-auto leading-relaxed">
            Welcoming students from Play Group to Class 12 (+2 Science, Management & Humanities) into an inspiring environment of academic excellence.
          </p>
        </div>
      </section>

      {/* Quick Access Grid */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-3 gap-6">
            <Link
              href="/admissions/process"
              className="p-8 rounded-3xl bg-gray-50 border border-gray-100 hover:border-gold/50 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-navy/5 text-navy group-hover:bg-gold group-hover:text-navy mb-4 flex items-center justify-center transition-colors">
                  <Calendar size={22} />
                </div>
                <h3 className="font-display font-bold text-navy text-xl mb-2">Admission Process</h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                  Visual 5-step roadmap from inquiry and form submission to enrollment confirmation.
                </p>
              </div>
              <div className="pt-6 flex items-center gap-1 text-xs font-bold text-navy group-hover:text-gold transition-colors">
                View Roadmap <ArrowRight size={14} />
              </div>
            </Link>

            <Link
              href="/admissions/requirements"
              className="p-8 rounded-3xl bg-gray-50 border border-gray-100 hover:border-gold/50 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-navy/5 text-navy group-hover:bg-gold group-hover:text-navy mb-4 flex items-center justify-center transition-colors">
                  <FileText size={22} />
                </div>
                <h3 className="font-display font-bold text-navy text-xl mb-2">Requirements & Documents</h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                  Document checklist, eligibility criteria for +2 streams, and age requirements.
                </p>
              </div>
              <div className="pt-6 flex items-center gap-1 text-xs font-bold text-navy group-hover:text-gold transition-colors">
                View Checklist <ArrowRight size={14} />
              </div>
            </Link>

            <Link
              href="/admissions/faq"
              className="p-8 rounded-3xl bg-gray-50 border border-gray-100 hover:border-gold/50 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-navy/5 text-navy group-hover:bg-gold group-hover:text-navy mb-4 flex items-center justify-center transition-colors">
                  <HelpCircle size={22} />
                </div>
                <h3 className="font-display font-bold text-navy text-xl mb-2">Admissions FAQ</h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                  Answers regarding scholarships, medium options, fee structures, and entrance assessments.
                </p>
              </div>
              <div className="pt-6 flex items-center gap-1 text-xs font-bold text-navy group-hover:text-gold transition-colors">
                Read FAQ <ArrowRight size={14} />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Step by step summary */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-gold font-bold text-xs uppercase tracking-widest block mb-2">
            Application Roadmap
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-navy">
            How to Apply in 5 Easy Steps
          </h2>
        </div>

        <div className="grid md:grid-cols-5 gap-6">
          {ADMISSION_STEPS.map((s) => (
            <div
              key={s.step}
              className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="font-display font-black text-3xl text-gold mb-3">{s.step}</div>
                <h3 className="font-display font-bold text-navy text-base mb-2">{s.title}</h3>
                <p className="text-gray-600 text-xs leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Admissions Box */}
        <div className="mt-16 bg-gradient-to-br from-navy-dark via-navy to-navy-light text-white rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <span className="text-gold-light text-xs font-bold uppercase tracking-wider block mb-1">
              Have Questions?
            </span>
            <h3 className="font-display font-bold text-2xl sm:text-3xl mb-2">
              Speak With Our Admissions Desk
            </h3>
            <p className="text-white/70 text-xs sm:text-sm max-w-xl">
              Our office staff is available Sunday to Friday (10:00 AM – 4:00 PM) to assist you with prospectus collection and registration.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 flex-shrink-0">
            <Link
              href="/contact"
              className="px-6 py-3.5 rounded-full bg-gold text-navy-dark font-bold text-xs hover:bg-gold-light transition-all shadow-md"
            >
              Contact Admissions
            </Link>
            <a
              href={`tel:${SCHOOL_INFO.phones[0]}`}
              className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-all"
            >
              Call {SCHOOL_INFO.phones[0]}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
