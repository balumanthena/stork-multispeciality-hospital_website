const fs = require('fs');

const masterFile = fs.readFileSync('./src/lib/data/treatments.ts', 'utf8');
const dataFile = fs.readFileSync('./src/lib/data/treatment-detail-data.ts', 'utf8');
const megaMenuFile = fs.readFileSync('./src/lib/data/mega-menu-treatments.ts', 'utf8');

const slugify = (name) => {
    return name
        .toLowerCase()
        .replace(/&/g, "and")
        .replace(/\s+/g, "-")
        .replace(/\//g, "-")
        .replace(/[^a-z0-9-]/g, "")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");
};

const masterSlugs = new Set();
let match;
const nameRegex = /name:\s*"([^"]+)"/g;
while ((match = nameRegex.exec(masterFile)) !== null) {
  masterSlugs.add(slugify(match[1]));
}

const megaSlugs = new Set();
const hrefRegex = /href:\s*"\/treatments\/([^"]+)"/g;
while ((match = hrefRegex.exec(megaMenuFile)) !== null) {
  megaSlugs.add(match[1]);
}

const definedSlugs = new Set();
// Match any slug string inside if (slug === "...") or slug === "..."
const slugRegex = /slug\s*===\s*"([^"]+)"/g;
while ((match = slugRegex.exec(dataFile)) !== null) {
  definedSlugs.add(match[1]);
}

const missingMaster = [];
for (const slug of masterSlugs) {
  if (!definedSlugs.has(slug)) missingMaster.push(slug);
}

const missingMega = [];
for (const slug of megaSlugs) {
  if (!definedSlugs.has(slug)) missingMega.push(slug);
}

console.log("Missing Master:", missingMaster);
console.log("Missing Mega:", missingMega);
