"use client";

import React from "react";
import { Globe, Sparkles, AudioWaveform } from "lucide-react";
import { Language } from "@/types";

interface LanguagesSectionProps {
  languages: Language[];
  onSelectLanguage: (code: string) => void;
}

export const LanguagesSection: React.FC<LanguagesSectionProps> = ({
  languages,
  onSelectLanguage,
}) => {
  return (
    <section id="languages" className="w-full py-16 border-t border-slate-200 dark:border-slate-800/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-10">
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Globe className="w-3.5 h-3.5" />
            Global Reach
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            Supported Languages & Dialects
          </h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-2">
            Translate and synthesize voiceovers in 17+ major Indian and international languages with natural prosody.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5">
          {languages.map((lang) => (
            <div
              key={lang.code}
              onClick={() => {
                onSelectLanguage(lang.code);
                const studioEl = document.getElementById("studio");
                if (studioEl) studioEl.scrollIntoView({ behavior: "smooth" });
              }}
              className="p-4 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 dark:hover:border-blue-500/50 hover:bg-slate-50 dark:hover:bg-slate-900/90 transition-all duration-200 flex flex-col items-center text-center cursor-pointer group shadow-sm hover:shadow-md"
            >
              <span className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                {lang.flag}
              </span>
              <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">
                {lang.name}
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-normal mt-0.5">
                {lang.native}
              </p>
              <div className="mt-2.5 flex items-center gap-1 text-[10px] text-blue-600 dark:text-blue-400 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Select</span>
                <span>→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
