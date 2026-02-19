## Project Brief

Travel Experience Cleaner is a browser extension and Tampermonkey userscript
that defaults promotional checkboxes and hotel search options to unchecked on
supported travel booking sites. The extension runs locally in the page without
network or storage usage.

### Goals

- Default promotional checkboxes and hotel search options to unchecked on load.
- Keep user control: once a user re-checks, it stays enabled.
- Support Trainline, FlixBus, and Skyscanner domains.
- Maintain minimal permissions and a page-local execution model.

### Non-Goals

- No background tracking, analytics, or data collection.
- No additional permissions beyond what is required for content scripts.
- No server-side components.
