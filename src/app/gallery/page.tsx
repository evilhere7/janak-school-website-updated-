"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Sparkles,
  Filter,
  X,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Tag,
  Maximize2,
  Camera,
} from "lucide-react";
import { GALLERY_ITEMS } from "@/lib/data/schoolData";

// Enhanced gallery list using all available real images
const EXTENDED_GALLERY = [
  ...GALLERY_ITEMS,
  {
    id: "gal-7",
    title: "Class 4 Practical Study Session",
    category: "Campus & Labs",
    image: "/assets/campus/class-4_14.png",
    caption: "Young learners engaged in interactive group activities and workbook assignments.",
    date: "2024-06-15",
  },
  {
    id: "gal-8",
    title: "Class 5 Interactive Learning",
    category: "Campus & Labs",
    image: "/assets/campus/class-5_26.png",
    caption: "Primary students participating in audio-visual multimedia presentations.",
    date: "2024-06-20",
  },
  {
    id: "gal-9",
    title: "ICT & Coding Laboratory Session",
    category: "Campus & Labs",
    image: "/assets/facilities/WhatsApp-Image-2024-05-16-at-4.35.18-PM-1_7.jpeg",
    caption: "Senior students working on computer science practicals in the ICT room.",
    date: "2024-05-16",
  },
  {
    id: "gal-10",
    title: "Science Practical Demonstration",
    category: "Campus & Labs",
    image: "/assets/facilities/0f30e333-d660-44a7-9407-b07fa71dc4ef_10.jpeg",
    caption: "Secondary students conducting hands-on chemistry and physics experiments.",
    date: "2024-04-10",
  },
  {
    id: "gal-11",
    title: "Room to Read Dedicated Library",
    category: "Campus & Labs",
    image: "/assets/facilities/janak-library_6.jpg",
    caption: "Students browsing through the 5,000+ book repository in Saraswati Block.",
    date: "2024-03-05",
  },
  {
    id: "gal-12",
    title: "Annual Sports & Outdoor Training",
    category: "Sports & ECA",
    image: "/assets/news/WhatsApp-Image-2024-06-28-at-4.06.58-PM-1_8.jpeg",
    caption: "Students participating in track events and field exercises on the athletic ground.",
    date: "2024-06-28",
  },
];

const CATEGORIES = [
  "All",
  "Golden Jubilee",
  "VVIP Visit",
  "Cultural Programs",
  "Social Service",
  "Campus & Labs",
  "Sports & ECA",
];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const filteredItems = EXTENDED_GALLERY.filter(
    (item) => selectedCategory === "All" || item.category === selectedCategory
  );

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeLightboxIndex === null) return;
      if (e.key === "Escape") setActiveLightboxIndex(null);
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeLightboxIndex, filteredItems.length]);

  const handlePrev = () => {
    if (activeLightboxIndex === null) return;
    setActiveLightboxIndex((prev) =>
      prev! > 0 ? prev! - 1 : filteredItems.length - 1
    );
  };

  const handleNext = () => {
    if (activeLightboxIndex === null) return;
    setActiveLightboxIndex((prev) =>
      prev! < filteredItems.length - 1 ? prev! + 1 : 0
    );
  };

  return (
    <div className="min-h-screen bg-off-white">
      {/* Hero Section */}
      <section className="relative hero-gradient py-20 lg:py-28 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-gold-lighter text-xs font-semibold uppercase tracking-widest mb-4">
            <Camera size={14} /> Memories & Moments
          </span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Life at <span className="text-gradient-gold">JHSS Gaindakot</span>
          </h1>
          <p className="text-white/80 text-lg max-w-3xl mx-auto leading-relaxed">
            A visual retrospective of our historical milestones, cultural celebrations, presidential visits,
            sports tournaments, and everyday campus joy.
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-6">
          {/* Categories Filter Tabs */}
          <div className="flex items-center justify-center gap-2 flex-wrap mb-12">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-navy text-white shadow-md scale-105"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                onClick={() => setActiveLightboxIndex(index)}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col"
              >
                {/* Image Wrap */}
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-navy-dark/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white ring-2 ring-white/50">
                      <Maximize2 size={20} />
                    </div>
                  </div>
                  <span className="absolute top-4 left-4 text-[11px] font-bold tracking-wider uppercase px-3 py-1 rounded-full bg-navy/80 backdrop-blur-md text-gold-light border border-white/10">
                    {item.category}
                  </span>
                </div>

                {/* Caption Card */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display font-bold text-navy text-lg group-hover:text-gold transition-colors mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-xs leading-relaxed line-clamp-2">
                      {item.caption}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} /> {item.date}
                    </span>
                    <span className="text-navy font-semibold group-hover:underline">View Photo &rarr;</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-20 bg-white rounded-3xl border border-gray-100">
              <Camera className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <h3 className="font-bold text-navy text-lg">No photos in this category</h3>
              <button
                onClick={() => setSelectedCategory("All")}
                className="mt-4 text-xs font-semibold text-gold hover:underline"
              >
                Show all photos
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {activeLightboxIndex !== null && filteredItems[activeLightboxIndex] && (
        <div
          className="fixed inset-0 z-50 bg-navy-dark/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setActiveLightboxIndex(null)}
        >
          {/* Close button */}
          <button
            onClick={() => setActiveLightboxIndex(null)}
            className="absolute top-6 right-6 z-50 p-2.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Close lightbox"
          >
            <X size={24} />
          </button>

          {/* Prev Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 text-white hover:bg-gold transition-colors"
            aria-label="Previous photo"
          >
            <ChevronLeft size={28} />
          </button>

          {/* Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 text-white hover:bg-gold transition-colors"
            aria-label="Next photo"
          >
            <ChevronRight size={28} />
          </button>

          {/* Content container */}
          <div
            className="relative max-w-5xl w-full max-h-[90vh] bg-navy rounded-3xl overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-[55vh] sm:h-[65vh] bg-black">
              <Image
                src={filteredItems[activeLightboxIndex].image}
                alt={filteredItems[activeLightboxIndex].title}
                fill
                className="object-contain"
                priority
              />
            </div>

            <div className="p-6 bg-navy-dark text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-white/10">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/20 text-gold-light text-xs font-bold uppercase tracking-wider mb-2">
                  <Tag size={12} /> {filteredItems[activeLightboxIndex].category}
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-bold">
                  {filteredItems[activeLightboxIndex].title}
                </h3>
                <p className="text-white/70 text-xs sm:text-sm mt-1 max-w-2xl">
                  {filteredItems[activeLightboxIndex].caption}
                </p>
              </div>

              <div className="text-xs text-white/50 flex-shrink-0">
                <span>{filteredItems[activeLightboxIndex].date}</span>
                <span className="block mt-1">
                  Photo {activeLightboxIndex + 1} of {filteredItems.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
