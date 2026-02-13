# The Trainline Booking Remover Extension

This project is a browser extension designed for the website [thetrainline.com](https://www.thetrainline.com). Its primary function is to automatically uncheck the checkbox for their partner booking.com, preventing the opening of a new tab for booking.com when searching for train schedules. It then also remove checkbox visually from the page.

## Features

- Automatically unchecks the booking.com checkbox on the Trainline website.
- Removes the booking.com checkbox visually from the page.
- Prevents the opening of a new tab for booking.com when a train schedule search is performed.
- Available as both a browser extension for Chrome and Firefox, and as a Tampermonkey userscript for users who prefer not to install the extension.

## Installation

### Browser Extension

*placeholder for future store links*

### Tampermonkey Userscript

1. Install the Tampermonkey extension from the Chrome Web Store or Firefox Add-ons.
2. Create a new script in Tampermonkey and copy the contents of `userscript/trainline-booking-remover.user.js` into it.
3. Save the script and ensure it is enabled.

## Usage

- Once the extension is installed or the userscript is active, navigate to the Trainline website.
- The booking.com checkbox will be automatically unchecked and will be visually removed
- Perform a search for train schedules, a new tab will not open for booking.com, and you'll stay on the same tab to view your search results.

## Development

### Running Locally

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd trainline-booking-remover
   ```

2. Navigate to the `src` directory and load the extension in your browser:
   - For Chrome:
     - Open Chrome and go to `chrome://extensions/`.
     - Enable "Developer mode".
     - Click "Load unpacked" and select the `src` directory.
   - For Firefox:
     - Open Firefox and go to `about:debugging#/runtime/this-firefox`.
     - Click "Load Temporary Add-on" and select the `manifest.json` file from the `src` directory.

**Note:** For Firefox, temporary add-ons are removed when you close the browser. For permanent testing, you'll need to sign the extension through [addons.mozilla.org](https://addons.mozilla.org).

### Building for Distribution

To create a production-ready package for Chrome Web Store or Firefox Add-ons:

1. Install dependencies:

   ```bash
   npm install
   ```

2. Build the extension:

   ```bash
   npm run build
   ```

   This will:
   - Clean the previous `dist/` directory
   - Copy source files from `src/` to `dist/`
   - Create a ZIP file: `trainline-booking-remover-v1.0.0.zip`

3. Validate the extension:

   ```bash
   npm run validate
   ```

   This runs Mozilla's `web-ext` tool to check for common issues and manifest 
   errors.

### Build Scripts

- `npm run build` - Complete build process (clean, copy, zip)
- `npm run build:clean` - Remove the `dist/` directory and ZIP files
- `npm run build:copy` - Copy source files to `dist/`
- `npm run build:zip` - Create distribution ZIP from `dist/`
- `npm run validate` - Validate extension with web-ext

The resulting ZIP file in the root directory is ready for submission to browser extension stores.

Make sure to test the ZIP file package by loading it as a temporary add-on in Firefox (the same steps that for running from src folder) before submitting to ensure everything works as expected.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.