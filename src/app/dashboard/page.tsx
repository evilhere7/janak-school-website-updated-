"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  GraduationCap,
  Users,
  Briefcase,
  Shield,
  LogOut,
  User,
  Calendar,
  BookOpen,
  FileText,
  Award,
  CheckCircle2,
  Clock,
  Bell,
  Download,
  Plus,
  Send,
  Sparkles,
  TrendingUp,
  Settings,
  ChevronRight,
  CreditCard,
  Building,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { SCHOOL_INFO, NOTICES, STATS } from "@/lib/data/schoolData";
import { studentService, type StudentTask } from "@/services/studentService";
import { noticeService } from "@/services/noticeService";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}

function DashboardContent() {
  const { user, userProfile, logout } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>("overview");

  const role = userProfile?.role || "student";
  const fullName = userProfile?.fullName || user?.displayName || "Member";
  const email = userProfile?.email || user?.email || "";

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-off-white pb-20">
      {/* Top Banner Header */}
      <div className="hero-gradient py-12 text-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-2xl bg-white/10 border border-white/20 overflow-hidden flex items-center justify-center text-gold-light text-2xl font-bold">
              {userProfile?.photoURL ? (
                <Image
                  src={userProfile.photoURL}
                  alt={fullName}
                  fill
                  className="object-cover"
                />
              ) : (
                fullName.charAt(0).toUpperCase()
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider px-3 py-0.5 rounded-full bg-gold text-white shadow-gold">
                  {role.toUpperCase()} PORTAL
                </span>
                <span className="text-white/60 text-xs">{SCHOOL_INFO.shortName}</span>
              </div>
              <h1 className="font-display font-bold text-2xl sm:text-3xl text-white mt-1">
                Hello, {fullName}
              </h1>
              <p className="text-white/70 text-xs mt-0.5">{email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/portal/student"
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/10 transition-colors"
            >
              Public Marksheet View
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-crimson/80 hover:bg-crimson text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              <LogOut size={14} /> Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Main Dashboard Body */}
      <div className="max-w-7xl mx-auto px-6 -mt-4">
        {/* Role Custom View */}
        {role === "student" && <StudentView userProfile={userProfile} />}
        {role === "teacher" && <TeacherView userProfile={userProfile} />}
        {role === "parent" && <ParentView userProfile={userProfile} />}
        {role === "admin" && <AdminView userProfile={userProfile} />}
      </div>
    </div>
  );
}

// ─── 1. Student Dashboard View ──────────────────────────────
function StudentView({ userProfile }: { userProfile: any }) {
  const [tasks, setTasks] = useState<StudentTask[]>([]);

  useEffect(() => {
    studentService.getAssignments().then(setTasks);
  }, []);

  const handleToggleTask = async (task: StudentTask) => {
    const updatedStatus = !task.isCompleted;
    setTasks((prev) =>
      prev.map((t) => (t.id === task.id ? { ...t, isCompleted: updatedStatus } : t))
    );
    await studentService.toggleAssignment(task.id, updatedStatus);
  };

  return (
    <div className="space-y-8 animate-fade-up">
      {/* Metrics Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <span className="text-xs text-gray-500 font-medium block">Current Grade</span>
          <div className="font-display font-bold text-navy text-xl mt-1">
            {userProfile?.grade || "Class 10 (SEE)"}
          </div>
          <span className="text-[11px] text-gold font-semibold mt-1 block">
            ID: {userProfile?.studentId || "0481203A"}
          </span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <span className="text-xs text-gray-500 font-medium block">Terminal GPA</span>
          <div className="font-display font-bold text-navy text-xl mt-1 text-gold">
            3.85 / 4.0
          </div>
          <span className="text-[11px] text-green-600 font-semibold mt-1 block">
            Grade A+ (Distinction)
          </span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <span className="text-xs text-gray-500 font-medium block">Attendance Rate</span>
          <div className="font-display font-bold text-navy text-xl mt-1">94.8%</div>
          <span className="text-[11px] text-gray-400 mt-1 block">112 of 118 school days</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <span className="text-xs text-gray-500 font-medium block">Pending Assignments</span>
          <div className="font-display font-bold text-navy text-xl mt-1 text-crimson">
            {tasks.filter((t) => !t.isCompleted).length} Due
          </div>
          <span className="text-[11px] text-gray-400 mt-1 block">Active assignments</span>
        </div>
      </div>

      {/* Grid Content */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left: Schedule & Assignments (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Today's Schedule */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm">
            <h3 className="font-display font-bold text-navy text-xl mb-4 flex items-center gap-2">
              <Clock size={18} className="text-gold" /> Today&apos;s Class Routine
            </h3>
            <div className="divide-y divide-gray-100">
              {[
                { time: "10:15 - 11:00 AM", subject: "Compulsory Mathematics", room: "Room 102", teacher: "Mr. Dipak Poudel" },
                { time: "11:00 - 11:45 AM", subject: "Science & Technology (Physics Lab)", room: "Lab A", teacher: "Mrs. Saraswati Sharma" },
                { time: "11:45 - 12:30 PM", subject: "English Literature", room: "Room 102", teacher: "Mrs. Radhika Bhusal" },
                { time: "01:15 - 02:00 PM", subject: "Computer Science & Programming", room: "ICT Center", teacher: "Mr. Ramesh Adhikari" },
              ].map((slot, idx) => (
                <div key={idx} className="py-3.5 flex items-center justify-between gap-4 text-xs sm:text-sm">
                  <div>
                    <div className="font-bold text-navy">{slot.subject}</div>
                    <div className="text-gray-500 text-xs">{slot.teacher} • {slot.room}</div>
                  </div>
                  <div className="px-3 py-1 bg-gray-50 rounded-lg font-mono text-xs text-navy font-semibold">
                    {slot.time}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Homework & Projects */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm">
            <h3 className="font-display font-bold text-navy text-xl mb-4 flex items-center gap-2">
              <BookOpen size={18} className="text-gold" /> Homework & Study Tasks
            </h3>
            <div className="space-y-3">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => handleToggleTask(task)}
                  className={`p-4 rounded-2xl border flex items-center justify-between gap-4 cursor-pointer transition-all ${
                    task.isCompleted ? "bg-gray-50/60 border-gray-100 opacity-60" : "bg-white border-gray-200 hover:border-gold"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle2
                      size={18}
                      className={task.isCompleted ? "text-green-600 mt-0.5" : "text-gray-300 mt-0.5"}
                    />
                    <div>
                      <div className={`font-bold text-xs sm:text-sm ${task.isCompleted ? "line-through text-gray-500" : "text-navy"}`}>
                        {task.title}
                      </div>
                      <div className="text-[11px] text-gray-400">{task.subject}</div>
                    </div>
                  </div>
                  <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg ${task.isCompleted ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-900"}`}>
                    {task.dueDate}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Quick Resources & Downloads */}
        <div className="space-y-6">
          <div className="bg-navy rounded-3xl p-6 text-white shadow-xl">
            <h3 className="font-display font-bold text-lg mb-2 flex items-center gap-2">
              <Download size={18} className="text-gold-light" /> Academic Downloads
            </h3>
            <p className="text-white/70 text-xs mb-4">
              Access digital books, syllabus outlines, and past exam questions.
            </p>
            <div className="space-y-2.5">
              {[
                { title: "SEE Class 10 Model Questions (CDC)", size: "4.2 MB" },
                { title: "+2 Science Lab Manual 2083", size: "6.8 MB" },
                { title: "Hamro Serophero Teacher Guide", size: "3.1 MB" },
              ].map((doc, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5 flex items-center justify-between text-xs"
                >
                  <span className="truncate pr-2">{doc.title}</span>
                  <span className="text-gold-light text-[10px] flex-shrink-0 font-mono">{doc.size}</span>
                </div>
              ))}
            </div>
          </div>

          {/* School Notice Digest */}
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-bold text-navy text-sm flex items-center gap-2">
                <Bell size={16} className="text-gold" /> Latest Circulars
              </h4>
              <Link href="/notices" className="text-xs text-gold font-bold hover:underline">
                View All
              </Link>
            </div>
            <div className="space-y-3">
              {NOTICES.slice(0, 3).map((notice) => (
                <div key={notice.id} className="text-xs border-b border-gray-100 pb-2.5">
                  <div className="font-semibold text-navy hover:text-gold transition-colors line-clamp-1">
                    {notice.title}
                  </div>
                  <span className="text-[10px] text-gray-400">{notice.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── 2. Teacher Dashboard View ──────────────────────────────
function TeacherView({ userProfile }: { userProfile: any }) {
  const [noticeTitle, setNoticeTitle] = useState("");
  const [noticeText, setNoticeText] = useState("");
  const [noticeSent, setNoticeSent] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  const handleBroadcast = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!noticeText.trim()) return;
    setIsPublishing(true);

    await noticeService.publishNotice({
      title: noticeTitle.trim() || "Important Class Announcement",
      description: noticeText.trim(),
      category: "GENERAL",
      isImportant: true,
    });

    setIsPublishing(false);
    setNoticeSent(true);
    setTimeout(() => {
      setNoticeTitle("");
      setNoticeText("");
      setNoticeSent(false);
    }, 3500);
  };

  return (
    <div className="space-y-8 animate-fade-up">
      {/* Metrics Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <span className="text-xs text-gray-500 font-medium block">Department</span>
          <div className="font-display font-bold text-navy text-lg mt-1">
            {userProfile?.department || "Science & Mathematics"}
          </div>
          <span className="text-[11px] text-gold font-semibold mt-1 block">
            ID: {userProfile?.employeeId || "EMP-2083-04"}
          </span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <span className="text-xs text-gray-500 font-medium block">Assigned Classes</span>
          <div className="font-display font-bold text-navy text-xl mt-1">
            4 Sections
          </div>
          <span className="text-[11px] text-gray-500 mt-1 block">
            Class 9A, 10B, 11-Sci, 12-Sci
          </span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <span className="text-xs text-gray-500 font-medium block">Total Students</span>
          <div className="font-display font-bold text-navy text-xl mt-1">168</div>
          <span className="text-[11px] text-green-600 font-semibold mt-1 block">Active Learners</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <span className="text-xs text-gray-500 font-medium block">Evaluation Status</span>
          <div className="font-display font-bold text-navy text-xl mt-1 text-gold">
            Term 2 Entered
          </div>
          <span className="text-[11px] text-gray-400 mt-1 block">100% Marks Submitted</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left: Class Gradebook Quick Actions (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm">
            <h3 className="font-display font-bold text-navy text-xl mb-4 flex items-center gap-2">
              <Award size={18} className="text-gold" /> Class Marks & Attendance Roster
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-gray-200 text-gray-400 uppercase font-bold">
                    <th className="py-2.5 px-3">Class</th>
                    <th className="py-2.5 px-3">Subject</th>
                    <th className="py-2.5 px-3 text-center">Enrolled</th>
                    <th className="py-2.5 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                  {[
                    { class: "Class 10 (English)", subject: "Compulsory Mathematics", count: 48, status: "Submitted" },
                    { class: "+2 Class 11 Science", subject: "Physics Practical & Theory", count: 42, status: "Submitted" },
                    { class: "+2 Class 12 Science", subject: "Advanced Physics", count: 38, status: "Submitted" },
                    { class: "Class 9 (English)", subject: "General Science", count: 40, status: "Pending" },
                  ].map((row, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="py-3 px-3 font-semibold text-navy">{row.class}</td>
                      <td className="py-3 px-3 text-gray-600">{row.subject}</td>
                      <td className="py-3 px-3 text-center">{row.count} students</td>
                      <td className="py-3 px-3 text-right">
                        <button className="px-3 py-1 rounded-lg bg-navy/5 text-navy hover:bg-gold hover:text-white transition-colors text-xs font-semibold cursor-pointer">
                          Edit Marks
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Notice Broadcast to Class */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm">
            <h3 className="font-display font-bold text-navy text-xl mb-2 flex items-center gap-2">
              <Send size={18} className="text-gold" /> Post Class Announcement
            </h3>
            <p className="text-gray-500 text-xs mb-4">
              Send an instant notification to your assigned sections.
            </p>

            {noticeSent && (
              <div className="mb-4 p-3 bg-green-50 text-green-800 rounded-xl text-xs flex items-center gap-2 border border-green-200">
                <CheckCircle2 size={16} className="text-green-600" />
                <span>Notice successfully broadcasted to student portals!</span>
              </div>
            )}

            <form onSubmit={handleBroadcast} className="space-y-3">
              <textarea
                rows={3}
                required
                placeholder="Type your notice (e.g. Please bring geometry boxes for tomorrow's construction class)..."
                value={noticeText}
                onChange={(e) => setNoticeText(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-xs sm:text-sm focus:bg-white focus:border-gold outline-none resize-none"
              />
              <button
                type="submit"
                className="px-6 py-2.5 rounded-full bg-navy text-white text-xs font-bold hover:bg-gold transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <Send size={13} /> Broadcast Announcement
              </button>
            </form>
          </div>
        </div>

        {/* Right: Teacher Calendar & Lesson Resources */}
        <div className="space-y-6">
          <div className="bg-navy rounded-3xl p-6 text-white shadow-xl">
            <h4 className="font-display font-bold text-lg mb-2 flex items-center gap-2">
              <Calendar size={18} className="text-gold-light" /> Academic Schedule
            </h4>
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="text-gold-light font-bold block">Bhadra 15, 2083</span>
                <span>Second Terminal Examinations begin</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="text-gold-light font-bold block">Ashwin 02, 2083</span>
                <span>Parent-Teacher conference & report card distribution</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── 3. Parent / Guardian Dashboard View ────────────────────
function ParentView({ userProfile }: { userProfile: any }) {
  return (
    <div className="space-y-8 animate-fade-up">
      {/* Ward Info Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gold/30 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-gold">
            Ward & Student Profile
          </span>
          <h2 className="font-display font-bold text-navy text-2xl mt-1">
            {userProfile?.wardName || "Rohan Sharma"}
          </h2>
          <p className="text-gray-500 text-xs">
            Student ID: <strong>{userProfile?.wardStudentId || "0481203A"}</strong> | Grade:{" "}
            <strong>Class 10 (English Medium)</strong>
          </p>
        </div>

        <div className="flex gap-3">
          <Link
            href="/contact"
            className="px-5 py-2.5 rounded-full bg-navy text-white text-xs font-bold hover:bg-gold transition-colors"
          >
            Message Class Teacher
          </Link>
        </div>
      </div>

      {/* Metrics Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <span className="text-xs text-gray-500 font-medium block">Current Terminal GPA</span>
          <div className="font-display font-bold text-navy text-2xl mt-1 text-gold">3.85</div>
          <span className="text-[11px] text-green-600 font-semibold mt-1 block">Distinction</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <span className="text-xs text-gray-500 font-medium block">School Attendance</span>
          <div className="font-display font-bold text-navy text-2xl mt-1">96.2%</div>
          <span className="text-[11px] text-gray-500 mt-1 block">Excellent Presence</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <span className="text-xs text-gray-500 font-medium block">Fee Dues Status</span>
          <div className="font-display font-bold text-green-700 text-2xl mt-1">Cleared</div>
          <span className="text-[11px] text-gray-400 mt-1 block">Up to Bhadra 2083</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <span className="text-xs text-gray-500 font-medium block">Next PTM Meeting</span>
          <div className="font-display font-bold text-navy text-lg mt-1">Ashwin 02</div>
          <span className="text-[11px] text-gold font-semibold mt-1 block">11:00 AM onwards</span>
        </div>
      </div>

      {/* Report & Fee Ledger */}
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm">
          <h3 className="font-display font-bold text-navy text-xl mb-4 flex items-center gap-2">
            <Award size={18} className="text-gold" /> Latest Examination Scores
          </h3>
          <div className="divide-y divide-gray-100 text-xs sm:text-sm">
            {[
              { subject: "Compulsory Mathematics", marks: "96 / 100", grade: "A+" },
              { subject: "Science & Technology", marks: "91 / 100", grade: "A+" },
              { subject: "Compulsory English", marks: "88 / 100", grade: "A" },
              { subject: "Compulsory Nepali", marks: "85 / 100", grade: "A" },
              { subject: "Computer Science", marks: "98 / 100", grade: "A+" },
            ].map((sub, idx) => (
              <div key={idx} className="py-3 flex items-center justify-between">
                <span className="font-medium text-navy">{sub.subject}</span>
                <div className="flex items-center gap-4">
                  <span className="text-gray-500">{sub.marks}</span>
                  <span className="font-bold text-gold">{sub.grade}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm">
          <h3 className="font-display font-bold text-navy text-xl mb-4 flex items-center gap-2">
            <CreditCard size={18} className="text-gold" /> Fee Receipts & Payment Ledger
          </h3>
          <div className="space-y-3">
            {[
              { receipt: "REC-2083-1102", title: "First Term Tuition & Lab Fee", date: "2083-04-10", amount: "Rs. 6,500", status: "Paid" },
              { receipt: "REC-2083-0544", title: "Annual Registration & Library Fee", date: "2083-01-15", amount: "Rs. 4,200", status: "Paid" },
            ].map((rec, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-navy">{rec.title}</div>
                  <div className="text-gray-400 text-[11px]">{rec.receipt} • {rec.date}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-navy">{rec.amount}</div>
                  <span className="text-[10px] text-green-700 font-bold bg-green-100 px-2 py-0.5 rounded">
                    {rec.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── 4. Administrator Dashboard View ────────────────────────
function AdminView({ userProfile }: { userProfile: any }) {
  return (
    <div className="space-y-8 animate-fade-up">
      {/* Admin KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((st) => (
          <div key={st.label} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <span className="text-xs text-gray-500 font-medium block">{st.label}</span>
            <div className="font-display font-bold text-navy text-2xl mt-1 text-gold">
              {st.value}
            </div>
            <span className="text-[11px] text-green-600 font-semibold mt-1 block">Verified Sourced</span>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm">
          <h3 className="font-display font-bold text-navy text-xl mb-4 flex items-center gap-2">
            <Shield size={18} className="text-gold" /> System & User Management
          </h3>
          <p className="text-gray-600 text-xs sm:text-sm mb-6">
            Manage user roles, verify admission inquiries, and inspect active Firebase Authentication sessions.
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200 text-xs">
              <div className="font-bold text-navy text-sm mb-1">Firebase Project ID</div>
              <div className="font-mono text-gold">janak-d6ef7</div>
              <span className="text-gray-400 block mt-2">Active Auth & Firestore instance</span>
            </div>

            <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200 text-xs">
              <div className="font-bold text-navy text-sm mb-1">Security Enforcement</div>
              <div className="text-green-700 font-bold">RBAC Strict Mode</div>
              <span className="text-gray-400 block mt-2">Protected routes & Firestore rules</span>
            </div>
          </div>
        </div>

        <div className="bg-navy rounded-3xl p-6 text-white shadow-xl">
          <h4 className="font-display font-bold text-lg mb-2 flex items-center gap-2">
            <Building size={18} className="text-gold-light" /> Quick Admin Tools
          </h4>
          <div className="space-y-2.5 mt-4">
            <Link
              href="/notices"
              className="block p-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-white transition-colors border border-white/5"
            >
              &rarr; Manage Notice Board
            </Link>
            <Link
              href="/events"
              className="block p-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-white transition-colors border border-white/5"
            >
              &rarr; Update Events Calendar
            </Link>
            <Link
              href="/contact"
              className="block p-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-white transition-colors border border-white/5"
            >
              &rarr; View Admission Inquiries
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
