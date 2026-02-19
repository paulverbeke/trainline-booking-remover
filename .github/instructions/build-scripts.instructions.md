---
name: 'Build Scripts and Domain Management'
description: 'Automated scripts for domain discovery, synchronization, and version management'
applyTo: 'scripts/**, domains.json, src/manifest.json, userscript/**'
---

# Build Scripts and Domain Management

This project uses automated build scripts to manage multi-locale domain support and ensure consistency across the browser extension and userscript distributions.

## Architecture

### Single Source of Truth Pattern

```
domains.json (central registry)
    ↓ (update-domains.js)
    ├→ src/manifest.json (content_scripts.matches)
    └→ userscript/*.user.js (@match directives)
```

**Key Principle:** Never manually edit domain match patterns in manifest.json or userscript files. Always update domains.json and run the sync script.

## Build Scripts

### 1. Domain Scraper (`scrape-domains.js`)

**Purpose:** Automatically discover all localized domains for multi-locale travel sites.

**How it works:**
- Fetches the homepage of each configured site
- Parses HTML `<link rel="alternate" hreflang="...">` tags
- Extracts unique domain names from alternate language links
- Updates `domains.json` with discovered domains

**Usage:**
```bash
npm run scrape:domains
```

**When to use:**
- When adding a new multi-locale site (like FlixBus, Skyscanner)
- Periodically to discover new regional domains launched by existing sites
- After a site redesigns their locale structure

**Example output:**
```
[Flixbus] Scraping...
  Found 48 unique domains (52 extracted, 4 duplicates)
[Skyscanner] Scraping...
  Found 54 unique domains (58 extracted, 4 duplicates)

✓ Updated domains.json
  - Flixbus: 48 domains
  - Skyscanner: 54 domains
```

**Implementation notes:**
- Follows HTTP redirects (301, 302, 307, 308)
- Normalizes URLs to extract clean domain names
- Deduplicates domains automatically
- 5-second timeout per request

**To add a new site to scraper:**

```javascript
// In scrape-domains.js
const sites = [
  { key: 'flixbus', name: 'Flixbus', url: 'https://www.flixbus.com' },
  { key: 'skyscanner', name: 'Skyscanner', url: 'https://www.skyscanner.com' },
  { key: 'newsite', name: 'New Site', url: 'https://www.newsite.com' }  // Add here
];
```

### 2. Domain Synchronizer (`update-domains.js`)

**Purpose:** Propagate domain changes from domains.json to all distribution files.

**How it works:**
- Reads all domains from `domains.json`
- Generates match patterns in format `*://domain.com/*`
- Updates `src/manifest.json` content_scripts matches array
- Updates userscript `// @match` directives
- Deduplicates patterns to avoid redundancy

**Usage:**
```bash
npm run build:update-domains
```

**When to use:**
- After manually editing `domains.json`
- After running `npm run scrape:domains`
- When adding or removing supported sites
- As part of the main build pipeline (`npm run build`)

**Example output:**
```
Updated 103 match patterns from domains.json
```

**What it updates:**

**In src/manifest.json:**
```json
{
  "content_scripts": [
    {
      "matches": [
        "*://www.thetrainline.com/*",
        "*://www.flixbus.com/*",
        "*://www.flixbus.de/*",
        ...
      ]
    }
  ]
}
```

**In userscript:**
```javascript
// @match             *://www.thetrainline.com/*
// @match             *://www.flixbus.com/*
// @match             *://www.flixbus.de/*
```

### 3. Version Synchronizer (`update-version.js`)

**Purpose:** Keep version numbers consistent across package.json, manifest.json, and userscript.

**How it works:**
- Reads version from `package.json`, `src/manifest.json`, and userscript `@version`
- Compares versions using semantic versioning rules (major.minor.patch)
- Finds the highest version number
- Updates all three files to match the highest version

**Usage:**
```bash
npm run build:update-version
```

**When to use:**
- After bumping version in any of the three files
- Before creating a release
- As part of the main build pipeline (`npm run build`)

**Example output:**
```
Version synced to 1.0.3
  Updated package.json
  Updated src/manifest.json
  Updated userscript/travel-experience-cleaner.user.js
```

**Versioning strategy:**
- Uses semantic versioning comparison
- Always syncs "upward" to highest version
- Prevents version drift between distributions
- Ensures users see consistent version numbers

## Complete Build Pipeline

The main build command orchestrates all scripts:

```bash
npm run build
```

**Executes in order:**
1. `npm run build:update-domains` - Sync domains
2. `npm run build:update-version` - Sync versions
3. `npm run build:package` - Package extension with web-ext

## Workflow: Adding Support for a New Website

Follow these steps to add a new travel booking site:

### Step 1: Identify the Site's Characteristics

- **Single domain** (like Trainline: only www.thetrainline.com) → Add manually to domains.json
- **Multi-locale** (like FlixBus: www.flixbus.com, www.flixbus.de, etc.) → Add to scraper

### Step 2: Update domains.json

**For single domain sites:**
```json
{
  "trainline": ["www.thetrainline.com"],
  "newsite": ["www.newsite.com"]
}
```

**For multi-locale sites:**
1. Add site to `scripts/scrape-domains.js`:
   ```javascript
   const sites = [
     { key: 'newsite', name: 'New Site', url: 'https://www.newsite.com' }
   ];
   ```
2. Run: `npm run scrape:domains`

### Step 3: Add Checkbox Selectors

Identify the DOM selector for the promotional checkbox using DevTools.

**Update src/content-scripts/content.js:**
```javascript
const SELECTORS = [
  '#bookingPromo',                          // Trainline
  '#find-my-accommodation-checkbox',        // FlixBus
  'input[name="parallel-search-option"]',   // Skyscanner
  '#newsite-promo-checkbox'                 // New site
];
```

**Update userscript/travel-experience-cleaner.user.js:**
```javascript
const SELECTORS = [
  '#bookingPromo',
  '#find-my-accommodation-checkbox',
  'input[name="parallel-search-option"]',
  '#newsite-promo-checkbox'
];
```

**CRITICAL:** Both files must have identical selectors for consistency.

### Step 4: Sync and Build

```bash
npm run build:update-domains  # Sync domains to manifest/userscript
npm run validate              # Lint extension
npm run build                 # Full build
```

### Step 5: Test Both Distributions

1. Load extension in browser (chrome://extensions or about:debugging)
2. Install userscript in Tampermonkey
3. Visit all localized domains for the new site
4. Verify checkboxes are detected and unchecked

## Best Practices

### DO
- ✅ Always run `npm run build:update-domains` after editing domains.json
- ✅ Use the scraper for multi-locale sites to discover all domains
- ✅ Keep selectors synchronized between content script and userscript
- ✅ Test both extension and userscript after adding new sites
- ✅ Run `npm run validate` before committing changes

### DON'T
- ❌ Manually edit match patterns in manifest.json
- ❌ Manually edit @match directives in userscript
- ❌ Add domains that don't actually host the travel booking interface
- ❌ Skip testing after domain changes
- ❌ Forget to run build:update-domains after scraping

## Troubleshooting

### Problem: Scraper can't find alternate links

**Solution:** Check if the site uses a different pattern for locale links. Some sites use:
- JavaScript-based locale switchers (not scrapable)
- Subdirectories instead of subdomains (e.g., /en/, /de/)
- Different HTML tags or attributes

For non-scrapable sites, manually research localized domains and add to domains.json.

### Problem: Build script fails with "No @match lines found"

**Solution:** The userscript file must have at least one `// @match` line. Check the userscript header format.

### Problem: Extension doesn't work on new domains

**Checklist:**
1. Verify domains.json was updated
2. Run `npm run build:update-domains`
3. Reload extension in browser (click reload button in chrome://extensions)
4. Check browser console for errors
5. Verify checkbox selector is correct for the site

### Problem: Version numbers out of sync

**Solution:** Run `npm run build:update-version` to sync all version numbers to the highest version found.

## File Reference

| File | Purpose | Edit Manually? |
|------|---------|----------------|
| `domains.json` | Central domain registry | ✅ Yes (or use scraper) |
| `scripts/scrape-domains.js` | Domain discovery | ✅ Yes (to add new sites) |
| `scripts/update-domains.js` | Domain synchronization | ⚠️ Rarely (logic changes) |
| `scripts/update-version.js` | Version synchronization | ⚠️ Rarely (logic changes) |
| `src/manifest.json` | Extension configuration | ❌ No (auto-generated matches) |
| `userscript/*.user.js` | Userscript distribution | ❌ No (auto-generated @match) |
| `src/content-scripts/content.js` | Extension logic | ✅ Yes (selectors, behavior) |

## Summary

The build scripts implement a "single source of truth" architecture where `domains.json` is the authoritative source for all supported domains. Automated scripts propagate changes to the extension manifest and userscript, ensuring consistency and reducing manual errors. When adding new sites, always follow the workflow above and remember to run the sync scripts before testing.
