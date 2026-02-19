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
const userscriptPath = path.join(__dirname, '..', 'userscript', 'travel-experience-cleaner.user.js');

const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
const userscriptText = fs.readFileSync(userscriptPath, 'utf-8');

const packageVersion = packageJson.version;
const manifestVersion = manifest.version;
const userscriptMatch = userscriptText.match(/^\/\/\s*@version\s+(.+)$/m);
const userscriptVersion = userscriptMatch ? userscriptMatch[1].trim() : null;

// Determine which version is greater
let syncedVersion;
if (compareVersions(packageVersion, manifestVersion) >= 0) {
  syncedVersion = packageVersion;
} else {
  syncedVersion = manifestVersion;
}

if (userscriptVersion && compareVersions(syncedVersion, userscriptVersion) < 0) {
  syncedVersion = userscriptVersion;
}

// Update both files if needed
let packageUpdated = false;
let manifestUpdated = false;
let userscriptUpdated = false;

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

if (!userscriptVersion) {
  throw new Error('Userscript @version not found.');
}

if (userscriptVersion !== syncedVersion) {
  const updatedUserscript = userscriptText.replace(
    /^\/\/\s*@version\s+.+$/m,
    `// @version           ${syncedVersion}`
  );
  fs.writeFileSync(userscriptPath, updatedUserscript);
  userscriptUpdated = true;
}

// Log result
if (packageUpdated || manifestUpdated || userscriptUpdated) {
  console.log(`Version synced to ${syncedVersion}`);
  if (packageUpdated) console.log('  Updated package.json');
  if (manifestUpdated) console.log('  Updated src/manifest.json');
  if (userscriptUpdated) console.log('  Updated userscript/travel-experience-cleaner.user.js');
} else {
  console.log(`Versions already in sync: ${syncedVersion}`);
}

