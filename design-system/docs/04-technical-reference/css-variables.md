# CSS-Variablen Referenz

Vollständige Liste aller generierten CSS Custom Properties.

## Import

```css
@import 'design-system/build/css/variables.css';
```

Oder Link-Tag:
```html
<link rel="stylesheet" href="design-system/build/css/variables.css">
```

## Farben

### Markenfarben

**Hydrophon Blau:**

| Variable | Wert | Verwendung |
|----------|------|------------|
| `--hydrophon-blau-50` | #e5f5fd | Hintergrund, sehr hell |
| `--hydrophon-blau-100` | #b8e4f9 | Hover-States, Borders |
| `--hydrophon-blau-200` | #8ad3f5 | Deaktivierte Zustände |
| `--hydrophon-blau-300` | #5cc2f1 | Focus-Indikatoren |
| `--hydrophon-blau-400` | #2eb1ed | Leichte Varianten |
| `--hydrophon-blau-500` | #008bd2 | **Primärfarbe (Brand CI)** |
| `--hydrophon-blau-600` | #007bb8 | Hover auf Primärfarbe |
| `--hydrophon-blau-700` | #006a9e | Active-States |
| `--hydrophon-blau-800` | #005a84 | Sehr dunkel |
| `--hydrophon-blau-900` | #00496a | Text auf hellem Hintergrund |

**Hydrophon Grau:**

| Variable | Wert | Verwendung |
|----------|------|------------|
| `--hydrophon-grau-50` | #f7f7f7 | Hintergrund, sehr hell |
| `--hydrophon-grau-100` | #e8e8e8 | Hover-States |
| `--hydrophon-grau-200` | #d1d1d1 | Borders |
| `--hydrophon-grau-300` | #b0afaf | Deaktiviert |
| `--hydrophon-grau-400` | #939292 | Sekundäre UI-Elemente |
| `--hydrophon-grau-500` | #575656 | **Sekundärfarbe (Brand CI)** |
| `--hydrophon-grau-600` | #4d4c4c | Hover |
| `--hydrophon-grau-700` | #434242 | Active |
| `--hydrophon-grau-800` | #393838 | Sehr dunkel |
| `--hydrophon-grau-900` | #2f2e2e | Text |

### Neutralgrau-Skala

| Variable | Wert | Verwendung |
|----------|------|------------|
| `--neutral-50` | #fafafa | Hintergrund, sehr hell |
| `--neutral-100` | #f5f5f5 | Sekundärer Hintergrund |
| `--neutral-200` | #e5e5e5 | Borders, Dividers |
| `--neutral-300` | #d4d4d4 | Input-Borders |
| `--neutral-400` | #a3a3a3 | Placeholder-Text |
| `--neutral-500` | #737373 | Muted Text |
| `--neutral-600` | #525252 | Sekundärer Text |
| `--neutral-700` | #404040 | Body-Text |
| `--neutral-800` | #262626 | Heading-Text |
| `--neutral-900` | #171717 | Primärer Text (höchster Kontrast) |
| `--neutral-white` | #ffffff | Weiß |
| `--neutral-black` | #000000 | Schwarz |

### Semantische Farben

| Variable | Wert | Verwendung |
|----------|------|------------|
| `--color-primary` | var(--hydrophon-blau-500) | Primäre Markenelemente |
| `--color-secondary` | var(--hydrophon-grau-500) | Sekundäre Markenelemente |
| `--color-success` | #22c55e | Erfolgsmeldungen, Bestätigungen |
| `--color-warning` | #f59e0b | Warnungen, wichtige Hinweise |
| `--color-error` | #ef4444 | Fehler, destruktive Aktionen |
| `--color-info` | #3b82f6 | Informationen, neutrale Hinweise |

**Hintergrundfarben:**

| Variable | Wert | Verwendung |
|----------|------|------------|
| `--color-background-primary` | var(--neutral-white) | Haupthintergrund |
| `--color-background-secondary` | var(--neutral-50) | Sekundärer Hintergrund |
| `--color-background-tertiary` | var(--neutral-100) | Tertiärer Hintergrund |

**Textfarben:**

| Variable | Wert | Verwendung |
|----------|------|------------|
| `--color-text-primary` | var(--neutral-900) | Haupttext (höchster Kontrast) |
| `--color-text-secondary` | var(--neutral-700) | Sekundärer Text |
| `--color-text-muted` | var(--neutral-500) | Gedämpfter Text |
| `--color-text-inverse` | var(--neutral-white) | Text auf dunklem Hintergrund |

**Aktionsfarben:**

| Variable | Wert | Verwendung |
|----------|------|------------|
| `--color-action-primary` | var(--hydrophon-blau-500) | Primäre Aktionen |
| `--color-action-primary-hover` | var(--hydrophon-blau-600) | Hover-State |
| `--color-action-primary-active` | var(--hydrophon-blau-700) | Active-State |
| `--color-action-disabled` | var(--neutral-200) | Deaktiviert |
| `--color-text-on-primary` | var(--neutral-white) | Text auf Primärfarbe |
| `--color-text-disabled` | var(--neutral-400) | Deaktivierter Text |

### Produktlinien-Farben

| Variable | Wert | Produktlinie |
|----------|------|--------------|
| `--productline-hyhero-primary` | #f49a36 | hyHero Orange |
| `--productline-hyhero-secondary` | #373643 | hyHero Dunkelgrau |
| `--productline-hyindustry-primary` | #0e2638 | hyIndustry Dunkelblau |
| `--productline-gluy-primary` | #ffeeb6 | Gluy Gelb |
| `--productline-gluy-secondary` | #88a9c3 | Gluy Hellblau |
| `--productline-gluy-tertiary` | #14202e | Gluy Dunkelblau |

## Typografie

### Schriftfamilien

| Variable | Wert |
|----------|------|
| `--font-family-sans` | Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif |
| `--font-family-mono` | 'JetBrains Mono', 'Fira Code', 'Courier New', monospace |

### Schriftgrößen

| Variable | Wert | Verwendung |
|----------|------|------------|
| `--font-size-xs` | 12px | Captions, Legal Text |
| `--font-size-sm` | 14px | Labels, Form Inputs, UI Text |
| `--font-size-base` | 16px | Body Text, Paragraphs |
| `--font-size-lg` | 18px | Emphasis Body Text |
| `--font-size-xl` | 20px | H5 Subheadings |
| `--font-size-2xl` | 24px | H4 Headings |
| `--font-size-3xl` | 30px | H3 Headings |
| `--font-size-4xl` | 36px | H2 Headings |
| `--font-size-5xl` | 48px | H1 Headings |
| `--font-size-6xl` | 60px | Hero Headings |

### Schriftgewichte

| Variable | Wert | Verwendung |
|----------|------|------------|
| `--font-weight-regular` | 400 | Body Text |
| `--font-weight-medium` | 500 | UI-Elemente, Betonung |
| `--font-weight-semibold` | 600 | Subheadings |
| `--font-weight-bold` | 700 | Headings |

### Zeilenhöhen

| Variable | Wert | Verwendung |
|----------|------|------------|
| `--line-height-tight` | 1.25 | Große Headings |
| `--line-height-snug` | 1.375 | Subheadings |
| `--line-height-normal` | 1.5 | Body Text |
| `--line-height-relaxed` | 1.625 | Komfortables Lesen |
| `--line-height-loose` | 2 | Spezielle Layouts (Footer-Links) |

### Buchstabenabstand

| Variable | Wert | Verwendung |
|----------|------|------------|
| `--letter-spacing-tighter` | -0.05em | Display Text |
| `--letter-spacing-tight` | -0.025em | Headings |
| `--letter-spacing-normal` | 0em | Body Text |
| `--letter-spacing-wide` | 0.025em | UI-Elemente |
| `--letter-spacing-wider` | 0.05em | Labels, Buttons, Uppercase |

## Abstände

4px Basis-Einheit:

| Variable | Wert | Berechnung | Verwendung |
|----------|------|------------|------------|
| `--spacing-0` | 0px | 0 x 4px | Kein Abstand |
| `--spacing-0-5` | 2px | 0.5 x 4px | Extra tiny |
| `--spacing-1` | 4px | 1 x 4px | Kleinstes Spacing |
| `--spacing-1-5` | 6px | 1.5 x 4px | Tiny |
| `--spacing-2` | 8px | 2 x 4px | Extra small |
| `--spacing-2-5` | 10px | 2.5 x 4px | Small-medium |
| `--spacing-3` | 12px | 3 x 4px | Small |
| `--spacing-4` | 16px | 4 x 4px | Medium (häufig für Padding) |
| `--spacing-5` | 20px | 5 x 4px | Medium-large |
| `--spacing-6` | 24px | 6 x 4px | Large |
| `--spacing-7` | 28px | 7 x 4px | Extra large |
| `--spacing-8` | 32px | 8 x 4px | 2XL |
| `--spacing-9` | 36px | 9 x 4px | 2.5XL |
| `--spacing-10` | 40px | 10 x 4px | 3XL |
| `--spacing-11` | 44px | 11 x 4px | 3.5XL (WCAG Touch Target) |
| `--spacing-12` | 48px | 12 x 4px | 4XL |
| `--spacing-14` | 56px | 14 x 4px | 5XL |
| `--spacing-16` | 64px | 16 x 4px | 6XL |
| `--spacing-20` | 80px | 20 x 4px | 7XL |
| `--spacing-24` | 96px | 24 x 4px | 8XL |
| `--spacing-28` | 112px | 28 x 4px | 9XL |
| `--spacing-32` | 128px | 32 x 4px | 10XL |

## Effekte

### Border Radius

| Variable | Wert | Verwendung |
|----------|------|------------|
| `--border-radius-none` | 0px | Keine Rundung |
| `--border-radius-sm` | 2px | Kleine Elemente |
| `--border-radius-base` | 4px | Standard (Buttons, Inputs) |
| `--border-radius-md` | 6px | Cards |
| `--border-radius-lg` | 8px | Größere Cards, Modals |
| `--border-radius-xl` | 12px | Pills, große Elemente |
| `--border-radius-2xl` | 16px | Feature Cards |
| `--border-radius-3xl` | 24px | Dekorative Elemente |
| `--border-radius-full` | 9999px | Kreise, Pills |

### Schatten

| Variable | Wert | Verwendung |
|----------|------|------------|
| `--shadow-none` | none | Kein Schatten |
| `--shadow-sm` | 0 1px 2px rgba(0,0,0,0.05) | Minimale Tiefe |
| `--shadow-base` | 0 1px 3px rgba(0,0,0,0.1) | Standard-Elevation |
| `--shadow-md` | 0 4px 6px rgba(0,0,0,0.1) | Elevated Elements |
| `--shadow-lg` | 0 10px 15px rgba(0,0,0,0.1) | Floating Elements |
| `--shadow-xl` | 0 20px 25px rgba(0,0,0,0.1) | Modals, Dialogs |
| `--shadow-2xl` | 0 25px 50px rgba(0,0,0,0.25) | Dramatische Elevation |
| `--shadow-inner` | inset 0 2px 4px rgba(0,0,0,0.05) | Inset-Elemente |

## Grid & Breakpoints

### Grid-Variablen

| Variable | Wert | Verwendung |
|----------|------|------------|
| `--grid-columns` | 12 | Standard 12-Spalten-Grid |
| `--grid-max-width` | 1280px | Maximale Content-Breite |
| `--grid-margins-mobile` | 16px | Mobile Seitenränder |
| `--grid-margins-tablet` | 32px | Tablet Seitenränder |
| `--grid-margins-desktop` | 64px | Desktop Seitenränder |
| `--grid-gutters-mobile` | 16px | Mobile Spaltenabstand |
| `--grid-gutters-tablet` | 24px | Tablet Spaltenabstand |
| `--grid-gutters-desktop` | 32px | Desktop Spaltenabstand |

### Breakpoints

| Variable | Wert | Geräte |
|----------|------|--------|
| `--breakpoints-sm` | 640px | Landscape Phones |
| `--breakpoints-md` | 768px | Tablets Portrait |
| `--breakpoints-lg` | 1024px | Tablets Landscape, Laptops |
| `--breakpoints-xl` | 1280px | Large Desktops |
| `--breakpoints-2xl` | 1536px | Very Large Desktops |

### Container

| Variable | Wert |
|----------|------|
| `--container-sm` | 640px |
| `--container-md` | 768px |
| `--container-lg` | 1024px |
| `--container-xl` | 1280px |

## Komponenten-Tokens

### Buttons

**Primary Button:**

| Variable | Wert |
|----------|------|
| `--button-primary-background-default` | var(--color-action-primary) |
| `--button-primary-background-hover` | var(--color-action-primary-hover) |
| `--button-primary-background-active` | var(--color-action-primary-active) |
| `--button-primary-background-disabled` | var(--color-action-disabled) |
| `--button-primary-foreground-default` | var(--color-text-on-primary) |
| `--button-primary-foreground-disabled` | var(--color-text-disabled) |

**Größen:**

| Variable | Wert |
|----------|------|
| `--button-size-small-min-height` | 32px |
| `--button-size-small-font-size` | 14px |
| `--button-size-small-padding-x` | var(--spacing-3) |
| `--button-size-small-padding-y` | 6px |
| `--button-size-medium-min-height` | 40px |
| `--button-size-medium-font-size` | 16px |
| `--button-size-large-min-height` | 48px |
| `--button-size-large-font-size` | 18px |

**Base:**

| Variable | Wert |
|----------|------|
| `--button-base-border-radius` | var(--border-radius-base) |
| `--button-base-border-width` | 2px |
| `--button-base-font-weight` | 500 |
| `--button-base-transition` | 150ms ease-in-out |
| `--button-focus-outline-width` | 2px |
| `--button-focus-outline-offset` | 2px |

### Inputs

| Variable | Wert |
|----------|------|
| `--input-background-default` | var(--neutral-white) |
| `--input-field-border-default` | var(--neutral-300) |
| `--input-field-border-focus` | var(--hydrophon-blau-500) |
| `--input-field-border-error` | var(--color-error) |
| `--input-height-sm` | 32px |
| `--input-height-md` | 40px |
| `--input-height-lg` | 48px |
| `--input-focus-ring-width` | 3px |
| `--input-base-border-radius` | var(--border-radius-base) |

### Icons

| Variable | Wert | Verwendung |
|----------|------|------------|
| `--icon-size-xs` | 16px | Inline mit kleinem Text |
| `--icon-size-sm` | 20px | Buttons mit Text |
| `--icon-size-md` | 24px | Standalone Icons |
| `--icon-size-lg` | 32px | Hero Sections |
| `--icon-size-xl` | 48px | Dekorativ |
| `--icon-stroke-weight` | 2px | Strichstärke |
| `--icon-touch-target-minimum` | 44px | WCAG AAA Touch Target |

### Navigation

| Variable | Wert |
|----------|------|
| `--navigation-header-height-desktop` | 80px |
| `--navigation-header-height-mobile` | 64px |
| `--navigation-drawer-width` | 280px |
| `--navigation-drawer-z-index` | 1000 |
| `--navigation-toggle-size` | 44px |

### Cards

| Variable | Wert |
|----------|------|
| `--card-padding` | var(--spacing-6) |
| `--card-radius` | var(--border-radius-lg) |
| `--card-gap` | var(--spacing-6) |
| `--card-shadow-default` | var(--shadow-sm) |
| `--card-shadow-hover` | var(--shadow-md) |

### Modal

| Variable | Wert |
|----------|------|
| `--modal-overlay-background` | rgba(0, 0, 0, 0.5) |
| `--modal-size-sm-width` | 400px |
| `--modal-size-md-width` | 600px |
| `--modal-size-lg-width` | 900px |
| `--modal-z-index` | 1000 |
| `--modal-animation-duration` | 200ms |

### Tooltip

| Variable | Wert |
|----------|------|
| `--tooltip-background` | var(--neutral-900) |
| `--tooltip-color` | var(--neutral-white) |
| `--tooltip-font-size` | var(--font-size-sm) |
| `--tooltip-delay` | 300ms |
| `--tooltip-z-index` | 1100 |

### Toast

| Variable | Wert |
|----------|------|
| `--toast-width` | 360px |
| `--toast-z-index` | 1200 |
| `--toast-duration-success` | 3000ms |
| `--toast-duration-info` | 4000ms |
| `--toast-duration-warning` | 5000ms |
| `--toast-duration-error` | 0ms |

### Loading

| Variable | Wert |
|----------|------|
| `--spinner-size-sm` | 16px |
| `--spinner-size-md` | 24px |
| `--spinner-size-lg` | 32px |
| `--spinner-size-xl` | 48px |
| `--spinner-delay` | 200ms |
| `--progress-height` | 8px |

## Vollständige Liste

**Generierte Datei:** `design-system/build/css/variables.css`

Diese Dokumentation zeigt die wichtigsten CSS-Variablen nach Kategorie. Die vollständige Liste aller ~315 CSS-Variablen mit allen Zustandsvarianten befindet sich in der generierten Datei.

**Verwendung:**
```css
.meine-komponente {
  /* Farben */
  background: var(--color-background-primary);
  color: var(--color-text-primary);

  /* Abstände */
  padding: var(--spacing-4);
  gap: var(--spacing-3);

  /* Typografie */
  font-family: var(--font-family-sans);
  font-size: var(--font-size-base);

  /* Effekte */
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-sm);
}
```

## Weiterführende Dokumentation

- [Design Tokens](./design-tokens.md) - Token-Architektur und Build-Prozess
- [Grid & Breakpoints](./grid-breakpoints.md) - Responsive Layout
