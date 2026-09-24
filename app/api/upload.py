import os
import uuid
import shutil
from pathlib import Path
from pydantic import BaseModel
import yt_dlp
import requests
from fastapi import APIRouter, UploadFile, File, HTTPException

from app.models.job import Job
from app.services.job_manager import job_manager
from app.core.config import UPLOAD_DIR, ALLOWED_VIDEO_TYPES

router = APIRouter(
    prefix="/upload",
    tags=["Upload"]
)


class UrlUploadRequest(BaseModel):
    url: str


@router.post("/")
async def upload_video(
    file: UploadFile = File(...)
):
    extension = os.path.splitext(file.filename)[1].lower()

    if extension not in ALLOWED_VIDEO_TYPES:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported video format '{extension}'. Supported: {', '.join(ALLOWED_VIDEO_TYPES)}"
        )

    job_id = str(uuid.uuid4())
    filename = f"{job_id}{extension}"
    save_path = UPLOAD_DIR / filename

    with open(save_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    original_url = f"/media/uploads/{filename}"

    job = Job(
        job_id=job_id,
        status="uploaded",
        video_filename=file.filename or filename,
        video_path=str(save_path),
        original_video_url=original_url,
        progress=0
    )

    job_manager.create_job(job)

    return {
        "message": "Video uploaded successfully.",
        "job_id": job_id,
        "filename": file.filename,
        "video_url": original_url
    }


@router.post("/url")
async def upload_video_from_url(payload: UrlUploadRequest):
    url = payload.url.strip()
    if not url:
        raise HTTPException(status_code=400, detail="Video URL cannot be empty.")

    job_id = str(uuid.uuid4())
    save_template = str(UPLOAD_DIR / f"{job_id}.%(ext)s")

    from app.core.config import FFMPEG_EXE, FFMPEG_DIR
    if FFMPEG_DIR and FFMPEG_DIR not in os.environ.get("PATH", ""):
        os.environ["PATH"] = FFMPEG_DIR + os.pathsep + os.environ.get("PATH", "")

    cookie_file = None
    if os.path.exists("cookies.txt"):
        cookie_file = "cookies.txt"
    elif os.getenv("YOUTUBE_COOKIES"):
        try:
            cookie_path = UPLOAD_DIR.parent / "temp" / "cookies.txt"
            cookie_path.parent.mkdir(parents=True, exist_ok=True)
            with open(cookie_path, "w", encoding="utf-8") as cf:
                cf.write(os.getenv("YOUTUBE_COOKIES", ""))
            cookie_file = str(cookie_path)
        except Exception:
            pass

    client_strategies = [
        ["ios", "android"],
        ["web_creator", "android"],
        ["android_creator", "android"],
        ["android", "ios", "mweb"]
    ]

    download_success = False
    title = "Online Video"
    ext = "mp4"
    actual_file = None

    for client_list in client_strategies:
        try:
            ydl_opts = {
                "format": "bestvideo[ext=mp4]+bestaudio[ext=m4a]/bestvideo+bestaudio/best[ext=mp4]/best",
                "outtmpl": save_template,
                "merge_output_format": "mp4",
                "ffmpeg_location": FFMPEG_EXE or FFMPEG_DIR,
                "extractor_args": {
                    "youtube": {
                        "player_client": client_list
                    }
                },
                "nocheckcertificate": True,
                "quiet": True,
                "no_warnings": True,
                "geo_bypass": True,
                "socket_timeout": 30,
                "max_filesize": 250 * 1024 * 1024,
                "http_headers": {
                    "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1"
                }
            }

            if cookie_file and os.path.exists(cookie_file):
                ydl_opts["cookiefile"] = cookie_file

            with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                info = ydl.extract_info(url, download=True)
                title = info.get("title", "Online Video")
                ext = info.get("ext", "mp4")

            matching_files = list(UPLOAD_DIR.glob(f"{job_id}.*"))
            if matching_files and matching_files[0].stat().st_size > 1024:
                actual_file = matching_files[0]
                download_success = True
                break
        except Exception as e:
            ydl_error = str(e)
            continue

    if download_success and actual_file:
        # Verify file size and header to ensure it is not HTML
        with open(actual_file, "rb") as f:
            header = f.read(512).lower()
            if b"<!doctype html" in header or b"<html" in header or b"<head" in header:
                actual_file.unlink(missing_ok=True)
                raise HTTPException(status_code=400, detail="The URL returned a webpage instead of video content.")

        filename = actual_file.name
        original_url = f"/media/uploads/{filename}"

        job = Job(
            job_id=job_id,
            status="uploaded",
            video_filename=f"{title}.{ext}",
            video_path=str(actual_file),
            original_video_url=original_url,
            progress=0
        )
        job_manager.create_job(job)

        return {
            "message": "Video downloaded successfully from URL.",
            "job_id": job_id,
            "filename": f"{title}.{ext}",
            "video_url": original_url,
            "title": title
        }

    # Fallback ONLY for direct video file URLs (e.g. .mp4, .webm, or video content-type), NOT for social platform URLs
    is_social_url = any(domain in url.lower() for domain in ["youtube.com", "youtu.be", "vimeo.com", "tiktok.com", "instagram.com", "twitter.com", "x.com"])
    if not is_social_url:
        try:
            headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"}
            r = requests.get(url, stream=True, timeout=25, headers=headers)
            r.raise_for_status()
            content_type = r.headers.get("content-type", "").lower()

            if "text/html" in content_type:
                raise Exception("URL returned an HTML webpage rather than a direct video stream.")

            ext = ".mp4"
            if "webm" in content_type:
                ext = ".webm"
            elif "quicktime" in content_type:
                ext = ".mov"
            elif "matroska" in content_type:
                ext = ".mkv"

            save_path = UPLOAD_DIR / f"{job_id}{ext}"
            with open(save_path, "wb") as f:
                for chunk in r.iter_content(chunk_size=16384):
                    if chunk:
                        f.write(chunk)

            # Check header
            with open(save_path, "rb") as f:
                header = f.read(512).lower()
                if b"<!doctype html" in header or b"<html" in header:
                    save_path.unlink(missing_ok=True)
                    raise Exception("Downloaded stream contained HTML text, not video data.")

            filename = f"{job_id}{ext}"
            original_url = f"/media/uploads/{filename}"

            job = Job(
                job_id=job_id,
                status="uploaded",
                video_filename=f"Web_Video_{job_id[:8]}{ext}",
                video_path=str(save_path),
                original_video_url=original_url,
                progress=0
            )
            job_manager.create_job(job)

            return {
                "message": "Video downloaded directly from URL.",
                "job_id": job_id,
                "filename": f"Web_Video_{job_id[:8]}{ext}",
                "video_url": original_url,
                "title": f"Web Video {job_id[:8]}"
            }
        except Exception as e2:
            raise HTTPException(
                status_code=400,
                detail=f"Failed to fetch video: {ydl_error or str(e2)}"
            )

    raise HTTPException(
        status_code=400,
        detail=f"Failed to download video from link: {ydl_error}"
    )