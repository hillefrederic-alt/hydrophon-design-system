import { optimize } from 'svgo';
import sharp from 'sharp';
import { readFile, writeFile, readdir, mkdir } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

// SVGO configuration
const svgoConfig = {
  multipass: true,
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          removeViewBox: false,  // Keep for scaling
          cleanupIds: {
            preserve: ['hydrophon', 'gluy', 'hyhero', 'hyindustry']
          }
        }
      }
    },
    'removeDimensions',
    'sortAttrs'
  ]
};

// PNG export sizes
const pngSizes = [
  { suffix: '@1x', width: 200 },
  { suffix: '@2x', width: 400 },
  { suffix: '@3x', width: 600 }
];

// Brand directories
const brands = ['hydrophon', 'gluy', 'hyhero', 'hyindustry'];

/**
 * Optimize SVG files and write to distribution directory
 */
async function optimizeSvgDirectory(sourceDir, targetDir) {
  const files = await readdir(sourceDir);
  const svgFiles = files.filter(f => f.endsWith('.svg'));

  let totalOriginalSize = 0;
  let totalOptimizedSize = 0;

  for (const file of svgFiles) {
    const sourcePath = join(sourceDir, file);
    const targetPath = join(targetDir, file);

    const input = await readFile(sourcePath, 'utf8');
    const result = optimize(input, { ...svgoConfig, path: sourcePath });

    await writeFile(targetPath, result.data);

    totalOriginalSize += input.length;
    totalOptimizedSize += result.data.length;

    const reduction = ((1 - result.data.length / input.length) * 100).toFixed(1);
    console.log(`  ✓ ${file}: ${input.length} → ${result.data.length} bytes (${reduction}% reduction)`);
  }

  return { originalSize: totalOriginalSize, optimizedSize: totalOptimizedSize, count: svgFiles.length };
}

/**
 * Export PNG variants at multiple resolutions
 */
async function exportPngVariants(svgPath, outputDir, baseName) {
  for (const size of pngSizes) {
    const outputPath = join(outputDir, `${baseName}${size.suffix}.png`);

    await sharp(svgPath)
      .resize(size.width, null)  // Maintain aspect ratio
      .png({ quality: 100, compressionLevel: 9 })
      .toFile(outputPath);
  }
}

/**
 * Main export function
 */
async function exportAssets() {
  console.log('Hydrophon Asset Export & Optimization');
  console.log('=====================================\n');

  // Create output directories
  const svgOutDir = join(projectRoot, 'dist/assets/logos/svg');
  const pngOutDir = join(projectRoot, 'dist/assets/logos/png');

  await mkdir(svgOutDir, { recursive: true });
  await mkdir(pngOutDir, { recursive: true });

  let totalSvgs = 0;
  let totalPngs = 0;
  let totalOriginalBytes = 0;
  let totalOptimizedBytes = 0;

  // Process each brand
  for (const brand of brands) {
    const sourceDir = join(projectRoot, 'assets/logo', brand, 'svg');

    console.log(`Processing ${brand} logos...`);

    // Optimize SVGs
    const stats = await optimizeSvgDirectory(sourceDir, svgOutDir);
    totalSvgs += stats.count;
    totalOriginalBytes += stats.originalSize;
    totalOptimizedBytes += stats.optimizedSize;

    // Export PNGs
    const files = await readdir(sourceDir);
    const svgFiles = files.filter(f => f.endsWith('.svg'));

    for (const file of svgFiles) {
      const baseName = file.replace('.svg', '');
      const svgPath = join(svgOutDir, file);

      await exportPngVariants(svgPath, pngOutDir, baseName);
    }

    totalPngs += svgFiles.length * pngSizes.length;
    console.log(`  ✓ Exported ${svgFiles.length * pngSizes.length} PNG variants\n`);
  }

  // Summary
  console.log('Export Complete!');
  console.log('================');
  console.log(`SVG files: ${totalSvgs} (${totalOriginalBytes} → ${totalOptimizedBytes} bytes)`);
  const totalReduction = ((1 - totalOptimizedBytes / totalOriginalBytes) * 100).toFixed(1);
  console.log(`Reduction: ${totalReduction}%`);
  console.log(`PNG files: ${totalPngs} (at @1x, @2x, @3x resolutions)`);
  console.log(`\nOutput: dist/assets/logos/`);
}

// Run export
exportAssets().catch(console.error);
