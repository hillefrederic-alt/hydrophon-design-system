# Text Input

Einzeiliges Texteingabefeld für kurze Eingaben wie Name, E-Mail, Telefonnummer oder andere strukturierte Daten.

## Übersicht

Text Inputs sind die grundlegendsten und am häufigsten verwendeten Formularelemente. Sie ermöglichen Benutzern die Eingabe von kurzen, einzeiligen Texten und bieten visuelles Feedback über den aktuellen Zustand (Standard, Hover, Focus, Error, Success, Disabled).

### Anatomie

Ein vollständiges Text Input besteht aus mehreren Komponenten:

- **Container:** Border + Background bilden den sichtbaren Rahmen
- **Input-Text:** Der vom Benutzer eingegebene Text
- **Label:** Beschriftung oberhalb des Inputs (Pflicht für Accessibility)
- **Placeholder:** Optional - Beispieltext innerhalb des Inputs (nur als Ergänzung, nicht als Ersatz für Label)
- **Helper Text:** Optional - Zusätzliche Erklärungen unterhalb des Inputs
- **Error Message:** Fehlermeldung unterhalb bei ungültiger Eingabe
- **Success Icon:** Grünes Checkmark rechts im Input bei gültiger Eingabe
- **Required Indicator:** Rotes Sternchen (*) bei Pflichtfeldern

### Verwendung

Text Inputs werden verwendet für:

- **Formulare aller Art:** Kontaktformulare, Registrierung, Checkout-Prozesse
- **Suchfelder:** Mit zusätzlichem Such-Icon (Lucide Search Icon, 20px)
- **Filter-Eingaben:** In Tabellen und Listen zur Dateneingabe
- **Strukturierte Daten:** Name, E-Mail, Telefon, PLZ, etc.

**Wann nicht verwenden:**

- Mehrzeilige Texte → Textarea verwenden
- Auswahl aus vordefinierten Optionen → Select/Dropdown verwenden
- Datum/Zeit → Date Picker verwenden (separate Phase)
- Ja/Nein Entscheidungen → Checkbox/Radio Button verwenden

## Größen

Das Text Input System bietet drei Größen, die mit dem Button-System (Phase 2) harmonieren.

### Small (32px)

**Spezifikationen:**
- Höhe: `32px` (input.height.sm)
- Padding horizontal: `8px` (input.padding.x.sm)
- Schriftgröße: `14px` (input.font.size.sm)
- Icon-Größe: `16px` (icon.size.xs)

**Verwendung:**
- Kompakte Desktop-Interfaces mit begrenztem Platz
- Inline-Editing in Tabellen
- Admin-Panels mit hoher Informationsdichte

**Wichtiger Hinweis:**
Small Inputs sind **nur für Desktop** geeignet, da die 32px Höhe unter der WCAG-empfohlenen Touch-Target-Mindestgröße von 44px liegt. Auf mobilen Geräten immer Medium oder Large verwenden.

### Medium (40px) - Standard

**Spezifikationen:**
- Höhe: `40px` (input.height.md)
- Padding horizontal: `12px` (input.padding.x.md)
- Schriftgröße: `16px` (input.font.size.md)
- Icon-Größe: `20px` (icon.size.sm)

**Verwendung:**
- Standard für die meisten Formulare
- Ausgewogenes Verhältnis zwischen Kompaktheit und Benutzerfreundlichkeit
- Empfohlen für responsive Layouts (Desktop + Mobile)

**Vorteile:**
- 16px Schriftgröße verhindert Zoom auf iOS Safari
- 40px Höhe bietet gute Touch-Ergonomie
- Konsistent mit Medium Buttons

### Large (48px)

**Spezifikationen:**
- Höhe: `48px` (input.height.lg)
- Padding horizontal: `16px` (input.padding.x.lg)
- Schriftgröße: `18px` (input.font.size.lg)
- Icon-Größe: `20px` (icon.size.sm)

**Verwendung:**
- Mobile-optimierte Formulare
- Hero-Sections mit Suchfeld oder Newsletter-Anmeldung
- Call-to-Action Formulare (z.B. "Produktsuche starten")
- Ältere Zielgruppen oder barrierefreie Anwendungen

**Vorteile:**
- Übertrifft WCAG AAA Touch-Target-Empfehlung (44px)
- Großzügige Klickfläche reduziert Fehleingaben
- Gute Lesbarkeit durch 18px Schriftgröße

## Zustände

Text Inputs durchlaufen verschiedene Zustände während der Benutzerinteraktion. Jeder Zustand hat eine klare visuelle Differenzierung.

### Default (Standard)

Der Ausgangszustand eines leeren oder ausgefüllten Inputs ohne Benutzerinteraktion.

**Visuelle Eigenschaften:**
- Border: `1px solid neutral.300` (hellgrau)
- Background: `neutral.white` (weiß)
- Text: `neutral.900` (dunkelgrau, hoher Kontrast)
- Placeholder: `neutral.400` (gedämpftes grau)

**Design Tokens:**
```
input.field.background.default
input.field.border.default
input.field.borderWidth.default
input.field.text.default
input.field.text.placeholder
```

### Hover

Zustand wenn der Mauszeiger über dem Input schwebt (Desktop only).

**Visuelle Eigenschaften:**
- Border: `1px solid neutral.400` (etwas dunkler als default)
- Background: `neutral.white` (unverändert)
- Cursor: `text` (I-Beam Cursor)

**Design Tokens:**
```
input.field.background.hover
input.field.border.hover
```

**Wichtig:** Hover-Zustand gibt subtiles visuelles Feedback, dass das Element interaktiv ist. Der Unterschied zum Default-Zustand ist bewusst dezent gehalten, um nicht mit dem Focus-Zustand zu konkurrieren.

### Focus

Der wichtigste Zustand - zeigt an, dass das Input-Feld aktiv ist und Tastatureingaben empfängt.

**Visuelle Eigenschaften:**
- Border: `2px solid hydrophon.blau.500` (Hydrophon Blau, verstärkt auf 2px)
- Focus Ring: `3px hydrophon.blau.100` (heller Blauton als äußerer Ring)
- Background: `neutral.white` (unverändert)
- Outline Offset: `0px` (direkt am Input-Rand)

**Design Tokens:**
```
input.field.background.focus
input.field.border.focus
input.field.borderWidth.focus
input.focus.ring.color
input.focus.ring.width
input.focus.outline.offset
```

**WCAG 2.4.7 Konformität:**
- **Sichtbarkeit:** 2px Border + 3px Ring = 5px Gesamtdicke, deutlich sichtbar
- **Kontrast:** Hydrophon Blau 500 zu weißem Hintergrund > 4.5:1 Kontrast
- **:focus-visible verwenden:** Nur bei Tastatur-Navigation anzeigen, nicht bei Maus-Klick

**Implementierungshinweis:**
```css
input:focus-visible {
  outline: 2px solid var(--input-field-border-focus);
  outline-offset: 0px;
  box-shadow: 0 0 0 3px var(--input-focus-ring-color);
}
```

### Error

Zustand bei ungültiger Eingabe nach Validierung.

**Visuelle Eigenschaften:**
- Border: `1px solid color.error` (rot)
- Background: `neutral.white` (unverändert)
- Error Icon: Lucide `AlertCircle` (20px) rechts im Input, rot
- Error Message: Unterhalb des Inputs, 12px, rot
- Label: Optional in `color.error` färben

**Design Tokens:**
```
input.field.background.error
input.field.border.error
input.error.color
input.error.fontSize
input.error.marginTop
input.label.color.error
```

**WCAG 3.3.1 / 3.3.3 Konformität:**
- Fehler werden visuell (roter Border + Icon) UND textuell (Error Message) kommuniziert
- Error Message ist erklärend und hilfreich, nicht nur "ungültig"
- Fehlervorschläge mit Beispielen werden gegeben

**Beispiel Error Messages:**
- ❌ Schlecht: "Ungültige Eingabe"
- ✅ Gut: "Bitte gib eine gültige E-Mail-Adresse ein (z.B. name@firma.de)"
- ✅ Gut: "Die Telefonnummer muss mindestens 10 Ziffern enthalten"

**Accessibility Attribute:**
```html
<input
  type="email"
  id="email"
  aria-invalid="true"
  aria-describedby="email-error"
/>
<span id="email-error" role="alert">
  Bitte gib eine gültige E-Mail-Adresse ein
</span>
```

### Success

Zustand bei gültiger Eingabe - positives Feedback für korrekte Daten.

**Visuelle Eigenschaften:**
- Border: `1px solid color.success` (grün)
- Background: `neutral.white` (unverändert)
- Success Icon: Lucide `Check` oder `CheckCircle` (20px) rechts im Input, grün
- Optional: Subtiler grüner Text unterhalb "E-Mail-Adresse ist gültig"

**Design Tokens:**
```
input.field.background.success
input.field.border.success
input.success.color
```

**Verwendung:**
- E-Mail-Validierung (Format-Prüfung)
- Passwort-Stärke (bei Erfüllung aller Kriterien)
- Verfügbarkeits-Prüfung (z.B. Benutzername verfügbar)

**Wichtig:** Success State nicht übermäßig verwenden - nur bei wichtigen Validierungen, nicht bei jedem Feld. Zu viel grün kann überladen wirken.

### Disabled

Zustand für nicht-editierbare Felder, die aus kontextuellen Gründen deaktiviert sind.

**Visuelle Eigenschaften:**
- Background: `neutral.50` (leichtes Grau)
- Border: `1px solid neutral.200` (helles Grau)
- Text: `neutral.600` (reduziert, aber lesbar)
- Opacity: `0.7` (subtile Reduktion)
- Cursor: `not-allowed`

**Design Tokens:**
```
input.field.background.disabled
input.field.border.disabled
input.field.text.disabled
```

**Accessibility:**
- `aria-disabled="true"` setzen
- Alternativ: `disabled` Attribut (verhindert Fokus)
- Wichtig: Text bleibt lesbar (neutral.600), nicht zu stark abgeschwächt
- Tooltip mit Erklärung warum Feld deaktiviert ist (empfohlen)

**Verwendung:**
- Abhängige Felder (z.B. "Lieferadresse" wenn "Wie Rechnungsadresse" aktiv)
- Automatisch befüllte Felder (z.B. berechnete Werte)
- Felder ohne Berechtigung (z.B. Admin-only Felder)

## Validierung

Validierung ist entscheidend für gute Formular-UX. Das Timing und die Art des Feedbacks beeinflussen die Benutzererfahrung massiv.

### Progressive Validation (Empfohlene Strategie)

**Phase 1 - Initial (Erstes Ausfüllen):**
- Validierung erfolgt bei `onBlur` (Feld verlassen)
- Verhindert irritierende Fehlermeldungen während der Eingabe
- Benutzer kann in Ruhe tippen ohne sofortige Kritik

**Phase 2 - Nach Fehler:**
- Validierung wechselt zu `onChange` (jeder Tastendruck)
- Benutzer bekommt sofortiges Feedback während Korrektur
- Fehler verschwindet sofort bei korrekter Eingabe

**Phase 3 - Nach Erfolg:**
- Zurück zu `onBlur` Validierung
- Reduziert Ablenkung durch ständige Success-Indikatoren

**Vorteile dieser Strategie:**
- Beste Balance zwischen Hilfestellung und Nicht-Stören
- Unterstützt von UX-Studien (Nielsen Norman Group)
- Reduziert kognitive Belastung

### Validierungstypen

**Format-Validierung:**
- E-Mail: Regex-Pattern für valides Format
- Telefon: Länge, erlaubte Zeichen, optional Länderformat
- URL: Protokoll, Domain-Struktur
- PLZ: Länderabhängige Formate

**Wertebereichs-Validierung:**
- Minimale/Maximale Länge (z.B. Passwort mindestens 8 Zeichen)
- Numerische Bereiche (z.B. Alter zwischen 18-99)
- Pflichtfeld-Prüfung

**Kontextuelle Validierung:**
- Verfügbarkeit (z.B. Benutzername bereits vergeben)
- Konsistenz (z.B. "Passwort wiederholen" muss übereinstimmen)
- Business-Logik (z.B. Enddatum nach Startdatum)

### Fehlermeldungen Best Practices

**Struktur einer guten Fehlermeldung:**
1. **Problem:** Was ist falsch?
2. **Ursache:** Warum ist es falsch? (optional)
3. **Lösung:** Wie kann es behoben werden? (mit Beispiel)

**Beispiele:**

```
❌ Schlecht: "Ungültig"
✅ Gut: "Bitte gib eine gültige E-Mail-Adresse ein (z.B. name@firma.de)"

❌ Schlecht: "Falsche Länge"
✅ Gut: "Das Passwort muss mindestens 8 Zeichen lang sein"

❌ Schlecht: "Error 422"
✅ Gut: "Diese E-Mail-Adresse ist bereits registriert. Hast du bereits ein Konto?"
```

**Ton:**
- Freundlich und hilfreich, nicht anklagend
- Konkret, nicht vage
- Mit Beispielen, wenn möglich
- Deutsche Sprache, klar und präzise

## Accessibility (WCAG 2.1 AA)

Barrierefreiheit ist kein Optional - jedes Input muss diese Standards erfüllen.

### WCAG Anforderungen

**3.3.1 Fehlererkennung (Level A):**
- Fehler werden automatisch erkannt
- Fehler werden dem Benutzer in Textform beschrieben
- Implementierung: Error Message unterhalb + `aria-invalid="true"`

**3.3.2 Labels oder Anweisungen (Level A):**
- Jedes Input hat ein sichtbares Label
- Label ist mit Input verknüpft (`for` / `id`)
- Pflichtfelder sind gekennzeichnet (Required Indicator)

**3.3.3 Fehlervorschläge (Level AA):**
- Korrekturvorschläge werden gegeben
- Implementierung: Error Messages mit Beispielen und Lösungen

**2.4.7 Fokus sichtbar (Level AA):**
- Focus-Indikator ist deutlich sichtbar
- Minimum 2px Outline-Breite
- Minimum 3:1 Kontrast zum Hintergrund
- Implementierung: 2px Border + 3px Ring (gesamt 5px)

**4.1.2 Name, Rolle, Wert (Level A):**
- Alle Formularelemente haben korrekte ARIA-Attribute
- Status-Änderungen werden assistiven Technologien kommuniziert

### HTML-Struktur mit ARIA

**Minimale Struktur:**
```html
<div class="form-field">
  <label for="email" class="input-label">
    E-Mail-Adresse <span class="required" aria-label="Pflichtfeld">*</span>
  </label>
  <input
    type="email"
    id="email"
    name="email"
    class="text-input"
    placeholder="name@firma.de"
    required
    aria-required="true"
  />
</div>
```

**Mit Helper Text:**
```html
<div class="form-field">
  <label for="password">Passwort <span class="required">*</span></label>
  <input
    type="password"
    id="password"
    aria-describedby="password-help"
    aria-required="true"
  />
  <span id="password-help" class="helper-text">
    Mindestens 8 Zeichen, 1 Großbuchstabe, 1 Zahl
  </span>
</div>
```

**Mit Error State:**
```html
<div class="form-field error">
  <label for="email">E-Mail-Adresse <span class="required">*</span></label>
  <input
    type="email"
    id="email"
    aria-invalid="true"
    aria-describedby="email-error"
  />
  <span id="email-error" class="error-text" role="alert">
    Bitte gib eine gültige E-Mail-Adresse ein (z.B. name@firma.de)
  </span>
</div>
```

### Tastatur-Navigation

**Fokus-Reihenfolge:**
- Tab: Zum nächsten Input springen
- Shift + Tab: Zum vorherigen Input springen
- Enter: Formular absenden (bei letztem Input)

**Focus Management:**
- `:focus-visible` verwenden (nicht `:focus`)
- Verhindert Focus-Ring bei Maus-Klick, zeigt ihn bei Tastatur-Navigation
- Browser-Standard-Fokus nicht entfernen (`outline: none` vermeiden)

### Screen Reader Unterstützung

**Ansagen:**
- Label wird vorgelesen: "E-Mail-Adresse, Pflichtfeld, Eingabefeld"
- Helper Text wird vorgelesen (via `aria-describedby`)
- Error Message wird vorgelesen (via `role="alert"`)
- Required State wird erkannt (via `aria-required="true"`)

**Best Practices:**
- Placeholder ist KEIN Ersatz für Label (verschwindet bei Eingabe)
- Visuelles Label muss mit programmatischem Label übereinstimmen
- Error Icon allein reicht nicht - Text ist Pflicht

## Code-Beispiel

### CSS mit Design Tokens

```css
/* Text Input Base Styles */
.text-input {
  /* Sizing */
  height: var(--input-height-md); /* 40px */
  padding: 0 var(--input-padding-x-md); /* 0 12px */

  /* Typography */
  font-family: var(--input-base-font-family);
  font-size: var(--input-font-size-md); /* 16px */
  color: var(--input-field-text-default);

  /* Visual */
  background-color: var(--input-field-background-default);
  border: var(--input-field-border-width-default) solid var(--input-field-border-default);
  border-radius: var(--input-base-border-radius); /* 4px */

  /* Interaction */
  transition: var(--input-base-transition); /* 150ms ease-in-out */
  cursor: text;
}

/* Placeholder */
.text-input::placeholder {
  color: var(--input-field-text-placeholder);
  opacity: 1; /* Firefox fix */
}

/* Hover State */
.text-input:hover:not(:disabled) {
  border-color: var(--input-field-border-hover);
}

/* Focus State (WCAG 2.2) */
.text-input:focus-visible {
  outline: var(--input-field-border-width-focus) solid var(--input-field-border-focus);
  outline-offset: var(--input-focus-outline-offset);
  box-shadow: 0 0 0 var(--input-focus-ring-width) var(--input-focus-ring-color);
  border-color: var(--input-field-border-focus);
}

/* Error State */
.text-input[aria-invalid="true"] {
  border-color: var(--input-field-border-error);
}

/* Success State */
.text-input.success {
  border-color: var(--input-field-border-success);
}

/* Disabled State */
.text-input:disabled {
  background-color: var(--input-field-background-disabled);
  border-color: var(--input-field-border-disabled);
  color: var(--input-field-text-disabled);
  cursor: not-allowed;
  opacity: 0.7;
}

/* Label */
.input-label {
  display: block;
  font-size: var(--input-label-font-size); /* 14px */
  font-weight: var(--input-label-font-weight); /* 500 */
  color: var(--input-label-color-default);
  margin-bottom: var(--input-label-margin-bottom); /* 8px */
}

/* Required Indicator */
.required {
  color: var(--input-required-color);
  margin-left: 2px;
}

/* Helper Text */
.helper-text {
  display: block;
  font-size: var(--input-helper-font-size); /* 12px */
  color: var(--input-helper-color);
  margin-top: var(--input-helper-margin-top); /* 4px */
}

/* Error Message */
.error-text {
  display: block;
  font-size: var(--input-error-font-size); /* 12px */
  color: var(--input-error-color);
  margin-top: var(--input-error-margin-top); /* 4px */
}

/* Size Variants */
.text-input--small {
  height: var(--input-height-sm); /* 32px */
  padding: 0 var(--input-padding-x-sm); /* 0 8px */
  font-size: var(--input-font-size-sm); /* 14px */
}

.text-input--large {
  height: var(--input-height-lg); /* 48px */
  padding: 0 var(--input-padding-x-lg); /* 0 16px */
  font-size: var(--input-font-size-lg); /* 18px */
}
```

### HTML Beispiele

**Standard Input mit Label:**
```html
<div class="form-field">
  <label for="name" class="input-label">Name</label>
  <input
    type="text"
    id="name"
    name="name"
    class="text-input"
    placeholder="Max Mustermann"
  />
</div>
```

**Required Input mit Helper Text:**
```html
<div class="form-field">
  <label for="email" class="input-label">
    E-Mail-Adresse <span class="required">*</span>
  </label>
  <input
    type="email"
    id="email"
    name="email"
    class="text-input"
    placeholder="name@firma.de"
    required
    aria-required="true"
    aria-describedby="email-help"
  />
  <span id="email-help" class="helper-text">
    Wir senden dir eine Bestätigungs-E-Mail
  </span>
</div>
```

**Error State:**
```html
<div class="form-field">
  <label for="phone" class="input-label">Telefonnummer <span class="required">*</span></label>
  <input
    type="tel"
    id="phone"
    name="phone"
    class="text-input"
    value="123"
    aria-invalid="true"
    aria-describedby="phone-error"
  />
  <span id="phone-error" class="error-text" role="alert">
    Die Telefonnummer muss mindestens 10 Ziffern enthalten
  </span>
</div>
```

## Design Tokens Referenz

| Token Name | Wert | Verwendung |
|------------|------|------------|
| `input.height.sm` | 32px | Input-Höhe Small |
| `input.height.md` | 40px | Input-Höhe Medium (Standard) |
| `input.height.lg` | 48px | Input-Höhe Large |
| `input.padding.x.sm` | 8px | Horizontales Padding Small |
| `input.padding.x.md` | 12px | Horizontales Padding Medium |
| `input.padding.x.lg` | 16px | Horizontales Padding Large |
| `input.font.size.sm` | 14px | Schriftgröße Small |
| `input.font.size.md` | 16px | Schriftgröße Medium |
| `input.font.size.lg` | 18px | Schriftgröße Large |
| `input.field.background.default` | neutral.white | Hintergrund Standard |
| `input.field.background.disabled` | neutral.50 | Hintergrund Disabled |
| `input.field.border.default` | neutral.300 | Border Standard |
| `input.field.border.hover` | neutral.400 | Border Hover |
| `input.field.border.focus` | hydrophon.blau.500 | Border Focus |
| `input.field.border.error` | color.error | Border Error |
| `input.field.border.success` | color.success | Border Success |
| `input.field.border.disabled` | neutral.200 | Border Disabled |
| `input.field.borderWidth.default` | 1px | Border-Breite Standard |
| `input.field.borderWidth.focus` | 2px | Border-Breite Focus |
| `input.field.text.default` | neutral.900 | Text-Farbe Standard |
| `input.field.text.placeholder` | neutral.400 | Placeholder-Farbe |
| `input.field.text.disabled` | neutral.600 | Text-Farbe Disabled |
| `input.focus.ring.color` | hydrophon.blau.100 | Focus Ring Farbe |
| `input.focus.ring.width` | 3px | Focus Ring Breite |
| `input.label.color.default` | neutral.700 | Label-Farbe |
| `input.label.fontSize` | 14px | Label-Schriftgröße |
| `input.label.fontWeight` | 500 | Label-Schriftgewicht |
| `input.label.marginBottom` | 8px | Label Abstand zum Input |
| `input.helper.color` | neutral.600 | Helper Text Farbe |
| `input.helper.fontSize` | 12px | Helper Text Schriftgröße |
| `input.error.color` | color.error | Error Text Farbe |
| `input.error.fontSize` | 12px | Error Text Schriftgröße |
| `input.base.borderRadius` | 4px | Eckenradius |
| `input.base.transition` | 150ms ease-in-out | Übergangsanimation |

---

**Version:** 1.0
**Letzte Aktualisierung:** 2026-01-29
**Phase:** 03 - Forms & Data Input
**Komponente:** FORM-01 - Text Input
