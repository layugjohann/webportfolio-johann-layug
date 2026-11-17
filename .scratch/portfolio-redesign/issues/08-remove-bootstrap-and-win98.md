# 08: Remove Bootstrap and leftover Win98 styles

**What to build:** Clean-up once every section is new. Bootstrap and all Win98 leftovers are gone, the page looks like A1 at every width, and nothing old remains.

**Blocked by:** 04, 05, 06, 07

**Status:** ready-for-agent

- [ ] Bootstrap is removed: CSS, JS, and the dependency
- [ ] The phone navigation works without Bootstrap's collapse script
- [ ] The Win98 classes and other leftover global styles are deleted, and any unused old components and images are removed
- [ ] The prototype styles are not present on `main`
- [ ] `npm test` and `npm run build` pass
- [ ] A check by eye against `prototype/ui-direction?variant=A1` at desktop and phone widths, with no horizontal scroll on phones
