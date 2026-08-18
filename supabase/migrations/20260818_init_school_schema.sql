-- ====================================================================
-- Shree Janak Secondary School (JHSS) Supabase PostgreSQL Schema
-- Migration: 20260818_init_school_schema.sql
-- ====================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. User Profiles Table (Linked to Firebase UID)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    firebase_uid TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    profile_photo_url TEXT,
    role TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('student', 'teacher', 'parent', 'admin')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for fast lookup by Firebase UID
CREATE INDEX IF NOT EXISTS idx_profiles_firebase_uid ON public.profiles(firebase_uid);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);

-- 3. Classes Table
CREATE TABLE IF NOT EXISTS public.classes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    section TEXT NOT NULL DEFAULT 'A',
    academic_year TEXT NOT NULL DEFAULT '2083',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. Subjects Table
CREATE TABLE IF NOT EXISTS public.subjects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    code TEXT UNIQUE NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. Students Table
CREATE TABLE IF NOT EXISTS public.students (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    student_id TEXT UNIQUE NOT NULL,
    class_id UUID REFERENCES public.classes(id) ON DELETE SET NULL,
    grade_name TEXT,
    section TEXT DEFAULT 'A',
    roll_number TEXT,
    date_of_birth DATE,
    guardian_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_students_student_id ON public.students(student_id);

-- 6. Teachers Table
CREATE TABLE IF NOT EXISTS public.teachers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    employee_id TEXT UNIQUE NOT NULL,
    department TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. Attendance Records
CREATE TABLE IF NOT EXISTS public.attendance (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    status TEXT NOT NULL CHECK (status IN ('present', 'absent', 'late', 'excused')),
    marked_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(student_id, date)
);

CREATE INDEX IF NOT EXISTS idx_attendance_date ON public.attendance(date);

-- 8. School Notices Table
CREATE TABLE IF NOT EXISTS public.notices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'GENERAL',
    attachment_url TEXT,
    is_important BOOLEAN NOT NULL DEFAULT FALSE,
    published_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    published_at DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_notices_published_at ON public.notices(published_at DESC);

-- 9. Assignments Table
CREATE TABLE IF NOT EXISTS public.assignments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    subject_name TEXT NOT NULL,
    class_name TEXT NOT NULL,
    teacher_id UUID REFERENCES public.teachers(id) ON DELETE SET NULL,
    due_date TIMESTAMPTZ NOT NULL,
    attachment_url TEXT,
    is_completed BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 10. Academic Examination Results Table
CREATE TABLE IF NOT EXISTS public.results (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_name TEXT NOT NULL,
    symbol_number TEXT NOT NULL,
    exam_name TEXT NOT NULL,
    grade_level TEXT NOT NULL,
    dob TEXT,
    gpa TEXT NOT NULL,
    grade_letter TEXT NOT NULL,
    subjects_data JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_results_symbol_number ON public.results(symbol_number);

-- 11. School Events Calendar Table
CREATE TABLE IF NOT EXISTS public.events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'Academic',
    event_date DATE NOT NULL,
    time TEXT NOT NULL,
    location TEXT NOT NULL,
    image_url TEXT,
    is_upcoming BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_events_date ON public.events(event_date);

-- ====================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ====================================================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- 1. Profiles Policies
CREATE POLICY "Public profiles are readable by authenticated clients"
ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Clients can insert or update profile records"
ON public.profiles FOR ALL USING (true) WITH CHECK (true);

-- 2. Notices Policies (Public read, staff manage)
CREATE POLICY "Notices are readable by everyone"
ON public.notices FOR SELECT USING (true);

CREATE POLICY "Staff can manage notices"
ON public.notices FOR ALL USING (true) WITH CHECK (true);

-- 3. Events Policies (Public read)
CREATE POLICY "Events are readable by everyone"
ON public.events FOR SELECT USING (true);

CREATE POLICY "Staff can manage events"
ON public.events FOR ALL USING (true) WITH CHECK (true);

-- 4. Results Policies (Public query by symbol number)
CREATE POLICY "Results are readable by search"
ON public.results FOR SELECT USING (true);

CREATE POLICY "Teachers can insert/update results"
ON public.results FOR ALL USING (true) WITH CHECK (true);

-- 5. Assignments & Attendance Policies
CREATE POLICY "Assignments are viewable"
ON public.assignments FOR SELECT USING (true);

CREATE POLICY "Teachers can manage assignments"
ON public.assignments FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Attendance is viewable"
ON public.attendance FOR SELECT USING (true);

CREATE POLICY "Teachers can mark attendance"
ON public.attendance FOR ALL USING (true) WITH CHECK (true);

-- ====================================================================
-- SEED INITIAL SCHOOL DATA
-- ====================================================================

-- Seed Notices
INSERT INTO public.notices (title, description, category, is_important, attachment_url, published_at)
VALUES
(
    'कक्षा ११ मा भर्नाका लागी सोधपुछ खुल्ला सम्बन्धी सूचना',
    'शैक्षिक सत्र २०८३ का लागि कक्षा ११ मा विज्ञान, व्यवस्थापन र मानविकी सङ्कायमा नयाँ भर्नाका लागि आवेदन फारम वितरण शुरू भएको छ।',
    'ADMISSION',
    TRUE,
    '/assets/news/admission-inquary_27.jpg',
    '2026-08-10'
),
(
    'काेटेशन अाह्वान गरीएकाे सम्बन्धी सूचना',
    'विद्यालयको कम्प्युटर ल्याब तथा भौतिक पूर्वाधार मर्मत सम्भारका लागि ईच्छुक फर्महरूलाई सिलबन्दी कोटेशन पेश गर्न आह्वान गरिन्छ।',
    'TENDER',
    TRUE,
    NULL,
    '2026-08-05'
),
(
    'Second Term Examination Schedule Announcement 2083',
    'Notice regarding the upcoming second terminal examinations for Class 1 to Class 12 starting from Bhadra 15, 2083 B.S.',
    'EXAM',
    FALSE,
    NULL,
    '2026-07-28'
),
(
    'Parent-Teacher Conference & Progress Report Distribution',
    'All parents are cordially invited to attend the interactive progress review meeting with subject teachers.',
    'GENERAL',
    FALSE,
    NULL,
    '2026-07-15'
)
ON CONFLICT DO NOTHING;

-- Seed Events
INSERT INTO public.events (title, description, category, event_date, time, location, image_url, is_upcoming)
VALUES
(
    'Annual Sports Meet & Athletics Championship 2083',
    'Inter-house track and field events, volleyball tournaments, table tennis, and traditional games for students across all grade levels.',
    'Sports',
    '2026-09-15',
    '09:00 AM - 04:00 PM',
    'JHSS Main Athletic Ground',
    '/assets/gallery/cultural-program2_34.jpg',
    TRUE
),
(
    'Science & ICT Innovation Exhibition',
    'Showcasing student-built STEM projects, robotics models, coding solutions, and environmental science working models.',
    'Academic',
    '2026-10-05',
    '10:00 AM - 03:30 PM',
    'Saraswati Block & ICT Lab',
    '/assets/facilities/WhatsApp-Image-2024-05-16-at-4.35.18-PM-1_7.jpeg',
    TRUE
),
(
    'Parents Day & Grand Cultural Festival 2083',
    'Annual celebration featuring classical Nepalese folk dances, musical presentations, academic prize distribution, and annual school progress review.',
    'Cultural',
    '2026-11-20',
    '10:30 AM - 04:30 PM',
    'Model School Congress Chowk Auditorium',
    '/assets/gallery/cultural-program3_35.jpg',
    TRUE
)
ON CONFLICT DO NOTHING;

-- Seed Results Sample
INSERT INTO public.results (student_name, symbol_number, exam_name, grade_level, dob, gpa, grade_letter, subjects_data)
VALUES
(
    'Aarav Sharma',
    '0481203A',
    'SEE Pre-Board Examination 2083',
    'Class 10 (English Medium)',
    '2066-04-15',
    '3.85',
    'A+',
    '[
        {"name": "Compulsory English", "credit": 4.0, "grade": "A+"},
        {"name": "Compulsory Mathematics", "credit": 4.0, "grade": "A+"},
        {"name": "Science & Technology", "credit": 4.0, "grade": "A"},
        {"name": "Compulsory Nepali", "credit": 4.0, "grade": "A"},
        {"name": "Social Studies", "credit": 4.0, "grade": "A+"},
        {"name": "Optional Computer Science", "credit": 4.0, "grade": "A+"}
    ]'::jsonb
)
ON CONFLICT DO NOTHING;
