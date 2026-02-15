/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

// Helper function to compare semantic versions
function compareVersions(v1, v2) {
  const parts1 = v1.split('.').map(Number);
  const parts2 = v2.split('.').map(Number);
  
  for (let i = 0; i < Math.max(parts1.length, parts2.length); i++) {
    const p1 = parts1[i] || 0;
    const p2 = parts2[i] || 0;
    if (p1 > p2) return 1;   // v1 is greater
    if (p1 < p2) return -1;  // v2 is greater
  }
  return 0; // equal
}

// Read both files
const packageJsonPath = path.join(__dirname, '..', 'package.json');
const manifestPath = path.join(__dirname, '..', 'src', 'manifest.json');

const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));

const packageVersion = packageJson.version;
const manifestVersion = manifest.version;

// Determine which version is greater
let syncedVersion;
if (compareVersions(packageVersion, manifestVersion) >= 0) {
  syncedVersion = packageVersion;
} else {
  syncedVersion = manifestVersion;
}

// Update both files if needed
let packageUpdated = false;
let manifestUpdated = false;

if (packageJson.version !== syncedVersion) {
  packageJson.version = syncedVersion;
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
  packageUpdated = true;
}

if (manifest.version !== syncedVersion) {
  manifest.version = syncedVersion;
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
  manifestUpdated = true;
}

// Log result
if (packageUpdated || manifestUpdated) {
  console.log(`Version synced to ${syncedVersion}`);
  if (packageUpdated) console.log('  Updated package.json');
  if (manifestUpdated) console.log('  Updated src/manifest.json');
} else {
  console.log(`Versions already in sync: ${syncedVersion}`);
}

