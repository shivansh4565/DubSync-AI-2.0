from faster_whisper import WhisperModel

print("Loading Faster Whisper model...")

model = WhisperModel(
    "base",
    device="cpu",
    compute_type="int8"
)

print("Whisper loaded.")


def transcribe(audio_path: str):

    segments, info = model.transcribe(
        audio_path,
        beam_size=5
    )

    transcript = ""

    for segment in segments:
        transcript += segment.text + " "

    return transcript.strip()