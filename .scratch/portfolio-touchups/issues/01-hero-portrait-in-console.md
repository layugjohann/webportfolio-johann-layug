# 01: Hero: portrait inside the agent console

**Status:** done

**What to build:** The agent console no longer covers Johann's photo. The separate portrait card is gone; the console gets a header strip with his pixel avatar, his name and the caption "builds agents like this one ↓", above the existing fixline replay. Crop the AI-generator ✦ watermark out of `johann-pixel3.png` (also the og:image).

**Decided by prototype:** branch `prototype/hero-portrait`, variant V2 (chosen over V1 smaller portrait + console below, and V3 nudged overlap).

- [x] Hero renders one console, no portrait card; the console's top strip shows the avatar (alt text names Johann), "Johann Layug" and "builds agents like this one ↓"
- [x] The console header still labels the run as a fixline replay
- [x] No ✦ watermark in the portrait image
- [ ] Stacks cleanly on a phone (by-eye check pending)
- [x] Spec hero line updated to describe this layout
