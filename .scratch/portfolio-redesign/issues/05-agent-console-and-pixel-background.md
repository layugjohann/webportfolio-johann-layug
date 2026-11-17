# 05: Agent console and pixel background

**What to build:** The hero comes alive. An agent console overlaps the bottom-left of the portrait card and loops a trimmed **real fixline replay** (message in → tool calls → Proposal → review routing), labelled as a fixline replay. Pixels drift slowly upward behind the hero. Visitors who prefer reduced motion see everything static.

**Blocked by:** 03

**Status:** ready-for-agent

- [ ] The replay is trimmed from a real recorded fixline run (fixline's `replays/`) and bundled as static data; nothing is fetched from fixline at runtime
- [ ] The console header labels it as a fixline replay
- [ ] Lines appear one at a time on a timer, and the console loops after the last line
- [ ] The pixel background (8px grid, slow upward drift, twinkle) is behind the hero only and doesn't capture pointer events
- [ ] Reduced motion: all console lines show at once, and the background doesn't animate
- [ ] The background doesn't throw when there is no 2D context, and it cleans up its animation and listeners when unmounted
- [ ] At phone width the console sits below the portrait instead of overlapping it
- [ ] Tests: with reduced motion faked, the page mounts and every replay line is visible right away; with no canvas context, the page still mounts
