const fs = require('fs');
const file = 'src/lib/data/treatment-detail-data.ts';
let content = fs.readFileSync(file, 'utf8');

const carpalIndex = content.indexOf('if (slug === "carpal-tunnel-syndrome") {');
if (carpalIndex === -1) {
  console.log("Could not find carpal tunnel block");
  process.exit(1);
}

// Find the last return null
const returnNullIndex = content.lastIndexOf('return null');
if (returnNullIndex === -1) {
  console.log("Could not find return null");
  process.exit(1);
}

// The blocks to move
const blocksToMove = content.substring(carpalIndex, returnNullIndex);

// Remove the blocks from the end
content = content.substring(0, carpalIndex) + content.substring(returnNullIndex);

// Find the placeholder block
const placeholderStr = '    // 3. Return Premium Placeholder Content (Default)\n    if (foundItem && foundCategory) {';
const placeholderIndex = content.lastIndexOf(placeholderStr);

if (placeholderIndex === -1) {
  console.log("Could not find placeholder block");
  process.exit(1);
}

// Insert before placeholder block
content = content.substring(0, placeholderIndex) + blocksToMove + '\n' + content.substring(placeholderIndex);

fs.writeFileSync(file, content);
console.log("Successfully moved blocks");
