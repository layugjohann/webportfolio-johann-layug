// PROTOTYPE — throwaway. Shared placeholder data for the UI-direction variants.
// Projects 2 and 3 are placeholders until the real projects are supplied.

export const person = {
  name: 'Johann Layug',
  short: 'Johann',
  role: 'Forward Deployed / Agentic Engineer',
  headline: 'I build AI agents that survive contact with real users.',
  sub: 'Full-stack engineer shipping LLM-powered tools end to end — from the customer conversation to the deployed agent.',
  status: 'Open to FDE & Agentic Engineering roles',
  location: 'Philippines · Remote-friendly',
  portrait: '/images/johann-pixel3.png',
  links: [
    { label: 'GitHub', href: '#', icon: '/images/github.png' },
    { label: 'LinkedIn', href: '#', icon: '/images/linkedin-pixel.png' },
    { label: 'Email', href: '#', icon: '/images/gmail.png' },
  ],
  stack: ['Python', 'TypeScript', 'Vue', 'Django', 'Node', 'Postgres', 'Docker', 'LLM APIs', 'Tool use', 'Evals'],
}

export const projects = [
  {
    id: 'fixline',
    title: 'fixline',
    pitch: 'An AI agent that turns messy tenant messages into triaged work orders, with human review, evals and replayable traces.',
    problem: 'A property manager runs maintenance on Trello. Tenant messages are messy: two problems in one text, three texts about the same leak, emergencies mixed with "when is rent due?".',
    approach: 'The agent reads each message and proposes board changes. It never writes: deterministic code validates and applies. Fixed rules, not model confidence, decide what goes to a human.',
    outcome: 'Golden-scenario evals (incl. prompt-injection) scored across models; every run replayable step by step. $0 to run on free tiers.',
    tags: ['TypeScript', 'Agents', 'Evals', 'Trello'],
    status: 'in-progress',
    live: 'https://fixline-phi.vercel.app', repo: 'https://github.com/layugjohann/fixline', img: '', featured: true,
  },
  {
    id: 'availability-runs',
    title: 'availability-runs',
    pitch: 'Built for a real client: reconciles sales reports against Trello product cards and proposes availability updates.',
    problem: 'A client checked product availability by hand: read a sales report, find each product’s Trello card, decide its status, move it. Names and SKUs rarely lined up.',
    approach: 'Availability rules live in plain code. The LLM is used only for judgement — fuzzy matching rows to cards and investigating exceptions — and every change is a proposal the client approves.',
    outcome: '[?] Time saved per run. Evals track wrong matches separately (target: zero).',
    tags: ['Next.js', 'TypeScript', 'Groq', 'Trello API', 'Evals'],
    status: 'shipped',
    live: 'https://availability-runs.vercel.app', repo: '', img: '', featured: true,
  },
  {
    id: 'sandcastle-pro',
    title: 'sandcastle-pro',
    pitch: 'A Sandcastle preset that fits autonomous coding runs into a Claude Pro usage window.',
    problem: 'Autonomous coding agents assume an API budget; Claude Pro/Max users hit usage limits mid-run.',
    approach: 'Plan a feature as a Spec + Issues. Each Issue runs on its own branch: implementer agent, review session, then your test/typecheck/lint gates. Agents never merge; paused Issues resume next window.',
    outcome: '[?] Outcome — e.g. used to build availability-runs.',
    tags: ['TypeScript', 'Claude Code', 'Agents', 'CLI'],
    status: 'shipped',
    live: '', repo: '', img: '', featured: false,
  },
  {
    id: 'mac-storage-tracker',
    title: 'Mac Storage Tracker',
    pitch: 'A tiny macOS menu-bar app that shows your disk usage at a glance.',
    problem: '[?] Problem.',
    approach: '[?] Approach.',
    outcome: '[?] Outcome.',
    tags: ['macOS', 'Shell'],
    status: 'shipped',
    live: '', repo: '', img: '', featured: false,
  },
]
