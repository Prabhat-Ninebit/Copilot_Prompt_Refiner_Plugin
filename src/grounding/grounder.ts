import * as vscode from 'vscode'
import { extractEditorContext } from './context'
import { detectUngroundedSlots } from './detector'
import { resolveSlots } from './resolver'

/**
 * Editor facts used for grounding
 */
export interface EditorContext {
  fileName?: string
  languageId?: string
  selectionText?: string
  symbolName?: string
}

/**
 * Result returned to the extension layer
 */
export interface GroundingResult {
  grounded: boolean
  refinedPrompt: string
  reasons: string[]
}

/**
 * Main grounding entry point
 */
export function groundPrompt(
  rawPrompt: string,
  editor: vscode.TextEditor
): GroundingResult {

  const context = extractEditorContext(editor)
  const missingSlots = detectUngroundedSlots(rawPrompt)

  if (missingSlots.length === 0) {
    return {
      grounded: false,
      refinedPrompt: rawPrompt,
      reasons: ['Prompt already grounded']
    }
  }

  const resolved = resolveSlots(rawPrompt, missingSlots, context)

  if (!resolved.changed) {
    return {
      grounded: false,
      refinedPrompt: rawPrompt,
      reasons: ['Not enough editor context to ground safely']
    }
  }

  return {
    grounded: true,
    refinedPrompt: resolved.prompt,
    reasons: resolved.reasons
  }
}