'use strict';

const fs = require('fs');

async function takeHeapSnapshot(client, filename='snapshot.heapsnapshot') {
  await client.send('Page.enable');
  await client.send('HeapProfiler.enable');
  const chunks = [];
  client.on('HeapProfiler.addHeapSnapshotChunk', ({chunk}) => {
    chunks.push(chunk);
  });
  await client.send('HeapProfiler.takeHeapSnapshot', {reportProgress: false});
  fs.writeFile(filename, chunks.join(''), (err) => {
    if (err) { throw err; }
  });
  return true;
}


module.exports = {
  takeHeapSnapshot
};
