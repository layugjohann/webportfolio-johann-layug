# Spec: project media (retail-ops-agent, screenshots, Demo videos)

Settled in a grilling session on 2026-11-25. Terms are defined in `GLOSSARY.md`.

## Goal

Add retail-ops-agent to Selected work, show real screenshots instead of illustrative terminal runs where we have them, and let a Project carry a Demo video.

## Decisions

1. **Order and Featured.** retail-ops-agent, fixline, availability-runs, sandcastle-pro. retail-ops-agent and fixline are Featured; availability-runs is no longer Featured (the glossary allows at most two).
2. **retail-ops-agent is Shipped** (no badge): the Replay Mode demo is usable by a reviewer today.
3. **retail-ops-agent copy** (only README-verified claims):
   - Pitch: "Three AI agents turn a retailer's messy daily CSV uploads into trusted BI data, then into investigated, tiered actions, with a human approving anything that costs money."
   - Problem: "At a multi-channel retailer, someone spends every morning fixing CSV headers and chasing store managers, while the inventory planner works out stock cover in a spreadsheet and keys reorders into the ERP by hand. I took the problem from a real FDE job posting."
   - Approach: "A fixed pipeline, with no LLM supervisor: an Intake agent validates and safely fixes uploads, statistics flag anomalies, an Analyst agent investigates them, and an Ops agent proposes actions. A rule table, not model confidence, decides which actions run and which wait for approval. The ERP is behind an MCP server."
   - Outcome: "A live demo replays recorded Ops Days with no wait and no API key. Golden-scenario evals with exact ground truth require 100% on 'no reorder without approval', including prompt injections planted in uploads. It costs $0 to run on free-tier models."
   - Tags: Python, Pydantic AI, Agents, MCP, Evals, DuckDB
   - Live: https://cobalt-home-ops.streamlit.app/ · Code: https://github.com/layugjohann/retail-ops-agent
4. **Screenshot layout: variant A** (prototype branch `prototype/project-screenshots`). The screenshot fills the existing 16:10 frame with the hard accent shadow, `object-fit: cover` anchored top-left. Projects without a screenshot (sandcastle-pro) keep the terminal card.
5. **Demo video playback.** A Project with a Demo video shows a pixel-style "▶ Play demo" button centred on its screenshot. Clicking swaps the screenshot for an inline `<video controls playsinline>` in the same frame that starts playing; the video is letterboxed (`object-fit: contain`) on the panel colour, never cropped. `preload="none"`: nothing downloads before the click.
6. **No Demo video yet → no button.** fixline and availability-runs show just their screenshot until their recordings arrive. No "coming soon" text.
7. **Files.**
   - Screenshots: `public/images/projects/<id>.webp`, 1600 px wide.
   - Demo videos: `public/videos/<id>.mp4`, H.264, 1080 px tall, CRF ~28, `+faststart`, audio stripped (recordings are silent), target ≤ 15 MB.
   - `projects.js` gains an optional `video` field (`'/videos/<id>.mp4'` or `''`) beside `img`.
8. **Raw media stays out of git.** `media/` is gitignored; only the optimised derivatives under `public/` are committed.

## Adding a Demo video later (fixline, availability-runs)

Encode the raw recording into `public/videos/<id>.mp4` with the settings in decision 7, then set that Project's `video` field. Nothing else changes.

## Pending from Johann

- A retake of the retail-ops-agent screenshot on **Replay Mode** with the Approval Queue or Investigations in view; the current Live Mode shot is a stand-in until then.
- The fixline and availability-runs recordings.
