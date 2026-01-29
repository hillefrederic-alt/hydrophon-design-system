# WCAG 2.1 AA Compliance

Komponenten-spezifische Accessibility-Anforderungen und deren Umsetzung im Hydrophon Design-System.

Diese Dokumentation zeigt, welche WCAG-Kriterien für jede Komponente relevant sind und wie das Design-System sie erfüllt.

---

## Compliance-Übersicht

| Komponente | WCAG Level | Erfüllt | Details |
|------------|------------|----------|---------|
| Buttons | AA | ✓ | [Details](#buttons) |
| Text Inputs | AA | ✓ | [Details](#text-inputs) |
| Textarea | AA | ✓ | [Details](#textarea) |
| Select | AA | ✓ | [Details](#select) |
| Checkbox | AA | ✓ | [Details](#checkbox) |
| Radio Button | AA | ✓ | [Details](#radio-button) |
| Modal | AA | ✓ | [Details](#modal) |
| Toast | AA | ✓ | [Details](#toast-notifications) |
| Tooltip | AA | ✓ | [Details](#tooltips) |
| Header Navigation | AA | ✓ | [Details](#header-navigation) |
| Mobile Drawer | AA | ✓ | [Details](#mobile-drawer) |
| Breadcrumb | AA | ✓ | [Details](#breadcrumb) |
| Footer | AA | ✓ | [Details](#footer) |
| Product Card | AA | ✓ | [Details](#product-card) |
| Content Card | AA | ✓ | [Details](#content-card) |
| Data Table | AA | ✓ | [Details](#data-table) |
| Loading States | AA | ✓ | [Details](#loading-states) |

---

## Buttons

### Relevante WCAG-Kriterien

- **1.4.3 Kontrast (Minimum)**: 4.5:1 für Text, 3:1 für grafische Elemente
- **2.1.1 Tastatur**: Alle Buttons per Enter/Space aktivierbar
- **2.4.7 Fokus sichtbar**: Deutlich sichtbare Fokus-Indikatoren
- **2.5.5 Zielgröße (AAA)**: Mindestens 44x44px Touch-Targets

### Umsetzung

**Kontrast:**

- Primary Button: Weiß auf Blau (#008BD2) = 4.9:1 Kontrast ✓
- Secondary Button: Blau (#008BD2) auf Weiß = 4.5:1 Kontrast ✓
- Tertiary Button: Blau (#008BD2) auf Weiß = 4.5:1 Kontrast ✓
- Disabled State: neutral.400 auf neutral.200 = 2.1:1 (erlaubt für disabled)

**Tastatur:**

- Native `<button>` Element: Enter und Space aktivieren Button automatisch
- `:focus-visible` für Fokus-Indikator (nur bei Tastatur)

**Fokus-Indikator:**

```css
.button:focus-visible {
  outline: 2px solid var(--button-focus-outline-color); /* Blau #008BD2 */
  outline-offset: 2px;
}
```

- Fokus-Ring: 2px Outline mit 2px Offset
- Kontrast: 4.5:1 gegen Weiß

**Touch-Targets:**

- Medium Button (Default): 40px Höhe (WCAG AA erfüllt)
- Large Button: 48px Höhe (WCAG AAA erfüllt)
- Icon-only Buttons: 44px Mindestgröße (WCAG AAA erfüllt)

### Vollständige Spezifikation

→ [Button-Dokumentation](../buttons.md)

---

## Text Inputs

### Relevante WCAG-Kriterien

- **1.3.1 Info und Beziehungen**: Label mit `for`/`id` verknüpft
- **1.4.1 Farbe nicht allein**: Fehler mit Farbe + Icon + Text kommuniziert
- **3.3.1 Fehlererkennung**: Fehler werden identifiziert und beschrieben
- **3.3.2 Labels oder Anweisungen**: Jedes Feld hat sichtbares Label

### Umsetzung

**Label-Verknüpfung:**

```html
<label for="email">E-Mail-Adresse</label>
<input type="email" id="email" />
```

- `<label for="field-id">` Verknüpfung für Screenreader
- Label immer sichtbar (kein Placeholder als Label)

**Fehler-Kommunikation (dreifach):**

1. **Farbe:** Rote Border (`color.error`)
2. **Icon:** AlertCircle (Lucide, 16px) rechts im Input
3. **Text:** Fehlertext unter dem Input

```html
<input
  type="email"
  id="email"
  aria-invalid="true"
  aria-describedby="email-error"
  class="input--error"
/>
<span id="email-error" role="alert">
  Bitte gib eine gültige E-Mail-Adresse ein (z.B. name@firma.de)
</span>
```

**Hilfetext-Verknüpfung:**

```html
<input
  type="email"
  id="email"
  aria-describedby="email-help"
/>
<span id="email-help">
  Wir geben deine E-Mail nicht weiter.
</span>
```

**Pflichtfelder:**

```html
<label for="name">
  Name
  <span class="required" aria-label="Pflichtfeld">*</span>
</label>
<input
  type="text"
  id="name"
  required
  aria-required="true"
/>
```

### Vollständige Spezifikation

→ [Text-Input Dokumentation](../forms/text-input.md)
→ [Validierung](../forms/validation.md)
→ [Labels & Helper Text](../forms/labels-helper-text.md)

---

## Textarea

### Relevante WCAG-Kriterien

- **1.3.1 Info und Beziehungen**: Label verknüpft, Character Counter beschrieben
- **3.3.2 Labels oder Anweisungen**: Zeichenlimit kommuniziert

### Umsetzung

**Character Counter:**

```html
<label for="description">Beschreibung</label>
<textarea
  id="description"
  maxlength="500"
  aria-describedby="description-counter"
></textarea>
<span id="description-counter" aria-live="polite">
  0 / 500 Zeichen
</span>
```

- `aria-live="polite"`: Screenreader kündigt Zeichenzahl an (nicht-unterbrechend)
- Dynamische Farbcodierung: Grün (< 80%), Gelb (80-100%), Rot (100%)

### Vollständige Spezifikation

→ [Textarea-Dokumentation](../forms/textarea.md)

---

## Select

### Relevante WCAG-Kriterien

- **1.3.1 Info und Beziehungen**: Label verknüpft
- **2.1.1 Tastatur**: Native Tastaturnavigation (Pfeiltasten, Enter)

### Umsetzung

**Native Select bevorzugt:**

```html
<label for="role">Rolle</label>
<select id="role">
  <option value="">Bitte wählen</option>
  <option value="admin">Administrator</option>
  <option value="user">Benutzer</option>
</select>
```

- Native `<select>` hat eingebaute Accessibility (Tastatur, Screenreader, Mobile)
- Custom Selects nur mit vollständiger ARIA-Implementierung (z.B. Radix UI Select)

**Custom Select ARIA-Pattern:**

- `role="combobox"` auf Trigger-Button
- `aria-expanded="true/false"` zeigt Status
- `aria-controls` verknüpft mit Listbox-ID
- `role="listbox"` auf Options-Container
- `role="option"` auf jeder Option

### Vollständige Spezifikation

→ [Select-Dokumentation](../forms/select.md)

---

## Checkbox

### Relevante WCAG-Kriterien

- **1.3.1 Info und Beziehungen**: Fieldset/Legend für Gruppen
- **2.1.1 Tastatur**: Space zum Togglen
- **4.1.2 Name, Rolle, Wert**: Native Input erhalten (nicht verbergen mit `display:none`)

### Umsetzung

**Native Input (Anti-Pattern-Vermeidung):**

```css
/* Correct: Visually hidden, but accessible */
input[type="checkbox"] {
  opacity: 0;
  position: absolute;
}

/* WRONG: Breaks accessibility */
input[type="checkbox"] {
  display: none; /* ❌ Removes from accessibility tree */
}
```

- Native `<input type="checkbox">` mit `opacity: 0` (NICHT `display: none`)
- Erhält Accessibility-Tree und Keyboard-Navigation

**Checkbox-Gruppen:**

```html
<fieldset>
  <legend>Interessen</legend>
  <label>
    <input type="checkbox" name="interests" value="sanitaer" />
    Sanitärinstallation
  </label>
  <label>
    <input type="checkbox" name="interests" value="heizung" />
    Heizung
  </label>
</fieldset>
```

- `<fieldset>` + `<legend>` für semantische Gruppierung
- Screenreader lesen Legend als Kontext

**Fokus-Indikator:**

```css
input[type="checkbox"]:focus-visible + .checkbox-visual {
  outline: 2px solid var(--checkbox-focus-outline-color);
  outline-offset: 2px;
}
```

### Vollständige Spezifikation

→ [Checkbox-Dokumentation](../forms/checkbox.md)

---

## Radio Button

### Relevante WCAG-Kriterien

- **1.3.1 Info und Beziehungen**: Fieldset/Legend für Gruppen
- **2.1.1 Tastatur**: Pfeiltasten zum Navigieren, Space zum Selektieren
- **4.1.2 Name, Rolle, Wert**: Native Input erhalten

### Umsetzung

**Native Input:**

```css
/* Correct: Visually hidden, but accessible */
input[type="radio"] {
  opacity: 0;
  position: absolute;
}
```

- Gleiche Regel wie Checkbox: `opacity: 0`, NICHT `display: none`

**Radio-Gruppen:**

```html
<fieldset>
  <legend>Versandart</legend>
  <label>
    <input type="radio" name="shipping" value="standard" />
    Standard (3-5 Tage)
  </label>
  <label>
    <input type="radio" name="shipping" value="express" />
    Express (1-2 Tage)
  </label>
</fieldset>
```

**Keyboard-Navigation:**

- `↑/↓` oder `←/→`: Zwischen Radio-Optionen wechseln (und automatisch selektieren)
- `Tab`: Zur nächsten Radio-Gruppe (nicht zwischen Optionen)
- Native Browser-Verhalten bleibt erhalten

### Vollständige Spezifikation

→ [Radio Button-Dokumentation](../forms/radio-button.md)

---

## Modal

### Relevante WCAG-Kriterien

- **2.1.2 Keine Tastaturfalle**: ESC zum Schließen
- **2.4.3 Fokusreihenfolge**: Fokus springt in Modal bei Öffnung
- **4.1.2 Name, Rolle, Wert**: `role="dialog"`, `aria-modal="true"`, `aria-labelledby`

### Umsetzung

**ARIA-Pattern:**

```html
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-title"
>
  <h2 id="modal-title">Artikel löschen?</h2>
  <p>Dieser Vorgang kann nicht rückgängig gemacht werden.</p>
  <button>Abbrechen</button>
  <button>Löschen</button>
</div>
```

**Focus-Management:**

1. **Bei Öffnung:** Fokus springt auf erstes interaktives Element (meist Close-Button)
2. **Focus Trap:** Tab bleibt innerhalb des Modals (kein Zugriff auf Hintergrund)
3. **ESC-Taste:** Schließt Modal
4. **Bei Schließen:** Fokus kehrt zum Trigger-Element zurück

**Radix UI Dialog (Empfohlen):**

- Battle-tested Accessibility out-of-the-box
- Focus Trap automatisch
- ESC-Handling automatisch
- Portal-Rendering (außerhalb DOM-Hierarchie)

### Vollständige Spezifikation

→ [Modal-Dokumentation](../feedback/modal.md)

---

## Toast Notifications

### Relevante WCAG-Kriterien

- **4.1.3 Statusmeldungen**: Screenreader-Ankündigung ohne Fokus-Änderung

### Umsetzung

**ARIA Live Regions:**

```html
<!-- Erfolg/Info: Polite announcement -->
<div role="status" aria-live="polite">
  Änderungen gespeichert
</div>

<!-- Warnung/Fehler: Assertive announcement -->
<div role="alert" aria-live="assertive">
  Fehler beim Speichern
</div>
```

**Severity-basiertes ARIA:**

| Toast-Typ | ARIA-Role | aria-live | Verhalten |
|-----------|-----------|-----------|-----------|
| Success | `status` | `polite` | Unterbricht Screenreader nicht |
| Info | `status` | `polite` | Unterbricht Screenreader nicht |
| Warning | `alert` | `assertive` | Unterbricht Screenreader sofort |
| Error | `alert` | `assertive` | Unterbricht Screenreader sofort |

**Fehler-Toasts bleiben sichtbar:**

- Success/Info/Warning: Auto-dismiss nach 3-5 Sekunden
- Error: `duration: 0` (bleibt sichtbar, manuelles Schließen erforderlich)
- Kritische Fehler erfordern Nutzer-Reaktion

**Sonner-Library:**

- ARIA Live Regions automatisch
- Pause-on-Hover (WCAG 1.4.13)
- Keyboard-Dismiss (ESC schließt alle Toasts)

### Vollständige Spezifikation

→ [Toast-Dokumentation](../feedback/toast.md)

---

## Tooltips

### Relevante WCAG-Kriterien

- **1.4.13 Inhalt bei Hover oder Fokus**: Tooltip bleibt bei Hover sichtbar, ESC schließt

### Umsetzung

**WCAG 1.4.13 Anforderungen:**

1. **Dismissible:** ESC schließt Tooltip
2. **Hoverable:** Tooltip bleibt sichtbar bei Hover über Tooltip-Content
3. **Persistent:** Tooltip bleibt sichtbar bis Nutzer Hover/Fokus entfernt oder ESC drückt

**Radix UI Tooltip (Empfohlen):**

- WCAG 1.4.13 compliant out-of-the-box
- Keyboard-Zugriff: Fokus auf Trigger zeigt Tooltip
- Smart Positioning: Floating UI für Viewport-Collision-Detection
- Delay: 300ms (verhindert Flackern)

**Fokus-Trigger:**

```html
<button aria-describedby="tooltip">
  Info
</button>
<div id="tooltip" role="tooltip">
  Hilfreicher Text
</div>
```

- Tooltip erscheint bei Hover UND Fokus
- `aria-describedby` verknüpft Trigger mit Tooltip-Text

### Vollständige Spezifikation

→ [Tooltip-Dokumentation](../feedback/tooltip.md)

---

## Header Navigation

### Relevante WCAG-Kriterien

- **2.4.4 Linkzweck (im Kontext)**: Aussagekräftige Link-Texte
- **4.1.2 Name, Rolle, Wert**: `aria-current="page"` für aktive Links

### Umsetzung

**Aktive Seite:**

```html
<nav>
  <a href="/" aria-current="page">Home</a>
  <a href="/produkte">Produkte</a>
  <a href="/kontakt">Kontakt</a>
</nav>
```

- `aria-current="page"` markiert aktuell aktive Seite
- Server-side gerendert (verhindert Flash of Incorrect State)
- Visuelle Markierung (Underline) + ARIA für Screenreader

**Fokus-Indikatoren:**

```css
.header-nav a:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 2px;
}
```

### Vollständige Spezifikation

→ [Header-Dokumentation](../navigation/header.md)

---

## Mobile Drawer

### Relevante WCAG-Kriterien

- **2.1.2 Keine Tastaturfalle**: ESC schließt Drawer
- **4.1.2 Name, Rolle, Wert**: `aria-expanded`, `aria-controls` auf Toggle-Button

### Umsetzung

**Toggle-Button:**

```html
<button
  aria-expanded="false"
  aria-controls="mobile-drawer"
  aria-label="Navigation öffnen"
>
  <svg><!-- Hamburger Icon --></svg>
</button>
```

- `aria-expanded="true/false"`: Zeigt Drawer-Status an
- `aria-controls`: Verknüpft Button mit Drawer-ID
- `aria-label`: Beschreibender Text für Screenreader

**Drawer-Container:**

```html
<div
  id="mobile-drawer"
  role="dialog"
  aria-modal="true"
  aria-label="Hauptnavigation"
>
  <button aria-label="Schließen">
    <svg><!-- X Icon --></svg>
  </button>
  <nav>
    <!-- Navigation Links -->
  </nav>
</div>
```

**Focus-Management:**

- Fokus springt auf Close-Button bei Öffnung
- Focus Trap aktiv (Tab bleibt im Drawer)
- ESC schließt Drawer
- Fokus kehrt zu Hamburger-Button zurück bei Schließen

### Vollständige Spezifikation

→ [Mobile Drawer-Dokumentation](../navigation/mobile-drawer.md)

---

## Breadcrumb

### Relevante WCAG-Kriterien

- **2.4.8 Position (Orientierung)**: Nutzer weiß wo er sich befindet
- **4.1.2 Name, Rolle, Wert**: `aria-current="page"` für aktuelle Seite

### Umsetzung

**ARIA-Pattern:**

```html
<nav aria-label="Breadcrumb">
  <ol>
    <li><a href="/">Home</a></li>
    <li><a href="/produkte">Produkte</a></li>
    <li aria-current="page">Armaturen</li>
  </ol>
</nav>
```

- `<nav aria-label="Breadcrumb">`: Eindeutiges Landmark-Label (unterscheidet von Header-Nav)
- `<ol>`: Semantische geordnete Liste
- `aria-current="page"`: Markiert aktuelle Seite (nicht als Link)

**Separator:**

```css
li::after {
  content: "›";
  aria-hidden: true;
}
```

- CSS `::after` für Separator (nicht im DOM)
- Screenreader ignoriert Separator

### Vollständige Spezifikation

→ [Breadcrumb-Dokumentation](../navigation/breadcrumb.md)

---

## Footer

### Relevante WCAG-Kriterien

- **2.4.1 Blöcke überspringen**: Skip-Links ermöglichen schnelle Navigation
- **4.1.2 Name, Rolle, Wert**: `<footer>` Landmark, mehrere `<nav>` mit eindeutigen Labels

### Umsetzung

**Footer-Landmark:**

```html
<footer>
  <nav aria-label="Produkte">
    <!-- Produkt-Links -->
  </nav>
  <nav aria-label="Unternehmen">
    <!-- Unternehmens-Links -->
  </nav>
  <nav aria-label="Rechtliches">
    <!-- Legal-Links -->
  </nav>
</footer>
```

- `<footer>`: Automatisches `role="contentinfo"` Landmark
- Mehrere `<nav>` mit eindeutigen `aria-label` für Screenreader-Navigation

**Touch-Target-Optimierung:**

```css
.footer-nav a {
  line-height: 2; /* 28px bei 14px Font = WCAG AA */
}
```

### Vollständige Spezifikation

→ [Footer-Dokumentation](../navigation/footer.md)

---

## Product Card

### Relevante WCAG-Kriterien

- **1.1.1 Nicht-Text-Inhalt**: Produktbilder haben `alt`-Attribute
- **2.4.4 Linkzweck**: Gesamte Card klickbar mit aussagekräftigem Link-Text

### Umsetzung

**Alt-Texte:**

```html
<img
  src="armatur-xy.jpg"
  alt="Hydrophon Einhebel-Waschtischarmatur XY in Chrom"
  loading="lazy"
  decoding="async"
/>
```

- Beschreibender `alt`-Text (Produktname + Variante)
- `loading="lazy"`: Performance-Optimierung
- `decoding="async"`: Non-blocking Image-Decode

**Klickbare Card:**

```html
<article>
  <a href="/produkte/armatur-xy" class="card-link">
    <img src="..." alt="..." />
    <h3>Einhebel-Waschtischarmatur XY</h3>
    <p>ab 129,00 €</p>
  </a>
</article>
```

- Gesamte Card als `<a>` (nicht Button in Card)
- Heading als Link-Text für Screenreader-Kontext

### Vollständige Spezifikation

→ [Product Card-Dokumentation](../components/product-card.md)

---

## Content Card

### Relevante WCAG-Kriterien

- **1.1.1 Nicht-Text-Inhalt**: Bilder haben `alt`-Attribute
- **2.4.4 Linkzweck**: Aussagekräftige Call-to-Action

### Umsetzung

**Bilder (optional):**

```html
<!-- Mit Bild -->
<img
  src="case-study.jpg"
  alt="Moderne Sanitärinstallation in Bürogebäude"
/>

<!-- Ohne Bild (Text-only Variante) -->
<!-- Kein img-Element, kein alt nötig -->
```

**Call-to-Action:**

```html
<a href="/blog/case-study">
  Mehr erfahren →
</a>
```

- Aussagekräftiger Link-Text (nicht nur "Hier klicken")
- Pfeil-Icon rein dekorativ (`aria-hidden` im Icon-SVG)

### Vollständige Spezifikation

→ [Content Card-Dokumentation](../components/content-card.md)

---

## Data Table

### Relevante WCAG-Kriterien

- **1.3.1 Info und Beziehungen**: Header-Zellen mit `scope`-Attribut
- **2.1.1 Tastatur**: Horizontaler Scroll für responsive Tabellen

### Umsetzung

**Table-Struktur:**

```html
<table>
  <thead>
    <tr>
      <th scope="col">Produkt</th>
      <th scope="col">Preis</th>
      <th scope="col">Verfügbarkeit</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Armatur XY</th>
      <td>129,00 €</td>
      <td>Auf Lager</td>
    </tr>
  </tbody>
</table>
```

- `scope="col"` auf `<th>` in `<thead>`
- `scope="row"` auf erste Spalte (Produkt-Namen)
- Screenreader lesen Kontext: "Armatur XY, Preis: 129,00 €"

**Responsive: Horizontal Scroll:**

```html
<div class="table-wrapper" tabindex="0">
  <table>
    <!-- Table content -->
  </table>
</div>
```

- `tabindex="0"`: Macht Scroll-Container keyboard-accessible
- Alternative: Stacked-Card-Layout für sehr einfache Tabellen

### Vollständige Spezifikation

→ [Data Table-Dokumentation](../components/data-table.md)

---

## Loading States

### Relevante WCAG-Kriterien

- **2.2.2 Pausieren, Stoppen, Ausblenden**: Animationen respektieren `prefers-reduced-motion`
- **4.1.3 Statusmeldungen**: Progress-Updates werden angekündigt

### Umsetzung

**Spinner:**

```css
.spinner {
  animation: rotate 1s linear infinite;
}

@media (prefers-reduced-motion: reduce) {
  .spinner {
    animation: none;
    opacity: 0.6; /* Statisches Icon */
  }
}
```

**Progress Bar (Native):**

```html
<progress
  value="60"
  max="100"
  aria-label="Upload-Fortschritt"
>
  60%
</progress>
```

- Native `<progress>` Element hat eingebaute Screenreader-Unterstützung
- `aria-label`: Beschreibt was geladen wird

**Skeleton Screens:**

- `prefers-reduced-motion: reduce`: Shimmer-Animation deaktiviert
- Statische Grau-Boxen zeigen Loading-Zustand

### Vollständige Spezifikation

→ [Loading-Dokumentation](../feedback/loading.md)

---

## Zusammenfassung

Alle 17 dokumentierten Komponenten erfüllen WCAG 2.1 Level AA.

**Häufigste Accessibility-Patterns:**

1. **Native HTML bevorzugen:** `<button>`, `<select>`, `<progress>`, `<fieldset>` haben eingebaute Accessibility
2. **ARIA nur wo nötig:** Korrekte `role`, `aria-expanded`, `aria-current`, `aria-describedby`
3. **Focus-Management:** Deutliche Fokus-Indikatoren, Focus Traps in Modals, Fokus-Rückkehr
4. **Keyboard-Support:** Tab, Enter, Space, ESC, Arrow-Keys
5. **Screenreader-Support:** Live Regions, Labels, Beschreibungen
6. **Motion-Respekt:** `prefers-reduced-motion` für alle Animationen

**Testing-Verantwortung:**

Jede neue Komponente oder Feature muss vor Release:

- ✓ axe DevTools: 0 kritische Fehler
- ✓ Lighthouse Accessibility: Score 90+
- ✓ Keyboard-Test: Alle Funktionen erreichbar
- ✓ Screenreader-Test: Inhalte verständlich vorgelesen

→ [Testing-Anleitung](./testing-guide.md)

---

**Letzte Aktualisierung:** 2026-01-29
