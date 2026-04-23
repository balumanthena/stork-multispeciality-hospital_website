const fs = require('fs');
const path = require('path');

const dir = 'src/components/departments';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    const regex = /<Button[^>]*variant="outline"[^>]*>([\s\S]*?)<\/Button>/g;
    let match;
    console.log(`\n--- ${file} ---`);
    while ((match = regex.exec(content)) !== null) {
        console.log(match[1].trim());
    }
}
