import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, Clock, MapPin, ArrowLeft, ArrowRight, Share2, Sparkles, CheckCircle2 } from "lucide-react";
import { EVENTS } from "@/lib/data/schoolData";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return EVENTS.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = EVENTS.find((e) => e.slug === slug);
  if (!event) return { title: "Event Not Found | JHSS" };

  return {
    title: `${event.title} | Shree Janak Secondary School`,
    description: event.description,
  };
}

export default async function EventDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const event = EVENTS.find((e) => e.slug === slug);

  if (!event) {
    notFound();
  }

  const otherEvents = EVENTS.filter((e) => e.slug !== slug).slice(0, 2);

  return (
    <div className="min-h-screen bg-off-white selection:bg-gold selection:text-white">
      {/* Hero Header */}
      <section className="relative hero-gradient text-white py-20 sm:py-28 overflow-hidden">
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link
            href="/events"
            className="inline-flex items-center gap-1.5 text-gold-light text-xs font-bold uppercase tracking-wider mb-6 hover:underline"
          >
            <ArrowLeft size={14} /> Back to Events Calendar
          </Link>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-gold-light text-xs font-bold uppercase tracking-wider mb-4 mx-auto block w-fit">
            <Calendar size={14} /> {event.category}
          </div>
          <h1 className="font-display font-black text-2xl sm:text-4xl lg:text-5xl tracking-tight text-white mb-6 leading-tight">
            {event.title}
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm text-white/80">
            <span className="flex items-center gap-1.5">
              <Calendar size={14} className="text-gold-light" /> {event.date}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} className="text-gold-light" /> {event.time}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <MapPin size={14} className="text-gold-light" /> {event.venue}
            </span>
          </div>
        </div>
      </section>

      {/* Main Content & Details */}
      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-xl p-8 sm:p-12 mb-16 space-y-8">
          <div className="relative aspect-video sm:aspect-[21/9] rounded-2xl overflow-hidden shadow-md">
            <Image
              src={event.image}
              alt={event.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="space-y-4">
            <h2 className="font-display font-bold text-2xl text-navy">About This Event</h2>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
              {event.description}
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
              All students, faculty members, alumni, and guardians are warmly invited to participate. For queries or participation registrations, please contact the school administrative office or the event coordinators.
            </p>
          </div>

          <div className="pt-6 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/contact"
              className="px-6 py-3 rounded-full bg-gold text-navy-dark font-bold text-xs hover:bg-gold-light transition-all shadow-md"
            >
              Contact Event Coordinators
            </Link>
            <Link
              href="/gallery"
              className="text-xs font-bold text-navy hover:text-gold transition-colors inline-flex items-center gap-1"
            >
              View Related Gallery Photos <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Other Events */}
        <div>
          <h3 className="font-display font-bold text-navy text-xl mb-6">Other Upcoming Events</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {otherEvents.map((evt) => (
              <Link
                key={evt.slug}
                href={`/events/${evt.slug}`}
                className="p-6 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all group flex flex-col justify-between"
              >
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gold block mb-1">
                    {evt.date} · {evt.category}
                  </span>
                  <h4 className="font-display font-bold text-navy text-base group-hover:text-gold transition-colors mb-2">
                    {evt.title}
                  </h4>
                  <p className="text-gray-500 text-xs line-clamp-2">{evt.description}</p>
                </div>
                <div className="pt-4 mt-4 border-t border-gray-50 text-xs font-bold text-navy group-hover:text-gold flex items-center gap-1">
                  Read Details <ArrowRight size={12} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
