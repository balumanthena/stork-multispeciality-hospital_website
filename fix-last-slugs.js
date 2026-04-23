const fs = require('fs');
let dataFile = fs.readFileSync('./src/lib/data/treatment-detail-data.ts', 'utf8');

const fixes = [
  { defined: 'foot-or-ankle-pain', add: 'foot-and-ankle-pain' },
  { defined: 'antepartum-and-intrapartum-monitoring', add: 'antepartum-and-intrapartum' },
  { defined: 'bronchoscopy-foreign-body-removal', add: 'bronchoscopy-guided-foreign-body-removal' },
  { defined: 'lung-cancer-treatment', add: 'lung-cancer-care' },
  { defined: 'metabolic-endocrine-disorders', add: 'metabolic-and-endocrine-disorders' }
];

for (const {defined, add} of fixes) {
  // We look for `slug === "defined"` and just append ` || slug === "add"` right after it.
  dataFile = dataFile.replace(`slug === "${defined}"`, `slug === "${defined}" || slug === "${add}"`);
}

fs.writeFileSync('./src/lib/data/treatment-detail-data.ts', dataFile, 'utf8');
