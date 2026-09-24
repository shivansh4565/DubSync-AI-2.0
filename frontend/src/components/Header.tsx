"use client";

import React, { useEffect, useState } from "react";
import { History, Menu, X, Layers, HelpCircle, Globe, Briefcase } from "lucide-react";
import { checkBackendHealth } from "@/lib/api";
import { ThemeToggle } from "./ThemeToggle";

interface HeaderProps {
  onOpenHistory: () => void;
  hasJobs: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onOpenHistory, hasJobs }) => {
  const [isOnline, setIsOnline] = useState<boolean | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const check = async () => {
      const ok = await checkBackendHealth();
      setIsOnline(ok);
    };
    check();
    const interval = setInterval(check, 10000);
    return () => clearInterval(interval);
  }, []);

  const scrollToStudio = () => {
    const el = document.getElementById("studio");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-black/80 backdrop-blur-xl sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo - Waveform Icon + DubSyncAI */}
        <a href="#" className="flex items-center gap-2.5 group">
          {/* Soundwave bars icon */}
          <div className="flex items-center gap-0.5 h-6">
            <span className="w-1 h-3 bg-zinc-900 dark:bg-white rounded-full group-hover:h-5 transition-all duration-300" />
            <span className="w-1 h-5 bg-zinc-900 dark:bg-white rounded-full group-hover:h-3 transition-all duration-300" />
            <span className="w-1 h-6 bg-zinc-900 dark:bg-white rounded-full group-hover:h-4 transition-all duration-300" />
            <span className="w-1 h-4 bg-zinc-900 dark:bg-white rounded-full group-hover:h-6 transition-all duration-300" />
            <span className="w-1 h-2 bg-zinc-900 dark:bg-white rounded-full group-hover:h-4 transition-all duration-300" />
          </div>

          <span className="font-extrabold text-xl tracking-tight text-zinc-900 dark:text-white">
            DubSync<span className="font-medium text-zinc-600 dark:text-zinc-300">AI</span>
          </span>
        </a>

        {/* Center Navigation Links: Features | How it Works | Languages | Use Cases */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-zinc-600 dark:text-zinc-300">
          <a
            href="#features"
            className="hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            How it Works
          </a>
          <a
            href="#languages"
            className="hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            Languages
          </a>
          <a
            href="#use-cases"
            className="hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            Use Cases
          </a>
        </nav>

        {/* Right Action Controls: Theme Switch, History, Get Started Button */}
        <div className="flex items-center gap-3">
          {/* Dark / White mode toggle switch */}
          <ThemeToggle />

          {/* Job History Button */}
          <button
            onClick={onOpenHistory}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-800 transition-all shadow-sm"
            title="View Previous Dubbing Jobs"
          >
            <History className="w-3.5 h-3.5 text-zinc-600 dark:text-zinc-400" />
            <span className="hidden sm:inline">History</span>
            {hasJobs && (
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
            )}
          </button>

          {/* Backend Status Dot */}
          <div
            className={`hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium border ${
              isOnline === true
                ? "bg-emerald-50 dark:bg-zinc-900 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-zinc-800"
                : isOnline === false
                ? "bg-rose-50 dark:bg-zinc-900 text-rose-700 dark:text-rose-400 border-rose-200 dark:border-zinc-800"
                : "bg-amber-50 dark:bg-zinc-900 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-zinc-800"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isOnline === true
                  ? "bg-emerald-500"
                  : isOnline === false
                  ? "bg-rose-500"
                  : "bg-amber-500 animate-pulse"
              }`}
            />
            <span>{isOnline ? "Engine Ready" : isOnline === false ? "Offline" : "Checking..."}</span>
          </div>

          {/* Get Started Button */}
          <button
            onClick={scrollToStudio}
            className="hidden sm:flex items-center gap-1.5 px-5 py-2.5 rounded-full font-bold text-xs bg-zinc-950 hover:bg-zinc-800 text-white dark:bg-white dark:hover:bg-zinc-200 dark:text-black shadow-md hover:scale-105 active:scale-100 transition-all duration-200"
          >
            <span>Get Started</span>
            <span className="text-sm font-normal">→</span>
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-800"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black px-4 py-4 flex flex-col gap-3">
          <a
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 py-2 text-sm font-medium text-zinc-800 dark:text-zinc-200"
          >
            <Layers className="w-4 h-4 text-zinc-500" />
            <span>Features</span>
          </a>
          <a
            href="#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 py-2 text-sm font-medium text-zinc-800 dark:text-zinc-200"
          >
            <HelpCircle className="w-4 h-4 text-zinc-500" />
            <span>How it Works</span>
          </a>
          <a
            href="#languages"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 py-2 text-sm font-medium text-zinc-800 dark:text-zinc-200"
          >
            <Globe className="w-4 h-4 text-zinc-500" />
            <span>Languages</span>
          </a>
          <a
            href="#use-cases"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 py-2 text-sm font-medium text-zinc-800 dark:text-zinc-200"
          >
            <Briefcase className="w-4 h-4 text-zinc-500" />
            <span>Use Cases</span>
          </a>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              scrollToStudio();
            }}
            className="w-full mt-2 py-3 rounded-full font-bold text-xs bg-zinc-950 text-white dark:bg-white dark:text-black flex items-center justify-center gap-2"
          >
            <span>Get Started</span>
            <span>→</span>
          </button>
        </div>
      )}
    </header>
  );
};
