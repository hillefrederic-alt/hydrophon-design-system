# Grid & Breakpoints

Responsive Layout-System für konsistente Gestaltung.

## Grid-System

12-Spalten-Grid für maximale Flexibilität.

### Spaltenaufteilung

| Spalten | Verwendung | Beispiel |
|---------|------------|----------|
| 12 | Full Width | Hero-Sections, Artikel |
| 6+6 | Zweispaltig | Bild + Text, Features |
| 4+4+4 | Dreispaltig | Feature-Grid, Produkte |
| 3+3+3+3 | Vierspaltig | Icon-Grid, kleine Cards |
| 8+4 oder 4+8 | Asymmetrisch | Hauptinhalt + Sidebar |

Das 12-Spalten-System ermöglicht alle gängigen Aufteilungen: 2, 3, 4, 6, 12 Spalten.

### CSS Grid Implementierung

```css
.container {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--grid-gutters-desktop);
  max-width: var(--grid-max-width);
  margin: 0 auto;
  padding: 0 var(--grid-margins-desktop);
}

/* Spannende Spalten */
.col-12 { grid-column: span 12; } /* Full Width */
.col-6 { grid-column: span 6; }   /* Half Width */
.col-4 { grid-column: span 4; }   /* Third Width */
.col-3 { grid-column: span 3; }   /* Quarter Width */
```

### Grid-Variablen

| Variable | Mobile | Tablet | Desktop |
|----------|--------|--------|---------|
| `--grid-columns` | 12 | 12 | 12 |
| `--grid-gutter` | 16px | 24px | 32px |
| `--grid-margin` | 16px | 32px | 64px |
| `--grid-max-width` | - | - | 1280px |

**Gutter:** Abstand zwischen Spalten
**Margin:** Seitenrand außen am Container
**Max-Width:** Maximale Breite des Content-Bereichs

## Breakpoints

### Definitionen

| Name | Variable | Wert | Geräte |
|------|----------|------|---------|
| Small | `--breakpoints-sm` | 640px | Smartphones Landscape |
| Medium | `--breakpoints-md` | 768px | Tablets Portrait |
| Large | `--breakpoints-lg` | 1024px | Tablets Landscape, Laptops |
| Extra Large | `--breakpoints-xl` | 1280px | Desktop Monitors |
| 2XL | `--breakpoints-2xl` | 1536px | Große Monitore |

### Mobile-First Ansatz

Media Queries von klein nach groß:

```css
/* Mobile (Standard) */
.element {
  font-size: 14px;
  padding: var(--spacing-4);
}

/* Tablet und größer (768px+) */
@media (min-width: 768px) {
  .element {
    font-size: 16px;
    padding: var(--spacing-6);
  }
}

/* Desktop und größer (1024px+) */
@media (min-width: 1024px) {
  .element {
    font-size: 18px;
    padding: var(--spacing-8);
  }
}
```

**Vorteil Mobile-First:** Kleinere Geräte laden weniger CSS, progressive Enhancement für größere Screens.

### Breakpoint-Variablen in CSS

```css
/* Breakpoints als Custom Properties */
:root {
  --breakpoints-sm: 640px;
  --breakpoints-md: 768px;
  --breakpoints-lg: 1024px;
  --breakpoints-xl: 1280px;
  --breakpoints-2xl: 1536px;
}

/* HINWEIS: CSS Media Queries können keine var() nutzen */
/* Breakpoint-Werte direkt in Media Queries verwenden */
@media (min-width: 768px) { /* entspricht --breakpoints-md */ }
```

CSS Custom Properties funktionieren nicht in `@media`-Regeln, daher müssen Werte direkt verwendet werden.

## Responsive Patterns

### Container

```css
.container {
  width: 100%;
  max-width: var(--grid-max-width);
  margin: 0 auto;
  padding-left: var(--grid-margins-mobile);
  padding-right: var(--grid-margins-mobile);
}

/* Tablet */
@media (min-width: 768px) {
  .container {
    padding-left: var(--grid-margins-tablet);
    padding-right: var(--grid-margins-tablet);
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .container {
    padding-left: var(--grid-margins-desktop);
    padding-right: var(--grid-margins-desktop);
  }
}
```

### Responsive Grid mit auto-fit

Automatische Spaltenanzahl basierend auf Viewport:

```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(min(280px, 100%), 1fr)
  );
  gap: var(--spacing-6);
}
```

**Erklärung:**
- `repeat(auto-fit, ...)` - Automatische Spaltenanzahl
- `minmax(min(280px, 100%), 1fr)` - Minimum 280px, aber nie größer als Container
- `min(280px, 100%)` - Verhindert Overflow auf kleinen Screens

Keine Media Queries nötig - Grid passt sich automatisch an!

### Responsive Typography

```css
/* Mobile */
h1 {
  font-size: var(--font-size-3xl); /* 30px */
  line-height: var(--line-height-tight);
}

/* Desktop */
@media (min-width: 1024px) {
  h1 {
    font-size: var(--font-size-5xl); /* 48px */
  }
}
```

### Touch Targets

WCAG 2.1 AA erfordert 44x44px Touch Targets:

| Variable | Wert | Verwendung |
|----------|------|------------|
| `--icon-touch-target-minimum` | 44px | WCAG AAA Empfehlung |
| `--icon-touch-target-compact` | 32px | Nur Desktop mit ausreichend Abstand |

```css
/* Mobile - WCAG-konforme Touch Targets */
.button {
  min-height: 44px;
  min-width: 44px;
}

/* Desktop - kompaktere UI möglich */
@media (min-width: 1024px) {
  .button-small {
    min-height: 32px;
    min-width: 32px;
  }
}
```

## Spacing-Anpassungen

### Responsive Spacing

| Spacing | Mobile | Desktop | Variable |
|---------|--------|---------|----------|
| Section Padding | 48px | 96px | spacing-12 / spacing-24 |
| Component Gap | 16px | 24px | spacing-4 / spacing-6 |
| Card Padding | 16px | 24px | spacing-4 / spacing-6 |
| Grid Gutter | 16px | 32px | grid-gutters-* |

### Beispiel

```css
.section {
  /* Mobile */
  padding: var(--spacing-12) 0;
}

@media (min-width: 1024px) {
  .section {
    /* Desktop */
    padding: var(--spacing-24) 0;
  }
}
```

### Grid Margins & Gutters

```css
.grid {
  display: grid;
  gap: var(--grid-gutters-mobile);
  padding: 0 var(--grid-margins-mobile);
}

@media (min-width: 768px) {
  .grid {
    gap: var(--grid-gutters-tablet);
    padding: 0 var(--grid-margins-tablet);
  }
}

@media (min-width: 1024px) {
  .grid {
    gap: var(--grid-gutters-desktop);
    padding: 0 var(--grid-margins-desktop);
  }
}
```

## Layout-Beispiele

### Hero Section

```css
.hero {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--grid-gutters-mobile);
  padding: var(--spacing-12) var(--grid-margins-mobile);
}

.hero__content {
  grid-column: span 12; /* Mobile: Full Width */
}

@media (min-width: 768px) {
  .hero {
    gap: var(--grid-gutters-tablet);
    padding: var(--spacing-16) var(--grid-margins-tablet);
  }

  .hero__content {
    grid-column: span 8; /* Tablet: 8 von 12 Spalten */
  }
}

@media (min-width: 1024px) {
  .hero {
    gap: var(--grid-gutters-desktop);
    padding: var(--spacing-24) var(--grid-margins-desktop);
  }

  .hero__content {
    grid-column: span 6; /* Desktop: 6 von 12 Spalten */
  }
}
```

### Feature Grid

```css
.features {
  display: grid;
  gap: var(--spacing-6);
}

/* Mobile: 1 Spalte */
.features {
  grid-template-columns: 1fr;
}

/* Tablet: 2 Spalten */
@media (min-width: 768px) {
  .features {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Desktop: 3 Spalten */
@media (min-width: 1024px) {
  .features {
    grid-template-columns: repeat(3, 1fr);
    gap: var(--spacing-8);
  }
}
```

### Sidebar Layout

```css
.layout {
  display: grid;
  gap: var(--spacing-6);
}

/* Mobile: Gestapelt */
.layout__main,
.layout__sidebar {
  grid-column: span 12;
}

/* Desktop: Sidebar rechts */
@media (min-width: 1024px) {
  .layout {
    grid-template-columns: repeat(12, 1fr);
  }

  .layout__main {
    grid-column: span 8; /* 8 Spalten für Hauptinhalt */
  }

  .layout__sidebar {
    grid-column: span 4; /* 4 Spalten für Sidebar */
  }
}
```

## Weiterführende Dokumentation

- [Design Tokens](./design-tokens.md) - Token-Architektur
- [CSS-Variablen](./css-variables.md) - Vollständige Referenz
