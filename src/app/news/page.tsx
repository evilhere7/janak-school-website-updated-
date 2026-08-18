"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Newspaper,
  Calendar,
  Clock,
  ArrowRight,
  Search,
  Tag,
  Share2,
  ChevronRight,
} from "lucide-react";
import { NEWS_ITEMS } from "@/lib/data/schoolData";

// Enhanced news collection with full real articles
const EXTENDED_NEWS = [
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
      "In an effort to cultivate lifelong literacy habits from an early age, Shree Janak Secondary School in partnership with international organization Room to Read has upgraded its library resources. The updated library includes supplementary storybooks, audio-visual reading corners, and digital literacy tools.",
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
      "As part of JHSS's continuous efforts to prepare students for the modern digital era, the Department of Computer Science organized a specialized workshop focusing on digital literacy, practical programming basics, and cyber hygiene.",
    image: "/assets/facilities/WhatsApp-Image-2024-05-16-at-4.35.18-PM-1_7.jpeg",
  },
];

const CATEGORIES = ["All", "School Event", "VVIP Visit", "Social Service", "Academic Innovation", "STEM & Innovation"];

export default function NewsPage() {
  const [selectedCat, setSelectedCat] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredNews = EXTENDED_NEWS.filter((item) => {
    const matchesCat = selectedCat === "All" || item.category === selectedCat;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const featuredNews = EXTENDED_NEWS[0];
  const regularNews = filteredNews.filter((item) => item.id !== (selectedCat === "All" && searchQuery === "" ? featuredNews.id : ""));

  return (
    <div className="min-h-screen bg-off-white">
      {/* Hero Banner */}
      <section className="relative hero-gradient py-20 lg:py-28 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-gold-lighter text-xs font-semibold uppercase tracking-widest mb-4">
            <Newspaper size={14} /> School Gazette & Updates
          </span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            News & <span className="text-gradient-gold">Campus Highlights</span>
          </h1>
          <p className="text-white/80 text-lg max-w-3xl mx-auto leading-relaxed">
            Read inspiring stories, institutional achievements, student activities, and special events happening
            at Shree Janak Secondary School.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-6">
          {/* Controls Bar */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-12 flex flex-col md:flex-row gap-4 justify-between items-center">
            {/* Search input */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search articles and stories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:bg-white focus:border-gold outline-none transition-all text-gray-800"
              />
            </div>

            {/* Categories */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCat(cat)}
                  className={`text-xs px-4 py-2 rounded-xl font-bold whitespace-nowrap transition-all ${
                    selectedCat === cat
                      ? "bg-navy text-white shadow-sm"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Featured Article (When no filter applied) */}
          {selectedCat === "All" && searchQuery === "" && (
            <div className="mb-16">
              <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-xl grid lg:grid-cols-12 gap-0 group">
                <div className="lg:col-span-7 relative min-h-[350px] lg:min-h-[460px] overflow-hidden">
                  <Image
                    src={featuredNews.image}
                    alt={featuredNews.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    priority
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-gold text-white text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-gold">
                      Featured Story
                    </span>
                  </div>
                </div>

                <div className="lg:col-span-5 p-8 lg:p-12 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 text-xs text-gray-400 mb-4">
                      <span className="text-gold font-bold uppercase tracking-wider">
                        {featuredNews.category}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Calendar size={12} /> {featuredNews.date}
                      </span>
                    </div>

                    <h2 className="font-display text-2xl sm:text-3xl font-bold text-navy leading-tight mb-4 group-hover:text-gold transition-colors">
                      <Link href={`/news/${featuredNews.slug}`}>{featuredNews.title}</Link>
                    </h2>

                    <p className="text-gray-600 text-sm leading-relaxed mb-6">
                      {featuredNews.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <Link
                      href={`/news/${featuredNews.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-bold text-navy hover:text-gold transition-colors"
                    >
                      Read Full Article <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Regular News Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularNews.map((article) => (
              <article
                key={article.id}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                {/* Thumbnail */}
                <div className="relative aspect-[16/10] bg-gray-100 overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-navy/80 backdrop-blur-md text-gold-light">
                    {article.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                      <Calendar size={12} />
                      <span>{article.date}</span>
                    </div>

                    <h3 className="font-display font-bold text-navy text-lg sm:text-xl leading-snug mb-3 group-hover:text-gold transition-colors">
                      <Link href={`/news/${article.slug}`}>{article.title}</Link>
                    </h3>

                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed line-clamp-3 mb-6">
                      {article.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <Link
                      href={`/news/${article.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-navy hover:text-gold transition-colors"
                    >
                      Read Story <ChevronRight size={14} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredNews.length === 0 && (
            <div className="text-center py-20 bg-white rounded-3xl border border-gray-100">
              <Newspaper className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <h3 className="font-bold text-navy text-lg">No news articles found</h3>
              <p className="text-gray-500 text-sm mt-1">Try another search term or filter category.</p>
              <button
                onClick={() => {
                  setSelectedCat("All");
                  setSearchQuery("");
                }}
                className="mt-4 text-xs font-semibold text-gold hover:underline"
              >
                Show all news
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
