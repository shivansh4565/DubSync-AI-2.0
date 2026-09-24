"use client";

import React from "react";
import {
  FileAudio,
  Mic,
  Users,
  Languages,
  AudioWaveform,
  Film,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { Job } from "@/types";

interface PipelineTrackerProps {
  job: Job | null;
  onRetry?: () => void;
}

const STEPS = [
  {
    step: 1,
    title: "Audio Extraction",
    desc: "Extracting high-fidelity PCM audio via FFmpeg",
    icon: FileAudio,
  },
  {
    step: 2,
    title: "AI Transcription",
    desc: "Transcribing speech to text with Faster Whisper",
    icon: Mic,
  },
  {
    step: 3,
    title: "Speaker Diarization",
    desc: "Identifying and segmenting multi-speaker dialogue",
    icon: Users,
  },
  {
    step: 4,
    title: "Neural Translation",
    desc: "Translating dialogue into target language preserving context",
    icon: Languages,
  },
  {
    step: 5,
    title: "AI Voice Generation",
    desc: "Synthesizing natural neural speech audio segments",
    icon: AudioWaveform,
  },
  {
    step: 6,
    title: "Synchronized Video Merge",
    desc: "Merging translated audio back with video stream",
    icon: Film,
  },
];

export const PipelineTracker: React.FC<PipelineTrackerProps> = ({ job, onRetry }) => {
  if (!job) return null;

  const isFailed = job.status === "failed";
  const isCompleted = job.status === "completed";
  const currentStep = job.step_index || 1;
  const progressPercent = Math.min(100, Math.max(job.progress || 5, (currentStep / 6) * 100));

  return (
    <div className="w-full rounded-3xl bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 p-6 sm:p-8 backdrop-blur-2xl shadow-xl dark:shadow-2xl flex flex-col gap-6 transition-colors">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-100 dark:border-zinc-800 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-950 dark:text-white">
              Live AI Pipeline
            </span>
            <span className="text-xs text-zinc-400">•</span>
            <span className="text-xs font-mono text-zinc-500 truncate max-w-[200px]">
              Job ID: {job.job_id}
            </span>
          </div>
          <h3 className="text-xl font-bold text-zinc-950 dark:text-white flex items-center gap-2.5">
            {!isCompleted && !isFailed && (
              <Loader2 className="w-5 h-5 animate-spin" />
            )}
            {isCompleted && (
              <CheckCircle2 className="w-5 h-5 text-zinc-950 dark:text-white" />
            )}
            {isFailed && <AlertCircle className="w-5 h-5 text-rose-500" />}
            <span>
              {isCompleted
                ? "Dubbing Complete!"
                : isFailed
                ? "Pipeline Failed"
                : job.status || "Processing..."}
            </span>
          </h3>
        </div>

        {/* Progress percent badge */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-2xl font-black text-zinc-950 dark:text-white font-mono">
              {isCompleted ? 100 : Math.round(progressPercent)}%
            </span>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400">Overall Progress</p>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2.5 bg-zinc-100 dark:bg-zinc-900 rounded-full overflow-hidden p-0.5 border border-zinc-200 dark:border-zinc-800">
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            isFailed
              ? "bg-rose-500"
              : isCompleted
              ? "bg-zinc-950 dark:bg-white"
              : "bg-zinc-950 dark:bg-white animate-pulse"
          }`}
          style={{ width: `${isCompleted ? 100 : progressPercent}%` }}
        />
      </div>

      {/* Steps List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-2">
        {STEPS.map((s) => {
          const Icon = s.icon;
          const isDone = isCompleted || currentStep > s.step;
          const isCurrent = !isCompleted && !isFailed && currentStep === s.step;

          return (
            <div
              key={s.step}
              className={`p-4 rounded-2xl border transition-all duration-300 flex items-start gap-3.5 ${
                isDone
                  ? "bg-zinc-50 dark:bg-zinc-900/60 border-zinc-300 dark:border-zinc-700 text-zinc-950 dark:text-white"
                  : isCurrent
                  ? "bg-zinc-100 dark:bg-zinc-900 border-zinc-950 dark:border-white shadow-md"
                  : "bg-transparent border-zinc-200 dark:border-zinc-800/80 text-zinc-400 dark:text-zinc-600 opacity-60"
              }`}
            >
              <div
                className={`p-2 rounded-xl flex-shrink-0 ${
                  isDone
                    ? "bg-zinc-200 dark:bg-zinc-800 text-zinc-950 dark:text-white"
                    : isCurrent
                    ? "bg-zinc-950 text-white dark:bg-white dark:text-black"
                    : "bg-zinc-100 dark:bg-zinc-900 text-zinc-400"
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1 mb-0.5">
                  <span className="font-bold text-xs text-zinc-950 dark:text-white truncate">
                    {s.step}. {s.title}
                  </span>
                  {isDone && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-zinc-950 dark:text-white flex-shrink-0" />
                  )}
                  {isCurrent && (
                    <Loader2 className="w-3.5 h-3.5 animate-spin flex-shrink-0" />
                  )}
                </div>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-snug line-clamp-2">
                  {s.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Error Message */}
      {isFailed && (
        <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200 text-xs flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-500 flex-shrink-0" />
            <span>Error: {job.error_message || "An unexpected error occurred during processing."}</span>
          </div>
          {onRetry && (
            <button
              onClick={onRetry}
              className="px-3.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-semibold transition-colors"
            >
              Try Again
            </button>
          )}
        </div>
      )}
    </div>
  );
};
