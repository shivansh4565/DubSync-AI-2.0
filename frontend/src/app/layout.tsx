import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "DubSync AI - AI Multilingual Video Dubbing Studio",
  description: "AI-powered video dubbing platform. Transcribe speech with Whisper, diarize speakers, translate into 17+ languages, and generate synchronized dubbed videos.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light h-full">
      <body className="min-h-full flex flex-col antialiased selection:bg-blue-500 selection:text-white bg-white dark:bg-black text-zinc-900 dark:text-zinc-100">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}


