import { PromptDimensions } from '../scorer/dimension'

export function refinePrompt(
  prompt: string,
  missing: string[]
): string {

  let refined = prompt.trim()

  if (missing.includes('objective')) {
    refined +=
      ' The goal is to improve maintainability and scalability.'
  }

  if (missing.includes('validation')) {
    refined +=
      ' Please confirm whether this is the recommended approach.'
  }

  if (missing.includes('scope')) {
    refined +=
      ' This decision impacts the overall application architecture.'
  }

  return refined
}