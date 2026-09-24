import subprocess
import os
from pathlib import Path
import imageio_ffmpeg


def extract_audio(video_path: str, output_dir: str) -> str:
    """
    Extract audio from a video and save it as WAV (16kHz mono for Whisper).
    """
    video_path = Path(video_path)
    output_dir = Path(output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)

    audio_path = output_dir / f"{video_path.stem}.wav"

    ffmpeg_exe = imageio_ffmpeg.get_ffmpeg_exe()
    cmd = [
        ffmpeg_exe,
        "-y",
        "-i", str(video_path),
        "-vn",
        "-acodec", "pcm_s16le",
        "-ar", "16000",
        "-ac", "1",
        str(audio_path)
    ]

    res = subprocess.run(cmd, capture_output=True, text=True)
    if res.returncode != 0 or not audio_path.exists():
        raise Exception(f"Failed to extract audio from video: {res.stderr}")

    return str(audio_path)