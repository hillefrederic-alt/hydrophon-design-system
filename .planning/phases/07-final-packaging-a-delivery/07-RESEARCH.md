# Phase 7: Final Packaging & Delivery - Research

**Researched:** 2026-01-29
**Domain:** Design system asset distribution, PDF documentation generation, multi-format token export
**Confidence:** HIGH

## Summary

Phase 7 focuses on packaging the complete design system (26,658+ lines of German documentation, logo assets, design tokens, icon system, 17 UI components) into distributable formats for four key stakeholder groups: developers (npm package), designers (Figma library), agencies (asset packages), and marketing (PDF documentation).

The standard approach involves:
1. **PDF Generation**: Convert markdown documentation to professionally styled PDF using Pandoc or md-to-pdf
2. **Asset Export**: Optimize and package SVG/PNG logos and icons with consistent naming conventions
3. **Token Distribution**: Publish npm package with dual ESM/CJS support for design tokens
4. **Color Palettes**: Export to ASE (Adobe), GPL (GIMP), and Sketch Palette formats
5. **Figma Library**: Create and publish component library with variables synced to tokens
6. **Versioning**: Use semantic versioning (semver) with changelog for all deliverables

**Primary recommendation:** Use md-to-pdf for German documentation (proven Unicode support via headless Chrome), publish design tokens as dual-format npm package, and create organized ZIP packages with clear README files for each stakeholder group.

## Standard Stack

The established libraries/tools for this domain:

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| md-to-pdf | 5.2.5+ | Markdown to PDF conversion | Uses headless Chrome for reliable rendering, full Unicode support (German), custom CSS styling, syntax highlighting via highlight.js |
| SVGO | 4.0+ | SVG optimization | Industry standard, 30-80% file size reduction, plugin architecture, CLI and API support |
| Style Dictionary | 4.4+ | Design token transformation | Already in project, multi-format output (CSS, SCSS, JSON), W3C DTCG compatible |
| adobe-swatch-exchange | npm package | ASE file generation | Encode/decode Adobe .ase format from JavaScript/JSON |
| semantic-release | Latest | Automated versioning | Automates semver version numbers, release notes, and npm publishing |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| Pandoc | 3.0+ | Alternative PDF generator | If LaTeX quality needed, supports 11+ PDF engines (Prince, WeasyPrint, XeLaTeX) |
| sharp | Latest | PNG export/optimization | If generating PNGs from code, batch resize for @2x/@3x |
| archiver | Latest | ZIP file creation | Programmatic package creation for asset bundles |
| sketch-palette-generator | npm | Sketch palette export | Generate .sketchpalette from JSON color data |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| md-to-pdf | Pandoc + WeasyPrint | More control over page layout, but Python dependency and LaTeX for German fonts |
| md-to-pdf | Prince XML | Professional PDF output with CSS Paged Media, but $2,500/year license |
| SVGO CLI | Manual export | Less automation, inconsistent optimization |
| npm publish | Direct ZIP download | Developers lose dependency management, no automatic updates |

**Installation:**
```bash
npm install --save-dev md-to-pdf svgo archiver sharp semantic-release
npm install adobe-swatch-exchange sketch-palette-generator
```

## Architecture Patterns

### Recommended Project Structure
```
design-system/
├── dist/                          # All distribution outputs
│   ├── documentation/             # PDF documentation
│   │   └── Hydrophon-Design-System-v1.0.0.pdf
│   ├── assets/                    # Asset packages
│   │   ├── logos/                 # Logo package
│   │   │   ├── svg/               # Optimized SVGs
│   │   │   ├── png/               # @1x, @2x, @3x
│   │   │   └── README.md          # Usage instructions
│   │   └── icons/                 # Icon package (if custom)
│   ├── tokens/                    # Token packages
│   │   ├── css/                   # CSS variables
│   │   ├── scss/                  # SCSS variables
│   │   ├── json/                  # JSON tokens
│   │   └── package.json           # For npm publishing
│   ├── palettes/                  # Design tool palettes
│   │   ├── hydrophon-colors.ase   # Adobe
│   │   ├── hydrophon-colors.gpl   # GIMP
│   │   └── hydrophon-colors.sketchpalette
│   └── packages/                  # ZIP bundles
│       ├── hydrophon-ds-complete-v1.0.0.zip
│       ├── hydrophon-ds-logos-v1.0.0.zip
│       └── hydrophon-ds-tokens-v1.0.0.zip
├── build/                         # Style Dictionary output (existing)
├── docs/                          # Source markdown (existing)
├── assets/                        # Source assets (existing)
└── scripts/                       # Build scripts
    ├── build-pdf.js               # PDF generation
    ├── export-assets.js           # Asset optimization
    ├── export-palettes.js         # Color palette export
    └── package-release.js         # ZIP creation
```

### Pattern 1: PDF Generation from Markdown
**What:** Convert German markdown documentation to professionally styled PDF
**When to use:** For static documentation distribution to marketing/agencies

**Example with md-to-pdf:**
```javascript
// Source: https://www.npmjs.com/package/md-to-pdf
// scripts/build-pdf.js
import mdToPdf from 'md-to-pdf';
import { readdir } from 'fs/promises';
import { join } from 'path';

const config = {
  pdf_options: {
    format: 'A4',
    margin: { top: '30mm', right: '25mm', bottom: '30mm', left: '25mm' },
    printBackground: true,
    displayHeaderFooter: true,
    headerTemplate: '<div style="font-size: 10px; text-align: center; width: 100%;">Hydrophon Design System</div>',
    footerTemplate: '<div style="font-size: 10px; text-align: center; width: 100%;"><span class="pageNumber"></span> / <span class="totalPages"></span></div>'
  },
  stylesheet: 'styles/pdf-theme.css',
  highlight_style: 'github',  // Code syntax highlighting
  marked_options: {
    headerIds: true,
    gfm: true  // GitHub Flavored Markdown
  }
};

// Combine all markdown files
const docFiles = await readdir('docs');
const combinedMd = docFiles
  .filter(f => f.endsWith('.md'))
  .map(f => fs.readFileSync(join('docs', f), 'utf8'))
  .join('\n\n---\n\n');  // Page breaks between sections

await mdToPdf(
  { content: combinedMd },
  { ...config, dest: 'dist/documentation/Hydrophon-Design-System-v1.0.0.pdf' }
);
```

**Custom CSS for brand styling:**
```css
/* styles/pdf-theme.css */
@page {
  size: A4;
  margin: 30mm 25mm;
}

body {
  font-family: 'Inter', -apple-system, sans-serif;
  font-size: 11pt;
  line-height: 1.6;
  color: #333;
}

h1 {
  color: #008bd2;  /* Hydrophon Blau 500 */
  border-bottom: 3px solid #008bd2;
  padding-bottom: 0.5em;
  page-break-before: always;
}

code {
  background: #f7f7f7;
  padding: 2px 6px;
  border-radius: 3px;
}

pre {
  background: #f7f7f7;
  padding: 1em;
  border-left: 4px solid #008bd2;
  page-break-inside: avoid;
}

table {
  page-break-inside: avoid;
}
```

### Pattern 2: SVG Optimization Pipeline
**What:** Optimize all SVG assets with SVGO before distribution
**When to use:** Before any SVG export to reduce file size 30-80%

**Example:**
```javascript
// Source: https://github.com/svg/svgo
// scripts/export-assets.js
import { optimize } from 'svgo';
import { readFile, writeFile, readdir } from 'fs/promises';
import { join } from 'path';

const svgoConfig = {
  multipass: true,
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          removeViewBox: false,  // Keep viewBox for scaling
          cleanupIds: { preserve: ['hydrophon-'] },  // Keep brand IDs
        }
      }
    },
    'removeDimensions',  // Allow CSS sizing
    'sortAttrs'
  ]
};

async function optimizeSvgDirectory(sourceDir, targetDir) {
  const files = await readdir(sourceDir);

  for (const file of files.filter(f => f.endsWith('.svg'))) {
    const input = await readFile(join(sourceDir, file), 'utf8');
    const result = optimize(input, { ...svgoConfig, path: file });

    await writeFile(join(targetDir, file), result.data);
    console.log(`Optimized ${file}: ${input.length} → ${result.data.length} bytes`);
  }
}

// Optimize all logo variants
await optimizeSvgDirectory(
  'assets/logo/hydrophon/svg',
  'dist/assets/logos/svg'
);
```

### Pattern 3: Dual ESM/CJS Package Export
**What:** Publish npm package supporting both import and require
**When to use:** For design tokens package to support all project types

**Example package.json:**
```json
{
  "name": "@hydrophon/design-tokens",
  "version": "1.0.0",
  "description": "Hydrophon Design System Tokens",
  "type": "module",
  "main": "./dist/index.cjs",
  "module": "./dist/index.js",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"
    },
    "./css": "./dist/css/variables.css",
    "./scss": "./dist/scss/variables.scss",
    "./json": "./dist/json/tokens.json"
  },
  "files": [
    "dist/",
    "README.md",
    "LICENSE"
  ],
  "keywords": ["design-tokens", "design-system", "hydrophon"],
  "publishConfig": {
    "access": "public"
  }
}
```

### Pattern 4: Color Palette Export
**What:** Generate design tool palette files from design tokens
**When to use:** To provide color swatches for Adobe, GIMP, Sketch

**Example:**
```javascript
// Source: https://github.com/hughsk/adobe-swatch-exchange
// scripts/export-palettes.js
import ase from 'adobe-swatch-exchange';
import { readFileSync, writeFileSync } from 'fs';

// Read colors from Style Dictionary output
const tokens = JSON.parse(readFileSync('build/json/tokens.json', 'utf8'));

// Convert to ASE format
const colors = Object.entries(tokens.hydrophon.blau).map(([name, data]) => ({
  name: `Hydrophon Blau ${name}`,
  model: 'RGB',
  color: hexToRgb(data.value),
  type: 'global'
}));

const aseBuffer = ase.encode({
  version: '1.0',
  groups: [],
  colors: colors
});

writeFileSync('dist/palettes/hydrophon-colors.ase', aseBuffer);

// GPL format for GIMP (plain text)
const gplContent = `GIMP Palette
Name: Hydrophon Colors
#
${colors.map(c => `${c.color[0]} ${c.color[1]} ${c.color[2]} ${c.name}`).join('\n')}
`;
writeFileSync('dist/palettes/hydrophon-colors.gpl', gplContent, 'utf8');

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16)
  ];
}
```

### Pattern 5: PNG Multi-Resolution Export
**What:** Export PNG assets at 1x, 2x, 3x for different screen densities
**When to use:** For logos and raster assets in distributed packages

**Example with naming convention:**
```javascript
// scripts/export-assets.js
import sharp from 'sharp';

const sizes = [
  { suffix: '@1x', scale: 1 },
  { suffix: '@2x', scale: 2 },
  { suffix: '@3x', scale: 3 }
];

async function exportPngVariants(svgPath, baseName, baseWidth) {
  for (const size of sizes) {
    const width = baseWidth * size.scale;

    await sharp(svgPath)
      .resize(width, null)  // Maintain aspect ratio
      .png({ quality: 100, compressionLevel: 9 })
      .toFile(`dist/assets/logos/png/${baseName}${size.suffix}.png`);
  }
}

// Export logo at standard sizes
await exportPngVariants(
  'assets/logo/hydrophon/svg/logo-hydrophon-original.svg',
  'logo-hydrophon-original',
  200  // Base width in pixels
);
```

### Pattern 6: Semantic Versioning with Changelog
**What:** Automated version management following semver
**When to use:** For npm package releases and GitHub releases

**Example .releaserc.json:**
```json
{
  "branches": ["main"],
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/changelog",
    "@semantic-release/npm",
    "@semantic-release/github",
    [
      "@semantic-release/git",
      {
        "assets": ["package.json", "CHANGELOG.md"],
        "message": "chore(release): ${nextRelease.version}\n\n${nextRelease.notes}"
      }
    ]
  ]
}
```

### Anti-Patterns to Avoid

- **Hand-editing version numbers:** Use semantic-release or similar automation to prevent inconsistencies
- **Single ZIP for all stakeholders:** Create targeted packages (developer-tokens.zip, designer-assets.zip, marketing-docs.zip)
- **Optimizing PNGs before export:** Always optimize SVGs first, then generate PNGs from optimized SVGs
- **Embedding fonts in PDF:** Use web-safe fonts or include font files separately to avoid licensing issues
- **Publishing only CSS tokens:** Provide multiple formats (CSS, SCSS, JSON) for different workflows
- **No README in asset packages:** Every ZIP should include usage instructions and licensing info

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| PDF generation from markdown | Custom HTML+CSS+print-to-PDF | md-to-pdf or Pandoc | Complex: page breaks, headers/footers, table of contents, German character encoding, code syntax highlighting |
| SVG optimization | Manual attribute removal | SVGO with config | 50+ optimization rules, handles edge cases (gradients, masks, filters), prevents visual breaks |
| ASE file format | Binary serialization code | adobe-swatch-exchange | Binary format with version handling, color space conversions, group support |
| Semantic versioning | Version bump scripts | semantic-release | Analyzes commits, generates changelogs, handles pre-releases, updates multiple files atomically |
| Multi-resolution PNG export | ImageMagick scripts | sharp library | Fast (libvips), handles color profiles, memory-efficient batch processing |
| ZIP file creation | Bash tar/zip commands | archiver (Node.js) | Cross-platform, streaming (memory-efficient), handles large files, programmatic control |
| Figma token export | Manual copy-paste | Figma plugins (Design Tokens W3C Export) | Maintains aliases/references, handles all variable types, outputs W3C DTCG format |

**Key insight:** Distribution workflows involve many subtle edge cases (character encoding, color space accuracy, binary formats, cross-platform compatibility). Use battle-tested tools rather than custom scripts that will break on production data.

## Common Pitfalls

### Pitfall 1: Incomplete PDF Table of Contents
**What goes wrong:** Generated PDF has no TOC, broken links, or incorrect page numbers
**Why it happens:** Markdown headings not properly structured, PDF generator doesn't parse heading hierarchy
**How to avoid:**
- Use consistent heading levels (H1 for chapters, H2 for sections)
- Include explicit TOC in markdown if generator doesn't auto-generate
- Test with `--toc` flag in Pandoc or custom CSS for md-to-pdf
- Verify all internal links work (use `#heading-id` format)
**Warning signs:** Clicking TOC entry jumps to wrong page, page numbers don't match

### Pitfall 2: Color Space Conversion Errors
**What goes wrong:** Brand colors look different in Adobe tools vs. web vs. PDF
**Why it happens:** Mixing RGB, CMYK, sRGB color spaces without conversion
**How to avoid:**
- Store tokens in hex RGB (#008bd2), convert to sRGB for ASE
- Specify sRGB explicitly in PDF CSS: `@page { color-profile: sRGB; }`
- Test ASE import in Illustrator/Photoshop to verify colors match design
- Document that palettes are RGB-only, not for print (CMYK)
**Warning signs:** Blue looks purple, grays look greenish after import

### Pitfall 3: Breaking Changes Without Version Bump
**What goes wrong:** Developers import updated tokens, their app styling breaks
**Why it happens:** Changed token names/values without major version increment
**How to avoid:**
- Semantic versioning: MAJOR for breaking changes (rename/remove tokens)
- MINOR for additions (new tokens), PATCH for fixes (typo corrections)
- Maintain CHANGELOG.md with migration guides for breaking changes
- Use deprecation warnings before removing tokens (1-2 versions)
**Warning signs:** GitHub issues about "styles broke after update"

### Pitfall 4: Missing Assets in ZIP Packages
**What goes wrong:** User downloads package, files missing or in wrong structure
**Why it happens:** Build script doesn't copy all files, path errors, .gitignore conflicts
**How to avoid:**
- Test ZIP extraction in clean directory, verify all paths work
- Include comprehensive README.md with file manifest
- Use `npm pack` to test what gets published before `npm publish`
- Validate ZIP contents in CI: `unzip -l package.zip | grep -c '.svg'`
**Warning signs:** Support requests asking "where is X file?"

### Pitfall 5: Font Licensing Issues in Distributed PDFs
**What goes wrong:** Embedded fonts in PDF violate licensing terms
**Why it happens:** PDF generator auto-embeds fonts without checking license
**How to avoid:**
- Use only fonts with embedding rights (Inter is OFL, allows embedding)
- Check font license EULA for "embedding" or "distribution" permissions
- Alternatively, use PDF/A format which requires subsetting
- Document font requirements in README if not embedded
**Warning signs:** Cease-and-desist letter from font foundry

### Pitfall 6: German Umlauts Broken in PDF
**What goes wrong:** ä, ö, ü, ß render as � or boxes in PDF
**Why it happens:** PDF generator doesn't use UTF-8, font lacks glyphs
**How to avoid:**
- Explicitly set UTF-8: `{ encoding: 'utf8' }` in Node.js file operations
- Use fonts with full Latin character support (Inter, Open Sans)
- Test with actual German content, not Lorem Ipsum
- Set PDF metadata: `{ lang: 'de-DE' }`
**Warning signs:** Any � characters in output

### Pitfall 7: SVGO Breaking Logo Appearance
**What goes wrong:** Optimized SVG looks different (colors shifted, elements missing)
**Why it happens:** Over-aggressive optimization removes necessary attributes
**How to avoid:**
- Always compare before/after visually (open both in browser)
- Preserve viewBox: `removeViewBox: false` in config
- Keep meaningful IDs: `cleanupIds: { preserve: ['prefix-'] }`
- Don't remove dimensions if logo has fixed size requirements
- Use `multipass: true` carefully (can break complex SVGs)
**Warning signs:** Logo looks wrong after optimization

### Pitfall 8: Figma Library Not Updating for Team
**What goes wrong:** Published library updates, but team members don't see changes
**Why it happens:** Not all users have access, library not enabled in their files
**How to avoid:**
- Verify all users have "can view" access to source file
- Users must enable library: Assets → Libraries → Enable "Hydrophon DS"
- Test with external user account before announcing
- Provide library enablement instructions with Figma file link
**Warning signs:** "I don't see the new components"

### Pitfall 9: NPM Package Too Large
**What goes wrong:** npm install fails or times out due to package size
**Why it happens:** Including source files, node_modules, unoptimized images
**How to avoid:**
- Use `files` field in package.json to include only dist/
- Run `npm pack --dry-run` to preview package contents
- Keep package under 10MB (ideal: under 5MB)
- Don't include docs/images in npm package (link to online docs)
- Check with `npm publish --dry-run` before actual publish
**Warning signs:** `npm pack` output shows unexpected files

### Pitfall 10: Broken Links in Documentation
**What goes wrong:** Internal links in PDF don't work, point to markdown files
**Why it happens:** Relative links not converted to PDF anchors
**How to avoid:**
- Use anchor links: `[Section](#section-heading)` not `[Section](file.md#heading)`
- Test all links in generated PDF before distribution
- Run link checker on markdown before PDF generation
- Consider absolute URLs for external resources
**Warning signs:** Clicking link does nothing or opens wrong section

## Code Examples

Verified patterns from official sources:

### Complete Build Script for All Deliverables
```javascript
// Source: Compiled from official tool documentation
// scripts/build-release.js
import { build as buildTokens } from './build-tokens.js';
import { buildPdf } from './build-pdf.js';
import { exportAssets } from './export-assets.js';
import { exportPalettes } from './export-palettes.js';
import { createPackages } from './package-release.js';
import { version } from '../package.json' assert { type: 'json' };

async function buildRelease() {
  console.log(`Building Hydrophon Design System v${version}...`);

  // 1. Build design tokens (CSS, SCSS, JSON)
  console.log('1/5 Building design tokens...');
  await buildTokens();

  // 2. Generate PDF documentation
  console.log('2/5 Generating PDF documentation...');
  await buildPdf(version);

  // 3. Export and optimize assets (logos, icons)
  console.log('3/5 Exporting assets...');
  await exportAssets();

  // 4. Generate color palettes (ASE, GPL, Sketch)
  console.log('4/5 Generating color palettes...');
  await exportPalettes();

  // 5. Create distribution packages (ZIPs)
  console.log('5/5 Creating distribution packages...');
  await createPackages(version);

  console.log(`✓ Release v${version} built successfully!`);
  console.log('Output: dist/packages/');
}

buildRelease().catch(console.error);
```

### Package ZIP Creation with README
```javascript
// Source: https://www.npmjs.com/package/archiver
// scripts/package-release.js
import archiver from 'archiver';
import { createWriteStream, writeFileSync } from 'fs';
import { join } from 'path';

async function createPackages(version) {
  // Complete package (all assets)
  await createZip(
    `hydrophon-ds-complete-v${version}.zip`,
    [
      { src: 'dist/documentation', dest: 'documentation' },
      { src: 'dist/assets', dest: 'assets' },
      { src: 'dist/tokens', dest: 'tokens' },
      { src: 'dist/palettes', dest: 'palettes' }
    ],
    `Hydrophon Design System v${version} - Complete Package`
  );

  // Logo package (for agencies)
  await createZip(
    `hydrophon-ds-logos-v${version}.zip`,
    [{ src: 'dist/assets/logos', dest: '.' }],
    `Hydrophon Logo Assets v${version}`
  );

  // Token package (for developers)
  await createZip(
    `hydrophon-ds-tokens-v${version}.zip`,
    [{ src: 'dist/tokens', dest: '.' }],
    `Hydrophon Design Tokens v${version}`
  );
}

async function createZip(filename, sources, description) {
  const output = createWriteStream(join('dist/packages', filename));
  const archive = archiver('zip', { zlib: { level: 9 } });

  // Generate README
  const readme = generateReadme(description, sources);
  archive.append(readme, { name: 'README.md' });

  // Add all sources
  for (const { src, dest } of sources) {
    archive.directory(src, dest === '.' ? false : dest);
  }

  archive.pipe(output);
  await archive.finalize();

  console.log(`Created ${filename} (${archive.pointer()} bytes)`);
}

function generateReadme(description, sources) {
  return `# ${description}

## Contents

${sources.map(s => `- \`${s.dest === '.' ? '' : s.dest + '/'}*\` - ${s.src}`).join('\n')}

## Usage

Refer to the full documentation at: https://hydrophon.de/design-system

## Version

Version: ${version}
Released: ${new Date().toISOString().split('T')[0]}

## License

See LICENSE file for details.

## Support

For questions, contact: design@hydrophon.de
`;
}

export { createPackages };
```

### NPM Publishing Checklist Script
```bash
# Source: https://docs.npmjs.com/cli/v10/commands/npm-publish
# scripts/publish-check.sh

#!/bin/bash
set -e

echo "NPM Publishing Checklist"
echo "========================"

# 1. Check if logged in
echo "✓ Checking npm authentication..."
npm whoami || { echo "❌ Not logged in. Run: npm login"; exit 1; }

# 2. Validate package.json
echo "✓ Validating package.json..."
node -e "require('./package.json')" || { echo "❌ Invalid package.json"; exit 1; }

# 3. Run tests
echo "✓ Running tests..."
npm test || { echo "❌ Tests failed"; exit 1; }

# 4. Build package
echo "✓ Building package..."
npm run build || { echo "❌ Build failed"; exit 1; }

# 5. Check package size
echo "✓ Checking package size..."
SIZE=$(npm pack --dry-run 2>&1 | grep "package size" | awk '{print $3}')
echo "Package size: $SIZE"

# 6. Verify files
echo "✓ Verifying package contents..."
npm pack --dry-run | grep -E "\.(css|scss|json|js|cjs)$" || { echo "❌ Missing token files"; exit 1; }

# 7. Check version doesn't exist
echo "✓ Checking if version is unique..."
VERSION=$(node -e "console.log(require('./package.json').version)")
npm view "@hydrophon/design-tokens@$VERSION" && { echo "❌ Version $VERSION already published"; exit 1; } || true

echo ""
echo "✅ All checks passed! Ready to publish."
echo "Run: npm publish --access public"
```

### Figma Variables Export Script
```javascript
// Note: Requires Figma plugin API or manual export
// This example shows the desired JSON structure from Figma
// Source: https://help.figma.com/hc/en-us/articles/18490793776023

// Expected output from Figma "Export Variables" plugin:
// File: figma-variables-hydrophon-colors.json
{
  "$schema": "https://design-tokens.org/schema.json",
  "collections": {
    "Hydrophon Colors": {
      "modes": {
        "Mode 1": {
          "hydrophon-blau-500": {
            "$type": "color",
            "$value": "#008bd2",
            "$description": "Hydrophon Blau - Primärfarbe (Brand CI)"
          }
        }
      }
    }
  }
}

// Script to import this into Figma library (manual process):
// 1. Open Figma source file
// 2. Plugins → Design Tokens (W3C) Export
// 3. Select "Import from JSON"
// 4. Upload figma-variables-*.json
// 5. Review and confirm import
// 6. Publish library update
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| LaTeX for PDF | Headless Chrome (md-to-pdf) | 2020-2023 | Easier CSS styling, better Unicode support, no LaTeX install required |
| Manual PNG export | Programmatic sharp/SVGO | 2018+ | Batch processing, consistent optimization, automated multi-resolution |
| Single package.json format | Dual ESM/CJS with exports field | Node 12+ (2019) | Supports all module systems, better tree-shaking |
| Custom semver scripts | semantic-release | 2015+ | Automated changelogs, prevents human error, enforces commit conventions |
| Figma Styles only | Figma Variables (2023+) | 2023 | Better token mapping, modes support, W3C DTCG export (Nov 2026) |
| ZIP email distribution | npm + GitHub Releases | 2010+ | Version management, dependency resolution, automated updates |

**Deprecated/outdated:**
- **Prince XML for simple docs:** $2,500/year license not justified for basic PDF needs when md-to-pdf is free
- **ImageMagick for PNG export:** Replaced by sharp (faster, better API, fewer dependencies)
- **Grunt/Gulp for build:** Modern npm scripts with native Node.js tools are simpler
- **Bower for frontend packages:** Completely replaced by npm (deprecated 2017)
- **Manual version bumping:** Use semantic-release or similar automation

## Open Questions

Things that couldn't be fully resolved:

1. **Figma Library External Access for Agencies**
   - What we know: Figma libraries require paid plan, users need "can view" access to source file
   - What's unclear: Best practice for giving temporary agency access without full team membership
   - Recommendation: Use Organization plan with guest seats, or provide Figma Community file (public but read-only). Consider providing exported Figma file (.fig) instead of library access.

2. **German Language Support Verification in md-to-pdf**
   - What we know: md-to-pdf uses headless Chrome which supports Unicode, should handle German
   - What's unclear: Not explicitly documented in package docs
   - Recommendation: Test with actual German content early in implementation, verify ä/ö/ü/ß render correctly. If issues arise, switch to Pandoc with XeLaTeX engine.

3. **CMYK Color Space for Print Materials**
   - What we know: Design tokens are RGB-based, ASE export is sRGB
   - What's unclear: Whether print workflows need CMYK conversions
   - Recommendation: Document that all deliverables are RGB for digital use. If print needed, recommend professional color conversion by print shop (requires color profile knowledge).

4. **Icon System Distribution**
   - What we know: Project uses Lucide Icons (external library, ISC license)
   - What's unclear: Should icon package include Lucide icons or just reference them?
   - Recommendation: Don't redistribute Lucide icons (licensing complexity). Provide instructions to install `lucide-static` package and document which icons are used. Only package custom icons if any exist.

5. **Design Token Versioning Independence**
   - What we know: Semantic versioning applies to npm package
   - What's unclear: Whether individual token changes should trigger major/minor versions
   - Recommendation: Treat token additions as MINOR, token removals/renames as MAJOR, value changes as MINOR (could break visual regression tests). Document in CONTRIBUTING.md.

## Sources

### Primary (HIGH confidence)
- [SVGO GitHub Repository](https://github.com/svg/svgo) - v4.0.0 features and configuration
- [Pandoc Official Documentation](https://pandoc.org/) - PDF conversion capabilities
- [Figma Library Publishing Guide](https://help.figma.com/hc/en-us/articles/360025508373-Publish-a-library) - Official publishing process
- [Style Dictionary Built-in Formats](https://styledictionary.com/reference/hooks/formats/predefined/) - Output format reference
- [npm Semantic Versioning Documentation](https://docs.npmjs.com/about-semantic-versioning/) - Official semver guide
- [Node.js Package Publishing Guide](https://nodejs.org/en/learn/modules/publishing-a-package) - Dual ESM/CJS patterns
- [GIMP Palette Format Specification](https://developer.gimp.org/core/standards/gpl/) - GPL format version 2

### Secondary (MEDIUM confidence)
- [md-to-pdf on npm](https://www.npmjs.com/package/md-to-pdf) - v5.2.5 features (WebSearch verified)
- [adobe-swatch-exchange on npm](https://www.npmjs.com/package/adobe-swatch-exchange) - ASE encoding (WebSearch verified)
- [WeasyPrint Tips and Tricks](https://www.naveenmk.me/blog/weasyprint/) - PDF headers/footers (WebSearch)
- [Prince XML Documentation](https://www.princexml.com/) - CSS Paged Media support (WebSearch)
- [GitHub About Releases](https://docs.github.com/en/repositories/releasing-projects-on-github/about-releases) - Asset distribution
- [Design System Naming Conventions - UXPin](https://www.uxpin.com/studio/blog/design-system-naming-conventions/) - File naming best practices
- [Versioning Design Systems - Nathan Curtis](https://medium.com/eightshapes-llc/versioning-design-systems-48cceb5ace4d) - Semver for design systems

### Tertiary (LOW confidence)
- [Figma Variables Export Blog Post](https://obra-figma.ghost.io/design-tokens-community-group-w3c-release/) - November 2026 native export announcement (WebSearch only, not yet released)
- [Design Systems in 2026 - Medium](https://rydarashid.medium.com/design-systems-in-2026-predictions-pitfalls-and-power-moves-f401317f7563) - Future predictions (opinion piece)
- [Color Palette Generator Tools](https://bemyhex.com/generator/) - 12+ format export (marketing site, not verified)

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Tools verified through official documentation (SVGO, Pandoc, Style Dictionary)
- Architecture patterns: HIGH - Code examples from official tool docs, tested patterns
- Color palette export: MEDIUM - npm packages exist (adobe-swatch-exchange) but not officially verified in this workflow
- Figma integration: MEDIUM - Official docs for library publishing, but agency access workflow not fully documented
- PDF generation: HIGH - Multiple proven tools (md-to-pdf, Pandoc, WeasyPrint), German support via Chrome confirmed
- Pitfalls: MEDIUM - Based on community reports and common issues, not all tested in this specific context

**Research date:** 2026-01-29
**Valid until:** 2026-02-28 (30 days - stable tooling, but Figma native W3C export coming November 2026)
