import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Calendar,
  Clock,
  ArrowLeft,
  Share2,
  Tag,
  BookOpen,
  ChevronRight,
} from "lucide-react";
import { NEWS_ITEMS, SCHOOL_INFO } from "@/lib/data/schoolData";

const ALL_ARTICLES = [
  ...NEWS_ITEMS,
  {
    id: "news-4",
    slug: "room-to-read-digital-library-expansion",
    title: "JHSS Expands Digital Repository in Partnership with Room to Read",
    category: "Academic Innovation",
    date: "2024-05-18",
    excerpt:
      "New reading workstations and digital storytelling modules introduced in Saraswati Block library to enhance reading habits among junior school learners.",
    content:
      "In an effort to cultivate lifelong literacy habits from an early age, Shree Janak Secondary School in partnership with international organization Room to Read has upgraded its library resources. The updated library includes supplementary storybooks, audio-visual reading corners, and digital literacy tools.\n\nSchool Principal Mr. Buddhi Prasad Kandel noted that fostering independent reading skills early enables students to perform significantly better in secondary board examinations and higher education studies. Teachers have reported an enthusiastic response from junior school pupils who now enjoy scheduled weekly library discovery hours.",
    image: "/assets/facilities/janak-library_6.jpg",
  },
  {
    id: "news-5",
    slug: "ict-coding-workshop-for-secondary-students",
    title: "Special Workshop on Web Technology & Coding Conducted for Class 9 & 10",
    category: "STEM & Innovation",
    date: "2024-06-12",
    excerpt:
      "Senior computer science faculty and invited software mentors conducted a hands-on introductory coding and internet safety boot camp.",
    content:
      "As part of JHSS's continuous efforts to prepare students for the modern digital era, the Department of Computer Science organized a specialized workshop focusing on digital literacy, practical programming basics, and cyber hygiene.\n\nOver 80 students from Class 9 and Class 10 attended the interactive laboratory sessions in the Saraswati Block ICT lab. They learned basic algorithmic thinking, HTML/CSS structure, and safe online collaboration practices. The school management reiterated its plan to introduce AI literacy and applied robotics workshops in the upcoming term.",
    image: "/assets/facilities/WhatsApp-Image-2024-05-16-at-4.35.18-PM-1_7.jpeg",
  },
];

export async function generateStaticParams() {
  return ALL_ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = ALL_ARTICLES.find((a) => a.slug === slug);
  if (!article) return { title: "Article Not Found" };

  return {
    title: `${article.title} | JHSS News`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [{ url: article.image }],
    },
  };
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = ALL_ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = ALL_ARTICLES.filter((a) => a.slug !== slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-off-white">
      {/* Top Breadcrumb Header */}
      <div className="bg-navy py-12 text-white border-b border-white/10">
        <div className="max-w-4xl mx-auto px-6">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-xs font-semibold text-gold-light hover:text-white transition-colors mb-6"
          >
            <ArrowLeft size={14} /> Back to All News
          </Link>

          <div className="flex items-center gap-3 text-xs text-white/60 mb-3">
            <span className="bg-gold/20 text-gold-light px-3 py-1 rounded-full font-bold uppercase tracking-wider">
              {article.category}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar size={12} /> {article.date}
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
            {article.title}
          </h1>
        </div>
      </div>

      {/* Main Article Body */}
      <section className="py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-6">
          {/* Featured Image */}
          <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden shadow-2xl mb-12 border border-gray-200">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Article Content */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-gray-100">
            {/* Excerpt Lead */}
            <p className="text-lg sm:text-xl font-medium text-navy leading-relaxed mb-8 border-l-4 border-gold pl-6 italic">
              {article.excerpt}
            </p>

            {/* Paragraphs */}
            <div className="text-gray-700 leading-relaxed space-y-6 text-base sm:text-lg">
              {article.content.split("\n\n").map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>

            {/* Author / Publisher Footnote */}
            <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="text-xs text-gray-500">
                <span className="block font-bold text-navy">Published by:</span>
                JHSS Media & Communications Cell | Shree Janak Secondary School
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-gray-500">Share article:</span>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=https://jhss.edu.np/news/${article.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-gray-100 hover:bg-gold hover:text-white transition-colors text-gray-600"
                  aria-label="Share on Facebook"
                >
                  <Share2 size={16} />
                </a>
              </div>
            </div>
          </div>

          {/* Related Articles */}
          <div className="mt-16">
            <h3 className="font-display font-bold text-2xl text-navy mb-8">
              More News & Highlights
            </h3>

            <div className="grid sm:grid-cols-3 gap-6">
              {relatedArticles.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/news/${rel.slug}`}
                  className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all group flex flex-col"
                >
                  <div className="relative aspect-[16/10] bg-gray-100">
                    <Image
                      src={rel.image}
                      alt={rel.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <h4 className="font-bold text-navy text-sm leading-snug group-hover:text-gold transition-colors line-clamp-2 mb-2">
                      {rel.title}
                    </h4>
                    <span className="text-[11px] text-gray-400 flex items-center gap-1">
                      <Calendar size={10} /> {rel.date}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
