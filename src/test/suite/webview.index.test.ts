import * as assert from 'assert';
import * as webview from '../../webview';

suite('Webview Index Test Suite', () => {
    test('should export getStyles', () => {
        assert.ok(typeof webview.getStyles === 'function');
    });

    test('should export getClientScripts', () => {
        assert.ok(typeof webview.getClientScripts === 'function');
    });

    test('should export getLogo', () => {
        assert.ok(typeof webview.getLogo === 'function');
    });

    test('should export getHeader', () => {
        assert.ok(typeof webview.getHeader === 'function');
    });

    test('should export getControls', () => {
        assert.ok(typeof webview.getControls === 'function');
    });

    test('should export getSetupSection', () => {
        assert.ok(typeof webview.getSetupSection === 'function');
    });

    test('should export getTimelineSection', () => {
        assert.ok(typeof webview.getTimelineSection === 'function');
    });

    test('should export getRequirementsSection', () => {
        assert.ok(typeof webview.getRequirementsSection === 'function');
    });

    test('should export getTaskSection', () => {
        assert.ok(typeof webview.getTaskSection === 'function');
    });

    test('should export getLogSection', () => {
        assert.ok(typeof webview.getLogSection === 'function');
    });

    test('should export getFooter', () => {
        assert.ok(typeof webview.getFooter === 'function');
    });

    test('should export getSettingsOverlay', () => {
        assert.ok(typeof webview.getSettingsOverlay === 'function');
    });

    test('should export Icons object', () => {
        assert.ok(typeof webview.Icons === 'object');
        assert.ok(webview.Icons.play);
        assert.ok(webview.Icons.pause);
        assert.ok(webview.Icons.stop);
    });

    test('getStyles should return valid CSS', () => {
        const styles = webview.getStyles();
        assert.ok(styles.length > 0);
        assert.ok(styles.includes('.header'));
    });

    test('getClientScripts should return valid JavaScript', () => {
        const scripts = webview.getClientScripts();
        assert.ok(scripts.length > 0);
        assert.ok(scripts.includes('function'));
    });
});
