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

suite('Types Test Suite', () => {
    suite('LoopExecutionState enum', () => {
        test('should have IDLE state', () => {
            assert.strictEqual(LoopExecutionState.IDLE, 'IDLE');
        });

        test('should have RUNNING state', () => {
            assert.strictEqual(LoopExecutionState.RUNNING, 'RUNNING');
        });
    });

    suite('TaskStatus enum', () => {
        test('should have PENDING status', () => {
            assert.strictEqual(TaskStatus.PENDING, 'PENDING');
        });

        test('should have IN_PROGRESS status', () => {
            assert.strictEqual(TaskStatus.IN_PROGRESS, 'IN_PROGRESS');
        });

        test('should have COMPLETE status', () => {
            assert.strictEqual(TaskStatus.COMPLETE, 'COMPLETE');
        });

        test('should have BLOCKED status', () => {
            assert.strictEqual(TaskStatus.BLOCKED, 'BLOCKED');
        });
    });

    suite('DEFAULT_CONFIG', () => {
        test('should have default PRD path', () => {
            assert.strictEqual(DEFAULT_CONFIG.files.prdPath, 'PRD.md');
        });

        test('should have default progress path', () => {
            assert.strictEqual(DEFAULT_CONFIG.files.progressPath, 'progress.txt');
        });

        test('should have files object', () => {
            assert.ok(DEFAULT_CONFIG.files);
            assert.ok(typeof DEFAULT_CONFIG.files === 'object');
        });
    });

    suite('DEFAULT_REQUIREMENTS', () => {
        test('should have runTests set to false', () => {
            assert.strictEqual(DEFAULT_REQUIREMENTS.runTests, false);
        });

        test('should have runLinting set to false', () => {
            assert.strictEqual(DEFAULT_REQUIREMENTS.runLinting, false);
        });

        test('should have runTypeCheck set to false', () => {
            assert.strictEqual(DEFAULT_REQUIREMENTS.runTypeCheck, false);
        });

        test('should have writeTests set to false', () => {
            assert.strictEqual(DEFAULT_REQUIREMENTS.writeTests, false);
        });

        test('should have updateDocs set to false', () => {
            assert.strictEqual(DEFAULT_REQUIREMENTS.updateDocs, false);
        });

        test('should have commitChanges set to false', () => {
            assert.strictEqual(DEFAULT_REQUIREMENTS.commitChanges, false);
        });

        test('should have all expected properties', () => {
            const expectedKeys = ['runTests', 'runLinting', 'runTypeCheck', 'writeTests', 'updateDocs', 'commitChanges'];
            const actualKeys = Object.keys(DEFAULT_REQUIREMENTS);
            expectedKeys.forEach(key => {
                assert.ok(actualKeys.includes(key), `Missing property: ${key}`);
            });
        });
    });

    suite('DEFAULT_SETTINGS', () => {
        test('should have maxIterations set to 50', () => {
            assert.strictEqual(DEFAULT_SETTINGS.maxIterations, 50);
        });
    });

    suite('Constants', () => {
        test('REVIEW_COUNTDOWN_SECONDS should be 12', () => {
            assert.strictEqual(REVIEW_COUNTDOWN_SECONDS, 12);
        });

        test('INACTIVITY_TIMEOUT_MS should be 60000 (60 seconds)', () => {
            assert.strictEqual(INACTIVITY_TIMEOUT_MS, 60_000);
        });

        test('INACTIVITY_CHECK_INTERVAL_MS should be 10000 (10 seconds)', () => {
            assert.strictEqual(INACTIVITY_CHECK_INTERVAL_MS, 10_000);
        });
    });
});
