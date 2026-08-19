"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export interface LightboxItem {
  src: string;
  title: string;
  category?: string;
  caption?: string;
  date?: string;
}

interface LightboxProps {
  items: LightboxItem[];
  selectedIndex: number | null;
  onClose: () => void;
  onSelectIndex: (index: number) => void;
}

export default function Lightbox({
  items,
  selectedIndex,
  onClose,
  onSelectIndex,
}: LightboxProps) {
  const isOpen = selectedIndex !== null && selectedIndex >= 0 && selectedIndex < items.length;
  const currentItem = isOpen ? items[selectedIndex] : null;

  const handlePrev = useCallback(() => {
    if (selectedIndex === null) return;
    onSelectIndex((selectedIndex - 1 + items.length) % items.length);
  }, [selectedIndex, items.length, onSelectIndex]);

  const handleNext = useCallback(() => {
    if (selectedIndex === null) return;
    onSelectIndex((selectedIndex + 1) % items.length);
  }, [selectedIndex, items.length, onSelectIndex]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose, handlePrev, handleNext]);

  if (!isOpen || !currentItem) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Image Lightbox Viewer"
      className="fixed inset-0 z-50 flex items-center justify-center bg-navy-dark/95 backdrop-blur-xl animate-fade-in"
      onClick={onClose}
    >
      {/* Top Controls */}
      <div
        className="absolute top-6 left-6 right-6 flex items-center justify-between z-50 pointer-events-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full bg-white/10 text-gold-light text-xs font-bold uppercase tracking-wider backdrop-blur-md">
            {currentItem.category || "Gallery"}
          </span>
          <span className="text-white/60 text-xs font-mono">
            {selectedIndex + 1} of {items.length}
          </span>
        </div>

        <button
          onClick={onClose}
          aria-label="Close Lightbox (Esc)"
          className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
        >
          <X size={20} />
        </button>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handlePrev();
        }}
        aria-label="Previous image (Left arrow)"
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-gold hover:text-navy-dark text-white flex items-center justify-center transition-all z-50 cursor-pointer shadow-lg backdrop-blur-md"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          handleNext();
        }}
        aria-label="Next image (Right arrow)"
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-gold hover:text-navy-dark text-white flex items-center justify-center transition-all z-50 cursor-pointer shadow-lg backdrop-blur-md"
      >
        <ChevronRight size={24} />
      </button>

      {/* Main Image Stage */}
      <div
        className="relative max-w-5xl max-h-[82vh] w-full mx-4 sm:mx-16 flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full h-[60vh] sm:h-[70vh] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10">
          <Image
            src={currentItem.src}
            alt={currentItem.title}
            fill
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-contain"
            priority
          />
        </div>

        {/* Caption & Metadata */}
        <div className="mt-4 text-center max-w-2xl px-4">
          <h2 className="text-white font-bold text-lg sm:text-xl">{currentItem.title}</h2>
          {currentItem.caption && (
            <p className="text-white/70 text-xs sm:text-sm mt-1 leading-relaxed">
              {currentItem.caption}
            </p>
          )}
          {currentItem.date && (
            <p className="text-white/40 text-xs mt-1 font-mono">{currentItem.date}</p>
          )}
        </div>
      </div>
    </div>
  );
}
