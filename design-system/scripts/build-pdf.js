import { createRequire } from 'module';
import { readFile, readdir, mkdir } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const require = createRequire(import.meta.url);
const { mdToPdf } = require('md-to-pdf');

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const docsDir = join(__dirname, '../docs');
const outputDir = join(__dirname, '../dist/documentation');
const outputPath = join(outputDir, 'Hydrophon-Design-System-v1.0.0.pdf');

// Define documentation order for logical PDF flow
const documentOrder = [
  // Introduction
  'README.md',

  // Quick start
  '00-quick-start/marketing-onboarding.md',

  // Foundation
  'colors.md',
  'typography.md',
  'spacing-grid.md',
  'effects.md',
  'logo-guidelines.md',

  // Components
  'icons.md',
  'buttons.md',

  // Forms
  'forms/index.md',
  'forms/text-input.md',
  'forms/textarea.md',
  'forms/select.md',
  'forms/checkbox.md',
  'forms/radio-button.md',
  'forms/labels-helper-text.md',
  'forms/validation.md',

  // Navigation
  'navigation/index.md',
  'navigation/header.md',
  'navigation/mobile-drawer.md',
  'navigation/breadcrumb.md',
  'navigation/footer.md',

  // Content Components
  'components/product-card.md',
  'components/content-card.md',
  'components/data-table.md',

  // Feedback
  'feedback/index.md',
  'feedback/modal.md',
  'feedback/tooltip.md',
  'feedback/toast.md',
  'feedback/loading.md',

  // Accessibility
  '03-accessibility/overview.md',
  '03-accessibility/wcag-compliance.md',
  '03-accessibility/testing-guide.md',

  // Technical Reference
  '04-technical-reference/design-tokens.md',
  '04-technical-reference/css-variables.md',
  '04-technical-reference/grid-breakpoints.md',

  // Audience Guides
  '05-audience-guides/for-marketing.md',
  '05-audience-guides/for-designers.md',
  '05-audience-guides/for-developers.md',
];

async function buildPdf() {
  console.log('Building PDF documentation...');

  // Ensure output directory exists
  await mkdir(outputDir, { recursive: true });

  // Read all markdown files in order
  const sections = [];
  for (const file of documentOrder) {
    const filePath = join(docsDir, file);
    try {
      const content = await readFile(filePath, 'utf8');
      sections.push(content);
    } catch (error) {
      console.warn(`Warning: Could not read ${file}:`, error.message);
    }
  }

  // Combine with page breaks between major sections
  const combinedMarkdown = sections.join('\n\n---\n\n');

  // Configure PDF options
  const config = {
    pdf_options: {
      format: 'A4',
      margin: {
        top: '30mm',
        right: '25mm',
        bottom: '30mm',
        left: '25mm'
      },
      printBackground: true,
      displayHeaderFooter: true,
      headerTemplate: '<div style="font-size: 10px; text-align: center; width: 100%; margin-top: 10px;">Hydrophon Design System</div>',
      footerTemplate: '<div style="font-size: 10px; text-align: center; width: 100%; margin-bottom: 10px;"><span class="pageNumber"></span> / <span class="totalPages"></span></div>'
    },
    stylesheet: join(__dirname, '../styles/pdf-theme.css'),
    highlight_style: 'github',
    marked_options: {
      headerIds: true,
      gfm: true
    }
  };

  // Generate PDF
  console.log(`Generating PDF with ${sections.length} sections...`);
  await mdToPdf(
    { content: combinedMarkdown },
    {
      ...config,
      dest: outputPath,
      launch_options: {
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      }
    }
  );

  console.log(`✓ PDF generated: ${outputPath}`);
}

buildPdf().catch(error => {
  console.error('Error building PDF:', error);
  process.exit(1);
});
