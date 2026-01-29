#!/usr/bin/env node

/**
 * Export color palettes from design tokens to Adobe ASE and GIMP GPL formats
 */

import ase from 'adobe-swatch-exchange';
import { readFile, writeFile, mkdir } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

/**
 * Convert hex color to RGB array (0-1 range for ASE)
 */
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? [
    parseInt(result[1], 16) / 255,
    parseInt(result[2], 16) / 255,
    parseInt(result[3], 16) / 255
  ] : [0, 0, 0];
}

/**
 * Convert hex color to RGB integers (0-255 range for GPL)
 */
function hexToRgbInt(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16)
  ] : [0, 0, 0];
}

/**
 * Extract colors from token structure
 */
function extractColors(tokens) {
  const colors = [];

  // Hydrophon Blau scale (50-900)
  if (tokens.hydrophon?.blau) {
    const shades = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'];
    shades.forEach(shade => {
      if (tokens.hydrophon.blau[shade]?.$value) {
        colors.push({
          name: `Hydrophon Blau ${shade}`,
          hex: tokens.hydrophon.blau[shade].$value,
          group: 'Hydrophon Blau'
        });
      }
    });
  }

  // Hydrophon Grau scale (50-900)
  if (tokens.hydrophon?.grau) {
    const shades = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'];
    shades.forEach(shade => {
      if (tokens.hydrophon.grau[shade]?.$value) {
        colors.push({
          name: `Hydrophon Grau ${shade}`,
          hex: tokens.hydrophon.grau[shade].$value,
          group: 'Hydrophon Grau'
        });
      }
    });
  }

  // Gluy colors
  if (tokens.productline?.gluy) {
    if (tokens.productline.gluy.primary?.$value) {
      colors.push({
        name: 'Gluy Gelb',
        hex: tokens.productline.gluy.primary.$value,
        group: 'Gluy'
      });
    }
    if (tokens.productline.gluy.secondary?.$value) {
      colors.push({
        name: 'Gluy Hellblau',
        hex: tokens.productline.gluy.secondary.$value,
        group: 'Gluy'
      });
    }
    if (tokens.productline.gluy.tertiary?.$value) {
      colors.push({
        name: 'Gluy Dunkelblau',
        hex: tokens.productline.gluy.tertiary.$value,
        group: 'Gluy'
      });
    }
  }

  // hyHero colors
  if (tokens.productline?.hyhero) {
    if (tokens.productline.hyhero.primary?.$value) {
      colors.push({
        name: 'hyHero Orange',
        hex: tokens.productline.hyhero.primary.$value,
        group: 'hyHero'
      });
    }
    if (tokens.productline.hyhero.secondary?.$value) {
      colors.push({
        name: 'hyHero Dunkelgrau',
        hex: tokens.productline.hyhero.secondary.$value,
        group: 'hyHero'
      });
    }
  }

  // hyIndustry colors
  if (tokens.productline?.hyindustry) {
    if (tokens.productline.hyindustry.primary?.$value) {
      colors.push({
        name: 'hyIndustry Dunkelblau',
        hex: tokens.productline.hyindustry.primary.$value,
        group: 'hyIndustry'
      });
    }
  }

  // Neutral scale (50-900)
  if (tokens.neutral) {
    const shades = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'];
    shades.forEach(shade => {
      if (tokens.neutral[shade]?.$value) {
        colors.push({
          name: `Neutral ${shade}`,
          hex: tokens.neutral[shade].$value,
          group: 'Neutral'
        });
      }
    });
    // Add white and black
    if (tokens.neutral.white?.$value) {
      colors.push({
        name: 'Weiß',
        hex: tokens.neutral.white.$value,
        group: 'Neutral'
      });
    }
    if (tokens.neutral.black?.$value) {
      colors.push({
        name: 'Schwarz',
        hex: tokens.neutral.black.$value,
        group: 'Neutral'
      });
    }
  }

  // Semantic colors
  if (tokens.color) {
    if (tokens.color.success?.$value) {
      colors.push({
        name: 'Success',
        hex: tokens.color.success.$value,
        group: 'Semantisch'
      });
    }
    if (tokens.color.warning?.$value) {
      colors.push({
        name: 'Warning',
        hex: tokens.color.warning.$value,
        group: 'Semantisch'
      });
    }
    if (tokens.color.error?.$value) {
      colors.push({
        name: 'Error',
        hex: tokens.color.error.$value,
        group: 'Semantisch'
      });
    }
    if (tokens.color.info?.$value) {
      colors.push({
        name: 'Info',
        hex: tokens.color.info.$value,
        group: 'Semantisch'
      });
    }
  }

  return colors;
}

/**
 * Generate Adobe Swatch Exchange (ASE) file
 */
async function generateASE(colors, outputPath) {
  const aseColors = colors.map(color => ({
    name: color.name,
    model: 'RGB',
    color: hexToRgb(color.hex),
    type: 'global'
  }));

  const buffer = ase.encode({
    version: '1.0',
    groups: [],
    colors: aseColors
  });

  await writeFile(outputPath, buffer);
  console.log(`✓ ASE file generated: ${outputPath}`);
}

/**
 * Generate GIMP Palette (GPL) file
 */
async function generateGPL(colors, outputPath) {
  let gpl = 'GIMP Palette\n';
  gpl += 'Name: Hydrophon Colors\n';
  gpl += 'Columns: 10\n';
  gpl += '#\n';

  colors.forEach(color => {
    const [r, g, b] = hexToRgbInt(color.hex);
    // Format: R G B  ColorName
    // Pad RGB values to align nicely
    gpl += `${String(r).padStart(3)} ${String(g).padStart(3)} ${String(b).padStart(3)}  ${color.name}\n`;
  });

  await writeFile(outputPath, gpl, 'utf-8');
  console.log(`✓ GPL file generated: ${outputPath}`);
}

/**
 * Main export function
 */
async function exportPalettes() {
  try {
    console.log('Exporting color palettes from design tokens...\n');

    // Read tokens from colors.json (source of truth)
    const tokensPath = join(rootDir, 'tokens', 'colors.json');
    const tokensContent = await readFile(tokensPath, 'utf-8');
    const tokens = JSON.parse(tokensContent);

    // Extract colors
    const colors = extractColors(tokens);
    console.log(`Found ${colors.length} colors to export\n`);

    // Create output directory
    const outputDir = join(rootDir, 'dist', 'palettes');
    await mkdir(outputDir, { recursive: true });

    // Generate ASE file
    const asePath = join(outputDir, 'hydrophon-colors.ase');
    await generateASE(colors, asePath);

    // Generate GPL file
    const gplPath = join(outputDir, 'hydrophon-colors.gpl');
    await generateGPL(colors, gplPath);

    console.log('\n✓ Palette export complete!');
  } catch (error) {
    console.error('Error exporting palettes:', error);
    process.exit(1);
  }
}

// Run export
exportPalettes();
