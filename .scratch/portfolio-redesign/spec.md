# Portfolio redesign

Status: ready-for-agent

Terms (Recruiter, Project, Featured Project, Project status, Pixel art, Win98 chrome) are defined in `GLOSSARY.md`.

## Problem Statement

Johann is looking for Forward Deployed Engineer (FDE) and Agentic Engineering roles, and his portfolio works against him.

- It looks dated: the Win98 chrome (grey bevelled windows, `.exe` title bars, fake File/Edit/View menus) reads as 1998, not as a modern engineer who still loves Pixel art.
- It lists outdated bootcamp Projects (ApplyFlow, JavaSip, Food Delivery API, Ecommerce-API, Nordic, TechHub) in a sideways-scrolling row. None of them shows agent work, so a Recruiter scanning for FDE fit finds nothing relevant.
- The hero tagline ("Full Stack Web Developer • Designer • Creator") says nothing about agents or working with clients.
- Some of it is broken:
  - The contact form sends blank messages because its inputs aren't connected to the form data.
  - The social links go to generic homepages (github.com, linkedin.com).
  - One Project links to localhost, and another links to the wrong repo.
  - The browser tab says "Vite App".
  - Project ids are duplicated.
- The Tools section lists editor and bootcamp tooling (Sublime, Postman, Bootstrap), several icons have wrong labels, and none of the agent tooling appears.

## Solution

A redesigned single page that tells a Recruiter "agentic engineer who ships for real users" within seconds. It keeps the Pixel art identity and drops the Win98 chrome. The visual direction is prototype Variant **A1 "Agent Console"** (branch `prototype/ui-direction`, `?variant=A1`).

- **Look:**
  - Dark background, one bright green accent and a secondary amber.
  - A pixel display font for headings, a pixel label font for small tags, a clean sans for body text, and a monospace font for the console.
  - Hard offset shadows, notched (stepped) corners, no rounded corners.
- **Hero:**
  - On the left: a status pill ("Open to FDE & Agentic Engineering roles"), the headline *"I build AI agents that survive contact with real users."*, a sub-line about shipping LLM tools end to end, a "See the work" button, and icon links (GitHub, LinkedIn, Email).
  - On the right: a large pixel portrait card with a hard accent shadow, and an **agent console** overlapping its bottom-left corner. The console loops a trimmed **real fixline replay**.
  - Behind the hero, pixels drift slowly upward. They don't move when the visitor prefers reduced motion.
- **Selected work:** three Projects as alternating case-study rows. Each row has an index number, title, pitch, Problem / Approach / Outcome, tech tags, Live/Code links and a screenshot (or a terminal card).
- **About + Stack:** a 3–4 sentence About paragraph, then text-chip groups:
  - **Agents:** Claude Code, tool use, evals, traces, Groq / Claude / OpenAI APIs
  - **Product:** TypeScript, Next.js, Vue, Python, Django, Postgres
  - **Ship:** Vercel, GitHub Actions, Docker
- **Contact:** the fixed contact form, plus one-click Email / LinkedIn / GitHub buttons and the line "Philippines (UTC+8) · Open to remote".
- **Fixes:** real social links (Instagram dropped), a real page title, meta description and Open Graph tags. Bootstrap is removed.

## User Stories

1. As a Recruiter, I want to see within seconds what roles Johann is targeting, so that I can decide whether to keep reading.
2. As a Recruiter, I want a headline that names what he builds (AI agents for real users), so that I can match him to an FDE or Agentic Engineering requisition.
3. As a Recruiter, I want a visible "open to roles" status, so that I know he is actively available.
4. As a Recruiter, I want to see his location and time zone, so that I can judge remote-work overlap.
5. As a Recruiter, I want a memorable visual identity (pixel portrait, Pixel art accents), so that I remember his profile among dozens.
6. As a Recruiter, I want the page to look modern and polished, so that I trust his frontend judgement.
7. As a Recruiter, I want a live-looking agent console in the hero, so that I instantly understand he works on agents.
8. As a hiring engineer, I want the console to replay a real agent run from one of his Projects, so that the hero is evidence rather than decoration.
9. As a hiring engineer, I want the console to be labelled as a replay, so that I am not misled into thinking it's a live system.
10. As a visitor with reduced-motion preferences, I want the background and console to not animate, so that the page is comfortable to use.
11. As a Recruiter, I want a "See the work" button in the hero, so that I can jump straight to the Projects.
12. As a Recruiter, I want icon links to his GitHub, LinkedIn and email in the hero, so that I can reach his profiles in one click.
13. As a Recruiter, I want each social link to go to his actual profile, so that I don't land on a generic homepage.
14. As a Recruiter, I want to see a few strong Projects rather than many weak ones, so that I can assess quality quickly.
15. As a Recruiter, I want the most relevant Projects shown first and given visual priority (Featured Projects), so that I see his best work without scrolling far.
16. As a hiring manager, I want each Project framed as Problem → Approach → Outcome, so that I can judge how he works with a user's problem end to end.
17. As a hiring manager, I want a one-line pitch per Project, so that I can understand it before reading details.
18. As a hiring manager, I want tech tags per Project, so that I can match his experience to our stack.
19. As a Recruiter, I want to see whether a Project is Shipped or In progress, so that I understand its maturity honestly.
20. As a hiring manager, I want In-progress Projects to state only verified results, so that I can trust the claims on the page.
21. As a Recruiter, I want a Live link where a demo exists, so that I can try the Project without setup.
22. As a hiring engineer, I want a Code link where the repo is public, so that I can read the code and its ADRs.
23. As a Recruiter, I never want to click a link that leads to a 404 or a private repo, so that the portfolio feels trustworthy.
24. As a Recruiter, I want a screenshot (or a terminal-style card for CLI tools) per Project, so that I can picture what it does.
25. As a hiring manager, I want to see that availability-runs was built for a real client and that fixline is its agent sequel, so that I can see a forward-deployed story arc.
26. As a hiring manager, I want sandcastle-pro to credit the tool it builds on (Sandcastle), so that I can see he's honest about attribution.
27. As a Recruiter, I want a short About paragraph on how he works with clients and agents, so that I get a sense of his approach.
28. As a Recruiter, I want his stack grouped into Agents / Product / Ship, so that I can scan for the skills I'm screening for.
29. As a Recruiter, I want a contact form that actually delivers my name, email and message, so that I can reach him from the page.
30. As a Recruiter, I want clear success or failure feedback after sending a message, so that I know whether it went through.
31. As a Recruiter, I want the form to clear after a successful send, so that I don't send duplicates by accident.
32. As a Recruiter, I want to be told to complete the "I'm not a robot" check if I haven't, so that I understand why my message wasn't sent.
33. As a Recruiter, I want one-click Email / LinkedIn / GitHub buttons beside the form, so that I can use the channel I prefer.
34. As a Recruiter, I want a Résumé link once one exists, and no broken Résumé button before then, so that the page never promises what it can't deliver.
35. As a Recruiter on a phone, I want the layout to stack cleanly (portrait, console, case studies), so that I can review him on mobile.
36. As a Recruiter, I want a top navigation (Work / About / Contact) that scrolls smoothly to each section, so that I can move around quickly.
37. As someone sharing the link, I want a proper page title, description and preview image, so that the link looks professional in Slack, LinkedIn or email.
38. As Johann, I want to add a new Project by adding one data entry, so that I can grow the portfolio without touching layout code.
39. As Johann, I want to change a Project's status from In progress to Shipped in the data alone, so that the badge and wording update.
40. As Johann, I want a Project with no Live or Code link to show only its case study, so that I can list client work whose repo stays private.
41. As Johann, I want no Win98 chrome left on the page, so that the site reads as modern Pixel art.
42. As Johann, I want the build free of Bootstrap, so that no framework base styles fight the new design.

## Implementation Decisions

**Page composition**
- The page is a single Vue 3 + Vite page. Its sections are Nav → Hero (with Agent Console and Pixel Background) → Selected Work → About + Stack → Contact → Footer.
- Each section is its own scoped Vue component. The current Navbar, Hero, Projects, Project card, Tools, Contact and Footer components are replaced or rewritten. Projects and Tools are superseded by Selected Work and About + Stack.
- The root page component accepts an optional `projects` prop. By default it uses the Project data module. This makes the page the single test seam (see Testing Decisions).

**Design tokens**
- Shared design tokens are defined once as CSS custom properties:
  - background `#0b0d12`, panel `#12161f`, line `#262c3b`, text `#e8ebf3`, muted `#8a93ab`, accent `#7cff6b`, secondary accent `#ffb84d`
  - fonts: Pixelify Sans (headings), Silkscreen (labels), Inter (body), JetBrains Mono (console and tags)
  - the hard offset shadow and the notched-corner shape
- Components use these tokens instead of hard-coded values.
- Bootstrap (CSS and JS) is removed as a dependency. The navigation is reimplemented without Bootstrap's collapse script.
- No Win98 chrome remains. The Win98 classes and leftover styles in the global stylesheet are deleted.

**Project data module**
- This is the single source of Project content. Shape (from the prototype, trimmed):

  ```js
  {
    id: 'fixline',                 // unique
    title: 'fixline',
    pitch: '…one line…',
    problem: '…', approach: '…', outcome: '…',
    tags: ['TypeScript', 'Agents', 'Evals'],
    status: 'shipped' | 'in-progress',
    live: 'https://…' | '',        // empty = no Live link rendered
    repo: 'https://…' | '',        // empty = no Code link rendered
    img: '/images/…' | '',         // empty = terminal-style card
    featured: true | false,
  }
  ```
- The order in the data is the display order. Featured Projects are listed first.
- Launch content, in this order:
  1. **fixline**: featured, in progress. Live: fixline-phi.vercel.app. Repo: public, github.com/layugjohann/fixline. Problem/Approach/Outcome come from its README: messy tenant messages → triaged work orders; the agent proposes, deterministic code applies; rules, not the model's confidence, route work to human review; golden-scenario evals, including prompt injection; replayable traces; $0 to run on free tiers.
  2. **availability-runs**: featured, in progress. Live: availability-runs.vercel.app. Repo: none (private client work). Built for a real client. Rules live in code, and the LLM is used only for judgement (fuzzy matching, exceptions). Every change is a proposal the client approves. Outcome, exactly in substance: *"Running end to end on a mirrored practice Trello with fictional data. Evals track wrong matches separately (target: zero). Real-data rollout pending client approval."* Framed as the predecessor that fixline is the agent sequel to.
  3. **sandcastle-pro**: shipped. Repo: public, github.com/layugjohann/sandcastle-pro. No Live link. A Sandcastle preset (credit `@ai-hero/sandcastle`) that fits autonomous coding runs into a Claude Pro/Max usage window. Spec + Issues; each Issue on its own branch goes through an implementer agent, a review session, and gate commands. Agents never merge, and paused Issues resume in the next window.
- Rules:
  - Every Project in the data has at least one public link.
  - No placeholder text (`[?]`) may ship. An unknown Outcome is cut back to what is verified.
  - The old Project data and its now-unused images are removed.

**Selected Work**
- Renders Projects as alternating case-study rows (the screenshot side alternates). On narrow screens, rows stack.
- In-progress Projects show an "In progress" badge next to the title.
- Live/Code links render only when their value is non-empty and open in a new tab.
- A Project without an image renders a pixel-styled terminal card. For sandcastle-pro, it shows a short illustrative run.
- Screenshots for fixline and availability-runs are captured from their live demos and stored as static images.

**Agent Console**
- Loops a trimmed **real fixline replay**: message in → tool calls → Proposal → review routing. It is bundled as static data in the site; it is not fetched from fixline at runtime.
- The console header labels it as a replay of fixline.
- Lines appear one at a time on a timer, and the console restarts after the last line.
- With reduced motion, all lines show at once and nothing animates.

**Pixel Background**
- A canvas behind the hero only, with pixels drifting slowly upward and twinkling, on an 8px grid.
- Pauses or renders once under reduced motion.
- Must not throw when no 2D context is available (test environment).
- Cleans up its animation frame and listeners when unmounted.

**Contact**
- The form's name, email and message fields are bound to component state.
- Submit is blocked with an error toast when the reCAPTCHA token is missing.
- On success it posts JSON to Web3Forms (access key, subject, name, email, message), shows a success toast, clears the fields and resets reCAPTCHA.
- On failure it shows an error toast.
- Submit is disabled while sending.
- Beside the form: Email (mailto: layugjohann@gmail.com), LinkedIn (https://www.linkedin.com/in/johannlayug/) and GitHub (https://github.com/layugjohann) buttons, plus the location line.

**Navigation and links**
- Nav has a `johann.layug` wordmark and Work / About / Contact anchors with smooth scrolling.
- A Résumé link appears in the nav and hero only when a résumé URL is configured. None exists at launch, so it is hidden.
- Social links appear in one place (person/site config) and are shared by the hero and Contact. Instagram is removed.

**Document head**
- Real `<title>` (for example "Johann Layug — Forward Deployed & Agentic Engineer"), a meta description, Open Graph and Twitter card tags with a preview image, and `lang="en"`.

**Repo hygiene (separate commit)**
- Add a `.gitignore` for `node_modules`, `dist`, `.DS_Store` and `.env*`.
- Untrack `node_modules` and `.DS_Store`.
- Delete the stray duplicate `esbuild 2` binary.

## Testing Decisions

- **One seam: the whole page.** Vitest with Vue Test Utils in jsdom mounts the root page component, passing fixture Projects through its `projects` prop (the real data is the default). Tests assert only what a visitor would see or what leaves the page (rendered text, links, attributes, the outgoing request). They never assert internal state, component structure or CSS.
- There is no prior art: the repo currently has no tests. This spec adds Vitest, Vue Test Utils and jsdom as dev dependencies and a `test` script.
- Behaviours under test:
  - Projects render in data order, and Featured Projects come first.
  - An in-progress Project shows the "In progress" badge, and a shipped one doesn't.
  - An empty `live` or `repo` renders no corresponding link. A Project with neither renders no link buttons. Non-empty links point to the right URL and open in a new tab.
  - A Project without `img` renders the terminal card instead of an image.
  - The real Project data satisfies the content rules: unique ids, at least one public link per Project, and no `[?]` placeholder text.
  - Social links point to the real GitHub / LinkedIn / email, and no Instagram link exists.
  - The Résumé link is absent when no résumé URL is configured.
  - Contact: submitting without a reCAPTCHA token sends no request and shows an error. With a stubbed reCAPTCHA token and a stubbed fetch, typing name/email/message and submitting sends a request whose body contains exactly those values. On success the fields clear. On a failed response an error is shown.
  - Reduced motion: with `prefers-reduced-motion: reduce` stubbed, the page mounts without errors and the console shows all replay lines immediately.
  - The page mounts without errors when canvas has no 2D context.
- The external boundaries stubbed in tests are `fetch` (Web3Forms), `window.grecaptcha`, `matchMedia`, and canvas `getContext`.
- Visual design (fidelity to A1) is not automated. It is reviewed by eye against the prototype branch, at desktop and phone widths.

## Out of Scope

- A résumé PDF. The link stays hidden until Johann adds one.
- A fourth Project. Johann is building a new one, to be added later as a data entry. There is no "coming soon" slot.
- Mac Storage Tracker, invoice-reconciler and all the old bootcamp Projects.
- An experience timeline or work-history section.
- Variants B (Bento), C (Level Select), A2 and A3, the cursor-reactive grid, and any Win98 chrome or easter egg.
- Changes to fixline, availability-runs or sandcastle-pro themselves (READMEs, demos, repo visibility).
- Blog or write-up pages, analytics, and a dark/light theme toggle (the site is dark-only).
- Changing the hosting or deploy setup (Vercel).

## Further Notes

- The prototype lives on branch `prototype/ui-direction` (uncommitted at the time of writing; commit it there before implementation starts). It is the visual reference only. Rebuild the code properly rather than promoting it.
- availability-runs becomes Shipped (and gets a real-number Outcome) once the client uses it on real data. That will be a data-only change.
- The portrait asset is the existing pixel portrait. Render it with pixelated image scaling at its larger size.
- Johann's recruiter-presence follow-ups (GitHub pins and profile README, LinkedIn headline alignment, demo videos) are separate from this site work.
