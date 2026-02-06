import * as vscode from 'vscode'

export async function showPromptDiff(
  original: string,
  refined: string
) {
  const originalUri = vscode.Uri.parse(
    'prompt-refiner:original.prompt'
  )
  const refinedUri = vscode.Uri.parse(
    'prompt-refiner:refined.prompt'
  )

  const provider = new PromptDocumentProvider(original, refined)

  vscode.workspace.registerTextDocumentContentProvider(
    'prompt-refiner',
    provider
  )

  await vscode.commands.executeCommand(
    'vscode.diff',
    originalUri,
    refinedUri,
    'Copilot Prompt Refinement'
  )
}

class PromptDocumentProvider
  implements vscode.TextDocumentContentProvider {

  constructor(
    private original: string,
    private refined: string
  ) {}

  provideTextDocumentContent(uri: vscode.Uri): string {
    return uri.path.includes('original')
      ? this.original
      : this.refined
  }
}