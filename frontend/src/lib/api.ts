import { Job, Language } from "@/types";

const rawApiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
const API_BASE_URL = rawApiUrl.replace(/\/+$/, "");

export async function checkBackendHealth(): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE_URL}/health`, {
      method: "GET",
      cache: "no-store",
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function getSupportedLanguages(): Promise<Language[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/languages`);
    if (!res.ok) throw new Error("Failed to fetch languages");
    const data = await res.json();
    return data.languages || [];
  } catch (err) {
    console.warn("Using fallback languages:", err);
    return [
      { code: "hi", name: "Hindi", native: "हिन्दी", flag: "🇮🇳" },
      { code: "es", name: "Spanish", native: "Español", flag: "🇪🇸" },
      { code: "fr", name: "French", native: "Français", flag: "🇫🇷" },
      { code: "de", name: "German", native: "Deutsch", flag: "🇩🇪" },
      { code: "ja", name: "Japanese", native: "日本語", flag: "🇯🇵" },
      { code: "zh-CN", name: "Chinese (Simplified)", native: "简体中文", flag: "🇨🇳" },
      { code: "it", name: "Italian", native: "Italiano", flag: "🇮🇹" },
      { code: "pt", name: "Portuguese", native: "Português", flag: "🇵🇹" },
      { code: "ru", name: "Russian", native: "Русский", flag: "🇷🇺" },
      { code: "ar", name: "Arabic", native: "العربية", flag: "🇸🇦" },
      { code: "ko", name: "Korean", native: "한국어", flag: "🇰🇷" },
      { code: "bn", name: "Bengali", native: "বাংলা", flag: "🇮🇳" },
      { code: "ta", name: "Tamil", native: "தமிழ்", flag: "🇮🇳" },
      { code: "te", name: "Telugu", native: "తెలుగు", flag: "🇮🇳" },
      { code: "mr", name: "Marathi", native: "मराठी", flag: "🇮🇳" },
      { code: "en", name: "English", native: "English", flag: "🇺🇸" },
    ];
  }
}

export async function uploadVideoFile(file: File): Promise<{ job_id: string; filename: string; video_url: string }> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_BASE_URL}/upload/`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ detail: "Upload failed" }));
    throw new Error(errorData.detail || "Upload failed");
  }

  return await res.json();
}

export async function uploadVideoFromUrl(url: string): Promise<{ job_id: string; filename: string; video_url: string; title?: string }> {
  const res = await fetch(`${API_BASE_URL}/upload/url`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ detail: "Failed to download video from URL" }));
    throw new Error(errorData.detail || "Failed to fetch video from URL");
  }

  return await res.json();
}


export async function startProcessing(
  jobId: string,
  targetLanguage: string = "hi",
  runBackground: boolean = true
): Promise<any> {
  const res = await fetch(`${API_BASE_URL}/process/${jobId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      target_language: targetLanguage,
      run_background: runBackground,
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: "Processing request failed" }));
    throw new Error(err.detail || "Processing failed");
  }

  return await res.json();
}

export async function getJobStatus(jobId: string): Promise<Job> {
  const res = await fetch(`${API_BASE_URL}/status/${jobId}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Job not found");
  }

  return await res.json();
}

export async function getJobsHistory(): Promise<Job[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/jobs`, { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    return data.jobs || [];
  } catch {
    return [];
  }
}

export function getVideoMediaUrl(pathOrUrl?: string): string {
  if (!pathOrUrl) return "";
  if (pathOrUrl.startsWith("http")) return pathOrUrl;
  const cleanPath = pathOrUrl.startsWith("/")
    ? pathOrUrl
    : `/${pathOrUrl.replace(/\\/g, "/")}`;
  return `${API_BASE_URL}${cleanPath}`;
}

export function getDownloadUrl(jobId: string): string {
  return `${API_BASE_URL}/download/${jobId}`;
}

export function getTranscriptDownloadUrl(jobId: string, format: "txt" | "srt" = "txt"): string {
  return `${API_BASE_URL}/download/${jobId}/transcript?format=${format}`;
}
