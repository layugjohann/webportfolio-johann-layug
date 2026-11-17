# 04: Selected Work: the three Projects as case studies

**What to build:** A Recruiter scrolling to Selected Work sees three Projects as alternating case-study rows. Each row has an index, title, pitch, Problem / Approach / Outcome, tech tags, Live/Code links and a screenshot or terminal card. In-progress Projects show a badge. There are never any dead links. This replaces the old Projects section and its data.

Launch content is in the spec (Project data module):
1. fixline: featured, in progress
2. availability-runs: featured, in progress, no Code link, honest Outcome
3. sandcastle-pro: shipped, credit Sandcastle

Project data shape (from the prototype):

```js
{ id, title, pitch, problem, approach, outcome, tags: [],
  status: 'shipped' | 'in-progress', live: url|'', repo: url|'', img: path|'', featured: bool }
```

**Blocked by:** 03

**Status:** ready-for-agent

- [ ] The Project data module holds the three launch Projects in display order, with Featured Projects first
- [ ] The rows alternate the screenshot side on wide screens and stack on narrow ones
- [ ] An "In progress" badge shows for `status: 'in-progress'` only
- [ ] Live/Code links render only when non-empty and open in a new tab
- [ ] A Project without `img` renders a pixel-styled terminal card (sandcastle-pro shows a short illustrative run)
- [ ] Screenshots of fixline and availability-runs are captured from their live demos and stored as static images
- [ ] The old Projects component, the old project data and the unused old project images are removed
- [ ] Tests (with fixture Projects): display order, the badge on in-progress only, the empty-link rules (including a Project with no links at all), the terminal card when there's no image
- [ ] Tests (real data): unique ids, at least one public link per Project, no `[?]` placeholder text

## Comments

- 2026-11-17, Johann: there are no Project screenshots yet; they will be added once the redesign is finished. For this ticket, all three Projects ship with `img: ''` and render the terminal card. The screenshot checkbox is deferred, not dropped. Adding the images later is a data-only change (set `img` and drop the files in `public/images/`).
