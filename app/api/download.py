from fastapi import APIRouter, HTTPException, Response
from fastapi.responses import FileResponse
import os

from app.services.job_manager import job_manager

router = APIRouter(
    prefix="/download",
    tags=["Download"]
)


@router.get("/{job_id}")
def download_video(job_id: str):
    """
    Download the generated dubbed video.
    """
    job = job_manager.get_job(job_id)

    if job is None:
        raise HTTPException(
            status_code=404,
            detail="Job not found."
        )

    if job.output_video is None or not os.path.exists(job.output_video):
        raise HTTPException(
            status_code=400,
            detail="Output video not generated yet."
        )

    out_name = f"dubbed_{job.target_language}_{job_id[:8]}.mp4"
    return FileResponse(
        path=job.output_video,
        media_type="video/mp4",
        filename=out_name
    )


@router.get("/{job_id}/transcript")
def download_transcript(job_id: str, format: str = "txt"):
    job = job_manager.get_job(job_id)
    if job is None or not job.translations:
        raise HTTPException(status_code=404, detail="Transcript not available.")

    if format == "srt":
        srt_lines = []
        for i, segment in enumerate(job.translations, start=1):
            text = segment.get("translated", "")
            srt_lines.append(f"{i}\n00:00:00,000 --> 00:00:10,000\n[{segment.get('speaker', 'Speaker')}]: {text}\n")
        content = "\n".join(srt_lines)
        return Response(content=content, media_type="text/plain", headers={"Content-Disposition": f'attachment; filename="transcript_{job_id[:8]}.srt"'})
    else:
        txt_lines = [f"DubSync AI Dubbing Transcript - Job {job_id}", f"Target Language: {job.target_language}", "="*40, ""]
        for seg in job.translations:
            txt_lines.append(f"[{seg.get('speaker', 'Speaker')}]: {seg.get('translated', '')}")
            txt_lines.append(f"  (Original: {seg.get('original', '')})\n")
        content = "\n".join(txt_lines)
        return Response(content=content, media_type="text/plain", headers={"Content-Disposition": f'attachment; filename="transcript_{job_id[:8]}.txt"'})