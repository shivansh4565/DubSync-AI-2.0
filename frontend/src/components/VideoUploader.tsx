"use client";

import React, { useRef, useState } from "react";
import {
  UploadCloud,
  Film,
  X,
  FileVideo,
  Sparkles,
  Link2,
  FileUp,
  Loader2,
} from "lucide-react";

interface VideoUploaderProps {
  onFileSelected: (file: File) => void;
  selectedFile: File | null;
  videoUrl: string;
  onUrlChange: (url: string) => void;
  onClear: () => void;
  onStartProcessing: () => void;
  isUploading: boolean;
  disabled?: boolean;
}

export const VideoUploader: React.FC<VideoUploaderProps> = ({
  onFileSelected,
  selectedFile,
  videoUrl,
  onUrlChange,
  onClear,
  onStartProcessing,
  isUploading,
  disabled = false,
}) => {
  const [activeTab, setActiveTab] = useState<"file" | "url">("file");
  const [isDragOver, setIsDragOver] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [videoDuration, setVideoDuration] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("video/") && !/\.(mp4|mov|avi|mkv|webm|flv)$/i.test(file.name)) {
      alert("Please select a valid video file (.mp4, .mov, .mkv, .avi, .webm)");
      return;
    }
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    onFileSelected(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (disabled) return;
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleClear = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    setVideoDuration(null);
    onClear();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const hasSelectedInput = Boolean(selectedFile || videoUrl.trim());

  return (
    <div className="w-full flex flex-col gap-5">
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        accept="video/*"
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
          }
        }}
      />

      {/* Input Mode Selector Tabs */}
      <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 w-fit">
        <button
          type="button"
          disabled={disabled || Boolean(selectedFile || videoUrl.trim())}
          onClick={() => setActiveTab("file")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === "file"
              ? "bg-white dark:bg-zinc-800 text-zinc-950 dark:text-white shadow-sm"
              : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
          } disabled:opacity-50`}
        >
          <FileUp className="w-4 h-4" />
          <span>Upload File</span>
        </button>

        <button
          type="button"
          disabled={disabled || Boolean(selectedFile || videoUrl.trim())}
          onClick={() => setActiveTab("url")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === "url"
              ? "bg-white dark:bg-zinc-800 text-zinc-950 dark:text-white shadow-sm"
              : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
          } disabled:opacity-50`}
        >
          <Link2 className="w-4 h-4" />
          <span>Video Link / URL</span>
        </button>
      </div>

      {/* Upload By File */}
      {activeTab === "file" && (
        <>
          {!selectedFile ? (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => !disabled && fileInputRef.current?.click()}
              className={`relative group rounded-3xl border-2 border-dashed transition-all duration-300 p-8 sm:p-12 text-center cursor-pointer overflow-hidden ${
                isDragOver
                  ? "border-zinc-900 dark:border-white bg-zinc-100 dark:bg-zinc-900 scale-[1.01]"
                  : "border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/60 hover:border-zinc-500 dark:hover:border-zinc-600 hover:bg-zinc-100/60 dark:hover:bg-zinc-900/60"
              }`}
            >
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-md">
                  <UploadCloud className="w-9 h-9 sm:w-10 sm:h-10 text-zinc-800 dark:text-white" />
                </div>

                <h3 className="text-base sm:text-lg font-bold text-zinc-950 dark:text-white mb-1">
                  Select or Drag & Drop Video
                </h3>
                <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 max-w-sm mb-4">
                  MP4, MOV, MKV, AVI or WEBM up to 10 minutes HD video.
                </p>

                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-200/80 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-xs text-zinc-800 dark:text-zinc-300">
                  <Film className="w-3.5 h-3.5 text-zinc-600 dark:text-zinc-400" />
                  <span>Automatic audio extraction & int8 transcription</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-5 shadow-lg flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800/80 pb-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white flex-shrink-0">
                    <FileVideo className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-semibold text-sm text-zinc-950 dark:text-white truncate max-w-[200px] sm:max-w-md">
                      {selectedFile.name}
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                      <span>{formatFileSize(selectedFile.size)}</span>
                      {videoDuration !== null && (
                        <>
                          <span>•</span>
                          <span>Duration: {formatDuration(videoDuration)}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  disabled={isUploading || disabled}
                  onClick={handleClear}
                  className="p-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 transition-colors"
                  title="Remove selected video"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Video Preview */}
              {previewUrl && (
                <div className="relative rounded-xl overflow-hidden bg-black aspect-video max-h-72 flex items-center justify-center border border-zinc-800">
                  <video
                    src={previewUrl}
                    controls
                    className="w-full h-full object-contain"
                    onLoadedMetadata={(e) => {
                      setVideoDuration(e.currentTarget.duration);
                    }}
                  />
                </div>
              )}
            </div>
          )}
        </>
      )}

      {/* Upload By Video URL */}
      {activeTab === "url" && (
        <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/60 p-6 sm:p-8 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-zinc-200 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-zinc-900 dark:text-white">
              <Link2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-zinc-950 dark:text-white">
                Paste Video Link
              </h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Supports YouTube, Vimeo, TikTok, direct MP4 URLs, and public video links
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2 mt-1">
            <div className="relative flex-1 w-full">
              <input
                type="url"
                value={videoUrl}
                disabled={disabled || isUploading}
                onChange={(e) => onUrlChange(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=... or https://example.com/video.mp4"
                className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl bg-white dark:bg-zinc-900 text-zinc-950 dark:text-white border border-zinc-300 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-600 transition-all placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
              />
              {videoUrl && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={async () => {
                try {
                  const text = await navigator.clipboard.readText();
                  if (text) onUrlChange(text);
                } catch {
                  // ignore
                }
              }}
              className="w-full sm:w-auto px-4 py-3 rounded-xl bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-xs font-semibold text-zinc-800 dark:text-zinc-200 border border-zinc-300 dark:border-zinc-700 transition-colors whitespace-nowrap"
            >
              Paste from Clipboard
            </button>
          </div>
        </div>
      )}

      {/* Start Button */}
      {hasSelectedInput && (
        <button
          type="button"
          disabled={isUploading || disabled}
          onClick={onStartProcessing}
          className={`w-full py-4 px-6 rounded-2xl font-bold text-sm sm:text-base shadow-xl transition-all duration-300 flex items-center justify-center gap-2.5 ${
            isUploading || disabled
              ? "opacity-60 bg-zinc-800 text-white cursor-not-allowed"
              : "bg-zinc-950 hover:bg-zinc-800 text-white dark:bg-white dark:hover:bg-zinc-200 dark:text-black hover:scale-[1.01] active:scale-100"
          }`}
        >
          {isUploading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>{activeTab === "url" ? "Fetching Video & Processing..." : "Uploading & Processing..."}</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              <span>Start AI Video Dubbing Pipeline</span>
            </>
          )}
        </button>
      )}
    </div>
  );
};
