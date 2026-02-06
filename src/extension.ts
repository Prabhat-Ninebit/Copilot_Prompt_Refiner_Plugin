import * as vscode from 'vscode'
import { groundPrompt } from './grounding'
import { showPromptDiff } from './preview/diffPreview'
import { promptDecision } from './preview/decision'

export function activate(context: vscode.ExtensionContext) {

  const disposable = vscode.commands.registerCommand(
    'copilotPromptRefiner.refinePrompt',
    async () => {

      const editor = vscode.window.activeTextEditor
      if (!editor) {
        vscode.window.showErrorMessage('No active editor')
        return
      }

      // 1️⃣ Ask user for raw prompt
      const rawPrompt = await vscode.window.showInputBox({
        prompt: 'Enter your Copilot prompt'
      })

      if (!rawPrompt) return

      // 2️⃣ Run grounding engine
      const result = groundPrompt(rawPrompt, editor)

      // 3️⃣ If no grounding needed → short-circuit
      if (!result.grounded) {
        vscode.window.showInformationMessage(
          'Prompt is already well-grounded'
        )
        await vscode.env.clipboard.writeText(rawPrompt)
        return
      }

      // 4️⃣ Show diff-style preview
      await showPromptDiff(rawPrompt, result.refinedPrompt)

      // 5️⃣ Ask for Accept / Reject
      const decision = await promptDecision()
      if (!decision) return

      const finalPrompt =
        decision === 'accept'
          ? result.refinedPrompt
          : rawPrompt

      // 6️⃣ Copy chosen prompt to clipboard
      await vscode.env.clipboard.writeText(finalPrompt)

      vscode.window.showInformationMessage(
        'Prompt copied. Paste it into Copilot Chat.'
      )
    }
  )

  context.subscriptions.push(disposable)
}

export function deactivate() {}