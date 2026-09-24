"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import {
  Download,
  Film,
  FileText,
  Volume2,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  Layers,
  Subtitles,
  Share2,
} from "lucide-react";
import { Job } from "@/types";
import { getVideoMediaUrl, getDownloadUrl, getTranscriptDownloadUrl } from "@/lib/api";

interface StudioResultProps {
  job: Job;
  onReset: () => void;
}

export const StudioResult: React.FC<StudioResultProps> = ({ job, onReset }) => {
  const [activeTab, setActiveTab] = useState<"comparison" | "dubbed_only" | "transcript">("comparison");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Launch celebratory confetti when user reaches completed studio result
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // ignore
    }
  }, []);

  const handleCopyTranscript = () => {
    if (!job.translations) return;
    const text = job.translations
      .map((t) => `[${t.speaker}]\nOriginal: ${t.original}\nTranslated: ${t.translated}\n`)
      .join("\n");
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const dubbedVideoSrc = job.output_video
    ? getVideoMediaUrl(job.dubbed_video_url || `outputs/${job.output_video.split(/[\\/]/).pop()}`)
    : "";

  const originalVideoSrc = job.video_path
    ? getVideoMediaUrl(job.original_video_url || `uploads/${job.video_path.split(/[\\/]/).pop()}`)
    : "";

  return (
    <div className="w-full flex flex-col gap-8 animate-in fade-in duration-500">
      {/* Studio Header & Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white dark:bg-zinc-950/90 border border-zinc-200 dark:border-white/10 backdrop-blur-xl shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-white">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-zinc-100 dark:bg-white/10 text-zinc-900 dark:text-white border border-zinc-200 dark:border-white/15 uppercase tracking-wider">
                Ready for Export
              </span>
              <span className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">Language: {job.target_language.toUpperCase()}</span>
            </div>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white mt-0.5">
              Dubbed Master Video Produced
            </h2>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <a
            href={getDownloadUrl(job.job_id)}
            download
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm bg-zinc-900 dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-200 text-white dark:text-black shadow-lg transition-all hover:scale-105 active:scale-100"
          >
            <Download className="w-4 h-4" />
            <span>Download Video</span>
          </a>

          <a
            href={getTranscriptDownloadUrl(job.job_id, "srt")}
            download
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-medium bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-800 transition-colors"
            title="Download SRT Subtitles"
          >
            <Subtitles className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
            <span>SRT Subtitles</span>
          </a>

          <button
            type="button"
            onClick={onReset}
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-medium bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 transition-colors"
            title="Dub another video"
          >
            <RotateCcw className="w-4 h-4 text-zinc-500" />
            <span>New Video</span>
          </button>
        </div>
      </div>

      {/* Video View Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-2">
        <button
          onClick={() => setActiveTab("comparison")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === "comparison"
              ? "bg-zinc-900 text-white dark:bg-white dark:text-black shadow-sm"
              : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900"
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Side-by-Side Comparison</span>
        </button>

        <button
          onClick={() => setActiveTab("dubbed_only")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === "dubbed_only"
              ? "bg-zinc-900 text-white dark:bg-white dark:text-black shadow-sm"
              : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900"
          }`}
        >
          <Film className="w-4 h-4" />
          <span>Dubbed Video Only</span>
        </button>

        <button
          onClick={() => setActiveTab("transcript")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === "transcript"
              ? "bg-zinc-900 text-white dark:bg-white dark:text-black shadow-sm"
              : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900"
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Script & Dialogue View</span>
        </button>
      </div>

      {/* Main Studio Display */}
      {activeTab === "comparison" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Original Video */}
          <div className="flex flex-col gap-2 p-5 rounded-3xl bg-white dark:bg-zinc-950/80 border border-zinc-200 dark:border-white/10 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Original Video
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-medium">
                Source Audio
              </span>
            </div>
            <div className="relative rounded-2xl overflow-hidden bg-zinc-900 aspect-video flex items-center justify-center border border-zinc-200 dark:border-zinc-800">
              {originalVideoSrc ? (
                <video
                  src={originalVideoSrc}
                  controls
                  className="w-full h-full object-contain"
                />
              ) : (
                <p className="text-xs text-zinc-400">Source video not available</p>
              )}
            </div>
          </div>

          {/* Dubbed Video */}
          <div className="flex flex-col gap-2 p-5 rounded-3xl bg-white dark:bg-zinc-950/90 border border-zinc-300 dark:border-white/20 shadow-xl ring-1 ring-zinc-900/10 dark:ring-white/10">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Dubbed AI Video ({job.target_language.toUpperCase()})
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] bg-zinc-900 dark:bg-white text-white dark:text-black font-semibold">
                Synchronized
              </span>
            </div>
            <div className="relative rounded-2xl overflow-hidden bg-black aspect-video flex items-center justify-center border border-zinc-200 dark:border-zinc-800">
              {dubbedVideoSrc ? (
                <video
                  src={dubbedVideoSrc}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                />
              ) : (
                <p className="text-xs text-zinc-400">Generating video output...</p>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === "dubbed_only" && (
        <div className="p-6 rounded-3xl bg-white dark:bg-zinc-950/80 border border-zinc-200 dark:border-white/10 max-w-4xl mx-auto w-full shadow-2xl">
          <div className="relative rounded-2xl overflow-hidden bg-black aspect-video flex items-center justify-center border border-zinc-200 dark:border-zinc-800">
            {dubbedVideoSrc ? (
              <video
                src={dubbedVideoSrc}
                controls
                autoPlay
                className="w-full h-full object-contain"
              />
            ) : (
              <p className="text-xs text-zinc-400">Dubbed video loading...</p>
            )}
          </div>
        </div>
      )}

      {/* Transcript & Segment Breakdown */}
      <div className="rounded-3xl bg-white dark:bg-zinc-950/80 border border-zinc-200 dark:border-white/10 p-6 sm:p-8 backdrop-blur-xl shadow-xl flex flex-col gap-5">
        <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-white">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                Multi-Speaker Dialogue Breakdown
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Segmented speech and AI translated lines
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyTranscript}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-800 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-emerald-500 font-semibold">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-zinc-500" />
                  <span>Copy Script</span>
                </>
              )}
            </button>

            <a
              href={getTranscriptDownloadUrl(job.job_id, "txt")}
              download
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-800 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-zinc-500" />
              <span>Save TXT</span>
            </a>
          </div>
        </div>

        {/* Segments Stream */}
        <div className="flex flex-col gap-3.5 max-h-96 overflow-y-auto pr-1">
          {job.translations && job.translations.length > 0 ? (
            job.translations.map((seg, idx) => {
              const isSpeaker1 = seg.speaker.toLowerCase().includes("1");
              return (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-zinc-50 dark:bg-black/60 border border-zinc-200 dark:border-white/10 hover:border-zinc-300 dark:hover:border-white/20 transition-all flex flex-col gap-2"
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                        isSpeaker1
                          ? "bg-zinc-200 dark:bg-white/10 text-zinc-900 dark:text-white border-zinc-300 dark:border-white/20"
                          : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700"
                      }`}
                    >
                      {seg.speaker}
                    </span>
                    <span className="text-[11px] text-zinc-500 font-mono">
                      Segment #{idx + 1}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                    {/* Original */}
                    <div className="text-xs text-zinc-600 dark:text-zinc-400 bg-white dark:bg-zinc-900/50 p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800">
                      <span className="text-[10px] uppercase font-bold text-zinc-400 dark:text-zinc-500 block mb-1">
                        Original Audio Speech
                      </span>
                      <p className="italic">"{seg.original}"</p>
                    </div>

                    {/* Translated */}
                    <div className="text-xs text-zinc-900 dark:text-white bg-zinc-100/80 dark:bg-zinc-900/90 p-2.5 rounded-xl border border-zinc-200 dark:border-white/10">
                      <span className="text-[10px] uppercase font-bold text-zinc-700 dark:text-zinc-300 block mb-1">
                        AI Dubbed Translation ({job.target_language.toUpperCase()})
                      </span>
                      <p className="font-medium">"{seg.translated}"</p>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-4 rounded-xl bg-zinc-100 dark:bg-zinc-900 text-xs text-zinc-500">
              {job.transcript || "No transcript segments available."}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
