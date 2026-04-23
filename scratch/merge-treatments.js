const fs = require('fs');

const currentContent = fs.readFileSync('src/lib/data/treatments.ts', 'utf8');
const oldContent = fs.readFileSync('scratch/old-treatments.ts', 'utf8');

// Extract the array parts using regex
const currentMatch = currentContent.match(/export const TREATMENTS_MASTER: MasterTreatment\[\] = \[\s*([\s\S]*?)\s*\]\.map/);
const oldMatch = oldContent.match(/export const TREATMENTS_MASTER: MasterTreatment\[\] = \[\s*([\s\S]*?)\s*\]\.map/);

if (!currentMatch || !oldMatch) {
    console.error("Could not find arrays");
    process.exit(1);
}

const currentItemsStr = currentMatch[1].trim().split('\n');
const oldItemsStr = oldMatch[1].trim().split('\n');

// Parse items to get IDs and Names to avoid duplicates
const currentIds = new Set();
const currentNames = new Set();

currentItemsStr.forEach(line => {
    const idMatch = line.match(/id: (\d+)/);
    const nameMatch = line.match(/name: "([^"]+)"/);
    if (idMatch) currentIds.add(parseInt(idMatch[1]));
    if (nameMatch) currentNames.add(nameMatch[1].toLowerCase());
});

const remainingItems = [];
oldItemsStr.forEach(line => {
    const idMatch = line.match(/id: (\d+)/);
    const nameMatch = line.match(/name: "([^"]+)"/);
    if (idMatch && nameMatch) {
        const id = parseInt(idMatch[1]);
        const name = nameMatch[1].toLowerCase();
        
        // Add if it's not already in the current list
        if (!currentIds.has(id) && !currentNames.has(name)) {
            remainingItems.push(line);
        }
    }
});

const mergedArrayStr = currentItemsStr.join('\n') + (currentItemsStr[currentItemsStr.length -1].trim().endsWith(',') ? '' : ',') + '\n    ' + remainingItems.map(s => s.trim().replace(/,$/, '')).join(',\n    ');

const newContent = currentContent.replace(currentMatch[1], mergedArrayStr);

fs.writeFileSync('src/lib/data/treatments.ts', newContent);
console.log(`Merged! Current had ${currentItemsStr.length}, appended ${remainingItems.length} items. Total: ${currentItemsStr.length + remainingItems.length}`);
