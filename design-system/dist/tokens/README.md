# @hydrophon/design-tokens v1.0.0

Design-Tokens des Hydrophon Design Systems als verteilbares NPM-Paket.

Enthält alle Design-Tokens aus dem Hydrophon Design System: Farben, Typografie, Spacing, Effekte und Komponenten-Tokens für Buttons, Forms, Navigation und Feedback.

## Installation

```bash
# NPM
npm install @hydrophon/design-tokens

# Yarn
yarn add @hydrophon/design-tokens

# pnpm
pnpm add @hydrophon/design-tokens
```

### Direkte Einbindung (ohne npm)

Kopieren Sie den `dist/tokens` Ordner in Ihr Projekt und referenzieren Sie die Dateien direkt:

```html
<link rel="stylesheet" href="./tokens/css/variables.css">
```

## Verwendung

### CSS Variables

Import alle CSS Custom Properties in Ihre Stylesheet-Datei:

```css
/* Import in CSS */
@import '@hydrophon/design-tokens/css';

/* Verwendung */
.button {
  background-color: var(--hydrophon-blau-500);
  color: var(--neutral-0);
  padding: var(--spacing-3) var(--spacing-4);
  border-radius: var(--border-radius-sm);
  font-family: var(--font-family-primary);
  font-size: var(--font-size-md);
}

.card {
  background: var(--neutral-0);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--neutral-200);
}
```

Oder binden Sie die CSS-Datei direkt in HTML ein:

```html
<link rel="stylesheet" href="node_modules/@hydrophon/design-tokens/css/variables.css">
```

### SCSS

Import SCSS Variables in Ihre Sass-Dateien:

```scss
// Import mit @use (modern)
@use '@hydrophon/design-tokens/scss' as tokens;

.button {
  background-color: tokens.$hydrophon-blau-500;
  color: tokens.$neutral-0;
  padding: tokens.$spacing-3 tokens.$spacing-4;
  border-radius: tokens.$border-radius-sm;
}

// Oder mit @import (legacy)
@import '@hydrophon/design-tokens/scss';

.card {
  background: $neutral-0;
  box-shadow: $shadow-sm;
}
```

### JavaScript (ESM)

Import Tokens als JavaScript-Objekt in modernen Projekten:

```javascript
// Default Import
import tokens from '@hydrophon/design-tokens';

console.log(tokens.hydrophon.blau[500].value); // '#008bd2'
console.log(tokens.spacing[4].value); // '16px'

// Named Import
import { tokens } from '@hydrophon/design-tokens';

// Zugriff auf verschachtelte Struktur
const primaryColor = tokens.hydrophon.blau[500].value;
const buttonPadding = tokens.spacing[3].value;
```

### JavaScript (CommonJS)

Import für Node.js und Legacy-Projekte:

```javascript
const tokens = require('@hydrophon/design-tokens');

console.log(tokens.hydrophon.blau[500].value); // '#008bd2'
console.log(tokens.typography.heading.h1.value); // Object mit fontSize, lineHeight, fontWeight
```

### JSON

Direkter Import der JSON-Datei:

```javascript
import tokenData from '@hydrophon/design-tokens/json';
```

## Enthaltene Tokens

| Kategorie | Anzahl | Beschreibung |
|-----------|--------|--------------|
| **Farben** | ~60 | Markenfarben (Hydrophon Blau, Gluy Grün, Hydropex Rot), Graustufen, Semantische Farben (success, info, warning, error) |
| **Typografie** | ~30 | Schriftfamilien (Inter), Font-Größen (xs bis 6xl), Gewichte, Zeilenhöhen |
| **Spacing** | ~15 | Abstände basierend auf 4px Basis-Einheit (0.5 bis 20) |
| **Grid & Layout** | ~10 | Grid-Spalten, Container-Breiten, Breakpoints |
| **Effekte** | ~20 | Border-Radius (sm, md, lg, xl, 2xl, round), Schatten (xs bis 2xl), Übergänge |
| **Buttons** | ~50 | Button-Varianten (primary, secondary, tertiary), Größen (small, medium, large), Zustände (hover, focus, disabled) |
| **Forms** | ~100+ | Input, Textarea, Select, Checkbox, Radio, Validation-Zustände |
| **Navigation** | ~50 | Header, Footer, Breadcrumb, Mobile Drawer |
| **Feedback** | ~50 | Modal, Tooltip, Toast, Loading (Spinner, Progress, Skeleton) |

**Gesamt:** ~400+ Design-Tokens

## Token-Struktur

Alle Tokens folgen dem [W3C Design Tokens Community Group](https://tr.designtokens.org/format/) (DTCG) Format:

```json
{
  "hydrophon": {
    "blau": {
      "500": {
        "$type": "color",
        "$value": "#008bd2"
      }
    }
  },
  "spacing": {
    "4": {
      "$type": "dimension",
      "$value": "16px"
    }
  }
}
```

### Token-Hierarchie

Die Tokens sind in einer 3-stufigen Hierarchie organisiert:

1. **Primitive Tokens:** Basis-Werte (Farben 50-900, Spacing 0-20, Font-Größen)
2. **Semantische Tokens:** Zweck-bezogene Aliase (color.primary, spacing.md)
3. **Komponenten-Tokens:** Spezifische Komponenten-Werte (button.primary.background)

Diese Struktur ermöglicht:
- **Konsistenz:** Änderungen an Basis-Werten propagieren automatisch
- **Flexibilität:** Semantische Layer können angepasst werden
- **Skalierbarkeit:** Neue Komponenten nutzen bestehende Semantik

## Versionen

### v1.0.0 (aktuell)

Erste stabile Version mit kompletten Design-Tokens aus Phasen 1-5:
- Phase 1: Foundation & Brand Identity
- Phase 2: Icons & Basic Interactions
- Phase 3: Forms & Data Input
- Phase 4: Navigation & Content Structure
- Phase 5: Feedback & System Responses

## Updates

Um auf eine neue Version zu aktualisieren:

```bash
npm install @hydrophon/design-tokens@latest
```

Nach dem Update:
1. Prüfen Sie die Changelog-Datei auf Breaking Changes
2. Testen Sie Ihre Komponenten mit den neuen Token-Werten
3. Führen Sie `npm run build` aus, um aktualisierte CSS/SCSS zu generieren

## Dokumentation

Die vollständige Dokumentation des Hydrophon Design Systems finden Sie unter:

**Repository:** [github.com/hydrophon/design-system](https://github.com/hydrophon/design-system)

**Dokumentation:** `docs/` Ordner im Repository mit:
- Komponenten-Dokumentation (Buttons, Forms, Navigation, etc.)
- Verwendungsbeispiele für Marketing, Designer und Entwickler
- Accessibility Guidelines (WCAG 2.1 AA konform)
- Technische Referenz und Best Practices

## Support

Bei Fragen oder Problemen:
- **Issues:** [GitHub Issues](https://github.com/hydrophon/design-system/issues)
- **Interne Kontakte:** Design-Team oder Entwickler-Team

## Lizenz

UNLICENSED - Nur für interne Verwendung bei Hydrophon Kunststoff GmbH
