"use client";

import React from "react";
import { FileText, Users, Languages, AudioWaveform, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";

export const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      num: "1",
      icon: FileText,
      name: "Transcribe",
      subtitle: "Faster Whisper transcription",
      details: "Audio stream is extracted into 16kHz PCM WAV. Faster Whisper performs fast int8 quantized ASR with exact word timestamps.",
      badge: "Speech Recognition",
      color: "from-blue-600 to-cyan-500",
    },
    {
      num: "2",
      icon: Users,
      name: "Diarize",
      subtitle: "Multi-speaker diarization",
      details: "Detects speaker changes and segments dialogues into Speaker 1, Speaker 2, etc., preserving conversational turns.",
      badge: "Speaker Diarization",
      color: "from-indigo-600 to-purple-500",
    },
    {
      num: "3",
      name: "Translate",
      icon: Languages,
      subtitle: "Neural translation",
      details: "Converts dialogue text into 17+ global languages (Hindi, Spanish, French, German, Japanese, etc.) maintaining semantic intent.",
      badge: "Multilingual Engine",
      color: "from-purple-600 to-pink-500",
    },
    {
      num: "4",
      icon: AudioWaveform,
      name: "Dub & Sync",
      subtitle: "High-fidelity TTS with perfect sync",
      details: "Synthesizes natural voice audio for each speaker segment and merges it back into the original video with FFmpeg.",
      badge: "Audio & Video Merge",
      color: "from-emerald-600 to-teal-500",
    },
  ];

  return (
    <section id="how-it-works" className="w-full py-16 scroll-mt-20 border-t border-slate-200 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
            <span>End-to-End Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
            How DubSync AI Works
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-3 leading-relaxed">
            A 4-step automated pipeline converting your video into high-fidelity multilingual content in seconds.
          </p>
        </div>

        {/* 4 Pipeline Flow Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={s.num}
                className="p-7 rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 dark:hover:border-blue-500/50 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-3xl font-black text-slate-300 dark:text-slate-700 font-mono group-hover:text-blue-500 transition-colors">
                      0{s.num}
                    </span>
                    <div
                      className={`p-3 rounded-2xl bg-gradient-to-tr ${s.color} text-white shadow-md group-hover:scale-110 transition-transform`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block mb-1">
                    {s.badge}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                    {s.num}. {s.name}
                  </h3>
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-3">
                    {s.subtitle}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {s.details}
                  </p>
                </div>

                <div className="pt-5 mt-5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                  <span>Automated</span>
                  <span className="text-emerald-500 font-semibold">Ready</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
