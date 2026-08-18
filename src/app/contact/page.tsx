"use client";

import { useState } from "react";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  Building2,
  ExternalLink,
} from "lucide-react";
import { SCHOOL_INFO } from "@/lib/data/schoolData";

const FAQS = [
  {
    question: "When does the admission process start for +2 Science and Management?",
    answer:
      "Admissions for +2 Science, Management, and Humanities open immediately following the publication of the National Secondary Education Examination (SEE) results, usually around Ashadh / Shrawan.",
  },
  {
    question: "Are government scholarship quotas available at JHSS?",
    answer:
      "Yes, JHSS provides reserved government scholarships as per the Ministry of Education guidelines, alongside special institutional fee waivers through the Late Surya Bhakta Adhikari Memorial Trust for deserving students.",
  },
  {
    question: "What are the school office working hours?",
    answer:
      "The administrative office is open Sunday through Thursday from 9:30 AM to 4:30 PM, and on Friday from 9:30 AM to 2:00 PM (Closed on Saturdays and public holidays).",
  },
  {
    question: "Is English medium available for all school grades?",
    answer:
      "Yes, Shree Janak Secondary School operates both English and Nepali medium streams from Play Group / Nursery all the way through Class 10 (SEE) and Class 12 (+2).",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    grade: "Class 11 Science (+2)",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-off-white">
      {/* Hero Header */}
      <section className="relative hero-gradient py-20 lg:py-28 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-gold-lighter text-xs font-semibold uppercase tracking-widest mb-4">
            <Mail size={14} /> Get in Touch
          </span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Contact <span className="text-gradient-gold">JHSS Gaindakot</span>
          </h1>
          <p className="text-white/80 text-lg max-w-3xl mx-auto leading-relaxed">
            Have questions about admissions, academic programs, facilities, or campus visits?
            Our administrative team is here to assist you.
          </p>
        </div>
      </section>

      {/* Main Form & Contact Info */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12">
            {/* Left: Contact Details Card (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-navy rounded-3xl p-8 text-white shadow-xl">
                <h3 className="font-display text-2xl font-bold mb-6 text-white">
                  Campus Address & Contacts
                </h3>

                <div className="space-y-6">
                  {/* Address */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gold/20 flex items-center justify-center flex-shrink-0 text-gold-light">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-gold-light mb-1">Campus Location</div>
                      <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
                        {SCHOOL_INFO.location}
                      </p>
                      <span className="text-xs text-white/50 block mt-1">
                        (Near Congress Chowk, Gaindakot-5)
                      </span>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gold/20 flex items-center justify-center flex-shrink-0 text-gold-light">
                      <Phone size={20} />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-gold-light mb-1">Telephone Numbers</div>
                      {SCHOOL_INFO.phones.map((phone) => (
                        <a
                          key={phone}
                          href={`tel:${phone}`}
                          className="block text-white/80 hover:text-gold-light transition-colors text-xs sm:text-sm"
                        >
                          {phone}
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gold/20 flex items-center justify-center flex-shrink-0 text-gold-light">
                      <Mail size={20} />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-gold-light mb-1">Official Email</div>
                      {SCHOOL_INFO.emails.map((email) => (
                        <a
                          key={email}
                          href={`mailto:${email}`}
                          className="block text-white/80 hover:text-gold-light transition-colors text-xs sm:text-sm truncate max-w-[240px]"
                        >
                          {email}
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gold/20 flex items-center justify-center flex-shrink-0 text-gold-light">
                      <Clock size={20} />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-gold-light mb-1">Office Hours</div>
                      <p className="text-white/80 text-xs sm:text-sm">
                        Sunday – Thursday: 9:30 AM – 4:30 PM
                      </p>
                      <p className="text-white/80 text-xs sm:text-sm">
                        Friday: 9:30 AM – 2:00 PM
                      </p>
                      <span className="text-xs text-white/50 block mt-1">
                        (Closed on Saturdays & National Holidays)
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Campus Blocks Info */}
              <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
                <h4 className="font-display font-bold text-navy text-lg mb-3 flex items-center gap-2">
                  <Building2 size={18} className="text-gold" /> Key Campus Blocks
                </h4>
                <div className="space-y-2 text-xs text-gray-600">
                  <div className="p-2.5 rounded-xl bg-gray-50 font-medium">
                    <strong>Model School Wing:</strong> Congress Chowk, Administration & Secondary
                  </div>
                  <div className="p-2.5 rounded-xl bg-gray-50 font-medium">
                    <strong>+2 Aadarsha Wing:</strong> Higher Secondary Science & Management
                  </div>
                  <div className="p-2.5 rounded-xl bg-gray-50 font-medium">
                    <strong>Saraswati Wing:</strong> ICT Labs & Room to Read Library
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Admission & Inquiry Form (7 cols) */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-100 shadow-xl">
                <span className="inline-block px-3.5 py-1 rounded-full bg-gold/10 text-gold text-xs font-bold uppercase tracking-wider mb-2">
                  Online Inquiry
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-navy mb-3">
                  Send Us an <span className="text-gradient-gold">Admission Enquiry</span>
                </h2>
                <p className="text-gray-600 text-sm mb-8">
                  Fill in the form below and our counseling department will contact you within 24 business hours.
                </p>

                {isSubmitted ? (
                  <div className="p-8 rounded-2xl bg-green-50 border border-green-200 text-center animate-fade-in">
                    <CheckCircle2 className="w-14 h-14 text-green-600 mx-auto mb-4" />
                    <h3 className="font-display text-2xl font-bold text-green-900 mb-2">
                      Inquiry Received Successfully!
                    </h3>
                    <p className="text-green-800 text-sm max-w-md mx-auto mb-6">
                      Thank you for reaching out to Shree Janak Secondary School. Our admissions coordinator
                      will review your request and get back to you shortly.
                    </p>
                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({
                          name: "",
                          email: "",
                          phone: "",
                          grade: "Class 11 Science (+2)",
                          message: "",
                        });
                      }}
                      className="text-xs font-bold text-navy hover:text-gold underline cursor-pointer"
                    >
                      Submit another inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Ramesh Poudel"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:bg-white focus:border-gold outline-none transition-all text-gray-800"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="e.g. 98XXXXXXXX"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:bg-white focus:border-gold outline-none transition-all text-gray-800"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          placeholder="e.g. name@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:bg-white focus:border-gold outline-none transition-all text-gray-800"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">
                          Interested Level / Stream *
                        </label>
                        <select
                          value={formData.grade}
                          onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:bg-white focus:border-gold outline-none transition-all text-navy font-medium cursor-pointer"
                        >
                          <option value="Play Group / Nursery">Play Group / Nursery / KG</option>
                          <option value="Primary (Class 1-5)">Primary (Class 1 - 5)</option>
                          <option value="Lower Secondary (Class 6-8)">Lower Secondary (Class 6 - 8)</option>
                          <option value="Secondary (Class 9-10 SEE)">Secondary (Class 9 - 10 SEE)</option>
                          <option value="Class 11 Science (+2)">+2 Science Stream</option>
                          <option value="Class 11 Management (+2)">+2 Management Stream</option>
                          <option value="Class 11 Humanities (+2)">+2 Humanities Stream</option>
                          <option value="Other Inquiries">General / Other Inquiries</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">
                        Your Message / Questions
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Write any questions regarding fee structure, scholarship, transport or curriculum..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:bg-white focus:border-gold outline-none transition-all text-gray-800 resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-navy hover:bg-gold text-white text-sm font-bold shadow-navy transition-all duration-300 cursor-pointer"
                    >
                      <Send size={16} /> Submit Admission Inquiry
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map & Location Section */}
      <section className="section-padding bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-navy/8 text-navy text-xs font-semibold uppercase tracking-widest mb-4">
              Find Us on Map
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy">
              Gaindakot <span className="text-gradient-gold">Campus Location</span>
            </h2>
            <p className="text-gray-600 mt-2 text-sm">
              Easily accessible from Mahendra Highway and Narayangarh city center across the Narayani River bridge.
            </p>
          </div>

          <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-200 h-[400px] relative bg-gray-100">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14131.066442654862!2d84.40264024823292!3d27.70903823432924!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3994fb3c5bdf1bb3%3A0x8670a48b30147987!2sShree%20Janak%20Secondary%20School!5e0!3m2!1sen!2snp!4v1700000000000!5m2!1sen!2snp"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Shree Janak Secondary School Map Location"
            />
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full bg-navy/8 text-navy text-xs font-semibold uppercase tracking-widest mb-4">
              Frequently Asked Questions
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy">
              Common Questions & <span className="text-gradient-gold">Answers</span>
            </h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 font-display font-bold text-navy text-base sm:text-lg hover:text-gold transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle size={18} className="text-gold flex-shrink-0" />
                    {faq.question}
                  </span>
                  <span className="text-xs font-bold text-gold flex-shrink-0">
                    {activeFaq === idx ? "−" : "+"}
                  </span>
                </button>

                {activeFaq === idx && (
                  <div className="px-6 pb-6 pt-1 text-gray-600 text-sm leading-relaxed border-t border-gray-100">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
