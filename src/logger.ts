import * as vscode from 'vscode';

let outputChannel: vscode.OutputChannel | null = null;

export function getLogger(): vscode.OutputChannel {
    if (!outputChannel) {
        outputChannel = vscode.window.createOutputChannel('Ralph');
    }
    return outputChannel;
}

export function log(message: string): void {
    const timestamp = new Date().toISOString();
    getLogger().appendLine(`[${timestamp}] ${message}`);
}

export function logError(message: string, error?: unknown): void {
    const timestamp = new Date().toISOString();
    const errorStr = error instanceof Error ? error.message : String(error || '');
    getLogger().appendLine(`[${timestamp}] ❌ ERROR: ${message} ${errorStr}`);
}

export function showLogs(): void {
    getLogger().show();
}

export function disposeLogger(): void {
    outputChannel?.dispose();
    outputChannel = null;
}
