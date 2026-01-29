# Radio Button

Ermöglicht Auswahl genau **einer** Option aus einer Gruppe. Radio Buttons sind für exklusive Entscheidungen - die Auswahl einer Option hebt automatisch alle anderen auf.

## Übersicht

### Anatomie

Ein Radio Button besteht aus folgenden Elementen:

- **Native Input** - Natives `<input type="radio">` Element (visuell versteckt, Accessibility erhalten)
- **Custom Visual** - Gestylter Kreis-Container, der das native Element überlagert
- **Inner Dot** - Weißer gefüllter Kreis (50% der Gesamtgröße) bei ausgewähltem Zustand
- **Label-Text** - Beschreibender Text neben dem Radio Button
- **Helper Text** (optional) - Zusätzliche Erklärung unter der Option
- **Error Message** (optional) - Validierungsfehlermeldung für die gesamte Gruppe

### Verwendung

Radio Buttons eignen sich für:

- **Exklusive Auswahl** - Nur eine Option aus mehreren möglich (z.B. Zahlungsmethode)
- **Versandoptionen** - Standard, Express, Overnight
- **Einstellungen** - Ja/Nein, Klein/Mittel/Groß
- **Prioritäten** - Niedrig, Normal, Hoch
- **Sortierung** - Aufsteigend, Absteigend

**Nicht verwenden für:**
- Mehrfachauswahl (0 bis N Optionen möglich) → verwende Checkboxen
- Ein/Aus-Schalter mit sofortiger Wirkung → verwende Toggle Switch
- Sehr viele Optionen (>7) → verwende Select/Dropdown

### Unterschied zu Checkbox

| Kriterium | Radio Button | Checkbox |
|-----------|--------------|----------|
| **Auswahl** | Exakt **eine** Option | **Null, eine oder mehrere** Optionen |
| **Verhalten** | Auswahl hebt vorherige auf | Jede unabhängig an/abwählbar |
| **Verwendung** | Mutuell exklusive Werte | Unabhängige Ja/Nein-Entscheidungen |
| **Beispiel** | Versandart: Standard ODER Express | Newsletter: News UND Events UND Angebote |
| **Pflicht** | Immer eine Option ausgewählt | Keine Auswahl möglich |

**Wichtig:** Radio Buttons sollten **immer in Gruppen** erscheinen (minimum 2 Optionen). Ein einzelner Radio Button ergibt keinen Sinn, da er nicht abgewählt werden kann.

## Größen

### Default (20px)

- Radio: **20×20px** Kreis
- Inner Dot: **10px** (50% der Gesamtgröße)
- Verwendung: Standard für die meisten Formulare
- Desktop und Mobile geeignet

### Large (24px)

- Radio: **24×24px** Kreis
- Inner Dot: **12px** (50% der Gesamtgröße)
- Verwendung: Mobile-optimierte Interfaces, verbesserte Touch-Targets
- Erfüllt WCAG AAA 44px Empfehlung in Kombination mit Label-Klickfläche

## Zustände

### Unselected Default

- Background: `neutral.white`
- Border: `neutral.300` (2px)
- Inner Dot: nicht sichtbar
- Visuell: Leerer weißer Kreis mit grauem Rahmen

### Unselected Hover

- Background: `neutral.white`
- Border: `neutral.400` (dunkler)
- Inner Dot: nicht sichtbar
- Feedback: Subtile Verdunklung des Rahmens

### Selected

- Background: `hydrophon.blau.500`
- Border: `hydrophon.blau.500`
- Inner Dot: Weißer Kreis (50% der Gesamtgröße)
- Visuell: Blauer Kreis mit weißem Punkt in der Mitte

### Selected Hover

- Background: `hydrophon.blau.600` (dunkler)
- Border: `hydrophon.blau.600`
- Inner Dot: Weißer Kreis
- Feedback: Verdunklung bei Hover über ausgewählten Radio Button

### Focus

- Outline: 2px `hydrophon.blau.300`
- Offset: 2px
- Nur bei `:focus-visible` (Tastatur-Navigation)
- Kombiniert mit aktuellem Zustand (selected/unselected)

**Wichtig:** Focus-Indikator erscheint NUR bei Tastatur-Navigation, nicht bei Maus-Klick. Dies verhindert visuelles Rauschen und erfüllt gleichzeitig WCAG 2.4.7 (Focus sichtbar).

### Error

- Border: `color.error` (rot)
- Error-Message unter der **gesamten Radio-Gruppe** (nicht pro Option)
- Alle Radios in der Gruppe erhalten roten Border
- Bei Pflichtfeld-Validierung: "Bitte wählen Sie eine Option aus"

### Disabled (Unselected)

- Background: `neutral.50` (leicht grau)
- Border: `neutral.200` (gedämpft)
- Label: `neutral.400` (gedämpft)
- Cursor: `not-allowed`
- Nicht interaktiv, nicht fokussierbar

### Disabled (Selected)

- Background: `neutral.300` (gedämpftes Grau)
- Border: `neutral.300`
- Inner Dot: Weißer Kreis (reduzierter Kontrast)
- Label: `neutral.400`
- Zeigt vorherige Auswahl, aber nicht änderbar

## Radio-Gruppe

Radio Buttons funktionieren nur in Gruppen korrekt. Alle Radios mit gleichem `name` Attribut gehören zu einer Gruppe.

### Tastaturnavigation (native)

Native `<input type="radio">` Elemente haben spezielle Tastatur-Navigation:

- **Tab** - Fokussiert die aktuell ausgewählte Radio in der Gruppe (oder erste, falls keine ausgewählt)
- **Pfeiltasten (↑/↓)** - Wechselt und wählt automatisch die nächste/vorherige Option
- **Pfeiltasten (←/→)** - Wie ↑/↓ (funktioniert für horizontal angeordnete Gruppen)
- **Space** - Wählt die aktuell fokussierte Option aus

**Wichtig:** Diese native Tastatur-Navigation funktioniert **NUR** mit nativen `<input type="radio">` Elementen. Custom div-basierte Radios ohne natives Input verlieren diese Funktionalität.

### Fieldset-Pattern

Verwende `<fieldset>` und `<legend>` für Radio-Gruppen:

```html
<fieldset>
  <legend>Versandart wählen <span aria-label="Pflichtfeld">*</span></legend>

  <label class="radio-container">
    <input type="radio" name="shipping" value="standard" class="radio-native" />
    <span class="radio-custom">
      <span class="radio-dot"></span>
    </span>
    <span class="radio-label">Standard (3-5 Werktage) - Kostenlos</span>
  </label>

  <label class="radio-container">
    <input type="radio" name="shipping" value="express" class="radio-native" />
    <span class="radio-custom">
      <span class="radio-dot"></span>
    </span>
    <span class="radio-label">Express (1-2 Werktage) - 9,90 €</span>
  </label>

  <label class="radio-container">
    <input type="radio" name="shipping" value="overnight" class="radio-native" />
    <span class="radio-custom">
      <span class="radio-dot"></span>
    </span>
    <span class="radio-label">Overnight (nächster Werktag) - 19,90 €</span>
  </label>
</fieldset>
```

**Wichtig:**
- **Gleicher `name`-Wert** - Alle Radios in einer Gruppe müssen den gleichen `name` haben
- **Unterschiedlicher `value`-Wert** - Jedes Radio hat einen eindeutigen `value`
- **`<legend>` beschreibt die Gruppe** - Screenreader lesen: "Versandart wählen, Radio Group"
- **`<fieldset>` gruppiert semantisch** - Visuell und für Accessibility

### Orientierung

**Vertikal (Standard)**
- Optionen untereinander angeordnet
- Verwendet für: 3+ Optionen, komplexe Labels
- Spacing: `{spacing.3}` (12px) zwischen Optionen

**Horizontal**
- Optionen nebeneinander angeordnet
- Verwendet für: 2-4 kurze Optionen
- Spacing: `{spacing.4}` (16px) zwischen Optionen
- **Maximum: 3-4 Optionen** - Sonst horizontal scrolling nötig

```css
/* Vertikale Gruppe (Standard) */
.radio-group {
  display: flex;
  flex-direction: column;
  gap: var(--radio-group-gap); /* 12px */
}

/* Horizontale Gruppe */
.radio-group-horizontal {
  display: flex;
  flex-direction: row;
  gap: var(--spacing-4); /* 16px */
  flex-wrap: wrap; /* Bei schmalen Viewports umbrechen */
}
```

## Custom-Styling-Pattern

### Accessibility-konformes Verstecken

Gleiche Technik wie bei Checkboxen - das native `<input type="radio">` Element MUSS im DOM verbleiben:

**RICHTIG: `opacity: 0` behält Accessibility**

```css
.radio-native {
  opacity: 0;
  position: absolute;
  width: 1px;
  height: 1px;
  pointer-events: none;
}
```

Diese Technik:
- Entfernt visuell das native Element
- Behält es im Accessibility Tree (Screenreader erkennen es)
- Erhält Tastatur-Navigation (Pfeiltasten funktionieren)
- Erhält native Radio-Gruppen-Logik (nur eine Option ausgewählt)

**FALSCH: `display: none` entfernt aus Accessibility Tree**

```css
.radio-native {
  display: none; /* NIEMALS! */
}
```

Diese Technik:
- Entfernt Element komplett aus DOM
- Screenreader können es nicht erkennen
- Pfeil-Navigation funktioniert nicht
- Radio-Gruppen-Logik bricht
- WCAG 4.1.2 Verletzung

### Focus-Weiterleitung und Checked-State

```css
/* Focus auf nativem Input stylt Custom Visual */
.radio-native:focus-visible + .radio-custom {
  outline: 2px solid var(--radio-focus-outline-color);
  outline-offset: 2px;
}

/* Checked-State - Kreis gefüllt */
.radio-native:checked + .radio-custom {
  background-color: var(--radio-background-checked);
  border-color: var(--radio-border-checked);
}

/* Inner Dot erscheint nur bei checked */
.radio-dot {
  opacity: 0;
  width: var(--radio-dot-size);
  height: var(--radio-dot-size);
  border-radius: 50%;
  background-color: var(--radio-dot-color);
  transition: opacity 150ms ease-in-out;
}

.radio-native:checked + .radio-custom .radio-dot {
  opacity: 1;
}

/* Checked + Hover kombiniert */
.radio-native:checked + .radio-custom:hover {
  background-color: var(--radio-background-checked-hover);
}

/* Disabled State */
.radio-native:disabled + .radio-custom {
  background-color: var(--radio-background-disabled);
  border-color: var(--radio-border-disabled);
  cursor: not-allowed;
}

/* Disabled + Checked kombiniert */
.radio-native:disabled:checked + .radio-custom {
  background-color: var(--radio-background-checked-disabled);
}

.radio-native:disabled ~ .radio-label {
  color: var(--radio-label-color-disabled);
}
```

## Accessibility

### WCAG Anforderungen

**4.1.2 Name, Rolle, Wert**
- Native `<input type="radio">` behält automatisch Radio-Rolle
- Screenreader kündigen korrekt an: "radio button, not checked" / "radio button, checked"
- Keine zusätzlichen ARIA-Attribute nötig (außer `aria-describedby` für Errors)

**2.4.3 Focus-Reihenfolge**
- Tab wechselt zwischen Radio-Gruppen (nicht zwischen einzelnen Radios)
- Pfeiltasten navigieren innerhalb der Gruppe
- Focus springt zur aktuell ausgewählten Option (oder erste, falls keine ausgewählt)

**3.3.2 Labels oder Instructions**
- `<legend>` beschreibt die Gruppe ("Versandart wählen")
- Jedes `<label>` beschreibt die einzelne Option ("Standard", "Express")
- Screenreader lesen: "Versandart wählen, Radio Group, Standard, radio button, not checked"

**1.4.3 Kontrast**
- Text-Kontrast: 4.5:1 (Label auf weißem Hintergrund)
- UI-Komponenten-Kontrast: 3:1 (Border auf weißem Hintergrund)
- Selected-State: Blau mit weißem Dot für maximalen Kontrast

**2.5.5 Touch-Target-Größe (WCAG 2.2)**
- Minimum: 44×44px (AAA-Empfehlung)
- Default Radio (20px) + Label-Klickfläche erfüllt dies
- Large Radio (24px) für reine Icon-Darstellung

### Native Keyboard-Patterns

Radio Buttons innerhalb einer Gruppe (gleicher `name`) haben spezielle Navigation:

**Erste Tabulator-Taste:**
- Fokussiert aktuell ausgewählte Radio in der Gruppe
- Falls keine ausgewählt: Fokussiert erste Radio

**Pfeiltasten (↑/↓ oder ←/→):**
- Wechselt zur nächsten/vorherigen Option
- **Wählt automatisch die neue Option aus** (checked-State ändert sich)
- Bei letzter Option: Springt zur ersten (wrap around)

**Space-Taste:**
- Wählt aktuell fokussierte Option aus
- Überschreibt vorherige Auswahl

**Diese Navigation funktioniert NUR mit nativen `<input type="radio">` Elementen!**

### HTML-Struktur

**Empfohlene Struktur:**

```html
<fieldset>
  <legend>Zahlungsmethode auswählen</legend>

  <label class="radio-container">
    <input type="radio" name="payment" value="invoice" class="radio-native" checked />
    <span class="radio-custom">
      <span class="radio-dot"></span>
    </span>
    <span class="radio-label">Rechnung</span>
  </label>

  <label class="radio-container">
    <input type="radio" name="payment" value="card" class="radio-native" />
    <span class="radio-custom">
      <span class="radio-dot"></span>
    </span>
    <span class="radio-label">Kreditkarte</span>
  </label>

  <label class="radio-container">
    <input type="radio" name="payment" value="paypal" class="radio-native" />
    <span class="radio-custom">
      <span class="radio-dot"></span>
    </span>
    <span class="radio-label">PayPal</span>
  </label>
</fieldset>
```

**Mit Helper Text pro Option:**

```html
<label class="radio-container">
  <input type="radio" name="plan" value="basic" class="radio-native" aria-describedby="basic-helper" />
  <span class="radio-custom">
    <span class="radio-dot"></span>
  </span>
  <div>
    <span class="radio-label">Basic Plan</span>
    <p id="basic-helper" class="radio-helper">Für kleine Teams (bis 5 Nutzer)</p>
  </div>
</label>
```

## Error-Handling

### Pflichtfeld-Validierung

Radio-Gruppen mit `required` Attribut:

```html
<fieldset aria-describedby="shipping-error">
  <legend>Versandart wählen *</legend>

  <label class="radio-container radio-error">
    <input type="radio" name="shipping" value="standard" class="radio-native" required />
    <span class="radio-custom">
      <span class="radio-dot"></span>
    </span>
    <span class="radio-label">Standard</span>
  </label>

  <label class="radio-container radio-error">
    <input type="radio" name="shipping" value="express" class="radio-native" required />
    <span class="radio-custom">
      <span class="radio-dot"></span>
    </span>
    <span class="radio-label">Express</span>
  </label>

  <p id="shipping-error" class="radio-error-message">
    Bitte wählen Sie eine Versandart aus
  </p>
</fieldset>
```

**Wichtig:**
- `required` auf **allen** Radios in der Gruppe (nicht nur erstem)
- Error-Message unter der gesamten Gruppe
- `aria-describedby` auf `<fieldset>` verknüpft Error mit Gruppe
- Border-Color aller Radios wird rot

### Styling bei Error

```css
/* Error-State für alle Radios in Gruppe */
.radio-container.radio-error .radio-custom {
  border-color: var(--radio-border-error);
}

/* Error-Message */
.radio-error-message {
  color: var(--input-error-color);
  font-size: var(--input-error-font-size);
  margin-top: var(--input-error-margin-top);
  display: flex;
  align-items: center;
  gap: 4px;
}

/* Optional: Error-Icon vor Message */
.radio-error-message::before {
  content: "⚠";
  font-size: 16px;
}
```

## Code-Beispiel

Vollständiges HTML + CSS Beispiel:

```html
<!DOCTYPE html>
<html lang="de">
<head>
  <style>
    fieldset {
      border: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: var(--radio-group-gap);
    }

    legend {
      font-weight: 500;
      font-size: 14px;
      color: var(--neutral-700);
      margin-bottom: 8px;
    }

    .radio-container {
      display: inline-flex;
      align-items: flex-start;
      gap: var(--radio-label-gap);
      cursor: pointer;
      position: relative;
    }

    .radio-native {
      opacity: 0;
      position: absolute;
      width: 1px;
      height: 1px;
      pointer-events: none;
    }

    .radio-custom {
      display: flex;
      align-items: center;
      justify-content: center;
      width: var(--radio-size-default);
      height: var(--radio-size-default);
      border: var(--radio-border-width) solid var(--radio-border-default);
      border-radius: var(--radio-border-radius);
      background-color: var(--radio-background-default);
      transition: all 150ms ease-in-out;
      flex-shrink: 0;
    }

    .radio-dot {
      width: var(--radio-dot-size);
      height: var(--radio-dot-size);
      border-radius: 50%;
      background-color: var(--radio-dot-color);
      opacity: 0;
      transition: opacity 150ms ease-in-out;
    }

    /* Hover */
    .radio-custom:hover {
      border-color: var(--radio-border-hover);
    }

    /* Checked */
    .radio-native:checked + .radio-custom {
      background-color: var(--radio-background-checked);
      border-color: var(--radio-border-checked);
    }

    .radio-native:checked + .radio-custom .radio-dot {
      opacity: 1;
    }

    /* Checked + Hover */
    .radio-native:checked + .radio-custom:hover {
      background-color: var(--radio-background-checked-hover);
    }

    /* Focus */
    .radio-native:focus-visible + .radio-custom {
      outline: var(--radio-focus-outline-width) solid var(--radio-focus-outline-color);
      outline-offset: var(--radio-focus-outline-offset);
    }

    /* Disabled */
    .radio-native:disabled + .radio-custom {
      background-color: var(--radio-background-disabled);
      border-color: var(--radio-border-disabled);
      cursor: not-allowed;
    }

    .radio-native:disabled:checked + .radio-custom {
      background-color: var(--radio-background-checked-disabled);
    }

    .radio-native:disabled ~ .radio-label {
      color: var(--radio-label-color-disabled);
    }

    /* Error */
    .radio-container.radio-error .radio-custom {
      border-color: var(--radio-border-error);
    }

    .radio-label {
      color: var(--radio-label-color);
      font-size: 16px;
      line-height: 1.5;
      user-select: none;
    }
  </style>
</head>
<body>
  <fieldset>
    <legend>Versandart auswählen</legend>

    <label class="radio-container">
      <input type="radio" name="shipping" value="standard" class="radio-native" checked />
      <span class="radio-custom">
        <span class="radio-dot"></span>
      </span>
      <span class="radio-label">Standard (3-5 Werktage) - Kostenlos</span>
    </label>

    <label class="radio-container">
      <input type="radio" name="shipping" value="express" class="radio-native" />
      <span class="radio-custom">
        <span class="radio-dot"></span>
      </span>
      <span class="radio-label">Express (1-2 Werktage) - 9,90 €</span>
    </label>

    <label class="radio-container">
      <input type="radio" name="shipping" value="overnight" class="radio-native" />
      <span class="radio-custom">
        <span class="radio-dot"></span>
      </span>
      <span class="radio-label">Overnight (nächster Werktag) - 19,90 €</span>
    </label>
  </fieldset>
</body>
</html>
```

## Design Tokens

| Token | Wert | Verwendung |
|-------|------|------------|
| `radio.size.default` | 20px | Standard Radio-Größe |
| `radio.size.large` | 24px | Mobile-optimierte Größe |
| `radio.borderRadius` | 50% | Perfekter Kreis |
| `radio.borderWidth` | 2px | Rahmenbreite |
| `radio.background.default` | `{neutral.white}` | Hintergrund unselected |
| `radio.background.hover` | `{neutral.white}` | Hintergrund unselected hover |
| `radio.background.checked` | `{hydrophon.blau.500}` | Hintergrund selected |
| `radio.background.checkedHover` | `{hydrophon.blau.600}` | Hintergrund selected hover |
| `radio.background.disabled` | `{neutral.50}` | Hintergrund disabled unselected |
| `radio.background.checkedDisabled` | `{neutral.300}` | Hintergrund disabled selected |
| `radio.border.default` | `{neutral.300}` | Rahmen Standard |
| `radio.border.hover` | `{neutral.400}` | Rahmen Hover |
| `radio.border.checked` | `{hydrophon.blau.500}` | Rahmen Selected |
| `radio.border.focus` | `{hydrophon.blau.500}` | Rahmen Focus |
| `radio.border.error` | `{color.error}` | Rahmen Error |
| `radio.border.disabled` | `{neutral.200}` | Rahmen Disabled |
| `radio.dot.size` | 10px | Inner Dot Größe Default |
| `radio.dot.sizeLarge` | 12px | Inner Dot Größe Large |
| `radio.dot.color` | `{neutral.white}` | Inner Dot Farbe |
| `radio.focus.outlineWidth` | 2px | Focus Outline Breite |
| `radio.focus.outlineOffset` | 2px | Focus Outline Abstand |
| `radio.focus.outlineColor` | `{hydrophon.blau.300}` | Focus Outline Farbe |
| `radio.label.gap` | `{spacing.2}` (8px) | Abstand zu Label |
| `radio.label.color` | `{neutral.700}` | Label Farbe |
| `radio.label.colorDisabled` | `{neutral.400}` | Label Farbe Disabled |
| `radio.group.gap` | `{spacing.3}` (12px) | Abstand zwischen Optionen |
| `radio.group.orientation` | vertical | Standard-Orientierung |

## Anti-Patterns

### Vermeiden

**1. Custom div-Radios ohne native input**
```html
<!-- FALSCH -->
<div class="radio" onclick="select('option1')">Option 1</div>
```
- Keine native Radio-Rolle
- Pfeil-Navigation funktioniert nicht
- Screenreader erkennen keine Radio-Gruppe
- Radio-Gruppen-Logik (nur eine Option) fehlt
- **Lösung:** Verwende natives `<input type="radio">`

**2. Einzelne Radio ohne Gruppe**
```html
<!-- FALSCH -->
<input type="radio" name="single" /> Einzelne Option
```
- Radio kann nicht abgewählt werden (stuck in checked-State)
- Ergibt semantisch keinen Sinn
- **Lösung:** Verwende Checkbox für Ja/Nein oder Toggle für Ein/Aus

**3. Fehlende Legend für Gruppe**
```html
<!-- FALSCH -->
<div>
  <input type="radio" name="payment" /> Rechnung
  <input type="radio" name="payment" /> Kreditkarte
</div>
```
- Screenreader wissen nicht, was die Gruppe beschreibt
- WCAG 3.3.2 Verletzung
- **Lösung:** Verwende `<fieldset>` + `<legend>`

**4. Unterschiedliche `name` Werte in einer Gruppe**
```html
<!-- FALSCH -->
<input type="radio" name="option1" /> Option 1
<input type="radio" name="option2" /> Option 2
```
- Browser behandelt sie als separate Gruppen
- Mehrere Optionen können gleichzeitig ausgewählt sein
- **Lösung:** Alle Radios in einer Gruppe brauchen gleichen `name`

**5. `display: none` für natives Input**
- Entfernt Element aus Accessibility Tree
- Pfeil-Navigation bricht
- **Lösung:** Verwende `opacity: 0` + `position: absolute`

**6. Label nicht mit Radio verknüpft**
```html
<!-- FALSCH -->
<input type="radio" id="option1" name="choice" />
<span>Option 1</span> <!-- kein <label> -->
```
- Label-Klick aktiviert Radio nicht
- Reduzierte Klickfläche
- **Lösung:** Verwende `<label>` mit `for` oder umschließend

**7. Zu viele Optionen ohne Gruppierung**
- 10+ Radio Buttons untereinander
- Überwältigend für Nutzer
- **Lösung:** Verwende Select/Dropdown oder gruppiere in Sub-Kategorien

## Best Practices

1. **Verwende natives `<input type="radio">`** - Native Semantik und Tastatur-Navigation unverzichtbar
2. **Opacity-Technik statt display:none** - Erhält Accessibility und Pfeil-Navigation
3. **Immer in Gruppen (minimum 2 Optionen)** - Einzelne Radios ergeben keinen Sinn
4. **Gleicher `name` für Gruppe** - Browser erkennt dann exklusive Auswahl
5. **Fieldset + Legend verwenden** - Semantisch korrekt und Screenreader-freundlich
6. **Inner Dot statt Icon** - Einfacher zu stylen, konsistent mit nativen Radios
7. **Label immer klickbar** - Vergrößert Klickfläche (WCAG Touch-Target)
8. **Eine Option vorausgewählt** - Verhindert ungewollte Submissions ohne Auswahl
9. **:focus-visible verwenden** - Focus nur bei Tastatur, nicht bei Maus
10. **Error-Messages erklärend** - "Bitte wählen Sie eine Versandart" statt nur "Fehler"
11. **Maximum 7 Optionen** - Mehr Optionen → Select/Dropdown verwenden

## Wann Radio, wann Checkbox, wann Select?

| Anzahl Optionen | Typ | Auswahl | Komponente |
|-----------------|-----|---------|------------|
| 2-7 | Exklusiv (eine) | Sichtbar | **Radio Button** |
| 2-7 | Mehrfach (0-N) | Sichtbar | **Checkbox** |
| 8+ | Exklusiv (eine) | Ausklappbar | **Select/Dropdown** |
| 8+ | Mehrfach (0-N) | Ausklappbar | **Multi-Select** |
| 1 | Ja/Nein | Sofort wirksam | **Toggle Switch** |
| 1 | Ja/Nein | Bei Submit wirksam | **Checkbox** |

---

*Komponente: Radio Button (FORM-05)*
*Phase: 03-forms-a-data-input*
*Version: 1.0*
