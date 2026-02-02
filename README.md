# trainline-booking-remover

A Tampermonkey userscript that automatically unchecks the booking.com checkbox on thetrainline.com homepage.

## About

This script automatically unchecks the booking.com accommodation checkbox that appears on The Trainline website, saving you from having to manually uncheck it every time you search for trains.

## Installation

### Prerequisites

You need a userscript manager browser extension installed:
- [Tampermonkey](https://www.tampermonkey.net/) (Chrome, Firefox, Safari, Edge, Opera)
- [Greasemonkey](https://www.greasespot.net/) (Firefox)
- [Violentmonkey](https://violentmonkey.github.io/) (Chrome, Firefox, Edge)

### Install the Script

1. Install Tampermonkey (or another userscript manager) from the link above
2. Click on this link to install the script: [trainline-booking-remover.user.js](trainline-booking-remover.user.js)
3. Your userscript manager should open and prompt you to install the script
4. Click "Install" to confirm

Alternatively, you can:
1. Copy the contents of `trainline-booking-remover.user.js`
2. Open your userscript manager dashboard
3. Create a new script
4. Paste the contents
5. Save the script

## Usage

Once installed, the script runs automatically whenever you visit thetrainline.com. It will:

- Uncheck the booking.com checkbox immediately when the page loads
- Monitor the page for any dynamically added checkboxes
- Automatically uncheck the checkbox if it appears later

No manual interaction is required - just browse thetrainline.com as usual!

## How It Works

The script:
1. Searches for checkboxes related to booking.com using multiple selectors
2. Unchecks any checked booking.com checkboxes found
3. Uses a MutationObserver to detect and handle dynamically loaded content
4. Logs actions to the browser console for debugging

## Compatibility

- Works on all modern browsers with Tampermonkey support
- Compatible with both www.thetrainline.com and thetrainline.com
- Handles both static and dynamically loaded checkboxes

## Troubleshooting

If the script doesn't work:
1. Make sure Tampermonkey is enabled and the script is active
2. Check the browser console (F12) for log messages from the script
3. Refresh the page after installing the script
4. Verify that you're on thetrainline.com domain

## License

MIT License - see [LICENSE.md](LICENSE.md) for details

## Contributing

Contributions are welcome! Feel free to:
- Report issues
- Suggest improvements
- Submit pull requests

## Author

Paul Verbeke
