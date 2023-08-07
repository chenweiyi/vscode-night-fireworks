
import * as vscode from 'vscode';
import { gifData1, gifData2 } from './gifs';

function randomRange(start: number, end: number) {
	return Math.ceil(start + Math.random() * (end - start));
}

let decorations: vscode.TextEditorDecorationType[] = [];

export function activate(context: vscode.ExtensionContext) {
	function disposeAllDecorations() {
		decorations.forEach(item => {
			item.dispose();
		});
		decorations = [];
	}
	const stopFireworksCommand = vscode.commands.registerCommand('stop-fireworks', disposeAllDecorations);

	context.subscriptions.push(stopFireworksCommand);

	const fireworksCommand = vscode.commands.registerCommand('fireworks', () => {
		const editor = vscode.window.activeTextEditor;

		if(editor) {
			let cssStr = `position:absolute;width:150px;height:100px;`
			cssStr += 'background-size: contain;';
			cssStr+= 'background-repeat: no-repeat;'

			const text = editor.document.getText();
			const lines = text.split('\n');

			disposeAllDecorations();
			for(let i = 0; i < lines.length; i+= randomRange(10, 20)) {
				const line = lines[i];

				cssStr += `background-image: url(${Math.random() > 0.5 ? gifData1 : gifData2});`;

				const j = Math.random() * lines[i].length;

				const position1 = new vscode.Position(i, j);
				const position2 = new vscode.Position(i, j + 1);
		
				const range = new vscode.Range(position1, position2);

				const decoration = vscode.window.createTextEditorDecorationType({
					before: {
						contentText: '',
						textDecoration: `none;${cssStr};`
					},
					textDecoration: 'none;position:relative;'
				});
	
				editor.setDecorations(decoration, [range]);

				decorations.push(decoration);
			}
		}
	
	});

	context.subscriptions.push(fireworksCommand);
}

export function deactivate() {}
