# Project Research Summary

**Project:** Hydrophon Corporate Design System
**Domain:** Corporate Design System for B2B Manufacturing (Sanitary Sector)
**Researched:** 2026-01-28
**Confidence:** HIGH

## Executive Summary

Hydrophon requires a corporate design system to support website redevelopment with three external agencies. This is a classic B2B design system problem: static PDF documentation with asset packages, bridge to code implementation, and multi-user collaboration. Research confirms the recommended approach is a token-first, foundation-up strategy using Figma for design, Style Dictionary for token management, and InDesign for final PDF output.

The critical success factors are: (1) establishing design tokens as the single source of truth from day one to prevent design-code drift across agencies, (2) starting with minimal viable foundations (8-10 core components) rather than building comprehensively, and (3) treating this as a living product requiring ongoing governance, not a one-time deliverable. The primary risk is scope creep leading to a delayed launch that never ships—mitigated by strict MVP scoping and early pilot validation with agencies.

The recommended tech stack (Figma + Style Dictionary + InDesign) represents 2026 industry standard with strong upgrade paths. The 8-phase roadmap structure naturally emerges from dependencies: tokens must precede components, components must precede documentation, and everything must exist before the final PDF can be generated. B2B manufacturing context requires special attention to technical data display patterns and 3D visualization guidelines, but these should come after core foundations prove stable.

## Key Findings

### Recommended Stack

The research validated a three-tool foundation: Figma for design system creation and collaboration with agencies, Style Dictionary for design token transformation and code export, and Adobe InDesign for professional PDF documentation generation. This combination provides the essential bridge between design, development, and static deliverables.

**Core technologies:**
- **Figma (2025+ with Variables):** Design creation, component library, design tokens authoring — Industry standard with native token support, ensures frictionless agency collaboration
- **Style Dictionary (4.0+):** Design token transformation to CSS/JSON/SCSS — Open-source with first-class W3C DTCG format support, critical for website handoff
- **Adobe InDesign (2025):** PDF brand guidelines compilation — Professional print quality required for B2B manufacturing standards, marketing team familiarity
- **Git + Node.js:** Version control and token pipeline — Essential for tracking changes, enabling rollback, automating token exports

**Critical version requirements:**
- Style Dictionary 4.x for DTCG 2025.10 compatibility
- Figma 2025+ for native Variables and Extended Collections
- Node.js 18+ (Node 16 reached EOL)

**Rationale:** This stack satisfies all constraints: static PDF output (InDesign), multi-user collaboration (Figma), code-ready delivery (Style Dictionary), and provides clear upgrade path to web documentation in v2 (add Zeroheight/Supernova).

### Expected Features

Research confirms design systems follow predictable patterns: foundations first (tokens, colors, typography, spacing), then atomic components, then compositions, then documentation.

**Must have (table stakes):**
- Design token system (color, typography, spacing) with W3C DTCG format
- Foundation elements (8-point grid, 4 breakpoints, accessibility baseline WCAG 2.1 AA)
- Core components (8-12 atoms: buttons, inputs, cards, navigation)
- Logo usage guidelines with clear space and sizing rules
- Documentation platform (static PDF with three-tier structure for designers/devs/marketing)

**Should have (competitive advantages):**
- 3D product visualization guidelines (Hydrophon's unique differentiator vs standard photography)
- Technical data display patterns (specification sheets, comparison tables for B2B engineers)
- CAD asset integration guidelines (STEP/IGES file presentation)
- Dark mode support (technical audiences work in low-light)
- Multi-language token structure (German/English + export markets)

**Defer (v2+):**
- Interactive product configurator (high complexity, defer until foundations prove value)
- Advanced animation system (overkill for B2B initially)
- AR/VR guidelines (wait for browser support maturity)
- Automated accessibility testing (value increases with component count)
- White-label system (not applicable until sub-brands exist)

**Anti-features (explicitly avoid):**
- Framework-agnostic components from day one (premature abstraction)
- Over-engineered 8-level token hierarchy (diminishing returns beyond 3 levels)
- Real-time collaboration features (use existing tools, don't reinvent)
- Perfect documentation before shipping (documentation evolves with system)

### Architecture Approach

Design systems in 2026 follow atomic design methodology with three-tier token hierarchy. The critical architectural insight from research is that traditional "foundation-first" approaches rarely ship—hybrid approach recommended where minimal viable foundation enables component work to start quickly, then foundation expands based on real component needs.

**Three-tier token architecture (mandatory):**
1. **Primitive tokens:** Raw values (`color-blue-500: #0066CC`, `spacing-100: 4px`)
2. **Semantic tokens:** Contextual meaning (`color-text-default: {color-blue-500}`)
3. **Component tokens:** Component-specific overrides (`button-primary-bg: {color-text-default}`)

**Major components:**
1. **Design Token System** — Single source of truth for all visual decisions, exported to Figma Variables and CSS, versioned in Git
2. **Component Library** — Atomic design hierarchy (atoms → molecules → organisms → templates → pages), each component documented with specifications
3. **Documentation Platform** — Three-tier docs serving designers (visual guidelines), developers (technical specs), marketing (brand voice), compiled to PDF
4. **Asset Management** — Structured folders for logos, icons, fonts, templates with README and version control
5. **Build Pipeline** — Style Dictionary transforms tokens from JSON to platform-specific formats, InDesign compiles final PDF

**Critical architectural patterns:**
- Token-first component definition (never hard-code values)
- Progressive disclosure documentation (overview → guidelines → specs → implementation)
- Dependency-mapped components (explicit build order prevents circular dependencies)
- Co-located specifications (component docs live with component assets)

**Recommended folder structure:** Numbered folders enforce build order: 01-foundations → 02-components → 03-patterns → 04-guidelines → 05-examples → 06-assets → 07-documentation-source → tools.

### Critical Pitfalls

Research identified 14 major pitfalls with recovery strategies. Top 5 by severity for Hydrophon's context:

1. **Design-Code Drift (Figma ≠ Implementation)** — Establish design tokens as single source of truth with automated Style Dictionary pipeline from day one. Version numbers must span both Figma and code (v1.2.0 applies to both). Set up CI/CD integration for token transformation.

2. **Building Too Much Too Fast (Scope Creep)** — Start with 8-10 essential components validated against real website needs, not theoretical completeness. Launch in 6-8 weeks, iterate based on agency feedback. Use "if we only had time for 3 components" test.

3. **No Clear Ownership or Governance** — Establish federated model: core team (1-2 at Hydrophon) owns final decisions, agencies contribute proposals, all teams provide feedback. Document contribution process before external launch. Allocate 20-30% ongoing time for maintenance.

4. **Documentation Mismatch (Wrong Audience)** — Create three-tier documentation: Quick Start (visual, no code) for marketing, Design Guidelines (Figma, patterns) for designers/agencies, Technical Reference (specs, tokens) for developers. Test each tier with actual users before launch.

5. **Missing Critical Components (Blocking Development)** — Audit existing website and agency projects FIRST to identify 10-15 components used in 80% of pages. Prioritize by frequency × complexity × inconsistency. Include "boring but essential" components (forms, error states).

**Additional high-risk pitfalls:**
- **Design Tokens Implementation Mess:** Establish semantic naming conventions FIRST (not descriptive like "blue-500"), use automated transformation tools
- **Lack of Organizational Buy-In:** Frame benefits in business terms (speed, cost, control, scale), create pilot project showing ROI
- **Treating System as Complete:** Establish semantic versioning, quarterly reviews, public roadmap from day one

**B2B-specific pitfalls:**
- Applying B2C patterns directly (B2B needs information density, technical accuracy over delight)
- Designing for internal opinions instead of users (validate with agencies before finalizing)
- Misaligned agency prioritization (establish transparent criteria, shared roadmap)

## Implications for Roadmap

Based on combined research, an 8-phase structure emerges from dependencies and risk mitigation:

### Phase 1: Minimal Viable Foundation (Week 1)
**Rationale:** Build only what's needed to start component work—prevents over-engineering foundations while establishing token infrastructure that prevents drift.
**Delivers:** Design tokens (2 brand colors, basic spacing scale, primary typography), logo files in all formats, Figma setup with Variables, Git repository structure
**Addresses:** Design-Code Drift pitfall by establishing tokens as source of truth
**Avoids:** Building Too Much Too Fast by keeping foundation minimal
**Stack elements:** Figma Variables, Style Dictionary setup, Git initialization
**Research needed:** SKIP (well-documented patterns)

### Phase 2: Core Atoms + Documentation Architecture (Week 1-2)
**Rationale:** Build smallest components to validate foundation while establishing documentation structure—real component work reveals missing tokens.
**Delivers:** 5-7 core atoms (buttons, inputs, typography elements, basic icons), three-tier documentation framework (designer/dev/marketing paths)
**Addresses:** Documentation Mismatch pitfall by defining multi-audience structure early
**Uses:** Tokens from Phase 1, atomic design methodology from ARCHITECTURE.md
**Research needed:** SKIP (standard button/input patterns)

### Phase 3: Foundation Expansion (Week 2-3)
**Rationale:** Atom-building reveals which semantic tokens are actually needed—avoids creating unused foundation elements.
**Delivers:** Extended color palette (tints, shades, semantic colors), complete spacing system, typography scale, effects (shadows, borders)
**Addresses:** Design Tokens Implementation Mess by expanding based on real usage
**Implements:** Three-tier token hierarchy from ARCHITECTURE.md
**Research needed:** SKIP (standard foundation patterns)

### Phase 4: Molecules + Form Components (Week 3-4)
**Rationale:** Natural progression from atoms—creates reusable patterns for organisms while addressing B2B need for forms (contact, RFQ).
**Delivers:** Form elements (input groups, validation), card components, navigation items, search patterns
**Addresses:** Missing Critical Components (forms essential for B2B lead generation)
**Uses:** Atoms from Phase 2, foundation tokens from Phase 3
**Research needed:** SKIP (standard form patterns)

### Phase 5: Organisms + Brand Guidelines (Week 4-5)
**Rationale:** Build complex patterns while documenting brand voice and logo rules—demonstrates system cohesion.
**Delivers:** Headers/footers, complex navigation, content blocks, logo usage guidelines, brand voice documentation
**Addresses:** Table stakes from FEATURES.md (logo guidelines, brand foundations)
**Uses:** Molecules from Phase 4
**Research needed:** SKIP (standard organism patterns)

### Phase 6: 3D Visualization + Technical Data Patterns (Week 5-6)
**Rationale:** Hydrophon's unique differentiator—defer until foundations stable since this is complex and domain-specific.
**Delivers:** 3D render guidelines (lighting, materials, backgrounds), CAD asset integration patterns, technical specification templates, comparison table patterns
**Addresses:** B2B manufacturing differentiation, technical data display from FEATURES.md
**Uses:** Foundation elements to define 3D standards
**Research needed:** YES—3D visualization standards, CAD file presentation patterns, B2B spec sheet best practices

### Phase 7: Templates + Examples (Week 6-7)
**Rationale:** Validate system completeness by building realistic page compositions—reveals gaps and integration issues.
**Delivers:** Page layout templates, website component compositions, real-world examples, marketing material templates
**Addresses:** Looks Done But Isn't checklist from PITFALLS.md
**Uses:** All organisms and patterns from previous phases
**Research needed:** SKIP (template patterns well-established)

### Phase 8: PDF Compilation + Packaging (Week 7-8)
**Rationale:** Final deliverable creation—everything must exist before packaging.
**Delivers:** PDF documentation (main system + simplified brand book), asset packages organized by audience, distribution README, version 1.0 release
**Addresses:** Static Documentation Export Architecture from ARCHITECTURE.md
**Uses:** InDesign for PDF compilation, asset packager scripts
**Research needed:** SKIP (PDF generation patterns known)

### Phase Ordering Rationale

**Why this order:**
- **Tokens first (Phase 1):** Foundation for everything, prevents drift if established early
- **Atoms before expansion (Phase 2-3):** Real component work informs what tokens needed, avoids theoretical foundations
- **Forms before complex patterns (Phase 4):** B2B lead generation critical, can't launch website without contact forms
- **3D visualization deferred (Phase 6):** High complexity, needs stable foundation, domain-specific research required
- **PDF last (Phase 8):** Can't compile documentation until all components exist

**Why this grouping:**
- Phases 1-3 establish foundation iteratively (avoids "foundation trap")
- Phases 4-5 build component library (atoms → molecules → organisms)
- Phase 6 adds domain-specific differentiation (3D + technical patterns)
- Phases 7-8 validate and package (templates prove completeness, PDF ships deliverable)

**How this avoids pitfalls:**
- Minimal viable foundation (Phase 1) prevents scope creep
- Multi-audience docs (Phase 2) prevents documentation mismatch
- Token-first approach (Phases 1-3) prevents design-code drift
- Agency validation at each phase prevents building wrong things
- Governance established Phase 2 prevents ownership confusion
- Pilot project (Phases 1-5) enables buy-in demonstration

### Research Flags

**Phases needing deeper research during planning:**
- **Phase 6 (3D Visualization + Technical Data):** Complex domain-specific area. Needs research on 3D render consistency standards, CAD file presentation best practices, B2B technical spec sheet patterns, product comparison UX patterns.

**Phases with standard patterns (skip research-phase):**
- **Phases 1-5, 7-8:** Well-documented design system patterns. Foundation elements, atomic components, PDF generation all have established best practices covered by project research.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | All core recommendations verified with official sources (Style Dictionary 4.0, DTCG 2025.10, Figma 2025, InDesign 2025). Version compatibility confirmed. |
| Features | HIGH | Multiple authoritative 2025-2026 sources agree on table stakes vs differentiators. B2B manufacturing context validated with industry examples. |
| Architecture | HIGH | Based on authoritative sources, established methodologies (Atomic Design), industry-standard practices from 2026. Token hierarchy widely adopted. |
| Pitfalls | HIGH | Synthesized from multiple failure analysis articles, design system postmortems, practitioner experiences. Recovery strategies validated. |

**Overall confidence:** HIGH

All four research areas reached high confidence through triangulation of official documentation, industry standards (W3C DTCG, Atomic Design), and practitioner consensus from 2025-2026 sources. Stack recommendations verified against official docs, feature expectations confirmed by multiple design system references, architecture patterns validated by established methodologies, pitfalls identified through failure analysis.

### Gaps to Address

Minor gaps requiring attention during planning/execution:

- **3D Visualization Standards:** Research covered general approach but specific standards for lighting, materials, camera angles need domain research in Phase 6. Handle by conducting focused research-phase before implementation.

- **Agency-Specific Tooling:** Research assumed standard Figma workflow, but should validate actual agency tech stacks in Phase 2 kickoff. Handle by conducting agency tool audit before finalizing distribution formats.

- **CAD Integration Patterns:** General approach defined but specific file preview/metadata patterns need validation. Handle by researching B2B manufacturing CAD presentation patterns in Phase 6.

- **Print Requirements:** InDesign recommended for PDF but specific print specs (CMYK, bleed, resolution) not detailed. Handle by clarifying print vs digital-only requirements during Phase 1 kickoff.

- **Maintenance Budget:** Research recommends 20-30% ongoing FTE but this needs organizational validation. Handle by securing budget commitment during Phase 0 stakeholder buy-in.

- **CMS Integration:** Research focused on design system, but website CMS compatibility not addressed. Handle by identifying agency CMS platforms early and testing component integration in Phase 4-5.

## Sources

### Primary (HIGH confidence)

**Stack Research:**
- Style Dictionary Official Docs (styledictionary.com) — Version 4.0 features, DTCG support
- Style Dictionary GitHub (github.com/style-dictionary) — Maintenance status, 745 commits
- W3C Design Tokens Community Group — DTCG format 2025.10 stable release October 28, 2025
- Adobe InDesign System Requirements — Version 2025 (v20.0) specifications
- Figma Blog: Schema 2025 Design Systems — Extended Collections, native DTCG export

**Features Research:**
- U.S. Web Design System Components — Authoritative government system
- Carbon Design System (IBM) — Enterprise B2B reference
- Atlassian Design System — Component library patterns
- Material Design 3 — Foundation elements and tokens
- WCAG 2.1/2.2 Accessibility Standards — Legal compliance requirements

**Architecture Research:**
- Atomic Design Methodology (Brad Frost) — Established design system structure
- Building the Ultimate Design System: Architecture Guide for 2026 — Current best practices
- Design Tokens Format Module 2025.10 (W3C DTCG) — Official token specification
- EightShapes: Naming Tokens in Design Systems — Industry-standard naming conventions
- SAP Digital Design System Foundations — Enterprise architecture patterns

**Pitfalls Research:**
- Why Design Systems Fail (Knapsack) — Failure analysis
- 9 Design System Traps to Avoid (Modus Create) — Practitioner warnings
- Design Systems in 2026: Predictions, Pitfalls, and Power Moves — Current landscape
- The Folly of Design System "Foundations" (Dan Mall) — Build order insights
- Design System Governance Models — Organizational patterns

### Secondary (MEDIUM confidence)

- Design Rush: 10 Best Design System Examples for 2026
- UX Cabin: Building Successful Design Systems for B2B Products
- B2B Design and Tech Trends 2026 (OZ Global B2B)
- Design Systems Collective: Figma Variables Best Practices 2025/2026
- UXPin: Design System Documentation Guide
- Backlight: Design System Documentation Best Practices
- Netguru: Frontend Design Patterns That Actually Work in 2026

### Tertiary (context/validation)

- Manufacturing & Industrial Branding Strategies 2025
- American Eagle: B2B Web Design for Manufacturing Best Practices
- Axon Garside: B2B Website Design Trends for 2026
- Brand Guidelines Examples (various B2B companies)
- Design System Management Tools (UXPin, Supernova, Zeroheight feature comparisons)

---
*Research completed: 2026-01-28*
*Ready for roadmap: yes*
