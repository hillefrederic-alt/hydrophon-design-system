# Textarea

Mehrzeiliges Texteingabefeld für längere Textinhalte wie Kommentare, Beschreibungen, Nachrichten oder Notizen.

## Übersicht

Textarea-Komponenten ermöglichen Benutzern die Eingabe von mehrzeiligen Texten mit variabler Länge. Im Gegensatz zu einzeiligen Text Inputs bieten Textareas mehr Platz und visuelle Hinweise darauf, dass längere Inhalte erwartet werden.

### Anatomie

Eine vollständige Textarea besteht aus:

- **Container:** Border + Background mit variabler Höhe
- **Input-Text:** Mehrzeiliger Text mit Zeilenumbrüchen
- **Label:** Beschriftung oberhalb der Textarea (Pflicht)
- **Placeholder:** Optional - Beispieltext für erwarteten Inhalt
- **Helper Text:** Optional - Zusätzliche Hinweise oder Formatierungsregeln
- **Error Message:** Fehlermeldung bei ungültiger Eingabe
- **Character Counter:** Optional - Zeigt verbleibende Zeichen bei Längenbegrenzung
- **Resize Handle:** Visuelle Affordanz zum vertikalen Vergrößern/Verkleinern
- **Required Indicator:** Rotes Sternchen (*) bei Pflichtfeldern

### Verwendung

Textareas werden verwendet für:

- **Längere Texteingaben:** Kommentare, Feedback, Nachrichten, Bewertungen
- **Beschreibungen:** Produktbeschreibungen, Projektdetails, Notizen
- **Formulare:** Kontaktformulare ("Ihre Nachricht"), Support-Tickets
- **Freitext-Antworten:** Offene Fragen in Umfragen

**Wann nicht verwenden:**

- Einzeilige kurze Eingaben (Name, E-Mail) → Text Input verwenden
- Strukturierte Daten → Spezifische Input-Typen verwenden
- Formatierter Text (fett, kursiv) → Rich Text Editor verwenden (separate Phase)

### Unterschied zu Text Input

| Aspekt | Text Input | Textarea |
|--------|------------|----------|
| **Zeilen** | Einzeilig | Mehrzeilig |
| **Höhe** | Fix (32/40/48px) | Variabel (min. 120px) |
| **Zeilenumbrüche** | Keine | Enter-Taste erzeugt neue Zeile |
| **Resize** | Nicht möglich | Vertikal möglich |
| **Verwendung** | Kurze strukturierte Daten | Längere Freitexte |
| **Scroll** | Horizontal bei Überlänge | Vertikal bei Überlänge |

## Größen

Textareas verwenden nur **Medium** und **Large** Größen. Small ist nicht empfohlen, da Textareas für längere Inhalte gedacht sind.

### Medium (Empfohlen)

**Spezifikationen:**
- Min-Höhe: `120px` (ca. 5 Zeilen bei 16px Schriftgröße)
- Padding: `12px` horizontal, `8px` vertikal
- Schriftgröße: `16px` (fontSize.base)
- Zeilenhöhe: `1.5` (24px - lineHeight.normal)

**Verwendung:**
- Standard für die meisten Formulare
- Kommentarfelder, Feedback-Formulare
- Responsive Layouts (Desktop + Mobile)

**Berechnung der Höhe:**
- Schriftgröße: 16px
- Zeilenhöhe: 16px × 1.5 = 24px
- 5 Zeilen: 24px × 5 = 120px
- Plus Padding: 120px + (8px × 2) = 136px Gesamthöhe

### Large

**Spezifikationen:**
- Min-Höhe: `200px` (ca. 8 Zeilen bei 18px Schriftgröße)
- Padding: `16px` horizontal, `12px` vertikal
- Schriftgröße: `18px` (fontSize.lg)
- Zeilenhöhe: `1.5` (27px)

**Verwendung:**
- Mobile-optimierte Formulare
- Ausführliche Beschreibungen (Projektbriefings, Bewerbungen)
- Fokussierte Eingabeformulare mit wenigen Feldern

**Vorteile:**
- Großzügiger Eingabebereich reduziert Scrollen
- Bessere Lesbarkeit durch größere Schrift
- Signalisiert: "Hier wird ausführlicher Text erwartet"

## Zustände

Textareas verwenden dieselben Zustände wie Text Inputs für visuelle Konsistenz.

### Default

**Visuelle Eigenschaften:**
- Border: `1px solid neutral.300`
- Background: `neutral.white`
- Text: `neutral.900`
- Placeholder: `neutral.400`
- Resize Handle: Rechts unten, `neutral.400`

**Design Tokens:**
```
input.field.background.default
input.field.border.default
input.field.text.default
textarea.minHeight
```

### Hover

**Visuelle Eigenschaften:**
- Border: `1px solid neutral.400`
- Background: `neutral.white`
- Cursor: `text`

**Design Tokens:**
```
input.field.border.hover
```

### Focus

**Visuelle Eigenschaften:**
- Border: `2px solid hydrophon.blau.500`
- Focus Ring: `3px hydrophon.blau.100`
- Background: `neutral.white`

**WCAG 2.4.7 Konformität:**
- Deutlich sichtbarer Focus-Indikator
- 2px Border + 3px Ring = 5px Gesamtdicke
- `:focus-visible` für Tastatur-Navigation

**Design Tokens:**
```
input.field.border.focus
input.field.borderWidth.focus
input.focus.ring.color
input.focus.ring.width
```

### Error

**Visuelle Eigenschaften:**
- Border: `1px solid color.error`
- Background: `neutral.white`
- Error Message: Unterhalb, 12px, rot
- Optional: Error Icon (AlertCircle) rechts oben am Rand

**Verwendung:**
- Pflichtfeld nicht ausgefüllt
- Minimale Zeichenanzahl nicht erreicht
- Maximale Zeichenanzahl überschritten
- Verbotene Inhalte (z.B. HTML-Tags, wenn nicht erlaubt)

**Design Tokens:**
```
input.field.border.error
input.error.color
input.error.fontSize
```

### Success

**Visuelle Eigenschaften:**
- Border: `1px solid color.success`
- Background: `neutral.white`
- Optional: Success Icon (CheckCircle) rechts oben

**Verwendung:**
- Seltener als bei Text Inputs
- Nur bei kritischen Validierungen (z.B. "Nachricht wurde gespeichert")

**Design Tokens:**
```
input.field.border.success
input.success.color
```

### Disabled

**Visuelle Eigenschaften:**
- Background: `neutral.50`
- Border: `1px solid neutral.200`
- Text: `neutral.600`
- Opacity: `0.7`
- Resize Handle: Ausgeblendet
- Cursor: `not-allowed`

**Design Tokens:**
```
input.field.background.disabled
input.field.border.disabled
input.field.text.disabled
```

## Höhenverhalten

Das Resize-Verhalten ist entscheidend für gute Textarea-UX.

### Resize-Optionen

**Empfohlen: `resize: vertical`**
- Benutzer kann Textarea vertikal vergrößern
- Verhindert horizontales Resize (bricht Layout)
- CSS: `resize: vertical;`
- Design Token: `input.textarea.resize`

**Alternativen:**
- `resize: none` - Keine Größenänderung möglich (nicht empfohlen, schränkt Benutzer ein)
- `resize: both` - Horizontal + vertikal (nicht empfohlen, bricht responsive Layouts)
- `resize: auto` - Browser-Default (meist beide Richtungen)

### Min-Height und Max-Height

**Min-Height:**
- Standard: `120px` (ca. 5 Zeilen)
- Verhindert zu kleine Textareas
- CSS: `min-height: var(--input-textarea-min-height);`

**Max-Height (optional):**
- Verhindert übermäßig große Textareas
- Empfehlung: `400px` (ca. 16 Zeilen bei 16px Schrift)
- Nach Überschreitung: Vertikales Scrollen
- CSS: `max-height: 400px; overflow-y: auto;`

### Auto-Growing Textareas (Optional)

Fortgeschrittene Pattern: Textarea wächst automatisch mit Inhalt.

**Vorteile:**
- Kein manuelles Resizing nötig
- Immer genau so groß wie Inhalt
- Reduziert Scrollen innerhalb Textarea

**Nachteile:**
- Komplexere JavaScript-Implementierung
- Layout-Shifts während Eingabe
- Potenziell sehr lange Seiten

**Implementierung:**
```javascript
textarea.addEventListener('input', function() {
  this.style.height = 'auto';
  this.style.height = this.scrollHeight + 'px';
});
```

**Empfehlung:** Für Phase 3 bei statischen `resize: vertical` bleiben. Auto-Growing in separater Phase.

## Zeichenzähler

Bei Textareas mit Längenbegrenzung ist ein Zeichenzähler essenziell.

### Wann verwenden

- **Immer bei maxlength-Attribut:** Zeigt verbleibende Zeichen
- **Twitter-Style (280 Zeichen):** Kurze Nachrichten, Kommentare
- **Beschreibungen mit Limit:** Produktbeschreibungen (max. 500 Zeichen)
- **API-Limits:** Wenn Backend Längenbegrenzung hat

### Position und Darstellung

**Position:** Rechts unten, oberhalb Resize Handle

**Darstellung:**
```
Noch 240 Zeichen verfügbar
```

**Dynamisches Verhalten:**
- Über 20% verbleibend: `neutral.600` (grau)
- 10-20% verbleibend: `color.warning` (orange)
- Unter 10% verbleibend: `color.error` (rot)
- 0 Zeichen verbleibend: `color.error`, fett

**HTML-Struktur:**
```html
<div class="textarea-wrapper">
  <textarea maxlength="280" id="comment"></textarea>
  <span class="character-counter" aria-live="polite">
    Noch 280 Zeichen verfügbar
  </span>
</div>
```

**Accessibility:**
- `aria-live="polite"` für Screen Reader Updates
- Text muss auch visuell sichtbar sein (nicht nur via ARIA)

## Accessibility (WCAG 2.1 AA)

Textareas folgen denselben Accessibility-Richtlinien wie Text Inputs.

### WCAG Anforderungen

**3.3.2 Labels oder Anweisungen (Level A):**
- Sichtbares Label oberhalb der Textarea
- Label mit `for` / `id` verknüpft
- Placeholder ist kein Ersatz für Label

**3.3.3 Fehlervorschläge (Level AA):**
- Error Messages mit konkreten Lösungen
- Beispiel: "Die Beschreibung muss mindestens 50 Zeichen lang sein (aktuell: 23)"

**4.1.2 Name, Rolle, Wert (Level A):**
- `role="textbox"` (implizit durch `<textarea>`)
- `aria-multiline="true"` (implizit)
- `aria-required="true"` bei Pflichtfeldern
- `aria-invalid="true"` bei Fehlern
- `aria-describedby` für Helper Text / Error Messages

### HTML-Struktur mit ARIA

**Standard Textarea:**
```html
<div class="form-field">
  <label for="description" class="input-label">
    Beschreibung <span class="required">*</span>
  </label>
  <textarea
    id="description"
    name="description"
    class="textarea"
    rows="5"
    required
    aria-required="true"
    placeholder="Bitte beschreibe dein Anliegen ausführlich..."
  ></textarea>
</div>
```

**Mit Helper Text:**
```html
<div class="form-field">
  <label for="feedback">Feedback</label>
  <textarea
    id="feedback"
    aria-describedby="feedback-help"
    rows="5"
  ></textarea>
  <span id="feedback-help" class="helper-text">
    Teile uns mit, was wir verbessern können (optional)
  </span>
</div>
```

**Mit Zeichenzähler:**
```html
<div class="form-field">
  <label for="comment">Kommentar <span class="required">*</span></label>
  <div class="textarea-wrapper">
    <textarea
      id="comment"
      maxlength="280"
      aria-required="true"
      aria-describedby="comment-counter"
      rows="4"
    ></textarea>
    <span id="comment-counter" class="character-counter" aria-live="polite">
      Noch 280 Zeichen verfügbar
    </span>
  </div>
</div>
```

**Error State:**
```html
<div class="form-field">
  <label for="message">Nachricht <span class="required">*</span></label>
  <textarea
    id="message"
    aria-invalid="true"
    aria-describedby="message-error"
    rows="5"
  ></textarea>
  <span id="message-error" class="error-text" role="alert">
    Die Nachricht muss mindestens 20 Zeichen lang sein (aktuell: 8)
  </span>
</div>
```

### Tastatur-Navigation

- **Tab:** Fokus in Textarea
- **Enter:** Neue Zeile (nicht Submit!)
- **Shift + Tab:** Fokus zum vorherigen Element
- **Ctrl/Cmd + Enter:** Optional - Formular absenden (bei Chat-UIs)

## Code-Beispiel

### CSS mit Design Tokens

```css
/* Textarea Base Styles */
.textarea {
  /* Sizing */
  min-height: var(--input-textarea-min-height); /* 120px */
  width: 100%;
  padding: 8px var(--input-padding-x-md); /* 8px 12px */

  /* Typography */
  font-family: var(--input-base-font-family);
  font-size: var(--input-font-size-md); /* 16px */
  line-height: 1.5; /* 24px */
  color: var(--input-field-text-default);

  /* Visual */
  background-color: var(--input-field-background-default);
  border: var(--input-field-border-width-default) solid var(--input-field-border-default);
  border-radius: var(--input-base-border-radius); /* 4px */

  /* Interaction */
  resize: var(--input-textarea-resize); /* vertical */
  transition: var(--input-base-transition);
}

/* Placeholder */
.textarea::placeholder {
  color: var(--input-field-text-placeholder);
  opacity: 1;
}

/* Hover State */
.textarea:hover:not(:disabled) {
  border-color: var(--input-field-border-hover);
}

/* Focus State */
.textarea:focus-visible {
  outline: var(--input-field-border-width-focus) solid var(--input-field-border-focus);
  outline-offset: var(--input-focus-outline-offset);
  box-shadow: 0 0 0 var(--input-focus-ring-width) var(--input-focus-ring-color);
  border-color: var(--input-field-border-focus);
}

/* Error State */
.textarea[aria-invalid="true"] {
  border-color: var(--input-field-border-error);
}

/* Disabled State */
.textarea:disabled {
  background-color: var(--input-field-background-disabled);
  border-color: var(--input-field-border-disabled);
  color: var(--input-field-text-disabled);
  resize: none;
  cursor: not-allowed;
  opacity: 0.7;
}

/* Large Size Variant */
.textarea--large {
  min-height: 200px;
  padding: 12px var(--input-padding-x-lg); /* 12px 16px */
  font-size: var(--input-font-size-lg); /* 18px */
}

/* Character Counter */
.character-counter {
  display: block;
  text-align: right;
  font-size: var(--input-helper-font-size); /* 12px */
  color: var(--input-helper-color);
  margin-top: var(--input-helper-margin-top); /* 4px */
}

.character-counter--warning {
  color: var(--color-warning);
}

.character-counter--error {
  color: var(--input-error-color);
  font-weight: 500;
}
```

### JavaScript für Zeichenzähler

```javascript
function initCharacterCounter(textareaId) {
  const textarea = document.getElementById(textareaId);
  const counter = textarea.nextElementSibling; // Assumes counter is next sibling
  const maxLength = textarea.getAttribute('maxlength');

  if (!maxLength || !counter) return;

  function updateCounter() {
    const remaining = maxLength - textarea.value.length;
    const percentage = (remaining / maxLength) * 100;

    counter.textContent = `Noch ${remaining} Zeichen verfügbar`;

    // Color coding based on remaining characters
    counter.classList.remove('character-counter--warning', 'character-counter--error');

    if (percentage <= 10) {
      counter.classList.add('character-counter--error');
    } else if (percentage <= 20) {
      counter.classList.add('character-counter--warning');
    }
  }

  textarea.addEventListener('input', updateCounter);
  updateCounter(); // Initial state
}
```

## Design Tokens Referenz

| Token Name | Wert | Verwendung |
|------------|------|------------|
| `input.textarea.minHeight` | 120px | Minimale Textarea-Höhe (ca. 5 Zeilen) |
| `input.textarea.resize` | vertical | Resize-Verhalten (nur vertikal) |
| `input.font.size.md` | 16px | Schriftgröße Medium |
| `input.font.size.lg` | 18px | Schriftgröße Large |
| `input.padding.x.md` | 12px | Horizontales Padding Medium |
| `input.padding.x.lg` | 16px | Horizontales Padding Large |
| `input.field.background.default` | neutral.white | Hintergrund Standard |
| `input.field.border.default` | neutral.300 | Border Standard |
| `input.field.border.hover` | neutral.400 | Border Hover |
| `input.field.border.focus` | hydrophon.blau.500 | Border Focus |
| `input.field.border.error` | color.error | Border Error |
| `input.field.text.default` | neutral.900 | Text-Farbe |
| `input.field.text.placeholder` | neutral.400 | Placeholder-Farbe |
| `input.base.borderRadius` | 4px | Eckenradius |

---

**Version:** 1.0
**Letzte Aktualisierung:** 2026-01-29
**Phase:** 03 - Forms & Data Input
**Komponente:** FORM-02 - Textarea
