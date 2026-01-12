import * as assert from 'assert';
import { formatDuration, CountdownTimer, InactivityMonitor } from '../../timerManager';

describe('TimerManager', () => {
    describe('formatDuration', () => {
        it('should format seconds only', () => {
            assert.strictEqual(formatDuration(45000), '45s');
        });

        it('should format 0 seconds', () => {
            assert.strictEqual(formatDuration(0), '0s');
        });

        it('should format 1 second', () => {
            assert.strictEqual(formatDuration(1000), '1s');
        });

        it('should format minutes and seconds', () => {
            assert.strictEqual(formatDuration(90000), '1m 30s');
        });

        it('should format 5 minutes', () => {
            assert.strictEqual(formatDuration(300000), '5m 0s');
        });

        it('should format hours and minutes', () => {
            assert.strictEqual(formatDuration(5400000), '1h 30m');
        });

        it('should format 2 hours', () => {
            assert.strictEqual(formatDuration(7200000), '2h 0m');
        });

        it('should format 1 hour exactly', () => {
            assert.strictEqual(formatDuration(3600000), '1h 0m');
        });

        it('should format 59 seconds', () => {
            assert.strictEqual(formatDuration(59000), '59s');
        });

        it('should format 60 seconds as 1m 0s', () => {
            assert.strictEqual(formatDuration(60000), '1m 0s');
        });

        it('should format 59 minutes 59 seconds', () => {
            assert.strictEqual(formatDuration(3599000), '59m 59s');
        });

        it('should handle fractional milliseconds by rounding down', () => {
            assert.strictEqual(formatDuration(1500), '1s');
        });

        it('should format 10 hours 30 minutes', () => {
            assert.strictEqual(formatDuration(37800000), '10h 30m');
        });
    });

    describe('CountdownTimer', () => {
        let timer: CountdownTimer;

        beforeEach(() => {
            timer = new CountdownTimer();
        });

        afterEach(() => {
            timer.stop();
        });

        it('should not be active initially', () => {
            assert.strictEqual(timer.isActive(), false);
        });

        it('should be active after starting', () => {
            let tickCalled = false;

            timer.start(5, () => {
                tickCalled = true;
            });

            assert.strictEqual(timer.isActive(), true);
            assert.strictEqual(tickCalled, true);

            timer.stop();
        });

        it('should not be active after stopping', () => {
            timer.start(10, () => { });
            timer.stop();
            assert.strictEqual(timer.isActive(), false);
        });

        it('should call onTick with initial value immediately', (done) => {
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

        it('should call onTick with 0 when stopped', () => {
            let lastValue: number = -1;
            timer.start(10, (remaining) => {
                lastValue = remaining;
            });
            timer.stop();
            assert.strictEqual(lastValue, 0);
        });
    });

    describe('InactivityMonitor', () => {
        let monitor: InactivityMonitor;

        beforeEach(() => {
            monitor = new InactivityMonitor();
        });

        afterEach(() => {
            monitor.stop();
        });

        it('should not be active initially', () => {
            assert.strictEqual(monitor.isActive(), false);
        });

        it('should be active after starting', () => {
            monitor.start(async () => { });
            assert.strictEqual(monitor.isActive(), true);
        });

        it('should not be active after stopping', () => {
            monitor.start(async () => { });
            monitor.stop();
            assert.strictEqual(monitor.isActive(), false);
        });

        it('should record activity and update timestamp', () => {
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

        it('setWaiting should update last activity time when set to true', () => {
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

        it('pause should not stop the monitor', () => {
            monitor.start(async () => { });
            monitor.pause();
            assert.strictEqual(monitor.isActive(), true);
        });

        it('resume should update last activity time', () => {
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

        it('getLastActivityTime should return a number', () => {
            monitor.start(async () => { });
            const lastTime = monitor.getLastActivityTime();
            assert.strictEqual(typeof lastTime, 'number');
            assert.ok(lastTime > 0);
        });
    });
});
