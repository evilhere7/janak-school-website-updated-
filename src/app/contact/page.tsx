"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  MessageSquare,
  ArrowRight,
  Building2,
} from "lucide-react";
import { SCHOOL_INFO } from "@/lib/data/schoolData";
import { cn } from "@/lib/utils";

type FormState = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

type Status = "idle" | "loading" | "success" | "error";

export default function ContactPage() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<Status>("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus("loading");
    // Simulate form submission
    await new Promise((r) => setTimeout(r, 1200));
    setStatus("success");
  };

  return (
    <div className="min-h-screen bg-off-white selection:bg-gold selection:text-white">
      {/* Hero Header */}
      <section className="relative hero-gradient text-white py-24 sm:py-32 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-semibold uppercase tracking-wider text-gold-light mb-6">
            <MessageSquare size={14} /> Office Enquiries
          </div>
          <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight text-white mb-6">
            Contact Janak Higher Secondary School
          </h1>
          <p className="text-white/80 text-base sm:text-xl max-w-3xl mx-auto leading-relaxed">
            Our administrative office is ready to assist with admissions enquiries, academic support, and general information.
          </p>
        </div>
      </section>

      {/* Main Content Split */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Left: Contact Info */}
          <div className="lg:col-span-5 space-y-6">
            {/* School Address Card */}
            <div className="bg-gradient-to-br from-navy-dark via-navy to-navy-light text-white rounded-3xl p-8 sm:p-10 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Building2 size={20} className="text-gold-light" />
                </div>
                <div>
                  <h2 className="font-display font-black text-xl text-white">Shree Janak Secondary School</h2>
                  <p className="text-white/60 text-xs font-semibold uppercase tracking-wide">Official School Office</p>
                </div>
              </div>

              <div className="space-y-5 text-sm text-white/80">
                <div className="flex items-start gap-3">
                  <MapPin size={16} className="text-gold-light flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-white text-sm">Physical Address</div>
                    <div className="text-xs mt-0.5">{SCHOOL_INFO.location}</div>
                    <div className="text-xs text-white/50 mt-0.5">Near Congress Chowk, Gaindakot</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone size={16} className="text-gold-light flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-white text-sm">Phone Numbers</div>
                    {SCHOOL_INFO.phones.map((p) => (
                      <a
                        key={p}
                        href={`tel:${p}`}
                        className="block text-xs text-gold-light hover:text-white transition-colors mt-0.5 font-mono"
                      >
                        {p}
                      </a>
                    ))}
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail size={16} className="text-gold-light flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-white text-sm">Email Addresses</div>
                    {SCHOOL_INFO.emails.map((e) => (
                      <a
                        key={e}
                        href={`mailto:${e}`}
                        className="block text-xs text-gold-light hover:text-white transition-colors mt-0.5 truncate"
                      >
                        {e}
                      </a>
                    ))}
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock size={16} className="text-gold-light flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-white text-sm">Office Hours</div>
                    <div className="text-xs mt-0.5">Sunday – Friday: 10:00 AM – 4:30 PM</div>
                    <div className="text-xs text-white/50 mt-0.5">Saturday & Public Holidays: Closed</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm space-y-3">
              <h3 className="font-display font-bold text-navy text-base mb-4">Quick Links</h3>
              {[
                { label: "Admission Process", href: "/admissions/process" },
                { label: "Eligibility & Requirements", href: "/admissions/requirements" },
                { label: "Frequently Asked Questions", href: "/admissions/faq" },
                { label: "Student Result Portal", href: "/portal/student" },
                { label: "Academic Programs", href: "/academics/programs" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center justify-between py-2.5 border-b border-gray-50 text-xs font-semibold text-gray-700 hover:text-navy group"
                >
                  <span>{link.label}</span>
                  <ArrowRight size={13} className="text-gray-300 group-hover:text-gold transition-colors" />
                </Link>
              ))}
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-8 sm:p-12">
              {status === "success" ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto">
                    <CheckCircle2 size={40} className="text-green-500" />
                  </div>
                  <h3 className="font-display font-black text-2xl text-navy">
                    Message Received!
                  </h3>
                  <p className="text-gray-600 text-sm max-w-sm mx-auto">
                    Thank you for reaching out. Our office team will respond to your enquiry within 1–2 business days (Sunday–Friday).
                  </p>
                  <button
                    onClick={() => {
                      setStatus("idle");
                      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
                    }}
                    className="mt-4 px-6 py-3 rounded-full bg-navy text-white font-bold text-xs hover:bg-gold hover:text-navy transition-all shadow-md"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-8">
                    <h2 className="font-display font-black text-2xl sm:text-3xl text-navy">
                      Send Us a Message
                    </h2>
                    <p className="text-gray-500 text-xs sm:text-sm mt-2">
                      Fill out the form below and our team will get back to you promptly.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label htmlFor="name" className="block text-xs font-bold text-navy uppercase tracking-wider">
                          Full Name <span className="text-crimson">*</span>
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Your full name"
                          className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:bg-white focus:border-gold outline-none transition-all placeholder:text-gray-400"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label htmlFor="email" className="block text-xs font-bold text-navy uppercase tracking-wider">
                          Email Address <span className="text-crimson">*</span>
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={form.email}
                          onChange={handleChange}
                          placeholder="your@email.com"
                          className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:bg-white focus:border-gold outline-none transition-all placeholder:text-gray-400"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label htmlFor="phone" className="block text-xs font-bold text-navy uppercase tracking-wider">
                          Phone Number
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="+977-XXXXXXXXX"
                          className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:bg-white focus:border-gold outline-none transition-all placeholder:text-gray-400"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label htmlFor="subject" className="block text-xs font-bold text-navy uppercase tracking-wider">
                          Enquiry Subject
                        </label>
                        <select
                          id="subject"
                          name="subject"
                          value={form.subject}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:bg-white focus:border-gold outline-none transition-all text-gray-700"
                        >
                          <option value="">Select a topic…</option>
                          <option value="Admissions Enquiry">Admissions Enquiry</option>
                          <option value="Academic Programs">Academic Programs</option>
                          <option value="Facilities & Campus">Facilities & Campus</option>
                          <option value="Student Records">Student Records</option>
                          <option value="Fee & Scholarship">Fee & Scholarship</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="message" className="block text-xs font-bold text-navy uppercase tracking-wider">
                        Your Message <span className="text-crimson">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Please describe your enquiry in detail..."
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:bg-white focus:border-gold outline-none transition-all resize-none placeholder:text-gray-400"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={status === "loading" || !form.name || !form.email || !form.message}
                      className={cn(
                        "w-full flex items-center justify-center gap-2 py-4 rounded-full font-bold text-sm transition-all shadow-md",
                        status === "loading"
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "bg-navy text-white hover:bg-gold hover:text-navy cursor-pointer"
                      )}
                    >
                      {status === "loading" ? (
                        <>
                          <span className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                          Sending Message...
                        </>
                      ) : (
                        <>
                          <Send size={16} /> Send Enquiry to JHSS
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>

            {/* Embedded Google Map Placeholder */}
            <div className="mt-6 rounded-3xl overflow-hidden border border-gray-100 shadow-sm bg-gray-100 relative h-56 sm:h-72">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3538.0!2d83.97!3d27.53!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sGaindakot-5%2C+Nawalparasi%2C+Nepal!5e0!3m2!1sen!2snp!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="JHSS Location Map — Gaindakot-5, Nawalparasi"
              />
              <div className="absolute bottom-4 right-4">
                <a
                  href="https://maps.google.com/?q=Gaindakot-5,Nawalparasi,Nepal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full bg-navy text-white text-xs font-bold shadow-md hover:bg-gold hover:text-navy transition-all"
                >
                  Open in Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
