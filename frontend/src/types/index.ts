export interface Language {
  code: string;
  name: string;
  native: string;
  flag: string;
}

export interface SpeakerSegment {
  speaker: string;
  text: string;
}

export interface TranslationSegment {
  speaker: string;
  original: string;
  translated: string;
}

export interface Job {
  job_id: string;
  status: string;
  step_index: number;
  total_steps: number;
  progress: number;
  target_language: string;
  video_filename?: string;
  video_path?: string;
  audio_path?: string;
  transcript?: string;
  speakers?: SpeakerSegment[];
  translations?: TranslationSegment[];
  speech_files?: string[];
  output_video?: string;
  original_video_url?: string;
  dubbed_video_url?: string;
  error_message?: string;
  created_at?: string;
}

export interface PipelineStep {
  id: number;
  title: string;
  description: string;
  icon: string;
}
