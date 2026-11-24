// The single source of Project content. The order here is the display order:
// Featured Projects first. See GLOSSARY.md for Project, Featured Project and
// Project status.
//
// Shape:
//   id, title, pitch, problem, approach, outcome  strings; id is unique
//   tags      string[]
//   status    'shipped' | 'in-progress'
//   live      URL, or '' for no Live link
//   repo      URL, or '' for no Code link (e.g. private client work)
//   img       '/images/projects/<id>.webp' (1600px wide), or '' to show a
//             terminal card instead
//   video     optional '/videos/<id>.mp4': a Demo video, played from the
//             screenshot (needs img). H.264, 1080px tall, CRF ~28, +faststart,
//             no audio. Leave it out until the recording exists.
//   run       optional string[]: the terminal card's illustrative lines
//   featured  boolean
//
// Rules: every Project has at least one public link, and no placeholder text
// ships; an unverified Outcome is cut back to what is verified.
export const projects = [
  {
    id: 'retail-ops-agent',
    title: 'retail-ops-agent',
    pitch:
      "Three AI agents turn a retailer's messy daily CSV uploads into trusted BI data, then into investigated, tiered actions, with a human approving anything that costs money.",
    problem:
      'At a multi-channel retailer, someone spends every morning fixing CSV headers and chasing store managers, while the inventory planner works out stock cover in a spreadsheet and keys reorders into the ERP by hand. I took the problem from a real FDE job posting.',
    approach:
      'A fixed pipeline, with no LLM supervisor: an Intake agent validates and safely fixes uploads, statistics flag anomalies, an Analyst agent investigates them, and an Ops agent proposes actions. A rule table, not model confidence, decides which actions run and which wait for approval. The ERP is behind an MCP server.',
    outcome:
      "A live demo replays recorded Ops Days with no wait and no API key. Golden-scenario evals with exact ground truth require 100% on 'no reorder without approval', including prompt injections planted in uploads. It costs $0 to run on free-tier models.",
    tags: ['Python', 'Pydantic AI', 'Agents', 'MCP', 'Evals', 'DuckDB'],
    status: 'shipped',
    live: 'https://cobalt-home-ops.streamlit.app/',
    repo: 'https://github.com/layugjohann/retail-ops-agent',
    img: '/images/projects/retail-ops-agent.webp',
    video: '/videos/retail-ops-agent.mp4',
    featured: true,
  },
  {
    id: 'fixline',
    title: 'fixline',
    pitch:
      'An AI agent that turns messy tenant messages into triaged work orders, with human review, evals and replayable traces.',
    problem:
      'A property manager runs maintenance on a Trello board, and tenant messages are messy: two problems in one text, three texts about the same leak, emergencies mixed in with "when is rent due?".',
    approach:
      'The agent reads each message with read-only tools and proposes board changes; deterministic code validates and applies them. Fixed rules, not the model’s confidence, decide what goes to a human for review.',
    outcome:
      'Golden-scenario evals, including prompt-injection cases, scored by rule-based graders and compared across models. Every run is replayable step by step, and it costs $0 to run on free tiers.',
    tags: ['TypeScript', 'Next.js', 'Agents', 'Evals', 'Trello'],
    status: 'in-progress',
    live: 'https://fixline-phi.vercel.app',
    repo: 'https://github.com/layugjohann/fixline',
    img: '/images/projects/fixline.webp',
    run: [
      '$ npm run eval -- --tag prompt-injection',
      '› sending golden scenarios through Intake',
      '› grading with rule-based graders',
      '› writing scorecard.json + one trace per scenario',
    ],
    featured: true,
  },
  {
    id: 'availability-runs',
    title: 'availability-runs',
    pitch:
      'Built for a real client: reconciles sales reports against Trello product cards and proposes availability updates. The predecessor that fixline is the agent sequel to.',
    problem:
      'A client checked product availability by hand: read a sales report, find each product’s Trello card, decide its status, move it. Product names and SKUs rarely lined up.',
    approach:
      'The availability rules live in plain code. The LLM is used only for judgement (fuzzy-matching report rows to cards and investigating exceptions), and every change is a proposal the client approves.',
    outcome:
      'Running end to end on a mirrored practice Trello with fictional data. Evals track wrong matches separately (target: zero). Real-data rollout pending client approval.',
    tags: ['Next.js', 'TypeScript', 'Groq', 'Trello API', 'Evals'],
    status: 'in-progress',
    live: 'https://availability-runs.vercel.app',
    repo: '',
    img: '/images/projects/availability-runs.webp',
    run: [
      '› sales report in',
      '› rules in code decide availability',
      '› LLM only for judgement: fuzzy matches, exceptions',
      '› every change is a proposal the client approves',
    ],
    featured: false,
  },
  {
    id: 'sandcastle-pro',
    title: 'sandcastle-pro',
    pitch:
      "A preset for Sandcastle (@ai-hero/sandcastle) built for Claude Pro subscribers: it fits autonomous coding runs into Pro's 5-hour usage window.",
    problem:
      'Autonomous coding agents assume an API budget. On Claude Pro, a couple of plan → implement → review → merge cycles use up the 5-hour limit, and the run stops mid-Issue.',
    approach:
      'Plan a feature as a Spec and Issues. Each Issue runs on its own branch through an implementer agent, a review session, then your gate commands (tests, typecheck, lint). Agents never merge, and an Issue paused at the usage limit resumes in the next window.',
    outcome:
      'Shipped as a CLI: `sandcastle-pro init` sets up a repo, and `sandcastle-pro run` works through ready Issues, leaving each finished one as a branch or Pull Request for review.',
    tags: ['TypeScript', 'Claude Code', 'Agents', 'CLI'],
    status: 'shipped',
    live: '',
    repo: 'https://github.com/layugjohann/sandcastle-pro',
    img: '',
    run: [
      '$ sandcastle-pro run --count 2',
      '› issue/03-parse-config  implementer → review → gate ✓',
      '  awaiting-merge: pull request opened',
      '› issue/04-retry-limits  implementer …',
      '  usage limit reached: paused, resumes next run',
    ],
    featured: false,
  },
]
