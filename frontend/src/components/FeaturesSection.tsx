"use client";

import React from "react";
import { Mic2, Users, Languages, AudioWaveform, Sparkles } from "lucide-react";

export const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: Mic2,
      title: "Faster Whisper Engine",
      desc: "High-precision automatic speech recognition with quantized int8 inference on CPU/GPU.",
      badge: "Speech-to-Text",
      color: "from-blue-500/20 to-cyan-500/20 border-blue-500/30 text-blue-500 dark:text-blue-400",
    },
    {
      icon: Users,
      title: "Multi-Speaker Segmentation",
      desc: "Intelligent speaker diarization separates multi-speaker conversations and dialogue flow.",
      badge: "Diarization",
      color: "from-indigo-500/20 to-purple-500/20 border-indigo-500/30 text-indigo-500 dark:text-indigo-400",
    },
    {
      icon: Languages,
      title: "17+ Global Languages",
      desc: "Automated neural machine translation covering Indian and international languages.",
      badge: "Translation",
      color: "from-purple-500/20 to-pink-500/20 border-purple-500/30 text-purple-500 dark:text-purple-400",
    },
    {
      icon: AudioWaveform,
      title: "AI Voice Synthesis & Sync",
      desc: "Dynamic TTS audio generation merged seamlessly with video timelines using FFmpeg.",
      badge: "Sync Engine",
      color: "from-teal-500/20 to-emerald-500/20 border-teal-500/30 text-teal-600 dark:text-teal-400",
    },
  ];

  return (
    <section id="features" className="w-full py-16 border-t border-slate-200 dark:border-slate-800/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-10">
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            AI Architecture
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            Under the Hood of DubSync AI
          </h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-2">
            An end-to-end intelligent media processing pipeline that converts speech into localized multilingual content in seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 dark:hover:border-blue-500/50 hover:bg-slate-50 dark:hover:bg-slate-900/90 transition-all duration-300 flex flex-col justify-between group shadow-lg"
              >
                <div>
                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${feat.color} border flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold tracking-wider uppercase text-slate-400 dark:text-slate-500">
                    {feat.badge}
                  </span>
                  <h4 className="text-base font-bold text-slate-900 dark:text-slate-100 mt-1 mb-2">
                    {feat.title}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {feat.desc}
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
