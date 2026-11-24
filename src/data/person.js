// Who the site is about. The single source for social links, shared by the
// hero and Contact.
export const person = {
  name: 'Johann Layug',
  status: 'Open to FDE & Agentic Engineering roles',
  headline: 'I build AI agents that survive contact with real users.',
  tagline: 'Full-stack engineer shipping LLM-powered tools end to end, from the first customer conversation to the deployed agent.',
  portrait: '/images/johann-pixel3.png',
  location: 'Philippines (UTC+8) · Open to remote',
  // Built from resume/resume.html with `npm run resume`. The Résumé link renders only when this is set.
  resumeUrl: '/Johann-Layug-Resume.pdf',
  about:
    'I start where the client is: their messy inputs, their existing tools, the people who will live with the result. ' +
    'Before an agent touches real data I write the evals, so "it works" is a number, not a feeling. ' +
    'Agents propose; humans approve, with every tool call traced so a reviewer can see why. ' +
    'Then I ship it, watch it meet real users, and tighten it from there.',
  // The Stack chips, grouped so a Recruiter can scan for what they screen for.
  stack: [
    { label: 'Agents', items: ['Claude Code', 'tool use', 'evals', 'traces', 'Groq / Claude / OpenAI APIs'] },
    { label: 'Product', items: ['TypeScript', 'Next.js', 'Vue', 'Python', 'Django', 'Postgres'] },
    { label: 'Ship', items: ['Vercel', 'GitHub Actions', 'Docker'] },
  ],
  socialLinks: [
    { label: 'GitHub', href: 'https://github.com/layugjohann', icon: '/images/github.png' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/johannlayug/', icon: '/images/linkedin-pixel.png' },
    { label: 'Email', href: 'mailto:layugjohann@gmail.com', icon: '/images/gmail.png' },
  ],
}
