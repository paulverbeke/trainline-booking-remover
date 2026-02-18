# Project Guidelines

## Code Style
- Use plain, vanilla JavaScript and DOM APIs like the existing content script in [src/content-scripts/content.js](src/content-scripts/content.js#L1-L34).

## Architecture
- Manifest V3 extension wiring is defined in [src/manifest.json](src/manifest.json#L1-L32) and supports multiple travel booking websites (Trainline, FlixBus).
- The content script uses a `MutationObserver` to detect booking.com checkboxes on supported sites and unchecks them in [src/content-scripts/content.js](src/content-scripts/content.js#L1-L34).
- The background worker only responds to an `openBooking` message in [src/background/background.js](src/background/background.js#L1-L12).
- A separate Tampermonkey userscript exists with its own DOM selector logic in [userscript/trainline-booking-remover.user.js](userscript/trainline-booking-remover.user.js#L1-L21).

## Build and Test
- `npm run build`, `npm run test`, and `npm run lint` are placeholders that only echo messages in [package.json](package.json#L1-L21).

## Project Conventions
- The extension targets multiple travel booking websites via the manifest in [src/manifest.json](src/manifest.json): `*://www.thetrainline.com/*` and `*://www.flixbus.com/*`.
- Selector logic differs between sites; the content script handles multiple booking promo checkbox selectors in [src/content-scripts/content.js](src/content-scripts/content.js#L1-L35).
- The Tampermonkey userscript matches both Trainline and FlixBus in [userscript/trainline-booking-remover.user.js](userscript/trainline-booking-remover.user.js#L1-L21).

## Integration Points
- Content script executes automatically on supported websites (Trainline, FlixBus) to detect and uncheck booking.com-related checkboxes using site-specific selectors.

## Security
- Permissions are minimal (`activeTab`, `scripting`) and should stay tight unless a feature needs more in [src/manifest.json](src/manifest.json#L6-L9).
- Current behavior is page-local with no network or storage usage; preserve that unless explicitly required.

## Autres considérations
- Met a jour la `memory-bank` ou les différents instructions files si nécessaire et à chaque fois que tu ajoutes une nouvelle règle ou un pattern.
- toujours lancer la génération à la fin de l'implémentation pour vérifier que tout fonctionne correctement.
- Ne génère pas de markdown superflue, autres que ceux demandés dans les instructions. **Ne jamais créer de fichier IMPLEMENTATION_SUMMARY.md** - Ce type de documentation n'est pas nécessaire pour ce projet.