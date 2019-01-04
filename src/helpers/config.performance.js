'use strict';

module.exports = {
  passes: [
    {
      passName: 'defaultPass',
      recordTrace: true,
      pauseAfterLoadMs: 5250,
      networkQuietThresholdMs: 5250,
      cpuQuietThresholdMs: 5250,
      useThrottling: true,
      gatherers: [
        'start-url',
        'scripts',
        'css-usage',
        'viewport',
        'viewport-dimensions',
        'theme-color',
        'manifest',
        'runtime-exceptions',
        'chrome-console-messages',
        'image-usage',
        'accessibility',
        'dobetterweb/anchors-with-no-rel-noopener',
        'dobetterweb/appcache',
        'dobetterweb/domstats',
        'dobetterweb/js-libraries',
        'dobetterweb/optimized-images',
        'dobetterweb/password-inputs-with-prevented-paste',
        'dobetterweb/response-compression',
        'dobetterweb/tags-blocking-first-paint',
        'dobetterweb/websql',
        'fonts'
      ]
    }
  ],
  audits: [
    'metrics/first-meaningful-paint',
    'metrics/interactive',
    'metrics/speed-index',
    'metrics/estimated-input-latency',
    'time-to-first-byte',
    'redirects',
    'uses-rel-preload',
    'critical-request-chains',
    'network-requests',
    'user-timings',
    'bootup-time',
    'screenshot-thumbnails',
    'mainthread-work-breakdown',
    'font-display',
    'dobetterweb/dom-size',
    'byte-efficiency/uses-responsive-images',
    'byte-efficiency/offscreen-images',
    'byte-efficiency/unminified-css',
    'byte-efficiency/unminified-javascript',
    'byte-efficiency/unused-css-rules',
    'byte-efficiency/uses-optimized-images',
    'byte-efficiency/uses-webp-images',
    'byte-efficiency/total-byte-weight',
    'byte-efficiency/uses-long-cache-ttl'
  ],
  groups: {
    'metrics': {
      title: 'Metrics',
      description: 'These metrics encapsulate your web app\'s performance across a number of dimensions.'
    }
  },
  categories: {
    performance: {
      title: 'Performance',
      description: 'These encapsulate your web app\'s current performance and opportunities to improve it.',
      auditRefs: [
        { id: 'first-meaningful-paint', weight: 5, group: 'metrics' },
        { id: 'interactive', weight: 5, group: 'metrics' },
        { id: 'speed-index', weight: 1, group: 'metrics' },
        { id: 'estimated-input-latency', weight: 1, group: 'metrics' },
        { id: 'uses-responsive-images', weight: 0, group: 'metrics' },
        { id: 'offscreen-images', weight: 0, group: 'metrics' },
        { id: 'unminified-css', weight: 0, group: 'metrics' },
        { id: 'unminified-javascript', weight: 0, group: 'metrics' },
        { id: 'unused-css-rules', weight: 0, group: 'metrics' },
        { id: 'uses-optimized-images', weight: 0, group: 'metrics' },
        { id: 'uses-webp-images', weight: 0, group: 'metrics' },
        { id: 'time-to-first-byte', weight: 0, group: 'metrics' },
        { id: 'redirects', weight: 0, group: 'metrics' },
        { id: 'uses-rel-preload', weight: 0, group: 'metrics' },
        { id: 'total-byte-weight', weight: 0, group: 'metrics' },
        { id: 'uses-long-cache-ttl', weight: 0, group: 'metrics' },
        { id: 'dom-size', weight: 0, group: 'metrics' },
        { id: 'critical-request-chains', weight: 0, group: 'metrics' },
        { id: 'network-requests', weight: 0 },
        { id: 'user-timings', weight: 0, group: 'metrics' },
        { id: 'bootup-time', weight: 0, group: 'metrics' },
        { id: 'screenshot-thumbnails', weight: 0 },
        { id: 'mainthread-work-breakdown', weight: 0, group: 'metrics' },
        { id: 'font-display', weight: 0, group: 'metrics' }
      ]
    }
  }
};
