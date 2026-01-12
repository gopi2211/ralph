import * as vscode from 'vscode';
import { RalphConfig, DEFAULT_CONFIG } from './types';

export function getConfig(): RalphConfig {
    const config = vscode.workspace.getConfiguration('ralph');

    return {
        files: {
            prdPath: config.get<string>('files.prdPath', DEFAULT_CONFIG.files.prdPath),
            progressPath: config.get<string>('files.progressPath', DEFAULT_CONFIG.files.progressPath)
        },
        prompt: {
            customTemplate: config.get<string>('prompt.customTemplate', DEFAULT_CONFIG.prompt.customTemplate),
            customPrdGenerationTemplate: config.get<string>('prompt.customPrdGenerationTemplate', DEFAULT_CONFIG.prompt.customPrdGenerationTemplate)
        }
    };
}
