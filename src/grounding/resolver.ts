import { EditorContext } from './grounder'
import { Slot } from './detector'

interface ResolveResult {
  changed: boolean
  prompt: string
  reasons: string[]
}

export function resolveSlots(
  originalPrompt: string,
  missing: Slot[],
  context: EditorContext
): ResolveResult {

  let prompt = originalPrompt.trim()
  const reasons: string[] = []
  let changed = false

  if (missing.includes('location') && context.fileName) {
    prompt = `In the file ${context.fileName}, ${prompt}`
    reasons.push('Grounded location using active file')
    changed = true
  }

  if (missing.includes('entity') && context.selectionText) {
    prompt += ' Update the selected code.'
    reasons.push('Grounded entity using selection')
    changed = true
  }

  if (missing.includes('expectation')) {
    prompt += ' Only modify what is necessary.'
    reasons.push('Grounded expectation safely')
    changed = true
  }

  return { changed, prompt, reasons }
}