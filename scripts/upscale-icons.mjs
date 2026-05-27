import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, extname } from 'path';

const TARGET_DIRS = [
    'public/images/Departmentsicons/Stork exclusive icons (6)',
    'public/images/Departmentsicons/departments',
];

// Target size: 400px is optimal for 3x Retina (80px * 3 = 240, 96px * 3 = 288)
// 400px gives headroom and ensures razor-sharp rendering at all DPR levels
const TARGET_SIZE = 400;

async function processDir(dirPath) {
    const files = await readdir(dirPath);
    let count = 0;

    for (const file of files) {
        const ext = extname(file).toLowerCase();
        if (ext !== '.png') continue; // Only process PNGs, leave SVGs untouched

        const filePath = join(dirPath, file);
        const meta = await sharp(filePath).metadata();

        // Only upscale icons that are smaller than target
        if (meta.width >= TARGET_SIZE && meta.height >= TARGET_SIZE) {
            console.log(`  ⏭️  ${file} — already ${meta.width}x${meta.height}, skipping`);
            continue;
        }

        try {
            // Read the original pixels
            const buffer = await sharp(filePath)
                // Upscale using Lanczos3 (highest quality resampling)
                .resize(TARGET_SIZE, TARGET_SIZE, {
                    fit: 'contain',
                    background: { r: 0, g: 0, b: 0, alpha: 0 }, // transparent bg
                    kernel: 'lanczos3',
                })
                // Apply subtle sharpening to enhance line edges
                .sharpen({
                    sigma: 0.8,    // subtle but effective
                    m1: 0.5,       // flat areas sharpening
                    m2: 1.5,       // edge sharpening (emphasize lines)
                })
                // Save as high-quality PNG preserving alpha
                .png({
                    compressionLevel: 9,
                    quality: 100,
                })
                .toBuffer();

            // Write back in place
            await sharp(buffer).toFile(filePath);
            const newMeta = await sharp(filePath).metadata();
            const newSize = (await stat(filePath)).size;

            console.log(`  ✅ ${file} — ${meta.width}x${meta.height} → ${newMeta.width}x${newMeta.height} (${(newSize / 1024).toFixed(1)}KB)`);
            count++;
        } catch (err) {
            console.error(`  ❌ ${file} — ${err.message}`);
        }
    }

    return count;
}

async function main() {
    console.log('🔬 Stork Hospital — Icon Clarity Enhancement');
    console.log('   Upscaling 200px PNGs → 400px with Lanczos3 + sharpening');
    console.log('   (Same art style, just more pixels for Retina displays)');
    console.log('═'.repeat(65));

    let total = 0;

    for (const dir of TARGET_DIRS) {
        console.log(`\n📂 ${dir}`);
        console.log('─'.repeat(65));
        const count = await processDir(dir);
        total += count;
    }

    console.log('\n' + '═'.repeat(65));
    console.log(`🎉 Done! Enhanced ${total} icons to ${TARGET_SIZE}px for Retina clarity.`);
    console.log('═'.repeat(65));
}

main().catch(console.error);
