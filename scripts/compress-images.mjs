/**
 * Image Compression Script for iPhone Safari Performance
 * 
 * Compresses oversized images in /public/images/ without replacing originals.
 * Creates optimized WebP versions alongside existing files.
 * 
 * Usage: node scripts/compress-images.mjs
 * 
 * Requires: sharp (already in devDependencies)
 */

import sharp from 'sharp';
import { readdir, stat, rename } from 'fs/promises';
import { join, extname, basename } from 'path';

const IMAGES_DIR = './public/images';
const SIZE_THRESHOLD = 500 * 1024; // 500KB — anything above this needs compression

// Doctor photos that are absurdly large (6-13MB)
const DOCTOR_PHOTOS = [
    'dr veda vyas.JPG.jpeg',
    'DSC02068.JPG.jpeg',
    'dr aravind.jpg.jpeg',
    'dr jyothi.jpg.jpeg',
    'dr veda sri (1).jpeg',
    'dr veda sri.jpeg',
    'dr narender reddy.png',
    'dr-veda-sree.png',
];

// Large icons that should be much smaller  
const LARGE_ICONS_DIRS = [
    'final icons',
    'icons/treatments',
];

async function compressFile(filePath, maxWidth = 1200, quality = 80) {
    const fileStats = await stat(filePath);
    const ext = extname(filePath).toLowerCase();
    
    if (fileStats.size < SIZE_THRESHOLD) return null;
    if (!['.png', '.jpg', '.jpeg'].includes(ext)) return null;

    const originalSize = fileStats.size;
    const originalSizeMB = (originalSize / (1024 * 1024)).toFixed(2);
    
    try {
        const image = sharp(filePath);
        const metadata = await image.metadata();
        
        // Determine target width
        let targetWidth = maxWidth;
        if (metadata.width && metadata.width <= maxWidth) {
            targetWidth = metadata.width; // Don't upscale
        }

        // Compress in-place by writing to buffer then back
        const buffer = await image
            .resize(targetWidth, null, { 
                withoutEnlargement: true,
                fit: 'inside'
            })
            .jpeg({ quality, mozjpeg: true })
            .toBuffer();
        
        // Write compressed version back to the same path as .jpeg
        const outputPath = filePath.replace(/\.(png|jpg|jpeg|JPG)$/i, '.jpeg');
        
        // Only overwrite if we actually achieved meaningful compression (>30% reduction)
        if (buffer.length < originalSize * 0.7) {
            // Backup original by renaming with .original suffix
            const backupPath = filePath + '.original';
            await rename(filePath, backupPath);
            
            // Write compressed file
            await sharp(buffer).toFile(outputPath !== filePath ? outputPath : filePath);
            
            const newSize = (buffer.length / (1024 * 1024)).toFixed(2);
            const savings = ((1 - buffer.length / originalSize) * 100).toFixed(1);
            console.log(`✅ ${basename(filePath)}: ${originalSizeMB}MB → ${newSize}MB (${savings}% smaller)`);
            return { file: filePath, originalSize, newSize: buffer.length };
        } else {
            console.log(`⏭️  ${basename(filePath)}: Already reasonably compressed (${originalSizeMB}MB)`);
            return null;
        }
    } catch (err) {
        console.error(`❌ Failed to compress ${basename(filePath)}: ${err.message}`);
        return null;
    }
}

async function compressIconsDir(dirPath, maxSize = 256) {
    try {
        const files = await readdir(dirPath);
        let count = 0;
        
        for (const file of files) {
            const filePath = join(dirPath, file);
            const fileStats = await stat(filePath);
            
            if (fileStats.isDirectory()) continue;
            if (fileStats.size < SIZE_THRESHOLD) continue;
            
            const ext = extname(file).toLowerCase();
            if (!['.png', '.jpg', '.jpeg'].includes(ext)) continue;

            const originalSizeMB = (fileStats.size / (1024 * 1024)).toFixed(2);
            
            try {
                const buffer = await sharp(filePath)
                    .resize(maxSize, maxSize, { 
                        withoutEnlargement: true, 
                        fit: 'inside' 
                    })
                    .png({ quality: 85, effort: 10 })
                    .toBuffer();

                if (buffer.length < fileStats.size * 0.7) {
                    const backupPath = filePath + '.original';
                    await rename(filePath, backupPath);
                    await sharp(buffer).toFile(filePath);
                    
                    const newSizeKB = (buffer.length / 1024).toFixed(1);
                    const savings = ((1 - buffer.length / fileStats.size) * 100).toFixed(1);
                    console.log(`✅ [icon] ${file}: ${originalSizeMB}MB → ${newSizeKB}KB (${savings}% smaller)`);
                    count++;
                }
            } catch (err) {
                console.error(`❌ [icon] ${file}: ${err.message}`);
            }
        }
        
        return count;
    } catch (err) {
        console.error(`❌ Cannot read directory ${dirPath}: ${err.message}`);
        return 0;
    }
}

async function main() {
    console.log('🏥 Stork Hospital — Image Compression for iPhone Safari');
    console.log('═'.repeat(60));
    
    // 1. Compress doctor photos
    console.log('\n📸 Compressing doctor photos (target: max 800px wide, 80% quality)...');
    for (const photo of DOCTOR_PHOTOS) {
        await compressFile(join(IMAGES_DIR, photo), 800, 80);
    }

    // 2. Compress insurance logos (anything over 500KB)
    console.log('\n🏢 Compressing insurance logos...');
    const insuranceLogos = await readdir(IMAGES_DIR);
    for (const file of insuranceLogos) {
        const filePath = join(IMAGES_DIR, file);
        const fileStats = await stat(filePath);
        if (fileStats.isDirectory()) continue;
        if (DOCTOR_PHOTOS.includes(file)) continue; // Already handled
        if (fileStats.size < SIZE_THRESHOLD) continue;
        
        const ext = extname(file).toLowerCase();
        if (!['.png', '.jpg', '.jpeg'].includes(ext)) continue;
        
        await compressFile(filePath, 600, 80);
    }
    
    // 3. Compress oversized treatment icon directories
    console.log('\n🎨 Compressing treatment icons...');
    for (const dir of LARGE_ICONS_DIRS) {
        console.log(`\n  📂 ${dir}/`);
        await compressIconsDir(join(IMAGES_DIR, dir), 256);
    }
    
    console.log('\n' + '═'.repeat(60));
    console.log('✅ Compression complete! Originals backed up with .original suffix.');
    console.log('   Run "npm run build" to verify everything still works.');
}

main().catch(console.error);
