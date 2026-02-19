/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

const rootPath = path.join(__dirname, '..');
const domainsPath = path.join(rootPath, 'domains.json');
const manifestPath = path.join(rootPath, 'src', 'manifest.json');
const userscriptPath = path.join(rootPath, 'userscript', 'travel-experience-cleaner.user.js');

const domains = JSON.parse(fs.readFileSync(domainsPath, 'utf-8'));

function buildMatches() {
  const matches = [];
  const pushUnique = (pattern) => {
    if (!matches.includes(pattern)) {
      matches.push(pattern);
    }
  };

  // Trainline - exact domains
  (domains.trainline || []).forEach((domain) => {
    pushUnique(`*://${domain}/*`);
  });

  // Flixbus - exact domains
  (domains.flixbus || []).forEach((domain) => {
    pushUnique(`*://${domain}/*`);
  });

  // Skyscanner - exact domains
  (domains.skyscanner || []).forEach((domain) => {
    pushUnique(`*://${domain}/*`);
  });

  return matches;
}

function updateManifest(matches) {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));

  if (!Array.isArray(manifest.content_scripts) || manifest.content_scripts.length === 0) {
    throw new Error('manifest.json has no content_scripts to update.');
  }

  manifest.content_scripts[0].matches = matches;
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
}

function updateUserscript(matches) {
  const userscriptText = fs.readFileSync(userscriptPath, 'utf-8');
  const lines = userscriptText.split(/\r?\n/);

  const matchIndices = [];
  lines.forEach((line, index) => {
    if (line.startsWith('// @match')) {
      matchIndices.push(index);
    }
  });

  if (matchIndices.length === 0) {
    throw new Error('No @match lines found in userscript.');
  }

  const newMatchLines = matches.map((pattern) => `// @match             ${pattern}`);
  const firstMatch = matchIndices[0];
  const lastMatch = matchIndices[matchIndices.length - 1];

  const updatedLines = [
    ...lines.slice(0, firstMatch),
    ...newMatchLines,
    ...lines.slice(lastMatch + 1)
  ];

  fs.writeFileSync(userscriptPath, updatedLines.join('\n'));
}

const matches = buildMatches();
updateManifest(matches);
updateUserscript(matches);

console.log(`Updated ${matches.length} match patterns from domains.json`);
