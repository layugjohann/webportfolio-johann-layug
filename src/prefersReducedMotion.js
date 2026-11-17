// Whether the visitor asked the OS for reduced motion. False where matchMedia is unavailable.
export function prefersReducedMotion() {
  return Boolean(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches)
}
