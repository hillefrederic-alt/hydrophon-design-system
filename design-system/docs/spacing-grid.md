# Spacing & Grid System

Das Spacing- und Grid-System bildet die Grundlage für konsistente räumliche Beziehungen im Hydrophon Design System.

## Inhaltsverzeichnis

- [Spacing-Skala](#spacing-skala)
- [Spacing-Anwendung](#spacing-anwendung)
- [Grid-System](#grid-system)
- [Breakpoints](#breakpoints)
- [Gutters & Margins](#gutters--margins)
- [Responsives Verhalten](#responsives-verhalten)

---

## Spacing-Skala

Das Spacing-System basiert auf einer **4px Base Unit**. Alle Abstände sind Vielfache dieser Grundeinheit, um ein harmonisches, rhythmisches Layout zu gewährleisten.

### Komplette Skala

| Token | Wert | Multiplikator | Verwendung |
|-------|------|---------------|------------|
| `spacing.0` | 0px | 0x | Kein Abstand |
| `spacing.0.5` | 2px | 0.5x | Extra feine Abstände |
| `spacing.1` | 4px | 1x | **Base Unit** - kleinster Abstand |
| `spacing.1.5` | 6px | 1.5x | Minimale Abstände |
| `spacing.2` | 8px | 2x | Extra kleine Abstände |
| `spacing.2.5` | 10px | 2.5x | Kleine-mittlere Abstände |
| `spacing.3` | 12px | 3x | Kleine Abstände |
| `spacing.4` | 16px | 4x | **Standard Padding** |
| `spacing.5` | 20px | 5x | Mittlere Abstände |
| `spacing.6` | 24px | 6x | Große Abstände |
| `spacing.7` | 28px | 7x | Extra große Abstände |
| `spacing.8` | 32px | 8x | 2XL Abstände |
| `spacing.9` | 36px | 9x | 2.5XL Abstände |
| `spacing.10` | 40px | 10x | 3XL Abstände |
| `spacing.11` | 44px | 11x | 3.5XL Abstände |
| `spacing.12` | 48px | 12x | 4XL Abstände |
| `spacing.14` | 56px | 14x | 5XL Abstände |
| `spacing.16` | 64px | 16x | 6XL Abstände - Sektionen |
| `spacing.20` | 80px | 20x | 7XL Abstände |
| `spacing.24` | 96px | 24x | 8XL Abstände |
| `spacing.28` | 112px | 28x | 9XL Abstände |
| `spacing.32` | 128px | 32x | 10XL Abstände - große Sektionen |

### Visuelle Darstellung

```
spacing.1  ▮ (4px)
spacing.2  ▮▮ (8px)
spacing.4  ▮▮▮▮ (16px)
spacing.6  ▮▮▮▮▮▮ (24px)
spacing.8  ▮▮▮▮▮▮▮▮ (32px)
spacing.12 ▮▮▮▮▮▮▮▮▮▮▮▮ (48px)
spacing.16 ▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮ (64px)
```

---

## Spacing-Anwendung

### Component Padding

**Buttons:**
- Kompakte Buttons: `padding: spacing.2 spacing.4` (8px 16px)
- Standard Buttons: `padding: spacing.3 spacing.6` (12px 24px)
- Große Buttons: `padding: spacing.4 spacing.8` (16px 32px)

**Inputs:**
- Kompakte Inputs: `padding: spacing.2 spacing.3` (8px 12px)
- Standard Inputs: `padding: spacing.3 spacing.4` (12px 16px)
- Große Inputs: `padding: spacing.4 spacing.6` (16px 24px)

**Cards:**
- Kompakte Cards: `padding: spacing.4` (16px)
- Standard Cards: `padding: spacing.6` (24px)
- Große Cards: `padding: spacing.8` (32px)

### Section Margins

**Zwischen Komponenten:**
- Eng: `spacing.2` - `spacing.4` (8px - 16px)
- Standard: `spacing.6` - `spacing.8` (24px - 32px)
- Weit: `spacing.12` - `spacing.16` (48px - 64px)

**Zwischen Sektionen:**
- Standard: `spacing.12` - `spacing.16` (48px - 64px)
- Große Sektionen: `spacing.20` - `spacing.32` (80px - 128px)

### Gap zwischen Elementen

**Listen & Gruppen:**
- Kompakte Listen: `gap: spacing.1` - `spacing.2` (4px - 8px)
- Standard Listen: `gap: spacing.3` - `spacing.4` (12px - 16px)
- Luftige Listen: `gap: spacing.6` - `spacing.8` (24px - 32px)

**Grid/Flex Layouts:**
- Kompakt: `gap: spacing.4` (16px)
- Standard: `gap: spacing.6` (24px)
- Luftig: `gap: spacing.8` - `spacing.12` (32px - 48px)

---

## Grid-System

Das Hydrophon Grid-System basiert auf einem **12-Spalten-Layout**, das maximale Flexibilität für verschiedene Layouts bietet.

### Grundprinzipien

- **12 Spalten** ermöglichen Layouts mit 2, 3, 4, 6 oder 12 Spalten
- **Responsive Gutters** passen sich an die Bildschirmgröße an
- **Fluid Width** mit maximaler Breite von 1280px
- **Mobile-First** Ansatz

### Grid-Konfiguration

```
Spalten: 12
Max Width: 1280px

Gutters (Spaltenabstand):
- Mobile:  16px (spacing.4)
- Tablet:  24px (spacing.6)
- Desktop: 32px (spacing.8)

Margins (Seitenabstand):
- Mobile:  16px
- Tablet:  32px
- Desktop: 64px
```

### Column Spans

**Häufige Spalten-Layouts:**

| Spalten | Breite | Verwendung |
|---------|--------|------------|
| 12/12 | 100% | Volle Breite |
| 6/12 | 50% | Zwei-Spalten-Layout |
| 4/12 | 33.33% | Drei-Spalten-Layout |
| 3/12 | 25% | Vier-Spalten-Layout |
| 8/12 | 66.66% | Hauptinhalt (2:1 Ratio) |
| 9/12 | 75% | Hauptinhalt (3:1 Ratio) |

**Beispiel: Artikel mit Sidebar**
```
Desktop:
┌────────────────┬─────┐
│   Hauptinhalt  │ Side│  (8 + 4 Spalten)
│   (8/12)       │ bar │
│                │(4/12)│
└────────────────┴─────┘

Mobile:
┌──────────────────────┐
│    Hauptinhalt       │  (12/12)
│    (Volle Breite)    │
└──────────────────────┘
┌──────────────────────┐
│    Sidebar           │  (12/12)
│    (Volle Breite)    │
└──────────────────────┘
```

---

## Breakpoints

Das System verwendet einen **Mobile-First Ansatz**. Styles werden zuerst für mobile Geräte definiert und dann für größere Bildschirme erweitert.

### Breakpoint-Definitionen

| Token | Wert | Gerätetyp | Beschreibung |
|-------|------|-----------|--------------|
| `breakpoints.sm` | 640px | Landscape Phones | Querformat Smartphones |
| `breakpoints.md` | 768px | Tablets | Tablets im Hochformat |
| `breakpoints.lg` | 1024px | Desktops | Kleinere Desktop-Monitore |
| `breakpoints.xl` | 1280px | Large Desktops | Standard Desktop-Monitore |
| `breakpoints.2xl` | 1536px | Extra Large | Große Desktop-Monitore |

### Container Max-Widths

Container begrenzen die maximale Inhaltsbreite für optimale Lesbarkeit:

| Breakpoint | Container Max-Width |
|------------|---------------------|
| `< sm` | 100% (fluid) |
| `≥ sm` | 640px |
| `≥ md` | 768px |
| `≥ lg` | 1024px |
| `≥ xl` | 1280px |

### Media Query Beispiele

**CSS:**
```css
/* Mobile first - Base styles */
.element {
  padding: 16px;
}

/* ≥ Tablet */
@media (min-width: 768px) {
  .element {
    padding: 24px;
  }
}

/* ≥ Desktop */
@media (min-width: 1024px) {
  .element {
    padding: 32px;
  }
}
```

---

## Gutters & Margins

### Gutter-Größen (Spaltenabstände)

Gutters sind die Abstände zwischen Grid-Spalten:

| Breakpoint | Gutter | Token |
|------------|--------|-------|
| Mobile (< 768px) | 16px | `spacing.4` |
| Tablet (≥ 768px) | 24px | `spacing.6` |
| Desktop (≥ 1024px) | 32px | `spacing.8` |

### Page Margins (Seitenabstände)

Margins sind die Abstände vom Bildschirmrand:

| Breakpoint | Margin |
|------------|--------|
| Mobile (< 768px) | 16px |
| Tablet (≥ 768px) | 32px |
| Desktop (≥ 1024px) | 64px |

### Visuelle Darstellung

```
Mobile (< 768px):
┌─────────────────────────┐
│ 16px                16px│  ← Margins
│  ┌───┬─┬───┬─┬───┬─┬─┐ │
│  │ C │ │ C │ │ C │ │ │ │  ← Columns (C)
│  └───┘ └───┘ └───┘ └─┘ │      mit 16px Gutters
│                         │
└─────────────────────────┘

Desktop (≥ 1024px):
┌───────────────────────────────┐
│ 64px                      64px│  ← Margins
│  ┌───┬──┬───┬──┬───┬──┬───┐  │
│  │ C │  │ C │  │ C │  │ C │  │  ← Columns (C)
│  └───┘  └───┘  └───┘  └───┘  │      mit 32px Gutters
│                               │
└───────────────────────────────┘
```

---

## Responsives Verhalten

### Layout-Anpassungen über Breakpoints

**Typische Responsive Patterns:**

**1. Stack to Grid**
```
Mobile:     Desktop:
┌────┐      ┌───┬───┬───┐
│  A │      │ A │ B │ C │
├────┤  →   └───┴───┴───┘
│  B │
├────┤
│  C │
└────┘
```

**2. Sidebar Collapse**
```
Mobile:         Desktop:
┌────────┐      ┌──────┬────┐
│ Content│      │Content│Side│
└────────┘  →   │       │bar │
┌────────┐      └──────┴────┘
│Sidebar │
└────────┘
```

**3. Column Reflow**
```
Mobile (1 col):  Tablet (2 cols):  Desktop (4 cols):
┌────┐           ┌────┬────┐       ┌──┬──┬──┬──┐
│ A  │           │ A  │ B  │       │A │B │C │D │
├────┤           ├────┼────┤   →   └──┴──┴──┴──┘
│ B  │   →       │ C  │ D  │
├────┤           └────┴────┘
│ C  │
├────┤
│ D  │
└────┘
```

### Spacing-Anpassungen

**Padding responsive skalieren:**
```css
.card {
  padding: 16px;              /* spacing.4 - Mobile */
}

@media (min-width: 768px) {
  .card {
    padding: 24px;            /* spacing.6 - Tablet */
  }
}

@media (min-width: 1024px) {
  .card {
    padding: 32px;            /* spacing.8 - Desktop */
  }
}
```

**Section Margins responsive:**
```css
.section {
  margin-bottom: 48px;        /* spacing.12 - Mobile */
}

@media (min-width: 1024px) {
  .section {
    margin-bottom: 64px;      /* spacing.16 - Desktop */
  }
}
```

### Best Practices

1. **Mobile First**: Styles zuerst für kleine Bildschirme definieren
2. **Progressive Enhancement**: Features für größere Bildschirme hinzufügen
3. **Content First**: Breakpoints an Inhalt orientieren, nicht nur an Geräten
4. **Konsistente Gutters**: Grid-Gutters sollten zu Spacing-Scale passen
5. **Lesbare Zeilenlänge**: Maximale Breite für Text-Content (z.B. 65-75 Zeichen)

---

## Zusammenfassung

**Spacing-System:**
- 4px Base Unit für harmonische Abstände
- 22 Spacing-Werte von 0px bis 128px
- Konsistente Anwendung auf Padding, Margin und Gap

**Grid-System:**
- 12-Spalten-Layout für flexible Layouts
- Responsive Gutters (16px/24px/32px)
- Max-Width 1280px für Desktop

**Breakpoints:**
- 5 Breakpoints von sm (640px) bis 2xl (1536px)
- Mobile-First Ansatz
- Container Max-Widths für jedes Breakpoint

**Verwendung:**
Designer und Entwickler nutzen diese Tokens für konsistente räumliche Beziehungen in allen Komponenten und Layouts.
