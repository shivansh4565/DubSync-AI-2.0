from deep_translator import GoogleTranslator


def translate_segments(speakers, target_language="hi"):
    """
    Translate each speaker's text.
    """

    translated_segments = []

    for segment in speakers:

        try:
            translated_text = GoogleTranslator(
                source="auto",
                target=target_language
            ).translate(segment["text"])

        except Exception:
            translated_text = segment["text"]

        translated_segments.append(
            {
                "speaker": segment["speaker"],
                "original": segment["text"],
                "translated": translated_text
            }
        )

    return translated_segments