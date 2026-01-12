import * as vscode from 'vscode';
import { RalphStatusBar } from './statusBar';
import { RalphPanel, RalphSidebarProvider } from './controlPanel';
import { LoopOrchestrator } from './orchestrator';
import { log, disposeLogger, showLogs } from './logger';

class RalphExtension {
    private statusBar: RalphStatusBar;
    private orchestrator: LoopOrchestrator;
    private currentPanel: RalphPanel | null = null;
    private panelEventHandlers: vscode.Disposable[] = [];

    constructor(private readonly context: vscode.ExtensionContext) {
        log('Ralph extension activating...');

        this.statusBar = new RalphStatusBar();
        context.subscriptions.push(this.statusBar);

        this.orchestrator = new LoopOrchestrator(this.statusBar);

        const sidebarProvider = new RalphSidebarProvider(context.extensionUri);
        context.subscriptions.push(
            vscode.window.registerWebviewViewProvider('ralph.sidebarView', sidebarProvider)
        );

        this.registerCommands();

        context.subscriptions.push({
            dispose: () => this.dispose()
        });

        log('Ralph extension activated');
    }

    private registerCommands(): void {
        this.context.subscriptions.push(
            vscode.commands.registerCommand('ralph.showPanel', () => {
                this.showPanel();
            }),

            vscode.commands.registerCommand('ralph.viewLogs', () => {
                showLogs();
            })
        );
    }

    private showPanel(): void {
        if (this.currentPanel) {
            this.currentPanel.reveal();
            this.currentPanel.refresh();
            return;
        }

        const webviewPanel = RalphPanel.createPanel(this.context.extensionUri);
        this.currentPanel = new RalphPanel(webviewPanel);
        this.orchestrator.setPanel(this.currentPanel);

        this.currentPanel.onDispose(() => {
            this.cleanupPanel();
        });

        this.panelEventHandlers.push(
            this.currentPanel.on('start', () => this.orchestrator.startLoop()),
            this.currentPanel.on('stop', () => this.orchestrator.stopLoop()),
            this.currentPanel.on('pause', () => this.orchestrator.pauseLoop()),
            this.currentPanel.on('resume', () => this.orchestrator.resumeLoop()),
            this.currentPanel.on('next', () => this.orchestrator.runSingleStep()),
            this.currentPanel.on('generatePrd', (data) => {
                if (data?.taskDescription) {
                    this.orchestrator.generatePrdFromDescription(data.taskDescription);
                }
            }),
            this.currentPanel.on('requirementsChanged', (data) => {
                if (data?.requirements) {
                    this.orchestrator.setRequirements(data.requirements);
                }
            }),
            this.currentPanel.on('settingsChanged', (data) => {
                if (data?.settings) {
                    this.orchestrator.setSettings(data.settings);
                }
            })
        );
    }

    private cleanupPanel(): void {
        this.panelEventHandlers.forEach(d => d.dispose());
        this.panelEventHandlers = [];
        this.currentPanel = null;
        this.orchestrator.setPanel(null);
    }

    dispose(): void {
        this.cleanupPanel();
        this.orchestrator.dispose();
        disposeLogger();
    }
}

let extensionInstance: RalphExtension | null = null;

export function activate(context: vscode.ExtensionContext): void {
    extensionInstance = new RalphExtension(context);
}

export function deactivate(): void {
    log('Ralph extension deactivating...');
    extensionInstance?.dispose();
    extensionInstance = null;
}
