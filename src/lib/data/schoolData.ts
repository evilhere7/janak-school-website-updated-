// ────────────────────────────────────────────────────
// JHSS 2.0 — Verified School Data Store
// All information sourced from jhss.edu.np (August 2026)
// ────────────────────────────────────────────────────

export const SCHOOL_INFO = {
  name: "Shree Janak Secondary School",
  shortName: "JHSS",
  nepaliName: "श्री जनक माध्यमिक विद्यालय",
  establishedBS: "2015 B.S.",
  establishedAD: "~1958 A.D.",
  location: "Gaindakot-5, Nawalparasi, Lumbini Zone, Nepal",
  tagline: "Learning Today. Leading Tomorrow.",
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
      "It's my pleasure to notify all the individual concerned authorities and well-wishers about this educational institution. This school came into existence in the year 2015 B.S. with the greatest effort made by innumerable personalities and social workers. The main motto of this school is to provide quality education to the learners, to enhance the learning capacity, to make a sound and healthy environment, and to quench the educational thirst of the learners. We have achieved 100% results in SLC/SEE examinations from English medium classes.",
  },
  founder: {
    name: "Late Surya Bhakta Adhikari",
    role: "Ex-Member of Parliament & Founder Patron",
    legacy: "Pioneer instrumental in establishing JHSS in 2015 B.S.",
  },
  campusBlocks: [
    { name: "Model School Congress Chowk", desc: "Main administrative and secondary wing." },
    { name: "+2 Aadarsha Block", desc: "Higher Secondary: Science, Management & Humanities." },
    { name: "Jhapardi Primary Block", desc: "Primary & foundation learning wing." },
    { name: "Saraswati Block", desc: "Digital library, computer & science labs." },
  ],
  achievements: [
    "100% SEE pass rate from English Medium classes",
    "Room to Read partnership for library development",
    "Presidential visit and institutional recognition",
    "50+ glorious years of service to Nawalparasi community",
    "~1,500 learners across Play Group to Class 12",
  ],
  socials: {
    facebook: "#",
    youtube: "#",
  },
};

export const NOTICES = [
  {
    id: "not-01",
    title: "कक्षा ११ मा भर्नाका लागी सोधपुछ खुल्ला सम्बन्धी सूचना",
    category: "ADMISSION" as const,
    isImportant: true,
    date: "2026-08-10",
    description:
      "शैक्षिक सत्र २०८३ का लागि कक्षा ११ मा विज्ञान, व्यवस्थापन र मानविकी सङ्कायमा नयाँ भर्नाका लागि आवेदन फारम वितरण शुरू भएको छ।",
    pdfUrl: "/assets/news/admission-inquary_27.jpg",
  },
  {
    id: "not-02",
    title: "काेटेशन अाह्वान गरीएकाे सम्बन्धी सूचना",
    category: "TENDER" as const,
    isImportant: true,
    date: "2026-08-05",
    description:
      "विद्यालयको कम्प्युटर ल्याब तथा भौतिक पूर्वाधार मर्मत सम्भारका लागि ईच्छुक फर्महरूलाई सिलबन्दी कोटेशन पेश गर्न आह्वान गरिन्छ।",
  },
  {
    id: "not-03",
    title: "Second Term Examination Schedule Announcement",
    category: "EXAM" as const,
    isImportant: false,
    date: "2026-07-28",
    description:
      "Notice regarding the upcoming second terminal examinations for Class 1 to Class 12 starting from Bhadra 15, 2083 B.S.",
  },
  {
    id: "not-04",
    title: "Parent-Teacher Conference & Progress Report Distribution",
    category: "GENERAL" as const,
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
      "Shree Janak Secondary School organized a momentous Golden Jubilee ceremony celebrating over five decades of contribution to public education in Nawalparasi. Hundreds of alumni, community leaders, and dignitaries gathered to celebrate the school's legacy...",
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
      "During a landmark event at JHSS Gaindakot, Dr. Ram Baran Yadav praised the school management committee, teaching staff, and parent community for maintaining exceptional academic results and community engagement...",
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
      "Demonstrating civic leadership, the Youth Red Cross Circle of Shree Janak Secondary School organized a successful community health awareness and blood donation drive on campus...",
    image: "/assets/gallery/blood-donation_29.jpg",
  },
];

export const FACILITIES = [
  {
    id: "fac-1",
    title: "Room to Read Library",
    category: "Learning Resources",
    icon: "BookOpen",
    description:
      "An extensive and inclusive library supported by Room to Read with a wide collection of textbooks, storybooks, periodicals, and e-learning resources.",
    details: [
      "5,000+ reference books and storybooks",
      "Quiet reading zones for all age groups",
      "Nepal's leading educational periodicals",
      "Regular reading competitions and storytelling sessions",
    ],
    image: "/assets/facilities/janak-library_6.jpg",
  },
  {
    id: "fac-2",
    title: "Modern Science Laboratories",
    category: "STEM & Innovation",
    icon: "FlaskConical",
    description:
      "Fully equipped Physics, Chemistry, and Biology laboratories enabling hands-on practical experiments for SEE and +2 Science students.",
    details: [
      "High-precision microscopes and chemical apparatus",
      "Dedicated safety protocols and fume hoods",
      "Interactive physics demonstration models",
      "Qualified lab instructors for guided sessions",
    ],
    image: "/assets/facilities/0f30e333-d660-44a7-9407-b07fa71dc4ef_10.jpeg",
  },
  {
    id: "fac-3",
    title: "ICT & Computer Lab",
    category: "Technology",
    icon: "Monitor",
    description:
      "State-of-the-art computer center with broadband internet, empowering digital literacy from basic computing to modern programming.",
    details: [
      "40+ high-performance desktop computers",
      "High-speed fiber internet connectivity",
      "Interactive smart boards for multimedia lectures",
      "Structured ICT curriculum for classes 4 to 12",
    ],
    image: "/assets/facilities/WhatsApp-Image-2024-05-16-at-4.35.18-PM-1_7.jpeg",
  },
  {
    id: "fac-4",
    title: "Sports & Educational Excursions",
    category: "Extracurricular",
    icon: "Trophy",
    description:
      "Spacious grounds for volleyball, football, and athletics, alongside annual educational field trips to Nepal's historical and ecological sites.",
    details: [
      "Full-sized sports grounds for inter-house tournaments",
      "Annual industrial and botanical study tours",
      "Active Scout and Youth Red Cross Circle",
      "Cultural & Drama participation programs",
    ],
    image: "/assets/news/WhatsApp-Image-2024-06-28-at-4.06.58-PM-1_8.jpeg",
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
  },
  {
    id: "fac-mem-2",
    name: "Mrs. Saraswati Sharma",
    role: "Vice Principal / Science Dept. Head",
    department: "Science Stream (+2)",
    qualification: "M.Sc. Chemistry, B.Ed.",
    image: "/assets/news/370247302_1832533693862136_5922644568413843616_n_4.jpg",
    email: "science@jhss.edu.np",
  },
  {
    id: "fac-mem-3",
    name: "Mr. Ramesh Adhikari",
    role: "Senior ICT Lecturer",
    department: "Computer Science & ICT",
    qualification: "M.Sc. CSIT, B.Ed.",
    image: "/assets/news/380053908_225067130629786_1209794644896087085_n-2_5.jpg",
    email: "ict@jhss.edu.np",
  },
  {
    id: "fac-mem-4",
    name: "Mr. Dipak Poudel",
    role: "Senior Mathematics Teacher",
    department: "School Level / SEE",
    qualification: "M.Ed. Mathematics",
    image: "/assets/campus/janakmap_11.jpg",
    email: "math@jhss.edu.np",
  },
];

export const GALLERY_ITEMS = [
  {
    id: "gal-1",
    title: "Golden Jubilee Ceremony",
    category: "Golden Jubilee",
    image: "/assets/gallery/golden-jubilee_30.jpg",
    caption: "School Management Committee celebrating 50+ years of excellence.",
    date: "2024-01-20",
  },
  {
    id: "gal-2",
    title: "Presidential Honours",
    category: "VVIP Visit",
    image: "/assets/gallery/president_31.jpg",
    caption: "Recognizing outstanding academic achievers alongside Former President.",
    date: "2024-01-14",
  },
  {
    id: "gal-3",
    title: "Dr. Ram Baran Yadav Visit",
    category: "VVIP Visit",
    image: "/assets/gallery/rambaranyadab_32.jpg",
    caption: "Former President interacting with teachers and student council.",
    date: "2024-01-14",
  },
  {
    id: "gal-4",
    title: "Red Cross Blood Donation",
    category: "Social Service",
    image: "/assets/gallery/blood-donation_29.jpg",
    caption: "Teachers and community members participating in health drive.",
    date: "2024-09-02",
  },
  {
    id: "gal-5",
    title: "Cultural Folk Dance",
    category: "Cultural Programs",
    image: "/assets/gallery/cultural-program2_34.jpg",
    caption: "Students performing traditional Nepalese dance on Parents Day.",
    date: "2024-05-12",
  },
  {
    id: "gal-6",
    title: "Annual Cultural Festival",
    category: "Cultural Programs",
    image: "/assets/gallery/cultural-program3_35.jpg",
    caption: "Vibrant cultural program showcasing Nepal's rich heritage.",
    date: "2024-05-12",
  },
];

export const CURRICULUM = [
  {
    level: "Early Childhood (Play Group – Nursery)",
    grades: "Play Group, Nursery, KG",
    subjects: ["English", "Nepali", "Mathematics", "Drawing & Arts", "Moral & Health Education"],
    stream: null,
  },
  {
    level: "Primary Level",
    grades: "Class 1 – 5",
    subjects: ["My English", "My Mathematics", "My Nepali", "Hamro Serophero", "Science & Health", "ICT"],
    stream: null,
    guideLinks: [
      { label: "Teacher's Guide – My English Grade 1", url: "https://moecdc.gov.np/storage/gallery/1672217211.pdf" },
      { label: "मेरो गणित कक्षा १ निर्देशिका", url: "http://202.45.146.138/elibrary/pages/view.php?ref=3823" },
    ],
  },
  {
    level: "Lower Secondary & Secondary",
    grades: "Class 6 – 10 (SEE)",
    subjects: ["Compulsory Mathematics", "Science & Technology", "English", "Nepali", "Social Studies", "Optional Mathematics / ICT"],
    stream: null,
  },
  {
    level: "Higher Secondary (+2)",
    grades: "Class 11 – 12",
    subjects: [],
    stream: "Multiple",
    streams: [
      { name: "Science", subjects: ["Physics", "Chemistry", "Biology / Mathematics", "Computer Science", "English"] },
      { name: "Management", subjects: ["Accountancy", "Economics", "Business Studies / Hotel Mgmt", "English"] },
      { name: "Humanities", subjects: ["Nepali", "English", "Social Studies", "Population & Environment"] },
    ],
  },
];

export const STATS = [
  { label: "Students Enrolled", value: "1,500+", icon: "Users" },
  { label: "Teaching Staff", value: "60+", icon: "GraduationCap" },
  { label: "Years of Excellence", value: "65+", icon: "Star" },
  { label: "SEE Pass Rate", value: "100%", icon: "Award" },
];
