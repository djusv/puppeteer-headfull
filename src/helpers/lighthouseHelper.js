'use strict';

const lighthouse = require('lighthouse');
const { URL } = require('url');

async function gatherLighthouseMetrics(page, browser, config = null) {
  const port = (new URL(browser.wsEndpoint())).port;
  return await lighthouse(page.url(), {
    port,
    auditMode: false,
    disableDeviceEmulation: true,
    disableStorageReset: false,
    onlyCategories: [
      'performance',
      'pwa',
      'best-practices'
    ]
  }, config).then(results => {
    delete results.artifacts;
    return results;
  });
}

module.exports = {
  gatherLighthouseMetrics
};
