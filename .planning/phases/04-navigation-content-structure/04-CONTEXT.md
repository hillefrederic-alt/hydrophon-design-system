# Phase 4: Navigation & Content Structure - Context

**Gathered:** 2026-01-29
**Status:** Ready for planning

<domain>
## Phase Boundary

This phase delivers website navigation (desktop and mobile patterns), location/hierarchy indicators (breadcrumbs and active states), and content display components (product cards and comparison tables). Users need to navigate between pages, understand their location in the site hierarchy, and browse product information effectively.

Navigation, cards, tables, and responsive layouts are in scope. Forms, feedback components, and icons are separate phases.

</domain>

<decisions>
## Implementation Decisions

### Navigation patterns
- Simple horizontal navigation (no dropdowns) for clean, professional B2B aesthetic
- Mobile: Hamburger menu with left slide-out drawer (standard pattern, full navigation access)
- Claude's Discretion: Logo placement (left-aligned with centered or right-aligned nav)
- Claude's Discretion: Sticky vs scrolling header behavior

### Location indicators
- Breadcrumbs + active navigation state for clear hierarchy understanding
- User sees both breadcrumb trail (Home > Products > Hydrophon) and highlighted current section in nav
- Claude's Discretion: Breadcrumb separator style (chevron, slash, etc.)
- Claude's Discretion: Whether to show breadcrumbs on mobile (space constraints)
- Claude's Discretion: Active state visual treatment (underline, background, border)

### Card layout & density
- Product cards show: Image + Name + Key specs (2-3) + CTA button
- Square (1:1) image aspect ratio for consistency and modern grid layout
- Hover interaction: Card lift + shadow increase for depth effect and clear interactivity
- Claude's Discretion: Grid vs list layout (or switchable) based on browsing patterns

### Table structure
- Striped rows (zebra pattern) for easier scanning and traditional professional appearance
- Claude's Discretion: Mobile responsive strategy (horizontal scroll, stacked cards, or pivot)
- Claude's Discretion: Sortable columns (for spec comparisons)
- Claude's Discretion: Table width behavior (stretch or max-width constraint)

</decisions>

<specifics>
## Specific Ideas

No specific product references mentioned — open to standard B2B web patterns consistent with Hydrophon's modern professional aesthetic established in Phases 1-3.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 04-navigation-content-structure*
*Context gathered: 2026-01-29*
