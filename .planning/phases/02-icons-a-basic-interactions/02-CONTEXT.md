# Phase 2: Icons & Basic Interactions - Context

**Gathered:** 2026-01-28
**Status:** Ready for planning

<domain>
## Phase Boundary

Create a consistent icon system (20-40 icons) and comprehensive button component library that enables users to interact with primary actions across the Hydrophon design system. Covers visual style, base icon set, button variants (primary/secondary/tertiary), sizes, and all interactive states.

</domain>

<decisions>
## Implementation Decisions

### Icon Visual Style
- **Stroke weight:** 2px (balanced) — versatile, readable at most sizes, industry standard
- **Stroke caps and corners:** Claude's discretion based on design system consistency
- **Fill variants:** Claude's discretion — decide between outline-only or outline+filled based on use cases
- **Library approach:** Hybrid — use existing icon library (Phosphor, Lucide, or Heroicons) for common UI icons, create custom icons for product-specific symbols (plumbing fixtures, installation contexts, technical features)

### Icon Set Scope
- **Categories to include:** All four categories required
  - Navigation icons (menu, close, chevrons, arrows)
  - Action icons (download, upload, share, search, filter, edit, delete)
  - Status & feedback (checkmarks, alerts, info, warnings, errors, loading)
  - Product-specific icons (plumbing-related symbols)
- **Product-specific icons:** Claude's discretion — identify key product concepts from documentation (drain systems, installation contexts, technical features, certifications)
- **Icon sizing:** Claude's discretion — choose between fixed size set (16/20/24px) or fluid scaling based on technical approach
- **Base set size:** Comprehensive (~30-40 icons) covering all anticipated use cases

### Button Hierarchy & Variants
- **Primary button style:** Claude's discretion based on Phase 1 color tokens and WCAG accessibility
- **Secondary button style:** Outline — border with brand color, transparent or light background
- **Tertiary button:** Claude's discretion — decide if text-only ghost button is needed for lowest-emphasis actions
- **Button sizes:** Three sizes (Small, Medium, Large)
  - Small for compact UIs
  - Medium as default
  - Large for prominent CTAs and hero sections

### Interactive States
- **Hover intensity:** Claude's discretion — balance professional B2B aesthetic with usability needs
- **Active/pressed effect:** Color change only (no scale transform) — darken background or adjust opacity, traditional approach
- **Focus indicators:** Claude's discretion — ensure WCAG 2.1 AA compliance with appropriate outline or shadow
- **Disabled states:** Claude's discretion — choose between always-muted or contextual (hidden vs visible) based on UX best practices

### Claude's Discretion
- Stroke cap style (rounded vs sharp corners)
- Outline-only vs outline+filled icon variants
- Specific product icons to include
- Icon sizing approach (fixed set vs fluid)
- Primary button fill color
- Whether tertiary/ghost button variant is needed
- Hover state intensity
- Focus indicator style (outline ring vs glow)
- Disabled state treatment (always muted vs contextual)

</decisions>

<specifics>
## Specific Ideas

**Brand context:**
- Modern B2B positioning (not traditional)
- Target audience: Handwerker, Installateure, Großkunden (tradespeople, installers, large customers)
- Professional credibility needed, but not overly industrial

**Technical foundation:**
- Phase 1 established: Hydrophon Blau (#008BD2), spacing tokens (4px base), border radius scale, shadow system
- Design tokens via Style Dictionary already configured
- Inter font family for modern professional feel

**Quality requirements:**
- All components must work across documented breakpoints (sm: 640px, md: 768px, lg: 1024px, xl: 1280px)
- WCAG 2.1 AA compliance mandatory for all interactive states
- German documentation for all components

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope (icon system + button components only).

</deferred>

---

*Phase: 02-icons-a-basic-interactions*
*Context gathered: 2026-01-28*
