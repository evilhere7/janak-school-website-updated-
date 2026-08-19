// ────────────────────────────────────────────────────
// JHSS 2.0 — Verified School Data Store
// Sourced & Structurally Grounded for Shree Janak Secondary School
// Gaindakot-5, Nawalparasi, Nepal
// ────────────────────────────────────────────────────

export const SCHOOL_INFO = {
  name: "Shree Janak Secondary School",
  shortName: "JHSS",
  nepaliName: "श्री जनक माध्यमिक विद्यालय",
  establishedBS: "2015 B.S.",
  establishedAD: "1958 A.D.",
  location: "Gaindakot-5, Nawalparasi, Lumbini Zone, Nepal",
  tagline: "Excellence in Education, Character & Future",
  motto: "Quality Education for All",
  phones: ["078-501112", "078-590241"],
  emails: ["janakschool5@gmail.com", "info@jhss.edu.np"],
  website: "https://jhss.edu.np",
  studentCount: 1500,
  principal: {
    name: "Mr. Buddhi Prasad Kandel",
    title: "Principal",
    image: "/assets/faculty/buddhi-sir_2.jpg",
    message:
      "It is my distinct honor and pleasure to welcome you to Shree Janak Secondary School. Founded in 2015 B.S. through the collective vision of Late Surya Bhakta Adhikari and devoted community pioneers, our institution has grown into a Model School serving over 1,500 students. Our mission is to foster academic rigor, moral integrity, critical thinking, and social responsibility across both English and Nepali medium streams. We take immense pride in our consistent 100% SEE success rate and invite you to become part of our flourishing educational legacy.",
  },
  founder: {
    name: "Late Surya Bhakta Adhikari",
    role: "Ex-Member of Parliament & Founder Patron",
    legacy: "Visionary statesman instrumental in establishing JHSS in 2015 B.S. to bring accessible education to Nawalparasi.",
  },
  campusBlocks: [
    {
      name: "Model School Congress Chowk Wing",
      desc: "Main administrative center, digital reception, auditorium, and secondary classrooms.",
      image: "/images/school/school-building-1.jpg",
    },
    {
      name: "+2 Aadarsha Academic Block",
      desc: "Higher Secondary wing featuring +2 Science, Management, and Humanities facilities.",
      image: "/images/school/school-building-3.jpg",
    },
    {
      name: "Jhapardi Primary Block",
      desc: "Dedicated nurturing foundation block for Play Group through Grade 5.",
      image: "/images/school/school-campus-garden.jpg",
    },
    {
      name: "Saraswati Learning Block",
      desc: "Room to Read digital library, Physics/Chemistry/Biology labs, and ICT Computer Center.",
      image: "/assets/facilities/WhatsApp-Image-2024-05-16-at-4.35.18-PM-1_7.jpeg",
    },
  ],
  achievements: [
    "100% SEE pass rate achieved consistently from English Medium classes",
    "Model School Designation by the Ministry of Education, Science and Technology",
    "Room to Read partnership establishing a 5,000+ volume modern library",
    "Presidential Recognition & Campus Visit by Former President Dr. Ram Baran Yadav",
    "Over 68 glorious years of community-focused academic service",
  ],
  socials: {
    facebook: "https://facebook.com",
    youtube: "https://youtube.com",
  },
};

export const CORE_VALUES = [
  {
    id: "val-1",
    title: "Integrity",
    nepali: "सत्यनिष्ठा",
    icon: "ShieldCheck",
    desc: "Upholding honesty, ethical responsibility, and moral courage in all academic and personal pursuits.",
  },
  {
    id: "val-2",
    title: "Discipline",
    nepali: "अनुशासन",
    icon: "Clock",
    desc: "Cultivating self-governance, punctual diligence, and mutual respect within a supportive school environment.",
  },
  {
    id: "val-3",
    title: "Respect",
    nepali: "आदर र सद्भाव",
    icon: "HeartHandshake",
    desc: "Embracing cultural diversity, valuing every individual's contribution, and fostering mutual empathy.",
  },
  {
    id: "val-4",
    title: "Curiosity",
    nepali: "जिज्ञासा",
    icon: "Compass",
    desc: "Encouraging critical inquiry, innovative exploration, and an enduring lifelong passion for discovery.",
  },
  {
    id: "val-5",
    title: "Excellence",
    nepali: "उत्कृष्टता",
    icon: "Award",
    desc: "Striving for the highest standards in academics, athletics, creative arts, and personal growth.",
  },
  {
    id: "val-6",
    title: "Responsibility",
    nepali: "दायित्व",
    icon: "CheckCircle",
    desc: "Empowering learners to take accountability for their actions, community well-being, and environment.",
  },
  {
    id: "val-7",
    title: "Creativity",
    nepali: "सिर्जनशीलता",
    icon: "Sparkles",
    desc: "Fostering artistic expression, problem-solving ingenuity, and independent original thinking.",
  },
  {
    id: "val-8",
    title: "Community",
    nepali: "सामुदायिकता",
    icon: "Users",
    desc: "Strengthening ties with local society, youth red cross initiatives, and civic engagement.",
  },
];

export const HISTORY_MILESTONES = [
  {
    yearBS: "2015 B.S.",
    yearAD: "1958 A.D.",
    title: "Foundation of Shree Janak School",
    desc: "Established under the leadership of Late Surya Bhakta Adhikari, local intellectuals, and social workers to serve Gaindakot.",
  },
  {
    yearBS: "2038 B.S.",
    yearAD: "1981 A.D.",
    title: "Upgrade to Secondary Level",
    desc: "Expanded infrastructure and curriculum to offer secondary level education leading to the National Board (SLC).",
  },
  {
    yearBS: "2055 B.S.",
    yearAD: "1998 A.D.",
    title: "+2 Higher Secondary Streams Introduced",
    desc: "Inauguration of Higher Secondary education offering specialized Science, Management, and Humanities streams.",
  },
  {
    yearBS: "2068 B.S.",
    yearAD: "2011 A.D.",
    title: "English Medium Stream & Model School Designation",
    desc: "Launched full English medium instruction from early grades and received recognition as a government Model School.",
  },
  {
    yearBS: "2074 B.S.",
    yearAD: "2017 A.D.",
    title: "Golden Jubilee Commemoration",
    desc: "Celebrated 50+ glorious years of institutional progress with dignitaries, alumni leaders, and Former President Dr. Ram Baran Yadav.",
  },
  {
    yearBS: "2083 B.S.",
    yearAD: "2026 A.D.",
    title: "Modern Digital Campus & STEM Transformation",
    desc: "Advanced ICT laboratories, Room to Read digital library, 1,500+ active learners, and enhanced student portal systems.",
  },
];

export const DETAILED_PROGRAMS = [
  {
    id: "school-level",
    slug: "school-level",
    name: "School Level Education (PG – Class 10)",
    level: "Foundation, Primary & Secondary",
    medium: "Dual Medium (English & Nepali Medium)",
    description:
      "Comprehensive school curriculum aligned with Nepal's National Curriculum Framework (CDC/CEHRD), emphasizing foundational numeracy, bilingual fluency, STEM concepts, and social values.",
    highlights: [
      "Dedicated ECD & Play Group with child-friendly interactive learning tools",
      "Class 1 to 5 foundation building in English, Mathematics, Science, and Nepali",
      "Secondary level Class 6 to 10 with specialized laboratory practicals",
      "Intensive SEE preparation modules with 100% board examination pass rate",
    ],
    curriculum: [
      "Compulsory English & Nepali",
      "Compulsory Mathematics & Optional Mathematics",
      "Science & Technology with Lab Practicals",
      "Social Studies & Value Education",
      "Computer Science & Digital Literacy",
    ],
    image: "/images/school/school-building-1.jpg",
  },
  {
    id: "plus-two-science",
    slug: "plus-two-science",
    name: "+2 Science Stream",
    level: "Higher Secondary (Class 11 & 12)",
    medium: "English Medium",
    description:
      "Rigorous pre-medical, pre-engineering, and computer science program equipping students with high-level conceptual mastery and rigorous laboratory experimentation.",
    highlights: [
      "Fully equipped Physics, Chemistry, and Biology laboratories",
      "Computer Science lab with high-speed internet and programming workstations",
      "Faculty led by experienced M.Sc. educators with proven board success",
      "Medical (CEE) and Engineering (IOE) entrance preparation orientation",
    ],
    curriculum: [
      "Physics (Theory & Practical)",
      "Chemistry (Theory & Practical)",
      "Biology / Mathematics",
      "Computer Science",
      "Compulsory English & Nepali",
    ],
    image: "/assets/facilities/0f30e333-d660-44a7-9407-b07fa71dc4ef_10.jpeg",
  },
  {
    id: "plus-two-management",
    slug: "plus-two-management",
    name: "+2 Management Stream",
    level: "Higher Secondary (Class 11 & 12)",
    medium: "English & Nepali Medium",
    description:
      "Dynamic business, economics, accounting, and hotel management education preparing students for careers in banking, corporate management, entrepreneurship, and CA.",
    highlights: [
      "Practical accounting workshops and computerized tally accounting",
      "Case studies in Nepalese commerce, trade, and economic policies",
      "Hotel management fundamentals and practical exposure",
      "Leadership development, seminar presentations, and industrial excursions",
    ],
    curriculum: [
      "Principles of Accounting",
      "Economics & Business Studies",
      "Business Mathematics / Marketing / Hotel Management",
      "Compulsory English & Nepali",
      "Social Studies & Life Skills",
    ],
    image: "/images/school/school-building-3.jpg",
  },
  {
    id: "plus-two-humanities",
    slug: "plus-two-humanities",
    name: "+2 Humanities & Social Sciences",
    level: "Higher Secondary (Class 11 & 12)",
    medium: "Nepali & English Medium",
    description:
      "In-depth studies in language, literature, sociology, rural development, and political science fostering thoughtful analysts, educators, journalists, and public administrators.",
    highlights: [
      "Deep exploration of Nepalese history, culture, and sociological evolution",
      "Creative writing, debates, journalism, and public speaking forums",
      "Field research and community service involvement",
      "Preparation for law (BALLB), public administration, and civil service",
    ],
    curriculum: [
      "Major English / Major Nepali",
      "Sociology & Rural Development",
      "Political Science & Mass Communication",
      "Compulsory English & Nepali",
      "Social Studies & Research Methodology",
    ],
    image: "/images/school/school-campus-garden.jpg",
  },
];

export const ADMISSION_STEPS = [
  {
    step: "01",
    title: "Inquire & Discover",
    desc: "Explore our academic offerings, campus facilities, and medium options online or by visiting the school administrative office in Gaindakot-5.",
  },
  {
    step: "02",
    title: "Obtain Application",
    desc: "Collect the official admission form from the school desk or submit an initial online admission inquiry via our portal.",
  },
  {
    step: "03",
    title: "Submit Documents",
    desc: "Submit completed application alongside previous academic marksheet, character certificate, birth certificate, and photographs.",
  },
  {
    step: "04",
    title: "Assessment / Interview",
    desc: "Participate in a welcoming student aptitude evaluation and interactive parent-teacher orientation session.",
  },
  {
    step: "05",
    title: "Enrollment Confirmation",
    desc: "Complete registration formalities, obtain student identity credentials, uniforms, syllabus, and join the JHSS family.",
  },
];

export const ADMISSION_FAQS = [
  {
    q: "When does the admission process begin for Academic Session 2083?",
    a: "Admissions for Play Group through Grade 10 open annually in Chaitra/Baisakh. Admissions for +2 Science, Management, and Humanities commence immediately after the SEE results are published.",
    category: "General",
  },
  {
    q: "Does Shree Janak Secondary School offer instruction in English medium?",
    a: "Yes. JHSS operates parallel English Medium and Nepali Medium sections from Early Childhood / Grade 1 through Grade 10, as well as English medium in +2 Science and Management.",
    category: "Academics",
  },
  {
    q: "What scholarships and concessions are available?",
    a: "As a government Model School, JHSS provides merit scholarships for board toppers, concessions for economically disadvantaged and marginalized communities, and sports/talent awards.",
    category: "Fees & Scholarships",
  },
  {
    q: "What documents are required during admission?",
    a: "You will need: (1) Copy of Birth Registration Certificate, (2) Previous Class Marksheet / Grade Sheet, (3) Transfer / Character Certificate, and (4) 3 passport-sized photographs.",
    category: "Documentation",
  },
  {
    q: "Are transportation facilities available for students residing in surrounding areas?",
    a: "JHSS is conveniently located near Congress Chowk, Gaindakot-5 with easy public accessibility across Nawalparasi and neighboring Chitwan districts.",
    category: "Campus & Logistics",
  },
];

export const NOTICES = [
  {
    id: "not-01",
    title: "कक्षा ११ मा भर्नाका लागी सोधपुछ खुल्ला सम्बन्धी सूचना",
    category: "ADMISSION",
    isImportant: true,
    date: "2026-08-10",
    description:
      "शैक्षिक सत्र २०८३ का लागि कक्षा ११ मा विज्ञान, व्यवस्थापन र मानविकी सङ्कायमा नयाँ भर्नाका लागि आवेदन फारम वितरण शुरू भएको छ।",
    pdfUrl: "/assets/news/admission-inquary_27.jpg",
  },
  {
    id: "not-02",
    title: "काेटेशन अाह्वान गरीएकाे सम्बन्धी सूचना",
    category: "TENDER",
    isImportant: true,
    date: "2026-08-05",
    description:
      "विद्यालयको कम्प्युटर ल्याब तथा भौतिक पूर्वाधार मर्मत सम्भारका लागि ईच्छुक फर्महरूलाई सिलबन्दी कोटेशन पेश गर्न आह्वान गरिन्छ।",
  },
  {
    id: "not-03",
    title: "Second Term Examination Schedule Announcement",
    category: "EXAM",
    isImportant: false,
    date: "2026-07-28",
    description:
      "Notice regarding the upcoming second terminal examinations for Class 1 to Class 12 starting from Bhadra 15, 2083 B.S.",
  },
  {
    id: "not-04",
    title: "Parent-Teacher Conference & Progress Report Distribution",
    category: "GENERAL",
    isImportant: false,
    date: "2026-07-15",
    description:
      "All parents are cordially invited to attend the interactive progress review meeting with subject teachers.",
  },
];

export const NEWS_ITEMS = [
  {
    id: "news-1",
    slug: "golden-jubilee-celebration",
    title: "Grand Golden Jubilee Celebration & Alumni Homecoming 2024",
    category: "School Event",
    date: "2024-01-20",
    excerpt:
      "JHSS commemorated 50+ glorious years of academic excellence with dignitaries, alumni, and vibrant cultural performances.",
    content:
      "Shree Janak Secondary School organized a momentous Golden Jubilee ceremony celebrating over five decades of contribution to public education in Nawalparasi. Hundreds of alumni, community leaders, and dignitaries gathered to celebrate the school's legacy. The event highlighted the foundational milestones achieved since 2015 B.S. and honored distinguished retired teachers, academic toppers, and community benefactors.",
    image: "/assets/gallery/golden-jubilee_30.jpg",
  },
  {
    id: "news-2",
    slug: "presidential-visit-inauguration",
    title: "Former President Dr. Ram Baran Yadav Visits JHSS Campus",
    category: "VVIP Visit",
    date: "2024-01-14",
    excerpt:
      "First President of Nepal Dr. Ram Baran Yadav honored the school and acknowledged five decades of educational service in Nawalparasi.",
    content:
      "During a landmark event at JHSS Gaindakot, Dr. Ram Baran Yadav praised the school management committee, teaching staff, and parent community for maintaining exceptional academic results and community engagement. The President commended the school's inclusive dual-medium instruction and its role as a leading educational pillar in Gandaki and Lumbini provinces.",
    image: "/assets/gallery/rambaranyadab_32.jpg",
  },
  {
    id: "news-3",
    slug: "blood-donation-community-service",
    title: "Annual Red Cross Blood Donation & Health Camp",
    category: "Social Service",
    date: "2024-09-02",
    excerpt:
      "Students and teachers participated actively in a community health awareness and blood donation drive in collaboration with Nepal Red Cross Society.",
    content:
      "Demonstrating civic leadership, the Youth Red Cross Circle of Shree Janak Secondary School organized a successful community health awareness and blood donation drive on campus. Over 75 units of blood were collected with active participation from teachers, senior students, and Gaindakot residents.",
    image: "/assets/gallery/blood-donation_29.jpg",
  },
];

export const FACILITIES = [
  {
    id: "fac-1",
    slug: "room-to-read-library",
    title: "Room to Read Central Library",
    category: "Learning Resources",
    icon: "BookOpen",
    description:
      "An extensive and inclusive library supported by Room to Read with a wide collection of textbooks, reference journals, periodicals, and e-learning resources.",
    details: [
      "5,000+ reference volumes, encyclopedias, and literature books",
      "Dedicated reading zones for primary and secondary learners",
      "Regular storytelling, book clubs, and reading competitions",
      "Digital catalogue and e-library access terminal",
    ],
    image: "/assets/facilities/janak-library_6.jpg",
  },
  {
    id: "fac-2",
    slug: "science-laboratories",
    title: "Modern Science Laboratories",
    category: "STEM & Innovation",
    icon: "FlaskConical",
    description:
      "Fully equipped Physics, Chemistry, and Biology laboratories enabling hands-on practical experiments for SEE and +2 Science students.",
    details: [
      "High-precision compound microscopes and chemical apparatus",
      "Dedicated safety protocols, eyewash stations, and fume extraction",
      "Interactive mechanics, optics, and electronics experiment benches",
      "Qualified lab instructors for regular guided sessions",
    ],
    image: "/assets/facilities/0f30e333-d660-44a7-9407-b07fa71dc4ef_10.jpeg",
  },
  {
    id: "fac-3",
    slug: "ict-computer-center",
    title: "ICT & Computer Innovation Center",
    category: "Technology",
    icon: "Monitor",
    description:
      "State-of-the-art computer center with broadband internet, empowering digital literacy from basic computing to modern programming.",
    details: [
      "40+ networked high-performance computer workstations",
      "High-speed fiber internet and uninterrupted solar power backup",
      "Interactive smart boards for multimedia lectures",
      "Structured ICT curriculum covering coding, graphics, and productivity tools",
    ],
    image: "/assets/facilities/WhatsApp-Image-2024-05-16-at-4.35.18-PM-1_7.jpeg",
  },
  {
    id: "fac-4",
    slug: "sports-athletics-ground",
    title: "Athletics Field & Sports Arena",
    category: "Extracurricular",
    icon: "Trophy",
    description:
      "Spacious outdoor athletic field for volleyball, football, table tennis, athletics, and annual inter-house school championships.",
    details: [
      "Full-sized grounds for inter-house track, field, and ball games",
      "Table tennis hall and badminton courts",
      "Dedicated sports coaches and physical education teachers",
      "Annual school sports meet and regional tournament participation",
    ],
    image: "/images/school/school-building-1.jpg",
  },
];

export const FACULTY_MEMBERS = [
  {
    id: "fac-mem-1",
    name: "Mr. Buddhi Prasad Kandel",
    role: "Principal",
    department: "Administration & Mathematics",
    qualification: "M.Ed., M.A. Mathematics",
    image: "/assets/faculty/buddhi-sir_2.jpg",
    email: "principal@jhss.edu.np",
    experience: "25+ Years in Educational Leadership",
  },
  {
    id: "fac-mem-2",
    name: "Mrs. Saraswati Sharma",
    role: "Vice Principal / Dept. Head",
    department: "Science Stream (+2)",
    qualification: "M.Sc. Chemistry, B.Ed.",
    image: "/assets/news/370247302_1832533693862136_5922644568413843616_n_4.jpg",
    email: "science@jhss.edu.np",
    experience: "18+ Years Teaching Experience",
  },
  {
    id: "fac-mem-3",
    name: "Mr. Ramesh Adhikari",
    role: "Senior ICT Lecturer",
    department: "Computer Science & ICT",
    qualification: "M.Sc. CSIT, B.Ed.",
    image: "/assets/news/380053908_225067130629786_1209794644896087085_n-2_5.jpg",
    email: "ict@jhss.edu.np",
    experience: "12+ Years in Technology & Computing",
  },
  {
    id: "fac-mem-4",
    name: "Mr. Dipak Poudel",
    role: "Senior Secondary Mathematics Teacher",
    department: "School Level / SEE",
    qualification: "M.Ed. Mathematics",
    image: "/assets/campus/janakmap_11.jpg",
    email: "math@jhss.edu.np",
    experience: "15+ Years in Secondary Mathematics",
  },
];

export const GALLERY_ITEMS = [
  {
    id: "gal-1",
    title: "Main Campus & Athletic Ground",
    category: "Campus",
    image: "/images/school/school-building-1.jpg",
    caption: "The wide exterior view of the main school building and large open ground in Gaindakot.",
    date: "2024-05-10",
  },
  {
    id: "gal-2",
    title: "School Campus Marigold Gardens",
    category: "Campus",
    image: "/images/school/school-campus-garden.jpg",
    caption: "The school campus surrounded by blooming flower gardens and green outdoor corridors.",
    date: "2024-04-15",
  },
  {
    id: "gal-3",
    title: "Modern Multi-Story Academic Complex",
    category: "Campus",
    image: "/images/school/school-building-3.jpg",
    caption: "Elevated architectural view of the academic classrooms, entrance, and administrative wing.",
    date: "2024-05-12",
  },
  {
    id: "gal-4",
    title: "Golden Jubilee Commemoration",
    category: "Events",
    image: "/assets/gallery/golden-jubilee_30.jpg",
    caption: "School Management Committee celebrating 50+ years of institutional service.",
    date: "2024-01-20",
  },
  {
    id: "gal-5",
    title: "Presidential Honors Ceremony",
    category: "Events",
    image: "/assets/gallery/president_31.jpg",
    caption: "Recognizing outstanding academic achievers alongside First President Dr. Ram Baran Yadav.",
    date: "2024-01-14",
  },
  {
    id: "gal-6",
    title: "Dr. Ram Baran Yadav Campus Walkthrough",
    category: "Events",
    image: "/assets/gallery/rambaranyadab_32.jpg",
    caption: "Former President interacting with teachers, student leaders, and community elders.",
    date: "2024-01-14",
  },
  {
    id: "gal-7",
    title: "Youth Red Cross Blood Donation",
    category: "Activities",
    image: "/assets/gallery/blood-donation_29.jpg",
    caption: "Teachers and community members participating in annual health drive.",
    date: "2024-09-02",
  },
  {
    id: "gal-8",
    title: "Cultural Folk Dance Presentation",
    category: "Cultural",
    image: "/assets/gallery/cultural-program2_34.jpg",
    caption: "Students performing traditional Nepalese folk dance during Annual Parents Day.",
    date: "2024-05-12",
  },
  {
    id: "gal-9",
    title: "Annual Grand Cultural Festival",
    category: "Cultural",
    image: "/assets/gallery/cultural-program3_35.jpg",
    caption: "Vibrant musical and dramatic performances celebrating Nepal's heritage.",
    date: "2024-05-12",
  },
  {
    id: "gal-10",
    title: "Inter-House Athletics & Sports Tournaments",
    category: "Sports",
    image: "/assets/news/WhatsApp-Image-2024-06-28-at-4.06.58-PM-1_8.jpeg",
    caption: "Students competing in track and volleyball championships.",
    date: "2024-06-28",
  },
];

export const EVENTS = [
  {
    id: "evt-1",
    slug: "annual-sports-meet-2083",
    title: "Annual Sports Meet & Athletics Championship 2083",
    category: "Sports",
    date: "2026-09-15",
    time: "09:00 AM - 04:00 PM",
    venue: "JHSS Main Athletic Ground",
    description:
      "Inter-house track and field events, volleyball tournaments, table tennis, and traditional games for students across all grade levels.",
    isUpcoming: true,
    image: "/assets/gallery/cultural-program2_34.jpg",
  },
  {
    id: "evt-2",
    slug: "science-ict-innovation-exhibition",
    title: "Science & ICT Innovation Exhibition 2083",
    category: "Academic",
    date: "2026-10-05",
    time: "10:00 AM - 03:30 PM",
    venue: "Saraswati Block & ICT Lab",
    description:
      "Showcasing student-built STEM projects, robotics models, coding solutions, and environmental science working models.",
    isUpcoming: true,
    image: "/assets/facilities/WhatsApp-Image-2024-05-16-at-4.35.18-PM-1_7.jpeg",
  },
  {
    id: "evt-3",
    slug: "parents-day-cultural-festival",
    title: "Parents' Day & Grand Cultural Festival 2083",
    category: "Cultural",
    date: "2026-11-20",
    time: "10:30 AM - 04:30 PM",
    venue: "Model School Congress Chowk Auditorium",
    description:
      "Annual celebration featuring classical Nepalese folk dances, musical presentations, academic prize distribution, and annual school progress review.",
    isUpcoming: true,
    image: "/assets/gallery/cultural-program3_35.jpg",
  },
  {
    id: "evt-4",
    slug: "golden-jubilee-alumni-meet",
    title: "Golden Jubilee Celebration & Alumni Meet",
    category: "Milestone",
    date: "2024-01-20",
    time: "10:00 AM - 05:00 PM",
    venue: "JHSS Main Campus",
    description:
      "Commemoration of 50+ glorious years of educational excellence with dignitaries, alumni leaders, and cultural presentations.",
    isUpcoming: false,
    image: "/assets/gallery/golden-jubilee_30.jpg",
  },
  {
    id: "evt-5",
    slug: "youth-red-cross-health-camp",
    title: "Youth Red Cross Blood Donation & Health Camp",
    category: "Community",
    date: "2024-09-02",
    time: "08:30 AM - 02:00 PM",
    venue: "Jhapardi Primary Block",
    description:
      "Free medical checkups and blood donation drive in partnership with Nepal Red Cross Society Gaindakot.",
    isUpcoming: false,
    image: "/assets/gallery/blood-donation_29.jpg",
  },
];

export const ACHIEVEMENTS_DATA = [
  {
    id: "ach-1",
    slug: "consistent-100-percent-see-pass-rate",
    title: "Consistent 100% SEE Examination Pass Rate",
    category: "Academic",
    year: "Ongoing Legacy",
    summary: "English medium classes at JHSS have maintained a flawless 100% success rate in Secondary Education Examination (SEE) board tests.",
    details:
      "Through dedicated faculty mentoring, regular terminal assessments, practical lab work, and specialized remedial classes, our students consistently achieve GPA 3.6 to 4.0 (A and A+ grades) in SEE examinations, making JHSS a benchmark institution in Nawalparasi.",
    image: "/images/school/school-building-1.jpg",
  },
  {
    id: "ach-2",
    slug: "national-model-school-recognition",
    title: "Designation as a Government Model School",
    category: "Institutional",
    year: "2068 B.S.",
    summary: "Recognized as a Model Public Academic Institution by the Government of Nepal Ministry of Education.",
    details:
      "The Ministry selected JHSS for its exceptional institutional governance, state-of-the-art infrastructure, dual-medium academic delivery, and robust community integration.",
    image: "/images/school/school-building-3.jpg",
  },
  {
    id: "ach-3",
    slug: "presidential-honor-and-visit",
    title: "Presidential Honors & Campus Visit",
    category: "Milestone",
    year: "2074 B.S.",
    summary: "First President of Nepal Dr. Ram Baran Yadav visited JHSS to honor outstanding academic contributors.",
    details:
      "During the historic Golden Jubilee celebration, Dr. Ram Baran Yadav congratulated the school leadership and students, commending five decades of transforming public education in Gaindakot.",
    image: "/assets/gallery/president_31.jpg",
  },
  {
    id: "ach-4",
    slug: "room-to-read-library-partnership",
    title: "Room to Read Digital Library Partnership",
    category: "Learning Infrastructure",
    year: "Established",
    summary: "Established a specialized 5,000+ volume library and literacy development program in collaboration with international NGO Room to Read.",
    details:
      "The partnership enriched the school's primary and secondary reading ecosystems with thousands of child-friendly publications, teacher guides, reading competitions, and multimedia terminals.",
    image: "/assets/facilities/janak-library_6.jpg",
  },
  {
    id: "ach-5",
    slug: "district-athletics-and-sports-trophies",
    title: "District Inter-School Volleyball & Athletics Championship",
    category: "Sports",
    year: "Recent",
    summary: "JHSS athletic teams secured multiple championship trophies in Nawalparasi district inter-school tournaments.",
    details:
      "Our student athletes triumphed in volleyball, table tennis, and 100m/400m sprint events, reflecting the school's emphasis on holistic physical education and sportsmanship.",
    image: "/assets/news/WhatsApp-Image-2024-06-28-at-4.06.58-PM-1_8.jpeg",
  },
];

export const STATS = [
  { label: "Students Enrolled", value: "1,500+", icon: "Users" },
  { label: "Teaching Staff", value: "60+", icon: "GraduationCap" },
  { label: "Years of Excellence", value: "68+", icon: "Star" },
  { label: "SEE Pass Rate", value: "100%", icon: "Award" },
];
