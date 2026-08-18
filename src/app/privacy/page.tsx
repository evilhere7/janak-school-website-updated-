import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, ArrowLeft } from "lucide-react";
import { SCHOOL_INFO } from "@/lib/data/schoolData";

export const metadata: Metadata = {
  title: "Privacy Policy & Terms of Use",
  description: "Privacy policy and terms of use for Shree Janak Secondary School official website and portals.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-off-white">
      {/* Header */}
      <div className="bg-navy py-16 text-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-gold-light hover:text-white transition-colors mb-4"
          >
            <ArrowLeft size={14} /> Back to Homepage
          </Link>
          <h1 className="font-display text-4xl sm:text-5xl font-bold">
            Privacy Policy & Terms
          </h1>
          <p className="text-white/70 text-sm mt-2">
            Last Updated: August 2026 | Shree Janak Secondary School (JHSS)
          </p>
        </div>
      </div>

      {/* Content */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-100 shadow-sm space-y-8 text-gray-700 leading-relaxed text-sm sm:text-base">
            <div>
              <h2 className="font-display font-bold text-navy text-2xl mb-3">
                1. Institutional Overview & Commitment
              </h2>
              <p>
                Shree Janak Secondary School ({SCHOOL_INFO.nepaliName}), located at Gaindakot-5, Nawalparasi, Nepal,
                is committed to maintaining the confidentiality, integrity, and security of student, guardian,
                faculty, and visitor information collected through our official portal ({SCHOOL_INFO.website}).
              </p>
            </div>

            <div>
              <h2 className="font-display font-bold text-navy text-2xl mb-3">
                2. Information We Collect
              </h2>
              <p className="mb-2">We may collect personal details when you interact with our website, including:</p>
              <ul className="list-disc pl-6 space-y-1.5 text-gray-600">
                <li>Admission inquiry details (Name, Guardian Contact, Email, Desired Academic Stream).</li>
                <li>Student roll numbers and dates of birth for terminal result verification.</li>
                <li>Standard analytical browsing data (device type, pages visited) to improve website performance.</li>
              </ul>
            </div>

            <div>
              <h2 className="font-display font-bold text-navy text-2xl mb-3">
                3. Purpose of Information Use
              </h2>
              <p className="mb-2">The information collected is used strictly for educational and administrative purposes:</p>
              <ul className="list-disc pl-6 space-y-1.5 text-gray-600">
                <li>Processing admission inquiries and providing school counseling.</li>
                <li>Publishing official examination marks and attendance reports.</li>
                <li>Communicating emergency school notices, event updates, and holiday circulars.</li>
                <li>Ensuring compliance with the Ministry of Education, Science and Technology (MoEST) guidelines.</li>
              </ul>
            </div>

            <div>
              <h2 className="font-display font-bold text-navy text-2xl mb-3">
                4. Data Protection & Security
              </h2>
              <p>
                We do not sell, lease, or trade personal information to third parties. All student records and online
                inquiries are stored securely on protected servers and accessible only by authorized administrative
                personnel.
              </p>
            </div>

            <div>
              <h2 className="font-display font-bold text-navy text-2xl mb-3">
                5. Contacting the Administration
              </h2>
              <p>
                For questions or requests regarding your data or to update admission records, please contact our
                administrative office:
              </p>
              <div className="mt-3 p-4 bg-gray-50 rounded-2xl border border-gray-100 text-xs sm:text-sm">
                <div><strong>Institution:</strong> {SCHOOL_INFO.name}</div>
                <div><strong>Location:</strong> {SCHOOL_INFO.location}</div>
                <div><strong>Phone:</strong> {SCHOOL_INFO.phones[0]} / {SCHOOL_INFO.phones[1]}</div>
                <div><strong>Email:</strong> {SCHOOL_INFO.emails[0]}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
