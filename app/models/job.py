from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
from datetime import datetime


class Job(BaseModel):
    job_id: str
    status: str = "uploaded"
    step_index: int = 0
    total_steps: int = 6
    progress: int = 0
    target_language: str = "hi"
    video_filename: Optional[str] = None
    video_path: Optional[str] = None
    audio_path: Optional[str] = None
    transcript: Optional[str] = None
    speakers: Optional[List[Dict[str, Any]]] = None
    translations: Optional[List[Dict[str, Any]]] = None
    speech_files: Optional[List[str]] = None
    output_video: Optional[str] = None
    original_video_url: Optional[str] = None
    dubbed_video_url: Optional[str] = None
    error_message: Optional[str] = None
    created_at: str = Field(default_factory=lambda: datetime.utcnow().isoformat())