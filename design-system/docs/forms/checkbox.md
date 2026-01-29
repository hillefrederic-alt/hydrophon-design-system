# Checkbox

Ermöglicht Auswahl von einer oder mehreren Optionen aus einer Liste. Checkboxen erlauben unabhängige Entscheidungen - jede Option kann einzeln an- oder abgewählt werden.

## Übersicht

### Anatomie

Eine Checkbox besteht aus folgenden Elementen:

- **Native Input** - Natives `<input type="checkbox">` Element (visuell versteckt, Accessibility erhalten)
- **Custom Visual** - Gestylter Container, der das native Element überlagert
- **Check-Icon** - Lucide Check-Icon (14px) bei angekreuztem Zustand
- **Label-Text** - Beschreibender Text neben der Checkbox
- **Helper Text** (optional) - Zusätzliche Erklärung unter der Checkbox
- **Error Message** (optional) - Validierungsfehlermeldung bei Fehler

### Verwendung

Checkboxen eignen sich für:

- **Mehrfachauswahl in Formularen** - z.B. "Welche Newsletter möchten Sie erhalten?"
- **Einverständniserklärungen** - AGB akzeptieren, Datenschutz zustimmen
- **Filter und Einstellungen** - Produktfilter, Account-Einstellungen
- **Todo-Listen** - Aufgaben als erledigt markieren
- **Optionale Features aktivieren/deaktivieren**

**Nicht verwenden für:**
- Exklusive Auswahl (nur eine Option möglich) → verwende Radio Buttons
- Binäre Ein/Aus-Schalter mit sofortiger Wirkung → verwende Toggle Switch

## Größen

### Default (20px)

- Checkbox: **20×20px**
- Check-Icon: **14px**
- Verwendung: Standard für die meisten Formulare
- Desktop und Mobile geeignet

### Large (24px)

- Checkbox: **24×24px**
- Check-Icon: **16px**
- Verwendung: Mobile-optimierte Interfaces, verbesserte Touch-Targets
- Erfüllt WCAG AAA 44px Empfehlung in Kombination mit Label-Klickfläche

## Zustände

### Unchecked Default

- Background: `neutral.white`
- Border: `neutral.300` (2px)
- Visuell: Leere weiße Box mit grauem Rahmen

### Unchecked Hover

- Background: `neutral.white`
- Border: `neutral.400` (dunkler)
- Feedback: Subtile Verdunklung des Rahmens

### Checked

- Background: `hydrophon.blau.500`
- Border: `hydrophon.blau.500`
- Icon: Weißes Checkmark (Check aus Lucide Icon Set)
- Visuell: Blaue Box mit weißem Haken

### Checked Hover

- Background: `hydrophon.blau.600` (dunkler)
- Border: `hydrophon.blau.600`
- Icon: Weißes Checkmark
- Feedback: Verdunklung bei Hover über angekreuzte Checkbox

### Focus

- Outline: 2px `hydrophon.blau.300`
- Offset: 2px
- Nur bei `:focus-visible` (Tastatur-Navigation)
- Kombiniert mit aktuellem Zustand (checked/unchecked)

**Wichtig:** Focus-Indikator erscheint NUR bei Tastatur-Navigation, nicht bei Maus-Klick. Dies verhindert visuelles Rauschen und erfüllt gleichzeitig WCAG 2.4.7 (Focus sichtbar).

### Error

- Border: `color.error` (rot)
- Error-Message unter der Checkbox oder Checkbox-Gruppe
- Kombiniert mit aktuellem Zustand (checked/unchecked)
- Bei Gruppen: Error-Message bezieht sich auf die gesamte Gruppe

### Disabled (Unchecked)

- Background: `neutral.50` (leicht grau)
- Border: `neutral.200` (gedämpft)
- Label: `neutral.400` (gedämpft)
- Cursor: `not-allowed`
- Nicht interaktiv

### Disabled (Checked)

- Background: `neutral.300` (gedämpftes Grau)
- Border: `neutral.300`
- Icon: Weißes Checkmark (reduzierter Kontrast)
- Label: `neutral.400`
- Zeigt vorherige Auswahl, aber nicht änderbar

## Custom-Styling-Pattern

### Accessibility-konformes Verstecken

Das native `<input type="checkbox">` Element MUSS im DOM verbleiben, um Screenreader-Kompatibilität und Tastatur-Navigation zu gewährleisten.

**RICHTIG: `opacity: 0` behält Accessibility**

```css
.checkbox-native {
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
- Erhält Tastatur-Navigation (Space-Taste funktioniert)
- Erhält native Formular-Validation

**FALSCH: `display: none` entfernt aus Accessibility Tree**

```css
.checkbox-native {
  display: none; /* NIEMALS! */
}
```

Diese Technik:
- Entfernt Element komplett aus DOM
- Screenreader können es nicht erkennen
- Tastatur-Navigation funktioniert nicht
- Formular-Validation bricht
- WCAG 4.1.2 Verletzung

### Focus-Weiterleitung

Der Focus-Zustand des nativen Inputs wird auf das Custom Visual weitergeleitet:

```css
/* Focus auf nativem Input stylt Custom Visual */
.checkbox-native:focus-visible + .checkbox-custom {
  outline: 2px solid var(--checkbox-focus-outline-color);
  outline-offset: 2px;
}

/* Checked-State */
.checkbox-native:checked + .checkbox-custom {
  background-color: var(--checkbox-background-checked);
  border-color: var(--checkbox-border-checked);
}

/* Checked + Hover kombiniert */
.checkbox-native:checked + .checkbox-custom:hover {
  background-color: var(--checkbox-background-checked-hover);
}

/* Disabled State */
.checkbox-native:disabled + .checkbox-custom {
  background-color: var(--checkbox-background-disabled);
  border-color: var(--checkbox-border-disabled);
  cursor: not-allowed;
}

/* Disabled + Checked kombiniert */
.checkbox-native:disabled:checked + .checkbox-custom {
  background-color: var(--checkbox-background-checked-disabled);
}
```

### Check-Icon Anzeige

Das Check-Icon erscheint nur im checked-Zustand:

```css
.checkbox-icon {
  opacity: 0;
  transition: opacity 150ms ease-in-out;
}

.checkbox-native:checked + .checkbox-custom .checkbox-icon {
  opacity: 1;
}
```

## Accessibility

### WCAG Anforderungen

**4.1.2 Name, Rolle, Wert**
- Native `<input type="checkbox">` behält automatisch Checkbox-Rolle
- Screenreader kündigen korrekt an: "checkbox, not checked" / "checkbox, checked"
- Keine zusätzlichen ARIA-Attribute nötig

**2.4.7 Focus sichtbar**
- `:focus-visible` mit 2px Outline
- 2px Offset für klare Trennung vom Element
- 3:1 Kontrast (hellblau auf weiß)

**1.4.3 Kontrast**
- Text-Kontrast: 4.5:1 (Label auf weißem Hintergrund)
- UI-Komponenten-Kontrast: 3:1 (Border auf weißem Hintergrund)
- Checked-State: Blau mit weißem Icon für maximalen Kontrast

**3.3.2 Labels**
- Sichtbares Label für jede Checkbox
- `<label>` Element mit `for` Attribut oder umschließend
- Label beschreibt klar, was angekreuzt wird

**2.5.5 Touch-Target-Größe (WCAG 2.2)**
- Minimum: 44×44px (AAA-Empfehlung)
- Default Checkbox (20px) + Label-Klickfläche erfüllt dies
- Large Checkbox (24px) für reine Icon-Darstellung

### Native Vorteile

Durch die Verwendung des nativen `<input type="checkbox">` Elements erhält man automatisch:

- **Space-Taste** - Toggelt Checkbox (checked ↔ unchecked)
- **Tab-Navigation** - Fokussiert nächste/vorherige Checkbox
- **Screenreader-Ansage** - "checkbox, not checked" / "checkbox, checked"
- **Formular-Validation** - `required` Attribut funktioniert nativ
- **Formular-Submission** - Wert wird automatisch mitgesendet
- **Keine ARIA-Attribute nötig** - Native Semantik ist ausreichend

### HTML-Struktur

**Empfohlene Struktur mit umschließendem Label:**

```html
<label class="checkbox-container">
  <input type="checkbox" class="checkbox-native" />
  <span class="checkbox-custom">
    <svg class="checkbox-icon"><!-- Check Icon --></svg>
  </span>
  <span class="checkbox-label">Option akzeptieren</span>
</label>
```

**Alternative mit for-Attribut:**

```html
<div class="checkbox-wrapper">
  <input type="checkbox" id="terms" class="checkbox-native" />
  <label for="terms" class="checkbox-custom-container">
    <span class="checkbox-custom">
      <svg class="checkbox-icon"><!-- Check Icon --></svg>
    </span>
    <span class="checkbox-label">AGB akzeptieren</span>
  </label>
</div>
```

**Mit Helper Text:**

```html
<label class="checkbox-container">
  <input type="checkbox" class="checkbox-native" aria-describedby="privacy-helper" />
  <span class="checkbox-custom">
    <svg class="checkbox-icon"><!-- Check Icon --></svg>
  </span>
  <span class="checkbox-label">Datenschutz akzeptieren</span>
</label>
<p id="privacy-helper" class="checkbox-helper">
  Wir verwenden Ihre Daten nur zur Bearbeitung Ihrer Anfrage
</p>
```

**Mit Error-Message:**

```html
<label class="checkbox-container checkbox-error">
  <input type="checkbox" class="checkbox-native" aria-describedby="terms-error" aria-invalid="true" />
  <span class="checkbox-custom">
    <svg class="checkbox-icon"><!-- Check Icon --></svg>
  </span>
  <span class="checkbox-label">AGB akzeptieren</span>
</label>
<p id="terms-error" class="checkbox-error-message">
  Bitte akzeptieren Sie die AGB, um fortzufahren
</p>
```

## Checkbox-Gruppe

### Mit Fieldset/Legend

Für mehrere zusammengehörige Checkboxen verwende `<fieldset>` und `<legend>`:

```html
<fieldset>
  <legend>Interessen auswählen</legend>

  <label class="checkbox-container">
    <input type="checkbox" name="interests" value="produktnews" />
    <span class="checkbox-custom">
      <svg class="checkbox-icon"><!-- Check Icon --></svg>
    </span>
    <span class="checkbox-label">Produktneuheiten</span>
  </label>

  <label class="checkbox-container">
    <input type="checkbox" name="interests" value="events" />
    <span class="checkbox-custom">
      <svg class="checkbox-icon"><!-- Check Icon --></svg>
    </span>
    <span class="checkbox-label">Veranstaltungen</span>
  </label>

  <label class="checkbox-container">
    <input type="checkbox" name="interests" value="angebote" />
    <span class="checkbox-custom">
      <svg class="checkbox-icon"><!-- Check Icon --></svg>
    </span>
    <span class="checkbox-label">Sonderangebote</span>
  </label>
</fieldset>
```

### Fehler bei Gruppen

Bei Checkbox-Gruppen erscheint die Error-Message unter der gesamten Gruppe:

```html
<fieldset aria-describedby="interests-error">
  <legend>Mindestens eine Option auswählen *</legend>

  <!-- Checkboxen wie oben -->

  <p id="interests-error" class="checkbox-error-message">
    Bitte wählen Sie mindestens eine Interessenskategorie aus
  </p>
</fieldset>
```

**Accessibility-Hinweis:** `aria-describedby` auf `<fieldset>` verknüpft Error-Message mit der gesamten Gruppe.

## Code-Beispiel

Vollständiges HTML + CSS Beispiel:

```html
<!DOCTYPE html>
<html lang="de">
<head>
  <style>
    .checkbox-container {
      display: inline-flex;
      align-items: flex-start;
      gap: var(--checkbox-label-gap);
      cursor: pointer;
      position: relative;
    }

    .checkbox-native {
      opacity: 0;
      position: absolute;
      width: 1px;
      height: 1px;
      pointer-events: none;
    }

    .checkbox-custom {
      display: flex;
      align-items: center;
      justify-content: center;
      width: var(--checkbox-size-default);
      height: var(--checkbox-size-default);
      border: var(--checkbox-border-width) solid var(--checkbox-border-default);
      border-radius: var(--checkbox-border-radius);
      background-color: var(--checkbox-background-default);
      transition: all 150ms ease-in-out;
      flex-shrink: 0;
    }

    .checkbox-icon {
      width: var(--checkbox-icon-size);
      height: var(--checkbox-icon-size);
      color: var(--checkbox-icon-color);
      opacity: 0;
      transition: opacity 150ms ease-in-out;
    }

    /* Hover */
    .checkbox-custom:hover {
      border-color: var(--checkbox-border-hover);
    }

    /* Checked */
    .checkbox-native:checked + .checkbox-custom {
      background-color: var(--checkbox-background-checked);
      border-color: var(--checkbox-border-checked);
    }

    .checkbox-native:checked + .checkbox-custom .checkbox-icon {
      opacity: 1;
    }

    /* Checked + Hover */
    .checkbox-native:checked + .checkbox-custom:hover {
      background-color: var(--checkbox-background-checked-hover);
    }

    /* Focus */
    .checkbox-native:focus-visible + .checkbox-custom {
      outline: var(--checkbox-focus-outline-width) solid var(--checkbox-focus-outline-color);
      outline-offset: var(--checkbox-focus-outline-offset);
    }

    /* Disabled */
    .checkbox-native:disabled + .checkbox-custom {
      background-color: var(--checkbox-background-disabled);
      border-color: var(--checkbox-border-disabled);
      cursor: not-allowed;
    }

    .checkbox-native:disabled:checked + .checkbox-custom {
      background-color: var(--checkbox-background-checked-disabled);
    }

    .checkbox-native:disabled ~ .checkbox-label {
      color: var(--checkbox-label-color-disabled);
    }

    /* Error */
    .checkbox-container.checkbox-error .checkbox-custom {
      border-color: var(--checkbox-border-error);
    }

    .checkbox-label {
      color: var(--checkbox-label-color);
      font-size: 16px;
      line-height: 1.5;
      user-select: none;
    }
  </style>
</head>
<body>
  <label class="checkbox-container">
    <input type="checkbox" class="checkbox-native" />
    <span class="checkbox-custom">
      <svg class="checkbox-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    </span>
    <span class="checkbox-label">Ich akzeptiere die AGB</span>
  </label>
</body>
</html>
```

## Design Tokens

| Token | Wert | Verwendung |
|-------|------|------------|
| `checkbox.size.default` | 20px | Standard Checkbox-Größe |
| `checkbox.size.large` | 24px | Mobile-optimierte Größe |
| `checkbox.borderRadius` | 4px | Eckenradius |
| `checkbox.borderWidth` | 2px | Rahmenbreite |
| `checkbox.background.default` | `{neutral.white}` | Hintergrund unchecked |
| `checkbox.background.hover` | `{neutral.white}` | Hintergrund unchecked hover |
| `checkbox.background.checked` | `{hydrophon.blau.500}` | Hintergrund checked |
| `checkbox.background.checkedHover` | `{hydrophon.blau.600}` | Hintergrund checked hover |
| `checkbox.background.disabled` | `{neutral.50}` | Hintergrund disabled unchecked |
| `checkbox.background.checkedDisabled` | `{neutral.300}` | Hintergrund disabled checked |
| `checkbox.border.default` | `{neutral.300}` | Rahmen Standard |
| `checkbox.border.hover` | `{neutral.400}` | Rahmen Hover |
| `checkbox.border.checked` | `{hydrophon.blau.500}` | Rahmen Checked |
| `checkbox.border.focus` | `{hydrophon.blau.500}` | Rahmen Focus |
| `checkbox.border.error` | `{color.error}` | Rahmen Error |
| `checkbox.border.disabled` | `{neutral.200}` | Rahmen Disabled |
| `checkbox.icon.color` | `{neutral.white}` | Icon Farbe |
| `checkbox.icon.size` | 14px | Icon Größe |
| `checkbox.focus.outlineWidth` | 2px | Focus Outline Breite |
| `checkbox.focus.outlineOffset` | 2px | Focus Outline Abstand |
| `checkbox.focus.outlineColor` | `{hydrophon.blau.300}` | Focus Outline Farbe |
| `checkbox.label.gap` | `{spacing.2}` (8px) | Abstand zu Label |
| `checkbox.label.color` | `{neutral.700}` | Label Farbe |
| `checkbox.label.colorDisabled` | `{neutral.400}` | Label Farbe Disabled |

## Anti-Patterns

### Vermeiden

**1. `display: none` für natives Input**
- Entfernt Element komplett aus Accessibility Tree
- Screenreader können Checkbox nicht erkennen
- **Lösung:** Verwende `opacity: 0` + `position: absolute`

**2. Nur `<div>` mit `onClick` ohne Checkbox-Semantik**
```html
<!-- FALSCH -->
<div onclick="toggle()">Option auswählen</div>
```
- Keine native Checkbox-Rolle
- Tastatur-Navigation funktioniert nicht
- Screenreader erkennen keine Checkbox
- **Lösung:** Verwende natives `<input type="checkbox">`

**3. Fehlender Focus-Indikator**
```css
/* FALSCH */
.checkbox:focus {
  outline: none; /* NIEMALS ohne Ersatz! */
}
```
- WCAG 2.4.7 Verletzung
- Tastatur-Nutzer verlieren Orientierung
- **Lösung:** Immer sichtbaren Focus-Indikator bereitstellen

**4. Nur Farbe zur Unterscheidung checked/unchecked**
- Farbblinde Nutzer können Zustand nicht erkennen
- WCAG 1.4.1 Verletzung
- **Lösung:** Kombiniere Farbe mit Icon (Checkmark bei checked)

**5. Zu kleine Touch-Targets**
- Checkbox 16px ohne Label-Klickfläche
- Mobile Nutzer verfehlen Target
- **Lösung:** Minimum 20px Checkbox + Label klickbar, oder 24px Large Size

**6. Label nicht mit Checkbox verknüpft**
```html
<!-- FALSCH -->
<input type="checkbox" id="terms" />
<span>AGB akzeptieren</span> <!-- kein <label> -->
```
- Label-Klick aktiviert Checkbox nicht
- Reduzierte Klickfläche
- **Lösung:** Verwende `<label>` mit `for` oder umschließend

## Best Practices

1. **Verwende natives `<input type="checkbox">`** - Native Semantik ist allen Custom-Lösungen überlegen
2. **Opacity-Technik statt display:none** - Erhält Accessibility und Tastatur-Navigation
3. **Check-Icon bei checked-Zustand** - Nicht nur Farbwechsel für Barrierefreiheit
4. **Label immer klickbar** - Vergrößert Klickfläche und erfüllt WCAG Touch-Target
5. **:focus-visible verwenden** - Focus nur bei Tastatur-Navigation, nicht bei Maus
6. **Fieldset für Gruppen** - Semantisch korrekt und Screenreader-freundlich
7. **Error-Messages erklärend** - "Bitte akzeptieren Sie die AGB" statt nur "Fehler"
8. **aria-describedby für Helper/Error** - Verknüpft zusätzliche Infos mit Checkbox

---

*Komponente: Checkbox (FORM-04)*
*Phase: 03-forms-a-data-input*
*Version: 1.0*
