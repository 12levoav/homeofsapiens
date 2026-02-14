#!/usr/bin/env python3
"""Generate images with Google Gemini image models via REST API.

Usage example:
  python3 scripts/gemini_image_gen.py \
    --prompt "Minimal sandy cave-style house exterior at golden hour" \
    --name hero-cave-house
"""

from __future__ import annotations

import argparse
import base64
import json
import mimetypes
import os
from pathlib import Path
from typing import Dict, List
from urllib import error, parse, request

DEFAULT_MODEL = "gemini-2.5-flash-image"
DEFAULT_OUT_DIR = Path("output/gemini")
DEFAULT_ENV_FILE = Path(".env.gemini")


def load_env_file(path: Path) -> None:
    if not path.exists():
        return

    for raw_line in path.read_text(encoding="utf-8").splitlines():
        line = raw_line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue

        key, value = line.split("=", 1)
        key = key.strip()
        value = value.strip().strip('"').strip("'")
        if key and key not in os.environ:
            os.environ[key] = value


def extension_from_mime(mime_type: str) -> str:
    explicit = {
        "image/png": ".png",
        "image/jpeg": ".jpg",
        "image/webp": ".webp",
    }
    if mime_type in explicit:
        return explicit[mime_type]

    guessed = mimetypes.guess_extension(mime_type)
    return guessed if guessed else ".png"


def generate_content(api_key: str, model: str, prompt: str) -> Dict:
    encoded_model = parse.quote(model, safe="")
    endpoint = f"https://generativelanguage.googleapis.com/v1beta/models/{encoded_model}:generateContent"
    url = f"{endpoint}?key={parse.quote(api_key, safe='')}"

    payload = {
        "contents": [
            {
                "parts": [
                    {
                        "text": prompt,
                    }
                ]
            }
        ]
    }

    req = request.Request(
        url,
        data=json.dumps(payload).encode("utf-8"),
        headers={"Content-Type": "application/json"},
        method="POST",
    )

    try:
        with request.urlopen(req, timeout=180) as resp:
            return json.loads(resp.read().decode("utf-8"))
    except error.HTTPError as exc:
        body = exc.read().decode("utf-8", errors="replace")
        raise RuntimeError(f"Gemini API error ({exc.code}): {body}") from exc
    except error.URLError as exc:
        raise RuntimeError(f"Network error while calling Gemini API: {exc}") from exc


def extract_images(response: Dict) -> List[Dict[str, bytes]]:
    images: List[Dict[str, bytes]] = []

    for candidate in response.get("candidates", []):
        content = candidate.get("content", {})
        for part in content.get("parts", []):
            inline = part.get("inlineData") or part.get("inline_data")
            if not inline:
                continue

            b64_data = inline.get("data")
            if not b64_data:
                continue

            mime_type = inline.get("mimeType") or inline.get("mime_type") or "image/png"
            images.append(
                {
                    "mime_type": mime_type,
                    "bytes": base64.b64decode(b64_data),
                }
            )

    return images


def save_images(images: List[Dict[str, bytes]], out_dir: Path, base_name: str, overwrite: bool) -> List[Path]:
    out_dir.mkdir(parents=True, exist_ok=True)
    written: List[Path] = []

    for idx, image in enumerate(images, start=1):
        ext = extension_from_mime(image["mime_type"])
        suffix = "" if len(images) == 1 else f"-{idx}"
        path = out_dir / f"{base_name}{suffix}{ext}"

        if path.exists() and not overwrite:
            raise RuntimeError(f"File already exists: {path}. Use --overwrite to replace it.")

        path.write_bytes(image["bytes"])
        written.append(path)

    return written


def main() -> int:
    parser = argparse.ArgumentParser(description="Generate images using Gemini API")
    parser.add_argument("--prompt", required=True, help="Image generation prompt")
    parser.add_argument("--model", default=DEFAULT_MODEL, help=f"Gemini model (default: {DEFAULT_MODEL})")
    parser.add_argument("--name", default="image", help="Output file base name")
    parser.add_argument("--out-dir", default=str(DEFAULT_OUT_DIR), help=f"Output directory (default: {DEFAULT_OUT_DIR})")
    parser.add_argument(
        "--env-file",
        default=str(DEFAULT_ENV_FILE),
        help=f"Env file to load before running (default: {DEFAULT_ENV_FILE})",
    )
    parser.add_argument("--overwrite", action="store_true", help="Overwrite existing files")
    parser.add_argument("--save-json", action="store_true", help="Save raw response JSON next to outputs")

    args = parser.parse_args()

    load_env_file(Path(args.env_file))

    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise RuntimeError(
            "Missing GEMINI_API_KEY. Set it in your shell or create .env.gemini with: GEMINI_API_KEY=your_key"
        )

    response = generate_content(api_key=api_key, model=args.model, prompt=args.prompt)
    images = extract_images(response)

    if not images:
        text_parts: List[str] = []
        for candidate in response.get("candidates", []):
            for part in candidate.get("content", {}).get("parts", []):
                if "text" in part:
                    text_parts.append(part["text"])
        text_summary = "\n".join(text_parts).strip()
        raise RuntimeError(
            "Gemini returned no image bytes. "
            + (f"Text response:\n{text_summary}" if text_summary else "Raw response did not include inline image data.")
        )

    out_dir = Path(args.out_dir)
    written_files = save_images(images=images, out_dir=out_dir, base_name=args.name, overwrite=args.overwrite)

    if args.save_json:
        json_path = out_dir / f"{args.name}.response.json"
        json_path.write_text(json.dumps(response, indent=2), encoding="utf-8")
        print(f"Saved response JSON: {json_path}")

    for path in written_files:
        print(f"Generated: {path}")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
