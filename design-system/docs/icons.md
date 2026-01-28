# Icons

Icon-System für das Hydrophon Design System. Definiert visuellen Stil, Icon-Groessen, Bibliothek und Anwendungsrichtlinien für konsistente Icon-Nutzung über alle Touchpoints hinweg.

## Inhaltsverzeichnis

- [Icon-Stil](#icon-stil)
- [Icon-Bibliothek](#icon-bibliothek)
- [Groessen und Anwendung](#groessen-und-anwendung)
- [Barrierefreiheit](#barrierefreiheit)
- [Export-Formate](#export-formate)
- [Don'ts](#donts)

---

## Icon-Stil

### Visuelle Spezifikationen

**Strichstaerke:** 2px
- Ausgewogen und vielseitig
- Lesbar bei allen Groessen (16px bis 48px)
- Industrie-Standard für moderne B2B-Anwendungen

**Strichabschluss:** Abgerundet (round)
- Border-radius: 2px an allen Endpunkten
- Weiche, moderne B2B-Aesthetik
- Konsistent mit den Rundungen der Inter-Schriftfamilie

**Strichverbindungen:** Abgerundet (round)
- Keine scharfen Ecken an Verbindungspunkten
- Harmonische Gesamtoptik

### Grid-System

**Basis-Grid:** 24x24px
- Standard-Artboard für alle Icons
- Industrie-Standard (Material Design, Phosphor, Lucide)
- Optimale Balance zwischen Details und Performance

**Grid-Padding:** 2px
- 1px visueller Abstand auf jeder Seite
- Sichere Zone: 20x20px für Icon-Pfade
- Verhindert Beschneidung bei verschiedenen Containergroessen

### Visuelle Darstellung

```
┌─────────────────────────┐
│  24px × 24px Artboard   │
│ ┌─────────────────────┐ │
│ │                     │ │  2px Padding
│ │   20px × 20px       │ │
│ │   Safe Area         │ │  Stroke: 2px
│ │                     │ │  Cap: round
│ │   [Icon-Pfade]      │ │  Join: round
│ │                     │ │
│ └─────────────────────┘ │
└─────────────────────────┘
```

### Warum diese Wahl?

- **Moderne B2B-Aesthetik:** Abgerundete Formen wirken zugaenglich und professionell, nicht technisch-kalt
- **Konsistenz:** 2px Stroke matcht die optische Staerke der Inter-Schriftfamilie
- **Skalierbarkeit:** Von 16px (inline) bis 48px (dekorativ) gut lesbar
- **Wartbarkeit:** Industrie-Standard erleichtert Erweiterung und Custom-Icons

---

## Icon-Bibliothek

### Primaere Bibliothek: Lucide Icons

**Lucide Icons** als Basis-Bibliothek gewaehlt:
- **Lizenz:** ISC License (permissive, kommerzielle Nutzung erlaubt)
- **Stil:** 2px Stroke, anpassbar, konsistent mit Hydrophon-Anforderungen
- **Umfang:** 1000+ Icons für alle UI-Anwendungsfaelle
- **Technische Integration:** React, Vue, SVG-Exports, Framework-agnostisch
- **Website:** [https://lucide.dev](https://lucide.dev)

### Installation

**React-Integration:**
```bash
npm install lucide-react
```

**Framework-agnostische SVG-Nutzung:**
Optimierte SVG-Dateien sind bereits im Design-System exportiert unter:
`design-system/assets/icons/`

### Basis-Icon-Set (35 Icons)

Alle Icons sind als optimierte SVG-Dateien verfuegbar unter `design-system/assets/icons/`.

#### Navigation (10 Icons)

Icons fuer Navigationselemente und Bewegung durch Interfaces.

**Pfad:** `assets/icons/navigation/`

| Icon-Name | Datei | Anwendung |
|-----------|-------|-----------|
| Menu | `menu.svg` | Hamburger-Menu öffnen, Hauptnavigation |
| Schliessen | `x.svg` | Dialoge schliessen, Menu zuklappen |
| Chevron Down | `chevron-down.svg` | Dropdown öffnen, Accordion ausklappen |
| Chevron Right | `chevron-right.svg` | Naechster Schritt, Navigation vorwaerts |
| Chevron Left | `chevron-left.svg` | Zurueck-Navigation, vorheriger Schritt |
| Arrow Left | `arrow-left.svg` | Zurueck-Button, vorherige Seite |
| Arrow Right | `arrow-right.svg` | Weiter-Button, naechste Seite |
| Arrow Up | `arrow-up.svg` | Nach oben scrollen, Sort aufsteigend |
| Arrow Down | `arrow-down.svg` | Nach unten scrollen, Sort absteigend |
| Home | `home.svg` | Startseite, Dashboard |

#### Actions (12 Icons)

Icons fuer Benutzeraktionen und Operationen.

**Pfad:** `assets/icons/actions/`

| Icon-Name | Datei | Anwendung |
|-----------|-------|-----------|
| Suche | `search.svg` | Suchfelder, Filterung |
| Filter | `filter.svg` | Filter-Optionen, Datenansichten |
| Download | `download.svg` | Dateien herunterladen, Export |
| Upload | `upload.svg` | Dateien hochladen, Import |
| Teilen | `share.svg` | Content teilen, Link kopieren |
| Bearbeiten | `edit.svg` | Eintraege bearbeiten, Formular-Edit |
| Loeschen | `trash-2.svg` | Eintraege loeschen, Entfernen |
| Hinzufuegen | `plus.svg` | Neuer Eintrag, Element hinzufuegen |
| Entfernen | `minus.svg` | Element entfernen, Reduzieren |
| Kopieren | `copy.svg` | In Zwischenablage kopieren |
| Bestaetigen | `check.svg` | Aktion bestaetigen, Auswahl |
| Externer Link | `external-link.svg` | Link öffnet in neuem Tab |

#### Status & Feedback (8 Icons)

Icons fuer Systemstatus, Feedback und Benachrichtigungen.

**Pfad:** `assets/icons/status/`

| Icon-Name | Datei | Anwendung |
|-----------|-------|-----------|
| Erfolg | `check-circle.svg` | Erfolgreiche Aktion, Bestaetigung |
| Fehler | `alert-circle.svg` | Fehlermeldung, kritischer Status |
| Information | `info.svg` | Hinweis, zusaetzliche Information |
| Warnung | `alert-triangle.svg` | Warnung, Aufmerksamkeit noetig |
| Laden | `loader.svg` | Ladevorgang, asynchrone Operation |
| Abgebrochen | `x-circle.svg` | Aktion abgebrochen, nicht erfolgreich |
| Benachrichtigung | `bell.svg` | Neue Nachrichten, Alerts |
| Zeit | `clock.svg` | Zeitstempel, Verlauf, Pending |

#### Product-Specific (5 Icons)

Produkt-spezifische Icons als Platzhalter für Hydrophon-Anwendungen.

**Pfad:** `assets/icons/product/`

| Icon-Name | Datei | Anwendung |
|-----------|-------|-----------|
| Wasser | `droplet.svg` | Wasserbezogene Produkte, Ablauf-Systeme |
| Einstellungen | `settings.svg` | Konfiguration, Technische Parameter |
| Werkzeug | `wrench.svg` | Installation, Handwerker-Kontext |
| Produkt | `package.svg` | Produkt-Details, Verpackung |
| Ebenen | `layers.svg` | Produktkomponenten, Systemaufbau |

**Hinweis für Custom Icons:**
Wenn produktspezifische Icons erstellt werden (z.B. spezifische Ablaufsysteme, Zertifizierungen), sollten sie dem Lucide-Stil folgen:
- 2px Stroke
- Round Caps & Joins
- 24x24px Grid mit 2px Padding
- viewBox="0 0 24 24"
- stroke="currentColor"

### Erweiterung der Bibliothek

**Neue Icons aus Lucide hinzufuegen:**

1. Icon-Namen auf [lucide.dev](https://lucide.dev) finden
2. SVG aus `node_modules/lucide-static/icons/{name}.svg` kopieren
3. In passende Kategorie unter `assets/icons/` ablegen
4. SVGO-Optimierung ausfuehren:
   ```bash
   npx svgo -f assets/icons --config svgo.config.js -r
   ```
5. Icon in dieser Dokumentation ergaenzen

---

## Groessen und Anwendung

### Icon-Groessen-Tabelle

| Groesse | Pixel | Token | Anwendung | Beispiel |
|---------|-------|-------|-----------|----------|
| **XS** | 16px | `icon.size.xs` | Inline mit kleinem Text, kompakte UIs | Breadcrumb-Chevrons, Tag-Icons |
| **SM** | 20px | `icon.size.sm` | Buttons mit Text, Formulare | "Speichern"-Button, Input-Prefix |
| **MD** | 24px | `icon.size.md` | Standalone-Icons, Icon-Buttons | Toolbar-Aktionen, Navigationselemente |
| **LG** | 32px | `icon.size.lg` | Hervorgehobene Aktionen | Feature-Highlights, CTA-Buttons |
| **XL** | 48px | `icon.size.xl` | Dekorative Elemente | Leere-State-Illustrationen, Hero-Sections |

### Anwendungsrichtlinien

**Kontextuelle Groesse:**
- **Text-Inline:** Icon-Groesse sollte Line-Height des Textes matchen
  - Text 14px (line-height 20px) → Icon 16px (xs)
  - Text 16px (line-height 24px) → Icon 20px (sm)
- **Buttons:** Icon sollte visuell balanciert sein mit Text-Groesse
  - Kleine Buttons (32px Hoehe) → 16px Icon
  - Mittlere Buttons (40px Hoehe) → 20px Icon
  - Grosse Buttons (48px Hoehe) → 24px Icon
- **Icon-Only Buttons:** Icon sollte mindestens 20px sein für ausreichende Erkennbarkeit

**Spacing:**
- **Icon + Text:** 8px Abstand (`icon.spacing.withText` = `spacing.2`)
  ```html
  <button>
    <icon width="20" /> <!-- 8px gap --> Text
  </button>
  ```
- **Standalone Icons:** 4px optischer Rand (`icon.spacing.standalone` = `spacing.1`)

### Code-Beispiele

**React mit Lucide:**
```jsx
import { Search, Filter, Download } from 'lucide-react';

// Small (20px) - Button mit Text
<button>
  <Search size={20} />
  Suchen
</button>

// Medium (24px) - Icon-only Button
<button aria-label="Filter anzeigen">
  <Filter size={24} />
</button>

// Large (32px) - Feature-Highlight
<div className="feature">
  <Download size={32} />
  <h3>Dateien herunterladen</h3>
</div>
```

**HTML mit SVG-Dateien:**
```html
<!-- Small (20px) - Inline Icon -->
<span class="icon" style="width: 20px; height: 20px;">
  <svg><!-- content from assets/icons/actions/search.svg --></svg>
</span>

<!-- Medium (24px) - Standalone -->
<button class="icon-button" aria-label="Menu">
  <svg width="24" height="24"><!-- content from navigation/menu.svg --></svg>
</button>
```

**CSS mit Design Tokens:**
```css
.icon-xs { width: var(--icon-size-xs); height: var(--icon-size-xs); }
.icon-sm { width: var(--icon-size-sm); height: var(--icon-size-sm); }
.icon-md { width: var(--icon-size-md); height: var(--icon-size-md); }
.icon-lg { width: var(--icon-size-lg); height: var(--icon-size-lg); }
.icon-xl { width: var(--icon-size-xl); height: var(--icon-size-xl); }

.icon-with-text { gap: var(--icon-spacing-with-text); }
```

---

## Barrierefreiheit

Icons muessen WCAG 2.1 AA-konform verwendet werden.

### Dekorative Icons

Icons, die nur visuell unterstuetzen und von Text begleitet werden.

**Pattern:** `aria-hidden="true"` auf Icon-Element

```html
<!-- Button mit Text UND Icon -->
<button>
  <svg aria-hidden="true" width="20" height="20"><!-- icon --></svg>
  Speichern
</button>
```

**Warum:** Screenreader würden sonst "Speichern-Grafik" oder Dateinamen vorlesen → redundant und verwirrend.

### Icon-Only Buttons

Interaktive Elemente ohne begleitenden Text.

**Pattern:** `aria-label` auf Button/Link-Element

```html
<!-- Icon-Only Button -->
<button aria-label="Menu öffnen">
  <svg aria-hidden="true" width="24" height="24"><!-- menu icon --></svg>
</button>

<a href="/home" aria-label="Zur Startseite">
  <svg aria-hidden="true" width="24" height="24"><!-- home icon --></svg>
</a>
```

**Warum:** Screenreader brauchen Text-Alternative, um Funktion zu erklaeren.

### Informative Icons

Icons, die Information vermitteln ohne begleitenden Text.

**Pattern:** `role="img"` + `aria-label` auf SVG

```html
<!-- Status-Icon ohne Text -->
<svg role="img" aria-label="Erfolg" width="24" height="24">
  <!-- check-circle icon -->
</svg>

<!-- Warnung ohne Text -->
<svg role="img" aria-label="Achtung: Diese Aktion kann nicht rueckgaengig gemacht werden" width="24" height="24">
  <!-- alert-triangle icon -->
</svg>
```

**Warum:** Icon selbst traegt die Information → muss von Screenreader kommuniziert werden.

### Touch Targets

**Minimum Touch Target:** 44x44px (WCAG 2.1 AAA)
- Token: `icon.touchTarget.minimum` = 44px
- Für alle interaktiven Icons auf mobilen Geraeten

**Compact Touch Target:** 32x32px
- Token: `icon.touchTarget.compact` = 32px
- Nur für Desktop mit ausreichendem Abstand zu anderen Elementen

**Implementation:**
```css
/* Mobile: Minimum 44px */
.icon-button {
  width: var(--icon-touch-target-minimum);
  height: var(--icon-touch-target-minimum);
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Desktop: Kann kompakter sein wenn spacing stimmt */
@media (min-width: 1024px) {
  .icon-button.compact {
    width: var(--icon-touch-target-compact);
    height: var(--icon-touch-target-compact);
  }
}
```

**Icon-Groesse vs Touch Target:**
- Icon selbst kann klein sein (20px)
- Container muss Touch Target erfuellen (44px)
- Icon wird zentriert im Touch-Target-Container

---

## Export-Formate

### SVG (Primary)

**Alle Icons sind als optimierte SVG-Dateien verfuegbar:**
- **Pfad:** `design-system/assets/icons/`
- **Organisiert nach Kategorie:** navigation/, actions/, status/, product/

**SVG-Spezifikationen:**
- viewBox: `"0 0 24 24"` (Standard für alle Icons)
- stroke: `"currentColor"` (erbt Textfarbe des Parent-Elements)
- stroke-width: `"2"`
- fill: `"none"`
- stroke-linecap: `"round"`
- stroke-linejoin: `"round"`
- aria-hidden: `"true"` (per Default, überschreiben wenn informativ)

**Vorteile:**
- Skaliert verlustfrei auf jede Groesse
- `currentColor` ermöglicht einfaches Theming (Icon erbt Textfarbe)
- Kleine Dateigroesse (durchschnittlich 250-400 Bytes nach Optimierung)
- Zugaenglich über CSS fill/stroke

### Optimierung mit SVGO

**Config:** `design-system/svgo.config.js`

Alle exportierten SVGs sind optimiert:
- Entfernte Attribute: `class`, `data-*` (sauberer Code)
- Entfernte Dimensionen: `width`, `height` (nutzt viewBox für Skalierung)
- Hinzugefuegt: `aria-hidden="true"` (Barrierefreiheit)
- Preset: `preset-default` (Standard-Optimierungen)

**Command:**
```bash
npx svgo -f assets/icons --config svgo.config.js -r
```

**Resultat:** 25-40% Groessenreduktion, standardisierte Attribute

### PNG-Export (Fallback)

Für Legacy-Systeme oder Dokumentation können PNG-Exports generiert werden.

**Nicht im Design-System enthalten**, aber einfach zu generieren:

**Installation:**
```bash
npm install svgexport --save-dev
```

**2x Export (48px für Retina):**
```bash
npx svgexport assets/icons/actions/search.svg search@2x.png 48:48
```

**3x Export (72px für High-DPI):**
```bash
npx svgexport assets/icons/actions/search.svg search@3x.png 72:72
```

**Batch-Export aller Icons:**
```bash
find assets/icons -name "*.svg" -exec sh -c 'npx svgexport "$1" "${1%.svg}@2x.png" 48:48' _ {} \;
```

**Empfehlung:** Nur bei explizitem Bedarf exportieren. SVG ist in 99% der Faelle die bessere Wahl.

---

## Don'ts

### Nicht: Icons mit Text versehen

**Falsch:**
```svg
<svg>
  <path d="..." />
  <text>Download</text>
</svg>
```

**Warum:** Verhindert Lokalisierung, Text ist nicht stylebar, Barrierefreiheit problematisch.

**Richtig:** Text separat im HTML, Icon bleibt rein visuell.

### Nicht: Willkuerliche Groessen verwenden

**Falsch:**
```html
<svg width="17" height="17">...</svg>
<svg width="22" height="22">...</svg>
```

**Warum:** Inkonsistent, Icons sind nicht für diese Groessen optimiert, visuelle Unruhe.

**Richtig:** Nur Token-basierte Groessen verwenden (16, 20, 24, 32, 48).

### Nicht: Farbwerte hardcoden

**Falsch:**
```svg
<svg stroke="#008BD2">...</svg>
```

**Warum:** Verhindert Theming, Icons können nicht auf Kontext reagieren (hover, disabled), Wartbarkeit leidet.

**Richtig:** `stroke="currentColor"` nutzen, Farbe über CSS steuern.

### Nicht: Fokus-Indikatoren weglassen

**Falsch:**
```css
.icon-button:focus {
  outline: none; /* NEVER */
}
```

**Warum:** WCAG-Violation, Tastatur-Navigation unmöglich, unzugaenglich für Screenreader-Nutzer.

**Richtig:** Deutlichen Focus-Indicator bereitstellen:
```css
.icon-button:focus-visible {
  outline: 2px solid var(--hydrophon-blau-500);
  outline-offset: 2px;
}
```

### Nicht: Icons unterschiedlicher Stile mischen

**Falsch:** Lucide-Icons (2px stroke, rounded) + Heroicons-Solid (filled) gemischt

**Warum:** Visuelle Inkonsistenz, wirkt unprofessionell.

**Richtig:** Konsistent Lucide-Icons verwenden, bei Custom-Icons denselben Stil befolgen.

---

## Ressourcen

- **Lucide Icon Library:** [https://lucide.dev](https://lucide.dev)
- **WCAG 2.1 Guidelines:** [https://www.w3.org/WAI/WCAG21/quickref/](https://www.w3.org/WAI/WCAG21/quickref/)
- **Design Tokens:** `design-system/tokens/icons.json`
- **Exported Icons:** `design-system/assets/icons/`
- **SVGO Config:** `design-system/svgo.config.js`

---

*Letzte Aktualisierung: 2026-01-28*
*Version: 1.0*
