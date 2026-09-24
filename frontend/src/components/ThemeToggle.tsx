"use client";

import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-[58px] h-[32px] rounded-full bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`relative inline-flex h-[32px] w-[58px] flex-shrink-0 cursor-pointer rounded-full p-[3px] border transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-600 ${
        isDark
          ? "bg-black border-white/20 shadow-inner"
          : "bg-zinc-100 border-zinc-300 shadow-sm"
      }`}
      role="switch"
      aria-checked={isDark}
      aria-label="Toggle dark/white mode"
      title={`Switch to ${isDark ? "White" : "Dark"} Mode`}
    >
      {/* Background Icon: Light Mode (Sun on Left) */}
      <span className="absolute left-[3px] top-[3px] w-[24px] h-[24px] flex items-center justify-center pointer-events-none">
        <Sun className="w-3.5 h-3.5 text-zinc-400" />
      </span>

      {/* Background Icon: Dark Mode (Moon on Right) */}
      <span className="absolute right-[3px] top-[3px] w-[24px] h-[24px] flex items-center justify-center pointer-events-none">
        <Moon className="w-3.5 h-3.5 text-zinc-500" />
      </span>

      {/* Sliding Circular Thumb */}
      <span
        aria-hidden="true"
        className={`pointer-events-none relative z-10 inline-flex h-[24px] w-[24px] transform items-center justify-center rounded-full shadow-md transition-transform duration-300 ease-in-out ${
          isDark
            ? "translate-x-[26px] bg-white text-black"
            : "translate-x-0 bg-white text-amber-500 border border-zinc-200/80"
        }`}
      >
        {isDark ? (
          <Moon className="w-3.5 h-3.5 fill-black text-black" />
        ) : (
          <Sun className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
        )}
      </span>
    </button>
  );
};
