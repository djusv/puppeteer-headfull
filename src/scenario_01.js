'use strict';

const fs = require('fs');

const scenarioName = __filename.slice(__dirname.length + 1, -3);
const scenarioOutput = `${process.env.output}/${scenarioName}`;
if (!fs.existsSync(scenarioOutput)) {
  fs.mkdirSync(scenarioOutput);
}

module.exports = async(page) => {
  console.log(`start-scenario: ${scenarioName}`);
  await page.goto('https://www.google.com', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: `${scenarioOutput}\\test.png` });
  console.log(`end-scenario: ${scenarioName}`);
};
