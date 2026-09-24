import os
from concurrent.futures import ThreadPoolExecutor
from gtts import gTTS


def _synthesize_segment(args):
    i, text, output_dir, lang_code = args
    if not text.strip():
        return None

    filename = os.path.join(output_dir, f"segment_{i:04d}.mp3")

    try:
        tts = gTTS(
            text=text,
            lang=lang_code,
            slow=False
        )
        tts.save(filename)
        return filename
    except Exception as e:
        try:
            tts = gTTS(text=text, lang="en", slow=False)
            tts.save(filename)
            return filename
        except Exception:
            return None


def generate_speech(translations, output_dir, target_language="hi"):
    """
    Generate speech files concurrently in parallel threads.
    """
    os.makedirs(output_dir, exist_ok=True)

    if not translations:
        return []

    lang_code = target_language.split("-")[0] if "-" in target_language and target_language != "zh-CN" else target_language

    tasks = []
    for i, segment in enumerate(translations):
        text = segment.get("translated", "") or segment.get("original", "")
        tasks.append((i, text, output_dir, lang_code))

    with ThreadPoolExecutor(max_workers=min(len(tasks), 6)) as executor:
        results = list(executor.map(_synthesize_segment, tasks))

    generated_files = [f for f in results if f is not None and os.path.exists(f)]
    return sorted(generated_files)