import os
from gtts import gTTS


def generate_speech(translations, output_dir, target_language="hi"):
    """
    Generate one audio file for each translated segment.
    """
    os.makedirs(output_dir, exist_ok=True)

    generated_files = []

    for i, segment in enumerate(translations):
        text = segment.get("translated", "") or segment.get("text", "")
        if not text.strip():
            continue

        filename = os.path.join(output_dir, f"segment_{i}.mp3")

        # gTTS lang mapping
        lang_code = target_language.split("-")[0] if "-" in target_language and target_language != "zh-CN" else target_language

        try:
            tts = gTTS(
                text=text,
                lang=lang_code,
                slow=False
            )
            tts.save(filename)
            generated_files.append(filename)
        except Exception as e:
            print(f"TTS warning for {lang_code}: {e}")
            try:
                tts = gTTS(text=text, lang="en", slow=False)
                tts.save(filename)
                generated_files.append(filename)
            except Exception as err:
                print(f"Failed to generate TTS segment {i}: {err}")

    return generated_files