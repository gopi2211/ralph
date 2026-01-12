import * as assert from 'assert';
import {
    LoopExecutionState,
    TaskStatus,
    DEFAULT_CONFIG,
    DEFAULT_REQUIREMENTS,
    DEFAULT_SETTINGS,
    REVIEW_COUNTDOWN_SECONDS,
    INACTIVITY_TIMEOUT_MS,
    INACTIVITY_CHECK_INTERVAL_MS
} from '../../types';

describe('Types', () => {
    describe('LoopExecutionState enum', () => {
        it('should have IDLE state', () => {
            assert.strictEqual(LoopExecutionState.IDLE, 'IDLE');
        });

        it('should have RUNNING state', () => {
            assert.strictEqual(LoopExecutionState.RUNNING, 'RUNNING');
        });
    });

    describe('TaskStatus enum', () => {
        it('should have PENDING status', () => {
            assert.strictEqual(TaskStatus.PENDING, 'PENDING');
        });

        it('should have IN_PROGRESS status', () => {
            assert.strictEqual(TaskStatus.IN_PROGRESS, 'IN_PROGRESS');
        });

        it('should have COMPLETE status', () => {
            assert.strictEqual(TaskStatus.COMPLETE, 'COMPLETE');
        });

        it('should have BLOCKED status', () => {
            assert.strictEqual(TaskStatus.BLOCKED, 'BLOCKED');
        });
    });

    describe('DEFAULT_CONFIG', () => {
        it('should have default PRD path', () => {
            assert.strictEqual(DEFAULT_CONFIG.files.prdPath, 'PRD.md');
        });

        it('should have default progress path', () => {
            assert.strictEqual(DEFAULT_CONFIG.files.progressPath, 'progress.txt');
        });

        it('should have files object', () => {
            assert.ok(DEFAULT_CONFIG.files);
            assert.ok(typeof DEFAULT_CONFIG.files === 'object');
        });

        it('should have prompt object', () => {
            assert.ok(DEFAULT_CONFIG.prompt);
            assert.ok(typeof DEFAULT_CONFIG.prompt === 'object');
        });

        it('should have empty customTemplate by default', () => {
            assert.strictEqual(DEFAULT_CONFIG.prompt.customTemplate, '');
        });

        it('should have empty customPrdGenerationTemplate by default', () => {
            assert.strictEqual(DEFAULT_CONFIG.prompt.customPrdGenerationTemplate, '');
        });
    });

    describe('DEFAULT_REQUIREMENTS', () => {
        it('should have runTests set to false', () => {
            assert.strictEqual(DEFAULT_REQUIREMENTS.runTests, false);
        });

        it('should have runLinting set to false', () => {
            assert.strictEqual(DEFAULT_REQUIREMENTS.runLinting, false);
        });

        it('should have runTypeCheck set to false', () => {
            assert.strictEqual(DEFAULT_REQUIREMENTS.runTypeCheck, false);
        });

        it('should have writeTests set to false', () => {
            assert.strictEqual(DEFAULT_REQUIREMENTS.writeTests, false);
        });

        it('should have updateDocs set to false', () => {
            assert.strictEqual(DEFAULT_REQUIREMENTS.updateDocs, false);
        });

        it('should have commitChanges set to false', () => {
            assert.strictEqual(DEFAULT_REQUIREMENTS.commitChanges, false);
        });

        it('should have all expected properties', () => {
            const expectedKeys = ['runTests', 'runLinting', 'runTypeCheck', 'writeTests', 'updateDocs', 'commitChanges'];
            const actualKeys = Object.keys(DEFAULT_REQUIREMENTS);
            expectedKeys.forEach(key => {
                assert.ok(actualKeys.includes(key), `Missing property: ${key}`);
            });
        });
    });

    describe('DEFAULT_SETTINGS', () => {
        it('should have maxIterations set to 50', () => {
            assert.strictEqual(DEFAULT_SETTINGS.maxIterations, 50);
        });
    });

    describe('Constants', () => {
        it('REVIEW_COUNTDOWN_SECONDS should be 12', () => {
            assert.strictEqual(REVIEW_COUNTDOWN_SECONDS, 12);
        });

        it('INACTIVITY_TIMEOUT_MS should be 60000 (60 seconds)', () => {
            assert.strictEqual(INACTIVITY_TIMEOUT_MS, 60_000);
        });

        it('INACTIVITY_CHECK_INTERVAL_MS should be 10000 (10 seconds)', () => {
            assert.strictEqual(INACTIVITY_CHECK_INTERVAL_MS, 10_000);
        });
    });
});
