const fs = require('fs');

const megaMenuFile = fs.readFileSync('./src/lib/data/mega-menu-treatments.ts', 'utf8');
const dataFile = fs.readFileSync('./src/lib/data/treatment-detail-data.ts', 'utf8');

const expectedSlugs = new Set();
const hrefRegex = /href:\s*"\/treatments\/([^"]+)"/g;
let match;
while ((match = hrefRegex.exec(megaMenuFile)) !== null) {
  expectedSlugs.add(match[1]);
}

const definedSlugs = new Set();
const slugRegex = /if\s*\(\s*slug\s*===\s*"([^"]+)"/g;
while ((match = slugRegex.exec(dataFile)) !== null) {
  definedSlugs.add(match[1]);
}

console.log("--- Defined Slugs in Data ---");
console.log(Array.from(definedSlugs).join("\n"));
