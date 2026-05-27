import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, extname } from 'path';

const IMAGES_DIR = './public/images';
const TARGET_DIRS = [
    'final icons',
    'icons/treatments',
];

async function optimizeIconsInDir(dirPath) {
    try {
        const files = await readdir(dirPath);
        let count = 0;
        let totalOriginalSize = 0;
        let totalOptimizedSize = 0;

        for (const file of files) {
            const filePath = join(dirPath, file);
            const fileStats = await stat(filePath);

            if (fileStats.isDirectory()) continue;
            
            const ext = extname(file).toLowerCase();
            if (ext !== '.png') continue;

            totalOriginalSize += fileStats.size;

            try {
                // Read original, resize to 512 max width/height to look extremely sharp on Retina/High-DPI displays
                // Keep colors perfectly crisp by using palette-based quantization (lossless style line art preservation)
                const buffer = await sharp(filePath)
                    .resize(512, 512, {
                        withoutEnlargement: true,
                        fit: 'inside'
                    })
                    .png({
                        palette: true,
                        quality: 100,
                        compressionLevel: 9,
                        effort: 10
                    })
                    .toBuffer();

                // Save optimized version in place
                await sharp(buffer).toFile(filePath);
                
                const newSize = buffer.length;
                totalOptimizedSize += newSize;
                
                const savings = ((1 - newSize / fileStats.size) * 100).toFixed(1);
                console.log(`✨ [icon] ${file}: ${(fileStats.size / 1024).toFixed(1)}KB → ${(newSize / 1024).toFixed(1)}KB (${savings}% smaller)`);
                count++;
            } catch (err) {
                console.error(`❌ Failed to optimize [icon] ${file}: ${err.message}`);
            }
        }

        console.log(`\n🎉 Optimized ${count} icons in ${dirPath}:`);
        console.log(`   Original: ${(totalOriginalSize / (1024*1024)).toFixed(2)} MB`);
        console.log(`   Optimized: ${(totalOptimizedSize / (1024*1024)).toFixed(2)} MB`);
        console.log(`   Total Savings: ${((1 - totalOptimizedSize / totalOriginalSize) * 100).toFixed(1)}%\n`);
        
    } catch (err) {
        console.error(`❌ Cannot read directory ${dirPath}: ${err.message}`);
    }
}

async function main() {
    console.log('🏥 Stork Hospital — High Clarity Treatment Icon Optimization');
    console.log('═'.repeat(70));
    
    for (const dir of TARGET_DIRS) {
        const fullPath = join(IMAGES_DIR, dir);
        console.log(`📂 Processing ${fullPath}...`);
        await optimizeIconsInDir(fullPath);
    }
    
    console.log('═'.repeat(70));
    console.log('✅ Clarity optimization completed successfully!');
}

main().catch(console.error);
