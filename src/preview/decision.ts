import * as vscode from 'vscode'

export async function promptDecision(): Promise<'accept' | 'reject' | undefined> {
  const choice = await vscode.window.showQuickPick(
    [
      { label: '✅ Accept refined prompt', value: 'accept' },
      { label: '❌ Use original prompt', value: 'reject' }
    ],
    { placeHolder: 'Apply prompt refinement?' }
  )

  return choice?.value as any
}