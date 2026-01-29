# Data Table

## Übersicht

Data Tables präsentieren strukturierte Daten in tabellarischer Form. Im B2B-Kontext von Hydrophon werden sie primär für Produktvergleiche und technische Spezifikationen verwendet.

**Verwendung:** Produktvergleiche, technische Datenblätter, Preislisten, Spezifikationstabellen

**Kontext:** B2B-Nutzer müssen Produkte anhand technischer Kriterien vergleichen (Länge, Breite, Material, Ablaufleistung, Preis). Tables ermöglichen schnelles Scannen und Vergleichen.

## Anatomie

Eine Data Table besteht aus folgenden Elementen:

1. **`<table>`** – Semantischer Container
2. **`<caption>`** – Tabellenbeschreibung (für Screen Reader wichtig)
3. **`<thead>`** – Header-Bereich mit Spaltenüberschriften
4. **`<th scope="col">`** – Spalten-Header
5. **`<tbody>`** – Daten-Bereich
6. **`<th scope="row">`** – Zeilen-Header (erste Spalte, z.B. Produktname)
7. **`<td>`** – Daten-Zellen
8. **`<tfoot>`** (optional) – Footer-Bereich für Summen/Durchschnitt

```
┌───────────────────────────────────────┐
│ Tabellentitel (caption)               │
├───────────────┬───────────┬───────────┤
│ Spalte 1 (th) │ Spalte 2  │ Spalte 3  │ ← thead
├───────────────┼───────────┼───────────┤
│ Zeile 1 (th)  │ Daten (td)│ Daten     │
│ Zeile 2       │ Daten     │ Daten     │ ← tbody
│ Zeile 3       │ Daten     │ Daten     │
└───────────────┴───────────┴───────────┘
```

## Header-Struktur

### Spalten-Header (thead)

Alle Header-Zellen in `<thead>` benötigen `scope="col"`:

```html
<thead>
  <tr>
    <th scope="col">Produkt</th>
    <th scope="col">Länge</th>
    <th scope="col">Breite</th>
    <th scope="col">Material</th>
    <th scope="col">Preis</th>
  </tr>
</thead>
```

**Warum `scope="col"`?**

- Screen Reader ordnen Datenzellen dem korrekten Header zu
- WCAG 1.3.1 - Info and Relationships
- Ermöglicht Navigation via Screen Reader Table Commands

### Zeilen-Header (erste Spalte)

Erste Spalte in `<tbody>` sollte `<th scope="row">` nutzen:

```html
<tbody>
  <tr>
    <th scope="row">Ablaufrinne 80cm</th>
    <td>80cm</td>
    <td>10cm</td>
    <td>Edelstahl</td>
    <td>189,00 €</td>
  </tr>
</tbody>
```

**Warum `scope="row"`?**

- Produktname ist Zeilen-Identifikator
- Screen Reader lesen: "Ablaufrinne 80cm, Länge: 80cm"
- Bessere Navigation für blinde Nutzer

## Zebra-Striping

### Subtiler Kontrast

Zebra-Striping verbessert Lesbarkeit durch alternierende Zeilenhintergründe:

```css
tbody tr:nth-child(odd) {
  background: transparent;
}

tbody tr:nth-child(even) {
  background: var(--table-row-stripe); /* neutral.50 */
}
```

**Warum subtil?**

- Starke Kontraste (z.B. neutral.100 vs weiß) = visuelle Störung
- Subtile Kontraste (neutral.50 vs weiß) = verbesserte Scan-Geschwindigkeit
- Kontrast zwischen Zeilen: ~1.5:1 (ausreichend für Orientierung)
- Text-Kontrast auf beiden Hintergründen: 4.5:1 (WCAG AA compliant)

**Kontrast-Kalkulation:**

- Weiß (neutral.0): #ffffff (Luminanz: 1.0)
- Neutral.50: #fafafa (Luminanz: 0.98)
- Kontrast: 1.02:1 (sehr subtil, aber wahrnehmbar)

Dieser Kontrast reicht aus, um Zeilen zu unterscheiden, ohne visuelle Unruhe zu erzeugen.

## Row Hover

Zusätzlich zu Zebra-Striping gibt es einen Hover-State:

```css
tbody tr:hover {
  background: var(--table-row-hover); /* hydrophon.blau.50 */
  transition: background 150ms ease;
}
```

**Verhalten:**

- Überschreibt Zebra-Striping bei Hover
- Hydrophon-Blau für Marken-Konsistenz
- Smooth Transition (150ms)

## Responsive-Verhalten

### Option 1: Horizontaler Scroll (empfohlen)

Tabelle bleibt semantisch, scrollt horizontal auf kleinen Screens:

```html
<div class="table-container">
  <table class="data-table">
    <!-- ... -->
  </table>
</div>
```

```css
.table-container {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch; /* iOS smooth scrolling */
}

.data-table {
  min-width: var(--table-responsive-min-width); /* 600px */
}
```

**Vorteile:**

- Behält semantische Struktur für Screen Reader
- Einfache Implementierung
- Funktioniert für komplexe Tabellen

**Scroll-Indikatoren:**

Zeige visuellen Hinweis, dass Tabelle scrollbar ist:

```css
.table-container {
  position: relative;
  overflow-x: auto;
}

/* Shadow am rechten Rand wenn scrollbar */
.table-container::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 40px;
  background: linear-gradient(to left, rgba(0,0,0,0.1), transparent);
  pointer-events: none;
  opacity: 1;
}

/* Shadow ausblenden wenn komplett gescrollt */
.table-container::-webkit-scrollbar-thumb {
  /* Custom scrollbar styling */
}
```

### Option 2: Stacked Cards (für einfache Tabellen)

Tabelle wird zu Cards auf Mobile umgebaut:

```css
@media (max-width: 640px) {
  .data-table thead {
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

  .data-table tbody tr {
    display: block;
    margin-bottom: var(--spacing-4);
    border: 1px solid var(--neutral-200);
    border-radius: var(--border-radius-md);
  }

  .data-table td {
    display: block;
    text-align: right;
    padding: var(--spacing-3) var(--spacing-4);
    border-bottom: 1px solid var(--neutral-100);
  }

  .data-table td::before {
    content: attr(data-label);
    float: left;
    font-weight: var(--font-weight-semibold);
    color: var(--color-text-primary);
  }

  .data-table td:last-child {
    border-bottom: none;
  }
}
```

**HTML mit data-label:**

```html
<tr>
  <th scope="row">Ablaufrinne 80cm</th>
  <td data-label="Länge">80cm</td>
  <td data-label="Breite">10cm</td>
  <td data-label="Material">Edelstahl</td>
  <td data-label="Preis">189,00 €</td>
</tr>
```

**Nachteile:**

- Komplexer CSS
- Funktioniert nur für einfache Tabellen
- Nicht geeignet für viele Spalten

**Empfehlung:** Nutze Option 1 (Horizontal Scroll) für Hydrophon-Produkttabellen, da diese oft viele technische Spezifikationen enthalten.

## Caption

`<caption>` beschreibt Tabelleninhalt für Screen Reader:

```html
<table>
  <caption>Technische Spezifikationen Hydrophon Ablaufrinnen</caption>
  <thead>...</thead>
  <tbody>...</tbody>
</table>
```

**Styling:**

```css
caption {
  font-size: var(--table-caption-font-size); /* 18px */
  font-weight: var(--table-caption-font-weight); /* 600 */
  color: var(--table-caption-color);
  text-align: var(--table-caption-text-align); /* left */
  padding: var(--table-caption-padding);
  caption-side: top;
}
```

**Warum wichtig?**

- Screen Reader lesen Caption als erstes
- Gibt Kontext über Tabelleninhalt
- WCAG 1.3.1 - Info and Relationships

## Tokens

Data Tables nutzen Tokens aus `tokens/tables.json`:

| Token | Wert | Verwendung |
|-------|------|------------|
| `table.fontSize` | 14px (fontSize.sm) | Basis-Schriftgröße |
| `table.background` | white (neutral.0) | Tabellen-Hintergrund |
| `table.borderColor` | neutral.200 | Borders |
| `table.borderRadius` | 6px (borderRadius.md) | Container-Ecken |
| `table.cell.paddingY` | 12px (spacing.3) | Vertikales Cell-Padding |
| `table.cell.paddingX` | 16px (spacing.4) | Horizontales Cell-Padding |
| `table.header.background` | neutral.100 | Header-Hintergrund |
| `table.header.color` | neutral.900 | Header-Text |
| `table.header.fontWeight` | 600 (semibold) | Header-Gewicht |
| `table.header.borderBottom.width` | 2px | Header-Border unten |
| `table.header.borderBottom.color` | neutral.300 | Header-Border-Farbe |
| `table.row.default` | transparent | Odd-Row-Hintergrund |
| `table.row.stripe` | neutral.50 | Even-Row-Hintergrund |
| `table.row.hover` | hydrophon.blau.50 | Hover-Hintergrund |
| `table.row.borderBottom.width` | 1px | Row-Border unten |
| `table.row.borderBottom.color` | neutral.200 | Row-Border-Farbe |
| `table.caption.fontSize` | 18px (fontSize.lg) | Caption-Größe |
| `table.caption.fontWeight` | 600 (semibold) | Caption-Gewicht |
| `table.caption.padding` | 16px (spacing.4) | Caption-Padding |
| `table.responsive.minWidth` | 600px | Min-Width vor Scroll |

## Code-Beispiele

### Basis-Tabelle

```html
<table class="data-table">
  <caption>Technische Spezifikationen Hydrophon Ablaufrinnen</caption>
  <thead>
    <tr>
      <th scope="col">Produkt</th>
      <th scope="col">Länge</th>
      <th scope="col">Breite</th>
      <th scope="col">Tiefe</th>
      <th scope="col">Material</th>
      <th scope="col">Ablaufleistung</th>
      <th scope="col">Preis</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Ablaufrinne 80cm</th>
      <td>80cm</td>
      <td>10cm</td>
      <td>5cm</td>
      <td>Edelstahl 1.4301</td>
      <td>0,8 l/s</td>
      <td>189,00 €</td>
    </tr>
    <tr>
      <th scope="row">Ablaufrinne 100cm</th>
      <td>100cm</td>
      <td>10cm</td>
      <td>5cm</td>
      <td>Edelstahl 1.4301</td>
      <td>1,0 l/s</td>
      <td>219,00 €</td>
    </tr>
    <tr>
      <th scope="row">Ablaufrinne 120cm</th>
      <td>120cm</td>
      <td>10cm</td>
      <td>5cm</td>
      <td>Edelstahl 1.4301</td>
      <td>1,2 l/s</td>
      <td>249,00 €</td>
    </tr>
    <tr>
      <th scope="row">Punktablauf Ø15cm</th>
      <td>15cm</td>
      <td>15cm</td>
      <td>8cm</td>
      <td>Edelstahl 1.4301</td>
      <td>1,5 l/s</td>
      <td>159,00 €</td>
    </tr>
  </tbody>
</table>
```

### CSS-Implementierung

```css
/* Table Container für horizontales Scroll */
.table-container {
  overflow-x: auto;
  border-radius: var(--table-border-radius);
  border: 1px solid var(--table-border-color);
  -webkit-overflow-scrolling: touch; /* iOS smooth scrolling */
}

/* Table */
.data-table {
  width: 100%;
  min-width: var(--table-responsive-min-width);
  border-collapse: collapse;
  font-size: var(--table-font-size);
  background: var(--table-background);
}

/* Caption */
.data-table caption {
  font-size: var(--table-caption-font-size);
  font-weight: var(--table-caption-font-weight);
  color: var(--table-caption-color);
  text-align: var(--table-caption-text-align);
  padding: var(--table-caption-padding);
  caption-side: top;
}

/* Header */
.data-table thead {
  background: var(--table-header-background);
}

.data-table th {
  padding: var(--table-cell-padding-y) var(--table-cell-padding-x);
  text-align: left;
  font-weight: var(--table-header-font-weight);
  color: var(--table-header-color);
}

.data-table thead th {
  border-bottom: var(--table-header-border-bottom-width) solid var(--table-header-border-bottom-color);
}

/* Body Cells */
.data-table td {
  padding: var(--table-cell-padding-y) var(--table-cell-padding-x);
  color: var(--color-text-primary);
}

.data-table tbody th {
  font-weight: var(--font-weight-semibold);
  text-align: left;
}

/* Row Borders */
.data-table tbody tr {
  border-bottom: var(--table-row-border-bottom-width) solid var(--table-row-border-bottom-color);
}

.data-table tbody tr:last-child {
  border-bottom: none;
}

/* Zebra-Striping */
.data-table tbody tr:nth-child(odd) {
  background: var(--table-row-default);
}

.data-table tbody tr:nth-child(even) {
  background: var(--table-row-stripe);
}

/* Hover State */
.data-table tbody tr:hover {
  background: var(--table-row-hover);
  transition: background 150ms ease;
}

/* Numeric Column Alignment */
.data-table td[data-type="number"] {
  text-align: right;
  font-variant-numeric: tabular-nums; /* Monospace numbers */
}
```

### Responsive mit Scroll-Indikatoren

```html
<div class="table-container" data-scrollable>
  <table class="data-table">
    <!-- ... -->
  </table>
</div>
```

```css
.table-container {
  position: relative;
  overflow-x: auto;
}

/* Shadow am rechten Rand wenn nicht komplett gescrollt */
.table-container::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 30px;
  background: linear-gradient(to left, rgba(0,0,0,0.08), transparent);
  pointer-events: none;
  opacity: 0;
  transition: opacity 200ms;
}

.table-container[data-scrollable]::after {
  opacity: 1;
}

/* Shadow ausblenden am linken Rand */
.table-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 30px;
  background: linear-gradient(to right, rgba(0,0,0,0.08), transparent);
  pointer-events: none;
  opacity: 0;
  transition: opacity 200ms;
  z-index: 1;
}
```

**JavaScript für Scroll-Detection:**

```javascript
const tableContainer = document.querySelector('.table-container');

tableContainer.addEventListener('scroll', () => {
  const isScrolledToEnd = tableContainer.scrollWidth - tableContainer.clientWidth <= tableContainer.scrollLeft + 1;
  const isScrolledToStart = tableContainer.scrollLeft <= 1;

  if (isScrolledToEnd) {
    tableContainer.removeAttribute('data-scrollable');
  } else {
    tableContainer.setAttribute('data-scrollable', '');
  }
});
```

### Mit Sortierung (optional)

```html
<thead>
  <tr>
    <th scope="col">
      <button class="table-sort" aria-label="Sortiere nach Produkt">
        Produkt
        <svg class="table-sort__icon"><!-- Lucide ChevronDown --></svg>
      </button>
    </th>
    <th scope="col">
      <button class="table-sort" aria-label="Sortiere nach Länge">
        Länge
        <svg class="table-sort__icon"><!-- Lucide ChevronDown --></svg>
      </button>
    </th>
  </tr>
</thead>
```

```css
.table-sort {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  width: 100%;
  padding: 0;
  background: transparent;
  border: none;
  font: inherit;
  font-weight: var(--font-weight-semibold);
  color: inherit;
  cursor: pointer;
}

.table-sort:hover {
  color: var(--hydrophon-blau-600);
}

.table-sort__icon {
  width: 16px;
  height: 16px;
  transition: transform 200ms;
}

.table-sort[aria-sort="ascending"] .table-sort__icon {
  transform: rotate(180deg);
}

.table-sort:focus-visible {
  outline: 2px solid var(--hydrophon-blau-500);
  outline-offset: 2px;
}
```

## Barrierefreiheit

### WCAG 1.3.1 - Info and Relationships

**scope-Attribut auf allen Header-Zellen:**

```html
<th scope="col">Spalte</th>  <!-- Spalten-Header -->
<th scope="row">Zeile</th>    <!-- Zeilen-Header -->
```

Screen Reader ordnen dadurch Daten dem korrekten Header zu:

- Nutzer navigiert zu Zelle "80cm"
- Screen Reader liest: "Ablaufrinne 80cm, Länge: 80cm"

### caption für Tabellenbeschreibung

```html
<caption>Technische Spezifikationen Hydrophon Ablaufrinnen</caption>
```

Screen Reader lesen Caption als erstes, bevor sie in Tabelle navigieren.

### Keine merged cells ohne headers-Attribut

Vermeiden:

```html
<!-- FALSCH: Screen Reader können Beziehung nicht erkennen -->
<td colspan="3">Gesamtpreis: 999,00 €</td>
```

Wenn merged cells notwendig, nutze `headers`-Attribut:

```html
<th id="gesamt">Gesamtpreis</th>
<td headers="gesamt" colspan="3">999,00 €</td>
```

### Keyboard-Navigation

- **Tab:** Navigiert durch interaktive Elemente (Links, Buttons)
- **Arrow Keys:** Screen Reader Table Navigation (Zeile/Spalte)
- **Ctrl + Alt + Arrow:** NVDA/JAWS Table Navigation

Keine Custom Keyboard-Navigation erforderlich, da native `<table>` verwendet wird.

### Sortierung mit aria-sort

Falls Tabelle sortierbar:

```html
<th scope="col" aria-sort="ascending">
  <button>Länge</button>
</th>
```

**aria-sort-Werte:**

- `ascending` – Aufsteigend sortiert
- `descending` – Absteigend sortiert
- `none` – Nicht sortiert (default)

## Best Practices

### Dos

- **Immer scope-Attribut nutzen** – `scope="col"` und `scope="row"`
- **caption für Tabellenbeschreibung** – Screen Reader Context
- **Subtile Zebra-Stripes** – neutral.50 (nicht stärker)
- **Hover-State für Zeilen** – Verbessert Interaktivität
- **Horizontales Scroll auf Mobile** – Behält Semantik
- **Numeric Alignment rechts** – `text-align: right` für Zahlen
- **tabular-nums für Zahlen** – `font-variant-numeric: tabular-nums`

### Don'ts

- **Keine div-Tabellen** – Immer semantisches `<table>` nutzen
- **Keine fehlenden Header** – Jede Spalte braucht `<th scope="col">`
- **Keine starken Zebra-Kontraste** – Max neutral.100, besser neutral.50
- **Keine merged cells ohne headers** – Screen Reader verlieren Kontext
- **Keine fixed Spaltenbreiten** – Lässt keine Flexibilität auf Mobile
- **Keine Tabellen für Layout** – Nur für tabellarische Daten

## Sortierung (optional)

Falls Tabellen sortierbar sein sollen, kann JavaScript-Sortierung implementiert werden:

**HTML:**

```html
<thead>
  <tr>
    <th scope="col" data-sortable data-type="text">Produkt</th>
    <th scope="col" data-sortable data-type="number">Länge</th>
    <th scope="col" data-sortable data-type="number">Preis</th>
  </tr>
</thead>
```

**JavaScript (Beispiel):**

```javascript
document.querySelectorAll('[data-sortable]').forEach(th => {
  th.addEventListener('click', () => {
    const table = th.closest('table');
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    const columnIndex = Array.from(th.parentNode.children).indexOf(th);
    const type = th.dataset.type || 'text';
    const currentSort = th.getAttribute('aria-sort') || 'none';
    const newSort = currentSort === 'ascending' ? 'descending' : 'ascending';

    // Reset all other columns
    th.parentNode.querySelectorAll('[aria-sort]').forEach(t => {
      if (t !== th) t.removeAttribute('aria-sort');
    });

    th.setAttribute('aria-sort', newSort);

    // Sort rows
    rows.sort((a, b) => {
      const aVal = a.children[columnIndex].textContent.trim();
      const bVal = b.children[columnIndex].textContent.trim();

      if (type === 'number') {
        return newSort === 'ascending'
          ? parseFloat(aVal) - parseFloat(bVal)
          : parseFloat(bVal) - parseFloat(aVal);
      } else {
        return newSort === 'ascending'
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }
    });

    // Re-append sorted rows
    rows.forEach(row => tbody.appendChild(row));
  });
});
```

## Verwandte Komponenten

- **Product Card** – Alternative Darstellung für Produkt-Übersichten
- **Content Card** – Card-basierte Layouts

## Ressourcen

- [MDN: `<table>` Element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table)
- [MDN: `scope` Attribut](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/th#attr-scope)
- [WCAG 1.3.1 - Info and Relationships](https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html)
- [WebAIM: Creating Accessible Tables](https://webaim.org/techniques/tables/)
- [CSS Tricks: Responsive Tables](https://css-tricks.com/responsive-data-tables/)
