from typing import Dict

from app.models.job import Job


class JobManager:

    def __init__(self):
        self.jobs: Dict[str, Job] = {}

    def create_job(self, job: Job):
        self.jobs[job.job_id] = job

    def get_job(self, job_id: str):
        return self.jobs.get(job_id)

    def update_job(self, job_id: str, **kwargs):

        job = self.jobs.get(job_id)

        if not job:
            return None

        for key, value in kwargs.items():

            setattr(job, key, value)

        return job


job_manager = JobManager()