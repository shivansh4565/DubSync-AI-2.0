import os
import subprocess
from pathlib import Path
import imageio_ffmpeg


def merge_video(video_path: str, speech_files: list, output_dir: str, job_id: str = "") -> str:
    """
    Concatenate all speech segment files and merge the dubbed audio into the video.
    Uses imageio-ffmpeg directly to guarantee zero external system dependencies.
    """
    os.makedirs(output_dir, exist_ok=True)
    ffmpeg_exe = imageio_ffmpeg.get_ffmpeg_exe()

    audio_filename = f"audio_{job_id}.mp3" if job_id else "dubbed_audio.mp3"
    audio_path = os.path.join(output_dir, audio_filename)

    valid_speech_files = [f for f in speech_files if os.path.exists(f) and os.path.getsize(f) > 0]

    if valid_speech_files:
        # Create concat demuxer text file
        concat_txt = os.path.join(output_dir, f"concat_{job_id}.txt")
        with open(concat_txt, "w", encoding="utf-8") as f:
            for s in valid_speech_files:
                clean_path = os.path.abspath(s).replace("\\", "/")
                f.write(f"file '{clean_path}'\n")

        # Concat audio segments into one track
        cmd_concat = [
            ffmpeg_exe,
            "-y",
            "-f", "concat",
            "-safe", "0",
            "-i", concat_txt,
            "-c:a", "libmp3lame",
            "-q:a", "2",
            audio_path
        ]
        res = subprocess.run(cmd_concat, capture_output=True, text=True)
        if res.returncode != 0:
            # Fallback to direct re-encode
            cmd_concat_alt = [
                ffmpeg_exe,
                "-y",
                "-f", "concat",
                "-safe", "0",
                "-i", concat_txt,
                "-c", "copy",
                audio_path
            ]
            subprocess.run(cmd_concat_alt, capture_output=True, text=True)

        # Cleanup concat txt
        try:
            os.remove(concat_txt)
        except Exception:
            pass
    else:
        # Generate 1s silence if no speech files exist
        cmd_silent = [
            ffmpeg_exe,
            "-y",
            "-f", "lavfi",
            "-i", "anullsrc=r=44100:cl=mono",
            "-t", "1",
            "-c:a", "libmp3lame",
            audio_path
        ]
        subprocess.run(cmd_silent, capture_output=True, text=True)

    # Output video file
    video_filename = f"dubbed_{job_id}.mp4" if job_id else "dubbed_video.mp4"
    output_video = os.path.join(output_dir, video_filename)

    # 1st attempt: Stream copy video + AAC audio
    cmd_merge_fast = [
        ffmpeg_exe,
        "-y",
        "-i", str(video_path),
        "-i", str(audio_path),
        "-c:v", "copy",
        "-c:a", "aac",
        "-map", "0:v:0",
        "-map", "1:a:0",
        "-shortest",
        str(output_video)
    ]

    res_fast = subprocess.run(cmd_merge_fast, capture_output=True, text=True)

    if res_fast.returncode != 0 or not os.path.exists(output_video) or os.path.getsize(output_video) == 0:
        # 2nd attempt: Full re-encode with ultrafast preset for fast cloud rendering
        cmd_merge_reencode = [
            ffmpeg_exe,
            "-y",
            "-i", str(video_path),
            "-i", str(audio_path),
            "-c:v", "libx264",
            "-preset", "ultrafast",
            "-threads", "4",
            "-pix_fmt", "yuv420p",
            "-c:a", "aac",
            "-b:a", "128k",
            "-map", "0:v:0",
            "-map", "1:a:0",
            "-shortest",
            str(output_video)
        ]
        res_reencode = subprocess.run(cmd_merge_reencode, capture_output=True, text=True)
        if res_reencode.returncode != 0 or not os.path.exists(output_video):
            raise Exception(f"Video merging failed: {res_reencode.stderr}")

    return output_video