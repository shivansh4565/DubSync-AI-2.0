from fastapi import APIRouter, HTTPException, BackgroundTasks
from pydantic import BaseModel
from typing import Optional

from app.core.pipeline import process_video
from app.services.job_manager import job_manager

router = APIRouter(
    prefix="/process",
    tags=["Processing"]
)


class ProcessOptions(BaseModel):
    target_language: Optional[str] = "hi"
    run_background: Optional[bool] = True


@router.post("/{job_id}")
def process(
    job_id: str,
    background_tasks: BackgroundTasks,
    options: Optional[ProcessOptions] = None
):
    target_lang = (options.target_language if options else None) or "hi"
    run_bg = (options.run_background if options else True)


    job = job_manager.get_job(job_id)
    if job is None:
        raise HTTPException(
            status_code=404,
            detail=f"Job {job_id} not found."
        )

    if run_bg and background_tasks is not None:
        job_manager.update_job(
            job_id,
            status="queued",
            target_language=target_lang,
            progress=5
        )
        background_tasks.add_task(process_video, job_id, target_lang)
        return {
            "message": "Dubbing pipeline started in background.",
            "job_id": job_id,
            "status": "queued",
            "target_language": target_lang
        }
    else:
        try:
            result = process_video(job_id, target_lang)
            return {
                "message": "Processing completed successfully.",
                "status": "completed",
                "job_id": job_id,
                **result
            }
        except Exception as e:
            raise HTTPException(
                status_code=400,
                detail=str(e)
            )