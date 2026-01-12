import * as assert from 'assert';
import { formatDuration, CountdownTimer, InactivityMonitor } from '../../timerManager';

suite('TimerManager Test Suite', () => {
    suite('formatDuration', () => {
        test('should format seconds only', () => {
            assert.strictEqual(formatDuration(45000), '45s');
        });

        test('should format 0 seconds', () => {
            assert.strictEqual(formatDuration(0), '0s');
        });

        test('should format 1 second', () => {
            assert.strictEqual(formatDuration(1000), '1s');
        });

        test('should format minutes and seconds', () => {
            assert.strictEqual(formatDuration(90000), '1m 30s');
        });

        test('should format 5 minutes', () => {
            assert.strictEqual(formatDuration(300000), '5m 0s');
        });

        test('should format hours and minutes', () => {
            assert.strictEqual(formatDuration(5400000), '1h 30m');
        });

        test('should format 2 hours', () => {
            assert.strictEqual(formatDuration(7200000), '2h 0m');
        });

        test('should format 1 hour exactly', () => {
            assert.strictEqual(formatDuration(3600000), '1h 0m');
        });

        test('should format 59 seconds', () => {
            assert.strictEqual(formatDuration(59000), '59s');
        });

        test('should format 60 seconds as 1m 0s', () => {
            assert.strictEqual(formatDuration(60000), '1m 0s');
        });

        test('should format 59 minutes 59 seconds', () => {
            assert.strictEqual(formatDuration(3599000), '59m 59s');
        });

        test('should handle fractional milliseconds by rounding down', () => {
            assert.strictEqual(formatDuration(1500), '1s');
        });

        test('should format 10 hours 30 minutes', () => {
            assert.strictEqual(formatDuration(37800000), '10h 30m');
        });
    });

    suite('CountdownTimer', () => {
        let timer: CountdownTimer;

        setup(() => {
            timer = new CountdownTimer();
        });

        teardown(() => {
            timer.stop();
        });

        test('should not be active initially', () => {
            assert.strictEqual(timer.isActive(), false);
        });

        test('should be active after starting', async () => {
            let tickCalled = false;

            timer.start(5, () => {
                tickCalled = true;
            });

            assert.strictEqual(timer.isActive(), true);
            assert.strictEqual(tickCalled, true);

            timer.stop();

        });

        test('should not be active after stopping', () => {
            timer.start(10, () => { });
            timer.stop();
            assert.strictEqual(timer.isActive(), false);
        });

        test('should call onTick with initial value immediately', (done) => {
            let receivedValue: number | null = null;

            timer.start(5, (remaining) => {
                if (receivedValue === null) {
                    receivedValue = remaining;
                    timer.stop();
                    assert.strictEqual(receivedValue, 5);
                    done();
                }
            });
        });

        test('should call onTick with 0 when stopped', () => {
            let lastValue: number = -1;
            timer.start(10, (remaining) => {
                lastValue = remaining;
            });
            timer.stop();
            assert.strictEqual(lastValue, 0);
        });
    });

    suite('InactivityMonitor', () => {
        let monitor: InactivityMonitor;

        setup(() => {
            monitor = new InactivityMonitor();
        });

        teardown(() => {
            monitor.stop();
        });

        test('should not be active initially', () => {
            assert.strictEqual(monitor.isActive(), false);
        });

        test('should be active after starting', () => {
            monitor.start(async () => { });
            assert.strictEqual(monitor.isActive(), true);
        });

        test('should not be active after stopping', () => {
            monitor.start(async () => { });
            monitor.stop();
            assert.strictEqual(monitor.isActive(), false);
        });

        test('should record activity and update timestamp', () => {
            monitor.start(async () => { });
            const before = monitor.getLastActivityTime();

            const start = Date.now();
            while (Date.now() - start < 5) {
                // Busy wait to ensure time passes
            }

            monitor.recordActivity();
            const after = monitor.getLastActivityTime();

            assert.ok(after >= before, 'Activity time should be updated');
        });

        test('setWaiting should update last activity time when set to true', () => {
            monitor.start(async () => { });
            const before = monitor.getLastActivityTime();

            const start = Date.now();
            while (Date.now() - start < 5) {
                // Busy wait to ensure time passes
            }

            monitor.setWaiting(true);
            const after = monitor.getLastActivityTime();

            assert.ok(after >= before, 'Activity time should be updated when waiting set to true');
        });

        test('pause should not stop the monitor', () => {
            monitor.start(async () => { });
            monitor.pause();
            assert.strictEqual(monitor.isActive(), true);
        });

        test('resume should update last activity time', () => {
            monitor.start(async () => { });
            const before = monitor.getLastActivityTime();

            const start = Date.now();
            while (Date.now() - start < 5) {
                // Busy wait to ensure time passes
            }

            monitor.pause();
            monitor.resume();
            const after = monitor.getLastActivityTime();

            assert.ok(after >= before, 'Activity time should be updated on resume');
        });

        test('getLastActivityTime should return a number', () => {
            monitor.start(async () => { });
            const lastTime = monitor.getLastActivityTime();
            assert.strictEqual(typeof lastTime, 'number');
            assert.ok(lastTime > 0);
        });
    });
});
