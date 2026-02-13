# The Trainline Booking Remover Extension

This project is a browser extension designed for the website [thetrainline.com](https://www.thetrainline.com). Its primary function is to automatically uncheck the checkbox for their partner booking.com, preventing the opening of a new tab for booking.com when searching for train schedules. It then also remove checkbox visually from the page.

## Features

- Automatically unchecks the booking.com checkbox on the Trainline website.
- Removes the booking.com checkbox visually from the page.
- Prevents the opening of a new tab for booking.com when a train schedule search is performed.
- Available as both a browser extension for Chrome and Firefox, and as a Tampermonkey userscript for users who prefer not to install the extension.

## Installation

### Browser Extension

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

### Tampermonkey Userscript

1. Install the Tampermonkey extension from the Chrome Web Store or Firefox Add-ons.
2. Create a new script in Tampermonkey and copy the contents of `userscript/trainline-booking-remover.user.js` into it.
3. Save the script and ensure it is enabled.

## Usage

- Once the extension is installed or the userscript is active, navigate to the Trainline website.
- The booking.com checkbox will be automatically unchecked and will be visually removed
- Perform a search for train schedules, a new tab will not open for booking.com, and you'll stay on the same tab to view your search results.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.