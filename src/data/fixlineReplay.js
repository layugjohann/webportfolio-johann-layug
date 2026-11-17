// A trimmed fixline replay, bundled as static data for the hero's agent console.
// Source: fixline's replays/emergency-burst-pipe.json (github.com/layugjohann/fixline).
// fixline records its replays as scripted samples (mock model), in its real trace format.
// Trimmed to the steps a visitor can follow: message in → tool calls → Proposal → review routing.
// Nothing is fetched from fixline at runtime.
export const fixlineReplay = {
  id: 'emergency-burst-pipe',
  lines: [
    { kind: 'message', text: 'Priya Nair: "HELP the pipe under my bathroom sink just burst, water is spraying everywhere…"' },
    { kind: 'tool', text: 'lookUpSender("priya.nair@example.com") → Quay Court · Unit 101' },
    { kind: 'think', text: 'Water spraying and flooding is a risk to property: emergency.' },
    { kind: 'tool', text: 'searchOpenWorkOrders(unit 101, "pipe") → 0 open' },
    { kind: 'proposal', text: 'create "Burst pipe under bathroom sink, flooding" · plumbing · emergency' },
    { kind: 'route', text: 'apply-and-flag (rule: emergency) → applied, flagged for a Coordinator' },
  ],
}
