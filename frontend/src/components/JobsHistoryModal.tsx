"use client";

import React from "react";
import { X, History, CheckCircle2, AlertCircle, Loader2, ArrowRight, Film } from "lucide-react";
import { Job } from "@/types";

interface JobsHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobs: Job[];
  onSelectJob: (job: Job) => void;
}

export const JobsHistoryModal: React.FC<JobsHistoryModalProps> = ({
  isOpen,
  onClose,
  jobs,
  onSelectJob,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative z-10 w-full max-w-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-white/10 rounded-3xl p-6 shadow-2xl flex flex-col max-h-[85vh]">
        <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-white">
              <History className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-zinc-900 dark:text-white">
                Dubbing Job History
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Previously processed AI dubbed video sessions
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Jobs List */}
        <div className="overflow-y-auto flex-1 flex flex-col gap-3 pr-1">
          {jobs.length === 0 ? (
            <div className="p-8 text-center text-zinc-500 text-xs">
              No dubbing jobs recorded yet in this session.
            </div>
          ) : (
            jobs.map((job) => {
              const isDone = job.status === "completed";
              const isFailed = job.status === "failed";
              const isProcessing = !isDone && !isFailed;

              return (
                <div
                  key={job.job_id}
                  onClick={() => {
                    onSelectJob(job);
                    onClose();
                  }}
                  className="p-4 rounded-2xl bg-zinc-50 dark:bg-black/60 border border-zinc-200 dark:border-white/10 hover:border-zinc-400 dark:hover:border-white/30 hover:bg-zinc-100 dark:hover:bg-zinc-900/60 transition-all cursor-pointer flex items-center justify-between gap-3 group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-2.5 rounded-xl bg-zinc-200 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-300 group-hover:text-black dark:group-hover:text-white group-hover:bg-zinc-300 dark:group-hover:bg-zinc-800 transition-colors">
                      <Film className="w-5 h-5" />
                    </div>

                    <div className="min-w-0">
                      <h4 className="text-xs font-semibold text-zinc-900 dark:text-zinc-200 truncate">
                        {job.video_filename || `Video_${job.job_id.slice(0, 8)}`}
                      </h4>
                      <div className="flex items-center gap-2 text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                        <span className="uppercase font-mono font-bold text-zinc-900 dark:text-white">
                          {job.target_language || "HI"}
                        </span>
                        <span>•</span>
                        <span className="truncate font-mono">
                          ID: {job.job_id.slice(0, 8)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${
                        isDone
                          ? "bg-zinc-100 dark:bg-white/10 text-zinc-900 dark:text-white border-zinc-300 dark:border-white/20"
                          : isFailed
                          ? "bg-rose-100 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 border-rose-300 dark:border-rose-500/30"
                          : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-300 dark:border-zinc-700"
                      }`}
                    >
                      {isDone && <CheckCircle2 className="w-3 h-3 text-emerald-500" />}
                      {isFailed && <AlertCircle className="w-3 h-3 text-rose-500" />}
                      {isProcessing && <Loader2 className="w-3 h-3 text-zinc-500 animate-spin" />}
                      <span>{job.status}</span>
                    </span>

                    <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
