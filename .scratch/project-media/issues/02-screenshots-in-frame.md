# 02: Screenshots in the Project frame

**Status:** done

**Decided by prototype:** branch `prototype/project-screenshots`, variant A (chosen over B pixel browser window, C screenshot + terminal collage, D full-width banner).

**What to build:** Convert the three screenshots in `media/` to `public/images/projects/<id>.webp` (spec decision 7) and set `img` for retail-ops-agent, fixline and availability-runs. The frame anchors the crop top-left (spec decision 4).

- [x] The three Projects show their screenshot in the 16:10 frame, cropped from the top-left, lazy-loaded, with alt text naming the Project
- [x] sandcastle-pro still shows its terminal card
- [x] Each WebP is 1600 px wide
