# Select / Dropdown

Auswahlfeld für die Selektion einer einzelnen Option aus einer vordefinierten Liste von Möglichkeiten.

## Übersicht

Select-Komponenten (auch Dropdown genannt) ermöglichen Benutzern die Auswahl einer einzelnen Option aus einer Liste. Sie sind platzsparend, da nur die ausgewählte Option sichtbar ist, bis der Benutzer die Liste öffnet.

### Native vs. Custom Select

**Empfehlung: Native `<select>` bevorzugen**

Wann immer möglich, sollte das native HTML `<select>`-Element verwendet werden:

**Vorteile von Native Select:**
- ✅ **Accessibility:** Vollständig barrierefrei ohne zusätzlichen Code
- ✅ **Tastatur-Navigation:** Browser-native Bedienung (Pfeiltasten, Enter, Escape)
- ✅ **Screen Reader:** Perfekte Unterstützung ohne ARIA
- ✅ **Mobile:** Nutzt native OS-Picker (iOS Wheel, Android Dropdown)
- ✅ **Performance:** Keine JavaScript-Overhead
- ✅ **Zuverlässigkeit:** Kein Risiko für Custom-Bugs

**Nachteile von Native Select:**
- ❌ **Styling-Grenzen:** Limitierte visuelle Anpassbarkeit (insbesondere Options)
- ❌ **Keine Icons in Options:** Nur Text möglich
- ❌ **Keine Gruppierungs-Visualisierung:** `<optgroup>` hat Standard-Styling
- ❌ **Kein Multi-Select UX:** `multiple`-Attribut hat schlechte UX

**Wann Custom Select verwenden:**
- Icons oder Bilder in Options notwendig
- Komplexe Option-Layouts (z.B. Name + Beschreibung)
- Multi-Select mit Checkboxen
- Autocomplete/Search innerhalb Dropdown
- Sehr spezifisches Brand-Styling erforderlich

### Anatomie

Ein vollständiges Native Select besteht aus:

- **Container:** Border + Background (konsistent mit Text Input)
- **Selected Value:** Aktuell ausgewählter Text
- **Dropdown Icon:** ChevronDown Icon (20px) rechts
- **Label:** Beschriftung oberhalb (Pflicht)
- **Options List:** Dropdown-Liste bei Klick (Browser-styled)
- **Helper Text:** Optional - Zusätzliche Hinweise
- **Error Message:** Fehlermeldung bei ungültiger Auswahl
- **Required Indicator:** Rotes Sternchen (*) bei Pflichtfeldern

### Verwendung

Select-Komponenten werden verwendet für:

- **Vordefinierte Optionen:** Land, Stadt, Kategorie, Sortierung
- **Status-Auswahl:** Bestellstatus, Priorität, Phase
- **Listen mit 3-15 Optionen:** Nicht zu wenig (dann Radio), nicht zu viel (dann Autocomplete)
- **Mobile-freundliche Auswahl:** Native Picker besser als Custom-Dropdowns

**Wann nicht verwenden:**

- 2 Optionen → Radio Buttons verwenden (direktere Auswahl)
- Über 15 Optionen → Autocomplete/Search Input verwenden
- Multi-Select → Custom Multi-Select mit Checkboxen (separate Komponente)
- Ja/Nein Entscheidung → Toggle Switch oder Checkbox verwenden
- Freitext-Eingabe → Text Input verwenden

## Größen

Select-Komponenten verwenden dieselben Größen wie Text Inputs für visuelle Konsistenz.

### Small (32px)

**Spezifikationen:**
- Höhe: `32px` (input.height.sm)
- Padding horizontal: `8px` links, `32px` rechts (Platz für Icon)
- Schriftgröße: `14px` (input.font.size.sm)
- Icon-Größe: `20px` (input.select.iconSize)

**Verwendung:**
- Kompakte Desktop-Interfaces
- Tabellen-Filter, Sortierungs-Dropdowns
- Admin-Panels mit hoher Informationsdichte

**Wichtig:** Nur Desktop - Touch-Target unter 44px nicht mobile-friendly.

### Medium (40px) - Standard

**Spezifikationen:**
- Höhe: `40px` (input.height.md)
- Padding horizontal: `12px` links, `36px` rechts
- Schriftgröße: `16px` (input.font.size.md)
- Icon-Größe: `20px`

**Verwendung:**
- Standard für Formulare
- Responsive Layouts (Desktop + Mobile)
- Checkout-Prozesse, Registrierung

**Vorteile:**
- Gute Balance zwischen Kompaktheit und Usability
- 40px Höhe bietet ausreichende Touch-Ergonomie

### Large (48px)

**Spezifikationen:**
- Höhe: `48px` (input.height.lg)
- Padding horizontal: `16px` links, `40px` rechts
- Schriftgröße: `18px` (input.font.size.lg)
- Icon-Größe: `20px`

**Verwendung:**
- Mobile-optimierte Formulare
- Hero-Sections mit prominenten Selects (z.B. Produktfilter)
- CTAs und wichtige Auswahlfelder

**Vorteile:**
- Übertrifft WCAG AAA Touch-Target (44px)
- Großzügige Klickfläche
- Gute Lesbarkeit durch 18px Schrift

## Zustände

Select-Komponenten folgen denselben Zuständen wie Text Inputs.

### Default

Der Standard-Zustand eines Selects ohne Benutzerinteraktion.

**Visuelle Eigenschaften:**
- Border: `1px solid neutral.300`
- Background: `neutral.white`
- Text: `neutral.900` (ausgewählter Wert)
- Icon: `neutral.600`, ChevronDown, 20px, rechts positioniert
- Cursor: `pointer`

**Design Tokens:**
```
input.field.background.default
input.field.border.default
input.field.text.default
input.select.iconColor.default
input.select.iconSize
```

**Wichtig:** Placeholder-Option für "Bitte wählen" verwenden:
```html
<option value="" disabled selected>Bitte wählen...</option>
```

### Hover

Zustand wenn der Mauszeiger über dem Select schwebt.

**Visuelle Eigenschaften:**
- Border: `1px solid neutral.400`
- Background: `neutral.white`
- Icon: Unverändert `neutral.600`
- Cursor: `pointer`

**Design Tokens:**
```
input.field.border.hover
```

### Focus / Open

Zustand wenn Select fokussiert ist oder Dropdown-Liste geöffnet wurde.

**Visuelle Eigenschaften:**
- Border: `2px solid hydrophon.blau.500`
- Focus Ring: `3px hydrophon.blau.100`
- Background: `neutral.white`
- Icon: Optional rotiert um 180° (zeigt nach oben bei geöffnetem Dropdown)

**Design Tokens:**
```
input.field.border.focus
input.field.borderWidth.focus
input.focus.ring.color
input.focus.ring.width
```

**Icon-Rotation (optional):**
```css
select:focus + .select-icon {
  transform: rotate(180deg);
}
```

**WCAG 2.4.7 Konformität:**
- Deutlich sichtbarer Focus-Indikator
- `:focus-visible` für Tastatur-Navigation

### Error

Zustand bei ungültiger oder fehlender Auswahl (z.B. Pflichtfeld nicht ausgefüllt).

**Visuelle Eigenschaften:**
- Border: `1px solid color.error`
- Background: `neutral.white`
- Error Icon: Optional - AlertCircle links neben Dropdown-Icon
- Error Message: Unterhalb, 12px, rot

**Design Tokens:**
```
input.field.border.error
input.error.color
input.error.fontSize
```

**Verwendung:**
- Pflichtfeld nicht ausgefüllt (Value = "")
- Ungültige Auswahl nach Business-Logik (z.B. nicht verfügbare Option)

**Fehlermeldungen:**
```
❌ Schlecht: "Ungültig"
✅ Gut: "Bitte wähle ein Land aus"
✅ Gut: "Diese Option ist aktuell nicht verfügbar"
```

### Disabled

Zustand für nicht-auswählbare Selects (z.B. abhängige Felder).

**Visuelle Eigenschaften:**
- Background: `neutral.50`
- Border: `1px solid neutral.200`
- Text: `neutral.600`
- Icon: `neutral.400` (gedämpft)
- Opacity: `0.7`
- Cursor: `not-allowed`

**Design Tokens:**
```
input.field.background.disabled
input.field.border.disabled
input.field.text.disabled
input.select.iconColor.disabled
```

**Accessibility:**
- `disabled` Attribut setzen (verhindert Fokus und Auswahl)
- Optional: Tooltip mit Erklärung warum deaktiviert

## Dropdown Icon

Das Dropdown-Icon ist essenziell für die Erkennbarkeit eines Select-Elements.

### Icon-Spezifikation

**Icon:** Lucide `ChevronDown`
- **Größe:** 20px (input.select.iconSize)
- **Stroke Width:** 2px (Lucide Standard)
- **Farbe:** `currentColor` oder `neutral.600`
- **Position:** Rechts, vertikal zentriert, 8-12px vom rechten Rand

**Design Tokens:**
```
input.select.iconSize: 20px
input.select.iconColor.default: neutral.600
input.select.iconColor.disabled: neutral.400
```

### Icon-Position

**Absolute Positionierung:**
```css
.select-wrapper {
  position: relative;
}

.select-icon {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none; /* Icon nicht klickbar, nur Select */
  color: var(--input-select-icon-color-default);
}
```

**Native Select Icon ausblenden:**
```css
select {
  appearance: none; /* Entfernt Browser-Default-Icon */
  -webkit-appearance: none;
  -moz-appearance: none;
}
```

## Options Styling

**Wichtige Einschränkung:** Native `<option>`-Elemente haben sehr limitierte Styling-Möglichkeiten.

### Was funktioniert

- **Text:** Schriftart, Größe (erbt von `<select>`)
- **Farbe:** `color` und `background-color` (sehr limitiert, Browser-abhängig)
- **Disabled Options:** `<option disabled>` hat gedämpftes Grau

### Was nicht funktioniert

- ❌ Icons in Options
- ❌ Komplexe Layouts (z.B. Name + Beschreibung zweizeilig)
- ❌ Custom Checkboxen (bei Multi-Select)
- ❌ Borders, Shadows, Hover-States

### Optgroup (Gruppen)

Native Unterstützung für Gruppierung:

```html
<select>
  <optgroup label="Europa">
    <option value="de">Deutschland</option>
    <option value="fr">Frankreich</option>
  </optgroup>
  <optgroup label="Nordamerika">
    <option value="us">USA</option>
    <option value="ca">Kanada</option>
  </optgroup>
</select>
```

**Styling:** Browser-Default (grau, eingerückt) - schwer anzupassen.

## Custom Select (Wann und Wie)

Wenn native Selects nicht ausreichen, muss eine Custom-Implementierung erfolgen.

### Anforderungen an Custom Select

**Pflicht-Features:**
- ✅ Vollständige Tastatur-Navigation (Pfeiltasten, Enter, Escape, Home, End)
- ✅ ARIA-Attribute (`role="listbox"`, `aria-expanded`, `aria-activedescendant`)
- ✅ Screen Reader Support (alle Options vorgelesen)
- ✅ Focus Management (Focus bleibt beim Öffnen/Schließen erhalten)
- ✅ Click-Outside zum Schließen
- ✅ Escape-Taste zum Schließen

**Empfohlene Libraries:**
- **Headless UI (React/Vue):** Accessibility eingebaut, unstyled
- **Radix UI (React):** Composable Select Primitive
- **Downshift (React):** Flexible Select/Autocomplete
- **Tom Select:** Vanilla JS, sehr feature-reich

### Anti-Pattern: Custom Div-Dropdowns

**Niemals Custom Dropdowns ohne ARIA bauen!**

```html
<!-- ❌ FALSCH - Nicht barrierefrei -->
<div class="select" onclick="toggleDropdown()">
  <span>Bitte wählen</span>
  <div class="dropdown" id="dropdown">
    <div onclick="selectOption('option1')">Option 1</div>
    <div onclick="selectOption('option2')">Option 2</div>
  </div>
</div>
```

**Probleme:**
- Keine Tastatur-Navigation
- Screen Reader erkennt keine Options
- Kein Focus Management
- Mobile: Kein native Picker
- Performance: Event-Listener auf jedem Item

**Wenn Custom, dann richtig:**
```html
<!-- ✅ RICHTIG - Mit ARIA -->
<div class="select-wrapper">
  <button
    type="button"
    role="combobox"
    aria-expanded="false"
    aria-controls="listbox"
    aria-haspopup="listbox"
    id="select-button"
  >
    <span>Bitte wählen</span>
    <svg aria-hidden="true"><!-- ChevronDown Icon --></svg>
  </button>

  <ul
    role="listbox"
    id="listbox"
    aria-labelledby="select-button"
    hidden
  >
    <li role="option" aria-selected="false" id="option-1">Option 1</li>
    <li role="option" aria-selected="false" id="option-2">Option 2</li>
  </ul>
</div>
```

## Accessibility (WCAG 2.1 AA)

Native Selects sind von Haus aus barrierefrei. Custom Selects benötigen umfangreiche ARIA-Implementation.

### WCAG Anforderungen

**3.3.2 Labels oder Anweisungen (Level A):**
- Sichtbares Label oberhalb
- Label mit `for` / `id` verknüpft

**4.1.2 Name, Rolle, Wert (Level A):**
- Native Select: Automatisch erfüllt
- Custom Select: `role="listbox"`, `role="option"`, `aria-selected` erforderlich

**2.1.1 Tastatur (Level A):**
- Alle Funktionen müssen per Tastatur bedienbar sein
- Native Select: Browser-native Unterstützung
- Custom Select: Pfeiltasten, Enter, Escape, Tab implementieren

### HTML-Struktur Native Select

**Standard Select:**
```html
<div class="form-field">
  <label for="country" class="input-label">
    Land <span class="required">*</span>
  </label>
  <div class="select-wrapper">
    <select id="country" name="country" required aria-required="true">
      <option value="" disabled selected>Bitte wählen...</option>
      <option value="de">Deutschland</option>
      <option value="at">Österreich</option>
      <option value="ch">Schweiz</option>
    </select>
    <svg class="select-icon" width="20" height="20">
      <!-- ChevronDown Icon -->
    </svg>
  </div>
</div>
```

**Mit Helper Text:**
```html
<div class="form-field">
  <label for="priority">Priorität</label>
  <div class="select-wrapper">
    <select id="priority" aria-describedby="priority-help">
      <option value="low">Niedrig</option>
      <option value="medium">Mittel</option>
      <option value="high">Hoch</option>
    </select>
    <svg class="select-icon"><!-- Icon --></svg>
  </div>
  <span id="priority-help" class="helper-text">
    Bestimmt die Bearbeitungsreihenfolge
  </span>
</div>
```

**Error State:**
```html
<div class="form-field">
  <label for="category">Kategorie <span class="required">*</span></label>
  <div class="select-wrapper">
    <select
      id="category"
      aria-invalid="true"
      aria-describedby="category-error"
    >
      <option value="" disabled selected>Bitte wählen...</option>
      <option value="cat1">Kategorie 1</option>
    </select>
    <svg class="select-icon"><!-- Icon --></svg>
  </div>
  <span id="category-error" class="error-text" role="alert">
    Bitte wähle eine Kategorie aus
  </span>
</div>
```

### Tastatur-Navigation (Native Select)

- **Tab:** Fokus auf Select
- **Space / Enter:** Dropdown öffnen
- **Pfeil Runter / Pfeil Hoch:** Nächste/Vorherige Option
- **Home:** Erste Option
- **End:** Letzte Option
- **Buchstabe tippen:** Spring zu Option die mit Buchstabe beginnt
- **Escape:** Dropdown schließen (ohne Auswahl)
- **Enter (bei geöffneter Liste):** Auswahl bestätigen und schließen

## Code-Beispiel

### CSS mit Design Tokens

```css
/* Select Wrapper */
.select-wrapper {
  position: relative;
  display: inline-block;
  width: 100%;
}

/* Native Select */
select {
  /* Remove default styling */
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  /* Sizing */
  height: var(--input-height-md); /* 40px */
  width: 100%;
  padding: 0 36px 0 var(--input-padding-x-md); /* Right padding for icon */

  /* Typography */
  font-family: var(--input-base-font-family);
  font-size: var(--input-font-size-md); /* 16px */
  color: var(--input-field-text-default);

  /* Visual */
  background-color: var(--input-field-background-default);
  border: var(--input-field-border-width-default) solid var(--input-field-border-default);
  border-radius: var(--input-base-border-radius); /* 4px */

  /* Interaction */
  cursor: pointer;
  transition: var(--input-base-transition);
}

/* Dropdown Icon */
.select-icon {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: var(--input-select-icon-size); /* 20px */
  height: var(--input-select-icon-size);
  color: var(--input-select-icon-color-default);
  pointer-events: none; /* Click goes through to select */
  transition: transform 150ms ease-in-out;
}

/* Hover State */
select:hover:not(:disabled) {
  border-color: var(--input-field-border-hover);
}

/* Focus State */
select:focus-visible {
  outline: var(--input-field-border-width-focus) solid var(--input-field-border-focus);
  outline-offset: var(--input-focus-outline-offset);
  box-shadow: 0 0 0 var(--input-focus-ring-width) var(--input-focus-ring-color);
  border-color: var(--input-field-border-focus);
}

/* Icon rotation when open (requires JavaScript to add class) */
select:focus + .select-icon {
  transform: translateY(-50%) rotate(180deg);
}

/* Error State */
select[aria-invalid="true"] {
  border-color: var(--input-field-border-error);
}

/* Disabled State */
select:disabled {
  background-color: var(--input-field-background-disabled);
  border-color: var(--input-field-border-disabled);
  color: var(--input-field-text-disabled);
  cursor: not-allowed;
  opacity: 0.7;
}

select:disabled + .select-icon {
  color: var(--input-select-icon-color-disabled);
}

/* Size Variants */
select.select--small {
  height: var(--input-height-sm); /* 32px */
  padding-left: var(--input-padding-x-sm); /* 8px */
  padding-right: 32px;
  font-size: var(--input-font-size-sm); /* 14px */
}

select.select--large {
  height: var(--input-height-lg); /* 48px */
  padding-left: var(--input-padding-x-lg); /* 16px */
  padding-right: 40px;
  font-size: var(--input-font-size-lg); /* 18px */
}

/* Option Styling (very limited) */
option {
  padding: 8px;
}

option:disabled {
  color: var(--input-field-text-disabled);
}

/* Optgroup Styling (even more limited) */
optgroup {
  font-weight: var(--input-label-font-weight); /* 500 */
  color: var(--input-label-color-default);
}
```

### JavaScript für Icon-Rotation

```javascript
// Optional: Rotate icon when dropdown is open
document.querySelectorAll('select').forEach(select => {
  const icon = select.nextElementSibling; // Assumes icon is next sibling

  select.addEventListener('focus', () => {
    if (icon && icon.classList.contains('select-icon')) {
      icon.style.transform = 'translateY(-50%) rotate(180deg)';
    }
  });

  select.addEventListener('blur', () => {
    if (icon && icon.classList.contains('select-icon')) {
      icon.style.transform = 'translateY(-50%) rotate(0deg)';
    }
  });
});
```

## Design Tokens Referenz

| Token Name | Wert | Verwendung |
|------------|------|------------|
| `input.height.sm` | 32px | Select-Höhe Small |
| `input.height.md` | 40px | Select-Höhe Medium (Standard) |
| `input.height.lg` | 48px | Select-Höhe Large |
| `input.padding.x.sm` | 8px | Horizontales Padding Small |
| `input.padding.x.md` | 12px | Horizontales Padding Medium |
| `input.padding.x.lg` | 16px | Horizontales Padding Large |
| `input.font.size.sm` | 14px | Schriftgröße Small |
| `input.font.size.md` | 16px | Schriftgröße Medium |
| `input.font.size.lg` | 18px | Schriftgröße Large |
| `input.select.iconSize` | 20px | Dropdown Icon Größe |
| `input.select.iconColor.default` | neutral.600 | Icon-Farbe Standard |
| `input.select.iconColor.disabled` | neutral.400 | Icon-Farbe Disabled |
| `input.field.background.default` | neutral.white | Hintergrund Standard |
| `input.field.border.default` | neutral.300 | Border Standard |
| `input.field.border.hover` | neutral.400 | Border Hover |
| `input.field.border.focus` | hydrophon.blau.500 | Border Focus |
| `input.field.border.error` | color.error | Border Error |
| `input.field.border.disabled` | neutral.200 | Border Disabled |
| `input.field.text.default` | neutral.900 | Text-Farbe |
| `input.base.borderRadius` | 4px | Eckenradius |

---

**Version:** 1.0
**Letzte Aktualisierung:** 2026-01-29
**Phase:** 03 - Forms & Data Input
**Komponente:** FORM-03 - Select / Dropdown
