'use strict';

const puppeteer = require('puppeteer');
const fs = require('fs');

process.env.output = './output';

const outputDir = process.env.output;
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

(async() => {

  const browser = await puppeteer.launch({
    executablePath: 'google-chrome-stable',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--start-maximized',
      '--disable-device-emulation',
      '--disable-cpu-throttling',
      '--disable-network-throttling'
    ],
    ignoreHTTPSErrors: true,
    headless: false
  });

  const pages = await browser.pages();
  const page = pages[0];
  // Set Page Viewport Size
  await page._client.send('Emulation.clearDeviceMetricsOverride');
  await page.setViewport({
    width: 1920,
    height: 1080,
    deviceScaleFactor: 1
  });
  // Get the "viewport" of the page, as reported by the page.
  const dimensions = await page.evaluate(() => {
    return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
      deviceScaleFactor: window.devicePixelRatio
    };
  });
  console.log('Window - Dimensions:', dimensions);
  try {
    await require('./src/scenario_01')(page);
  } catch (error) {
    console.error(error);
  }
  await browser.close();
})();

