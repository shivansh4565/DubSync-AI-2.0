# 🎬 DubSync AI

> **Next-Gen AI-Powered Multilingual Video Dubbing Studio**

DubSync AI is a full-stack AI platform that automatically transcribes speech from video, identifies different speakers, translates the dialogue into 15+ global languages, generates natural neural speech, and merges the translated audio back into the original video with synchronized timing.

---

## 🚀 Features

- ⚡ **Modern Next.js 16 Studio UI**: Built with TypeScript, Tailwind CSS, Lucide icons, and responsive glassmorphism design.
- 🎙️ **Speech Recognition**: Ultra-fast transcription with Faster Whisper (int8 quantized CPU/GPU inference).
- 👥 **Multi-Speaker Diarization**: Separates multi-speaker dialogues with individual speaker tags.
- 🌍 **15+ Target Languages**: Hindi, Spanish, French, German, Japanese, Chinese, Italian, Portuguese, Russian, Arabic, Korean, Bengali, Tamil, Telugu, Marathi, Gujarati, English.
- 🔊 **AI Voice Synthesis**: Dynamic speech generation per speaker.
- 🎥 **Synchronized Video Merging**: Re-encodes audio-video streams with FFmpeg.
- 🎬 **Side-by-Side Video Player**: Compare original vs dubbed video directly in the browser.
- 📝 **Interactive Transcript Editor**: View and copy speaker dialogues, original speech & translations.
- 📥 **Export Options**: Download Dubbed Video (MP4), Subtitles (SRT), and Transcripts (TXT).
- 🔄 **Real-Time Pipeline Tracker**: 6-step animated pipeline progress monitoring.
- 📜 **Session History**: Track and revisit previous dubbing jobs.

---

## 🏗️ Architecture

```
                  Upload Video (Next.js Studio)
                              │
                              ▼
                  Audio Extraction (FFmpeg)
                              │
                              ▼
              Speech-to-Text (Faster Whisper)
                              │
                              ▼
                 Speaker Diarization / Segmentation
                              │
                              ▼
                Neural Machine Translation (15+ Langs)
                              │
                              ▼
                AI Text-to-Speech (TTS Generation)
                              │
                              ▼
                  Synchronized Video Merging
                              │
                              ▼
             Next.js Studio Player & Video Export (MP4 / SRT)
```

---

## 📁 Project Structure

```
DubSync-AI/
├── frontend/                     # Next.js 16 App Router Frontend
│   ├── src/
│   │   ├── app/                  # Pages, layouts, globals.css
│   │   ├── components/           # UI Components (Header, Uploader, StudioResult, etc.)
│   │   ├── lib/                  # API Client & helpers
│   │   └── types/                # TypeScript Interfaces
│   ├── package.json
│   └── next.config.ts
│
├── app/                          # FastAPI AI Backend
│   ├── api/                      # REST Endpoints (upload, process, status, download)
│   ├── core/                     # AI Pipeline (Whisper, TTS, FFmpeg, Translation)
│   ├── models/                   # Pydantic Schemas
│   └── services/                 # Job Management
│
├── uploads/                      # Uploaded source videos
├── outputs/                      # Final dubbed videos
├── temp/                         # Extracted audio WAV files
├── tts_output/                   # Generated speech segments
│
├── main.py                       # FastAPI Application Entry
├── run_app.py                    # Unified Runner (Frontend + Backend)
├── start.bat                     # Windows Launch Script
├── requirements.txt              # Python Dependencies
└── README.md
```

---

## 🛠️ Quick Start

### 1. Install Python Dependencies
```bash
pip install -r requirements.txt
```

### 2. Install Frontend Dependencies
```bash
cd frontend
npm install
cd ..
```

### 3. Run Application (Frontend + Backend)
Run the unified script:
```bash
python run_app.py
```
Or double-click `start.bat` on Windows.

- **Next.js Studio Web App**: [http://localhost:3000](http://localhost:3000)
- **FastAPI Backend**: [http://127.0.0.1:8000](http://127.0.0.1:8000)
- **Interactive Swagger API Docs**: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

---

## 📌 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/upload/` | Upload video file and create Job ID |
| `POST` | `/process/{job_id}` | Start AI dubbing pipeline with target language |
| `GET` | `/status/{job_id}` | Check real-time progress and pipeline step |
| `GET` | `/download/{job_id}` | Download the final dubbed MP4 video |
| `GET` | `/download/{job_id}/transcript` | Download SRT subtitles or TXT transcript |
| `GET` | `/languages` | List all supported dubbing languages |
| `GET` | `/jobs` | List all active/historical dubbing jobs |
| `GET` | `/health` | Backend service health check |

---

## 👨‍💻 Author

**Shivansh Saxena**
- GitHub: [https://github.com/shivansh4565](https://github.com/shivansh4565)
- LinkedIn: [https://www.linkedin.com/in/shivansh-saxena](https://www.linkedin.com/in/shivansh-saxena)
