# Formular-Komponenten

Vollstaendiges Formularsystem fuer konsistente Dateneingabe mit WCAG 2.1 AA Compliance.

## Uebersicht

Dieses Kapitel dokumentiert alle Form-Komponenten des Hydrophon Design Systems. Die Komponenten folgen einem **Native-First-Ansatz** mit Fokus auf Accessibility, Performance und konsistenter User Experience.

### Schnellzugriff

| Komponente | Beschreibung | Dokument |
|------------|--------------|----------|
| **Text Input** | Einzeilige Texteingabe mit 3 Groessen und 6 Zustaenden | [text-input.md](./text-input.md) |
| **Textarea** | Mehrzeilige Texteingabe mit vertikalem Resize | [textarea.md](./textarea.md) |
| **Select** | Dropdown-Auswahl mit Native-First-Empfehlung | [select.md](./select.md) |
| **Checkbox** | Mehrfachauswahl mit opacity:0 Native-Pattern | [checkbox.md](./checkbox.md) |
| **Radio Button** | Exklusive Auswahl mit fieldset/legend Gruppierung | [radio-button.md](./radio-button.md) |
| **Labels & Helper** | Beschriftungen, Pflichtfeld-Kennzeichnung, Helper Text | [labels-helper-text.md](./labels-helper-text.md) |
| **Validierung** | Progressive Validation, Error States, Fehlermeldungen | [validation.md](./validation.md) |

## Design-Prinzipien

### 1. Native-First Approach

Wir verwenden native HTML-Elemente wo immer moeglich:

- **`<input>`, `<textarea>`, `<select>`** statt Div-basierter Custom-Controls
- **Bewahrung der Accessibility-Tree** durch `opacity: 0` statt `display: none`
- **Native Tastaturnavigation** (Tab, Space, Pfeiltasten) bleibt erhalten
- **Native Validierung** via HTML5 `required`, `pattern`, etc.

**Warum?**

- Screenreader-Kompatibilitaet out-of-the-box
- Mobile OS Picker (iOS Datum-Picker, Android Tastatur)
- Weniger JavaScript-Code zu warten
- Bessere Performance

### 2. Konsistenz mit Button-System

Alle Form-Komponenten teilen die gleichen Hoehen wie das Button-System (Phase 2):

| Groesse | Hoehe | Verwendung |
|---------|-------|------------|
| **Small** | 32px | Kompakte UIs, nur Desktop (unter WCAG Touch-Target) |
| **Medium** | 40px | Standard fuer die meisten Formulare |
| **Large** | 48px | Mobile-optimiert, CTAs, uebertrifft WCAG AAA |

**Gemeinsame Token:**

- Border-Radius: `4px` (konsistent mit Buttons)
- Focus-Indikatoren: `2px` Outline + `2px/3px` Ring
- Font-Family: `Inter` (konsistent mit Typography-System)

### 3. Accessibility First

Alle Form-Komponenten erfuellen **WCAG 2.1 AA**:

- **WCAG 3.3.1 Fehlererkennung:** Fehler werden automatisch erkannt und beschrieben
- **WCAG 3.3.2 Labels:** Alle Eingaben haben sichtbare, verknuepfte Labels
- **WCAG 3.3.3 Fehlervorschlaege:** Fehlermeldungen enthalten Korrekturhinweise
- **WCAG 2.4.7 Fokus sichtbar:** 2px Outline mit ausreichend Kontrast
- **WCAG 1.4.1 Verwendung von Farbe:** Fehler nicht nur durch Farbe (+ Icon + Text)

**ARIA-Attribute:**

- `aria-required="true"` fuer Pflichtfelder
- `aria-invalid="true"` fuer fehlerhafte Felder
- `aria-describedby` fuer Helper Text und Error Messages
- `role="alert"` fuer Error Messages (sofortige Screenreader-Ankuendigung)

### 4. Outline-Stil

Alle Eingabe-Komponenten verwenden **Outline-Style** (nicht Filled):

- **Weisser Hintergrund** in allen Zustaenden (ausser Disabled: `neutral.50`)
- **Sichtbare Border** in allen Zustaenden (Farbe aendert sich)
- **Klarer Focus-State** mit verdickter Border + Ring

**Warum Outline?**

- Professioneller B2B-Look
- Besserer Kontrast fuer Text
- Konsistent mit Button-System (Secondary/Tertiary haben auch Border)
- Weniger visuelles Gewicht (weisser Hintergrund statt grauer)

## Groessen-System

### Input-Hoehen

| Token | Wert | Komponenten |
|-------|------|-------------|
| `input.height.sm` | 32px | Text Input, Select (nur Desktop) |
| `input.height.md` | 40px | Text Input, Select, Textarea (Standard) |
| `input.height.lg` | 48px | Text Input, Select, Textarea (Mobile-optimiert) |

### Checkbox/Radio-Groessen

| Token | Wert | Verwendung |
|-------|------|------------|
| `checkbox.size.default` | 20px | Standard-Groesse Desktop & Mobile |
| `checkbox.size.large` | 24px | Mobile-optimierte Interfaces |
| `radio.size.default` | 20px | Standard-Groesse Desktop & Mobile |
| `radio.size.large` | 24px | Mobile-optimierte Interfaces |

**Touch-Target Compliance:**

- Checkbox/Radio 20px + Label = 44px+ Touch-Target (WCAG AAA konform)
- Input 40px Hoehe = WCAG AA konform (24px Minimum)
- Input 48px Hoehe = WCAG AAA konform (44px Empfehlung)

## Zustaende

Alle Eingabe-Komponenten unterstuetzen folgende Zustaende:

| Zustand | Beschreibung | Token-Suffix |
|---------|--------------|--------------|
| **Default** | Standard-Zustand, keine Interaktion | `.default` |
| **Hover** | Maus-Hover (nicht Touch) | `.hover` |
| **Focus** | Tastatur- oder Maus-Fokus | `.focus` |
| **Error** | Validierungsfehler | `.error` |
| **Success** | Erfolgreich validiert (optional) | `.success` |
| **Disabled** | Deaktiviert, nicht editierbar | `.disabled` |

**Zusaetzliche Zustaende fuer Checkbox/Radio:**

- **Checked/Selected:** Angekreuzt/Ausgewaehlt
- **Checked + Hover:** Angekreuzt + Maus-Hover
- **Checked + Disabled:** Angekreuzt + Deaktiviert

## Token-Namenskonvention

Alle Form-Tokens folgen einer konsistenten Hierarchie:

```
{component}.{element}.{property}.{state}

Beispiele:
input.field.border.focus       → Hydrophon Blau 500
input.label.color.default      → Neutral 700
input.error.color              → Color Error

checkbox.background.checked    → Hydrophon Blau 500
checkbox.border.hover          → Neutral 400

radio.dot.color                → Neutral White
radio.group.gap                → 12px (spacing.3)
```

### Token-Kategorien

| Kategorie | Beschreibung | Beispiele |
|-----------|--------------|-----------|
| `input.field.*` | Haupt-Eingabefeld (Background, Border, Text) | `.border.default`, `.background.focus` |
| `input.label.*` | Label-Styling | `.color.default`, `.fontSize`, `.marginBottom` |
| `input.helper.*` | Helper Text | `.color`, `.fontSize`, `.marginTop` |
| `input.error.*` | Error Message | `.color`, `.fontSize`, `.marginTop` |
| `input.required.*` | Pflichtfeld-Indikator | `.color`, `.symbol` |
| `input.focus.*` | Focus-Ring | `.ring.color`, `.ring.width` |
| `checkbox.*` | Checkbox-spezifische Tokens | `.size.default`, `.background.checked` |
| `radio.*` | Radio-spezifische Tokens | `.dot.size`, `.group.gap` |
| `form.spacing.*` | Layout-Spacing | `.fieldToField`, `.groupToGroup` |

## Validierungs-Strategie

Alle Formulare verwenden **Progressive Validation** ("Belohne frueh, bestrafe spaet"):

1. **Initiale Eingabe:** Keine Validierung waehrend User tippt
2. **Blur:** Erste Validierung wenn Feld verlassen wird
3. **Nach Fehler:** Echtzeit-Validierung bei jeder Aenderung
4. **Bei Korrektur:** Fehler verschwindet sofort

```typescript
const form = useForm({
  mode: 'onBlur',           // Initiale Validierung bei blur
  reValidateMode: 'onChange' // Nach Fehler: live re-validieren
});
```

Siehe [validation.md](./validation.md) fuer Details.

## Installation

Die Form-Tokens sind Teil des Design-System-Builds.

### Build ausfuehren

```bash
cd design-system
npm run build
```

**Generierte Dateien:**

- `build/css/variables.css` - CSS Custom Properties
- `build/json/tokens.json` - JSON Token-Export
- `build/scss/_variables.scss` - SCSS Variablen (falls konfiguriert)

### Verwendung in CSS

```css
@import '../design-system/build/css/variables.css';

.my-input {
  height: var(--input-height-md);
  border: 1px solid var(--input-field-border-default);
  border-radius: var(--input-base-border-radius);
  padding: 0 var(--input-padding-x-md);
  font-size: var(--input-font-size-md);
}

.my-input:focus {
  border-color: var(--input-field-border-focus);
  outline: var(--input-focus-ring-width) solid var(--input-focus-ring-color);
}

.my-input.error {
  border-color: var(--input-field-border-error);
}
```

### Verwendung in JavaScript/TypeScript

```typescript
import tokens from '../design-system/build/json/tokens.json';

const inputHeight = tokens.input.height.md.$value; // "40px"
const errorColor = tokens.input.error.color.$value; // "#..."
```

## Code-Beispiele

### Vollstaendiges Formular (React Hook Form + Zod)

Siehe [validation.md](./validation.md) fuer ein vollstaendiges Integrations-Beispiel mit:

- React Hook Form Setup
- Zod Schema Validierung
- Progressive Validation
- Error/Success States
- Accessibility-Attribute (aria-invalid, aria-describedby, role="alert")
- CSS mit Token-Referenzen

### Einfaches Textfeld

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

### Checkbox-Gruppe

```html
<fieldset class="form-group">
  <legend>Newsletter-Einstellungen</legend>

  <label class="checkbox-label">
    <input type="checkbox" name="newsletter" value="products" class="checkbox-native" />
    <span class="checkbox-custom"></span>
    Produktneuheiten
  </label>

  <label class="checkbox-label">
    <input type="checkbox" name="newsletter" value="updates" class="checkbox-native" />
    <span class="checkbox-custom"></span>
    System-Updates
  </label>
</fieldset>
```

### Radio-Gruppe

```html
<fieldset class="form-group">
  <legend>
    Versandart
    <span class="required" aria-label="Pflichtfeld">*</span>
  </legend>

  <label class="radio-label">
    <input type="radio" name="shipping" value="standard" class="radio-native" required />
    <span class="radio-custom"></span>
    Standard (3-5 Tage)
  </label>

  <label class="radio-label">
    <input type="radio" name="shipping" value="express" class="radio-native" required />
    <span class="radio-custom"></span>
    Express (1-2 Tage)
  </label>
</fieldset>
```

## Best Practices

### Labels

- **Immer ein sichtbares Label** (nicht nur Placeholder)
- **Label UEBER dem Input** (nicht links, nicht rechts)
- **for/id Verknuepfung** fuer maximale Kompatibilitaet
- **Kurz und praegnant** (max 3-4 Woerter)

### Pflichtfelder

- **Rotes Asterisk** nach dem Label mit `aria-label="Pflichtfeld"`
- **`required` + `aria-required="true"`** auf dem Input
- **Legende am Formularanfang** ("Felder mit * sind Pflichtfelder")
- **Alternativ:** Bei 80%+ Pflichtfeldern → "(optional)" bei optionalen Feldern

### Helper Text

- **Unter dem Input** mit `aria-describedby`
- **Bleibt sichtbar** (im Gegensatz zu Placeholder)
- **Erklaert Format/Anforderungen** BEVOR User eingibt
- **Wird ersetzt durch Error-Message** bei Fehler (oder bleibt bei kritischen Infos)

### Fehlermeldungen

- **Erklaerend-hilfreich:** Was ist falsch + Wie beheben + Beispiel
- **Drei visuelle Indikatoren:** Farbe + Icon + Text (WCAG 1.4.1)
- **`role="alert"`** fuer sofortige Screenreader-Ankuendigung
- **Inline + Summary** bei komplexen Formularen (5+ Felder)

### Tastatur-Navigation

- **Tab:** Naechstes Feld
- **Shift+Tab:** Vorheriges Feld
- **Space:** Checkbox/Radio toggle, Buttons aktivieren
- **Pfeiltasten:** Radio-Gruppe navigieren (native Verhalten)
- **Enter:** Submit-Button aktivieren

## Weiterfuehrende Ressourcen

### Interne Dokumentation

- [Button-Dokumentation](../buttons.md) - Button-System (Phase 2)
- [Icon-System](../icons.md) - Lucide Icons Integration
- [Farb-Tokens](../colors.md) - Color-System (Phase 1)
- [Typography](../typography.md) - Typography-System (Phase 1)

### Externe Referenzen

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [MDN Web Forms Guide](https://developer.mozilla.org/en-US/docs/Learn/Forms)
- [React Hook Form Documentation](https://react-hook-form.com/)
- [Zod Validation Library](https://zod.dev/)

---

**Phase:** 03 - Forms & Data Input
**Zuletzt aktualisiert:** 2026-01-29
**Version:** 1.0
