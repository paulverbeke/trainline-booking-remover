## System Patterns

### Extension Architecture

- Manifest V3 content script runs on supported domains.
- A `MutationObserver` triggers a page scan for known checkboxes.
- Each checkbox is only handled once using a data attribute guard.
- No background worker; all behavior runs in content scripts/userscript.

### Userscript Architecture

- Tampermonkey userscript mirrors content script logic.
- Same selectors and one-time handling guard are used for consistency.

### Domain Management System

The project uses a centralized domain management system to ensure the extension and userscript target the same websites:

**Data Flow:**
```
domains.json (source of truth)
    ↓ (update-domains.js)
    ├→ src/manifest.json (content_scripts.matches)
    └→ userscript/*.user.js (@match directives)
```

**File Responsibilities:**

- **`domains.json`**: Central registry of all supported domains by site
  - Organized by site key (trainline, flixbus, skyscanner)
  - Contains arrays of full domain names (with subdomain)
  - Populated manually or via `scrape-domains.js`

- **`scripts/scrape-domains.js`**: Domain discovery automation
  - Fetches homepage HTML for each configured site
  - Parses `<link rel="alternate">` tags to find localized versions
  - Extracts unique domains and updates `domains.json`
  - Handles redirects and URL normalization
  - Reports duplicates and extraction statistics

- **`scripts/update-domains.js`**: Domain synchronization
  - Reads `domains.json` and builds match patterns (`*://domain/*`)
  - Updates extension manifest's content_scripts matches
  - Updates userscript @match directives
  - Ensures no duplicate patterns

- **`scripts/update-version.js`**: Version synchronization
  - Compares versions in package.json, manifest.json, and userscript
  - Uses semantic version comparison (major.minor.patch)
  - Syncs all files to the highest version found
  - Prevents version inconsistencies across distributions

**Pattern:** Single source of truth (domains.json) with automated propagation ensures consistency across extension and userscript distributions.

### Selector Strategy

Each supported site has specific DOM selectors for checkboxes:

- Trainline: `#bookingPromo`
- FlixBus: `#find-my-accommodation-checkbox`
- Skyscanner: `input[name="parallel-search-option"]`

**Pattern:** Site-specific selectors are hardcoded in both content script and userscript. When adding a new site, both files must be updated with the same selectors for consistency.
