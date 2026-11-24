# 03: Demo video playback, starting with retail-ops-agent

**Status:** done

**Blocked by:** 02

**What to build:** The optional `video` field and the click-to-play behaviour in spec decisions 5–6. Encode `media/retail-ops-agent demo.mov` to `public/videos/retail-ops-agent.mp4` (decision 7) and set it on retail-ops-agent.

- [x] A Project with `video` shows a "▶ Play demo" button on its screenshot; one without shows none
- [x] Clicking replaces the screenshot with a playing `<video controls playsinline>` in the same frame, letterboxed, not cropped
- [x] No audio track; the `<video>` is not in the page until Play is clicked, so nothing preloads (stronger than `preload="none"`)
- [x] The button is keyboard-reachable and has an accessible name naming the Project
- [x] `public/videos/retail-ops-agent.mp4` is ≤ 15 MB
- [x] The `projects.js` shape comment documents `video`
