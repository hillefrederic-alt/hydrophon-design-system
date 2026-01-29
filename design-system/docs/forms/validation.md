# Validierung und Fehlermeldungen

Patterns fuer Formular-Validierung mit klarem, hilfreichem Feedback.

## Validierungs-Strategie

### Progressive Validation (Empfohlen)

**"Belohne frueh, bestrafe spaet"**

Die beste UX-Strategie fuer Formular-Validierung basiert auf progressivem Feedback:

1. **Initiale Eingabe:** Keine Validierung waehrend User tippt (verhindert fruehe Fehler)
2. **Blur (Feld verlassen):** Erste Validierung wenn Feld verlassen wird
3. **Nach Fehler:** Echtzeit-Validierung bei jeder Aenderung (sofortiges Feedback bei Korrektur)
4. **Bei Korrektur:** Fehler verschwindet sofort wenn Input gueltig wird

### React Hook Form Konfiguration

```typescript
import { useForm } from 'react-hook-form';

const form = useForm({
  mode: 'onBlur',           // Initiale Validierung bei blur
  reValidateMode: 'onChange' // Nach Fehler: live re-validieren
});
```

**Warum dieses Pattern?**

- **Verhindert Frustration:** User sieht keine Fehler waehrend er noch tippt
- **Sofortiges Feedback:** Nach einem Fehler bekommt User sofortige Bestaetigung bei Korrektur
- **Reduziert kognitive Last:** User kann sich auf Eingabe konzentrieren, nicht auf Fehlervermeidung
- **Bewährt:** Nielsen Norman Group UX-Forschung empfiehlt diesen Ansatz

### Alternative: onSubmit (Nicht empfohlen fuer komplexe Formulare)

```typescript
const form = useForm({
  mode: 'onSubmit' // Nur bei Submit validieren
});
```

**Wann verwenden?**

- Sehr einfache Formulare (1-2 Felder)
- Quick-Actions (z.B. Newsletter-Anmeldung)

**Nachteile:**

- User sieht Fehler erst am Ende
- Bei vielen Feldern: User muss alle Fehler auf einmal korrigieren
- Höhere Abbruchrate

### Alternative: onChange (Nicht empfohlen)

```typescript
const form = useForm({
  mode: 'onChange' // Bei jedem Tastendruck validieren
});
```

**Warum nicht?**

- Zu frueher Feedback ("E-Mail ungueltig" nach dem ersten Buchstaben)
- Frustrierend fuer User
- Lenkt von Eingabe ab

## Error States

### Visueller Indikator

Fehlerhafte Felder werden durch DREI visuelle Indikatoren gekennzeichnet (WCAG 1.4.1: Fehler duerfen nicht nur durch Farbe kommuniziert werden):

1. **Rote Border:** `{input.field.border.error}` (color.error)
2. **Error-Icon:** AlertCircle (Lucide) im Input rechts (16px, error color)
3. **Error-Text:** Unter dem Input mit Erklaerung

```html
<div class="form-field form-field--error">
  <label for="email" class="error">
    E-Mail-Adresse
    <span class="required" aria-label="Pflichtfeld">*</span>
  </label>
  <div class="input-wrapper">
    <input
      type="email"
      id="email"
      aria-invalid="true"
      aria-describedby="email-error"
      class="input--error"
    />
    <svg class="input-icon input-icon--error" aria-hidden="true">
      <!-- AlertCircle Icon -->
    </svg>
  </div>
  <span id="email-error" class="error-message" role="alert">
    Bitte gib eine gueltige E-Mail-Adresse ein (z.B. name@firma.de)
  </span>
</div>
```

### Token-Werte

```css
.input--error {
  border-color: var(--input-field-border-error);     /* color.error */
}

.error-message {
  color: var(--input-error-color);                   /* color.error */
  font-size: var(--input-error-font-size);           /* 12px */
  margin-top: var(--input-error-margin-top);         /* 4px */
}

.input-icon--error {
  color: var(--input-error-color);                   /* color.error */
  width: 16px;
  height: 16px;
}
```

### WCAG-konforme Fehleranzeige

Fehler duerfen NICHT nur durch Farbe kommuniziert werden (WCAG 1.4.1):

| Indikator | Zweck | Zielgruppe |
|-----------|-------|------------|
| Rote Border | Visueller Hinweis | Sehende User |
| Error-Icon | Form-basierter Hinweis | Farbenblinde User |
| Error-Text | Textuelle Erklaerung | Alle User |
| aria-invalid="true" | Programmatischer Hinweis | Screenreader-User |

**Alle vier Indikatoren zusammen = WCAG 2.1 AA konform**

## Success States

### Visueller Indikator

Erfolgreich validierte Felder koennen optional mit einem Success-State gekennzeichnet werden:

1. **Gruene Border:** `{input.field.border.success}` (color.success)
2. **Success-Icon:** Check (Lucide) im Input rechts (16px, success color)
3. **Kein zusaetzlicher Text noetig** (visuelle Bestaetigung reicht)

```html
<div class="form-field form-field--success">
  <label for="email">E-Mail-Adresse</label>
  <div class="input-wrapper">
    <input
      type="email"
      id="email"
      value="max@firma.de"
      class="input--success"
    />
    <svg class="input-icon input-icon--success" aria-hidden="true">
      <!-- Check Icon -->
    </svg>
  </div>
</div>
```

### Verwendung

**Wann Success-State verwenden?**

- Nach erfolgreicher Validierung komplexer Felder (z.B. E-Mail-Format, Passwort-Staerke)
- Bei asynchroner Validierung (z.B. "Benutzername verfuegbar")
- Um User zu bestaetigen dass Eingabe korrekt ist

**Wann NICHT verwenden?**

- Bei jedem Feld (ueberladen, visueller Noise)
- Bei einfachen Feldern (Name, Stadt - offensichtlich korrekt)
- Wenn User offensichtlich richtig eingegeben hat

### Token-Werte

```css
.input--success {
  border-color: var(--input-field-border-success);   /* color.success */
}

.input-icon--success {
  color: var(--input-success-color);                 /* color.success */
  width: 16px;
  height: 16px;
}
```

## Fehlermeldungen

### Stil: Erklaerend-Hilfsbereit

Fehlermeldungen muessen NICHT nur sagen "was ist falsch", sondern auch "wie kann es korrigiert werden".

**Struktur einer guten Fehlermeldung:**

1. **Was ist das Problem?** (z.B. "Die E-Mail-Adresse ist ungueltig")
2. **Wie beheben?** (z.B. "Bitte pruefe das Format")
3. **Beispiel (optional):** (z.B. "z.B. name@firma.de")

### Beispiele

| Schlecht | Gut |
|----------|-----|
| "Ungueltig" | "Bitte gib eine gueltige E-Mail-Adresse ein (z.B. name@firma.de)" |
| "Fehler" | "Das Passwort muss mindestens 8 Zeichen lang sein" |
| "Falsches Format" | "Bitte gib das Datum im Format TT.MM.JJJJ ein (z.B. 01.12.2024)" |
| "Pflichtfeld" | "Bitte gib deinen Namen ein" |
| "Die Eingabe ist zu kurz" | "Der Name muss mindestens 2 Zeichen haben" |
| "Nicht erlaubt" | "Das Passwort darf keine Leerzeichen enthalten" |
| "Fehlerhafte Eingabe" | "Die Telefonnummer muss mit + und Laendervorwahl beginnen (z.B. +49 123 456789)" |

### Ton

Fehlermeldungen sollten:

- **Hoeflich sein:** "Bitte gib..." statt "Du hast vergessen..."
- **Nicht anklagend sein:** "Die E-Mail-Adresse ist ungueltig" statt "Du hast eine ungueltige E-Mail eingegeben"
- **Aktive Sprache verwenden:** "Bitte gib..." statt "Es wurde nicht..."
- **Konkret sein:** "Mindestens 8 Zeichen" statt "Zu kurz"
- **Hilfreich sein:** Beispielwerte angeben wo sinnvoll

### Zod Schema Beispiele

```typescript
import { z } from 'zod';

const schema = z.object({
  name: z
    .string()
    .min(1, 'Bitte gib deinen Namen ein')
    .min(2, 'Der Name muss mindestens 2 Zeichen haben'),

  email: z
    .string()
    .min(1, 'E-Mail-Adresse ist erforderlich')
    .email('Bitte gib eine gueltige E-Mail-Adresse ein (z.B. name@firma.de)'),

  phone: z
    .string()
    .regex(
      /^\+[0-9]{1,3}\s[0-9\s]+$/,
      'Bitte gib die Telefonnummer mit Laendervorwahl ein (z.B. +49 123 456789)'
    ),

  password: z
    .string()
    .min(8, 'Das Passwort muss mindestens 8 Zeichen lang sein')
    .regex(/[A-Z]/, 'Das Passwort muss mindestens einen Grossbuchstaben enthalten')
    .regex(/[0-9]/, 'Das Passwort muss mindestens eine Zahl enthalten'),

  message: z
    .string()
    .min(1, 'Bitte gib eine Nachricht ein')
    .min(10, 'Die Nachricht muss mindestens 10 Zeichen haben')
    .max(500, 'Die Nachricht darf maximal 500 Zeichen haben'),

  birthdate: z
    .string()
    .regex(/^\d{2}\.\d{2}\.\d{4}$/, 'Bitte gib das Datum im Format TT.MM.JJJJ ein (z.B. 01.12.1990)')
});
```

## Error-Position

### Inline (Standard)

Fehlermeldungen stehen direkt UNTER dem fehlerhaften Feld:

```
[Label]
[Input Field] ← Roter Border
[Error Message] ← Direkt darunter
```

**Vorteile:**

- Sofort sichtbar im Kontext
- User sieht Fehler genau dort wo er ist
- Keine Navigation noetig

**Empfohlen fuer:**

- Einfache Formulare (1-5 Felder)
- Single-Page-Formulare
- Standard-Kontaktformulare

### Inline + Summary (Komplexe Formulare)

Bei komplexen Formularen (5+ Felder) zusaetzlich eine Error-Summary oben:

```
[Error Summary: 3 Fehler gefunden]
  - E-Mail-Adresse ungueltig
  - Passwort zu kurz
  - AGB nicht akzeptiert

[Formularfelder mit inline Errors]
```

**Vorteile:**

- Ueberblick ueber alle Fehler
- Links zu Feldern (schnelle Navigation)
- Focus springt zur Summary bei Submit

**Empfohlen fuer:**

- Formulare mit 5+ Feldern
- Multi-Step-Formulare
- Checkout-Prozesse

### Summary-Pattern

```html
<div class="error-summary" role="alert" tabindex="-1" id="error-summary">
  <h2 class="error-summary__title">Bitte korrigiere folgende Fehler:</h2>
  <ul class="error-summary__list">
    <li>
      <a href="#email">E-Mail-Adresse ist ungueltig</a>
    </li>
    <li>
      <a href="#password">Passwort zu kurz</a>
    </li>
    <li>
      <a href="#terms">Bitte akzeptiere die Nutzungsbedingungen</a>
    </li>
  </ul>
</div>
```

**Focus-Management:**

```typescript
const onSubmit = (data) => {
  // Validierung schlaegt fehl
  if (errors) {
    // Focus auf Error-Summary setzen
    document.getElementById('error-summary')?.focus();
  }
};
```

**Styling:**

```css
.error-summary {
  background-color: #fef2f2;              /* Helles Rot */
  border: 2px solid var(--color-error);   /* Rote Border */
  border-radius: 4px;
  padding: 16px;
  margin-bottom: 24px;
}

.error-summary__title {
  color: var(--color-error);
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 8px 0;
}

.error-summary__list {
  margin: 0;
  padding-left: 20px;
}

.error-summary__list a {
  color: var(--color-error);
  text-decoration: underline;
}

.error-summary__list a:hover {
  text-decoration: none;
}
```

## Accessibility

### WCAG 3.3.1: Fehlererkennung

**Anforderung:** Wenn ein Eingabefehler automatisch erkannt wird, wird das fehlerhafte Element identifiziert und der Fehler wird dem Benutzer in Textform beschrieben.

**Umsetzung:**

- Fehler werden automatisch erkannt (Progressive Validation)
- Fehlerhafte Felder werden visuell identifiziert (rote Border + Icon)
- Fehler werden programmatisch identifiziert (aria-invalid="true")
- Fehler werden in Textform beschrieben (Error-Message)

### WCAG 3.3.3: Fehlervorschlaege

**Anforderung:** Wenn ein Eingabefehler automatisch erkannt wird und Korrekturvorschlaege bekannt sind, werden diese dem Benutzer mitgeteilt, es sei denn, dies wuerde die Sicherheit oder den Zweck des Inhalts gefaehrden.

**Umsetzung:**

- Fehlermeldungen enthalten Korrekturvorschlaege
- Beispielwerte werden angegeben wo hilfreich
- Format-Anforderungen werden erklaert

### WCAG 3.3.4: Fehlervermeidung (Rechtliches, Finanzielles, Daten)

**Anforderung:** Fuer Web-Seiten, die rechtliche Verpflichtungen oder finanzielle Transaktionen mit dem Nutzer zur Folge haben, ist mindestens eine der folgenden Aussagen wahr:

1. **Rueckgaengig:** Uebertragungen sind rueckgaengig zu machen
2. **Ueberprueft:** Vom Benutzer eingegebene Daten werden auf Eingabefehler ueberprueft und der Benutzer erhaelt die Gelegenheit, diese zu korrigieren
3. **Bestaetigt:** Es gibt einen Mechanismus zur Ueberpruefung, Bestaetigung und Korrektur von Informationen, bevor die Uebertragung abgeschlossen wird

**Umsetzung fuer kritische Formulare:**

```html
<!-- Step 1: Dateneingabe mit Validierung -->
<form onsubmit="goToReview()">
  <!-- Formularfelder mit Progressive Validation -->
</form>

<!-- Step 2: Review & Bestaetigung -->
<div class="review-section">
  <h2>Bitte ueberpruefe deine Angaben</h2>

  <dl>
    <dt>Name:</dt>
    <dd>Max Mustermann</dd>

    <dt>E-Mail:</dt>
    <dd>max@firma.de</dd>
  </dl>

  <button onclick="goBack()">Zurueck zur Bearbeitung</button>
  <button onclick="submitFinal()">Jetzt kostenpflichtig bestellen</button>
</div>
```

### aria-invalid

`aria-invalid="true"` kennzeichnet fehlerhafte Felder fuer Screenreader:

```html
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

**Werte:**

- `aria-invalid="false"` - Feld ist gueltig (Standard, kann weggelassen werden)
- `aria-invalid="true"` - Feld ist ungueltig
- `aria-invalid="grammar"` - Grammatikfehler (selten verwendet)
- `aria-invalid="spelling"` - Rechtschreibfehler (selten verwendet)

### role="alert"

Error-Messages benoetigen `role="alert"`:

```html
<span id="email-error" class="error-message" role="alert">
  Bitte gib eine gueltige E-Mail-Adresse ein
</span>
```

**Warum wichtig?**

- `role="alert"` wird sofort von Screenreadern angekuendigt
- Impliziert `aria-live="assertive"` (unterbricht aktuelle Ausgabe)
- User bekommt sofortiges Feedback

### Focus-Management bei Submit

Wenn Submit fehlschlaegt:

1. **Bei Inline-Errors:** Focus auf erstes fehlerhaftes Feld
2. **Bei Error-Summary:** Focus auf Summary

```typescript
const onSubmit = async (data) => {
  // Validierung
  if (errors) {
    // Option 1: Focus auf erstes fehlerhaftes Feld
    const firstErrorField = document.querySelector('[aria-invalid="true"]');
    firstErrorField?.focus();

    // Option 2: Focus auf Error-Summary (wenn vorhanden)
    document.getElementById('error-summary')?.focus();
  }
};
```

**Error-Summary mit tabindex="-1":**

```html
<div class="error-summary" role="alert" tabindex="-1" id="error-summary">
  <!-- ... -->
</div>
```

`tabindex="-1"` ermoeglicht programmatischen Focus (JavaScript), aber nicht Tab-Navigation.

### Links in Summary fuehren zu Feldern

```html
<ul class="error-summary__list">
  <li>
    <a href="#email" onclick="document.getElementById('email').focus()">
      E-Mail-Adresse ist ungueltig
    </a>
  </li>
</ul>
```

## Formular-Level-Validierung

### Bei Submit

Wenn User auf Submit klickt:

1. **Alle Felder validieren** (auch wenn noch nicht touched)
2. **Alle Fehler gleichzeitig anzeigen** (nicht schrittweise)
3. **Focus auf ersten Fehler oder Summary**
4. **Submit verhindern** bis alle Fehler korrigiert

```typescript
const handleSubmit = async (e) => {
  e.preventDefault();

  // Validierung triggern
  const isValid = await form.trigger();

  if (!isValid) {
    // Focus Management
    const firstError = Object.keys(form.formState.errors)[0];
    form.setFocus(firstError);
    return;
  }

  // Submit durchfuehren
  await submitData(form.getValues());
};
```

### Submit-Button-Zustand

**NICHT deaktivieren basierend auf Validierung:**

```html
<!-- FALSCH -->
<button type="submit" disabled={!isValid}>
  Absenden
</button>
```

**Warum nicht?**

- User weiss nicht WARUM Button deaktiviert ist
- Keine Feedback, welche Felder fehlerhaft sind
- Frustrierend wenn Button nicht klickbar ist

**RICHTIG: Immer klickbar lassen:**

```html
<!-- RICHTIG -->
<button type="submit">
  Absenden
</button>
```

Validierung erfolgt bei Klick, User bekommt klare Fehler-Messages.

**AUSNAHME: Deaktivieren waehrend Submission:**

```html
<button type="submit" disabled={isSubmitting}>
  {isSubmitting ? 'Wird gesendet...' : 'Absenden'}
</button>
```

Verhindert Doppel-Submission.

## Vollstaendiges Integrations-Beispiel

Das folgende Beispiel zeigt alle Teile zusammen: Token-Referenzen, React Hook Form, Zod Schema, ARIA-Attribute und visuelles Styling.

### Schema (Zod)

```typescript
import { z } from 'zod';

const contactSchema = z.object({
  name: z
    .string()
    .min(1, 'Bitte gib deinen Namen ein')
    .min(2, 'Der Name muss mindestens 2 Zeichen haben'),

  email: z
    .string()
    .min(1, 'E-Mail-Adresse ist erforderlich')
    .email('Bitte gib eine gueltige E-Mail-Adresse ein (z.B. name@firma.de)'),

  phone: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^\+[0-9]{1,3}\s[0-9\s]+$/.test(val),
      'Bitte gib die Telefonnummer mit Laendervorwahl ein (z.B. +49 123 456789)'
    ),

  message: z
    .string()
    .min(1, 'Bitte gib eine Nachricht ein')
    .min(10, 'Die Nachricht muss mindestens 10 Zeichen haben')
    .max(500, 'Die Nachricht darf maximal 500 Zeichen haben'),

  terms: z
    .boolean()
    .refine((val) => val === true, 'Bitte akzeptiere die Nutzungsbedingungen')
});

type ContactFormData = z.infer<typeof contactSchema>;
```

### React Component

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, Check } from 'lucide-react';

function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, touchedFields }
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: 'onBlur',           // Initiale Validierung bei blur
    reValidateMode: 'onChange' // Nach Fehler: live re-validieren
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      // API-Call
      await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify(data)
      });

      // Success-Handling
      alert('Nachricht gesendet!');
    } catch (error) {
      // Error-Handling
      console.error('Fehler beim Senden:', error);
    }
  };

  // Helper: Zeige Success-State nur wenn touched + valid + kein Error
  const showSuccess = (fieldName: keyof ContactFormData) => {
    return touchedFields[fieldName] && !errors[fieldName];
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* Error Summary (optional, bei komplexen Formularen) */}
      {Object.keys(errors).length > 0 && (
        <div className="error-summary" role="alert" tabindex="-1">
          <h2 className="error-summary__title">
            Bitte korrigiere folgende Fehler:
          </h2>
          <ul className="error-summary__list">
            {errors.name && (
              <li>
                <a href="#name">{errors.name.message}</a>
              </li>
            )}
            {errors.email && (
              <li>
                <a href="#email">{errors.email.message}</a>
              </li>
            )}
            {errors.phone && (
              <li>
                <a href="#phone">{errors.phone.message}</a>
              </li>
            )}
            {errors.message && (
              <li>
                <a href="#message">{errors.message.message}</a>
              </li>
            )}
            {errors.terms && (
              <li>
                <a href="#terms">{errors.terms.message}</a>
              </li>
            )}
          </ul>
        </div>
      )}

      {/* Name Field */}
      <div className={`form-field ${errors.name ? 'form-field--error' : ''}`}>
        <label htmlFor="name" className={errors.name ? 'error' : ''}>
          Name
          <span className="required" aria-label="Pflichtfeld">*</span>
        </label>
        <div className="input-wrapper">
          <input
            id="name"
            type="text"
            className={errors.name ? 'input--error' : ''}
            aria-required="true"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
            {...register('name')}
          />
          {errors.name && (
            <AlertCircle className="input-icon input-icon--error" aria-hidden="true" />
          )}
        </div>
        {errors.name && (
          <span id="name-error" className="error-message" role="alert">
            {errors.name.message}
          </span>
        )}
      </div>

      {/* Email Field with Success State */}
      <div className={`form-field ${errors.email ? 'form-field--error' : showSuccess('email') ? 'form-field--success' : ''}`}>
        <label htmlFor="email" className={errors.email ? 'error' : ''}>
          E-Mail-Adresse
          <span className="required" aria-label="Pflichtfeld">*</span>
        </label>
        <div className="input-wrapper">
          <input
            id="email"
            type="email"
            className={errors.email ? 'input--error' : showSuccess('email') ? 'input--success' : ''}
            aria-required="true"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : 'email-helper'}
            {...register('email')}
          />
          {errors.email && (
            <AlertCircle className="input-icon input-icon--error" aria-hidden="true" />
          )}
          {showSuccess('email') && (
            <Check className="input-icon input-icon--success" aria-hidden="true" />
          )}
        </div>
        {!errors.email && (
          <span id="email-helper" className="helper-text">
            Wir verwenden deine E-Mail nur zur Kontaktaufnahme
          </span>
        )}
        {errors.email && (
          <span id="email-error" className="error-message" role="alert">
            {errors.email.message}
          </span>
        )}
      </div>

      {/* Phone Field (Optional) */}
      <div className={`form-field ${errors.phone ? 'form-field--error' : ''}`}>
        <label htmlFor="phone">
          Telefonnummer
          <span className="optional">(optional)</span>
        </label>
        <div className="input-wrapper">
          <input
            id="phone"
            type="tel"
            placeholder="+49 123 456789"
            className={errors.phone ? 'input--error' : ''}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? 'phone-error' : 'phone-helper'}
            {...register('phone')}
          />
          {errors.phone && (
            <AlertCircle className="input-icon input-icon--error" aria-hidden="true" />
          )}
        </div>
        {!errors.phone && (
          <span id="phone-helper" className="helper-text">
            Bitte mit Laendervorwahl
          </span>
        )}
        {errors.phone && (
          <span id="phone-error" className="error-message" role="alert">
            {errors.phone.message}
          </span>
        )}
      </div>

      {/* Message Field (Textarea) */}
      <div className={`form-field ${errors.message ? 'form-field--error' : ''}`}>
        <label htmlFor="message" className={errors.message ? 'error' : ''}>
          Nachricht
          <span className="required" aria-label="Pflichtfeld">*</span>
        </label>
        <textarea
          id="message"
          rows={5}
          className={errors.message ? 'input--error' : ''}
          aria-required="true"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : 'message-helper'}
          {...register('message')}
        />
        {!errors.message && (
          <span id="message-helper" className="helper-text">
            Mindestens 10 Zeichen, maximal 500 Zeichen
          </span>
        )}
        {errors.message && (
          <span id="message-error" className="error-message" role="alert">
            {errors.message.message}
          </span>
        )}
      </div>

      {/* Terms Checkbox */}
      <div className={`form-field ${errors.terms ? 'form-field--error' : ''}`}>
        <label className="checkbox-label">
          <input
            type="checkbox"
            id="terms"
            className="checkbox-native"
            aria-required="true"
            aria-invalid={!!errors.terms}
            {...register('terms')}
          />
          <span className="checkbox-custom"></span>
          Ich akzeptiere die{' '}
          <a href="/terms" target="_blank">Nutzungsbedingungen</a>
          <span className="required" aria-label="Pflichtfeld">*</span>
        </label>
        {errors.terms && (
          <span className="error-message" role="alert">
            {errors.terms.message}
          </span>
        )}
      </div>

      {/* Submit Button */}
      <button type="submit" disabled={isSubmitting} className="button button--primary">
        {isSubmitting ? 'Wird gesendet...' : 'Absenden'}
      </button>
    </form>
  );
}

export default ContactForm;
```

### CSS mit Token-Variablen

```css
/* Form Field Container */
.form-field {
  margin-bottom: var(--form-spacing-field-to-field); /* 16px */
}

.form-field--error label {
  color: var(--input-label-color-error); /* color.error */
}

/* Labels */
.form-field label {
  display: block;
  font-size: var(--input-label-font-size);       /* 14px */
  font-weight: var(--input-label-font-weight);   /* 500 */
  color: var(--input-label-color-default);       /* neutral.700 */
  margin-bottom: var(--input-label-margin-bottom); /* 8px */
}

.required {
  color: var(--input-required-color);            /* error */
  margin-left: 2px;
}

.optional {
  color: var(--neutral-500);
  font-weight: 400;
  margin-left: 4px;
}

/* Input Wrapper (for icon positioning) */
.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

/* Input Fields */
.form-field input[type="text"],
.form-field input[type="email"],
.form-field input[type="tel"],
.form-field textarea {
  width: 100%;
  height: var(--input-height-md);                /* 40px */
  padding: 0 var(--input-padding-x-md);          /* 12px */
  border: var(--input-field-border-width-default) solid var(--input-field-border-default);
  border-radius: var(--input-base-border-radius); /* 4px */
  font-size: var(--input-font-size-md);          /* 16px */
  font-family: var(--input-base-font-family);    /* Inter */
  color: var(--input-field-text-default);        /* neutral.900 */
  background-color: var(--input-field-background-default); /* white */
  transition: var(--input-base-transition);      /* 150ms ease-in-out */
}

.form-field textarea {
  height: auto;
  min-height: var(--input-textarea-min-height);  /* 120px */
  padding: var(--input-padding-x-md);            /* 12px */
  resize: var(--input-textarea-resize);          /* vertical */
}

/* Input with icon - add padding for icon space */
.input-wrapper input {
  padding-right: 40px;
}

/* Input States: Hover */
.form-field input:hover,
.form-field textarea:hover {
  border-color: var(--input-field-border-hover); /* neutral.400 */
}

/* Input States: Focus */
.form-field input:focus-visible,
.form-field textarea:focus-visible {
  border-color: var(--input-field-border-focus); /* hydrophon.blau.500 */
  border-width: var(--input-field-border-width-focus); /* 2px */
  outline: var(--input-focus-ring-width) solid var(--input-focus-ring-color);
  outline-offset: var(--input-focus-outline-offset); /* 0px */
}

/* Input States: Error */
.input--error {
  border-color: var(--input-field-border-error) !important; /* error */
}

/* Input States: Success */
.input--success {
  border-color: var(--input-field-border-success) !important; /* success */
}

/* Input States: Disabled */
.form-field input:disabled,
.form-field textarea:disabled {
  background-color: var(--input-field-background-disabled); /* neutral.50 */
  border-color: var(--input-field-border-disabled); /* neutral.200 */
  color: var(--input-field-text-disabled);       /* neutral.600 */
  cursor: not-allowed;
}

/* Input Icons */
.input-icon {
  position: absolute;
  right: 12px;
  width: 16px;
  height: 16px;
  pointer-events: none;
}

.input-icon--error {
  color: var(--input-error-color);               /* error */
}

.input-icon--success {
  color: var(--input-success-color);             /* success */
}

/* Helper Text */
.helper-text {
  display: block;
  font-size: var(--input-helper-font-size);      /* 12px */
  color: var(--input-helper-color);              /* neutral.600 */
  margin-top: var(--input-helper-margin-top);    /* 4px */
  line-height: 1.4;
}

/* Error Message */
.error-message {
  display: block;
  font-size: var(--input-error-font-size);       /* 12px */
  color: var(--input-error-color);               /* error */
  margin-top: var(--input-error-margin-top);     /* 4px */
  line-height: 1.4;
}

/* Error Summary */
.error-summary {
  background-color: #fef2f2;
  border: 2px solid var(--color-error);
  border-radius: 4px;
  padding: 16px;
  margin-bottom: 24px;
}

.error-summary__title {
  color: var(--color-error);
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 8px 0;
}

.error-summary__list {
  margin: 0;
  padding-left: 20px;
}

.error-summary__list a {
  color: var(--color-error);
  text-decoration: underline;
}

.error-summary__list a:hover {
  text-decoration: none;
}

/* Checkbox Styling (Native-First) */
.checkbox-label {
  display: flex;
  align-items: flex-start;
  gap: var(--checkbox-label-gap);                /* 8px */
  cursor: pointer;
}

.checkbox-native {
  position: absolute;
  opacity: 0;
  width: var(--checkbox-size-default);           /* 20px */
  height: var(--checkbox-size-default);          /* 20px */
}

.checkbox-custom {
  display: inline-block;
  width: var(--checkbox-size-default);           /* 20px */
  height: var(--checkbox-size-default);          /* 20px */
  border: var(--checkbox-border-width) solid var(--checkbox-border-default);
  border-radius: var(--checkbox-border-radius);  /* 4px */
  background-color: var(--checkbox-background-default);
  position: relative;
  flex-shrink: 0;
  margin-top: 2px; /* Optical alignment with text */
}

.checkbox-native:checked + .checkbox-custom {
  background-color: var(--checkbox-background-checked);
  border-color: var(--checkbox-border-checked);
}

.checkbox-native:checked + .checkbox-custom::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: var(--checkbox-icon-size);              /* 14px */
  height: var(--checkbox-icon-size);
  /* Check icon as background-image or inline SVG */
  background-image: url("data:image/svg+xml,...");
}

/* Submit Button */
.button {
  height: var(--input-height-md);                /* 40px - aligned with inputs */
  padding: 0 var(--button-padding-x-md);
  border-radius: var(--input-base-border-radius); /* 4px */
  font-size: var(--input-font-size-md);          /* 16px */
  font-weight: 500;
  cursor: pointer;
  transition: var(--input-base-transition);
}

.button--primary {
  background-color: var(--color-action-primary-default);
  color: white;
  border: none;
}

.button--primary:hover:not(:disabled) {
  background-color: var(--color-action-primary-hover);
}

.button--primary:disabled {
  background-color: var(--neutral-300);
  cursor: not-allowed;
  opacity: 0.6;
}
```

## Design Tokens

Alle Design Tokens fuer Validierung und Error States:

| Token | Wert | Verwendung |
|-------|------|------------|
| `input.field.border.error` | color.error | Input Border im Error-State |
| `input.field.border.success` | color.success | Input Border im Success-State |
| `input.field.background.error` | neutral.white | Input Hintergrund Error (bleibt weiss) |
| `input.field.background.success` | neutral.white | Input Hintergrund Success (bleibt weiss) |
| `input.error.color` | color.error | Error Message Textfarbe |
| `input.error.fontSize` | 12px | Error Message Schriftgroesse |
| `input.error.marginTop` | 4px | Abstand Input → Error Message |
| `input.success.color` | color.success | Success Icon/Text Farbe |
| `input.label.color.error` | color.error | Label Farbe im Error-State |

## Anti-Patterns

### Vermeiden

**1. Fehlermeldungen erst bei Submit (zu spaet)**

```typescript
// FALSCH
const form = useForm({
  mode: 'onSubmit' // User sieht Fehler erst am Ende
});
```

**Warum?** Bei komplexen Formularen sieht User alle Fehler auf einmal, muss alles korrigieren, hohe Abbruchrate.

**2. Validierung bei jedem Tastendruck von Anfang an (zu frueh)**

```typescript
// FALSCH
const form = useForm({
  mode: 'onChange' // "E-Mail ungueltig" nach dem ersten Buchstaben
});
```

**Warum?** Frustrierend, User kann nicht in Ruhe tippen, lenkt von Eingabe ab.

**3. Generische Meldungen wie "Fehler" oder "Ungueltig"**

```html
<!-- FALSCH -->
<span class="error-message">Fehler</span>

<!-- RICHTIG -->
<span class="error-message">
  Bitte gib eine gueltige E-Mail-Adresse ein (z.B. name@firma.de)
</span>
```

**Warum?** User weiss nicht, WAS falsch ist oder WIE es zu korrigieren ist.

**4. Submit-Button deaktivieren statt Feedback geben**

```html
<!-- FALSCH -->
<button type="submit" disabled={!isValid}>
  Absenden
</button>
```

**Warum?** User weiss nicht, warum Button deaktiviert ist, keine Hilfestellung.

**5. Nur rote Farbe als Fehlerindikator**

```html
<!-- FALSCH - nur Farbe -->
<input style="border-color: red;" />

<!-- RICHTIG - Farbe + Icon + Text -->
<input class="input--error" aria-invalid="true" aria-describedby="error" />
<AlertCircle aria-hidden="true" />
<span id="error" role="alert">Fehlermeldung</span>
```

**Warum?** WCAG 1.4.1 - Farbenblinde User sehen keinen Unterschied.

**6. Error-Meldungen die verschwinden nach kurzer Zeit**

```javascript
// FALSCH
setTimeout(() => {
  setErrorMessage('');
}, 3000); // Fehler verschwindet nach 3 Sekunden
```

**Warum?** User hat vielleicht nicht genug Zeit zum Lesen, Screenreader-User verpasst die Meldung komplett.

---

**Siehe auch:**

- [Labels und Helper Text](./labels-helper-text.md)
- [Text Input Dokumentation](./text-input.md)
- [Checkbox Dokumentation](./checkbox.md)
- [Radio Button Dokumentation](./radio-button.md)
