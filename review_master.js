const fs = require('fs');
const content = fs.readFileSync('./src/lib/data/treatments.ts', 'utf-8');
const names = [...content.matchAll(/name:\s*"([^"]+)"/g)].map(m => m[1]);
const duplicates = names.filter((e, i, a) => a.indexOf(e) !== i);
console.log("Duplicates in TREATMENTS_MASTER:", duplicates);
