"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { GALLERY_ITEMS } from "@/lib/data/schoolData";
import Lightbox from "@/components/ui/Lightbox";

export default function ActivitiesGalleryPage() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const items = GALLERY_ITEMS.filter((i) => i.category.toLowerCase() === "activities");

  return (
    <div className="min-h-screen bg-off-white selection:bg-gold selection:text-white">
      <section className="relative hero-gradient text-white py-20 sm:py-28 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-1.5 text-gold-light text-xs font-bold uppercase tracking-wider mb-6 hover:underline"
          >
            <ArrowLeft size={14} /> Back to All Galleries
          </Link>
          <h1 className="font-display font-black text-3xl sm:text-5xl tracking-tight text-white mb-4">
            Student Activities & Social Service
          </h1>
          <p className="text-white/80 text-base max-w-xl mx-auto">
            Youth Red Cross, scout activities, health drives, and student initiatives.
          </p>
        </div>
      </section>

      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setLightboxIndex(idx)}
              className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all cursor-pointer group"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="font-display font-bold text-navy text-lg mb-1">{item.title}</h3>
                <p className="text-gray-600 text-xs">{item.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Lightbox
        items={items.map((i) => ({ src: i.image, title: i.title, caption: i.caption, date: i.date }))}
        selectedIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onSelectIndex={(idx) => setLightboxIndex(idx)}
      />
    </div>
  );
}
