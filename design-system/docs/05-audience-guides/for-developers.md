# Für Entwickler

Technische Spezifikationen, Design Tokens und CSS-Variablen.

## Quick Start

### Design Tokens einbinden

```css
/* CSS-Variablen importieren */
@import 'design-system/build/css/variables.css';

/* Verwendung */
.button-primary {
  background-color: var(--button-primary-background-default);
  color: var(--button-primary-foreground-default);
}
```

### Token-Dateien

| Format | Pfad | Verwendung |
|--------|------|------------|
| JSON (Quelle) | `design-system/tokens/*.json` | Token-Definitionen |
| CSS Variables | `design-system/build/css/variables.css` | Web-Projekte |

**Verfügbare Token-Dateien:**
- `colors.json` - Farbpalette (Primär, Sekundär, Funktionale Farben)
- `typography.json` - Schriftsystem (Größen, Gewichte, Zeilenhöhen)
- `spacing.json` - Abstands-System (4px-Basis, 0-64px)
- `buttons.json` - Button-Tokens (Primary, Secondary, Tertiary)
- `forms.json` - Formular-Tokens (Input, Checkbox, Radio, Textarea, Select)
- `navigation.json` - Navigation-Tokens (Header, Breadcrumb, Footer, Drawer)
- `feedback.json` - Feedback-Tokens (Modal, Tooltip, Toast, Loading)

## Technische Referenz

**Technische Referenz-Dokumentation:**

- [Design Tokens](../04-technical-reference/design-tokens.md) - Token-Struktur, Verwendung, W3C DTCG Format
- [CSS-Variablen](../04-technical-reference/css-variables.md) - Vollständige Variablen-Referenz mit Kategorien
- [Grid & Breakpoints](../04-technical-reference/grid-breakpoints.md) - 12-Spalten-Grid, Responsive Breakpoints

**Token-Quelldateien:**
- `design-system/tokens/*.json` (Quelldateien)
- `design-system/build/css/variables.css` (Generierte CSS-Variablen)

### Grid & Breakpoints

**Grid-System:** 12 Spalten (definiert in `spacing-grid.md`)

**Responsive Breakpoints:**
```css
/* Mobile: 320px - 767px */
/* Tablet: 768px - 1023px */
/* Desktop: 1024px+ */
```

**Gutter-Spacing:**
- Mobile: 16px (`var(--spacing-4)`)
- Tablet: 24px (`var(--spacing-6)`)
- Desktop: 32px (`var(--spacing-8)`)

Siehe: [Spacing & Grid Documentation](../spacing-grid.md)

## Komponenten-Spezifikationen

### Formulare

Jede Komponente dokumentiert States, ARIA-Attribute und Keyboard-Navigation:

- [Text-Input Specs](../forms/text-input.md#technische-spezifikation)
- [Textarea Specs](../forms/textarea.md)
- [Select Specs](../forms/select.md)
- [Checkbox Specs](../forms/checkbox.md)
- [Radio Button Specs](../forms/radio-button.md)
- [Validation Patterns](../forms/validation.md)

→ [Formular-Index](../forms/index.md)

**Progressive Validation Pattern:**
```javascript
// onBlur initially, onChange after error
const [touched, setTouched] = useState(false);
const [error, setError] = useState(null);

const handleBlur = () => {
  setTouched(true);
  validate(value);
};

const handleChange = (e) => {
  setValue(e.target.value);
  if (touched) validate(e.target.value); // Real-time after first error
};
```

### Navigation

Focus-Management und ARIA-Patterns:

- [Header](../navigation/header.md) - Sticky Desktop, Logo + Nav Links
- [Mobile Drawer](../navigation/mobile-drawer.md) - Focus Trap, ESC-Handling, Transform Animation
- [Breadcrumb](../navigation/breadcrumb.md) - aria-current, Chevron-Separator
- [Footer](../navigation/footer.md) - CSS Grid, Multiple nav landmarks

→ [Navigation-Index](../navigation/index.md)

**Focus Trap Pattern (Modal/Drawer):**
```javascript
// Focus moves to first interactive element on open
// Tab wraps within container
// ESC closes (WCAG 2.1.2 No Keyboard Trap)
```

### Feedback

Modal-Patterns, Toast-Timing, Loading States:

- [Modal (Radix UI recommended)](../feedback/modal.md)
- [Toast (Sonner recommended)](../feedback/toast.md)
- [Tooltip (Floating UI)](../feedback/tooltip.md)
- [Loading States](../feedback/loading.md)

→ [Feedback-Index](../feedback/index.md)

**Toast Auto-Dismiss Timing:**
```javascript
{
  success: 3000,  // 3s - Quick confirmation
  info: 4000,     // 4s - More read time
  warning: 5000,  // 5s - Important
  error: 0        // Never auto-dismiss (requires acknowledgment)
}
```

### Buttons

- [Button Component](../buttons.md) - Variants, Sizes, Icon Integration

**Button States:** default, hover, active, focus, disabled
**Sizes:** small (32px), medium (40px), large (48px)
**Variants:** primary, secondary, tertiary

## Accessibility Implementation

### WCAG 2.1 AA Compliance

**Kritische ARIA-Patterns:**

| Komponente | Pattern | Beispiel |
|------------|---------|----------|
| Modal | `role="dialog"`, `aria-modal="true"`, Focus Trap | `<div role="dialog" aria-modal="true">` |
| Toast | `role="status"` (success/info), `role="alert"` (warning/error) | `<div role="alert">` |
| Breadcrumb | `aria-current="page"` auf aktuellem Element | `<a aria-current="page">` |
| Mobile Drawer | `aria-expanded`, `aria-controls`, ESC zum Schließen | `<button aria-expanded="false" aria-controls="drawer">` |
| Checkbox/Radio | `required`, `aria-required`, `aria-invalid`, `aria-describedby` | `<input aria-describedby="error-msg">` |

**Touch Targets:**
- Minimum: 44x44px (WCAG 2.5.5 Level AAA)
- Desktop compact: 32px acceptable for dense interfaces

**Focus Indicators:**
- 2px outline + 2px offset (`:focus-visible`)
- Color: `var(--hydrophon-blau-300)` (3:1 contrast)

**Color Contrast:**
- Text: 4.5:1 minimum (WCAG 1.4.3)
- UI Components: 3:1 minimum (WCAG 1.4.11)

### Testing Guide

Vollständige Anleitung für Accessibility-Tests:
→ [Accessibility Testing Guide](../03-accessibility/testing-guide.md) - axe DevTools, Keyboard-Testing, Screen Reader Testing

**Schnelltest-Checkliste:**
1. Keyboard-Navigation: Alle interaktiven Elemente erreichbar via Tab
2. Focus-Indikatoren: Sichtbar bei `:focus-visible`
3. Screen Reader: VoiceOver/NVDA kann alle Elemente ankündigen
4. Color Contrast: Browser DevTools Contrast Checker
5. Touch Targets: Minimum 44x44px auf mobilen Geräten

## Build-Prozess

### Style Dictionary

**Installation:**
```bash
npm install style-dictionary
```

**Token kompilieren:**
```bash
cd design-system
npm run build
```

**Ausgabe:**
- `design-system/build/css/variables.css` - CSS Custom Properties

**Konfiguration:** `design-system/config.json`

### Token-Struktur

```
design-system/tokens/
├── colors.json       # Farbpalette (50-900 Abstufungen)
├── typography.json   # Schriften (Inter), Größen, Gewichte
├── spacing.json      # 4px-Basis-Abstände (0-64px)
├── buttons.json      # Button-Tokens (Primary/Secondary/Tertiary)
├── forms.json        # Input, Checkbox, Radio, Textarea, Select
├── navigation.json   # Header, Breadcrumb, Footer, Mobile Drawer
└── feedback.json     # Modal, Tooltip, Toast, Spinner, Progress
```

**Token-Format (W3C DTCG):**
```json
{
  "color": {
    "primary": {
      "$value": "#0066cc",
      "$type": "color"
    }
  }
}
```

### CSS-Variablen Verwendung

**Generated Output:**
```css
:root {
  --color-primary: #0066cc;
  --button-primary-background-default: var(--color-primary);
}
```

**In Komponenten:**
```css
.my-button {
  background-color: var(--button-primary-background-default);
  padding: var(--button-padding-medium);
  border-radius: var(--button-border-radius);
}
```

## Empfohlene Libraries

**UI Primitives:**
- **Radix UI** (Modal, Tooltip): Battle-tested accessibility, headless styling
- **Floating UI** (Tooltip positioning): Smart viewport collision detection

**Notifications:**
- **Sonner** (Toast): Modern toast library, pause-on-hover, ARIA live regions

**Loading:**
- **react-loading-skeleton**: Auto-sizing skeleton screens, prevents layout shift

**Icons:**
- **Lucide React**: 1000+ icons, 2px stroke, customizable, tree-shakeable

## Komponenten-Dokumentation

Jede Komponente enthält:

1. **Übersicht** - Wann verwenden, visuelle Beispiele
2. **Varianten** - Alle verfügbaren Optionen
3. **Technische Spezifikation** - States, Tokens, Maße
4. **Accessibility** - ARIA-Patterns, Keyboard Navigation, Screen Reader
5. **Verwendungsbeispiele** - Code-Snippets
6. **Do's and Don'ts** - Best Practices

**Alle Komponenten-Dokumente:**
- [Foundation](../colors.md) | [Typography](../typography.md) | [Spacing](../spacing-grid.md) | [Effects](../effects.md) | [Icons](../icons.md)
- [Buttons](../buttons.md)
- [Forms](../forms/index.md): Text Input, Textarea, Select, Checkbox, Radio, Labels, Validation
- [Navigation](../navigation/index.md): Header, Mobile Drawer, Breadcrumb, Footer
- [Components](../components/): Product Card, Content Card, Data Table
- [Feedback](../feedback/index.md): Modal, Tooltip, Toast, Loading

---

**Zielgruppe:** Frontend-Entwickler, Full-Stack Engineers
**Zweck:** Schneller technischer Einstieg mit Code-Beispielen, Token-Referenz und ARIA-Patterns
