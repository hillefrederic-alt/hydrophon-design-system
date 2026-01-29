# Design Tokens

Zentrale Quelle für alle Gestaltungswerte im Hydrophon Design-System.

## Was sind Design Tokens?

Design Tokens sind benannte Variablen für Gestaltungswerte wie Farben, Abstände und Schriftgrößen. Sie ermöglichen konsistente Gestaltung und einfache Anpassungen.

**Beispiel:**
```json
// Token-Definition
{
  "hydrophon": {
    "blau": {
      "500": {
        "$value": "#008BD2",
        "$type": "color"
      }
    }
  }
}
```
```css
/* CSS-Variable (generiert) */
--hydrophon-blau-500: #008bd2;
```

## Token-Architektur

### Drei Ebenen

```
Primitive Tokens    ->    Semantic Tokens    ->    Component Tokens
(Basis-Werte)             (Bedeutung)              (Verwendung)

hydrophon.blau.500  ->    color.action.primary  ->  button.primary.background.default
#008bd2                   (Primäre Aktion)          (Primary Button Hintergrund)
```

**Warum drei Ebenen?**
- **Primitives:** Reine Werte ohne Kontext (Farbskala 50-900)
- **Semantics:** Bedeutung im System (action, error, surface)
- **Components:** Konkrete Anwendung (button, input, modal)

Diese Architektur ermöglicht Flexibilität: Änderungen an Primitive Tokens propagieren automatisch durch das gesamte System, während Semantic und Component Tokens die Bedeutung klar kommunizieren.

## Token-Dateien

| Datei | Inhalt | Tokens |
|-------|--------|--------|
| `colors.json` | Farbpalette, Produktlinien, Semantische Farben | ~80 |
| `typography.json` | Schriftfamilien, Größen, Gewichte | ~25 |
| `spacing.json` | Abstände, Grid, Breakpoints | ~30 |
| `effects.json` | Schatten, Rundungen | ~15 |
| `buttons.json` | Button-Varianten und -Zustände | ~50 |
| `forms.json` | Formular-Komponenten | ~50 |
| `navigation.json` | Header, Footer, Breadcrumb | ~25 |
| `feedback.json` | Modal, Toast, Tooltip, Loading | ~40 |

**Gesamt:** ~315 Design Tokens

Alle Token-Dateien befinden sich in `design-system/tokens/`.

## Token-Format

Wir verwenden das W3C Design Tokens Community Group (DTCG) Format:

```json
{
  "token-name": {
    "$value": "wert",
    "$type": "color|dimension|fontFamily|..."
  }
}
```

**Unterstützte Typen:**
- `color` - Farbwerte (#hex, rgb, hsl)
- `dimension` - Größen (px, rem)
- `fontFamily` - Schriftfamilien
- `fontWeight` - Schriftgewichte
- `number` - Zahlen (z.B. line-height)
- `duration` - Zeitwerte (ms, s)
- `shadow` - Schatteneffekte

## Referenzen (Aliase)

Tokens können andere Tokens referenzieren:

```json
{
  "button": {
    "primary": {
      "background": {
        "default": {
          "$value": "{hydrophon.blau.500}",
          "$type": "color"
        }
      }
    }
  }
}
```

Die `{token.pfad}` Syntax erstellt Verknüpfungen. Ändert sich `hydrophon.blau.500`, aktualisieren sich alle Referenzen automatisch.

**Beispiel aus generierten CSS:**
```css
--button-primary-background-default: var(--color-action-primary);
--color-action-primary: var(--hydrophon-blau-500);
--hydrophon-blau-500: #008bd2;
```

Diese Kette ermöglicht Theme-Anpassungen auf jeder Ebene.

## Build-Prozess

### Style Dictionary

Token-Kompilierung mit Style Dictionary:

```bash
# Installation (einmalig)
npm install

# Tokens kompilieren
npm run build
```

**Ausgabe:**
```
design-system/build/
├── css/
│   └── variables.css    # CSS Custom Properties
└── json/
    └── tokens.json      # Flaches JSON für Tools
```

### Konfiguration

`config.json`:
```json
{
  "source": ["tokens/**/*.json"],
  "platforms": {
    "css": {
      "transformGroup": "css",
      "buildPath": "build/css/",
      "files": [{
        "destination": "variables.css",
        "format": "css/variables",
        "options": {
          "outputReferences": true
        }
      }]
    }
  }
}
```

**outputReferences: true** bedeutet, dass CSS-Variablen Referenzen erhalten:
```css
--button-primary-background-default: var(--hydrophon-blau-500);
```

Statt direkt eingebettete Werte:
```css
--button-primary-background-default: #008bd2;
```

Dies erhält die Token-Beziehungen und ermöglicht einfachere Theme-Anpassungen.

## Verwendung

### CSS importieren

```css
@import 'design-system/build/css/variables.css';

.meine-komponente {
  background-color: var(--color-background-primary);
  padding: var(--spacing-4);
  border-radius: var(--border-radius-md);
}
```

### HTML (Link-Tag)

```html
<link rel="stylesheet" href="design-system/build/css/variables.css">
```

### JavaScript/TypeScript

```javascript
// JSON-Tokens für Runtime-Zugriff
import tokens from 'design-system/build/json/tokens.json';

const primaryColor = tokens['hydrophon-blau-500'];
```

## Best Practices

### Immer Semantic Tokens verwenden

```css
/* ✅ Gut - Semantische Bedeutung klar */
.button {
  background: var(--color-action-primary);
}

/* ❌ Schlecht - Primitive Token direkt */
.button {
  background: var(--hydrophon-blau-500);
}
```

### Spacing-Skala nutzen

```css
/* ✅ Gut - Token aus Spacing-System */
.card {
  padding: var(--spacing-6);
  gap: var(--spacing-4);
}

/* ❌ Schlecht - Hartcodierte Werte */
.card {
  padding: 24px;
  gap: 16px;
}
```

### Responsive Anpassungen

```css
/* Mobile */
.section {
  padding: var(--spacing-12) var(--spacing-4);
}

/* Desktop */
@media (min-width: 1024px) {
  .section {
    padding: var(--spacing-24) var(--spacing-8);
  }
}
```

## Weiterführende Dokumentation

- [CSS-Variablen Referenz](./css-variables.md) - Vollständige Variable-Liste
- [Grid & Breakpoints](./grid-breakpoints.md) - Responsive Layout
