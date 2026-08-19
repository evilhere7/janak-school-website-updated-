"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Camera, Maximize2, Sparkles, Filter } from "lucide-react";
import { GALLERY_ITEMS } from "@/lib/data/schoolData";
import Lightbox from "@/components/ui/Lightbox";
import { cn } from "@/lib/utils";

const CATEGORIES = ["All", "Campus", "Events", "Activities", "Sports", "Cultural"];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems = GALLERY_ITEMS.filter((item) =>
    selectedCategory === "All" ? true : item.category.toLowerCase() === selectedCategory.toLowerCase()
  );

  const lightboxItems = filteredItems.map((item) => ({
    src: item.image,
    title: item.title,
    category: item.category,
    caption: item.caption,
    date: item.date,
  }));

  return (
    <div className="min-h-screen bg-off-white selection:bg-gold selection:text-white">
      {/* Hero Header */}
      <section className="relative hero-gradient text-white py-24 sm:py-32 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-semibold uppercase tracking-wider text-gold-light mb-6">
            <Camera size={14} /> Visual Chronicle
          </div>
          <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight text-white mb-6">
            Photo Gallery Archive
          </h1>
          <p className="text-white/80 text-base sm:text-xl max-w-3xl mx-auto leading-relaxed">
            Capturing campus life, academic milestones, VVIP visits, cultural programs, and sports championships.
          </p>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="py-8 bg-white border-b border-gray-100 sticky top-20 z-30 shadow-sm backdrop-blur-md bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-center gap-2">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer",
                  isActive
                    ? "bg-navy text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                )}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </section>

      {/* Gallery Masonry Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setLightboxIndex(idx)}
              className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform">
                      <Maximize2 size={20} />
                    </span>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-navy/80 backdrop-blur-md text-gold-light text-[11px] font-bold uppercase tracking-wider">
                      {item.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-display font-bold text-navy text-lg group-hover:text-gold transition-colors mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-xs leading-relaxed">
                    {item.caption}
                  </p>
                </div>
              </div>

              {item.date && (
                <div className="px-6 pb-6 pt-0 text-[11px] text-gray-400 font-mono">
                  {item.date}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Fullscreen Lightbox Modal */}
      <Lightbox
        items={lightboxItems}
        selectedIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onSelectIndex={(idx) => setLightboxIndex(idx)}
      />
    </div>
  );
}
