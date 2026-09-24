"use client";

import React from "react";
import { Video, GraduationCap, Megaphone, Tv, Headphones, Briefcase, Sparkles, CheckCircle2 } from "lucide-react";

export const UseCasesSection: React.FC = () => {
  const useCases = [
    {
      icon: Video,
      title: "YouTube & Content Creators",
      desc: "Reach global audiences across Hindi, Spanish, French, Japanese and more without re-recording videos.",
      tag: "Creators",
      color: "from-red-500/20 to-orange-500/20 border-red-500/30 text-red-500 dark:text-red-400",
    },
    {
      icon: GraduationCap,
      title: "E-Learning & Online Courses",
      desc: "Localize training courses, tutorials, and educational lectures for international students in their native tongue.",
      tag: "Education",
      color: "from-blue-500/20 to-cyan-500/20 border-blue-500/30 text-blue-500 dark:text-blue-400",
    },
    {
      icon: Megaphone,
      title: "Global Marketing & Ads",
      desc: "Run multilingual promotional video campaigns with native accents and brand-consistent voice tones.",
      tag: "Marketing",
      color: "from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-500 dark:text-emerald-400",
    },
    {
      icon: Headphones,
      title: "Podcasts & Interviews",
      desc: "Diarize distinct speakers automatically and produce localized podcasts preserving natural conversational flow.",
      tag: "Podcasting",
      color: "from-purple-500/20 to-pink-500/20 border-purple-500/30 text-purple-500 dark:text-purple-400",
    },
    {
      icon: Tv,
      title: "Media & Entertainment",
      desc: "Dub films, documentaries, and web series with timeline alignment and subtitle export.",
      tag: "Entertainment",
      color: "from-indigo-500/20 to-blue-500/20 border-indigo-500/30 text-indigo-500 dark:text-indigo-400",
    },
    {
      icon: Briefcase,
      title: "Corporate Communications",
      desc: "Translate CEO all-hands, internal onboarding videos, and product announcements for global remote teams.",
      tag: "Enterprise",
      color: "from-amber-500/20 to-yellow-500/20 border-amber-500/30 text-amber-500 dark:text-amber-400",
    },
  ];

  return (
    <section id="use-cases" className="w-full py-16 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-12">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
            <span>Built for Creators & Businesses</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
            Endless Possibilities with AI Dubbing
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-3 leading-relaxed">
            Expand your reach, boost viewer retention, and unlock international markets with automated speech localization.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {useCases.map((uc, idx) => {
            const Icon = uc.icon;
            return (
              <div
                key={idx}
                className="p-7 rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 dark:hover:border-blue-500/50 hover:bg-slate-50 dark:hover:bg-slate-900/90 transition-all duration-300 flex flex-col justify-between group shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${uc.color} border flex items-center justify-center group-hover:scale-110 transition-transform`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                      {uc.tag}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-2">
                    {uc.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {uc.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
