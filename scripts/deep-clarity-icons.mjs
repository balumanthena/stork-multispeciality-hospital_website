import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, extname } from 'path';

const TARGET_DIRS = [
    'public/images/Departmentsicons/Stork exclusive icons (6)',
    'public/images/Departmentsicons/departments',
];

const TARGET_SIZE = 400;

async function enhanceIcon(filePath) {
    const meta = await sharp(filePath).metadata();
    if (meta.width >= TARGET_SIZE) return false; // already processed
    
    // Step 1: Read original pixels at native resolution
    const original = sharp(filePath);
    
    // Step 2: Apply strong contrast and edge enhancement BEFORE upscaling
    // This makes the line edges hard and definitive at source resolution
    const enhanced = await original
        .clone()
        // Normalize contrast to make lines as dark/sharp as possible
        .normalize()
        // Strong unsharp mask at native res — this is KEY
        // Large radius (2.0) with high amount catches the thin lines
        .sharpen({ sigma: 2.0, m1: 0, m2: 4.0 })
        .toBuffer();
    
    // Step 3: NOW upscale the contrast-enhanced version
    // Using lanczos3 for best quality interpolation
    const upscaled = await sharp(enhanced)
        .resize(TARGET_SIZE, TARGET_SIZE, {
            fit: 'contain',
            background: { r: 0, g: 0, b: 0, alpha: 0 },
            kernel: 'lanczos3',
        })
        // Step 4: Another sharpening pass AFTER upscale to tighten edges
        .sharpen({ sigma: 1.0, m1: 0, m2: 3.0 })
        // Step 5: Save as highest quality PNG
        .png({
            compressionLevel: 9,
            quality: 100,
        })
        .toBuffer();
    
    await sharp(upscaled).toFile(filePath);
    return true;
}

async function processDir(dirPath) {
    const files = await readdir(dirPath);
    let count = 0;
    
    for (const file of files) {
        if (extname(file).toLowerCase() !== '.png') continue;
        
        const filePath = join(dirPath, file);
        const beforeSize = (await stat(filePath)).size;
        const beforeMeta = await sharp(filePath).metadata();
        
        try {
            const processed = await enhanceIcon(filePath);
            if (processed) {
                const afterSize = (await stat(filePath)).size;
                const afterMeta = await sharp(filePath).metadata();
                console.log(`  ✅ ${file} — ${beforeMeta.width}x${beforeMeta.height} → ${afterMeta.width}x${afterMeta.height} (${(afterSize/1024).toFixed(1)}KB)`);
                count++;
            } else {
                console.log(`  ⏭️  ${file} — already ${beforeMeta.width}px, skipping`);
            }
        } catch (err) {
            console.error(`  ❌ ${file} — ${err.message}`);
        }
    }
    
    return count;
}

async function main() {
    console.log('🔬 Stork Hospital — Deep Clarity Icon Enhancement');
    console.log('   Technique: Contrast normalize → Edge sharpen → Lanczos3 upscale → Re-sharpen');
    console.log('═'.repeat(70));
    
    let total = 0;
    for (const dir of TARGET_DIRS) {
        console.log(`\n📂 ${dir}`);
        console.log('─'.repeat(70));
        total += await processDir(dir);
    }
    
    console.log('\n' + '═'.repeat(70));
    console.log(`🎉 Enhanced ${total} icons with deep edge-sharpened clarity.`);
    console.log('═'.repeat(70));
}

main().catch(console.error);
