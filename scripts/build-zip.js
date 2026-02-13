const archiver = require('archiver');
const fs = require('fs');
const path = require('path');

const zipPath = path.resolve(__dirname, '..', 'trainline-booking-remover-v1.0.0.zip');
const distPath = path.resolve(__dirname, '..', 'dist');

const output = fs.createWriteStream(zipPath);
const archive = archiver('zip', { zlib: { level: 9 } });

archive.on('error', err => {
  console.error('Zip creation failed:', err);
  process.exit(1);
});

output.on('close', () => {
  console.log(`Created ${zipPath} (${archive.pointer()} bytes)`);
});

archive.pipe(output);
archive.directory(distPath + '/', false);
archive.finalize();
