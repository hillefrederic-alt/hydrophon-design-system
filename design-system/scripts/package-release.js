import archiver from 'archiver';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const VERSION = '1.0.0';
const OUTPUT_DIR = path.join(__dirname, '../dist/packages');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

/**
 * Generate README content for a package
 */
function generateReadme(description, sources) {
  const sourceList = sources.map(s => `- ${s.dest}`).join('\n');

  return `# Hydrophon Design System v${VERSION}

${description}

## Inhalt

${sourceList}

## Installation

Siehe die jeweiligen README-Dateien in den einzelnen Verzeichnissen für spezifische Installationsanleitungen.

## Lizenz

Dieses Design-System ist ausschliesslich zur Verwendung durch Hydrophon AG und autorisierte Partner bestimmt.

## Kontakt

Bei Fragen zum Design-System wenden Sie sich bitte an das Hydrophon Marketing-Team.

---
*Generiert am ${new Date().toISOString().split('T')[0]}*
`;
}

/**
 * Create a ZIP archive
 */
async function createZip(filename, sources, description) {
  return new Promise((resolve, reject) => {
    const outputPath = path.join(OUTPUT_DIR, filename);
    const output = fs.createWriteStream(outputPath);
    const archive = archiver('zip', { zlib: { level: 9 } });

    output.on('close', () => {
      console.log(`✓ Created ${filename} (${(archive.pointer() / 1024 / 1024).toFixed(2)} MB)`);
      resolve();
    });

    archive.on('error', (err) => {
      reject(err);
    });

    archive.pipe(output);

    // Add README to archive root
    const readme = generateReadme(description, sources);
    archive.append(readme, { name: 'README.md' });

    // Add source directories/files
    for (const { src, dest } of sources) {
      const fullSrc = path.join(__dirname, '..', src);

      if (!fs.existsSync(fullSrc)) {
        console.warn(`⚠ Warning: ${src} does not exist, skipping...`);
        continue;
      }

      if (fs.statSync(fullSrc).isDirectory()) {
        // For directories, use dest as the target directory name
        archive.directory(fullSrc, dest === '.' ? false : dest);
      } else {
        // For files, use dest or basename
        archive.file(fullSrc, { name: dest || path.basename(fullSrc) });
      }
    }

    archive.finalize();
  });
}

/**
 * Main packaging function
 */
async function packageRelease() {
  console.log('🚀 Starting distribution packaging...\n');

  try {
    // Complete package (all deliverables)
    await createZip(
      `hydrophon-ds-complete-v${VERSION}.zip`,
      [
        { src: 'dist/documentation', dest: 'documentation' },
        { src: 'dist/assets/logos', dest: 'assets/logos' },
        { src: 'dist/tokens', dest: 'tokens' },
        { src: 'dist/palettes', dest: 'palettes' }
      ],
      'Vollstaendiges Hydrophon Design System Paket mit Dokumentation, Logos, Tokens und Farbpaletten.'
    );

    // Logo package (agencies)
    await createZip(
      `hydrophon-ds-logos-v${VERSION}.zip`,
      [
        { src: 'dist/assets/logos/svg', dest: 'svg' },
        { src: 'dist/assets/logos/png', dest: 'png' },
        { src: 'dist/assets/logos/README.md', dest: 'README-LOGOS.md' }
      ],
      'Hydrophon Logo-Assets in SVG und PNG Formaten fuer alle Marken (Hydrophon, Gluy, HyHero, HyIndustry).'
    );

    // Token package (developers)
    await createZip(
      `hydrophon-ds-tokens-v${VERSION}.zip`,
      [
        { src: 'dist/tokens/css', dest: 'css' },
        { src: 'dist/tokens/scss', dest: 'scss' },
        { src: 'dist/tokens/json', dest: 'json' },
        { src: 'dist/tokens/package.json', dest: 'package.json' },
        { src: 'dist/tokens/index.js', dest: 'index.js' },
        { src: 'dist/tokens/index.cjs', dest: 'index.cjs' },
        { src: 'dist/tokens/README.md', dest: 'README.md' }
      ],
      'Hydrophon Design Tokens in CSS, SCSS und JSON Formaten fuer die Integration in Entwicklungsprojekte.'
    );

    // Marketing package (PDF + palettes)
    await createZip(
      `hydrophon-ds-marketing-v${VERSION}.zip`,
      [
        { src: 'dist/documentation', dest: 'documentation' },
        { src: 'dist/palettes', dest: 'palettes' }
      ],
      'Hydrophon Design System Dokumentation als PDF plus Farbpaletten fuer Adobe und GIMP.'
    );

    console.log('\n✅ All packages created successfully!');
    console.log(`📦 Packages location: ${OUTPUT_DIR}`);
  } catch (error) {
    console.error('❌ Error creating packages:', error);
    process.exit(1);
  }
}

// Run packaging
packageRelease();
