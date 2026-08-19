import type { Metadata } from "next";
import Link from "next/link";
import { Sparkles, ArrowLeft, ArrowRight, Lightbulb, Compass, Globe, GraduationCap } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Vision | Shree Janak Secondary School",
  description:
    "Discover the future vision and strategic aspirations of Shree Janak Secondary School, Gaindakot-5, Nawalparasi.",
};

const VISION_GOALS = [
  {
    title: "Excellence in Digital & STEM Literacy",
    desc: "Integrating coding, robotics, hands-on scientific research, and smart multimedia learning tools from primary to +2 levels.",
    icon: Lightbulb,
  },
  {
    title: "Empowering Independent Thinkers",
    desc: "Cultivating analytical minds capable of reasoned debate, empathetic leadership, and innovative problem solving.",
    icon: Compass,
  },
  {
    title: "Global Standards, Local Grounding",
    desc: "Preparing our graduates to excel in national board exams, university admissions, and international opportunities while remaining rooted in community service.",
    icon: Globe,
  },
];

export default function VisionPage() {
  return (
    <div className="min-h-screen bg-off-white selection:bg-gold selection:text-white">
      {/* Hero Header */}
      <section className="relative hero-gradient text-white py-20 sm:py-28 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link
            href="/about"
            className="inline-flex items-center gap-1.5 text-gold-light text-xs font-bold uppercase tracking-wider mb-6 hover:underline"
          >
            <ArrowLeft size={14} /> Back to About Overview
          </Link>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-gold-light text-xs font-bold uppercase tracking-wider mb-4 mx-auto block w-fit">
            <Sparkles size={14} /> Strategic Outlook
          </div>
          <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight text-white mb-4">
            Our Vision for Tomorrow
          </h1>
          <p className="text-white/80 text-base sm:text-lg max-w-2xl mx-auto">
            Inspiring the next generation of changemakers, scholars, and responsible citizens.
          </p>
        </div>
      </section>

      {/* Main Vision Statement Card */}
      <section className="py-20 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-br from-navy-dark via-navy to-navy-light text-white shadow-2xl relative overflow-hidden text-center">
            <div className="relative z-10">
              <span className="text-gold-light font-bold text-xs uppercase tracking-widest block mb-4">
                The Vision Statement
              </span>
              <p className="font-display font-black text-2xl sm:text-3xl lg:text-4xl leading-tight mb-8">
                &ldquo;We aspire to create an inspiring educational sanctuary where every learner is empowered to discover their potential, think independently, and contribute meaningfully to society.&rdquo;
              </p>
              <div className="h-0.5 w-24 bg-gold mx-auto mb-6" />
              <p className="text-white/70 text-sm max-w-xl mx-auto">
                Guided by the ethos of public service and model academic excellence in Nawalparasi since 2015 B.S.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Goals */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-gold font-bold text-xs uppercase tracking-widest block mb-2">
            Strategic Roadmap
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-navy">
            Building Future-Ready Competencies
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {VISION_GOALS.map((goal) => {
            const Icon = goal.icon;
            return (
              <div
                key={goal.title}
                className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-navy/5 text-navy flex items-center justify-center mb-6">
                    <Icon size={24} />
                  </div>
                  <h3 className="font-display font-bold text-xl text-navy mb-3">
                    {goal.title}
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                    {goal.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center pt-16">
          <Link
            href="/about/values"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-navy text-white text-xs sm:text-sm font-bold hover:bg-gold hover:text-navy transition-all shadow-md"
          >
            Explore Our Core Values <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
