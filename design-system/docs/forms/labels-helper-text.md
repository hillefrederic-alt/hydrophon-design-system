# Labels und Helper Text

Beschriftungen und Hilfestellungen fuer Formularfelder.

## Labels

### Grundprinzipien

- Jedes Eingabefeld MUSS ein sichtbares Label haben
- Labels stehen UEBER dem Eingabefeld (nicht links, nicht als Placeholder)
- Labels beschreiben den erwarteten Inhalt praezise
- Kurz und praegnant (max 3-4 Woerter idealerweise)

### Technische Verknuepfung

Es gibt zwei HTML-Pattern fuer Label-Input-Verknuepfungen:

**Pattern 1: for/id Verknuepfung (Empfohlen)**

```html
<label for="email">E-Mail-Adresse</label>
<input type="email" id="email" />
```

**Pattern 2: Umschliessendes Label**

```html
<label>
  E-Mail-Adresse
  <input type="email" />
</label>
```

**Empfehlung:** for/id ist expliziter und ermoeglicht flexibleres Layout. Umschliessende Labels koennen bei komplexen Layouts zu Styling-Problemen fuehren.

### Warum Labels ueber dem Input?

**Vorteile:**

- Konsistente vertikale Leserichtung (natuerlicher Lesefluss)
- Mobile-optimiert (bei schmalen Viewports kein Platz fuer Label links)
- Bessere Skalierung (Labels koennen variabel lang sein)
- WCAG-konform (Screenreader lesen von oben nach unten)
- Einfacheres Responsive Design

**Vermeiden:**

- Labels links vom Input (bricht auf Mobile)
- Labels rechts vom Input (verwirrt die Lesereihenfolge)
- Nur Placeholder ohne Label (nicht barrierefrei)

### Styling

Labels verwenden folgende Token:

- **Schriftgroesse:** `{input.label.fontSize}` → 14px
- **Schriftgewicht:** `{input.label.fontWeight}` → 500 (medium)
- **Farbe:** `{input.label.color.default}` → neutral.700
- **Abstand zum Input:** `{input.label.marginBottom}` → 8px

```css
label {
  display: block;
  font-size: var(--input-label-font-size);
  font-weight: var(--input-label-font-weight);
  color: var(--input-label-color-default);
  margin-bottom: var(--input-label-margin-bottom);
}
```

### Label-Text-Empfehlungen

**Gut:**

- "E-Mail-Adresse"
- "Telefonnummer"
- "Lieferdatum"
- "Nachricht"

**Vermeiden:**

- "Bitte geben Sie Ihre E-Mail-Adresse ein" (zu lang, gehört in Helper Text)
- "Email:" (Doppelpunkt unnötig, nicht-deutscher Begriff)
- "Ihre Nachricht an uns" (zu umgangssprachlich für B2B)

## Pflichtfeld-Kennzeichnung

### Visueller Indikator

Pflichtfelder werden mit einem roten Asterisk (*) nach dem Label-Text gekennzeichnet:

```html
<label for="name">
  Name
  <span class="required" aria-label="Pflichtfeld">*</span>
</label>
<input type="text" id="name" aria-required="true" required />
```

### Styling des Asterisk

- **Farbe:** `{input.required.color}` → color.error (rot)
- **Symbol:** `{input.required.symbol}` → "*"
- **Position:** Direkt nach dem Label-Text mit kleinem Abstand (2px margin-left)

```css
.required {
  color: var(--input-required-color);
  margin-left: 2px;
}
```

### Screenreader-Unterstuetzung

Der Asterisk benoetigt `aria-label="Pflichtfeld"`, damit Screenreader-Nutzer die Information erhalten:

```html
<span class="required" aria-label="Pflichtfeld">*</span>
```

Alternativ kann die Information im Label selbst stehen:

```html
<label for="name">
  Name <span aria-label="Pflichtfeld">*</span>
</label>
```

### Legende am Formularanfang

Wenn mehrere Pflichtfelder im Formular sind, fuege eine Legende am Anfang hinzu:

```html
<form>
  <p class="form-legend">Felder mit <span class="required">*</span> sind Pflichtfelder</p>

  <!-- Formularfelder -->
</form>
```

### HTML-Attribute fuer Pflichtfelder

Pflichtfelder benoetigen ZWEI Attribute:

1. **`required`** - Native HTML5 Validierung
2. **`aria-required="true"`** - Screenreader-Ankuendigung

```html
<input
  type="text"
  id="name"
  required
  aria-required="true"
/>
```

**Warum beide?**

- `required`: Browser validiert vor Submit, zeigt native Fehlermeldung
- `aria-required="true"`: Screenreader kuendigt Pflichtfeld an BEVOR User eingibt

### Alternativer Ansatz: "(optional)" statt Asterisk

Wenn 80% oder mehr der Felder Pflichtfelder sind, ist es effizienter, die OPTIONALEN Felder zu markieren:

```html
<!-- Statt Asterisk bei 8 von 10 Feldern... -->
<label for="name">Name <span class="required">*</span></label>
<label for="email">E-Mail <span class="required">*</span></label>
<label for="phone">Telefon <span class="required">*</span></label>
<!-- ... nur 2 mit "(optional)" kennzeichnen -->

<!-- Besser: -->
<label for="name">Name</label>
<label for="email">E-Mail</label>
<label for="phone">Telefon</label>
<label for="notes">Notizen <span class="optional">(optional)</span></label>
<label for="fax">Fax <span class="optional">(optional)</span></label>
```

**Vorteil:** Weniger visuelle Unruhe, Fokus auf das Wesentliche.

### Error-State für Labels

Wenn ein Feld einen Fehler hat, kann das Label ebenfalls rot eingefaerbt werden:

```html
<label for="email" class="error">
  E-Mail-Adresse
  <span class="required" aria-label="Pflichtfeld">*</span>
</label>
<input
  type="email"
  id="email"
  aria-invalid="true"
  aria-describedby="email-error"
/>
<span id="email-error" role="alert">
  Bitte gib eine gueltige E-Mail-Adresse ein
</span>
```

```css
label.error {
  color: var(--input-label-color-error);
}
```

## Helper Text

### Zweck

Helper Text erklaert das Eingabefeld BEVOR der User eingibt:

- **Eingabeformat:** "TT.MM.JJJJ" oder "z.B. 01.12.2024"
- **Beispielwerte:** "z.B. name@firma.de"
- **Zusaetzliche Kontext-Information:** "Wir verwenden deine E-Mail nur zur Kontaktaufnahme"
- **Einschraenkungen:** "Mindestens 8 Zeichen, mindestens ein Grossbuchstabe"

### Position

Helper Text steht UNTER dem Eingabefeld:

```
[Label]
[Input Field]
[Helper Text]
```

### Abstand

- **Abstand nach oben vom Input:** `{input.helper.marginTop}` → 4px

```css
.helper-text {
  margin-top: var(--input-helper-margin-top);
}
```

### Styling

- **Schriftgroesse:** `{input.helper.fontSize}` → 12px
- **Farbe:** `{input.helper.color}` → neutral.600
- **Zeilenhoehe:** 1.4 (fuer mehrzeiligen Text)

```css
.helper-text {
  display: block;
  font-size: var(--input-helper-font-size);
  color: var(--input-helper-color);
  margin-top: var(--input-helper-margin-top);
  line-height: 1.4;
}
```

### Accessibility: aria-describedby

Helper Text MUSS mit dem Input via `aria-describedby` verknuepft werden:

```html
<label for="password">Passwort</label>
<input
  type="password"
  id="password"
  aria-describedby="password-helper"
/>
<span id="password-helper" class="helper-text">
  Mindestens 8 Zeichen, mindestens ein Grossbuchstabe
</span>
```

**Warum wichtig?**

- Screenreader lesen Helper Text VOR der Eingabe
- User wissen sofort, was erwartet wird
- Reduziert Fehlerquote

### Placeholder vs Helper Text

| Eigenschaft | Placeholder | Helper Text |
|-------------|-------------|-------------|
| **Sichtbarkeit** | Verschwindet bei Eingabe | Bleibt sichtbar |
| **Kontrast** | Geringer Kontrast (neutral.400) | Voller Kontrast (neutral.600) |
| **Screenreader** | Nicht als Label erkannt | Mit aria-describedby verknuepft |
| **WCAG-Konformitaet** | Problematisch (zu geringer Kontrast) | Konform |
| **Verwendung** | Optionale Beispielwerte wenn Platz fehlt | Wichtige Informationen |

**Empfehlung:** Helper Text fuer wichtige Informationen, Placeholder nur fuer Beispielwerte.

### Wann Placeholder verwenden?

Placeholder sind hilfreich fuer:

- **Eingabeformat-Beispiele:** `placeholder="+49 123 456789"` fuer Telefonnummer
- **Suchfelder:** `placeholder="Produkt suchen..."` (wenn offensichtlich)
- **Optionale Zusatzinfos:** `placeholder="Optional: Firma"` (aber besser im Label)

### Best Practice: Kombination

```html
<label for="phone">Telefonnummer</label>
<input
  type="tel"
  id="phone"
  placeholder="+49 123 456789"
  aria-describedby="phone-helper"
/>
<span id="phone-helper" class="helper-text">
  Bitte mit Laendervorwahl
</span>
```

- **Placeholder:** Zeigt Beispielformat
- **Helper Text:** Erklaert Anforderung

### Helper Text bei Error State

Wenn ein Fehler auftritt, wird der Helper Text durch die Error Message ERSETZT (nicht zusaetzlich):

```html
<!-- Normal: -->
<input aria-describedby="email-helper" />
<span id="email-helper" class="helper-text">
  z.B. name@firma.de
</span>

<!-- Error: -->
<input aria-describedby="email-error" aria-invalid="true" />
<span id="email-error" class="error-message" role="alert">
  Bitte gib eine gueltige E-Mail-Adresse ein
</span>
```

**Warum ersetzen?**

- Vermeidet visuelle Ueberladung
- Error Message ist wichtiger als Helper Text
- User fokussiert sich auf Fehlerkorrektur

**Ausnahme:** Wenn Helper Text kritische Informationen enthaelt (z.B. Passwort-Anforderungen), kann er zusaetzlich zur Error Message bleiben:

```html
<input aria-describedby="password-helper password-error" aria-invalid="true" />
<span id="password-helper" class="helper-text">
  Mindestens 8 Zeichen, mindestens ein Grossbuchstabe
</span>
<span id="password-error" class="error-message" role="alert">
  Das Passwort ist zu kurz
</span>
```

## Accessibility

### WCAG 3.3.2: Labels oder Anweisungen

**Anforderung:** Labels oder Anweisungen werden bereitgestellt, wenn Inhalte Benutzereingaben erfordern.

**Umsetzung:**

- Jedes Eingabefeld hat ein sichtbares Label
- Labels sind programmatisch verknuepft (for/id oder umschliessend)
- Anweisungen (Helper Text) werden VOR der Eingabe bereitgestellt
- Pflichtfelder sind eindeutig gekennzeichnet

### aria-describedby

`aria-describedby` verknuepft Input mit Helper Text und/oder Error Message:

**Ein Element:**

```html
<input aria-describedby="helper" />
<span id="helper">Helper Text</span>
```

**Mehrere Elemente (space-separated):**

```html
<input aria-describedby="helper error" />
<span id="helper">Helper Text</span>
<span id="error">Error Message</span>
```

**Screenreader-Verhalten:**

1. Label wird angekuendigt
2. Input-Typ wird angekuendigt
3. aria-describedby Elemente werden angekuendigt
4. Input-Wert wird angekuendigt (falls vorhanden)

### Fokus-Reihenfolge

Die Fokus-Reihenfolge fuer ein Standard-Formularfeld:

1. **Label:** Nicht fokussierbar, aber von Screenreader angekuendigt
2. **Input:** Fokussierbar mit Tab
3. **Helper/Error Text:** Nicht fokussierbar, aber mit aria-describedby angekuendigt

```html
<label for="email">E-Mail-Adresse</label>               <!-- 1. Angekuendigt -->
<input type="email" id="email" aria-describedby="help" /> <!-- 2. Fokussiert -->
<span id="help">z.B. name@firma.de</span>                <!-- 3. Angekuendigt -->
```

### aria-required vs required

Beide Attribute sind wichtig:

| Attribut | Zweck | Browser-Verhalten |
|----------|-------|-------------------|
| `required` | Native HTML5 Validierung | Browser validiert vor Submit, zeigt Fehlermeldung |
| `aria-required="true"` | Screenreader-Ankuendigung | Screenreader sagt "Pflichtfeld" beim Fokus |

**Best Practice:** Beide verwenden.

```html
<input type="text" required aria-required="true" />
```

## Layout-Pattern

### Standard-Feld-Struktur

```html
<div class="form-field">
  <label for="field-id">
    Label-Text
    <span class="required" aria-label="Pflichtfeld">*</span>
  </label>
  <input
    type="text"
    id="field-id"
    aria-required="true"
    aria-describedby="field-helper"
    required
  />
  <span id="field-helper" class="helper-text">
    Helper Text
  </span>
</div>
```

### Styling mit Token-Referenzen

```css
.form-field {
  margin-bottom: var(--form-spacing-field-to-field); /* 16px */
}

.form-field label {
  display: block;
  font-size: var(--input-label-font-size);           /* 14px */
  font-weight: var(--input-label-font-weight);       /* 500 */
  color: var(--input-label-color-default);           /* neutral.700 */
  margin-bottom: var(--input-label-margin-bottom);   /* 8px */
}

.form-field .required {
  color: var(--input-required-color);                /* error */
  margin-left: 2px;
}

.form-field input {
  /* Input-Styles siehe text-input.md */
}

.form-field .helper-text {
  display: block;
  font-size: var(--input-helper-font-size);          /* 12px */
  color: var(--input-helper-color);                  /* neutral.600 */
  margin-top: var(--input-helper-margin-top);        /* 4px */
}
```

### Formulargruppen

Mehrere zusammenhaengende Felder koennen in einer Gruppe zusammengefasst werden:

```html
<fieldset class="form-group">
  <legend>Adressdaten</legend>

  <div class="form-field">
    <label for="street">Strasse</label>
    <input type="text" id="street" />
  </div>

  <div class="form-field">
    <label for="city">Stadt</label>
    <input type="text" id="city" />
  </div>
</fieldset>
```

**Abstand zwischen Gruppen:**

```css
.form-group {
  margin-bottom: var(--form-spacing-group-to-group); /* 24px */
}
```

## Anti-Patterns

### Vermeiden

**1. Placeholder als einziges Label**

```html
<!-- FALSCH -->
<input type="email" placeholder="E-Mail-Adresse" />

<!-- RICHTIG -->
<label for="email">E-Mail-Adresse</label>
<input type="email" id="email" placeholder="z.B. name@firma.de" />
```

**Warum?** Placeholder verschwindet bei Eingabe, geringer Kontrast, nicht WCAG-konform.

**2. Label rechts vom Input**

```html
<!-- FALSCH -->
<div style="display: flex;">
  <input type="checkbox" id="terms" />
  <label for="terms">Ich akzeptiere die AGB</label>
</div>
```

**Warum?** Das ist korrekt fuer Checkboxen, aber FALSCH fuer Text-Inputs. Bei Text-Inputs muss das Label UEBER dem Input stehen.

**3. Floating Labels**

```html
<!-- VERMEIDEN -->
<div class="floating-label">
  <input type="text" id="email" placeholder=" " />
  <label for="email">E-Mail-Adresse</label>
</div>
```

**Warum?** Accessibility-Probleme, komplexe Implementierung, verwirrt Screenreader, schwierig fuer kognitive Einschraenkungen.

**4. Label zu weit vom Input entfernt**

```html
<!-- FALSCH -->
<label for="email">E-Mail-Adresse</label>
<div style="margin-top: 40px;">
  <input type="email" id="email" />
</div>
```

**Warum?** User kann Label nicht mit Input assoziieren, besonders problematisch fuer kognitive Einschraenkungen.

**5. Hilfetext nur in Tooltip versteckt**

```html
<!-- FALSCH -->
<label for="password">
  Passwort
  <button type="button" aria-label="Hilfe" title="Min. 8 Zeichen">?</button>
</label>
<input type="password" id="password" />

<!-- RICHTIG -->
<label for="password">Passwort</label>
<input type="password" id="password" aria-describedby="password-helper" />
<span id="password-helper" class="helper-text">
  Mindestens 8 Zeichen, mindestens ein Grossbuchstabe
</span>
```

**Warum?** Tooltip ist nicht keyboard-accessible, nicht von Screenreadern angekuendigt, versteckt kritische Information.

## Code-Beispiele

### Einfaches Textfeld

```html
<div class="form-field">
  <label for="name">Name</label>
  <input type="text" id="name" />
</div>
```

### Pflichtfeld mit Helper Text

```html
<div class="form-field">
  <label for="email">
    E-Mail-Adresse
    <span class="required" aria-label="Pflichtfeld">*</span>
  </label>
  <input
    type="email"
    id="email"
    required
    aria-required="true"
    aria-describedby="email-helper"
  />
  <span id="email-helper" class="helper-text">
    Wir verwenden deine E-Mail nur zur Kontaktaufnahme
  </span>
</div>
```

### Feld mit Placeholder und Helper Text

```html
<div class="form-field">
  <label for="phone">Telefonnummer</label>
  <input
    type="tel"
    id="phone"
    placeholder="+49 123 456789"
    aria-describedby="phone-helper"
  />
  <span id="phone-helper" class="helper-text">
    Bitte mit Laendervorwahl
  </span>
</div>
```

### Feld mit Error State

```html
<div class="form-field">
  <label for="password" class="error">
    Passwort
    <span class="required" aria-label="Pflichtfeld">*</span>
  </label>
  <input
    type="password"
    id="password"
    required
    aria-required="true"
    aria-invalid="true"
    aria-describedby="password-helper password-error"
  />
  <span id="password-helper" class="helper-text">
    Mindestens 8 Zeichen, mindestens ein Grossbuchstabe
  </span>
  <span id="password-error" class="error-message" role="alert">
    Das Passwort ist zu kurz
  </span>
</div>
```

## Design Tokens

Alle Design Tokens fuer Labels und Helper Text:

| Token | Wert | Verwendung |
|-------|------|------------|
| `input.label.fontSize` | 14px | Label Schriftgroesse |
| `input.label.fontWeight` | 500 | Label Schriftgewicht (medium) |
| `input.label.color.default` | neutral.700 | Label Farbe Standard |
| `input.label.color.error` | color.error | Label Farbe Error State |
| `input.label.marginBottom` | 8px | Abstand Label → Input |
| `input.helper.fontSize` | 12px | Helper Text Schriftgroesse |
| `input.helper.color` | neutral.600 | Helper Text Farbe |
| `input.helper.marginTop` | 4px | Abstand Input → Helper Text |
| `input.required.color` | color.error | Pflichtfeld-Asterisk Farbe (rot) |
| `input.required.symbol` | "*" | Pflichtfeld-Symbol |
| `input.error.fontSize` | 12px | Error Message Schriftgroesse |
| `input.error.color` | color.error | Error Message Farbe |
| `input.error.marginTop` | 4px | Abstand Input → Error Message |
| `form.spacing.labelToInput` | 8px | Abstand Label → Input (alias für label.marginBottom) |
| `form.spacing.inputToHelper` | 4px | Abstand Input → Helper/Error (alias für helper.marginTop) |
| `form.spacing.fieldToField` | 16px | Abstand zwischen Formularfeldern |
| `form.spacing.groupToGroup` | 24px | Abstand zwischen Formulargruppen |

---

**Siehe auch:**

- [Text Input Dokumentation](./text-input.md)
- [Validation Dokumentation](./validation.md)
- [Checkbox Dokumentation](./checkbox.md)
- [Radio Button Dokumentation](./radio-button.md)
