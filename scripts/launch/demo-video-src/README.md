# AgentWorks 60-second demo video (HyperFrames)

Published as `/assets/video/agentworks-demo.mp4` on the Product page (`#demo`).

- **Screens:** real captures of a dummy local automation, "Book more sales demos" (`workspace-docs/Workflow/demo-sales-demos`). All data is illustrative.
- **Founder intro (0–7.5s):** Veo 3.1 image-to-video made from the owner's photo. The tile is removed when he stops speaking. The owner's face is used in this video only; other videos are narrator-only.
- **Narration:** `gemini-2.5-pro-preview-tts`, voice `Charon`, `languageCode: en-IN`, with a director-notes prompt (male, Indian English). The whole script (`assets/vo/script.json`) was generated in one call so the voice stays consistent, then split at the paragraph pauses.
  - Each clip is trimmed and faded, then loudness-normalised (-16 LUFS, -2 dBTP).
  - Don't prefix a style line with 3.8-flash-tts: it reads it aloud, drifts in accent and leaves a static burst at the end of the clip.
- **Build:** `npx hyperframes check`, then `npx hyperframes render -o renders/agentworks-demo-sales.mp4 -q delivery -f 30`. For the web copy: `ffmpeg -i renders/… -c:v libx264 -crf 26 -movflags +faststart -c:a aac -b:a 128k ../../../assets/video/agentworks-demo.mp4`.
