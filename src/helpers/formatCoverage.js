'use strict';

function formatCoverageResult(jsCoverage, cssCoverage) {
  const coverage = getCoverage(jsCoverage, cssCoverage);
  return coverage
    .map(({ url, text, ranges, type }) => {
      const usedBytesTotal = sumRangeUsage(ranges);
      const totalBytes = text.length;
      const unusedBytesTotal = totalBytes - usedBytesTotal;

      const unusedPercentage = totalBytes ? (unusedBytesTotal * 100 / totalBytes) : 0;
      const usedPercentage = 100 - unusedPercentage;

      return {
        url,
        type,
        totalBytes,
        usedBytesTotal,
        unusedBytesTotal,
        usedPercentage,
        unusedPercentage
      };
    })
    .sort(({ usedPercentage: A }, { usedPercentage: B }) => {
      return B - A;
    })
};

function formatCoverageAsJson(jsCoverage, cssCoverage) {
  const coverage = getCoverage(jsCoverage, cssCoverage);
  const totalUsage = getTotalUsage(coverage);
  const result = {
    coverage,
    totalUsage,
  };
  return JSON.stringify(result, null, '  ');
};

function getCoverage(jsCoverage, cssCoverage) {
  return [
    ...jsCoverage.map(results => ({
      ...results,
      type: 'JS'
    })),

    ...cssCoverage.map(results => ({
      ...results,
      type: 'CSS'
    })),
  ];
}

function getTotalUsage(coverage) {
  const totalUsage = coverage.reduce((results, { totalBytes, usedBytesTotal, unusedBytesTotal }) => {
    results.totalBytes += totalBytes;
    results.usedBytesTotal += usedBytesTotal;
    results.unusedBytesTotal += unusedBytesTotal;

    return results;
  }, {
      totalBytes: 0,
      usedBytesTotal: 0,
      unusedBytesTotal: 0,
  });

  const { totalBytes, unusedBytesTotal } = totalUsage;
  const unusedPercentage = totalBytes ? (unusedBytesTotal * 100 / totalBytes) : 0;
  const usedPercentage = 100 - unusedPercentage;

  return {
    ...totalUsage,
    usedPercentage,
    unusedPercentage,
  };
}

function sumRangeUsage(ranges) {
  return ranges.reduce((total, range) => {
    return total + range.end - range.start - 1;
  }, 0);
}

module.exports = {
  formatCoverageResult,
  formatCoverageAsJson
};
