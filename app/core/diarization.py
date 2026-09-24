import re


def diarize(transcript: str):
    """
    Fake speaker diarization using sentence splitting.
    Alternates between Speaker 1 and Speaker 2.
    """

    sentences = re.split(r'(?<=[.!?])\s+', transcript)

    speakers = []

    current = 1

    for sentence in sentences:

        sentence = sentence.strip()

        if not sentence:
            continue

        speakers.append(
            {
                "speaker": f"Speaker {current}",
                "text": sentence
            }
        )

        current = 2 if current == 1 else 1

    return speakers