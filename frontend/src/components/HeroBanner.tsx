"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Play,
  Zap,
  Globe,
  Mic,
  Repeat,
  FileText,
  Users,
  Languages,
  AudioWaveform,
  Volume2,
  Maximize2,
  Sliders,
  Video,
  Star,
} from "lucide-react";

interface HeroBannerProps {
  onTryNow: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onTryNow }) => {
  const [activeLang, setActiveLang] = useState("Hindi");
  const [isPlaying, setIsPlaying] = useState(false);

  const sampleLanguages = [
    { name: "Hindi", flag: "🇮🇳", code: "hi" },
    { name: "Spanish", flag: "🇪🇸", code: "es" },
    { name: "French", flag: "🇫🇷", code: "fr" },
    { name: "German", flag: "🇩🇪", code: "de" },
    { name: "Japanese", flag: "🇯🇵", code: "ja" },
    { name: "Korean", flag: "🇰🇷", code: "ko" },
  ];

  return (
    <section className="w-full pt-8 pb-16 relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        {/* Left Hero Column */}
        <div className="lg:col-span-6 flex flex-col items-start gap-6 text-left">
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-200 text-[11px] font-semibold tracking-wider uppercase shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-zinc-700 dark:text-zinc-300" />
            <span>AI VIDEO DUBBING, ANY LANGUAGE, ANY AUDIENCE</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-zinc-950 dark:text-white leading-[1.08]">
            Dub Any Video <br />
            in Any Language <br />
            with AI.
          </h1>

          {/* Subtitle */}
          <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base max-w-xl leading-relaxed">
            Faster Whisper transcription, multi-speaker diarization, neural translation, and high-fidelity speech synthesis merged in perfect sync.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3.5 pt-1">
            <button
              onClick={onTryNow}
              className="px-6 py-3.5 rounded-full font-bold text-sm bg-zinc-950 hover:bg-zinc-800 text-white dark:bg-white dark:hover:bg-zinc-200 dark:text-black shadow-lg hover:scale-105 active:scale-100 transition-all duration-200 flex items-center gap-2"
            >
              <span>Try DubSyncAI</span>
              <span className="text-base font-normal">→</span>
            </button>

            <a
              href="#how-it-works"
              className="px-6 py-3.5 rounded-full font-semibold text-sm bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-800 shadow-sm transition-all flex items-center gap-2"
            >
              <Play className="w-3.5 h-3.5 fill-current text-zinc-800 dark:text-zinc-300" />
              <span>See how it works</span>
            </a>
          </div>

          {/* 4 Feature Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-5 border-t border-zinc-200 dark:border-zinc-800/90 w-full">
            <div className="flex items-start gap-2.5">
              <Zap className="w-4 h-4 text-zinc-900 dark:text-zinc-300 mt-0.5 flex-shrink-0" />
              <div>
                <h5 className="text-xs font-bold text-zinc-950 dark:text-zinc-200">Fast & Accurate</h5>
                <p className="text-[10px] text-zinc-500 dark:text-zinc-400">Whisper + Diarization</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Globe className="w-4 h-4 text-zinc-900 dark:text-zinc-300 mt-0.5 flex-shrink-0" />
              <div>
                <h5 className="text-xs font-bold text-zinc-950 dark:text-zinc-200">100+ Languages</h5>
                <p className="text-[10px] text-zinc-500 dark:text-zinc-400">Neural Translation</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Mic className="w-4 h-4 text-zinc-900 dark:text-zinc-300 mt-0.5 flex-shrink-0" />
              <div>
                <h5 className="text-xs font-bold text-zinc-950 dark:text-zinc-200">Natural Voices</h5>
                <p className="text-[10px] text-zinc-500 dark:text-zinc-400">High-Fidelity TTS</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Repeat className="w-4 h-4 text-zinc-900 dark:text-zinc-300 mt-0.5 flex-shrink-0" />
              <div>
                <h5 className="text-xs font-bold text-zinc-950 dark:text-zinc-200">Perfect Sync</h5>
                <p className="text-[10px] text-zinc-500 dark:text-zinc-400">Lip & Audio Alignment</p>
              </div>
            </div>
          </div>

          {/* Tagline */}
          <div className="w-full text-center sm:text-left pt-1">
            <p className="font-serif italic text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 tracking-wide">
              ~ One video. Global audience. No limits. ~
            </p>
          </div>
        </div>

        {/* Right Hero Interactive Mockup Card (Pure Black & White Reference Match) */}
        <div className="lg:col-span-6 w-full">
          <div className="relative rounded-3xl bg-zinc-900/90 dark:bg-black/95 border border-zinc-300 dark:border-zinc-800 p-5 sm:p-6 backdrop-blur-2xl shadow-2xl text-white">
            {/* Mockup Card Header */}
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3.5 mb-4">
              <div>
                <span className="font-bold text-sm text-white block">Original</span>
                <span className="text-[11px] text-zinc-400">English</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="flex items-center gap-0.5 h-4">
                  <span className="w-0.5 h-2 bg-white rounded-full" />
                  <span className="w-0.5 h-3.5 bg-white rounded-full" />
                  <span className="w-0.5 h-4 bg-white rounded-full" />
                  <span className="w-0.5 h-2.5 bg-white rounded-full" />
                </div>
                <span className="font-extrabold text-xs tracking-tight text-white">
                  DubSync<span className="text-zinc-400 font-normal">AI</span>
                </span>
              </div>
            </div>

            {/* Video Player & Languages Split Row */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 mb-4">
              {/* Split Screen Video Preview (8 cols) */}
              <div className="sm:col-span-8 flex flex-col gap-2">
                <div className="relative rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800 aspect-[16/10] flex items-center justify-center group">
                  {/* Split Image Screen */}
                  <div className="absolute inset-0 flex">
                    {/* Left half: Original English */}
                    <div className="w-1/2 h-full bg-zinc-900 flex flex-col justify-between p-2.5 relative border-r border-zinc-700/80 overflow-hidden">
                      <div className="w-full h-full absolute inset-0 bg-gradient-to-br from-zinc-800 to-black grayscale flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center">
                          <Users className="w-7 h-7 text-zinc-400" />
                        </div>
                      </div>
                      <span className="relative z-10 self-start px-2 py-0.5 rounded text-[9px] font-semibold bg-black/80 text-zinc-200 border border-white/10 flex items-center gap-1">
                        🇺🇸 English (Original)
                      </span>
                    </div>

                    {/* Right half: Dubbed Target */}
                    <div className="w-1/2 h-full bg-zinc-950 flex flex-col justify-between p-2.5 relative overflow-hidden">
                      <div className="w-full h-full absolute inset-0 bg-gradient-to-br from-zinc-900 to-black flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-zinc-800 border border-zinc-600 flex items-center justify-center">
                          <AudioWaveform className="w-7 h-7 text-white animate-pulse" />
                        </div>
                      </div>
                      <span className="relative z-10 self-start px-2 py-0.5 rounded text-[9px] font-semibold bg-white text-black border border-white flex items-center gap-1">
                        🇮🇳 {activeLang} (Dubbed)
                      </span>
                    </div>
                  </div>

                  {/* Center Split Slider Handle */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-white text-zinc-950 shadow-xl flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                    <Sliders className="w-3.5 h-3.5 rotate-90" />
                  </div>
                </div>

                {/* Video Playback Bar Controls */}
                <div className="flex items-center justify-between px-2.5 py-1.5 bg-zinc-950 rounded-xl border border-zinc-800 text-[11px] text-zinc-400">
                  <div className="flex items-center gap-2 flex-1 mr-3">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="p-1 rounded hover:text-white"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                    </button>
                    {/* Progress slider bar */}
                    <div className="flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                      <div className="h-full bg-white w-1/3 rounded-full" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-mono">
                    <span>0:24 / 1:32</span>
                    <Volume2 className="w-3 h-3 text-zinc-400" />
                    <Maximize2 className="w-3 h-3 text-zinc-400" />
                  </div>
                </div>
              </div>

              {/* Language Audio Pills Column (4 cols) */}
              <div className="sm:col-span-4 flex flex-col gap-1.5">
                {sampleLanguages.map((l) => {
                  const isSelected = activeLang === l.name;
                  return (
                    <button
                      key={l.name}
                      onClick={() => setActiveLang(l.name)}
                      className={`flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs transition-all border ${
                        isSelected
                          ? "bg-zinc-800 text-white border-white/60 shadow-sm"
                          : "bg-zinc-950/70 text-zinc-400 border-zinc-800 hover:bg-zinc-800/60 hover:text-white"
                      }`}
                    >
                      <div className="flex items-center gap-1.5 truncate">
                        <span className="text-sm">{l.flag}</span>
                        <span className="font-medium text-[11px] truncate">{l.name}</span>
                      </div>
                      {/* Soundwave bars */}
                      <div className="flex items-center gap-0.5 h-3">
                        <span className="w-0.5 h-2 bg-white rounded-full animate-pulse" />
                        <span className="w-0.5 h-3 bg-white rounded-full animate-pulse delay-75" />
                        <span className="w-0.5 h-1.5 bg-white rounded-full animate-pulse delay-150" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Row 1: 4-Step Flowchart */}
            <div className="grid grid-cols-4 gap-1.5 py-3 px-2 rounded-2xl bg-zinc-950 border border-zinc-800 mb-3.5 text-left">
              <div className="flex items-center gap-1.5">
                <div className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-white flex-shrink-0">
                  <FileText className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-bold text-white block truncate">1. Transcribe</span>
                  <p className="text-[8px] text-zinc-400 truncate">Faster Whisper</p>
                </div>
                <span className="text-zinc-600 text-xs hidden sm:inline ml-auto">→</span>
              </div>

              <div className="flex items-center gap-1.5">
                <div className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-white flex-shrink-0">
                  <Users className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-bold text-white block truncate">2. Diarize</span>
                  <p className="text-[8px] text-zinc-400 truncate">Multi-speaker</p>
                </div>
                <span className="text-zinc-600 text-xs hidden sm:inline ml-auto">→</span>
              </div>

              <div className="flex items-center gap-1.5">
                <div className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-white flex-shrink-0">
                  <Languages className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-bold text-white block truncate">3. Translate</span>
                  <p className="text-[8px] text-zinc-400 truncate">Neural translation</p>
                </div>
                <span className="text-zinc-600 text-xs hidden sm:inline ml-auto">→</span>
              </div>

              <div className="flex items-center gap-1.5">
                <div className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-white flex-shrink-0">
                  <AudioWaveform className="w-3.5 h-3.5 text-white" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-bold text-white block truncate">4. Dub & Sync</span>
                  <p className="text-[8px] text-zinc-400 truncate">High-fidelity TTS</p>
                </div>
              </div>
            </div>

            {/* Bottom Row 2: 4 Statistics Counters */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-left">
              <div className="flex items-center gap-2">
                <Video className="w-4 h-4 text-white flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-extrabold text-white">500K+</h4>
                  <p className="text-[10px] text-zinc-400">Videos Dubbed</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-white flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-extrabold text-white">100+</h4>
                  <p className="text-[10px] text-zinc-400">Languages</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-white flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-extrabold text-white">50K+</h4>
                  <p className="text-[10px] text-zinc-400">Happy Creators</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-white fill-white flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-extrabold text-white">4.9/5</h4>
                  <p className="text-[10px] text-zinc-400">User Rating</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
