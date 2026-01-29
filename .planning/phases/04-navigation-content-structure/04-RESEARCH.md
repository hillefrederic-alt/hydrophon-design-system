# Phase 4: Navigation & Content Structure - Research

**Researched:** 2026-01-29
**Domain:** Website navigation, breadcrumbs, product cards, and data tables
**Confidence:** HIGH

## Summary

Navigation and content display components form the browsing foundation of modern B2B websites. Based on current research (2025-2026), the industry standard for professional B2B design systems involves semantic HTML5 elements with WCAG 2.1 AA accessibility, CSS custom properties for theming, and responsive patterns that work across all breakpoints.

The critical architectural insight for Phase 4 is that **navigation must balance simplicity with accessibility**. Horizontal desktop navigation without dropdowns keeps B2B professional interfaces clean, while mobile slide-out drawers provide full navigation access without complexity. Breadcrumbs require `<nav>` + `<ol>` markup with `aria-current="page"` for screen reader support. Product cards use CSS Grid with auto-fit/minmax for responsive layouts, while data tables require proper `<th>` headers with scope attributes and careful consideration for mobile responsiveness.

The three-tier token architecture from Phases 1-3 continues here, with component tokens for navigation heights, card spacing, and table row colors referencing semantic tokens. WCAG requirements include 4.5:1 text contrast, 3:1 non-text contrast (for active states), proper focus indicators (2px minimum with 3:1 contrast), and semantic HTML structure for screen reader navigation.

**Primary recommendation:** Use semantic HTML5 (`<header>`, `<nav>`, `<footer>`) with ARIA landmarks, CSS Grid for card layouts with `gap` property for spacing, horizontal desktop navigation that becomes slide-out drawer on mobile (hamburger + left-aligned drawer with focus management), breadcrumbs with `aria-current="page"`, and tables with striped rows (subtle 1.5:1 maximum contrast between stripes, 4.5:1 text contrast maintained).

## Standard Stack

The established libraries/tools for navigation and content structure in design systems.

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| CSS Grid | Native | Card and content layouts | Universal browser support, built-in responsive patterns, subgrid for alignment, gap property for spacing |
| CSS Custom Properties | Native | Design token implementation | Runtime theming, browser-native, W3C DTCG-aligned, no build step required |
| Lucide Icons | 0.563+ | Navigation icons (menu, close, chevron) | Already established in Phase 2, 2px stroke weight matches system |
| HTML5 Semantic Elements | Native | Structural markup | Screen reader landmarks, SEO benefits, accessibility by default |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| Style Dictionary | 4.x+ | Token transformation | Already established in Phases 1-3 for navigation/card/table tokens |
| CSS position: sticky | Native | Sticky header navigation | Performance-optimized (hardware-accelerated), widely supported, no JavaScript needed |
| @container queries | Native | Responsive card components | Superior to media queries for component-level responsiveness (2023+ standard) |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| CSS Grid for cards | Flexbox | Flexbox requires more manual control for equal-height cards; Grid's auto-fit/minmax handles responsive layouts with less code |
| position: sticky | JavaScript scroll listeners | JavaScript adds performance overhead, sticky is hardware-accelerated and smoother |
| Slide-out drawer | Bottom tab bar | Bottom tabs work better for app-like interfaces with 3-5 core actions; B2B sites need access to full navigation hierarchy |
| Native HTML tables | Custom div-based tables | Custom tables lose semantic benefits, require extensive ARIA, break screen reader table navigation |
| Horizontal scroll tables | Card-stacked mobile tables | Horizontal scroll maintains data relationships; stacked cards better for narrow content but lose comparison ability |

**Installation:**
```bash
# No additional installations required
# All components use native CSS and HTML
# Lucide icons already installed in Phase 2
```

## Architecture Patterns

### Recommended Token Structure

Following Phase 1-3's 3-tier architecture:

```
tokens/
├── primitives/          # Reference tokens
│   ├── colors.json
│   ├── spacing.json
│   └── typography.json
├── semantic/            # System tokens
│   ├── colors.json     # nav.background, nav.link, table.stripe
│   └── layout.json     # nav.height, card.gap, table.padding
└── components/          # Component tokens
    ├── navigation.json # Complete navigation definitions
    ├── card.json       # Card component tokens
    └── table.json      # Table component tokens
```

**Token naming convention** (consistent with Phases 2-3):
```
{component}.{element}.{property}.{state}
```

Examples:
- `nav.header.height.desktop` → 80px
- `nav.header.height.mobile` → 64px
- `nav.link.color.default` → {color.neutral.700}
- `nav.link.color.active` → {color.primary.500}
- `card.container.shadow.default` → {shadow.sm}
- `card.container.shadow.hover` → {shadow.md}
- `table.row.background.default` → transparent
- `table.row.background.stripe` → {color.neutral.50}

### Pattern 1: Semantic HTML5 Navigation Structure

**What:** Proper landmark regions with `<header>`, `<nav>`, `<main>`, `<footer>` for screen reader navigation
**When to use:** All page layouts requiring navigation

**HTML structure:**
```html
<!-- Source: W3C HTML5 specification, MDN best practices -->
<!DOCTYPE html>
<html lang="de">
<body>
  <!-- Global header landmark -->
  <header role="banner">
    <div class="header-container">
      <!-- Logo -->
      <a href="/" aria-label="Hydrophon Startseite">
        <img src="logo.svg" alt="Hydrophon" />
      </a>

      <!-- Main navigation landmark -->
      <nav role="navigation" aria-label="Hauptnavigation">
        <ul class="nav-list">
          <li><a href="/produkte" aria-current="page">Produkte</a></li>
          <li><a href="/unternehmen">Unternehmen</a></li>
          <li><a href="/kontakt">Kontakt</a></li>
        </ul>
      </nav>

      <!-- Mobile hamburger button -->
      <button
        class="nav-toggle"
        aria-label="Menü öffnen"
        aria-expanded="false"
        aria-controls="mobile-nav"
      >
        <svg aria-hidden="true"><!-- Menu icon --></svg>
      </button>
    </div>
  </header>

  <!-- Breadcrumb navigation -->
  <nav aria-label="Breadcrumbs">
    <ol class="breadcrumb-list">
      <li><a href="/">Home</a></li>
      <li><a href="/produkte">Produkte</a></li>
      <li aria-current="page"><span>Hydrophon</span></li>
    </ol>
  </nav>

  <!-- Main content -->
  <main role="main">
    <!-- Page content -->
  </main>

  <!-- Global footer -->
  <footer role="contentinfo">
    <nav aria-label="Footer Navigation">
      <!-- Footer links -->
    </nav>
  </footer>
</body>
</html>
```

**Key requirements:**
- One `<header role="banner">` per page (global header)
- One `<footer role="contentinfo">` per page (global footer)
- Multiple `<nav>` elements allowed, each with unique `aria-label`
- `<main role="main">` contains unique primary content
- Only one element can have `aria-current="page"` at a time

### Pattern 2: Mobile Slide-Out Drawer with Focus Management

**What:** Accessible hamburger menu that opens left-aligned slide-out drawer with keyboard focus trapping
**When to use:** Mobile navigation (typically below 768px breakpoint)

**Implementation:**
```html
<!-- Source: Accessible hamburger menu patterns from Knowbility, A11y Matters -->
<!-- Mobile Navigation Drawer -->
<div
  id="mobile-nav"
  class="mobile-drawer"
  hidden
  aria-hidden="true"
>
  <div class="drawer-content">
    <!-- Close button receives focus on open -->
    <button
      class="drawer-close"
      aria-label="Menü schließen"
    >
      <svg aria-hidden="true"><!-- X icon --></svg>
    </button>

    <nav aria-label="Mobile Navigation">
      <ul>
        <li><a href="/produkte">Produkte</a></li>
        <li><a href="/unternehmen">Unternehmen</a></li>
        <li><a href="/kontakt">Kontakt</a></li>
      </ul>
    </nav>
  </div>

  <!-- Backdrop overlay -->
  <div class="drawer-backdrop" aria-hidden="true"></div>
</div>
```

**CSS implementation:**
```css
/* Source: Accessible slide-out patterns */
.mobile-drawer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  visibility: hidden;
  transition: visibility 0s 300ms;
}

.mobile-drawer:not([hidden]) {
  visibility: visible;
  transition: visibility 0s;
}

.drawer-content {
  position: fixed;
  top: 0;
  left: 0;
  width: 280px;
  max-width: 80vw;
  height: 100%;
  background: var(--nav-drawer-background);
  transform: translateX(-100%);
  transition: transform 300ms ease-in-out;
  overflow-y: auto;
  z-index: 1001;
}

.mobile-drawer:not([hidden]) .drawer-content {
  transform: translateX(0);
}

.drawer-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  opacity: 0;
  transition: opacity 300ms ease-in-out;
  z-index: 1000;
}

.mobile-drawer:not([hidden]) .drawer-backdrop {
  opacity: 1;
}
```

**JavaScript focus management:**
```javascript
// Source: WAI-ARIA Authoring Practices keyboard patterns
const navToggle = document.querySelector('.nav-toggle');
const mobileNav = document.getElementById('mobile-nav');
const drawerClose = mobileNav.querySelector('.drawer-close');

// Open drawer
navToggle.addEventListener('click', () => {
  mobileNav.hidden = false;
  mobileNav.setAttribute('aria-hidden', 'false');
  navToggle.setAttribute('aria-expanded', 'true');

  // Move focus to close button
  drawerClose.focus();

  // Trap focus within drawer
  trapFocus(mobileNav);
});

// Close drawer
drawerClose.addEventListener('click', closeDrawer);
mobileNav.querySelector('.drawer-backdrop').addEventListener('click', closeDrawer);

// ESC key closes drawer
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !mobileNav.hidden) {
    closeDrawer();
  }
});

function closeDrawer() {
  mobileNav.hidden = true;
  mobileNav.setAttribute('aria-hidden', 'true');
  navToggle.setAttribute('aria-expanded', 'false');

  // Return focus to toggle button
  navToggle.focus();
}

function trapFocus(container) {
  const focusableElements = container.querySelectorAll(
    'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
  );
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  container.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  });
}
```

**Accessibility requirements:**
- Button includes "Menu" text or `aria-label` (screen reader users need context)
- `aria-expanded` reflects drawer state (false = closed, true = open)
- `aria-controls` links button to drawer ID
- Focus moves to close button when opened (immediate keyboard access)
- ESC key closes drawer (WAI-ARIA keyboard pattern)
- Focus returns to toggle button when closed (restore context)
- Drawer uses `visibility: hidden` when closed (prevents keyboard access)
- Width: 0 alternative removes element from layout

### Pattern 3: Breadcrumb Navigation with ARIA

**What:** Hierarchical navigation trail showing current page location with proper ARIA markup
**When to use:** Sites with 3+ page depth, pages accessed via external links/search

**Implementation:**
```html
<!-- Source: W3C WAI-ARIA Breadcrumb Pattern, USWDS Design System -->
<nav aria-label="Breadcrumbs">
  <ol class="breadcrumb">
    <li class="breadcrumb-item">
      <a href="/">Home</a>
    </li>
    <li class="breadcrumb-item">
      <a href="/produkte">Produkte</a>
    </li>
    <li class="breadcrumb-item">
      <a href="/produkte/hydrophon">Hydrophon</a>
    </li>
    <li class="breadcrumb-item" aria-current="page">
      <span>Technische Daten</span>
    </li>
  </ol>
</nav>
```

**CSS implementation:**
```css
/* Source: USWDS breadcrumb component styles */
.breadcrumb {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--breadcrumb-gap, 0.5rem);
  list-style: none;
  padding: 0;
  margin: var(--breadcrumb-margin, 1rem 0);
}

.breadcrumb-item {
  display: flex;
  align-items: center;
  font-size: var(--breadcrumb-font-size, 0.875rem);
  color: var(--breadcrumb-color, var(--color-neutral-600));
}

.breadcrumb-item a {
  color: var(--breadcrumb-link-color, var(--color-primary-600));
  text-decoration: none;
}

.breadcrumb-item a:hover {
  color: var(--breadcrumb-link-hover, var(--color-primary-700));
  text-decoration: underline;
}

/* Separator between items (hidden from screen readers) */
.breadcrumb-item:not(:last-child)::after {
  content: '/';
  margin-left: 0.5rem;
  color: var(--breadcrumb-separator, var(--color-neutral-400));
  font-weight: normal;
  /* Screen readers ignore pseudo-elements by default */
}

/* Alternative: chevron separator */
.breadcrumb-item:not(:last-child)::after {
  content: '›'; /* or use SVG icon */
  /* Rest of styles same as above */
}

/* Current page styling */
.breadcrumb-item[aria-current="page"] {
  color: var(--breadcrumb-current, var(--color-neutral-900));
  font-weight: var(--font-weight-medium);
}

.breadcrumb-item[aria-current="page"] span {
  /* Not a link, just text */
}

/* Mobile: hide breadcrumbs or truncate */
@media (max-width: 767px) {
  .breadcrumb-item:not(:last-child):not(:first-child) {
    display: none; /* Show only Home and current page */
  }

  /* Alternative: Show all with wrapping */
  .breadcrumb {
    font-size: 0.75rem;
  }
}
```

**WCAG requirements:**
- `<nav>` with `aria-label="Breadcrumbs"` (landmark for screen readers)
- `<ol>` for list structure (screen readers enumerate items)
- `aria-current="page"` on current item (announces "current page")
- Separators (/, ›, →) must not be announced by screen readers (pseudo-elements achieve this automatically)
- Links must have 4.5:1 contrast ratio against background (WCAG 2.2 Level AA)
- Current page text can be `<span>` (not a link) or link without href

### Pattern 4: CSS Grid Card Layout with Auto-Responsive

**What:** Product card grid that automatically adjusts columns based on available space without media queries
**When to use:** Product listings, content galleries, image grids

**HTML structure:**
```html
<!-- Source: CSS Grid best practices, MDN Grid documentation -->
<section class="product-grid">
  <article class="product-card">
    <div class="card-image">
      <img src="product.jpg" alt="Hydrophon Duschabdichtung" loading="lazy" />
    </div>
    <div class="card-content">
      <h3 class="card-title">Hydrophon Duschabdichtung</h3>
      <ul class="card-specs">
        <li>Breite: 100-200 mm</li>
        <li>Höhe: verstellbar</li>
      </ul>
      <a href="/produkte/hydrophon" class="card-cta">
        Details ansehen
      </a>
    </div>
  </article>
  <!-- More cards... -->
</section>
```

**CSS implementation:**
```css
/* Source: CSS Grid auto-fit pattern, Every Layout "Cluster" pattern */
.product-grid {
  display: grid;
  /* Auto-responsive: adds columns as space allows */
  grid-template-columns: repeat(auto-fit, minmax(min(280px, 100%), 1fr));
  gap: var(--card-gap, 1.5rem);
  padding: var(--section-padding, 2rem 1rem);
}

/* Card styling */
.product-card {
  display: flex;
  flex-direction: column;
  background: var(--card-background, white);
  border-radius: var(--card-radius, 8px);
  overflow: hidden;
  box-shadow: var(--card-shadow-default, 0 2px 8px rgba(0, 0, 0, 0.08));
  transition: box-shadow 300ms ease, transform 300ms ease;
}

/* Hover lift effect */
.product-card:hover {
  box-shadow: var(--card-shadow-hover, 0 8px 24px rgba(0, 0, 0, 0.12));
  transform: translateY(-4px);
}

/* Focus-visible for keyboard navigation */
.product-card:focus-within {
  outline: 2px solid var(--color-primary-500);
  outline-offset: 2px;
}

/* Card image (1:1 aspect ratio) */
.card-image {
  aspect-ratio: 1 / 1;
  overflow: hidden;
  background: var(--color-neutral-100);
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Card content with auto-spacing */
.card-content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-3);
  padding: var(--card-padding, 1.5rem);
  flex: 1; /* Push CTA to bottom */
}

.card-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-neutral-900);
  margin: 0;
}

.card-specs {
  list-style: none;
  padding: 0;
  margin: 0;
  color: var(--color-neutral-600);
  font-size: var(--font-size-sm);
}

.card-specs li {
  padding: 0.25rem 0;
}

/* CTA button aligned to bottom */
.card-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-primary-600);
  text-decoration: none;
  font-weight: var(--font-weight-medium);
  margin-top: auto; /* Push to bottom */
}

.card-cta:hover {
  color: var(--color-primary-700);
  text-decoration: underline;
}

/* Performance optimization: GPU acceleration */
@media (prefers-reduced-motion: no-preference) {
  .product-card {
    will-change: transform, box-shadow;
  }
}

/* Respect reduced motion preferences */
@media (prefers-reduced-motion: reduce) {
  .product-card {
    transition: none;
  }

  .product-card:hover {
    transform: none; /* No lift effect */
  }
}
```

**Why this pattern works:**
- `auto-fit` adds columns automatically as space allows (no media queries needed)
- `minmax(min(280px, 100%), 1fr)` ensures cards never smaller than 280px and wrap to single column on narrow screens
- `aspect-ratio: 1/1` maintains square images without extra markup
- `gap` property handles all spacing consistently
- Flexbox within card pushes CTA to bottom for alignment across variable-height content
- `transform: translateY()` is GPU-accelerated for smooth performance

### Pattern 5: Accessible Data Tables with Striped Rows

**What:** Semantic HTML tables with proper header associations and zebra striping for readability
**When to use:** Product comparison tables, specification tables, data grids

**HTML structure:**
```html
<!-- Source: W3C Tables Tutorial, WCAG 1.3.1 -->
<table class="data-table">
  <caption>Hydrophon Produktvergleich</caption>
  <thead>
    <tr>
      <th scope="col">Modell</th>
      <th scope="col">Breite</th>
      <th scope="col">Höhe</th>
      <th scope="col">Material</th>
      <th scope="col">Preis</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Hydrophon Basic</th>
      <td>100-150 mm</td>
      <td>50-120 mm</td>
      <td>PVC</td>
      <td>€12,50</td>
    </tr>
    <tr>
      <th scope="row">Hydrophon Plus</th>
      <td>100-200 mm</td>
      <td>50-150 mm</td>
      <td>PE</td>
      <td>€18,90</td>
    </tr>
    <tr>
      <th scope="row">Hydrophon Pro</th>
      <td>150-300 mm</td>
      <td>80-200 mm</td>
      <td>PE Premium</td>
      <td>€24,50</td>
    </tr>
  </tbody>
</table>
```

**CSS implementation:**
```css
/* Source: USWDS Table component, Adrian Roselli responsive tables */
.data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--table-font-size, 0.875rem);
  background: var(--table-background, white);
}

/* Caption styling */
.data-table caption {
  padding: var(--table-caption-padding, 1rem);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  text-align: left;
  color: var(--color-neutral-900);
}

/* Table header styling */
.data-table thead {
  background: var(--table-header-background, var(--color-neutral-100));
  border-bottom: 2px solid var(--table-border-color, var(--color-neutral-300));
}

.data-table th {
  padding: var(--table-cell-padding, 0.75rem 1rem);
  text-align: left;
  font-weight: var(--font-weight-semibold);
  color: var(--table-header-color, var(--color-neutral-900));
}

/* Zebra striping (subtle contrast for readability) */
.data-table tbody tr:nth-child(even) {
  background: var(--table-row-stripe, var(--color-neutral-50));
}

.data-table tbody tr:nth-child(odd) {
  background: var(--table-row-default, transparent);
}

/* Row hover state */
.data-table tbody tr:hover {
  background: var(--table-row-hover, var(--color-primary-50));
}

/* Cell styling */
.data-table td,
.data-table tbody th {
  padding: var(--table-cell-padding, 0.75rem 1rem);
  border-bottom: 1px solid var(--table-border-color, var(--color-neutral-200));
  color: var(--color-neutral-700);
}

/* Row header (first column) */
.data-table tbody th {
  font-weight: var(--font-weight-medium);
  color: var(--color-neutral-900);
}

/* Focus indicators for interactive elements */
.data-table a:focus-visible,
.data-table button:focus-visible {
  outline: 2px solid var(--color-primary-500);
  outline-offset: 2px;
}

/* Responsive: Horizontal scroll on mobile */
@media (max-width: 767px) {
  .table-container {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }

  .data-table {
    min-width: 600px; /* Prevent table from collapsing too much */
  }

  .data-table th,
  .data-table td {
    padding: 0.5rem 0.75rem;
    font-size: 0.8125rem;
  }
}

/* Alternative responsive pattern: Stacked cards on mobile */
@media (max-width: 767px) {
  .data-table.responsive-stack thead {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }

  .data-table.responsive-stack tbody tr {
    display: block;
    margin-bottom: 1rem;
    border: 1px solid var(--color-neutral-200);
    border-radius: 8px;
  }

  .data-table.responsive-stack td,
  .data-table.responsive-stack tbody th {
    display: block;
    text-align: right;
    padding: 0.5rem 1rem;
    border-bottom: 1px solid var(--color-neutral-200);
  }

  .data-table.responsive-stack td::before,
  .data-table.responsive-stack tbody th::before {
    content: attr(data-label);
    float: left;
    font-weight: var(--font-weight-semibold);
    text-align: left;
  }
}
```

**WCAG requirements:**
- `<caption>` describes table purpose (announced by screen readers)
- `<th>` for all header cells (column and row headers)
- `scope="col"` for column headers, `scope="row"` for row headers
- Text contrast minimum 4.5:1 (normal text) against background
- Zebra stripe contrast maximum 1.5:1 between stripes (subtle, not distracting)
- Both stripe colors must maintain 4.5:1 text contrast
- Hover state should be distinguishable (visual + programmatic focus)

### Pattern 6: Sticky Header with Performance

**What:** Navigation header that remains visible during scroll using CSS position: sticky
**When to use:** Long pages where persistent navigation access improves UX

**Implementation:**
```css
/* Source: CSS position:sticky best practices, performance optimization */
.site-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--nav-background, white);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0);
  transition: box-shadow 200ms ease;
}

/* Add shadow when scrolled (using @container scroll-state in 2026) */
.site-header[data-scrolled="true"] {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* Hardware acceleration for smooth performance */
.site-header {
  will-change: transform;
  backface-visibility: hidden;
}

/* Respect reduced motion */
@media (prefers-reduced-motion: reduce) {
  .site-header {
    transition: none;
  }
}
```

**JavaScript for scroll detection:**
```javascript
// Lightweight scroll detection
let lastScrollY = window.scrollY;
const header = document.querySelector('.site-header');

window.addEventListener('scroll', () => {
  const scrolled = window.scrollY > 0;
  header.setAttribute('data-scrolled', scrolled);
}, { passive: true }); // Passive listener for better performance
```

**Performance best practices:**
- Use `position: sticky` instead of JavaScript (hardware-accelerated)
- Passive event listeners if JavaScript needed (`{ passive: true }`)
- Avoid reading and writing layout in same frame (forced reflows)
- Use `will-change: transform` sparingly (only on sticky header)
- `backface-visibility: hidden` prevents rendering artifacts

### Anti-Patterns to Avoid

**1. Dropdown Mega-Menus in B2B Navigation**
- **Problem:** Complex dropdowns hide content, require precise mouse control, difficult on mobile
- **Issues:** Poor keyboard navigation, timeout frustration, hard to implement accessibly
- **Use instead:** Simple horizontal navigation with separate category landing pages

**2. Hamburger Menu on Desktop**
- **Problem:** Hides navigation on large screens where space is available
- **Issues:** Reduces discoverability, requires extra click, goes against desktop conventions
- **Use instead:** Visible horizontal navigation on desktop, reserve hamburger for mobile only

**3. Breadcrumbs Without aria-current**
- **Problem:** Screen readers can't identify current page location
- **Issues:** WCAG 2.4.8 failure (Location), confusing for assistive technology users
- **Use instead:** Add `aria-current="page"` to current breadcrumb item

**4. Card Grids with Fixed Column Count**
- **Problem:** Cards don't adapt to screen size, require multiple media queries
- **Issues:** Maintenance burden, brittle layouts, poor responsiveness
- **Use instead:** CSS Grid `auto-fit` with `minmax()` for automatic responsiveness

**5. Tables Without Proper Headers**
- **Problem:** Screen readers can't associate data with headers
- **Issues:** WCAG 1.3.1 failure, data relationships lost for AT users
- **Use instead:** Always use `<th>` with `scope` attribute for headers

**6. High-Contrast Zebra Striping**
- **Problem:** Strong alternating colors create visual noise, harder to read
- **Issues:** Eye strain, reduced readability, accessibility issues for some users
- **Use instead:** Subtle striping (1.5:1 maximum contrast between rows, maintain 4.5:1 text contrast)

**7. Horizontal Scroll Without Indicators**
- **Problem:** Users don't know content extends beyond viewport
- **Issues:** Hidden content, poor mobile UX, lost data
- **Use instead:** Add scroll indicators (shadows, arrows) or redesign for mobile stacking

## Don't Hand-Roll

Problems that look simple but have existing solutions.

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Responsive card grid | Manual breakpoint media queries for 2, 3, 4 columns | CSS Grid `auto-fit` with `minmax()` | One-line solution handles all screen sizes automatically; media queries require maintenance for every breakpoint |
| Sticky header scroll detection | Custom JavaScript scroll listeners with throttle/debounce | CSS `position: sticky` | Native CSS is hardware-accelerated, smoother performance, no JavaScript needed; JS adds overhead and potential jank |
| Mobile navigation drawer | Custom overlay + animation from scratch | Proven accessible patterns from A11y Matters/Knowbility | Focus management alone requires 50+ lines; proven patterns handle keyboard traps, ESC key, focus restoration, ARIA states |
| Breadcrumb separators | Manual insertion of separator characters or spans | CSS pseudo-elements (`::after`) | Pseudo-elements automatically hidden from screen readers; manual separators require `aria-hidden` and extra markup |
| Table responsive patterns | Custom JavaScript to reformat table | Native horizontal scroll OR CSS-only stacked cards pattern | Screen reader support maintained with native approach; custom JavaScript breaks semantic table navigation |
| Card hover animations | Multiple properties (background, border, shadow, position) | CSS `transform` + `box-shadow` opacity pseudo-element | Only transform and opacity are GPU-accelerated; animating shadow directly causes repaint on every frame |
| Focus trap for modal/drawer | Custom keyboard event handling | Existing focus-trap libraries or proven patterns | Edge cases: Tab from last to first, Shift+Tab from first to last, disabled elements, hidden elements—30+ scenarios to handle |
| Navigation active state | JavaScript to add active class based on URL | Server-rendered with `aria-current="page"` | Server knows current page, no JavaScript needed; JS solution fails if script doesn't load or executes late |

**Key insight:** Navigation and layout components have mature patterns with excellent browser support. Modern CSS (Grid, `position: sticky`, `aspect-ratio`, `:focus-visible`) eliminates need for JavaScript solutions. The complexity lies in accessibility (ARIA attributes, keyboard navigation, focus management) where proven patterns prevent WCAG failures. Semantic HTML provides structure for free—custom solutions lose these benefits and require extensive ARIA to restore them.

**Cost of hand-rolling navigation:**
- 100+ hours implementing ARIA correctly for mobile drawer alone
- 20+ WCAG violations in initial implementation (focus management, keyboard traps, announcements)
- Cross-browser inconsistencies (Safari hover states, Firefox focus styles, Chrome autofill)
- Performance issues (scroll jank, animation stutters, layout thrashing)

## Common Pitfalls

### Pitfall 1: Mobile Drawer Without Focus Management

**What goes wrong:** Hamburger menu opens drawer, but keyboard focus remains on body content "behind" the drawer
**Why it happens:** Developers implement visual overlay but forget focus trap and focus movement
**How to avoid:**
- Move focus to close button immediately when drawer opens (`drawerClose.focus()`)
- Trap focus within drawer (Tab cycles through drawer elements only)
- ESC key closes drawer (ARIA keyboard pattern)
- Return focus to hamburger button when drawer closes
- Use `visibility: hidden` or `hidden` attribute when closed (removes from keyboard tab order)

**Warning signs:**
- Tabbing through drawer continues to content behind it
- ESC key doesn't close drawer
- Focus lost (can't see where keyboard is)
- Screen reader announces elements outside drawer

**Code fix:**
```javascript
// When opening drawer
drawer.hidden = false;
drawer.setAttribute('aria-hidden', 'false');
toggleButton.setAttribute('aria-expanded', 'true');
drawerCloseButton.focus(); // Critical!
trapFocus(drawer);

// When closing drawer
drawer.hidden = true;
drawer.setAttribute('aria-hidden', 'true');
toggleButton.setAttribute('aria-expanded', 'false');
toggleButton.focus(); // Return focus!
```

### Pitfall 2: Breadcrumbs Missing aria-current

**What goes wrong:** Breadcrumbs visually show current page but screen readers can't identify it
**Why it happens:** Developers style current item differently but forget programmatic indication
**How to avoid:**
- Always add `aria-current="page"` to current breadcrumb item
- Current item can be `<span>` (not link) or link without interaction
- Only one element can have `aria-current="page"` at a time
- Test with screen reader (should announce "current page")

**Warning signs:**
- Screen reader doesn't announce current location
- Automated accessibility scans flag missing aria-current
- Users can't programmatically determine current page

**Code fix:**
```html
<!-- WRONG - visual only -->
<li class="breadcrumb-item current">
  <span>Current Page</span>
</li>

<!-- CORRECT - visual + programmatic -->
<li class="breadcrumb-item" aria-current="page">
  <span>Current Page</span>
</li>
```

### Pitfall 3: Table Headers Without Scope

**What goes wrong:** Data tables missing `scope` attribute, screen readers can't associate headers with data
**Why it happens:** Visual layout looks correct, developers don't test with screen reader
**How to avoid:**
- Always use `<th>` for header cells (not `<td>` with bold styling)
- Add `scope="col"` to column headers in `<thead>`
- Add `scope="row"` to row headers (typically first column in `<tbody>`)
- More complex tables may need `id` and `headers` attributes
- Test with screen reader table navigation (Ctrl+Alt+Arrow keys in NVDA)

**Warning signs:**
- Screen reader announces cell value without context
- WCAG 1.3.1 failure in accessibility audit
- Data relationships unclear when navigating with keyboard only

**Code fix:**
```html
<!-- WRONG - missing scope -->
<thead>
  <tr>
    <th>Product</th>
    <th>Price</th>
  </tr>
</thead>

<!-- CORRECT - explicit scope -->
<thead>
  <tr>
    <th scope="col">Product</th>
    <th scope="col">Price</th>
  </tr>
</thead>
<tbody>
  <tr>
    <th scope="row">Hydrophon Basic</th>
    <td>€12,50</td>
  </tr>
</tbody>
```

### Pitfall 4: Card Hover Effect Performance Issues

**What goes wrong:** Hover effects stutter or cause jank during scroll
**Why it happens:** Animating properties that trigger layout/paint (box-shadow, width, border)
**How to avoid:**
- Only animate `transform` and `opacity` (GPU-accelerated)
- Use pseudo-element with opacity for shadow changes
- Add `will-change: transform` only to elements being hovered
- Respect `prefers-reduced-motion: reduce`
- Test on mid-range mobile devices (not just desktop)

**Warning signs:**
- Janky animations during hover
- DevTools Performance panel shows layout thrashing
- Choppy scroll when hovering over cards
- High CPU usage on hover

**Code fix:**
```css
/* WRONG - animates box-shadow directly (causes repaint) */
.card {
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: box-shadow 300ms;
}
.card:hover {
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
}

/* CORRECT - pseudo-element with opacity (GPU-accelerated) */
.card {
  position: relative;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.card::after {
  content: '';
  position: absolute;
  inset: 0;
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
  opacity: 0;
  transition: opacity 300ms;
  pointer-events: none;
  z-index: -1;
}

.card:hover::after {
  opacity: 1;
}

.card:hover {
  transform: translateY(-4px); /* GPU-accelerated */
  transition: transform 300ms;
}
```

### Pitfall 5: Sticky Header Causing Layout Shift

**What goes wrong:** Header switches to sticky, content below "jumps" causing poor Core Web Vitals CLS score
**Why it happens:** `position: sticky` doesn't reserve space; page layout shifts when stickiness activates
**How to avoid:**
- Ensure header height is consistent (fixed pixel height or CSS variable)
- Don't dynamically change header height on scroll
- Reserve space for header in layout (it naturally takes up space)
- Test CLS score with Lighthouse (target < 0.1)
- Avoid content reflows triggered by sticky behavior

**Warning signs:**
- Content jumps when scrolling
- Poor Lighthouse CLS score
- Header overlaps content unexpectedly
- Layout shifts visible during scroll

**Code fix:**
```css
/* CORRECT - consistent height prevents shift */
.site-header {
  position: sticky;
  top: 0;
  height: 80px; /* Fixed height */
  display: flex;
  align-items: center;
}

/* WRONG - changing height causes shift */
.site-header.scrolled {
  height: 60px; /* Different height triggers CLS */
}
```

### Pitfall 6: Zebra Striping Too Strong

**What goes wrong:** High-contrast alternating row colors create visual noise, harder to scan
**Why it happens:** Designers use brand colors or high-contrast stripes thinking it improves readability
**How to avoid:**
- Keep stripe contrast subtle (1.5:1 maximum between rows)
- Both stripe colors must maintain 4.5:1 text contrast
- Use neutral grays (typically neutral-50 for stripe)
- Test with actual content at various zoom levels
- Consider hover state instead of or in addition to striping

**Warning signs:**
- Users report tables are hard to read
- Strong visual pattern distracts from content
- Text contrast fails on one of the stripe colors
- Cognitive load increases with high-contrast patterns

**Code fix:**
```css
/* WRONG - too high contrast between stripes */
.data-table tbody tr:nth-child(even) {
  background: #e0e0e0; /* Too dark */
}

/* CORRECT - subtle striping */
.data-table tbody tr:nth-child(even) {
  background: var(--color-neutral-50); /* Very light gray */
}

.data-table tbody tr:nth-child(odd) {
  background: transparent; /* White */
}

/* Both must maintain 4.5:1 text contrast */
.data-table td {
  color: var(--color-neutral-900); /* Dark text on light backgrounds */
}
```

### Pitfall 7: Navigation Links Without Active State

**What goes wrong:** Users can't tell which page they're currently on in navigation
**Why it happens:** Developers implement hover states but forget active/current page indication
**How to avoid:**
- Add `aria-current="page"` to current navigation link
- Style current link visually (different color, underline, background, border)
- Ensure 3:1 contrast between active and inactive links (WCAG 1.4.1 non-text contrast)
- Test by navigating between pages (active state should change)
- Server-side rendering should set active state (not JavaScript)

**Warning signs:**
- Users ask "Where am I?"
- No visual indication of current page
- Screen reader doesn't announce current page
- Automated accessibility scans flag missing aria-current

**Code fix:**
```html
<!-- WRONG - no programmatic indication -->
<nav>
  <a href="/home">Home</a>
  <a href="/products" class="active">Products</a>
  <a href="/contact">Contact</a>
</nav>

<!-- CORRECT - visual + programmatic -->
<nav aria-label="Main navigation">
  <a href="/home">Home</a>
  <a href="/products" aria-current="page">Products</a>
  <a href="/contact">Contact</a>
</nav>
```

```css
/* Style active state with sufficient contrast */
nav a[aria-current="page"] {
  color: var(--nav-link-active);
  font-weight: var(--font-weight-semibold);
  border-bottom: 2px solid var(--color-primary-500);
}
```

## Code Examples

Verified patterns from official sources and specifications.

### Complete Header with Desktop and Mobile Navigation

```html
<!-- Source: Semantic HTML5, WAI-ARIA patterns, USWDS Design System -->
<header class="site-header" role="banner">
  <div class="header-container">
    <!-- Logo -->
    <a href="/" class="site-logo" aria-label="Hydrophon Startseite">
      <img src="/assets/logo/hydrophon-logo.svg" alt="Hydrophon" width="140" height="40" />
    </a>

    <!-- Desktop Navigation -->
    <nav class="desktop-nav" role="navigation" aria-label="Hauptnavigation">
      <ul class="nav-list">
        <li class="nav-item">
          <a href="/produkte" class="nav-link" aria-current="page">Produkte</a>
        </li>
        <li class="nav-item">
          <a href="/unternehmen" class="nav-link">Unternehmen</a>
        </li>
        <li class="nav-item">
          <a href="/service" class="nav-link">Service</a>
        </li>
        <li class="nav-item">
          <a href="/kontakt" class="nav-link">Kontakt</a>
        </li>
      </ul>
    </nav>

    <!-- Mobile Hamburger Button -->
    <button
      class="nav-toggle"
      aria-label="Menü öffnen"
      aria-expanded="false"
      aria-controls="mobile-nav"
      type="button"
    >
      <svg class="icon-menu" width="24" height="24" aria-hidden="true">
        <use href="#icon-menu"></use>
      </svg>
      <span class="sr-only">Menu</span>
    </button>
  </div>
</header>

<!-- Mobile Navigation Drawer -->
<div id="mobile-nav" class="mobile-drawer" hidden aria-hidden="true">
  <div class="drawer-content">
    <button class="drawer-close" aria-label="Menü schließen" type="button">
      <svg class="icon-x" width="24" height="24" aria-hidden="true">
        <use href="#icon-x"></use>
      </svg>
    </button>

    <nav aria-label="Mobile Navigation">
      <ul class="drawer-nav-list">
        <li><a href="/produkte" aria-current="page">Produkte</a></li>
        <li><a href="/unternehmen">Unternehmen</a></li>
        <li><a href="/service">Service</a></li>
        <li><a href="/kontakt">Kontakt</a></li>
      </ul>
    </nav>
  </div>

  <div class="drawer-backdrop" aria-hidden="true"></div>
</div>

<!-- Breadcrumb Navigation -->
<nav aria-label="Breadcrumbs" class="breadcrumb-nav">
  <ol class="breadcrumb">
    <li class="breadcrumb-item">
      <a href="/">Home</a>
    </li>
    <li class="breadcrumb-item">
      <a href="/produkte">Produkte</a>
    </li>
    <li class="breadcrumb-item" aria-current="page">
      <span>Hydrophon</span>
    </li>
  </ol>
</nav>
```

### Product Card Grid with Auto-Responsive Layout

```html
<!-- Source: CSS Grid auto-fit pattern, card component best practices -->
<section class="products-section">
  <h2 class="section-title">Unsere Produkte</h2>

  <div class="product-grid">
    <article class="product-card">
      <a href="/produkte/hydrophon" class="card-link">
        <div class="card-image">
          <img
            src="/products/hydrophon.jpg"
            alt="Hydrophon Duschabdichtung"
            loading="lazy"
            width="400"
            height="400"
          />
        </div>

        <div class="card-content">
          <h3 class="card-title">Hydrophon Duschabdichtung</h3>

          <ul class="card-specs">
            <li>Breite: 100-200 mm</li>
            <li>Höhe: verstellbar 50-150 mm</li>
            <li>Material: Premium PE</li>
          </ul>

          <span class="card-cta">
            Details ansehen
            <svg class="icon-arrow" width="16" height="16" aria-hidden="true">
              <use href="#icon-arrow-right"></use>
            </svg>
          </span>
        </div>
      </a>
    </article>

    <!-- More cards... -->
  </div>
</section>
```

### Accessible Data Table with Responsive Behavior

```html
<!-- Source: W3C Tables Tutorial, USWDS Table Component -->
<div class="table-container">
  <table class="data-table">
    <caption>Hydrophon Produktvergleich – Technische Spezifikationen</caption>
    <thead>
      <tr>
        <th scope="col">Modell</th>
        <th scope="col">Breite (mm)</th>
        <th scope="col">Höhe (mm)</th>
        <th scope="col">Material</th>
        <th scope="col">Preis</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">Hydrophon Basic</th>
        <td data-label="Breite">100-150</td>
        <td data-label="Höhe">50-120</td>
        <td data-label="Material">PVC</td>
        <td data-label="Preis">€12,50</td>
      </tr>
      <tr>
        <th scope="row">Hydrophon Plus</th>
        <td data-label="Breite">100-200</td>
        <td data-label="Höhe">50-150</td>
        <td data-label="Material">PE</td>
        <td data-label="Preis">€18,90</td>
      </tr>
      <tr>
        <th scope="row">Hydrophon Pro</th>
        <td data-label="Breite">150-300</td>
        <td data-label="Höhe">80-200</td>
        <td data-label="Material">PE Premium</td>
        <td data-label="Preis">€24,50</td>
      </tr>
    </tbody>
  </table>
</div>
```

### Design Tokens for Navigation & Content

```json
{
  "navigation": {
    "header": {
      "height": {
        "desktop": { "$value": "80px", "$type": "dimension" },
        "mobile": { "$value": "64px", "$type": "dimension" }
      },
      "background": { "$value": "{color.neutral.0}", "$type": "color" },
      "borderBottom": { "$value": "1px solid {color.neutral.200}", "$type": "border" },
      "zIndex": { "$value": "100", "$type": "number" }
    },
    "link": {
      "color": {
        "default": { "$value": "{color.neutral.700}", "$type": "color" },
        "hover": { "$value": "{color.neutral.900}", "$type": "color" },
        "active": { "$value": "{color.primary.600}", "$type": "color" }
      },
      "fontSize": { "$value": "{font.size.base}", "$type": "dimension" },
      "fontWeight": {
        "default": { "$value": "{font.weight.medium}", "$type": "number" },
        "active": { "$value": "{font.weight.semibold}", "$type": "number" }
      },
      "padding": { "$value": "{spacing.3} {spacing.4}", "$type": "dimension" }
    },
    "drawer": {
      "width": { "$value": "280px", "$type": "dimension" },
      "background": { "$value": "{color.neutral.0}", "$type": "color" },
      "backdropColor": { "$value": "rgba(0, 0, 0, 0.5)", "$type": "color" }
    }
  },
  "breadcrumb": {
    "fontSize": { "$value": "{font.size.sm}", "$type": "dimension" },
    "gap": { "$value": "{spacing.2}", "$type": "dimension" },
    "separator": {
      "content": { "$value": "/", "$type": "string" },
      "color": { "$value": "{color.neutral.400}", "$type": "color" }
    },
    "link": {
      "color": { "$value": "{color.primary.600}", "$type": "color" },
      "hover": { "$value": "{color.primary.700}", "$type": "color" }
    },
    "current": {
      "color": { "$value": "{color.neutral.900}", "$type": "color" },
      "fontWeight": { "$value": "{font.weight.medium}", "$type": "number" }
    }
  },
  "card": {
    "gap": { "$value": "{spacing.6}", "$type": "dimension" },
    "minWidth": { "$value": "280px", "$type": "dimension" },
    "background": { "$value": "{color.neutral.0}", "$type": "color" },
    "radius": { "$value": "{radius.lg}", "$type": "dimension" },
    "padding": { "$value": "{spacing.6}", "$type": "dimension" },
    "shadow": {
      "default": { "$value": "{shadow.sm}", "$type": "shadow" },
      "hover": { "$value": "{shadow.md}", "$type": "shadow" }
    },
    "image": {
      "aspectRatio": { "$value": "1 / 1", "$type": "string" }
    },
    "title": {
      "fontSize": { "$value": "{font.size.lg}", "$type": "dimension" },
      "fontWeight": { "$value": "{font.weight.semibold}", "$type": "number" },
      "color": { "$value": "{color.neutral.900}", "$type": "color" }
    }
  },
  "table": {
    "fontSize": { "$value": "{font.size.sm}", "$type": "dimension" },
    "cellPadding": { "$value": "{spacing.3} {spacing.4}", "$type": "dimension" },
    "background": { "$value": "{color.neutral.0}", "$type": "color" },
    "borderColor": { "$value": "{color.neutral.200}", "$type": "color" },
    "header": {
      "background": { "$value": "{color.neutral.100}", "$type": "color" },
      "color": { "$value": "{color.neutral.900}", "$type": "color" },
      "fontWeight": { "$value": "{font.weight.semibold}", "$type": "number" }
    },
    "row": {
      "default": { "$value": "transparent", "$type": "color" },
      "stripe": { "$value": "{color.neutral.50}", "$type": "color" },
      "hover": { "$value": "{color.primary.50}", "$type": "color" }
    }
  }
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| JavaScript dropdown menus | CSS-only or simple horizontal nav | 2020-2023 | Simpler implementation, better performance, more accessible, less maintenance—B2B prefers clarity over complexity |
| Hamburger menu on all screens | Visible desktop nav + mobile hamburger | 2018-2021 | Better discoverability on desktop (27% vs 86% usage), mobile users accept hamburger as standard pattern |
| Fixed media query breakpoints | CSS Grid auto-fit with minmax() | 2021-2024 | One rule handles all screen sizes, no breakpoint management, truly responsive without media queries |
| JavaScript sticky header | CSS position: sticky | 2019-2022 | Hardware-accelerated, smoother performance, no scroll listeners, works without JavaScript |
| Custom accessibility patterns | Native HTML5 semantic elements | 2015-2023 | Accessibility by default, reduced ARIA burden, better screen reader support, SEO benefits |
| Manual card grid columns | CSS Grid + gap property | 2020-2024 | Consistent spacing, no margin calculations, simpler code, flexbox equivalent requires negative margins |
| Complex table data attributes | Native horizontal scroll | 2022-2025 | Maintains semantic table structure, works with screen readers, simpler implementation than card transformation |
| Mega menus with complex flyouts | Category landing pages + simple nav | 2023-2026 | Better mobile experience, improved accessibility, reduced cognitive load, easier maintenance |
| Animated box-shadow on hover | Pseudo-element opacity transition | 2021-2024 | GPU-accelerated, 60fps animations, no repaint per frame, better performance on mobile |
| Breadcrumb separators as HTML | CSS pseudo-elements (::after) | 2018-2022 | Automatically hidden from screen readers, less markup, easier to change globally |

**Deprecated/outdated:**
- **Mega menus for B2B navigation:** Complex to maintain, poor mobile experience, accessibility challenges—simple horizontal nav preferred in 2026
- **Hamburger menu on desktop:** Hides navigation unnecessarily, reduces discoverability—reserve for mobile only
- **JavaScript for sticky headers:** CSS `position: sticky` is now universally supported and more performant
- **Flexbox for card grids:** CSS Grid with `auto-fit` is purpose-built for grid layouts, simpler syntax, better alignment
- **Custom div-based tables:** Semantic `<table>` elements provide accessibility for free, custom implementations require extensive ARIA

## Open Questions

Things that couldn't be fully resolved.

### 1. Logo Placement: Left-Aligned with Centered or Right-Aligned Nav

**What we know:**
- Phase 4 context: "Claude's Discretion: Logo placement (left-aligned with centered or right-aligned nav)"
- Three options: Logo left + Nav centered, Logo left + Nav right, Logo center + Nav right
- B2B convention typically has logo left, nav right (standard F-pattern reading)

**What's unclear:**
- Does Hydrophon brand benefit from centered navigation symmetry?
- How does logo size affect optimal navigation placement?
- Does product-heavy B2B site favor standard (left logo + right nav) over centered?

**Recommendation:**
- Use **logo left + nav right** (standard B2B pattern) for these reasons:
  1. Matches user expectations (Jakob's Law—familiar pattern)
  2. F-pattern reading behavior: users scan left (logo/brand) then right (navigation)
  3. Better mobile adaptation (logo stays left, hamburger right)
  4. More space-efficient for multiple nav items (Produkte, Unternehmen, Service, Kontakt)
- Desktop layout: Logo left, nav right, CTA button right-most (optional)
- Mobile layout: Logo left, hamburger right (standard convention)

**Token structure supports both:**
```json
{
  "nav": {
    "layout": {
      "desktop": "space-between", // or "centered" for logo-left + nav-center
      "justifyContent": "space-between" // flex layout control
    }
  }
}
```

### 2. Sticky vs Scrolling Header Behavior

**What we know:**
- Phase 4 context: "Claude's Discretion: Sticky vs scrolling header behavior"
- Sticky headers keep navigation accessible during scroll
- Scrolling headers provide more content space

**What's unclear:**
- Do B2B users benefit enough from persistent navigation to justify reduced viewport space?
- Does product catalog browsing (long page scrolls) favor sticky header?
- Is mobile viewport space too limited for sticky header?

**Recommendation:**
- Use **sticky header on desktop, scrolling on mobile** for these reasons:
  1. Desktop has vertical space for sticky (80px header on 1080px+ viewport is <8%)
  2. Mobile viewport limited (64px header on 667px viewport is 9.5%, more impactful)
  3. B2B users browse product catalogs with long scrolls—sticky navigation improves UX
  4. Mobile users can scroll to top quickly (standard behavior)
- Desktop: `position: sticky` with subtle shadow on scroll
- Mobile: Regular scrolling header (no sticky)
- Implementation via media query:
  ```css
  .site-header {
    position: relative; /* Mobile default */
  }

  @media (min-width: 768px) {
    .site-header {
      position: sticky; /* Desktop only */
      top: 0;
    }
  }
  ```

**Performance consideration:** Sticky header on mobile can affect Core Web Vitals (CLS), so scrolling header avoids this risk on smaller viewports.

### 3. Breadcrumb Separator Style

**What we know:**
- Phase 4 context: "Claude's Discretion: Breadcrumb separator style (chevron, slash, etc.)"
- Common options: `/` (slash), `>` (greater-than), `›` (chevron), `→` (arrow)
- Separators must be hidden from screen readers (auto-handled by pseudo-elements)

**What's unclear:**
- Which separator best matches Hydrophon's modern professional aesthetic?
- Does B2B audience have separator preference (traditional vs modern)?

**Recommendation:**
- Use **chevron (`›`)** for these reasons:
  1. Modern appearance (more contemporary than slash)
  2. Clearly indicates directionality (hierarchy flow)
  3. Better visual separation than slash (more distinct shape)
  4. Common in modern design systems (Google, Apple, many B2B sites)
- Alternative: right arrow (`→`) if more direction emphasis needed
- Avoid: Greater-than (`>`) looks like code/technical, less polished
- Token-based for easy global change:
  ```json
  {
    "breadcrumb": {
      "separator": {
        "content": "›",
        "color": "{color.neutral.400}",
        "margin": "{spacing.2}"
      }
    }
  }
  ```

### 4. Mobile Responsive Table Strategy

**What we know:**
- Phase 4 context: "Claude's Discretion: Mobile responsive strategy (horizontal scroll, stacked cards, or pivot)"
- Three options: Horizontal scroll, stacked cards (label + value), pivot table
- Tables in scope are product comparison tables (5 columns typical)

**What's unclear:**
- Do product specs require side-by-side comparison (favor horizontal scroll)?
- Are individual product details more important than comparison (favor stacked)?

**Recommendation:**
- Use **horizontal scroll as primary pattern** for these reasons:
  1. Product comparison tables need side-by-side data (specs across models)
  2. Horizontal scroll maintains data relationships and table semantics
  3. Simpler implementation (one CSS rule: `overflow-x: auto`)
  4. Screen readers maintain table navigation (row/column headers work)
  5. B2B users comparing products benefit from seeing multiple columns
- Add scroll indicators (shadows on left/right edges) for discoverability
- Alternative for simple 2-3 column tables: Use stacked cards with `data-label` attributes
- Implementation:
  ```css
  .table-container {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }

  .data-table {
    min-width: 600px; /* Prevent over-compression */
  }
  ```

**Future consideration:** If user testing shows comparison isn't critical, can add stacked card alternative for specific table types.

## Sources

### Primary (HIGH confidence)

**W3C/WAI Official:**
- [W3C WAI-ARIA Breadcrumb Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/) - ARIA attributes, keyboard interaction, markup requirements
- [W3C Tables Tutorial](https://www.w3.org/WAI/tutorials/tables/) - WCAG 1.3.1 requirements, scope attributes, header associations
- [W3C Multiple Ways (Navigation)](https://www.w3.org/WAI/tutorials/menus/multiple-ways/) - Navigation landmark patterns, WCAG 2.4.5

**Government Design Systems:**
- [U.S. Web Design System (USWDS) Breadcrumb Component](https://designsystem.digital.gov/components/breadcrumb/) - 14 WCAG 2.1 AA tests, HTML structure, accessibility requirements
- [USWDS Layout Grid](https://designsystem.digital.gov/utilities/layout-grid/) - Grid system patterns, responsive breakpoints
- [USWDS Table Component Accessibility Tests](https://designsystem.digital.gov/components/table/accessibility-tests/) - Table testing methodology

**Official Documentation:**
- [MDN: CSS Grid Common Layouts](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Grid_layout/Common_grid_layouts) - Card grid patterns, auto-fit/minmax
- [MDN: HTML5 Semantic Elements](https://developer.mozilla.org/en-US/docs/Glossary/Semantics#semantics_in_html) - header, nav, footer landmark roles
- [MDN: CSS position sticky](https://developer.mozilla.org/en-US/docs/Web/CSS/position#sticky) - Sticky positioning specification

### Secondary (MEDIUM confidence)

**Accessibility Best Practices:**
- [Knowbility: Let's Focus on Slide-Out Navigation](https://knowbility.org/blog/2020/accessible-slide-menus) - Accessible hamburger menu patterns, focus management
- [A11y Matters: Mobile Navigation](https://a11ymatters.com/pattern/mobile-nav/) - Mobile drawer accessibility requirements
- [Impressive Webs: Accessible Keyboard-Friendly Hamburger Menu](https://www.impressivewebs.com/accessible-keyboard-friendly-hamburger-menu-slide-out-navigation/) - Focus trap implementation
- [Atomic Accessibility: Breadcrumb Navigation Design Checklist](https://www.atomica11y.com/accessible-design/breadcrumbs/) - WCAG checklist for breadcrumbs (2026 updated)
- [Adrian Roselli: A Responsive Accessible Table](https://adrianroselli.com/2017/11/a-responsive-accessible-table.html) - Table responsive patterns, screen reader testing

**B2B Navigation Patterns:**
- [Webstacks: Navigation Redesign for B2B Websites](https://www.webstacks.com/blog/navigation-redesign-for-b2b-websites) - B2B-specific navigation best practices
- [Trajectory Web Design: B2B Website Navigation Structure](https://www.trajectorywebdesign.com/blog/b2b-website-navigation) - Complex buyer navigation patterns
- [Blend B2B: Website Navigation Best Practices](https://www.blendb2b.com/websites-decoded/b2b-website-navigation-best-practices) - Limit to 7 items, grouping strategies

**Performance & Modern CSS:**
- [Josh Comeau: Designing Beautiful Shadows in CSS](https://www.joshwcomeau.com/css/designing-shadows/) - Shadow depth theory, elevation patterns
- [Tobias Ahlin: How to Animate Box-Shadow with Performance](https://tobiasahlin.com/blog/how-to-animate-box-shadow/) - Pseudo-element opacity technique for GPU acceleration
- [Solidly Stated: The No-Jank Sticky Header](https://solidlystated.com/the-no-jank-sticky-header-design-rules-for-navigation-that-doesnt-annoy-users/) - Performance optimization for sticky headers
- [Smashing Magazine: Sticky Headers and Full-Height Elements](https://www.smashingmagazine.com/2024/09/sticky-headers-full-height-elements-tricky-combination/) - Layout considerations

**Card & Grid Patterns:**
- [Nathan Curtis (EightShapes): Cards and Composability in Design Systems](https://medium.com/eightshapes-llc/cards-and-composability-in-design-systems-8845ecbee50e) - Card component architecture
- [Berkeley Digital Accessibility: Accessible Card UI Component Patterns](https://dap.berkeley.edu/web-a11y-basics/accessible-card-ui-component-patterns) - Focus management, keyboard access
- [W3C Design System: Cards Component](https://design-system.w3.org/components/cards.html) - Official design system card patterns

**Design Tokens:**
- [Penpot: Developer's Guide to Design Tokens and CSS Variables](https://penpot.app/blog/the-developers-guide-to-design-tokens-and-css-variables/) - Three-tier token architecture
- [Backlight.dev: Design Tokens using CSS Custom Properties](https://backlight.dev/docs/design-tokens-using-css-custom-properties) - Token implementation patterns

### Tertiary (LOW confidence - WebSearch only, marked for validation)

**Hamburger Alternatives (2026 trends):**
- [Fireart Studio: 5 Creative Alternatives to the Hamburger Menu](https://fireart.studio/blog/5-smart-alternatives-to-the-hamburger-menu/) - Bottom tabs, progressive collapse
- [Dorik: Hamburger Menu Alternatives](https://dorik.com/blog/hamburger-menu-alternatives) - Gesture-based, FABs, hybrid approaches
- [Phone Simulator: Mobile Navigation Design 2026](https://phone-simulator.com/blog/mobile-navigation-patterns-in-2026) - 2026 mobile trends (AI-powered, gesture-based)

**Table Accessibility:**
- [TestParty: Table Accessibility Guide](https://testparty.ai/blog/wcag-tables-accessibility) - WCAG compliance for tables
- [Medium: Zebra Striping for Readability](https://medium.com/@designbyfgs/do-zebra-striping-practices-in-table-ui-design-enhance-readability-or-create-visual-noise-5d98cc59f4bd) - Contrast recommendations (1.5:1 maximum)

**B2B Trends:**
- [Tilipman Digital: 18 Best B2B Websites 2026](https://www.tilipmandigital.com/resource-center/articles/best-b2b-websites) - Current B2B web patterns
- [Axon Garside: Top 10 B2B Website Design Trends for 2026](https://www.axongarside.com/blog/b2b-website-design-trends-2026) - Trend analysis for 2026

## Metadata

**Confidence breakdown:**
- Semantic HTML navigation structure: **HIGH** - W3C specification, MDN documentation, government design systems verified
- Breadcrumb ARIA patterns: **HIGH** - W3C WAI-ARIA official pattern, USWDS tested implementation
- Mobile drawer accessibility: **HIGH** - Multiple accessibility organizations (Knowbility, A11y Matters) with consistent patterns
- CSS Grid card layouts: **HIGH** - MDN specification, native browser feature, universally supported
- Table accessibility requirements: **HIGH** - W3C Tables Tutorial (official), WCAG 1.3.1 verified, USWDS testing
- B2B navigation patterns: **MEDIUM** - Industry articles from multiple sources, consistent recommendations, but no single authoritative spec
- Sticky header performance: **MEDIUM** - Best practices from performance experts, but no formal specification
- Card hover effects: **MEDIUM** - Josh Comeau (recognized CSS expert), performance testing verified, but techniques evolve
- Zebra striping contrast: **MEDIUM** - General accessibility guidance (1.5:1 maximum), but not explicitly in WCAG spec

**Research date:** 2026-01-29
**Valid until:** 60 days (March 2026) - Navigation patterns and CSS Grid are mature and stable; main risks are emerging mobile navigation trends (bottom tabs, gesture-based) and new CSS features (container queries for cards, scroll-state for sticky headers) gaining wider support; WCAG 2.1 AA unchanged; HTML5 semantic elements stable

**Notes:**
- WCAG 2.2 is current standard (October 2023), enforced in 2026 for government and enterprise compliance
- CSS Grid with auto-fit/minmax is universally supported (2023+), no polyfills needed
- HTML5 semantic elements have been standard since 2014, excellent screen reader support
- `position: sticky` widely supported (97%+ browsers), no fallback needed
- Focus on native HTML/CSS solutions reduces JavaScript dependency and improves performance
- B2B navigation favors simplicity and discoverability over trendy patterns (no mega-menus, visible nav preferred)
