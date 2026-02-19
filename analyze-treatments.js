
const fs = require('fs');

// 1. Parse Hardcoded Treatments using Regex
const hardcodedFile = fs.readFileSync('src/lib/data/hardcoded-treatments.ts', 'utf8');
const categoryRegex = /title:\s*"([^"]+)",[\s\S]*?items:\s*\[([\s\S]*?)\]/g;
const itemRegex = /title:\s*"([^"]+)",\s*href:\s*"([^"]+)"/g;

const treatments = [];
let catMatch;

while ((catMatch = categoryRegex.exec(hardcodedFile)) !== null) {
    const category = catMatch[1];
    const itemsBlock = catMatch[2];

    let itemMatch;
    while ((itemMatch = itemRegex.exec(itemsBlock)) !== null) {
        treatments.push({
            category,
            title: itemMatch[1],
            href: itemMatch[2],
            slug: itemMatch[2].split('/').pop()
        });
    }
}

// 2. Parse Detailed Data using Regex
const detailFile = fs.readFileSync('src/lib/data/treatment-detail-data.ts', 'utf8');
const detailRegex = /if\s*\(slug\s*===\s*"([^"]+)"\)/g;
const detailedSlugs = new Set();
let detailMatch;
while ((detailMatch = detailRegex.exec(detailFile)) !== null) {
    detailedSlugs.add(detailMatch[1]);
}

// 3. Generate Report
console.log('# Treatment Analysis Report\n');
console.log(`**Total Treatments Listed:** ${treatments.length}`);
console.log(`**Detailed Content Available:** ${detailedSlugs.size}`);
console.log(`**Coverage:** ${Math.round(detailedSlugs.size / treatments.length * 100)}%\n`);

console.log('## Missing Content (Placeholder Mode)');
const missing = treatments.filter(t => !detailedSlugs.has(t.slug));
if (missing.length === 0) {
    console.log('None! All treatments have detailed content.');
} else {
    missing.forEach(t => console.log(`- [ ] ${t.title} (${t.category})`));
}

console.log('\n## All Treatments List');
console.log('| Category | Treatment | Slug | Status |');
console.log('|---|---|---|---|');
treatments.forEach(t => {
    const hasDetail = detailedSlugs.has(t.slug);
    console.log(`| ${t.category} | ${t.title} | ${t.slug} | ${hasDetail ? '✅' : '⚠️'} |`);
});
