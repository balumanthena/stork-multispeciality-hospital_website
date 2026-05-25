/**
 * Fix compressed images:
 * 1. Restore original filenames (keep .png/.jpeg extensions as they were)
 * 2. Apply EXIF rotation so images display correctly
 * 3. Compress properly while preserving correct orientation
 */

import sharp from 'sharp';
import { rename, unlink, stat } from 'fs/promises';
import { join, basename } from 'path';

const IMAGES_DIR = './public/images';

// Files that need fixing: original name -> backup path
const FILES_TO_FIX = [
    // Doctor photos (originally .png, compressed wrongly to .jpeg)
    { original: 'dr narender reddy.png', backup: 'dr narender reddy.png.original', wrongFile: 'dr narender reddy.jpeg', format: 'png' },
    { original: 'dr-veda-sree.png', backup: 'dr-veda-sree.png.original', wrongFile: 'dr-veda-sree.jpeg', format: 'png' },
    
    // Group 11 (popup image, originally .png)
    { original: 'Group 11.png', backup: 'Group 11.png.original', wrongFile: 'Group 11.jpeg', format: 'png' },
    
    // Doctor photos (originally .jpeg, compressed correctly but may have rotation issues)
    { original: 'dr veda vyas.JPG.jpeg', backup: 'dr veda vyas.JPG.jpeg.original', wrongFile: null, format: 'jpeg' },
    { original: 'DSC02068.JPG.jpeg', backup: 'DSC02068.JPG.jpeg.original', wrongFile: null, format: 'jpeg' },
    { original: 'dr aravind.jpg.jpeg', backup: 'dr aravind.jpg.jpeg.original', wrongFile: null, format: 'jpeg' },
    { original: 'dr jyothi.jpg.jpeg', backup: 'dr jyothi.jpg.jpeg.original', wrongFile: null, format: 'jpeg' },
    { original: 'dr veda sri (1).jpeg', backup: 'dr veda sri (1).jpeg.original', wrongFile: null, format: 'jpeg' },
    { original: 'dr veda sri.jpeg', backup: 'dr veda sri.jpeg.original', wrongFile: null, format: 'jpeg' },
];

async function fixFile(entry) {
    const backupPath = join(IMAGES_DIR, entry.backup);
    const originalPath = join(IMAGES_DIR, entry.original);
    
    // Check if backup exists
    try {
        await stat(backupPath);
    } catch {
        console.log(`⏭️  ${entry.original}: No backup found, skipping`);
        return;
    }
    
    console.log(`🔧 Fixing ${entry.original}...`);
    
    try {
        // Read from the ORIGINAL backup (uncompressed source)
        let pipeline = sharp(backupPath)
            .rotate() // Auto-apply EXIF orientation BEFORE resize
            .resize(1200, null, { withoutEnlargement: true, fit: 'inside' });
        
        let buffer;
        if (entry.format === 'png') {
            buffer = await pipeline.png({ quality: 85, effort: 6 }).toBuffer();
        } else {
            buffer = await pipeline.jpeg({ quality: 82, mozjpeg: true }).toBuffer();
        }
        
        // Remove the wrongly-named file if it exists
        if (entry.wrongFile) {
            const wrongPath = join(IMAGES_DIR, entry.wrongFile);
            try {
                await unlink(wrongPath);
                console.log(`  🗑️  Removed wrong file: ${entry.wrongFile}`);
            } catch { /* doesn't exist, fine */ }
        }
        
        // Write the correctly compressed file with the ORIGINAL filename
        await sharp(buffer).toFile(originalPath);
        
        const originalSize = (await stat(backupPath)).size;
        const newSize = (await stat(originalPath)).size;
        const savings = ((1 - newSize / originalSize) * 100).toFixed(1);
        
        console.log(`  ✅ ${(originalSize / (1024*1024)).toFixed(2)}MB → ${(newSize / 1024).toFixed(1)}KB (${savings}% smaller, orientation fixed)`);
    } catch (err) {
        console.error(`  ❌ Failed: ${err.message}`);
        
        // Restore original as fallback
        try {
            await rename(backupPath, originalPath);
            console.log(`  ↩️  Restored original file as fallback`);
        } catch {}
    }
}

async function main() {
    console.log('🔧 Fixing compressed images — restoring filenames + fixing orientation');
    console.log('═'.repeat(65));
    
    for (const entry of FILES_TO_FIX) {
        await fixFile(entry);
    }
    
    console.log('\n' + '═'.repeat(65));
    console.log('✅ All images fixed! Originals still backed up with .original suffix.');
}

main().catch(console.error);
