import * as vscode from 'vscode'
import { EditorContext } from './grounder'

export function extractEditorContext(
  editor: vscode.TextEditor
): EditorContext {

  const document = editor.document
  const selection = editor.selection

  return {
    fileName: document.fileName.split(/[\\/]/).pop(),
    languageId: document.languageId,
    selectionText: selection.isEmpty
      ? undefined
      : document.getText(selection)
  }
}