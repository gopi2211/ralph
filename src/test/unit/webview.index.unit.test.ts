import * as assert from 'assert';
import * as webview from '../../webview';

describe('Webview Index', () => {
    it('should export getStyles', () => {
        assert.ok(typeof webview.getStyles === 'function');
    });

    it('should export getClientScripts', () => {
        assert.ok(typeof webview.getClientScripts === 'function');
    });

    it('should export getLogo', () => {
        assert.ok(typeof webview.getLogo === 'function');
    });

    it('should export getHeader', () => {
        assert.ok(typeof webview.getHeader === 'function');
    });

    it('should export getControls', () => {
        assert.ok(typeof webview.getControls === 'function');
    });

    it('should export getSetupSection', () => {
        assert.ok(typeof webview.getSetupSection === 'function');
    });

    it('should export getTimelineSection', () => {
        assert.ok(typeof webview.getTimelineSection === 'function');
    });

    it('should export getRequirementsSection', () => {
        assert.ok(typeof webview.getRequirementsSection === 'function');
    });

    it('should export getTaskSection', () => {
        assert.ok(typeof webview.getTaskSection === 'function');
    });

    it('should export getLogSection', () => {
        assert.ok(typeof webview.getLogSection === 'function');
    });

    it('should export getFooter', () => {
        assert.ok(typeof webview.getFooter === 'function');
    });

    it('should export getSettingsOverlay', () => {
        assert.ok(typeof webview.getSettingsOverlay === 'function');
    });

    it('should export Icons object', () => {
        assert.ok(typeof webview.Icons === 'object');
        assert.ok(webview.Icons.play);
        assert.ok(webview.Icons.pause);
        assert.ok(webview.Icons.stop);
    });

    it('getStyles should return valid CSS', () => {
        const styles = webview.getStyles();
        assert.ok(styles.length > 0);
        assert.ok(styles.includes('.header'));
    });

    it('getClientScripts should return valid JavaScript', () => {
        const scripts = webview.getClientScripts();
        assert.ok(scripts.length > 0);
        assert.ok(scripts.includes('function'));
    });
});
