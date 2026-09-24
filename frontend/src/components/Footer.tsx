"use client";

import React from "react";
import { ArrowUp, Sparkles } from "lucide-react";

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full border-t border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-950 pt-12 pb-8 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center gap-0.5 h-6">
                <span className="w-1 h-3 bg-slate-900 dark:bg-white rounded-full" />
                <span className="w-1 h-5 bg-slate-900 dark:bg-white rounded-full" />
                <span className="w-1 h-6 bg-slate-900 dark:bg-white rounded-full" />
                <span className="w-1 h-4 bg-slate-900 dark:bg-white rounded-full" />
                <span className="w-1 h-2 bg-slate-900 dark:bg-white rounded-full" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">
                DubSync<span className="font-medium text-slate-600 dark:text-slate-400">AI</span>
              </span>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 max-w-sm leading-relaxed">
              AI-powered multilingual video dubbing studio. Faster Whisper speech recognition, multi-speaker diarization, neural translation, and high-fidelity speech synthesis merged in perfect sync.
            </p>

            <div className="flex items-center gap-3 mt-2">
              <a
                href="https://github.com/shivansh4565"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:text-blue-500 dark:hover:text-blue-400 border border-slate-200 dark:border-slate-800 transition-colors"
                title="GitHub"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
              </a>

              <a
                href="https://www.linkedin.com/in/s4565"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:text-blue-500 dark:hover:text-blue-400 border border-slate-200 dark:border-slate-800 transition-colors"
                title="LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold text-slate-900 dark:text-slate-200 uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <a href="#features" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  How it Works
                </a>
              </li>
              <li>
                <a href="#languages" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  Supported Languages
                </a>
              </li>
              <li>
                <a href="#use-cases" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  Use Cases
                </a>
              </li>
              <li>
                <a href="#studio" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  AI Dubbing Studio
                </a>
              </li>
            </ul>
          </div>

          {/* Platform Capabilities */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold text-slate-900 dark:text-slate-200 uppercase tracking-wider">
              AI Stack
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {[
                "Faster Whisper",
                "Speaker Diarization",
                "Neural Translation",
                "Text-to-Speech",
                "FFmpeg Timeline Sync",
                "Next.js Studio",
                "FastAPI Engine",
              ].map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <span>Designed & Developed by</span>
            <a
              href="https://github.com/shivansh4565"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-slate-900 dark:text-slate-200 hover:underline"
            >
              Shivansh Saxena
            </a>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 hover:text-slate-900 dark:hover:text-slate-200 transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
