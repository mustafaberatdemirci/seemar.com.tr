// Sitemap Generator Script
// Run: node scripts/generate-sitemap.js

const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://www.seemar.com.tr';

// All product slugs from constants.ts
const productSlugs = [
    'afyon-white', 'afyon-sugar', 'carrara-white', 'calacatta-marble', 'marmara-white',
    'marmara-equator', 'mugla-white', 'kemalpasa-white', 'ottoman-beige', 'burdur-beige',
    'crema-nouva', 'bilecik-rosalia', 'sivrihisar-beige', 'crema-bella', 'botticino',
    'mediterranean-emperador', 'spanish-emperador', 'light-emperador', 'dark-emperador',
    'grey-emperador', 'tundra-grey', 'cool-grey', 'rosso-levanto',
    'denizli-travertine', 'silver-travertine', 'arizona-travertine', 'grey-travertine',
    'light-travertine', 'yellow-travertine', 'classic-travertine', 'noche-travertine',
    'honey-onyx', 'green-onyx', 'white-onyx',
    'classic-limestone', 'cloudy-limestone', 'sesame-limestone',
    'anatolian-grey-granite', 'wildflower-granite', 'aksaray-yaylak-granite',
    'active-dolomite', 'dolomite-spider', 'white-dolomite',
    'hexagon-carrara', 'tundra-grey-hexagon-mosaic', 'light-beige-marble-mosaic', 'emperador-beige-mix-marble-mosaic',
    'granite-pebbles-5-10cm', 'tumbled-granite', 'tumbled-granite-1-3cm', 'tumbled-granite-4-6cm',
    'granite-gravel', 'tumbled-granite-2-4cm', 'white-dolomite-2-4cm', 'dolomite', 'dolomite-4-6cm',
    'marmara-white-dolomite', 'dolomite-stone', 'dolomite-rock', 'tumbled-basalt-gravel',
    'tumbled-basalt', 'basalt-gravel', 'mixed-color-pebbles', 'river-pebbles', 'dere-cakili',
    'flat-podima', 'tumbled-pebbles', 'podima-stone', 'all-mix', 'black-stone',
    'tumbled-aegean-burgundy', 'tumbled-burgundy', 'green-angel', 'black-angel', 'desert-yellow',
    'angelo-cristalo', 'calcite', 'white-slag', 'riviera', 'sherry', 'rainbow', 'yellow-river',
    'pink-travertine-tumbled', 'pearl', 'rainbow-stone', 'tumbled-stone-application',
    'quartz-sand', 'quartz-powder', 'quartz-granule', 'silica-sand',
    'rustic-split', 'classic-travertine-split', 'noce-split', 'afyon-grey-split'
];

function generateProductEntry(slug) {
    const trUrl = `${BASE_URL}/tr/urunler/${slug}`;
    const enUrl = `${BASE_URL}/en/products/${slug}`;

    return `
  <url>
    <loc>${trUrl}</loc>
    <xhtml:link rel="alternate" hreflang="tr" href="${trUrl}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${enUrl}"/>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${enUrl}</loc>
    <xhtml:link rel="alternate" hreflang="tr" href="${trUrl}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${enUrl}"/>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
}

// Generate all product entries
const productEntries = productSlugs.map(generateProductEntry).join('\n');

console.log('Generated entries for', productSlugs.length, 'products');
console.log('Total URL entries:', productSlugs.length * 2);

// Write to file
const outputPath = path.join(__dirname, '..', 'public', 'sitemap-products.xml');
const content = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${productEntries}
</urlset>`;

fs.writeFileSync(outputPath, content);
console.log('Saved to:', outputPath);
