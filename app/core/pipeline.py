import os
import traceback
from app.core.config import TEMP_DIR, TTS_DIR, OUTPUT_DIR
from app.core.extractor import extract_audio
from app.core.transcriber import transcribe
from app.core.diarization import diarize
from app.core.translator import translate_segments
from app.core.tts import generate_speech
from app.core.video_merger import merge_video
from app.services.job_manager import job_manager


def process_video(job_id: str, target_language: str = "hi"):
    job = job_manager.get_job(job_id)

    if job is None:
        raise Exception(f"Job {job_id} not found.")

    try:
        job_manager.update_job(
            job_id,
            target_language=target_language,
            status="Extracting Audio",
            step_index=1,
            progress=15
        )

        # 1. Extract Audio
        audio_path = extract_audio(
            job.video_path,
            TEMP_DIR
        )

        job_manager.update_job(
            job_id,
            audio_path=audio_path,
            status="Transcribing Audio",
            step_index=2,
            progress=30
        )

        # 2. Transcribe (Faster Whisper)
        transcript = transcribe(audio_path)
        if not transcript or not transcript.strip():
            transcript = "No speech detected in audio."

        job_manager.update_job(
            job_id,
            transcript=transcript,
            status="Detecting Speakers",
            step_index=3,
            progress=50
        )

        # 3. Speaker Segmentation
        speakers = diarize(transcript)

        job_manager.update_job(
            job_id,
            speakers=speakers,
            status=f"Translating to {target_language.upper()}",
            step_index=4,
            progress=70
        )

        # 4. Translation
        translated_segments = translate_segments(
            speakers,
            target_language=target_language
        )

        job_manager.update_job(
            job_id,
            translations=translated_segments,
            status="Generating AI Speech",
            step_index=5,
            progress=85
        )

        # 5. Generate Speech
        job_tts_dir = TTS_DIR / job_id
        speech_files = generate_speech(
            translated_segments,
            str(job_tts_dir),
            target_language=target_language
        )

        job_manager.update_job(
            job_id,
            speech_files=speech_files,
            status="Merging Dubbed Video",
            step_index=6,
            progress=95
        )

        # 6. Merge Video
        output_video = merge_video(
            str(job.video_path),
            speech_files,
            str(OUTPUT_DIR),
            job_id=job_id
        )

        # Set URLs for streaming in Next.js frontend
        video_stem = os.path.basename(job.video_path) if job.video_path else ""
        out_stem = os.path.basename(output_video) if output_video else ""

        original_url = f"/media/uploads/{video_stem}"
        dubbed_url = f"/media/outputs/{out_stem}"

        # Complete
        job_manager.update_job(
            job_id,
            transcript=transcript,
            speakers=speakers,
            translations=translated_segments,
            speech_files=speech_files,
            output_video=output_video,
            original_video_url=original_url,
            dubbed_video_url=dubbed_url,
            status="completed",
            step_index=6,
            progress=100
        )

        return {
            "success": True,
            "job_id": job_id,
            "status": "completed",
            "audio_path": audio_path,
            "transcript": transcript,
            "speakers": speakers,
            "translations": translated_segments,
            "speech_files": speech_files,
            "output_video": output_video,
            "original_video_url": original_url,
            "dubbed_video_url": dubbed_url
        }

    except Exception as e:
        error_msg = str(e)
        traceback.print_exc()
        job_manager.update_job(
            job_id,
            status="failed",
            error_message=error_msg,
            progress=0
        )
        raise e