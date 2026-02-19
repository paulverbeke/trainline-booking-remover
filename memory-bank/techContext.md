## Tech Context

### Technologies

- Vanilla JavaScript with DOM APIs.
- Manifest V3 browser extension.
- Tampermonkey userscript for non-extension users.
- `web-ext` for packaging and validation.
- Node.js scripts for automation (domain management, version syncing).

### Development Setup

#### Build Scripts

The project uses three key Node.js scripts in the `scripts/` folder:

1. **`scrape-domains.js`** (`npm run scrape:domains`)
   - Scrapes website homepages to discover all localized domains via HTML `<link rel="alternate">` tags
   - Currently scrapes FlixBus and Skyscanner
   - Extracts unique domains from alternate language links
   - Updates `domains.json` with discovered domains
   - Trainline domains are manually managed (single domain)

2. **`update-domains.js`** (`npm run build:update-domains`)
   - Reads `domains.json` and generates match patterns for all domains
   - Updates `src/manifest.json` content_scripts matches array
   - Updates userscript `@match` directives in `userscript/travel-experience-cleaner.user.js`
   - Ensures both extension and userscript target the same domains

3. **`update-version.js`** (`npm run build:update-version`)
   - Syncs version numbers across `package.json`, `src/manifest.json`, and userscript `@version`
   - Uses semantic version comparison to find the highest version
   - Updates all three files to match the highest version found
   - Prevents version drift between distribution channels

#### Build Commands

- `npm run scrape:domains` - Discover new localized domains for supported sites
- `npm run build:update-domains` - Sync domains.json to manifest and userscript
- `npm run build:update-version` - Sync version numbers across all files
- `npm run build` - Full build: update domains, sync version, package extension
- `npm run validate` - Run `web-ext` linting
- `npm run lint` - Run ESLint on `src` and `scripts`

#### Adding Support for New Websites

**Workflow:**

1. **Update `domains.json`** with the new site's domains:
   - For multi-locale sites: Add to scraper in `scrape-domains.js`, run `npm run scrape:domains`
   - For single domains: Manually add to `domains.json`

2. **Add selectors** for the site's checkboxes:
   - Update `src/content-scripts/content.js` with new checkbox selectors
   - Update `userscript/travel-experience-cleaner.user.js` with same selectors
   - Add site-specific detection logic if needed

3. **Run build pipeline:**
   ```bash
   npm run build:update-domains  # Sync domains to manifest/userscript
   npm run validate              # Check for errors
   npm run build                 # Package extension
   ```

4. **Test both distributions:**
   - Test browser extension on new domains
   - Test userscript on new domains

**Example: Adding a new site "ExampleTravel"**

```javascript
// 1. Add to domains.json
{
  "trainline": [...],
  "flixbus": [...],
  "skyscanner": [...],
  "exampletravel": ["www.exampletravel.com", "www.exampletravel.fr", ...]
}

// 2. Add to scrape-domains.js (if multi-locale)
const sites = [
  { key: 'flixbus', name: 'Flixbus', url: 'https://www.flixbus.com' },
  { key: 'skyscanner', name: 'Skyscanner', url: 'https://www.skyscanner.com' },
  { key: 'exampletravel', name: 'Example Travel', url: 'https://www.exampletravel.com' }
];

// 3. Add selector to content.js and userscript
const SELECTORS = [
  '#bookingPromo',
  '#find-my-accommodation-checkbox',
  'input[name="parallel-search-option"]',
  '#example-travel-promo'  // New selector
];
```

### Constraints

- No network calls or storage usage in content scripts.
- Permissions remain minimal and page-local.
