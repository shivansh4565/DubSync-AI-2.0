import os
import shutil
from pathlib import Path
from dotenv import load_dotenv

load_dotenv()

# Configure FFmpeg automatically from imageio_ffmpeg
FFMPEG_EXE = None
FFMPEG_DIR = None
try:
    import imageio_ffmpeg
    raw_ffmpeg_exe = imageio_ffmpeg.get_ffmpeg_exe()
    FFMPEG_DIR = os.path.dirname(raw_ffmpeg_exe)
    target_ffmpeg = os.path.join(FFMPEG_DIR, "ffmpeg.exe" if os.name == "nt" else "ffmpeg")
    if not os.path.exists(target_ffmpeg):
        try:
            shutil.copyfile(raw_ffmpeg_exe, target_ffmpeg)
        except Exception:
            pass
    FFMPEG_EXE = target_ffmpeg if os.path.exists(target_ffmpeg) else raw_ffmpeg_exe
    if FFMPEG_DIR not in os.environ.get("PATH", ""):
        os.environ["PATH"] = FFMPEG_DIR + os.pathsep + os.environ.get("PATH", "")
except Exception:
    FFMPEG_EXE = "ffmpeg"
    FFMPEG_DIR = None

HF_TOKEN = os.getenv("HF_TOKEN")

BASE_DIR = Path(__file__).resolve().parent.parent.parent

UPLOAD_DIR = BASE_DIR / "uploads"
TEMP_DIR = BASE_DIR / "temp"
TTS_DIR = BASE_DIR / "tts_output"
OUTPUT_DIR = BASE_DIR / "outputs"

UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
TEMP_DIR.mkdir(parents=True, exist_ok=True)
TTS_DIR.mkdir(parents=True, exist_ok=True)
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

ALLOWED_VIDEO_TYPES = [
    ".mp4",
    ".mov",
    ".avi",
    ".mkv",
    ".webm",
    ".flv"
]

MAX_VIDEO_DURATION = 600  # 10 minutes

SUPPORTED_LANGUAGES = {
    "hi": {"name": "Hindi", "native": "हिन्दी", "flag": "🇮🇳"},
    "es": {"name": "Spanish", "native": "Español", "flag": "🇪🇸"},
    "fr": {"name": "French", "native": "Français", "flag": "🇫🇷"},
    "de": {"name": "German", "native": "Deutsch", "flag": "🇩🇪"},
    "ja": {"name": "Japanese", "native": "日本語", "flag": "🇯🇵"},
    "zh-CN": {"name": "Chinese (Simplified)", "native": "简体中文", "flag": "🇨🇳"},
    "it": {"name": "Italian", "native": "Italiano", "flag": "🇮🇹"},
    "pt": {"name": "Portuguese", "native": "Português", "flag": "🇵🇹"},
    "ru": {"name": "Russian", "native": "Русский", "flag": "🇷🇺"},
    "ar": {"name": "Arabic", "native": "العربية", "flag": "🇸🇦"},
    "ko": {"name": "Korean", "native": "한국어", "flag": "🇰🇷"},
    "bn": {"name": "Bengali", "native": "বাংলা", "flag": "🇮🇳"},
    "ta": {"name": "Tamil", "native": "தமிழ்", "flag": "🇮🇳"},
    "te": {"name": "Telugu", "native": "తెలుగు", "flag": "🇮🇳"},
    "mr": {"name": "Marathi", "native": "मराठी", "flag": "🇮🇳"},
    "gu": {"name": "Gujarati", "native": "ગુજરાતી", "flag": "🇮🇳"},
    "en": {"name": "English", "native": "English", "flag": "🇺🇸"},
}