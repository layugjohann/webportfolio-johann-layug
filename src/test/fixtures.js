// A fixture Project in the Project data shape (see src/data/projects.js).
// Pass only the fields a test cares about.
export const fixtureProject = (overrides = {}) => ({
  id: 'fixture',
  title: 'Fixture',
  pitch: 'A fixture pitch.',
  problem: 'A fixture problem.',
  approach: 'A fixture approach.',
  outcome: 'A fixture outcome.',
  tags: ['Vue'],
  status: 'shipped',
  live: 'https://example.com/live',
  repo: 'https://github.com/example/repo',
  img: '',
  featured: false,
  ...overrides,
})
