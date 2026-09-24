import os
from faster_whisper import WhisperModel

_model = None

def get_whisper_model():
    global _model
    if _model is None:
        model_size = os.getenv("WHISPER_MODEL", "tiny")
        _model = WhisperModel(
            model_size,
            device="cpu",
            compute_type="int8",
            cpu_threads=4,
            num_workers=2
        )
    return _model


def transcribe(audio_path: str) -> str:
    """
    Fast transcription with Voice Activity Detection (VAD) and greedy decoding.
    """
    model = get_whisper_model()

    segments, info = model.transcribe(
        audio_path,
        beam_size=1,
        best_of=1,
        vad_filter=True,
        vad_parameters=dict(min_silence_duration_ms=400),
        temperature=0.0
    )

    transcript = ""
    for segment in segments:
        transcript += segment.text + " "

    return transcript.strip()