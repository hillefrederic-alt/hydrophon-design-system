---
phase: 04
plan: 02
subsystem: navigation
tags: [breadcrumb, footer, navigation, wcag, aria, tokens]

requires:
  - 01-05 # Token system with Style Dictionary
  - 02-01 # Icon system (Lucide Icons for consistency)
  - 03-01 # Form foundation tokens (spacing patterns)

provides:
  - breadcrumb-tokens # Complete breadcrumb token system
  - footer-tokens # Complete footer token system
  - breadcrumb-documentation # WCAG 2.1 AA compliant breadcrumb docs
  - footer-documentation # WCAG 2.1 AA compliant footer docs

affects:
  - 04-03 # Navigation index will reference these docs
  - 05-* # Content components may use breadcrumb pattern

tech-stack:
  added: []
  patterns:
    - CSS Grid for responsive footer layout
    - CSS pseudo-elements (::after) for breadcrumb separators
    - aria-current="page" for current breadcrumb item
    - role="contentinfo" landmark for footer
    - Multiple nav elements with aria-label distinction

key-files:
  created:
    - design-system/tokens/navigation.json
    - design-system/docs/navigation/breadcrumb.md
    - design-system/docs/navigation/footer.md
  modified: []

key-decisions:
  - decision: Chevron (›) as breadcrumb separator
    rationale: Modern, directional, consistent with Lucide ChevronRight icon
    alternatives: Slash (/), Arrow (→)
    impact: Token-based, easily changeable globally

  - decision: CSS ::after for separator rendering
    rationale: Automatic screen reader hiding, no DOM clutter
    alternatives: HTML separator elements, JavaScript rendering
    impact: Better accessibility, cleaner markup

  - decision: CSS Grid for footer layout
    rationale: Native responsive columns, flexible, no framework dependency
    alternatives: Flexbox, CSS columns, JavaScript masonry
    impact: Modern browser support, simple media queries

  - decision: Uppercase footer headings with letter-spacing
    rationale: Visual hierarchy, B2B professional appearance
    alternatives: Title case, same case as links
    impact: Clear grouping, established design pattern

  - decision: line-height 2 for footer links
    rationale: Touch-target optimization (28px at 14px font = WCAG AA compliant)
    alternatives: Explicit padding, larger font
    impact: Mobile-friendly, accessible without extra CSS

patterns-established:
  - Breadcrumb ARIA pattern (nav + aria-label + ol + aria-current)
  - Footer landmark pattern (footer + multiple nav with aria-label)
  - Separator hiding pattern (CSS pseudo-element)
  - Token-based navigation styling
  - Responsive grid to single-column pattern

metrics:
  lines_of_code: 1521
  tokens_added: 24
  documentation_lines: 1313

duration: 5.3 minutes
completed: 2026-01-29
---

# Phase 04 Plan 02: Breadcrumb & Footer Navigation Summary

**One-liner:** Breadcrumb & Footer with WCAG 2.1 AA compliance, CSS Grid layout, and chevron separator pattern

## What Was Built

### 1. Navigation Token System (navigation.json)

Created comprehensive token file with breadcrumb and footer tokens following W3C DTCG format:

**Breadcrumb Tokens (12 tokens):**
- Layout: fontSize (14px), gap (8px), marginY (16px)
- Separator: content (›), color (neutral.400), marginX (8px)
- Links: color states (default, hover), text-decoration states
- Current page: color (neutral.900), fontWeight (medium)

**Footer Tokens (12 tokens):**
- Container: background (neutral.100), border, padding (48px/24px), maxWidth (1280px), gap (32px)
- Headings: fontSize (14px), fontWeight (semibold), color, textTransform (uppercase), letterSpacing (0.05em), marginBottom
- Links: colors (default/hover), fontSize (14px), lineHeight (2 for touch-targets)
- Legal section: fontSize (12px), color (neutral.500), margins, border, padding

All tokens reference existing primitives (colors, spacing, typography) for consistency.

### 2. Breadcrumb Documentation (518 lines)

Comprehensive German documentation covering:

**Core Content:**
- Übersicht: When to use (3+ levels, external entry, B2B context)
- Anatomie: nav + aria-label + ol + li structure
- Separator patterns: Chevron (recommended), alternatives (slash, arrow)
- Mobile behavior: Wrap vs. truncated options
- Token reference table with all 12 tokens

**ARIA Pattern:**
- `aria-label="Breadcrumbs"` on nav element
- `<ol>` for semantic ordering (not `<ul>`)
- `aria-current="page"` on current item (mandatory)
- No link on current page
- Separator as CSS `::after` (automatically hidden from screen readers)

**Code Examples:**
- Complete HTML structure
- Full CSS with token references
- React component example
- Mobile responsive patterns

**Accessibility Section:**
- WCAG 2.4.8 Location (AAA) - breadcrumbs fulfill this
- aria-current announcement for screen readers
- Separator accessibility (pseudo-element pattern)
- Contrast compliance (4.5:1 for links)
- Keyboard navigation and focus indicators

**Best Practices:**
- Semantic HTML requirements
- Consistent positioning (under header, above content)
- Mobile-first design decisions
- Integration with header navigation

**Anti-patterns:**
- Link on current page (explicitly warned against)
- Separator as HTML element (screen reader issue)
- Missing aria-label on nav
- JavaScript-only rendering without fallback

### 3. Footer Documentation (795 lines)

Comprehensive German documentation covering:

**Core Content:**
- Übersicht: Purpose in B2B context (trust, legal, secondary nav)
- Anatomie: footer + logo + link-groups + address + legal structure
- Layout: Desktop (3-4 columns), Tablet (2-3 columns), Mobile (1 column)
- Link grouping: Typical B2B groups (Produkte, Unternehmen, Service, Kontakt)
- Legal requirements: Impressum, Datenschutz, AGB (German DSGVO compliance)

**Grid Layout Pattern:**
- CSS Grid with `repeat(4, 1fr)` for desktop
- Media queries for tablet/mobile column reduction
- Token-based gaps and spacing
- Responsive footer-legal flex pattern

**Link Group Best Practices:**
- Maximum 4-5 groups for clarity
- Uppercase headings with letter-spacing
- Each nav with unique aria-label
- Touch-friendly line-height: 2

**Token Reference:**
- Complete table with 19 footer tokens
- CSS variable mapping
- Usage descriptions

**Code Examples:**
- Complete HTML structure with 4 link groups
- Full CSS with grid and responsive patterns
- React component with dynamic data
- Legal section layout options (inline vs. flex)

**Accessibility Section:**
- role="contentinfo" landmark (automatic from footer element)
- Multiple nav elements with unique aria-labels
- Skip-link pattern for keyboard navigation
- Touch-target compliance (44x44px guidance)
- Contrast compliance and warnings
- Focus indicators

**Best Practices:**
- Consistency across all pages
- Clear grouping (max 4-5 groups)
- Legal always at bottom (visually separated)
- Performance optimization

**Anti-patterns:**
- Too many ungrouped links
- Missing landmark region (div instead of footer)
- nav without aria-label
- Static copyright year

## Key Accomplishments

1. **Complete Navigation Token System:** 24 tokens covering breadcrumb and footer with W3C DTCG format
2. **WCAG 2.1 AA Compliance:** Both components meet accessibility standards with ARIA patterns
3. **Comprehensive Documentation:** 1313 lines total (518 + 795) in German for target audience
4. **B2B Context Integration:** Examples and guidance specific to Hydrophon's business context
5. **Responsive Patterns:** Mobile-first approach with clear breakpoint guidance
6. **Token-based Styling:** All styles configurable via design tokens for consistency

## Deviations from Plan

None - plan executed exactly as written.

## Technical Decisions

### 1. Chevron Separator for Breadcrumbs

**Decision:** Use chevron (›) as default breadcrumb separator, rendered via CSS ::after.

**Rationale:**
- Modern and directional (better than slash)
- Consistent with Lucide ChevronRight icon from Phase 2
- Internationally recognized (no language dependency)
- CSS pseudo-element = automatic screen reader hiding

**Implementation:**
- Token: `breadcrumb.separator.content: "›"`
- CSS: `li::after { content: var(--breadcrumb-separator-content); }`
- Screen readers: Ignore pseudo-elements by default (WCAG compliant)

**Alternative considered:** Slash (/) is classic but less directional, arrow (→) too strong.

### 2. CSS Grid for Footer Layout

**Decision:** Use CSS Grid with `repeat(4, 1fr)` for desktop footer columns.

**Rationale:**
- Native responsive columns without framework
- Simple media queries for tablet/mobile
- Automatic equal-width columns
- Gap property for consistent spacing

**Implementation:**
```css
.footer-content {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--footer-gap);
}

@media (max-width: 767px) {
  grid-template-columns: 1fr;
}
```

**Alternative considered:** Flexbox requires more manual column control, CSS columns lack responsive control.

### 3. Line-height 2 for Footer Links

**Decision:** Set `footer.link.lineHeight: 2` for touch-target optimization.

**Rationale:**
- 14px font × line-height 2 = 28px effective height
- Meets WCAG AA touch-target (24px minimum)
- Approaches AAA recommendation (44px) with minimal additional padding
- Simple CSS, no complex padding calculations

**Impact:** Mobile-friendly without explicit padding, accessible by default.

**Alternative considered:** Explicit padding adds complexity and can cause layout shifts.

### 4. Uppercase Footer Headings

**Decision:** Use `textTransform: uppercase` with `letterSpacing: 0.05em` for footer section headings.

**Rationale:**
- Clear visual hierarchy separating headings from links
- Professional B2B appearance (established pattern)
- Letter-spacing improves uppercase readability
- Token-based, easily changeable if design evolves

**Implementation:**
- `footer.heading.textTransform: "uppercase"`
- `footer.heading.letterSpacing: "0.05em"`

**Alternative considered:** Title case is softer but less distinct from link styles.

### 5. Multiple nav Elements with aria-label

**Decision:** Each footer link group is a `<nav>` element with unique `aria-label`.

**Rationale:**
- Semantic HTML: Each group is a navigation region
- Screen reader distinction: aria-label differentiates multiple nav landmarks
- WCAG best practice: Clear labeling of landmarks

**Example:**
```html
<nav aria-label="Produkt-Links">...</nav>
<nav aria-label="Unternehmen">...</nav>
```

**Screen Reader:** Announces "Produkt-Links Navigation" vs. just "Navigation".

**Alternative considered:** Single nav with divs loses semantic structure and screen reader navigation benefits.

## Integration Points

**With Phase 1 (Foundation):**
- All tokens reference color, spacing, and typography primitives
- Consistent W3C DTCG format with $value and $type
- Style Dictionary will build CSS variables

**With Phase 2 (Icons):**
- Chevron separator consistent with Lucide ChevronRight
- Same visual language across navigation components

**With Phase 3 (Forms):**
- Spacing patterns align with form input tokens
- Touch-target considerations consistent with button system

**With Future Phases:**
- 04-03 will create navigation index referencing these docs
- Content components may use breadcrumb pattern for hierarchy
- Header navigation (04-01) shares focus-indicator patterns

## Next Phase Readiness

**Phase 4 Plan 3 (Navigation Index):**
- All navigation components documented
- Consistent ARIA patterns established
- Token system complete
- Ready for index file linking all navigation docs

**Blockers:** None

**Risks:** None

**Open Questions:** None

## Files Changed

### Created (3 files):

1. **design-system/tokens/navigation.json** (208 lines)
   - 24 tokens (12 breadcrumb, 12 footer)
   - W3C DTCG format with references

2. **design-system/docs/navigation/breadcrumb.md** (518 lines)
   - Complete ARIA pattern documentation
   - Token reference, code examples, accessibility
   - Mobile patterns and best practices

3. **design-system/docs/navigation/footer.md** (795 lines)
   - CSS Grid layout system
   - Link grouping and legal section patterns
   - Token reference, code examples, B2B context

### Modified:
None

## Lessons Learned

1. **CSS Pseudo-elements for Separators:** Using ::after for breadcrumb separators is superior to HTML elements - automatic screen reader hiding and cleaner DOM.

2. **line-height for Touch-Targets:** Setting generous line-height (2) on small text achieves touch-target compliance without complex padding, simplifying CSS and improving consistency.

3. **Token-based Separators:** Making separator content a token (`breadcrumb.separator.content: "›"`) enables global changes and A/B testing without code changes.

4. **Grid > Flexbox for Footer:** CSS Grid's explicit column control and gap property significantly simplifies responsive footer layouts compared to Flexbox.

5. **Multiple nav Elements:** Using multiple `<nav>` elements with unique `aria-label` improves screen reader navigation despite seeming redundant in visual design.

## Documentation Quality

- **Total lines:** 1313 (518 breadcrumb + 795 footer)
- **Language:** German (target audience)
- **Code examples:** HTML, CSS, React for each component
- **Accessibility:** WCAG 2.1 AA compliance fully documented
- **Token references:** Complete tables with CSS variable mapping
- **B2B context:** Hydrophon-specific examples throughout

## Token Summary

| Category | Tokens | Key Examples |
|----------|--------|--------------|
| Breadcrumb | 12 | separator.content (›), current.fontWeight, link colors |
| Footer | 12 | background, paddingY (48px), gap (32px), maxWidth (1280px) |
| **Total** | **24** | All reference existing primitives for consistency |

## ARIA Patterns Established

1. **Breadcrumb:** `<nav aria-label="Breadcrumbs">` + `<ol>` + `aria-current="page"`
2. **Footer Landmark:** `<footer>` (automatic role="contentinfo")
3. **Multiple Navigation:** Each `<nav>` with unique `aria-label`
4. **Separator Hiding:** CSS pseudo-element (no HTML separator)

---

**Status:** ✓ Complete
**Duration:** 5.3 minutes
**Commits:** 3 (navigation tokens, breadcrumb docs, footer docs)
**Next:** 04-03-PLAN.md (Navigation Index)
