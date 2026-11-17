# 03: New look, nav, hero and page head

**What to build:** A Recruiter opening the site sees the new A1 look at the top of the page:
- the `johann.layug` nav (Work / About / Contact)
- a hero with the "Open to FDE & Agentic Engineering roles" status pill, the headline *"I build AI agents that survive contact with real users."*, the sub-line and a "See the work" button
- a large pixel portrait card with a hard accent shadow
- real GitHub / LinkedIn / Email icon links

The new footer and a proper page title and sharing preview also land here. The sections below the hero are still the old ones (and still use Bootstrap) until tickets 04–07 replace them.

Reference: prototype branch `prototype/ui-direction`, `?variant=A1`. Rebuild the code; don't copy it. See the spec (Solution, Design tokens, Navigation and links, Document head).

**Blocked by:** 02

**Status:** ready-for-agent

- [ ] Design tokens (colours, fonts, hard shadow, notched corners) are defined once and used by the new components
- [ ] The fonts load: Pixelify Sans, Silkscreen, Inter, JetBrains Mono
- [ ] The nav anchors scroll smoothly to their sections
- [ ] Social links come from one shared config:
  - GitHub: https://github.com/layugjohann
  - LinkedIn: https://www.linkedin.com/in/johannlayug/
  - Email: mailto:layugjohann@gmail.com
  - no Instagram
- [ ] The Résumé link renders only when a résumé URL is configured; none is configured at launch
- [ ] The portrait is shown large with pixelated scaling
- [ ] No Win98 chrome in the nav or hero
- [ ] The page has a real `<title>`, a meta description, Open Graph and Twitter card tags, and `lang="en"`
- [ ] The hero stacks cleanly at phone width
- [ ] Tests: the social links point to the real URLs, there is no Instagram link, and there is no Résumé link
