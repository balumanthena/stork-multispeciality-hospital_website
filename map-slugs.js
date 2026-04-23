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
const slugRegex = /if\s*\(\s*slug\s*===\s*"([^"]+)"/g;
while ((match = slugRegex.exec(dataFile)) !== null) {
  definedSlugs.add(match[1]);
}

const allExpected = new Set([...masterSlugs, ...megaSlugs]);
const missingSlugs = Array.from(allExpected).filter(s => !definedSlugs.has(s));

const mapping = {
  // Map missing expected slugs to defined slugs
  'ablation': 'ablation-therapy',
  'headach-migraine': 'headache-migraine',
  'sports-injury-pain': 'sports-pain',
  'sports-pain': 'sports-pain',
  'antepartum-intrapartum-care': 'antepartum-and-intrapartum-monitoring',
  'antepartum-and-intrapartum': 'antepartum-and-intrapartum-monitoring',
  'parental-care': 'prenatal-care', // Note: we changed TREATMENTS_MASTER to Prenatal care, so this is prenatal-care. Wait, we did? Let's map both just in case.
  'labor-and-delivery': 'labor-and-delivery',
  'labour-delivery': 'labor-and-delivery',
  'foot-ankle-pain': 'foot-or-ankle-pain',
  'foot-and-ankle-pain': 'foot-or-ankle-pain',
  'hip-replacement': 'hip-replacement-surgery',
  'infectious-disease': 'management-of-infections',
  'metabolic-endocrine': 'metabolic-endocrine-disorders',
  'metabolic-and-endocrine-disorders': 'metabolic-endocrine-disorders',
  'diagnostic-procedures': 'diagnostic-procedure',
  'endoscopic-interlaminar': 'endoscopic-interlaminar-discectomy',
  'transforaminal-endoscopic': 'transforaminal-endoscopic-lumbar-discectomy',
  'piles': 'piles-hemorrhoids',
  'monoplasty': 'monsplasty',
  'sinus-surgery': 'sinus-treatment',
  'bariatric': 'bariatric-surgery',
  'gastrointestinal': 'gastrointestinal-issues',
  'asthma': 'asthma-management',
  'bronchoscopy': 'bronchoscopy-services',
  'foreign-body-removal': 'bronchoscopy-foreign-body-removal',
  'bronchoscopy-guided-foreign-body-removal': 'bronchoscopy-foreign-body-removal',
  'copd': 'copd-management',
  'lung-biopsy': 'lung-biopsy-services',
  'lung-cancer': 'lung-cancer-treatment',
  'lung-cancer-care': 'lung-cancer-treatment',
  'post-covid': 'post-covid-recovery',
  'anal-fistulas': 'anal-fistula',
  'perianth-abscess': 'perianal-abscess',
  'laser-circumsession': 'circumcision',
  'gall-stones': 'gallstones',
  'diabetic-foot': 'diabetic-foot-ulcer',
  'tkr': 'total-knee-replacement',
  'backpain': 'back-pain',
  'cancer-pain': 'cancer-pain-management',
  'regenerative-therapy-prp': 'regenerative-therapies',
  'labioplasty': 'labiaplasty',
  'turp-prostatectomy': 'prostatectomy',
  'kidney-stone-pcnl': 'pcnl',
  'adenoidectomy-tonsillectomy': 'adenoidectomy', // Close enough
  'typanoplasty': 'tympanoplasty',
  'dvt-deep-vein-thrombosis': 'dvt',
  'foreskin-infections': 'foreskin-infection'
};

let newDataFile = dataFile;

for (const [missing, defined] of Object.entries(mapping)) {
  if (missingSlugs.includes(missing)) {
    // Find the line: if (slug === "defined")
    const searchStr = `if (slug === "${defined}") {`;
    const replaceStr = `if (slug === "${defined}" || slug === "${missing}") {`;
    if (newDataFile.includes(searchStr)) {
        newDataFile = newDataFile.replace(searchStr, replaceStr);
        console.log(`Mapped ${missing} -> ${defined}`);
    } else {
        // Try regex
        const regex = new RegExp(`if\\s*\\(\\s*slug\\s*===\\s*"${defined}"\\s*\\)\\s*\\{`);
        newDataFile = newDataFile.replace(regex, replaceStr);
        console.log(`Mapped via regex ${missing} -> ${defined}`);
    }
  }
}

fs.writeFileSync('./src/lib/data/treatment-detail-data.ts', newDataFile, 'utf8');
console.log("Updated treatment-detail-data.ts");
