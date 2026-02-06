import { PromptDimensions } from './dimension'

export function scorePrompt(prompt: string) {
  const dimensions: PromptDimensions = {
    action: detectAction(prompt),
    context: detectContext(prompt),
    objective: detectObjective(prompt),
    validation: detectValidation(prompt),
    scope: detectScope(prompt)
  }

  const score = Object.values(dimensions)
    .filter(Boolean).length * 2

  const missing = Object.entries(dimensions)
    .filter(([_, value]) => !value)
    .map(([key]) => key)

  return {
    score,
    dimensions,
    missing
  }
}

/* ---- detectors ---- */

function detectAction(text: string): boolean {
  return /(how|can i|implement|create|move|refactor|explain)/i.test(text)
}

function detectContext(text: string): boolean {
  return /(flutter|react|node|backend|frontend|api|database|theme)/i.test(text)
}

function detectObjective(text: string): boolean {
  return /(so that|because|to improve|for scalability|for maintainability)/i.test(text)
}

function detectValidation(text: string): boolean {
  return /(recommended|best practice|correct approach|right way)/i.test(text)
}

function detectScope(text: string): boolean {
  return /(architecture|global|app-wide|system-wide|design pattern)/i.test(text)
}