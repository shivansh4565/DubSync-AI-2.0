"use client";

import React, { useState, useEffect, useRef } from "react";
import { Header } from "@/components/Header";
import { HeroBanner } from "@/components/HeroBanner";
import { LanguageSelector } from "@/components/LanguageSelector";
import { VideoUploader } from "@/components/VideoUploader";
import { PipelineTracker } from "@/components/PipelineTracker";
import { StudioResult } from "@/components/StudioResult";
import { JobsHistoryModal } from "@/components/JobsHistoryModal";
import { FeaturesSection } from "@/components/FeaturesSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { LanguagesSection } from "@/components/LanguagesSection";
import { UseCasesSection } from "@/components/UseCasesSection";
import { Footer } from "@/components/Footer";
import { Job, Language } from "@/types";
import {
  getSupportedLanguages,
  uploadVideoFile,
  uploadVideoFromUrl,
  startProcessing,
  getJobStatus,
  getJobsHistory,
} from "@/lib/api";
import { Sparkles, Video } from "lucide-react";

export default function Home() {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("hi");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [currentJob, setCurrentJob] = useState<Job | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [jobsHistory, setJobsHistory] = useState<Job[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const pollTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch languages and past jobs on mount
  useEffect(() => {
    const initData = async () => {
      const [langs, history] = await Promise.all([
        getSupportedLanguages(),
        getJobsHistory(),
      ]);
      setLanguages(langs);
      setJobsHistory(history);
    };
    initData();
  }, []);

  // Poll for job status when active
  useEffect(() => {
    if (!currentJob || currentJob.status === "completed" || currentJob.status === "failed") {
      if (pollTimerRef.current) {
        clearInterval(pollTimerRef.current);
        pollTimerRef.current = null;
      }
      return;
    }

    const poll = async () => {
      try {
        const updated = await getJobStatus(currentJob.job_id);
        setCurrentJob(updated);

        // Update jobs in history list
        setJobsHistory((prev) => {
          const idx = prev.findIndex((j) => j.job_id === updated.job_id);
          if (idx >= 0) {
            const next = [...prev];
            next[idx] = updated;
            return next;
          }
          return [updated, ...prev];
        });

        if (updated.status === "completed" || updated.status === "failed") {
          if (pollTimerRef.current) {
            clearInterval(pollTimerRef.current);
            pollTimerRef.current = null;
          }
        }
      } catch (err) {
        console.error("Polling error:", err);
      }
    };

    pollTimerRef.current = setInterval(poll, 1500);

    return () => {
      if (pollTimerRef.current) {
        clearInterval(pollTimerRef.current);
      }
    };
  }, [currentJob?.job_id, currentJob?.status]);

  const handleStartProcessing = async () => {
    if (!selectedFile && !videoUrl.trim()) return;

    setIsUploading(true);
    try {
      let uploadRes;
      let filename = "";

      if (selectedFile) {
        uploadRes = await uploadVideoFile(selectedFile);
        filename = selectedFile.name;
      } else {
        uploadRes = await uploadVideoFromUrl(videoUrl.trim());
        filename = uploadRes.filename || uploadRes.title || "Web Video";
      }

      const jobId = uploadRes.job_id;

      // Start dubbing pipeline
      await startProcessing(jobId, selectedLanguage, true);

      // Set current job to tracking state
      const initialJob: Job = {
        job_id: jobId,
        status: "queued",
        step_index: 1,
        total_steps: 6,
        progress: 10,
        target_language: selectedLanguage,
        video_filename: filename,
        original_video_url: uploadRes.video_url,
      };

      setCurrentJob(initialJob);
      setJobsHistory((prev) => [initialJob, ...prev]);

      // Scroll to studio to watch progress
      const el = document.getElementById("studio");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } catch (err: any) {
      alert(`Pipeline error: ${err?.message || "Failed to process video"}`);
    } finally {
      setIsUploading(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setVideoUrl("");
    setCurrentJob(null);
    setIsUploading(false);
  };

  const scrollToStudio = () => {
    const el = document.getElementById("studio");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const isPipelineActive =
    currentJob &&
    currentJob.status !== "uploaded" &&
    currentJob.status !== "completed";

  const isStudioReady = currentJob && currentJob.status === "completed";

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-[#070b14] text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* Header / Navbar */}
      <Header
        onOpenHistory={() => setIsHistoryOpen(true)}
        hasJobs={jobsHistory.length > 0}
      />

      {/* Main Content Sections */}
      <main className="flex-1 w-full flex flex-col gap-12">
        {/* Exact Home Banner as requested in reference image */}
        <HeroBanner onTryNow={scrollToStudio} />

        {/* Dynamic Studio Workspace */}
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          <section
            id="studio"
            className="w-full max-w-4xl mx-auto flex flex-col gap-8 scroll-mt-24"
          >
            {/* View 1: Studio Results when Completed */}
            {isStudioReady ? (
              <StudioResult job={currentJob} onReset={handleReset} />
            ) : isPipelineActive ? (
              /* View 2: Active Pipeline Progress */
              <PipelineTracker
                job={currentJob}
                onRetry={() => {
                  if (currentJob) {
                    startProcessing(currentJob.job_id, selectedLanguage, true);
                  }
                }}
              />
            ) : (
              /* View 3: Setup & Upload Studio Card */
              <div className="rounded-3xl bg-white dark:bg-slate-950/85 border border-slate-200 dark:border-slate-800 p-6 sm:p-10 backdrop-blur-2xl shadow-xl dark:shadow-2xl flex flex-col gap-8 transition-colors">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-500">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">
                        AI Dubbing Studio
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Choose your target language and upload or paste a video link.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step 1: Language selection */}
                <div className="flex flex-col gap-2">
                  <LanguageSelector
                    languages={languages}
                    selectedLanguage={selectedLanguage}
                    onSelectLanguage={setSelectedLanguage}
                    disabled={isUploading}
                  />
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-slate-200 dark:bg-slate-800" />

                {/* Step 2: Video Uploader (File or Link) */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5 mb-1">
                    <Video className="w-3.5 h-3.5 text-blue-500" />
                    Video Input (Upload File or Paste Link)
                  </label>
                  <VideoUploader
                    onFileSelected={(file) => {
                      setSelectedFile(file);
                      setVideoUrl("");
                    }}
                    selectedFile={selectedFile}
                    videoUrl={videoUrl}
                    onUrlChange={(url) => {
                      setVideoUrl(url);
                      setSelectedFile(null);
                    }}
                    onClear={() => {
                      setSelectedFile(null);
                      setVideoUrl("");
                    }}
                    onStartProcessing={handleStartProcessing}
                    isUploading={isUploading}
                    disabled={isUploading}
                  />
                </div>
              </div>
            )}
          </section>
        </div>

        {/* Features / Architecture Section */}
        <FeaturesSection />

        {/* How It Works 4-Step Section */}
        <HowItWorksSection />

        {/* Languages Showcase Section */}
        <LanguagesSection
          languages={languages}
          onSelectLanguage={setSelectedLanguage}
        />

        {/* Use Cases Section */}
        <UseCasesSection />
      </main>

      {/* History Drawer Modal */}
      <JobsHistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        jobs={jobsHistory}
        onSelectJob={(job) => setCurrentJob(job)}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
