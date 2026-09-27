# Guide walkthrough videos

One folder per guide (its slug matches the guide's `video:` field and `assets/video/guides/<slug>.mp4`).

1. **Screens:** capture from the local app in your own CDP tab at 2x (`Emulation.setDeviceMetricsOverride` with deviceScaleFactor 2), and record element boxes with Playwright `boundingBox()` (app CSS px, 1440×900). Use the dummy automation "Book more sales demos" and never real workflows. Rewrite "Pulse" to "Auto-improve" in the DOM before capture.
2. **Voice:** write `assets/vo/script.json` (one paragraph per scene). `make_vo.py` generates the whole script in one `gemini-2.5-pro-preview-tts` call (voice Charon, `en-IN`, director notes). `split.py` cuts at the pause nearest each paragraph's expected position. Check the transcripts.
3. **Spec:** `spec.json` lists scenes (image, vo id, `rings` boxes with `at`/`until` as fractions of the clip, `clicks`, an optional `zoom`), plus title, subtitle and end card.
4. **Build:** `python3 build_guide.py <folder>`, then in the folder `npx hyperframes check`, `snapshot`, and `render -o renders/<slug>.mp4 -q delivery -f 30`.
5. **Publish:** `ffmpeg … -crf 26 -movflags +faststart` into `assets/video/guides/<slug>.mp4`, plus `<slug>-poster.jpg`.

Narrator only: no founder face in guide videos (owner's rule).
