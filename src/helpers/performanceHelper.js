'use strict';

const fs = require('fs');

async function gatherPerformanceTimingMetric(page, metricName) {
  const metric = await page.evaluate(metric => window.performance.timing[metric], metricName);
  return metric;
}

async function gatherPerformanceTimingMetrics(page) {
  // The values returned from evaluate() function should be JSON serializeable.
  const rawMetrics = await page.evaluate(() => JSON.stringify(window.performance.timing));
  const metrics = JSON.parse(rawMetrics);
  return metrics;
}

async function gatherPageMetrics(page, filename='metrics.json') {
  let metrics = await page.metrics();
  fs.writeFile(filename, JSON.stringify(metrics, null, 2), (err) => {
    if (err) { throw err; }
  });
  return metrics;
}

async function processPerformanceTimingMetrics(metrics) {
  return {
    dnsLookup: metrics.domainLookupEnd - metrics.domainLookupStart,
    tcpConnect: metrics.connectEnd - metrics.connectStart,
    request: metrics.responseStart - metrics.requestStart,
    response: metrics.responseEnd - metrics.responseStart,
    domLoaded: metrics.domComplete - metrics.domLoading,
    domContent: metrics.domContentLoadedEventEnd - metrics.domContentLoadedEventStart,
    domInteractive: metrics.domInteractive - metrics.navigationStart,
    pageLoad: metrics.loadEventEnd - metrics.loadEventStart,
    fullTime: metrics.loadEventEnd - metrics.navigationStart,
    rawMetrics: metrics
  };
}

module.exports = {
  gatherPerformanceTimingMetric,
  gatherPerformanceTimingMetrics,
  processPerformanceTimingMetrics,
  gatherPageMetrics
};
