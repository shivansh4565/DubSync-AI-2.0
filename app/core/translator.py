from concurrent.futures import ThreadPoolExecutor
from deep_translator import GoogleTranslator


def _translate_single(segment, target_language):
    text = segment.get("text", "").strip()
    if not text:
        return {
            "speaker": segment.get("speaker", "Speaker 1"),
            "original": "",
            "translated": ""
        }

    try:
        translated_text = GoogleTranslator(
            source="auto",
            target=target_language
        ).translate(text)
    except Exception:
        translated_text = text

    return {
        "speaker": segment.get("speaker", "Speaker 1"),
        "original": text,
        "translated": translated_text or text
    }


def translate_segments(speakers, target_language="hi"):
    """
    Translate segments concurrently in parallel threads.
    """
    if not speakers:
        return []

    with ThreadPoolExecutor(max_workers=min(len(speakers), 8)) as executor:
        results = list(executor.map(lambda seg: _translate_single(seg, target_language), speakers))

    return results