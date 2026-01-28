# Effects: Border Radius & Schatten

Die Effects im Hydrophon Design System umfassen Border Radius und Schatten (Elevation), die visuelle Tiefe und Hierarchie schaffen.

## Inhaltsverzeichnis

- [Border Radius](#border-radius)
- [Schatten (Elevation)](#schatten-elevation)
- [Elevation-Hierarchie](#elevation-hierarchie)
- [Kombinationen](#kombinationen)
- [Barrierefreiheit](#barrierefreiheit)

---

## Border Radius

Border Radius definiert die Rundung von Ecken und trägt zum modernen, zugänglichen Look des Design Systems bei.

### Border Radius Skala

| Token | Wert | Verwendung | Beispiel-Komponenten |
|-------|------|------------|---------------------|
| `borderRadius.none` | 0px | Keine Rundung | Divider, scharfe Kanten |
| `borderRadius.sm` | 2px | Subtile Rundung | Badges, Tags |
| `borderRadius.base` | 4px | Standard | **Buttons, Inputs** |
| `borderRadius.md` | 6px | Medium | Cards, kleinere Panels |
| `borderRadius.lg` | 8px | Groß | **Große Cards, Modals** |
| `borderRadius.xl` | 12px | Extra groß | Pills, große Elemente |
| `borderRadius.2xl` | 16px | 2XL | Feature Cards |
| `borderRadius.3xl` | 24px | 3XL | Dekorative Elemente |
| `borderRadius.full` | 9999px | Vollständig rund | **Avatare, Pill-Buttons** |

### Visuelle Beispiele

```
none (0px):
┌─────────┐
│         │
│         │
└─────────┘

sm (2px):
┌────────┐
│        │
│        │
└────────┘

base (4px):
╭────────╮
│        │
│        │
╰────────╯

md (6px):
╭────────╮
│        │
│        │
╰────────╯

lg (8px):
╭────────╮
│        │
│        │
╰────────╯

xl (12px):
╭───────╮
│       │
│       │
╰───────╯

2xl (16px):
╭──────╮
│      │
│      │
╰──────╯

full (9999px):
  ╭───╮
  │   │
  ╰───╯
```

### Verwendungsrichtlinien

**Buttons:**
- Standard-Buttons: `borderRadius.base` (4px)
- Pill-Buttons: `borderRadius.full` (9999px)
- Primäre Call-to-Action: `borderRadius.base` oder `borderRadius.md`

**Inputs & Forms:**
- Text Inputs: `borderRadius.base` (4px)
- Textareas: `borderRadius.base` (4px)
- Select Dropdowns: `borderRadius.base` (4px)

**Cards:**
- Kleine Cards: `borderRadius.md` (6px)
- Standard Cards: `borderRadius.lg` (8px)
- Feature Cards: `borderRadius.2xl` (16px)

**Badges & Tags:**
- Kompakte Badges: `borderRadius.sm` (2px)
- Pill-Badges: `borderRadius.full` (9999px)

**Modals & Dialogs:**
- Modals: `borderRadius.lg` (8px)
- Tooltips: `borderRadius.md` (6px)

**Avatare:**
- Runde Avatare: `borderRadius.full` (9999px)
- Quadratische Avatare: `borderRadius.md` (6px)

### Konsistenz-Regeln

1. **Einheitliche Rundung innerhalb Komponente**: Verwende dieselbe Rundung für alle Ecken einer Komponente (außer bei speziellen Design-Anforderungen)

2. **Hierarchische Konsistenz**: Ähnliche Komponenten sollten ähnliche Border Radius verwenden
   - Alle Buttons: `borderRadius.base`
   - Alle Cards: `borderRadius.lg` oder `borderRadius.md`

3. **Nicht mischen**: Vermeide es, zu viele verschiedene Border Radius-Werte auf einer Seite zu verwenden

---

## Schatten (Elevation)

Schatten erzeugen visuelle Tiefe und kommunizieren die Hierarchie und Interaktivität von Elementen. Das Hydrophon Shadow System verwendet moderne, subtile Schatten für einen professionellen B2B-Look.

### Shadow Skala

| Token | Wert | Elevation | Verwendung |
|-------|------|-----------|------------|
| `shadow.none` | none | 0 | Flache Elemente |
| `shadow.sm` | `0 1px 2px rgba(0,0,0,0.05)` | 1 | Minimale Tiefe |
| `shadow.base` | `0 1px 3px rgba(0,0,0,0.1), 0 1px 2px -1px rgba(0,0,0,0.1)` | 2 | **Standard Elevation** |
| `shadow.md` | `0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)` | 3 | Erhöhte Elemente |
| `shadow.lg` | `0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)` | 4 | Schwebende Elemente |
| `shadow.xl` | `0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)` | 5 | Modals, Dialogs |
| `shadow.2xl` | `0 25px 50px -12px rgba(0,0,0,0.25)` | 6 | Dramatische Elevation |
| `shadow.inner` | `inset 0 2px 4px rgba(0,0,0,0.05)` | - | Eingepresste Elemente |

### Semantische Elevation Tokens

Für konsistente Verwendung gibt es semantische Tokens:

| Token | Referenz | Verwendung |
|-------|----------|------------|
| `elevation.card` | `shadow.base` | Cards im Ruhezustand |
| `elevation.cardHover` | `shadow.md` | Cards beim Hover |
| `elevation.dropdown` | `shadow.lg` | Dropdown-Menüs |
| `elevation.modal` | `shadow.xl` | Modale Dialoge |
| `elevation.tooltip` | `shadow.md` | Tooltips |

### Visuelle Beispiele

**Shadow None:**
```
┌────────────┐
│            │  Keine Elevation
│            │
└────────────┘
```

**Shadow SM (Subtle):**
```
┌────────────┐
│            │  Minimale Tiefe
│            │  (z.B. Input Fields)
└────────────┘
  ░
```

**Shadow Base (Standard):**
```
┌────────────┐
│            │  Standard Card
│            │
└────────────┘
  ░░
```

**Shadow MD (Elevated):**
```
┌────────────┐
│            │  Hover State
│            │  Dropdowns
└────────────┘
  ░░░
```

**Shadow LG (Floating):**
```
┌────────────┐
│            │  Floating Menus
│            │  Popovers
└────────────┘
  ░░░░
```

**Shadow XL (Modal):**
```
┌────────────┐
│            │  Modal Dialogs
│            │  Overlays
└────────────┘
  ░░░░░
```

**Shadow 2XL (Dramatic):**
```
┌────────────┐
│            │  Feature Spotlights
│            │  Hero Elements
└────────────┘
  ░░░░░░░
```

**Shadow Inner:**
```
┌────────────┐
│  ░░        │  Eingepresste Flächen
│  ░░        │  (z.B. aktive Buttons)
└────────────┘
```

### Verwendungsrichtlinien

**Inputs:**
- Ruhezustand: `shadow.sm` (subtile Tiefe)
- Fokus: `shadow.md` + Border (erhöhte Aufmerksamkeit)

**Cards:**
- Standard: `elevation.card` (shadow.base)
- Hover: `elevation.cardHover` (shadow.md)
- Aktiv/Ausgewählt: `shadow.lg` (erhöhte Elevation)

**Dropdowns & Menus:**
- Dropdown-Menüs: `elevation.dropdown` (shadow.lg)
- Context-Menüs: `shadow.lg`
- Mega-Menus: `shadow.xl`

**Modals & Dialogs:**
- Standard Modals: `elevation.modal` (shadow.xl)
- Full-Screen Overlays: `shadow.2xl`

**Tooltips:**
- Tooltips: `elevation.tooltip` (shadow.md)
- Popovers: `shadow.md` oder `shadow.lg`

**Buttons:**
- Flache Buttons: `shadow.none`
- Raised Buttons: `shadow.sm`
- Floating Action Buttons: `shadow.md` (hover: `shadow.lg`)

---

## Elevation-Hierarchie

Schatten kommunizieren die Ebene eines Elements im visuellen Stapel. Je höher die Elevation, desto näher erscheint das Element zum Nutzer.

### Z-Depth Konzept

```
Layer 6 (2xl):    Feature Spotlights, Hero
                  ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
Layer 5 (xl):     Modals, Full Dialogs
                  ▔▔▔▔▔▔▔▔▔▔▔▔▔▔
Layer 4 (lg):     Floating Menus, Dropdowns
                  ▔▔▔▔▔▔▔▔▔▔
Layer 3 (md):     Hover States, Tooltips
                  ▔▔▔▔▔▔
Layer 2 (base):   Cards, Panels
                  ▔▔▔
Layer 1 (sm):     Inputs, subtle depth
                  ▔
Layer 0 (none):   Page Background, Flat Elements
                  ▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
```

### Interaktivität durch Schatten

Schatten kommunizieren Interaktivität:

**Statische Elemente:**
- Keine oder minimale Schatten (`none` oder `sm`)
- Beispiel: Text-Container, statische Panels

**Klickbare Elemente:**
- Leichte Schatten im Ruhezustand (`base`)
- Erhöhte Schatten beim Hover (`md`)
- Beispiel: Cards, Buttons

**Schwebende/Floating Elemente:**
- Starke Schatten (`lg` oder `xl`)
- Beispiel: Dropdown-Menüs, Modals

### Layering Order (Z-Index)

Die visuelle Schichtung sollte der Elevation entsprechen:

```
Z-Index Empfehlungen:
- Base content:     z-index: 0
- Cards:            z-index: 1
- Sticky elements:  z-index: 10
- Dropdowns:        z-index: 100
- Tooltips:         z-index: 200
- Modals:           z-index: 1000
- Toast/Alerts:     z-index: 2000
```

---

## Kombinationen

Empfohlene Kombinationen von Border Radius und Shadow für häufige Komponenten.

### Cards

**Standard Card:**
```css
border-radius: borderRadius.lg (8px)
box-shadow: elevation.card (shadow.base)
```

**Card Hover:**
```css
border-radius: borderRadius.lg (8px)
box-shadow: elevation.cardHover (shadow.md)
transition: box-shadow 0.2s ease
```

**Feature Card:**
```css
border-radius: borderRadius.2xl (16px)
box-shadow: shadow.lg
```

### Buttons

**Primary Button:**
```css
border-radius: borderRadius.base (4px)
box-shadow: shadow.sm (optional)
```

**Primary Button Hover:**
```css
border-radius: borderRadius.base (4px)
box-shadow: shadow.md
transition: box-shadow 0.15s ease
```

**Pill Button:**
```css
border-radius: borderRadius.full (9999px)
box-shadow: shadow.none oder shadow.sm
```

### Inputs

**Text Input:**
```css
border-radius: borderRadius.base (4px)
box-shadow: shadow.sm
```

**Input Focus:**
```css
border-radius: borderRadius.base (4px)
box-shadow: shadow.md + border-color (focus ring)
```

### Modals

**Modal Dialog:**
```css
border-radius: borderRadius.lg (8px)
box-shadow: elevation.modal (shadow.xl)
```

**Backdrop:**
```css
background: rgba(0, 0, 0, 0.5)
backdrop-filter: blur(4px) (optional)
```

### Dropdowns

**Dropdown Menu:**
```css
border-radius: borderRadius.md (6px)
box-shadow: elevation.dropdown (shadow.lg)
```

### Hover State Transitions

**Empfohlene Transition:**
```css
transition: box-shadow 0.2s ease, transform 0.2s ease;
```

**Beispiel Card Hover:**
```css
.card {
  box-shadow: elevation.card;
  transition: box-shadow 0.2s ease, transform 0.2s ease;
}

.card:hover {
  box-shadow: elevation.cardHover;
  transform: translateY(-2px);
}
```

### Focus States

Für Barrierefreiheit sollten Focus States zusätzlich zu Schatten einen sichtbaren Fokus-Ring haben:

```css
.button:focus-visible {
  outline: 2px solid [primary-color];
  outline-offset: 2px;
  box-shadow: shadow.md;
}
```

---

## Barrierefreiheit

### Schatten sind nicht der einzige Indikator

Schatten allein sollten **nicht** der einzige Indikator für Interaktivität oder Hierarchie sein:

1. **Kombiniere mit Borders**: Nutze zusätzlich Border oder Outline für bessere Sichtbarkeit
2. **Farbkontrast**: Stelle sicher, dass Elemente auch ohne Schatten unterscheidbar sind
3. **Focus States**: Verwende deutliche Focus-Indikatoren (nicht nur Schatten)

### Low-Vision Unterstützung

Für Nutzer mit eingeschränktem Sehvermögen:

**Border-Alternativen:**
```css
/* Zusätzlich zu Schatten */
.card {
  box-shadow: elevation.card;
  border: 1px solid rgba(0, 0, 0, 0.1);
}
```

**High Contrast Modus:**
```css
@media (prefers-contrast: high) {
  .card {
    border: 2px solid currentColor;
    box-shadow: none; /* Schatten in High Contrast ausblenden */
  }
}
```

### Reduced Motion

Für Nutzer, die Animationen reduzieren möchten:

```css
@media (prefers-reduced-motion: reduce) {
  .card {
    transition: none;
  }
}
```

### Focus-Visible

Nutze `:focus-visible` statt `:focus` für bessere Tastatur-Navigation:

```css
.button:focus-visible {
  outline: 2px solid [primary-color];
  outline-offset: 2px;
}
```

### ARIA und Semantik

Schatten sind rein visuell. Stelle sicher, dass semantische HTML-Elemente und ARIA-Attribute die Bedeutung kommunizieren:

```html
<!-- Gut: Semantisches HTML -->
<button aria-pressed="false">...</button>

<!-- Schlecht: Nur visuelles Styling -->
<div class="button-like">...</div>
```

---

## Zusammenfassung

**Border Radius:**
- 9 Werte von `none` (0px) bis `full` (9999px)
- Standard für Buttons und Inputs: `base` (4px)
- Standard für Cards: `lg` (8px)
- Vollständig rund für Avatare: `full` (9999px)

**Schatten:**
- 7 Elevation-Level plus `inner` für eingepresste Elemente
- Semantische Tokens für konsistente Verwendung
- Subtile Schatten für professionellen B2B-Look

**Best Practices:**
- Kombiniere Border Radius und Schatten konsistent
- Nutze Hover-Transitions für Interaktivität
- Schatten nicht als einziger Indikator für Hierarchie
- Focus States für Barrierefreiheit

**Verwendung:**
Designer und Entwickler nutzen diese Effects-Tokens für konsistente visuelle Tiefe und moderne UI-Elemente.
