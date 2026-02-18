/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const https = require('https');

const rootPath = path.join(__dirname, '..');
const domainsPath = path.join(rootPath, 'domains.json');

/**
 * Fetch a URL and return the text content, following redirects
 */
function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { timeout: 5000 }, (res) => {
      // Handle redirects (301, 302, 303, 307, 308)
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        fetchUrl(res.headers.location).then(resolve).catch(reject);
        return;
      }

      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve(data);
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

/**
 * Extract domain from URL, keeping subdomain and removing path
 */
function extractDomain(url) {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname;
  } catch (e) {
    return null;
  }
}

/**
 * Extract domains from alternate language links in HTML
 */
function extractAlternateLanguageDomains(html) {
  const linkTags = html.match(/<link[^>]*>/gi) || [];
  const matches = new Set();
  let extractedCount = 0;

  linkTags.forEach(tag => {
    if (tag.includes('rel="alternate"')) {
      // Match: href="url" or href=url (with or without quotes)
      const hrefMatch = tag.match(/href=(?:"([^"]+)"|([^\s>]+))/i);
      if (hrefMatch) {
        const href = hrefMatch[1] || hrefMatch[2]; // Use quoted or unquoted value
        const domain = extractDomain(href);
        if (domain) {
          extractedCount++;
          matches.add(domain);
        }
      }
    }
  });

  return { unique: Array.from(matches).sort(), extracted: extractedCount, duplicates: extractedCount - matches.size };
}

/**
 * Generic site scraper
 */
async function scrapeSite(name, url) {
  console.log(`[${name}] Scraping...`);
  try {
    const html = await fetchUrl(url);
    const { unique, extracted, duplicates } = extractAlternateLanguageDomains(html);
    console.log(`  Found ${unique.length} unique domains (${extracted} extracted, ${duplicates} duplicates)`);
    return unique;
  } catch (err) {
    console.error(`  Error scraping ${name}: ${err.message}`);
    return [];
  }
}

/**
 * Main scraper
 */
async function updateDomainsFromWeb() {
  console.log('Starting domain scraper...\n');

  const domains = JSON.parse(fs.readFileSync(domainsPath, 'utf-8'));

  // Define sites to scrape with their URLs
  const sites = [
    { key: 'flixbus', name: 'Flixbus', url: 'https://www.flixbus.com' },
    { key: 'skyscanner', name: 'Skyscanner', url: 'https://www.skyscanner.com' }
  ];

  // Scrape each site
  for (const site of sites) {
    const domainList = await scrapeSite(site.name, site.url);
    domains[site.key] = domainList;
  }

  // Write updated domains
  fs.writeFileSync(domainsPath, JSON.stringify(domains, null, 2) + '\n');

  console.log('\n✓ Updated domains.json');
  console.log(`  - Flixbus: ${domains.flixbus.length} domains`);
  console.log(`  - Skyscanner: ${domains.skyscanner.length} domains`);
}

updateDomainsFromWeb().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
