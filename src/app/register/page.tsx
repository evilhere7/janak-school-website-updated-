"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Lock,
  Mail,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  GraduationCap,
  Briefcase,
  Users,
  Shield,
  Sparkles,
} from "lucide-react";
import { useAuth, getFriendlyAuthErrorMessage } from "@/contexts/AuthContext";
import type { UserRole } from "@/types/auth";
import { SCHOOL_INFO } from "@/lib/data/schoolData";

const ROLES: { role: UserRole; title: string; desc: string; icon: React.ReactNode }[] = [
  {
    role: "student",
    title: "Student",
    desc: "View marks, assignments & syllabus",
    icon: <GraduationCap className="w-5 h-5 text-gold" />,
  },
  {
    role: "parent",
    title: "Parent / Guardian",
    desc: "Monitor ward's progress & fee dues",
    icon: <Users className="w-5 h-5 text-gold" />,
  },
  {
    role: "teacher",
    title: "Teacher / Faculty",
    desc: "Enter marks, attendance & materials",
    icon: <Briefcase className="w-5 h-5 text-gold" />,
  },
  {
    role: "admin",
    title: "Administrator",
    desc: "Manage school system & notices",
    icon: <Shield className="w-5 h-5 text-gold" />,
  },
];

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();

  const [selectedRole, setSelectedRole] = useState<UserRole>("student");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Role specific fields
  const [studentId, setStudentId] = useState("");
  const [grade, setGrade] = useState("Class 10 (SEE)");
  const [employeeId, setEmployeeId] = useState("");
  const [department, setDepartment] = useState("Science Stream (+2)");
  const [wardName, setWardName] = useState("");
  const [wardStudentId, setWardStudentId] = useState("");
  const [adminKey, setAdminKey] = useState("");

  const [agreedToTerms, setAgreedToTerms] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!fullName.trim() || !email.trim() || !password) {
      setError("Please fill out all required fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match. Please re-enter.");
      return;
    }

    if (!agreedToTerms) {
      setError("Please agree to the School Terms and Privacy Policy.");
      return;
    }

    setIsSubmitting(true);

    try {
      await register(email, password, {
        fullName: fullName.trim(),
        role: selectedRole,
        studentId: selectedRole === "student" ? studentId.trim() : undefined,
        grade: selectedRole === "student" ? grade : undefined,
        employeeId: selectedRole === "teacher" ? employeeId.trim() : undefined,
        department: selectedRole === "teacher" ? department : undefined,
        wardName: selectedRole === "parent" ? wardName.trim() : undefined,
        wardStudentId: selectedRole === "parent" ? wardStudentId.trim() : undefined,
        adminDesignation: selectedRole === "admin" ? "Administrative Coordinator" : undefined,
      });

      router.push("/dashboard");
    } catch (err: any) {
      console.error("Registration failed:", err);
      const code = err.code || "";
      setError(getFriendlyAuthErrorMessage(code));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-off-white flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div
          className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, #c8921a 0%, transparent 70%)" }}
        />
        <div
          className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, #0f2044 0%, transparent 70%)" }}
        />
      </div>

      <div className="relative max-w-xl mx-auto w-full">
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-100 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-block mb-3">
              <div className="relative w-14 h-14 mx-auto rounded-full overflow-hidden ring-4 ring-gold/20 shadow-md">
                <Image
                  src="/assets/logo/jhss-logo3_1.png"
                  alt="JHSS Logo"
                  fill
                  className="object-contain p-1"
                />
              </div>
            </Link>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-navy/5 text-navy text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles size={13} className="text-gold" /> Institutional Registration
            </span>
            <h1 className="font-display font-bold text-navy text-2xl sm:text-3xl">
              Create an Account
            </h1>
            <p className="text-gray-500 text-xs mt-1">
              Join the Shree Janak Secondary School online community
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-xs text-crimson flex items-start gap-2.5 animate-fade-in">
              <AlertCircle size={16} className="text-crimson flex-shrink-0 mt-0.5" />
              <span className="leading-relaxed font-medium">{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Role Selection */}
            <div>
              <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-3">
                Select Your Role *
              </label>
              <div className="grid grid-cols-2 gap-3">
                {ROLES.map((r) => (
                  <button
                    key={r.role}
                    type="button"
                    onClick={() => setSelectedRole(r.role)}
                    className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      selectedRole === r.role
                        ? "border-gold bg-gold/5 ring-2 ring-gold/20 shadow-sm"
                        : "border-gray-200 hover:border-navy/30 bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="p-1.5 rounded-lg bg-navy/5">{r.icon}</div>
                      {selectedRole === r.role && (
                        <CheckCircle2 size={16} className="text-gold" />
                      )}
                    </div>
                    <div>
                      <div className="font-bold text-xs text-navy">{r.title}</div>
                      <div className="text-[10px] text-gray-500 line-clamp-1">{r.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Basic Info */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Aarav Sharma"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:bg-white focus:border-gold outline-none transition-all text-gray-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:bg-white focus:border-gold outline-none transition-all text-gray-800"
                  />
                </div>
              </div>
            </div>

            {/* Role-Specific Details */}
            {selectedRole === "student" && (
              <div className="grid sm:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-200">
                <div>
                  <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-1.5">
                    Class / Grade *
                  </label>
                  <select
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-gray-200 text-xs font-medium text-navy focus:border-gold outline-none"
                  >
                    <option value="Class 10 (SEE)">Class 10 (SEE)</option>
                    <option value="Class 11 Science">+2 Class 11 Science</option>
                    <option value="Class 11 Management">+2 Class 11 Management</option>
                    <option value="Class 11 Humanities">+2 Class 11 Humanities</option>
                    <option value="Class 12 Science">+2 Class 12 Science</option>
                    <option value="Class 12 Management">+2 Class 12 Management</option>
                    <option value="Primary (Class 1-5)">Primary (Class 1 - 5)</option>
                    <option value="Lower Secondary (6-8)">Lower Secondary (Class 6 - 8)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-1.5">
                    Student Roll No. / ID
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 0481203A"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-gray-200 text-xs focus:border-gold outline-none uppercase font-mono"
                  />
                </div>
              </div>
            )}

            {selectedRole === "teacher" && (
              <div className="grid sm:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-200">
                <div>
                  <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-1.5">
                    Department *
                  </label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-gray-200 text-xs font-medium text-navy focus:border-gold outline-none"
                  >
                    <option value="Science Stream (+2)">Science Stream (+2)</option>
                    <option value="Management Stream (+2)">Management Stream (+2)</option>
                    <option value="Computer Science & ICT">Computer Science & ICT</option>
                    <option value="School Level / Mathematics">School Level / Mathematics</option>
                    <option value="Primary & Foundation">Primary & Foundation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-1.5">
                    Teacher Employee ID
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. EMP-2083-04"
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-gray-200 text-xs focus:border-gold outline-none uppercase font-mono"
                  />
                </div>
              </div>
            )}

            {selectedRole === "parent" && (
              <div className="grid sm:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-200">
                <div>
                  <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-1.5">
                    Ward (Child&apos;s) Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Rohan Sharma"
                    value={wardName}
                    onChange={(e) => setWardName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-gray-200 text-xs focus:border-gold outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-1.5">
                    Child&apos;s Student ID
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 0481203A"
                    value={wardStudentId}
                    onChange={(e) => setWardStudentId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-gray-200 text-xs focus:border-gold outline-none uppercase font-mono"
                  />
                </div>
              </div>
            )}

            {/* Password Fields */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">
                  Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    autoComplete="new-password"
                    placeholder="Min. 6 chars"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:bg-white focus:border-gold outline-none transition-all text-gray-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">
                  Confirm Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    autoComplete="new-password"
                    placeholder="Re-type password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:bg-white focus:border-gold outline-none transition-all text-gray-800"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Terms checkbox */}
            <label className="flex items-start gap-2.5 text-xs text-gray-600 cursor-pointer">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mt-0.5 rounded border-gray-300 text-navy focus:ring-gold"
              />
              <span>
                I agree to the{" "}
                <Link href="/privacy" className="text-navy font-bold hover:underline">
                  Institutional Code of Conduct
                </Link>{" "}
                and Privacy Terms.
              </span>
            </label>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-full bg-navy hover:bg-gold text-white text-sm font-bold shadow-navy transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed hover:shadow-lg"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Complete Registration</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Switch to Login */}
          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-500">
              Already have an institutional account?{" "}
              <Link
                href="/login"
                className="font-bold text-navy hover:text-gold transition-colors"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
