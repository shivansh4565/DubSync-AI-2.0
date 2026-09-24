from fastapi import APIRouter, HTTPException

from app.services.job_manager import job_manager

router = APIRouter(
    prefix="/status",
    tags=["Status"]
)


@router.get("/{job_id}")
def status(job_id: str):

    job = job_manager.get_job(job_id)

    if job is None:

        raise HTTPException(
            status_code=404,
            detail="Job not found."
        )

    return job