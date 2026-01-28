# Stack Research

**Domain:** Corporate Design System Documentation (B2B Manufacturing)
**Researched:** 2026-01-28
**Confidence:** HIGH

## Recommended Stack

### Core Technologies

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| **Figma** | 2025+ with Variables | Design system creation, component library, design token definition | Industry standard for 2025/2026. Native Variables feature enables design tokens. Extended Collections support multi-brand systems. AI integration for consistency. Native DTCG export coming in 2025. Used by 3 external agencies - ensures collaboration without friction. |
| **Style Dictionary** | 4.0+ | Design token transformation and platform export | Open-source industry standard for token management. First-class DTCG (W3C) format support as of v4. Exports tokens to 10+ platforms (CSS, SCSS, JSON, iOS, Android). Actively maintained (745 commits, 4.5k stars). Critical for website handoff. |
| **Adobe InDesign** | 2025 (v20.0+) | PDF brand guidelines generation | Professional standard for static documentation. Superior typography and layout control vs Figma export. Essential for high-quality PDF deliverables. Marketing teams already familiar with Adobe ecosystem. |
| **Figma Variables** | Native (2025+) | Design token authoring within Figma | Eliminates plugin dependencies. 23+ token types supported. Changes ripple through all components automatically. Enables light/dark modes, multi-brand theming. Direct integration with design workflow. |

### Supporting Libraries

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| **Tokens Studio** | 2025+ (Figma plugin) | Advanced token management if Figma Variables insufficient | Only if you need 23+ token types, GitHub sync, or multi-file token sets. Consider for v2 if managing 500+ tokens across multiple brands. Cost: starts at $35/seat/month. |
| **Frontify** | 2025 | Living brand guidelines (optional web platform for v2) | NOT for v1 (static PDF required). Consider for v2 if agencies need real-time updates. Enterprise-level, used by major corporations. Higher cost. |
| **Zeroheight** | 2025 | Design system documentation platform (optional for v2) | NOT for v1. Consider for v2 if you want interactive web documentation. Strong token management, integrates with Figma. |
| **Supernova** | 2025 | Design system management with export capabilities | MAYBE for v1 - supports markdown/static export. Best if managing 3+ brands or 500+ tokens. Cost: $35/seat/month. Consider if InDesign expertise unavailable. |

### Development Tools

| Tool | Purpose | Notes |
|------|---------|-------|
| **Git** | Version control for design tokens | Essential for tracking token changes, enabling rollback. Store JSON token files, not Figma files. Use GitHub/GitLab for agency access. |
| **Node.js** | Runtime for Style Dictionary | Required to run token transformation scripts. Version 18+ recommended. |
| **VS Code** | Token file editing | For engineers building website. Extensions: JSON validation, DTCG schema support. |
| **Figma Desktop App** | Offline design work | Desktop app provides better performance for large component libraries than web version. |
| **TinyImage Compressor** | Figma plugin for asset optimization | Compress assets before export to reduce PDF file size. Lossless quality. |

## Installation

```bash
# Design Token Management
npm install --save-dev style-dictionary@^4.0.0

# Initialize Style Dictionary project
npm init style-dictionary

# (Optional) DTCG validation
npm install --save-dev @tokens-studio/dtcg-validate
```

**For Figma:**
- Install Figma Desktop: https://www.figma.com/downloads/
- Enable Figma Variables (native feature, no installation)
- (Optional) Install Tokens Studio plugin from Figma Community if advanced token features needed

**For InDesign:**
- Subscribe to Adobe Creative Cloud (InDesign 2025 or later)
- Install from Adobe Creative Cloud desktop app
- Ensure Creative Cloud Libraries enabled for asset sync from Figma

## Alternatives Considered

| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| **Figma** | Sketch | Only if already heavily invested in Sketch. Figma has surpassed Sketch in design system capabilities (Variables, DTCG support, collaboration). Sketch lacks native token management. |
| **Figma** | Adobe XD | DO NOT USE - Adobe discontinued XD development in favor of Figma. |
| **InDesign** | Canva | Only if budget is extremely limited AND no Adobe expertise available. Canva lacks professional typography control. NOT suitable for B2B manufacturing brand quality standards. |
| **InDesign** | Figma PDF export | Use Figma export for drafts/reviews only. InDesign required for final deliverable due to: superior typography, multi-page document management, print-ready output, professional standards. |
| **Style Dictionary** | Theo (Salesforce) | Only if already using Salesforce design system infrastructure. Theo is less actively maintained (last update 2021). Style Dictionary has broader community, better DTCG support. |
| **Figma Variables** | Tokens Studio plugin | Use Tokens Studio only if: managing 500+ tokens, need GitHub sync, require more than basic token types. For v1 with 2 brand colors + basic tokens, native Variables sufficient. |

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| **Adobe XD** | Discontinued by Adobe. No future updates. Poor design token support. | Figma |
| **PowerPoint/Keynote for brand guidelines** | Unprofessional output quality. Poor typography. Not print-ready. Difficult version control. | Adobe InDesign |
| **Canva for PDF generation** | Lacks professional print capabilities. Limited typography control. Not B2B quality standard. Free tier has watermarks. | Adobe InDesign |
| **Static PDF-only workflow (no tokens)** | Makes website implementation inconsistent. No single source of truth. Manual token translation error-prone. | Figma Variables + Style Dictionary pipeline |
| **Proprietary token formats** | Locks you into specific tools. Makes migration difficult. Not future-proof. | W3C DTCG standard (JSON format) |
| **Design tokens in Notion/Confluence** | No programmatic export. Manual copy-paste error-prone. Not version controlled. | Style Dictionary JSON files in Git |
| **Multiple design files without component library** | Inconsistency across 3 agencies. Version drift. Maintenance nightmare. | Figma shared component library + published libraries |

## Stack Patterns by Variant

**For Static PDF Documentation (v1 - YOUR CASE):**
- Figma for design system creation + component library
- Figma Variables for design tokens (colors, typography, spacing)
- Style Dictionary to export tokens to JSON for website team
- Git repository for token files and version control
- InDesign for final PDF brand guidelines compilation
- Export assets from Figma (SVG logos, PNG images) to asset library folder
- Deliver: PDF + asset folder + tokens JSON to website team

**For Living Web Documentation (Future v2):**
- Same as above PLUS:
- Zeroheight or Supernova for interactive documentation
- Automated token sync from Figma → Style Dictionary → Documentation platform
- Web hosting for documentation site
- Because: Agencies get real-time updates, searchable docs, interactive components

**For Multi-Brand Enterprise:**
- Same base stack PLUS:
- Tokens Studio plugin for advanced token management
- Multiple token sets (brand A, brand B, shared foundation)
- Extended Collections in Figma for brand inheritance
- Because: Managing 3+ brands or 500+ tokens requires advanced tooling

## Version Compatibility

| Package A | Compatible With | Notes |
|-----------|-----------------|-------|
| Style Dictionary 4.x | DTCG format 2025.10 | Full support for W3C spec. Use `$value`, `$type`, `$description` syntax. |
| Figma 2025+ | DTCG export | Native DTCG export announced at Schema 2025, rolling out in 2025. Use Figma Variables for best results. |
| Tokens Studio plugin | Style Dictionary 4.x | Plugin exports DTCG-compatible JSON. Verify plugin version is 2025+ for full DTCG support. |
| InDesign 2025 | Figma (via SVG export) | Export assets from Figma as SVG/PNG. Import into InDesign via Creative Cloud Libraries or file placement. |
| Node.js 18+ | Style Dictionary 4.x | Node 16 reached EOL. Use Node 18 LTS or Node 20 LTS. |
| Figma Variables | Tokens Studio | Can use both together. Variables for simple tokens, Tokens Studio for complex token logic. Most teams choose one. |

## Rationale by Constraint

### Constraint: "Statische Dokumentation (PDF-basiert)"

**Decision:** Figma → InDesign workflow
**Why:**
- Figma native PDF export exists BUT lacks professional print quality
- InDesign provides: master pages, table of contents, cross-references, paragraph styles, professional typography
- InDesign is B2B quality standard for brand guidelines
- Marketing teams already know InDesign (Adobe ecosystem familiarity)
- Allows future evolution to web documentation without redesign

**Alternatives rejected:**
- Figma-only PDF: Insufficient typography control, no TOC generation, not print-ready
- Canva: Not professional quality for B2B manufacturing
- Google Docs/Word: Terrible design control, unprofessional output

### Constraint: "Multi-User (Designer, Devs, Marketing)"

**Decision:** Figma shared component libraries + published libraries
**Why:**
- Designers: Full design control, familiar tool
- Developers: Can inspect tokens, export assets, access via API
- Marketing: Can view designs (Figma free viewer), use exported assets, understand guidelines from PDF
- 3 agencies: Can consume published Figma libraries, get updates automatically

**Critical:** Do NOT give edit access to all users. Structure:
- Design team: Editor access to source library
- Agencies: Viewer access + published library consumption
- Marketing: Viewer access
- Developers: Viewer access + token JSON files

### Constraint: "Muss in Website-Entwicklung überführbar sein"

**Decision:** Style Dictionary token pipeline
**Why:**
- Design tokens in Figma Variables (visual tool for designers)
- Export to DTCG JSON format (W3C standard)
- Style Dictionary transforms to CSS variables, SCSS, JS (dev-ready)
- Website team gets source of truth, not screenshots
- Changes to design tokens automatically regenerate code-ready files

**Workflow:**
1. Designer updates color in Figma Variables
2. Export tokens to JSON (manual in v1, automated in v2)
3. Run Style Dictionary build script
4. Generates CSS: `--color-primary: #003366;`
5. Developer imports CSS into website
6. Consistency guaranteed

**Alternatives rejected:**
- Manual token translation: Error-prone, version drift, not scalable
- Screenshots of tokens: Developers type values manually (errors)
- No tokens: Website colors won't match brand (inconsistency)

### Constraint: "3D-Produktvisualisierung statt klassischer Fotografie"

**Decision:** Asset folder structure + Figma component examples
**Why:**
- 3D renders treated as image assets (PNG/WEBP exports from rendering software)
- Store in structured asset library: `/assets/products/3d-renders/`
- Document in PDF guidelines: "Use 3D renders with these lighting/background standards"
- Figma components show 3D render placement examples
- NOT part of design token system (these are content assets, not design decisions)

**Critical:** Define standards for:
- 3D render backgrounds (white? gradient? transparent?)
- Lighting consistency across product renders
- Shadow/reflection styles
- File format: PNG with transparency vs WEBP vs JPG
- Resolution requirements: web (72dpi) vs print (300dpi)

## Tool Selection Decision Matrix

| Tool | Designer Friendly | Dev Friendly | Marketing Friendly | Cost | Confidence |
|------|-------------------|--------------|-------------------|------|-----------|
| Figma | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | Free-$45/editor/mo | HIGH |
| InDesign | ⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐⭐ | $22.99/mo | HIGH |
| Style Dictionary | ⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐ | Free | HIGH |
| Tokens Studio | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐ | Free-$35/mo | MEDIUM |
| Zeroheight | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ | $35-90/mo | MEDIUM |
| Supernova | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | $35/mo | MEDIUM |

**For Hydrophon v1 Recommendation:**
- Figma (MUST HAVE): Design creation, collaboration with agencies
- InDesign (MUST HAVE): Professional PDF output
- Style Dictionary (MUST HAVE): Token export for website team
- Tokens Studio (SKIP for v1): Native Figma Variables sufficient for 2 brand colors
- Zeroheight/Supernova (SKIP for v1): PDF required, not web platform

## Cost Breakdown (v1 Recommendation)

### Required:
- **Figma Professional:** $45/editor/month × 2 designers = $90/month ($1,080/year)
  - 3 agencies on free viewer plan = $0
  - Unlimited files, component libraries, version history

- **Adobe Creative Cloud (InDesign):** $22.99/month ($275.88/year)
  - Single app plan sufficient (InDesign only)
  - Includes 100GB cloud storage, Adobe Fonts

- **Style Dictionary:** FREE (open source)
  - No licensing costs
  - Requires Node.js (free)

- **Git hosting (GitHub/GitLab):** FREE for small team
  - GitHub free tier: unlimited private repos
  - GitLab free tier: 5GB storage

**Total v1 Cost:** ~$1,356/year (~$113/month)

### Optional (Consider for v2):
- **Tokens Studio Studio plan:** $35/editor/month (if token complexity grows)
- **Zeroheight:** Starting $35/month for team plan (for living documentation)
- **Supernova:** Starting $35/month (alternative to Zeroheight)

## Migration Path to v2 (Web Documentation)

When ready to move from static PDF to living web documentation:

1. **Token foundation already in place** (Style Dictionary setup from v1)
2. **Add web documentation platform** (Zeroheight or Supernova)
3. **Automate token sync** (Figma → Git → Style Dictionary → Docs platform)
4. **Keep PDF generation** (Annual printable version from InDesign)
5. **Progressive enhancement:** Agencies use web docs daily, PDF for offline/archival

**Benefits of v1 approach:**
- Not locked into any vendor
- Using W3C standard (DTCG) means future-proof
- Can switch from Supernova to Zeroheight without token system redesign
- Website already using tokens, so web docs are "just another export target"

## Sources

### Official Documentation (HIGH Confidence):
- [Style Dictionary Official Docs](https://styledictionary.com/) — Version 4.0 features, DTCG support verified
- [Style Dictionary GitHub](https://github.com/style-dictionary/style-dictionary) — Maintenance status, 745 commits, actively maintained
- [W3C Design Tokens Community Group](https://www.w3.org/community/design-tokens/) — DTCG format 2025.10 stable release October 28, 2025
- [Adobe InDesign System Requirements](https://helpx.adobe.com/indesign/system-requirements.html) — Version 2025 (v20.0) specifications
- [Figma Blog: Schema 2025 Design Systems](https://www.figma.com/blog/schema-2025-design-systems-recap/) — Extended Collections, native DTCG export

### Industry Analysis (MEDIUM-HIGH Confidence):
- [Design Token Management Tools 2025](https://cssauthor.com/design-token-management-tools/) — Comprehensive tool comparison
- [Design Tokens Specification First Stable Version](https://designzig.com/design-tokens-specification-reaches-first-stable-version-with-w3c-community-group/) — DTCG milestone announcement
- [UX Collective: Design Tokens with Confidence](https://uxdesign.cc/design-tokens-with-confidence-862119eb819b) — W3C standard adoption, Jan 2026
- [Design System Mastery with Figma Variables 2025/2026](https://www.designsystemscollective.com/design-system-mastery-with-figma-variables-the-2025-2026-best-practice-playbook-da0500ca0e66) — Best practices verification

### Ecosystem Research (MEDIUM Confidence):
- [Supernova Documentation](https://www.supernova.io/documentation) — Static export capabilities
- [Zeroheight Design System Platform](https://zeroheight.com/) — Feature set for design systems
- [Best Tools for Documenting Design Systems](https://hike.one/insights/the-best-tools-for-documenting-design-system) — Tool comparison 2025
- [Figma Blog: Documentation That Drives Adoption](https://www.figma.com/blog/design-systems-103-documentation-that-drives-adoption/) — Documentation best practices
- [Design System Management Tools (UXPin)](https://www.uxpin.com/studio/blog/7-great-design-system-management-tools/) — Tool evaluation

### Design Systems for Marketing/B2B (MEDIUM Confidence):
- [Design Systems for Marketing Teams (Webflow)](https://webflow.com/blog/design-systems-for-marketing-teams) — Non-technical user accessibility
- [The Future of Design Systems is Marketing (Figma)](https://www.figma.com/blog/the-future-of-design-systems-is-marketing/) — Marketing team adoption strategies
- [IBM Carbon Design System](https://carbondesignsystem.com/) — Enterprise B2B design system reference
- [Manufacturing & Industrial Branding Strategies 2025](https://webrand.com/blog/manufacturing/manufacturing-industrial-branding-strategies-build-trust-2025) — B2B manufacturing context

### Tool-Specific Resources:
- [Brand Guidelines Generators for Designers 2025](https://www.akrivi.io/learn/best-brand-guidelines-generator) — PDF generation tools comparison
- [Figma PDF Export](https://www.figma.com/blog/our-path-to-creating-the-highest-quality-pdf-exporter/) — Native export capabilities
- [Adobe InDesign 2025 Updates](https://design.tutsplus.com/articles/adobe-indesign-2025-updates--cms-109009) — New features, Flex Layout

---
*Stack research for: Hydrophon Kunststoff GmbH Corporate Design System*
*Researched: 2026-01-28*
*Confidence: HIGH — All core recommendations verified with official sources (Style Dictionary 4.0, DTCG 2025.10, Figma 2025, InDesign 2025)*
