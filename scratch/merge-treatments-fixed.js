const fs = require('fs');

const currentContent = fs.readFileSync('src/lib/data/treatments.ts', 'utf8');
const oldContent = fs.readFileSync('scratch/old-treatments.ts', 'utf8');

const currentMatch = currentContent.match(/export const TREATMENTS_MASTER: MasterTreatment\[\] = \[\s*([\s\S]*?)\s*\]\.map/);
const oldMatch = oldContent.match(/export const TREATMENTS_MASTER: MasterTreatment\[\] = \[\s*([\s\S]*?)\s*\]\.map/);

const currentItemsStr = currentMatch[1].trim().split('\n');
const oldItemsStr = oldMatch[1].trim().split('\n');

const currentNames = new Set();
let maxId = 0;

currentItemsStr.forEach(line => {
    const idMatch = line.match(/id: (\d+)/);
    const nameMatch = line.match(/name: "([^"]+)"/);
    if (idMatch) {
        const id = parseInt(idMatch[1]);
        if (id > maxId) maxId = id;
    }
    if (nameMatch) currentNames.add(nameMatch[1].toLowerCase());
});

const remainingItems = [];
oldItemsStr.forEach(line => {
    const nameMatch = line.match(/name: "([^"]+)"/);
    if (nameMatch) {
        const name = nameMatch[1].toLowerCase();
        
        // Add if it's not already in the current list
        if (!currentNames.has(name)) {
            maxId++;
            // replace id
            const newLine = line.replace(/id: \d+/, `id: ${maxId}`);
            remainingItems.push(newLine);
        }
    }
});

const mergedArrayStr = currentItemsStr.join('\n') + (currentItemsStr[currentItemsStr.length -1].trim().endsWith(',') ? '' : ',') + '\n    ' + remainingItems.map(s => s.trim().replace(/,$/, '')).join(',\n    ');

const newContent = currentContent.replace(currentMatch[1], mergedArrayStr);

fs.writeFileSync('src/lib/data/treatments.ts', newContent);
console.log(`Merged! Current had ${currentItemsStr.length}, appended ${remainingItems.length} items. Total: ${currentItemsStr.length + remainingItems.length}`);
