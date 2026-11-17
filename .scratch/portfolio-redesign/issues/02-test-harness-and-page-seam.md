# 02: Test harness and the page seam

**What to build:** Prep work: the page can be mounted in a test with fixture Projects, and the outside services are faked. The visible site doesn't change. This sets up the single page-level test seam from the spec (Testing Decisions).

**Blocked by:** 01

**Status:** ready-for-agent

- [ ] Vitest, Vue Test Utils and jsdom are dev dependencies, and `npm test` runs the suite
- [ ] The root page component accepts an optional `projects` prop, which defaults to the Project data module
- [ ] A shared test setup fakes `fetch`, `window.grecaptcha`, `matchMedia` and canvas `getContext`
- [ ] A smoke test mounts the whole current page without errors
- [ ] Tests assert only what a visitor sees or what leaves the page, never internal state or CSS
