# 08: Remove Bootstrap and leftover Win98 styles

**What to build:** Clean-up once every section is new. Bootstrap and all Win98 leftovers are gone, the page looks like A1 at every width, and nothing old remains.

**Blocked by:** 04, 05, 06, 07

**Status:** ready-for-human

- [x] Bootstrap is removed: CSS, JS, and the dependency
- [x] The phone navigation works without Bootstrap's collapse script
- [x] The Win98 classes and other leftover global styles are deleted, and any unused old components and images are removed
- [x] The prototype styles are not present on `main`
- [x] `npm test` and `npm run build` pass
- [ ] A check by eye against `prototype/ui-direction?variant=A1` at desktop and phone widths, with no horizontal scroll on phones

## Comments

- Code work done: Bootstrap and its imports removed, the Vue starter leftovers deleted (base.css, logo.svg, icons/*) and unused images removed (background.png, contactme.gif, instagram-pixel.png, nodejs.png). `main.css` is now a small reset that replaces the parts of Bootstrap's reboot the page relied on. The nav wraps instead of overflowing on narrow phones.
- Left for the human: the by-eye check against A1 at desktop and phone widths. Look closely at the Contact reCAPTCHA at about 360px: the widget is 304px wide in a form about 278px wide, so `.recaptcha { overflow: hidden }` clips its right edge. This was already the case before this issue.
