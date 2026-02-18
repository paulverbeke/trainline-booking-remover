# Booking.com Checkbox Remover

This project is a browser extension that automatically unchecks and removes the booking.com checkbox on several travel booking websites including [Trainline](https://www.thetrainline.com) and [FlixBus](https://www.flixbus.com). Its primary function is to prevent the opening of a new tab for booking.com when searching for travel options.

## Features

- Automatically unchecks the booking.com checkbox on supported websites (Trainline and FlixBus).
- Removes the booking.com checkbox visually from the page.
- Prevents the opening of a new tab for booking.com when searching for travel options.
- Available as both a browser extension for Chrome and Firefox, and as a Tampermonkey userscript for users who prefer not to install the extension.

## Installation

### Browser Extension

[![Firefox Add-on](https://img.shields.io/badge/Firefox-Get%20it%20now-FF7139?style=flat&logo=firefox)](https://addons.mozilla.org/firefox/addon/bookingdotcom-checkbox-remover/)

Chrome Web Store (coming soon)

### Tampermonkey Userscript

1. Install the Tampermonkey extension from the Chrome Web Store or Firefox Add-ons.
2. Create a new script in Tampermonkey and copy the contents of `userscript/trainline-booking-remover.user.js` into it.
3. Save the script and ensure it is enabled.

## Usage

- Once the extension is installed or the userscript is active, navigate to any supported website (Trainline, FlixBus, etc.).
- The booking.com checkbox will be automatically unchecked and will be visually removed.
- Perform a search for travel options, a new tab will not open for booking.com, and you'll stay on the same tab to view your search results.

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

---

# Retirer les cases Booking.com

[English](#bookingcom-checkbox-remover) | **Français**

Ce projet est une extension de navigateur qui décoche et supprime automatiquement la case booking.com sur plusieurs sites de réservation de voyage, notamment [Trainline](https://www.thetrainline.com) et [FlixBus](https://www.flixbus.com). Sa fonction principale est d'empêcher l'ouverture d'un nouvel onglet pour booking.com lors de la recherche d'options de voyage.

## Fonctionnalités

- Décoche automatiquement la case booking.com sur les sites web pris en charge (Trainline et FlixBus).
- Supprime visuellement la case booking.com de la page.
- Empêche l'ouverture d'un nouvel onglet pour booking.com lors de la recherche d'options de voyage.
- Disponible à la fois comme extension de navigateur pour Chrome et Firefox, et comme script utilisateur Tampermonkey pour les utilisateurs qui préfèrent ne pas installer l'extension.

## Installation

### Extension de navigateur

[![Complément Firefox](https://img.shields.io/badge/Firefox-Télécharger%20maintenant-FF7139?style=flat&logo=firefox)](https://addons.mozilla.org/fr/firefox/addon/bookingdotcom-checkbox-remover/)

Chrome Web Store (bientôt disponible)

### Script utilisateur Tampermonkey

1. Installez l'extension Tampermonkey depuis le Chrome Web Store ou Firefox Add-ons.
2. Créez un nouveau script dans Tampermonkey et copiez le contenu de `userscript/trainline-booking-remover.user.js` dedans.
3. Enregistrez le script et assurez-vous qu'il est activé.

## Utilisation

- Une fois l'extension installée ou le script utilisateur actif, accédez à n'importe quel site web pris en charge (Trainline, FlixBus, etc.).
- La case à cocher booking.com sera automatiquement déverrouillée et supprimée visuellement.
- Effectuez une recherche d'options de voyage, aucun nouvel onglet ne s'ouvrira pour booking.com, et vous resterez sur le même onglet pour consulter vos résultats de recherche.

## Développement

### Exécution locale

1. Clonez le référentiel :

   ```bash
   git clone <repository-url>
   cd trainline-booking-remover
   ```

2. Accédez au répertoire `src` et chargez l'extension dans votre navigateur :
   - Pour Chrome :
     - Ouvrez Chrome et allez à `chrome://extensions/`.
     - Activez le « Mode de développement ».
     - Cliquez sur « Charger l'extension non empaquetée » et sélectionnez le répertoire `src`.
   - Pour Firefox :
     - Ouvrez Firefox et allez à `about:debugging#/runtime/this-firefox`.
     - Cliquez sur « Charger un module complémentaire temporaire » et sélectionnez le fichier `manifest.json` du répertoire `src`.

**Remarque :** Pour Firefox, les modules complémentaires temporaires sont supprimés lorsque vous fermez le navigateur. Pour les tests permanents, vous devez signer l'extension via [addons.mozilla.org](https://addons.mozilla.org).

### Création pour la distribution

Pour créer un package prêt pour la production à destination du Chrome Web Store ou des modules complémentaires Firefox :

1. Installez les dépendances :

   ```bash
   npm install
   ```

2. Créez l'extension :

   ```bash
   npm run build
   ```

   Cela va :
   - Nettoyer le répertoire `dist/` précédent
   - Copier les fichiers source de `src/` vers `dist/`
   - Créer un fichier ZIP : `trainline-booking-remover-v1.0.0.zip`

3. Validez l'extension :

   ```bash
   npm run validate
   ```

   Cela exécute l'outil `web-ext` de Mozilla pour vérifier les problèmes courants et les erreurs de manifeste.

### Scripts de construction

- `npm run build` - Processus de construction complet (nettoyage, copie, zip)
- `npm run build:clean` - Supprimez le répertoire `dist/` et les fichiers ZIP
- `npm run build:copy` - Copier les fichiers source vers `dist/`
- `npm run build:zip` - Créer la distribution ZIP à partir de `dist/`
- `npm run validate` - Validez l'extension avec web-ext

Le fichier ZIP résultant dans le répertoire racine est prêt à être soumis aux magasins d'extensions de navigateur.

Assurez-vous de tester le package de fichier ZIP en le chargeant comme module complémentaire temporaire dans Firefox (les mêmes étapes que pour l'exécution à partir du dossier src) avant de le soumettre pour vous assurer que tout fonctionne comme prévu.

## Contribution

Les contributions sont les bienvenues ! N'hésitez pas à soumettre une demande de tirage ou une ouverture une issue pour toute suggestion ou amélioration.

## Licence

Ce projet est sous licence MIT. Voir le fichier LICENSE pour plus de détails.