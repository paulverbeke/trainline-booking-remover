# Project Guidelines

## Code Style
- Use plain, vanilla JavaScript and DOM APIs like the existing content script in [src/content-scripts/content.js](src/content-scripts/content.js#L1-L34).

## Architecture
- Manifest V3 extension wiring is defined in [src/manifest.json](src/manifest.json#L1-L32) and supports multiple travel booking websites (Trainline, FlixBus).
- The content script uses a `MutationObserver` to detect booking.com checkboxes on supported sites and unchecks them once per checkbox so users can re-enable them in [src/content-scripts/content.js](src/content-scripts/content.js#L1-L46).
- There is no background worker; behavior is implemented entirely via content scripts and the userscript.
- A separate Tampermonkey userscript exists with its own DOM selector logic in [userscript/travel-experience-cleaner.user.js](userscript/travel-experience-cleaner.user.js#L1-L30).

## Build and Test
- `npm run build` packages the extension after updating domains and syncing versions.
- Build pipeline consists of three automated scripts:
  - `npm run scrape:domains` - Discovers localized domains from website alternate links
  - `npm run build:update-domains` - Syncs [domains.json](domains.json) to [manifest.json](src/manifest.json) and [userscript](userscript/travel-experience-cleaner.user.js)
  - `npm run build:update-version` - Syncs version numbers across all distribution files
- `npm run validate` runs web-ext linting.
- `npm run lint` runs ESLint on src and scripts directories.

## Project Conventions
- The extension targets multiple travel booking websites via the manifest in [src/manifest.json](src/manifest.json): `*://www.thetrainline.com/*` and `*://www.flixbus.com/*`.
- Selector logic differs between sites; the content script handles multiple booking promo checkbox selectors in [src/content-scripts/content.js](src/content-scripts/content.js#L1-L35).
- The Tampermonkey userscript matches Trainline, FlixBus, and Skyscanner in [userscript/travel-experience-cleaner.user.js](userscript/travel-experience-cleaner.user.js#L1-L120).
- [domains.json](domains.json) is the single source of truth for all supported domains; build scripts propagate changes to manifest and userscript.

### Adding Support for New Websites

When adding a new travel booking website:

1. **Identify the checkbox selector** - Use browser DevTools to find the DOM selector for the promotional checkbox
2. **Add domains** to [domains.json](domains.json):
   - For multi-locale sites (like FlixBus): Add to [scrape-domains.js](scripts/scrape-domains.js) and run `npm run scrape:domains`
   - For single domains (like Trainline): Manually add to [domains.json](domains.json)
3. **Add selector logic** to both:
   - [src/content-scripts/content.js](src/content-scripts/content.js) - Extension content script
   - [userscript/travel-experience-cleaner.user.js](userscript/travel-experience-cleaner.user.js) - Userscript version
4. **Run build pipeline**: `npm run build:update-domains` to sync domains to manifest and userscript
5. **Test both distributions** on the new domains before releasing

## Integration Points
- Content script executes automatically on supported websites (Trainline, FlixBus, Skyscanner) to detect and uncheck booking.com-related checkboxes once per checkbox using site-specific selectors.

## Security
- Permissions are minimal (`activeTab`, `scripting`) and should stay tight unless a feature needs more in [src/manifest.json](src/manifest.json#L6-L9).
- Current behavior is page-local with no network or storage usage; preserve that unless explicitly required.

## Autres considérations
- Met a jour la `memory-bank` ou les différents instructions files si nécessaire et à chaque fois que tu ajoutes une nouvelle règle ou un pattern.
- toujours lancer la génération à la fin de l'implémentation pour vérifier que tout fonctionne correctement.
- Ne génère pas de markdown superflue, autres que ceux demandés dans les instructions. **Ne jamais créer de fichier IMPLEMENTATION_SUMMARY.md** - Ce type de documentation n'est pas nécessaire pour ce projet.