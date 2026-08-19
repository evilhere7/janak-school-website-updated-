import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Trophy, ArrowLeft, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { ACHIEVEMENTS_DATA } from "@/lib/data/schoolData";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return ACHIEVEMENTS_DATA.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const ach = ACHIEVEMENTS_DATA.find((a) => a.slug === slug);
  if (!ach) return { title: "Achievement Not Found | JHSS" };

  return {
    title: `${ach.title} | Achievements | JHSS`,
    description: ach.summary,
  };
}

export default async function AchievementDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const ach = ACHIEVEMENTS_DATA.find((a) => a.slug === slug);

  if (!ach) notFound();

  const others = ACHIEVEMENTS_DATA.filter((a) => a.slug !== slug).slice(0, 2);

  return (
    <div className="min-h-screen bg-off-white selection:bg-gold selection:text-white">
      {/* Hero */}
      <section className="relative hero-gradient text-white py-20 sm:py-28 overflow-hidden">
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link
            href="/achievements"
            className="inline-flex items-center gap-1.5 text-gold-light text-xs font-bold uppercase tracking-wider mb-6 hover:underline"
          >
            <ArrowLeft size={14} /> Back to All Achievements
          </Link>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-gold-light text-xs font-bold uppercase tracking-wider mb-4 mx-auto block w-fit">
            <Trophy size={14} /> {ach!.category}
          </div>
          <h1 className="font-display font-black text-2xl sm:text-4xl lg:text-5xl tracking-tight text-white mb-4 leading-tight">
            {ach!.title}
          </h1>
          <p className="text-white/80 text-base max-w-xl mx-auto">{ach!.summary}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-xl p-8 sm:p-12 space-y-8">
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-md">
            <Image
              src={ach!.image}
              alt={ach!.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 rounded-full bg-navy/80 text-gold-light text-[11px] font-bold uppercase tracking-wider backdrop-blur-md">
                {ach!.year}
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="font-display font-bold text-2xl text-navy">About This Achievement</h2>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">{ach!.details}</p>
          </div>

          <div className="pt-6 border-t border-gray-100 flex flex-wrap gap-4">
            <Link
              href="/achievements"
              className="px-6 py-3 rounded-full bg-navy text-white font-bold text-xs hover:bg-gold hover:text-navy transition-all shadow-md"
            >
              All Achievements
            </Link>
            <Link
              href="/gallery"
              className="px-6 py-3 rounded-full bg-white text-navy font-bold text-xs border border-gray-200 hover:bg-gray-50 transition-all"
            >
              View Photo Gallery
            </Link>
          </div>
        </div>

        {/* Other Achievements */}
        {others.length > 0 && (
          <div>
            <h3 className="font-display font-bold text-navy text-xl mb-6">More Achievements</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {others.map((o) => (
                <Link
                  key={o.slug}
                  href={`/achievements/${o.slug}`}
                  className="p-6 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all group"
                >
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gold block mb-1">
                    {o.category} · {o.year}
                  </span>
                  <h4 className="font-display font-bold text-navy text-base group-hover:text-gold transition-colors mb-2">
                    {o.title}
                  </h4>
                  <p className="text-gray-500 text-xs line-clamp-2">{o.summary}</p>
                  <div className="pt-4 mt-4 border-t border-gray-50 text-xs font-bold text-navy group-hover:text-gold flex items-center gap-1">
                    Read Story <ArrowRight size={12} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
