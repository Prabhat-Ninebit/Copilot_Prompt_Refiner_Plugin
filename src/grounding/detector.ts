/**
 * Abstract ambiguity slots
 */
export type Slot = 'location' | 'entity' | 'expectation'

/**
 * Detect which grounding slots are missing
 */
export function detectUngroundedSlots(prompt: string): Slot[] {
  const slots: Slot[] = []

  if (!mentionsLocation(prompt)) slots.push('location')
  if (!mentionsEntity(prompt)) slots.push('entity')
  if (!mentionsExpectation(prompt)) slots.push('expectation')

  return slots
}

/* -------------------- heuristics -------------------- */
/* These are deliberately minimal and domain-agnostic */

function mentionsLocation(text: string): boolean {
  return /\b(file|component|module|class|function)\b/i.test(text)
}

function mentionsEntity(text: string): boolean {
  return /\b(color|function|method|logic|variable|component)\b/i.test(text)
}

function mentionsExpectation(text: string): boolean {
  return /\b(return|respond|output|only|update|modify)\b/i.test(text)
}