import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Transform W3C DTCG format to Figma-compatible flat structure
 *
 * Input: { "hydrophon": { "blau": { "500": { "$value": "#008bd2", "$type": "color" }}}}
 * Output: { "hydrophon-blau-500": { "value": "#008bd2", "type": "color" }}
 */
function flattenTokens(obj, prefix = '') {
  const result = {};

  for (const [key, value] of Object.entries(obj)) {
    // Skip $schema metadata
    if (key === '$schema') continue;

    const newKey = prefix ? `${prefix}-${key}` : key;

    // Check if this is a token with $value
    if (value.$value !== undefined) {
      result[newKey] = {
        value: value.$value,
        type: value.$type || 'other',
        description: value.$description || ''
      };
    }
    // Otherwise recurse deeper
    else if (typeof value === 'object' && value !== null) {
      Object.assign(result, flattenTokens(value, newKey));
    }
  }

  return result;
}

/**
 * Organize tokens by collection type for Figma Variables
 */
function organizeByCollection(tokens) {
  const collections = {
    colors: {},
    typography: {},
    spacing: {},
    effects: {}
  };

  for (const [name, token] of Object.entries(tokens)) {
    const type = token.type;

    // Organize by type
    if (type === 'color') {
      collections.colors[name] = token;
    }
    else if (['fontFamily', 'fontSize', 'fontWeight', 'lineHeight', 'letterSpacing'].includes(type)) {
      collections.typography[name] = token;
    }
    else if (type === 'dimension' && name.startsWith('spacing')) {
      collections.spacing[name] = token;
    }
    else if (['dimension', 'shadow'].includes(type) && (name.includes('borderRadius') || name.includes('shadow') || name.includes('elevation'))) {
      collections.effects[name] = token;
    }
    // For complex typography tokens, store in typography collection
    else if (type === 'typography') {
      collections.typography[name] = token;
    }
  }

  return collections;
}

/**
 * Main export function
 */
function exportFigmaTokens() {
  const tokensDir = join(__dirname, '../tokens');
  const outputPath = join(__dirname, '../figma/tokens-for-figma.json');

  // Read all token files
  const tokenFiles = [
    'colors.json',
    'typography.json',
    'spacing.json',
    'effects.json'
  ];

  let allTokens = {};

  for (const file of tokenFiles) {
    const filePath = join(tokensDir, file);
    try {
      const content = readFileSync(filePath, 'utf8');
      const tokens = JSON.parse(content);
      const flattened = flattenTokens(tokens);
      allTokens = { ...allTokens, ...flattened };
    } catch (error) {
      console.error(`Error reading ${file}:`, error.message);
    }
  }

  // Organize into collections
  const collections = organizeByCollection(allTokens);

  // Create output structure
  const output = {
    $schema: "https://design-tokens.org/schema.json",
    $description: "Hydrophon Design System - Figma Variables Export",
    $version: "1.0.0",
    $exportedAt: new Date().toISOString(),
    collections
  };

  // Write output
  writeFileSync(outputPath, JSON.stringify(output, null, 2));

  console.log('✓ Figma tokens exported successfully!');
  console.log(`  Output: ${outputPath}`);
  console.log(`  Collections:`);
  console.log(`    - Colors: ${Object.keys(collections.colors).length} tokens`);
  console.log(`    - Typography: ${Object.keys(collections.typography).length} tokens`);
  console.log(`    - Spacing: ${Object.keys(collections.spacing).length} tokens`);
  console.log(`    - Effects: ${Object.keys(collections.effects).length} tokens`);
  console.log(`  Total: ${Object.keys(allTokens).length} tokens exported`);
}

// Run export
exportFigmaTokens();
