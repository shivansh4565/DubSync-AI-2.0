"use client";

import React, { useState } from "react";
import { Globe, Check, ChevronDown, Sparkles } from "lucide-react";
import { Language } from "@/types";

interface LanguageSelectorProps {
  languages: Language[];
  selectedLanguage: string;
  onSelectLanguage: (code: string) => void;
  disabled?: boolean;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  languages,
  selectedLanguage,
  onSelectLanguage,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const currentLang = languages.find((l) => l.code === selectedLanguage) || {
    code: selectedLanguage,
    name: selectedLanguage.toUpperCase(),
    native: "",
    flag: "🌐",
  };

  const filteredLanguages = languages.filter(
    (l) =>
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.native.toLowerCase().includes(search.toLowerCase()) ||
      l.code.toLowerCase().includes(search.toLowerCase())
  );

  const popularCodes = ["hi", "es", "fr", "de", "ja", "en", "ar"];

  return (
    <div className="relative w-full">
      <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
        <Globe className="w-3.5 h-3.5 text-zinc-600 dark:text-zinc-400" />
        Target Dubbing Language
      </label>

      {/* Main Trigger Button */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-left transition-all ${
          disabled
            ? "opacity-60 cursor-not-allowed"
            : "hover:border-zinc-400 dark:hover:border-zinc-600 focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-600"
        } shadow-sm`}
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">{currentLang.flag}</span>
          <div>
            <div className="font-semibold text-sm text-zinc-900 dark:text-white flex items-center gap-2">
              {currentLang.name}
              {currentLang.native && (
                <span className="text-xs px-2 py-0.5 rounded-md bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-300 dark:border-zinc-700 font-normal">
                  {currentLang.native}
                </span>
              )}
            </div>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">Code: {currentLang.code}</span>
          </div>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-zinc-500 dark:text-zinc-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Quick Select Badges */}
      <div className="mt-2.5 flex flex-wrap gap-1.5 items-center">
        <span className="text-[11px] text-zinc-500 dark:text-zinc-400 mr-1 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-zinc-600 dark:text-zinc-400" /> Quick Select:
        </span>
        {popularCodes.map((code) => {
          const l = languages.find((item) => item.code === code);
          if (!l) return null;
          const isSelected = selectedLanguage === code;
          return (
            <button
              key={code}
              type="button"
              disabled={disabled}
              onClick={() => onSelectLanguage(code)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                isSelected
                  ? "bg-zinc-950 text-white dark:bg-white dark:text-black shadow-md"
                  : "bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800"
              }`}
            >
              <span>{l.flag}</span>
              <span>{l.name}</span>
            </button>
          );
        })}
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute left-0 right-0 top-full mt-2 z-50 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-2xl backdrop-blur-2xl p-2 max-h-80 overflow-y-auto flex flex-col">
            {/* Search Input */}
            <div className="p-2 sticky top-0 bg-white dark:bg-zinc-950 z-10 border-b border-zinc-100 dark:border-zinc-800">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search language or country..."
                className="w-full px-3 py-2 text-xs rounded-xl bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 placeholder-zinc-400"
                autoFocus
              />
            </div>

            {/* Language List */}
            <div className="py-1 divide-y divide-zinc-100 dark:divide-zinc-900">
              {filteredLanguages.length === 0 ? (
                <div className="p-4 text-xs text-center text-zinc-500 dark:text-zinc-400">
                  No matching languages found
                </div>
              ) : (
                filteredLanguages.map((lang) => {
                  const isSelected = selectedLanguage === lang.code;
                  return (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => {
                        onSelectLanguage(lang.code);
                        setIsOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-xs transition-colors ${
                        isSelected
                          ? "bg-zinc-100 dark:bg-zinc-900 text-zinc-950 dark:text-white font-bold"
                          : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900/60"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-xl">{lang.flag}</span>
                        <div>
                          <div className="font-semibold text-zinc-900 dark:text-white">
                            {lang.name}
                          </div>
                          <div className="text-[11px] text-zinc-500 dark:text-zinc-400">
                            {lang.native} ({lang.code})
                          </div>
                        </div>
                      </div>
                      {isSelected && (
                        <Check className="w-4 h-4 text-zinc-900 dark:text-white flex-shrink-0" />
                      )}
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
