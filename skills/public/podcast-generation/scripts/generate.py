import argparse
import base64
import json
import logging
import os
import uuid
from concurrent.futures import ThreadPoolExecutor, as_completed
from typing import Literal, Optional

import requests

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class ScriptLine:
    def __init__(self, speaker: Literal["male", "female"] = "male", paragraph: str = ""):
        self.speaker = speaker
        self.paragraph = paragraph


class Script:
    def __init__(self, locale: str = "tr", lines: Optional[list[ScriptLine]] = None):
        self.locale = locale
        self.lines = lines or []

    @classmethod
    def from_dict(cls, data: dict) -> "Script":
        script = cls(locale=data.get("locale", "tr"))
        for line in data.get("lines", []):
            script.lines.append(
                ScriptLine(
                    speaker=line.get("speaker", "male"),
                    paragraph=line.get("paragraph", ""),
                )
            )
        return script


def text_to_speech_gemini(text: str, voice_name: str, locale: str = "tr") -> Optional[bytes]:
    """Gemini API ile Text-to-Speech — Türkçe dahil çoklu dil desteği."""
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise ValueError("GEMINI_API_KEY environment variable gerekli")

    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={api_key}"

    # Gemini ile ses sentezi — doğal konuşma stili
    prompt = f"""Sen bir podcast sunucususun. Aşağıdaki metni doğal bir konuşma tonuyla oku.
Dil: {'Türkçe' if locale == 'tr' else locale}
Ses: {'Erkek sunucu, güçlü ve güvenilir ton' if 'male' in voice_name else 'Kadın sunucu, sıcak ve samimi ton'}

Metin:
{text}"""

    payload = {
        "contents": [{"parts": [{"text": prompt}]}],
        "generationConfig": {
            "response_modalities": ["AUDIO"],
            "speech_config": {
                "voiceConfig": {
                    "prebuiltVoiceConfig": {
                        "voiceName": voice_name
                    }
                }
            }
        }
    }

    try:
        response = requests.post(url, json=payload, timeout=60)
        if response.status_code != 200:
            logger.error(f"Gemini TTS error: {response.status_code} - {response.text[:200]}")
            return None

        result = response.json()
        candidates = result.get("candidates", [])
        if candidates:
            parts = candidates[0].get("content", {}).get("parts", [])
            for part in parts:
                inline_data = part.get("inlineData", {})
                if inline_data.get("mimeType", "").startswith("audio/"):
                    return base64.b64decode(inline_data["data"])

        logger.error("Gemini TTS: audio data bulunamadı")
        return None

    except Exception as e:
        logger.error(f"Gemini TTS error: {str(e)}")
        return None


def _process_line(args: tuple[int, ScriptLine, int, str]) -> tuple[int, Optional[bytes]]:
    """Tek bir script satırını ses'e çevir."""
    i, line, total, locale = args

    # Gemini sesler — erkek/kadın
    if line.speaker == "male":
        voice_name = "Kore"  # Erkek ses
    else:
        voice_name = "Zara"  # Kadın ses

    logger.info(f"Processing line {i + 1}/{total} ({line.speaker}: {voice_name})")
    audio = text_to_speech_gemini(line.paragraph, voice_name, locale)

    if not audio:
        logger.warning(f"Failed to generate audio for line {i + 1}")

    return (i, audio)


def tts_node(script: Script, max_workers: int = 2) -> list[bytes]:
    """Script satırlarını paralel ses dosyasına çevir."""
    logger.info(f"Converting script to audio using {max_workers} workers...")

    total = len(script.lines)
    tasks = [(i, line, total, script.locale) for i, line in enumerate(script.lines)]

    results: dict[int, Optional[bytes]] = {}
    with ThreadPoolExecutor(max_workers=max_workers) as executor:
        futures = {executor.submit(_process_line, task): task[0] for task in tasks}
        for future in as_completed(futures):
            idx, audio = future.result()
            results[idx] = audio

    audio_chunks = []
    for i in range(total):
        audio = results.get(i)
        if audio:
            audio_chunks.append(audio)

    logger.info(f"Generated {len(audio_chunks)} audio chunks")
    return audio_chunks


def mix_audio(audio_chunks: list[bytes]) -> bytes:
    """Ses parçalarını birleştir."""
    logger.info("Mixing audio chunks...")
    output = b"".join(audio_chunks)
    logger.info("Audio mixing complete")
    return output


def generate_markdown(script: Script, title: str = "Podcast Script") -> str:
    """Podcast transcript markdown oluştur."""
    lines = [f"# {title}", ""]
    for line in script.lines:
        speaker_name = "**Sunucu (Erkek)**" if line.speaker == "male" else "**Sunucu (Kadın)**"
        lines.append(f"{speaker_name}: {line.paragraph}")
        lines.append("")
    return "\n".join(lines)


def generate_podcast(
    script_file: str,
    output_file: str,
    transcript_file: Optional[str] = None,
) -> str:
    """Script JSON dosyasından podcast oluştur."""
    with open(script_file, "r", encoding="utf-8") as f:
        script_json = json.load(f)

    if "lines" not in script_json:
        raise ValueError(f"Geçersiz script formatı: 'lines' key eksik. Mevcut keys: {list(script_json.keys())}")

    script = Script.from_dict(script_json)
    logger.info(f"Loaded script with {len(script.lines)} lines")

    if transcript_file:
        title = script_json.get("title", "Podcast Script")
        markdown_content = generate_markdown(script, title)
        transcript_dir = os.path.dirname(transcript_file)
        if transcript_dir:
            os.makedirs(transcript_dir, exist_ok=True)
        with open(transcript_file, "w", encoding="utf-8") as f:
            f.write(markdown_content)
        logger.info(f"Generated transcript to {transcript_file}")

    audio_chunks = tts_node(script)

    if not audio_chunks:
        raise Exception("Ses oluşturulamadı — API key'i ve model erişimini kontrol edin")

    output_audio = mix_audio(audio_chunks)

    output_dir = os.path.dirname(output_file)
    if output_dir:
        os.makedirs(output_dir, exist_ok=True)
    with open(output_file, "wb") as f:
        f.write(output_audio)

    result = f"Podcast başarıyla oluşturuldu: {output_file}"
    if transcript_file:
        result += f" ve transcript: {transcript_file}"
    return result


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Generate podcast from script JSON (Gemini TTS)")
    parser.add_argument("--script-file", required=True, help="Script JSON dosyası yolu")
    parser.add_argument("--output-file", required=True, help="Çıktı podcast MP3/WAV yolu")
    parser.add_argument("--transcript-file", required=False, help="Transcript markdown yolu (opsiyonel)")

    args = parser.parse_args()

    try:
        result = generate_podcast(args.script_file, args.output_file, args.transcript_file)
        print(result)
    except Exception as e:
        import traceback
        print(f"Podcast oluşturma hatası: {e}")
        traceback.print_exc()
