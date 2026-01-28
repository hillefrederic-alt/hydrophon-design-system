# Buttons

Buttons ermöglichen Nutzer*innen, Aktionen auszulösen und wichtige Entscheidungen zu treffen. Das Hydrophon Button-System nutzt eine klare visuelle Hierarchie, um die Wichtigkeit von Aktionen zu kommunizieren.

**Anforderungen:** BTN-01 (Primary Button), BTN-02 (Secondary Button), BTN-03 (Tertiary Button), BTN-04 (Button-Größen), BTN-05 (Icon-Buttons)

---

## Übersicht

Das Button-System verwendet drei Varianten mit abnehmender visueller Gewichtung:

**Button-Hierarchie:**
1. **Primary Button** — Höchste Priorität, eine Hauptaktion pro Bereich
2. **Secondary Button** — Alternative Aktionen, gleichrangig untereinander
3. **Tertiary/Ghost Button** — Niedrigste Priorität, konkurriert nicht um Aufmerksamkeit

**Wann welche Variante:**

- **Primary:** Die wichtigste Aktion im aktuellen Kontext (z.B. "Speichern", "Absenden", "Kaufen")
- **Secondary:** Alternative oder zusätzliche Aktionen (z.B. "Abbrechen", "Zurück", "Mehr erfahren")
- **Tertiary:** Optionale Aktionen mit niedrigster Priorität (z.B. "Überspringen", "Später", "Details ein-/ausblenden")

**Grundregel:** Maximal ein Primary Button pro Ansicht oder Abschnitt. Multiple Secondary Buttons sind erlaubt, sofern sie gleichrangige Alternativen darstellen.

---

## Button-Varianten

### Primary Button (BTN-01)

**Visueller Stil:**
- Gefüllter Hintergrund in Hydrophon Blau (#008BD2)
- Weißer Text für maximalen Kontrast
- Kein sichtbarer Rahmen (transparent)
- Dezenter Farbwechsel bei Interaktion (keine Größenänderung)

**Verwendungszweck:**
Die wichtigste Aktion im aktuellen Kontext. Primary Buttons signalisieren den empfohlenen oder erwarteten nächsten Schritt.

**Beispiele:**
- Formular absenden ("Speichern", "Senden")
- Kaufentscheidung bestätigen ("Jetzt kaufen", "In den Warenkorb")
- Workflow fortsetzen ("Weiter", "Abschließen")

**Verwendungsregel:**
Nur ein Primary Button pro Ansicht oder logischem Abschnitt. Bei mehreren wichtigen Aktionen Priorität festlegen und andere als Secondary kennzeichnen.

#### Zustände (Primary Button)

| Zustand  | Hintergrund          | Text         | Rahmen                        | Token                                      |
|----------|---------------------|--------------|-------------------------------|--------------------------------------------|
| Default  | hydrophon.blau.500  | Weiß         | transparent                   | `button.primary.background.default`        |
| Hover    | hydrophon.blau.600  | Weiß         | transparent                   | `button.primary.background.hover`          |
| Active   | hydrophon.blau.700  | Weiß         | transparent                   | `button.primary.background.active`         |
| Focus    | hydrophon.blau.500  | Weiß         | 2px Ring blau.300, 2px Offset | `button.focus.outlineColor`                |
| Disabled | neutral.200         | neutral.400  | transparent                   | `button.primary.background.disabled`       |

**CSS-Beispiel:**

```css
.button--primary {
  background-color: var(--button-primary-background-default);
  color: var(--button-primary-foreground-default);
  border: none;
}

.button--primary:hover:not(:disabled) {
  background-color: var(--button-primary-background-hover);
}

.button--primary:active:not(:disabled) {
  background-color: var(--button-primary-background-active);
}

.button--primary:focus-visible {
  outline: var(--button-focus-outline-width) solid var(--button-focus-outline-color);
  outline-offset: var(--button-focus-outline-offset);
}

.button--primary:disabled {
  background-color: var(--button-primary-background-disabled);
  color: var(--button-primary-foreground-disabled);
  cursor: not-allowed;
}
```

---

### Secondary Button (BTN-02)

**Visueller Stil:**
- Transparenter Hintergrund (Outline-Stil)
- Rahmen und Text in Hydrophon Blau (#008BD2)
- Subtile Hintergrundfarbe bei Hover
- Gleiche Rahmenbreite wie Primary (2px)

**Verwendungszweck:**
Alternative Aktionen, die gleichrangig zu anderen Secondary Buttons sind. Secondary Buttons bieten Optionen, ohne die Aufmerksamkeit vom Primary Button abzulenken.

**Beispiele:**
- Abbrechen oder Zurück ("Abbrechen", "Zurück zur Übersicht")
- Zusätzliche Informationen ("Mehr erfahren", "Details anzeigen")
- Alternative Workflows ("Als Entwurf speichern")

**Verwendungsregel:**
Mehrere Secondary Buttons sind erlaubt, wenn sie gleichrangige Alternativen darstellen. Immer in Kombination mit einem Primary Button verwenden, um klare Hierarchie zu etablieren.

#### Zustände (Secondary Button)

| Zustand  | Hintergrund          | Text                | Rahmen                        | Token                                      |
|----------|---------------------|---------------------|-------------------------------|--------------------------------------------|
| Default  | transparent         | hydrophon.blau.500  | 2px hydrophon.blau.500        | `button.secondary.border.default`          |
| Hover    | hydrophon.blau.50   | hydrophon.blau.600  | 2px hydrophon.blau.600        | `button.secondary.background.hover`        |
| Active   | hydrophon.blau.100  | hydrophon.blau.600  | 2px hydrophon.blau.600        | `button.secondary.background.active`       |
| Focus    | transparent         | hydrophon.blau.500  | 2px Ring blau.300, 2px Offset | `button.focus.outlineColor`                |
| Disabled | transparent         | neutral.400         | 2px neutral.300               | `button.secondary.border.disabled`         |

**CSS-Beispiel:**

```css
.button--secondary {
  background-color: var(--button-secondary-background-default);
  color: var(--button-secondary-foreground-default);
  border: var(--button-border-width) solid var(--button-secondary-border-default);
}

.button--secondary:hover:not(:disabled) {
  background-color: var(--button-secondary-background-hover);
  color: var(--button-secondary-foreground-hover);
  border-color: var(--button-secondary-border-hover);
}

.button--secondary:active:not(:disabled) {
  background-color: var(--button-secondary-background-active);
}

.button--secondary:focus-visible {
  outline: var(--button-focus-outline-width) solid var(--button-focus-outline-color);
  outline-offset: var(--button-focus-outline-offset);
}

.button--secondary:disabled {
  color: var(--button-secondary-foreground-disabled);
  border-color: var(--button-secondary-border-disabled);
  cursor: not-allowed;
}
```

---

### Tertiary/Ghost Button (BTN-03)

**Visueller Stil:**
- Kein Hintergrund, kein Rahmen (nur Text)
- Text in Hydrophon Blau (#008BD2)
- Sehr subtiler Hintergrund bei Hover (neutral.100)
- Minimale visuelle Gewichtung

**Verwendungszweck:**
Optionale Aktionen mit niedrigster Priorität, die nicht um Aufmerksamkeit konkurrieren sollen. Tertiary Buttons sind unauffällig und werden oft für sekundäre Navigation oder Toggle-Funktionen verwendet.

**Beispiele:**
- Optionale Schritte überspringen ("Überspringen", "Später erinnern")
- Details ein-/ausklappen ("Details einblenden", "Weniger anzeigen")
- Sekundäre Navigation ("Zu den FAQs", "Hilfe anzeigen")

**Verwendungsregel:**
Sparsam einsetzen. Nur für Aktionen, die nicht im Fokus stehen sollen. Nicht für wichtige oder häufig benötigte Aktionen verwenden.

#### Zustände (Tertiary/Ghost Button)

| Zustand  | Hintergrund     | Text                | Rahmen                        | Token                                      |
|----------|-----------------|---------------------|-------------------------------|--------------------------------------------|
| Default  | transparent     | hydrophon.blau.500  | transparent                   | `button.tertiary.foreground.default`       |
| Hover    | neutral.100     | hydrophon.blau.600  | transparent                   | `button.tertiary.background.hover`         |
| Active   | neutral.200     | hydrophon.blau.600  | transparent                   | `button.tertiary.background.active`        |
| Focus    | transparent     | hydrophon.blau.500  | 2px Ring blau.300, 2px Offset | `button.focus.outlineColor`                |
| Disabled | transparent     | neutral.400         | transparent                   | `button.tertiary.foreground.disabled`      |

**CSS-Beispiel:**

```css
.button--tertiary {
  background-color: var(--button-tertiary-background-default);
  color: var(--button-tertiary-foreground-default);
  border: none;
}

.button--tertiary:hover:not(:disabled) {
  background-color: var(--button-tertiary-background-hover);
  color: var(--button-tertiary-foreground-hover);
}

.button--tertiary:active:not(:disabled) {
  background-color: var(--button-tertiary-background-active);
}

.button--tertiary:focus-visible {
  outline: var(--button-focus-outline-width) solid var(--button-focus-outline-color);
  outline-offset: var(--button-focus-outline-offset);
}

.button--tertiary:disabled {
  color: var(--button-tertiary-foreground-disabled);
  cursor: not-allowed;
}
```

---

## Button-Größen (BTN-04)

Das System bietet drei Button-Größen für unterschiedliche Anwendungsfälle:

| Größe  | Höhe | Padding      | Schriftgröße | Icon-Größe | Anwendung                                  |
|--------|------|--------------|--------------|------------|--------------------------------------------|
| Small  | 32px | 6px 12px     | 14px         | 16px       | Kompakte UIs, Tabellen, Toolbar            |
| Medium | 40px | 8px 16px     | 16px         | 20px       | Standard, Formulare, Dialoge               |
| Large  | 48px | 12px 24px    | 18px         | 20px       | Hero CTAs, Marketing-Seiten, Landingpages  |

### Small (32px)

**Verwendung:** Kompakte Benutzeroberflächen, Tabellen-Aktionen, Toolbar-Buttons.

**Touch-Target-Hinweis:** Small Buttons (32px) erfüllen nicht die WCAG 2.1 Empfehlung von 44x44px Touch-Targets. Nur auf Desktop-Ansichten verwenden, auf mobilen Geräten Medium oder Large bevorzugen.

**Tokens:**
- `button.size.small.minHeight`: 32px
- `button.size.small.paddingX`: 12px
- `button.size.small.paddingY`: 6px
- `button.size.small.fontSize`: 14px
- `button.size.small.iconSize`: 16px
- `button.size.small.gap`: 6px

### Medium (40px) – Standard

**Verwendung:** Standard-Größe für die meisten Anwendungsfälle. Formulare, Dialoge, modale Fenster, Standard-Navigation.

**Touch-Target:** Medium Buttons (40px) kommen der WCAG-Empfehlung nahe, mit ausreichend Abstand zu benachbarten Elementen erfüllen sie die Anforderungen.

**Tokens:**
- `button.size.medium.minHeight`: 40px
- `button.size.medium.paddingX`: 16px
- `button.size.medium.paddingY`: 8px
- `button.size.medium.fontSize`: 16px
- `button.size.medium.iconSize`: 20px
- `button.size.medium.gap`: 8px

### Large (48px)

**Verwendung:** Hero-Bereiche, Call-to-Actions auf Landingpages, Marketing-Seiten, wichtige primäre Aktionen.

**Touch-Target:** Large Buttons (48px) übertreffen die WCAG-Empfehlung und sind für alle Geräte geeignet.

**Tokens:**
- `button.size.large.minHeight`: 48px
- `button.size.large.paddingX`: 24px
- `button.size.large.paddingY`: 12px
- `button.size.large.fontSize`: 18px
- `button.size.large.iconSize`: 20px
- `button.size.large.gap`: 8px

---

## Icon-Buttons (BTN-05)

Icons können Buttons zusätzlichen Kontext geben oder als alleiniges visuelles Element dienen.

### Icon + Text Buttons

Icons in Kombination mit Text erhöhen die Erkennbarkeit und können Aktionen verdeutlichen.

**Icon-Position:**
- **Links (Standard):** Icon vor dem Text für Aktionen wie "Herunterladen", "Hinzufügen"
- **Rechts:** Icon nach dem Text für Navigations-Aktionen wie "Weiter", "Externe Links"

**Icon-Größe:**
Die Icon-Größe passt sich automatisch an die Button-Größe an:
- Small Button (32px): Icon 16px (`icon.size.xs`)
- Medium Button (40px): Icon 20px (`icon.size.sm`)
- Large Button (48px): Icon 20px (`icon.size.sm`)

**Abstand:**
- Small Button: 6px zwischen Icon und Text (`spacing.1.5`)
- Medium/Large Button: 8px zwischen Icon und Text (`spacing.2`)

**Icon-Farbe:**
Icons verwenden `currentColor`, um automatisch die Textfarbe zu übernehmen. Keine separate Farbdefinition notwendig.

**HTML-Beispiel (Icon links):**

```html
<button class="button button--primary button--medium">
  <svg class="icon icon--sm" aria-hidden="true" width="20" height="20">
    <use href="#icon-check"></use>
  </svg>
  <span>Speichern</span>
</button>
```

**HTML-Beispiel (Icon rechts):**

```html
<button class="button button--secondary button--medium">
  <span>Mehr erfahren</span>
  <svg class="icon icon--sm" aria-hidden="true" width="20" height="20">
    <use href="#icon-arrow-right"></use>
  </svg>
</button>
```

**CSS für Icon + Text Layout:**

```css
.button {
  display: inline-flex;
  align-items: center;
  gap: var(--button-size-medium-gap); /* 8px für Medium */
}

.button--small {
  gap: var(--button-size-small-gap); /* 6px für Small */
}

.button .icon {
  color: currentColor; /* Automatische Farbvererbung */
}
```

### Icon-Only Buttons

Buttons, die nur ein Icon ohne Text enthalten, eignen sich für wiedererkennbare Aktionen in kompakten UIs.

**Wichtig: Barrierefreiheit**
Icon-Only Buttons **müssen** ein `aria-label` Attribut enthalten, um für Screenreader verständlich zu sein.

**Touch-Target-Anforderungen:**
- **Small (32px):** Nur auf Desktop mit ausreichend Abstand zu anderen Elementen
- **Medium (44px):** Erfüllt WCAG 2.1 AAA Touch-Target-Empfehlung (44x44px)
- **Large (48px):** Für große Hero-Bereiche oder wichtige CTAs

**Icon-Only Button-Dimensionen:**
| Größe  | Button-Größe | Icon-Größe | Touch-Target | Token                              |
|--------|-------------|------------|--------------|-------------------------------------|
| Small  | 32x32px     | 20px (sm)  | Desktop only | `button.iconOnly.small.size`        |
| Medium | 44x44px     | 24px (md)  | WCAG AAA     | `button.iconOnly.medium.size`       |
| Large  | 48x48px     | 24px (md)  | WCAG AAA     | `button.iconOnly.large.size`        |

**HTML-Beispiel:**

```html
<!-- Medium Icon-Only Button (empfohlen für mobile) -->
<button class="button button--secondary button--icon-only button--medium"
        aria-label="Menü öffnen">
  <svg class="icon icon--md" aria-hidden="true" width="24" height="24">
    <use href="#icon-menu"></use>
  </svg>
</button>

<!-- Small Icon-Only Button (nur Desktop) -->
<button class="button button--tertiary button--icon-only button--small"
        aria-label="Schließen">
  <svg class="icon icon--sm" aria-hidden="true" width="20" height="20">
    <use href="#icon-x"></use>
  </svg>
</button>
```

**CSS für Icon-Only Buttons:**

```css
.button--icon-only {
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.button--icon-only.button--small {
  width: var(--button-icon-only-small-size); /* 32px */
  height: var(--button-icon-only-small-size);
}

.button--icon-only.button--medium {
  width: var(--button-icon-only-medium-size); /* 44px */
  height: var(--button-icon-only-medium-size);
}

.button--icon-only.button--large {
  width: var(--button-icon-only-large-size); /* 48px */
  height: var(--button-icon-only-large-size);
}
```

---

## Barrierefreiheit (WCAG 2.1 AA)

### Focus-Indikatoren

Alle Buttons müssen einen sichtbaren Focus-Indikator haben, der den WCAG 2.2 Standard "Focus Appearance" erfüllt.

**Anforderungen:**
- Mindestens 2px Outline-Breite
- Mindestens 2px Abstand (Offset) zum Button
- Kontrast von mindestens 3:1 zwischen Focus-Zustand und Unfokussiert

**Tokens:**
- `button.focus.outlineWidth`: 2px
- `button.focus.outlineOffset`: 2px
- `button.focus.outlineColor`: hydrophon.blau.300

**CSS-Implementierung:**

```css
.button:focus-visible {
  outline: var(--button-focus-outline-width) solid var(--button-focus-outline-color);
  outline-offset: var(--button-focus-outline-offset);
}

/* Niemals Focus-Indikatoren entfernen */
.button:focus {
  /* Fokus-Styles MÜSSEN vorhanden sein */
}
```

**Wichtig:** Verwenden Sie `:focus-visible` für moderne Browser, um Focus-Indikatoren nur bei Tastatur-Navigation anzuzeigen. Niemals `:focus { outline: none; }` verwenden.

### Disabled-Zustände

Deaktivierte Buttons sollten das `disabled` Attribut verwenden, nicht `aria-disabled`.

**Grund:** Das `disabled` Attribut entfernt Buttons aus der Tab-Reihenfolge und verhindert Interaktionen nativ. `aria-disabled` erfordert zusätzliches JavaScript, um Interaktionen zu blockieren.

**HTML:**

```html
<!-- Richtig -->
<button class="button button--primary" disabled>Speichern</button>

<!-- Falsch -->
<button class="button button--primary" aria-disabled="true">Speichern</button>
```

**Kontrast:**
Deaktivierte Buttons sind von WCAG-Kontrast-Anforderungen ausgenommen. Die Token-Werte für Disabled-Zustände (`neutral.200`, `neutral.400`) erfüllen jedoch 3:1 Kontrast für bessere Lesbarkeit.

**Best Practice:**
Erwägen Sie, deaktivierte Buttons vollständig auszublenden, wenn die Aktion niemals möglich ist. Zeigen Sie deaktivierte Buttons nur, wenn der Nutzer die Bedingungen für die Aktivierung verstehen muss.

### Keyboard-Navigation

Alle Buttons müssen über die Tastatur erreichbar und bedienbar sein.

**Anforderungen:**
- Fokussierbar über Tab-Taste
- Aktivierbar über Enter oder Leerzeichen
- Fokus-Reihenfolge folgt visueller Reihenfolge

**Standard-Button-Element:**
Das native `<button>` Element erfüllt alle Keyboard-Anforderungen automatisch. Keine zusätzlichen ARIA-Attribute notwendig.

**Vermeiden:**
- `<div>` oder `<span>` als Button (erfordert `role="button"`, `tabindex="0"`, und JavaScript für Keyboard-Events)
- Links (`<a>`) als Buttons (Links navigieren, Buttons führen Aktionen aus)

### Touch-Targets

**WCAG 2.1 AAA Empfehlung:** Mindestens 44x44px Touch-Target-Größe für mobile Geräte.

**Button-Größen und Touch-Targets:**
- **Small (32px):** Nicht WCAG-konform, nur Desktop mit ausreichend Abstand (WCAG 2.2 erlaubt 24px mit Spacing-Ausnahme)
- **Medium (40px):** Nahe an WCAG-Empfehlung, mit Abstand zu benachbarten Elementen konform
- **Large (48px):** Übertrifft WCAG-Empfehlung

**Empfehlung:**
- Mobile: Medium (40px) oder Large (48px)
- Desktop: Alle Größen erlaubt, Small nur mit ausreichend Abstand

**Abstand zwischen Buttons:**
Mindestens 8px Abstand zwischen benachbarten Buttons (verwenden Sie `spacing.2` Token) für Touch-Sicherheit.

---

## CSS-Implementierungsleitfaden

### Basis-Button-Struktur

```css
.button {
  /* Base Styles */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-family-base); /* Inter */
  font-weight: var(--button-font-weight); /* 500 */
  border-radius: var(--button-border-radius); /* 4px */
  transition: var(--button-transition); /* 150ms ease-in-out */
  cursor: pointer;
  text-decoration: none;
  line-height: 1;

  /* Prevent text selection */
  user-select: none;
  -webkit-user-select: none;
}

.button:disabled {
  cursor: not-allowed;
  pointer-events: none; /* Verhindert Hover auf deaktivierten Buttons */
}
```

### Varianten-Modifier

```css
/* Primary Button */
.button--primary {
  background-color: var(--button-primary-background-default);
  color: var(--button-primary-foreground-default);
  border: none;
}

.button--primary:hover:not(:disabled) {
  background-color: var(--button-primary-background-hover);
}

.button--primary:active:not(:disabled) {
  background-color: var(--button-primary-background-active);
}

.button--primary:disabled {
  background-color: var(--button-primary-background-disabled);
  color: var(--button-primary-foreground-disabled);
}

/* Secondary Button */
.button--secondary {
  background-color: var(--button-secondary-background-default);
  color: var(--button-secondary-foreground-default);
  border: var(--button-border-width) solid var(--button-secondary-border-default);
}

.button--secondary:hover:not(:disabled) {
  background-color: var(--button-secondary-background-hover);
  color: var(--button-secondary-foreground-hover);
  border-color: var(--button-secondary-border-hover);
}

.button--secondary:active:not(:disabled) {
  background-color: var(--button-secondary-background-active);
}

.button--secondary:disabled {
  color: var(--button-secondary-foreground-disabled);
  border-color: var(--button-secondary-border-disabled);
}

/* Tertiary/Ghost Button */
.button--tertiary {
  background-color: var(--button-tertiary-background-default);
  color: var(--button-tertiary-foreground-default);
  border: none;
}

.button--tertiary:hover:not(:disabled) {
  background-color: var(--button-tertiary-background-hover);
  color: var(--button-tertiary-foreground-hover);
}

.button--tertiary:active:not(:disabled) {
  background-color: var(--button-tertiary-background-active);
}

.button--tertiary:disabled {
  color: var(--button-tertiary-foreground-disabled);
}
```

### Größen-Modifier

```css
.button--small {
  min-height: var(--button-size-small-min-height); /* 32px */
  padding: var(--button-size-small-padding-y) var(--button-size-small-padding-x); /* 6px 12px */
  font-size: var(--button-size-small-font-size); /* 14px */
  gap: var(--button-size-small-gap); /* 6px */
}

.button--medium {
  min-height: var(--button-size-medium-min-height); /* 40px */
  padding: var(--button-size-medium-padding-y) var(--button-size-medium-padding-x); /* 8px 16px */
  font-size: var(--button-size-medium-font-size); /* 16px */
  gap: var(--button-size-medium-gap); /* 8px */
}

.button--large {
  min-height: var(--button-size-large-min-height); /* 48px */
  padding: var(--button-size-large-padding-y) var(--button-size-large-padding-x); /* 12px 24px */
  font-size: var(--button-size-large-font-size); /* 18px */
  gap: var(--button-size-large-gap); /* 8px */
}
```

### Focus-Indikatoren

```css
.button:focus-visible {
  outline: var(--button-focus-outline-width) solid var(--button-focus-outline-color);
  outline-offset: var(--button-focus-outline-offset);
}

/* Entfernen Sie :focus-visible Outline nur, wenn alternativer visueller Indikator vorhanden ist */
```

### Icon-Only Modifier

```css
.button--icon-only {
  padding: 0;
  gap: 0;
}

.button--icon-only.button--small {
  width: var(--button-icon-only-small-size); /* 32px */
  height: var(--button-icon-only-small-size);
  min-height: unset;
}

.button--icon-only.button--medium {
  width: var(--button-icon-only-medium-size); /* 44px */
  height: var(--button-icon-only-medium-size);
  min-height: unset;
}

.button--icon-only.button--large {
  width: var(--button-icon-only-large-size); /* 48px */
  height: var(--button-icon-only-large-size);
  min-height: unset;
}
```

### Icon-Styling

```css
.button .icon {
  color: currentColor; /* Automatische Farbvererbung */
  flex-shrink: 0; /* Verhindert Icon-Verzerrung */
}

.button--small .icon {
  width: var(--button-size-small-icon-size); /* 16px */
  height: var(--button-size-small-icon-size);
}

.button--medium .icon {
  width: var(--button-size-medium-icon-size); /* 20px */
  height: var(--button-size-medium-icon-size);
}

.button--large .icon {
  width: var(--button-size-large-icon-size); /* 20px */
  height: var(--button-size-large-icon-size);
}
```

---

## Don'ts – Was Sie vermeiden sollten

### ❌ Mehrere Primary Buttons pro Bereich

**Problem:** Verwirrt Nutzer über die wichtigste Aktion.

**Lösung:** Nur ein Primary Button pro Ansicht oder logischem Abschnitt. Andere Aktionen als Secondary kennzeichnen.

```html
<!-- Falsch -->
<div class="actions">
  <button class="button button--primary">Speichern</button>
  <button class="button button--primary">Abbrechen</button> <!-- Beide Primary -->
</div>

<!-- Richtig -->
<div class="actions">
  <button class="button button--primary">Speichern</button>
  <button class="button button--secondary">Abbrechen</button>
</div>
```

### ❌ Buttons ohne erkennbare Grenzen (außer Tertiary)

**Problem:** Primary und Secondary Buttons müssen klar als interaktive Elemente erkennbar sein.

**Lösung:** Nur Tertiary Buttons dürfen keinen Hintergrund/Rahmen haben.

### ❌ Focus-Indikatoren entfernen

**Problem:** Tastatur-Nutzer können nicht erkennen, welcher Button fokussiert ist. WCAG-Verstoß.

**Lösung:** Niemals `:focus { outline: none; }` verwenden. Focus-Indikatoren sind Pflicht.

```css
/* Niemals: */
.button:focus {
  outline: none; /* ❌ WCAG-Verstoß */
}

/* Immer: */
.button:focus-visible {
  outline: 2px solid var(--button-focus-outline-color);
  outline-offset: 2px;
}
```

### ❌ Zu kleine Touch-Targets auf Mobilgeräten

**Problem:** Small Buttons (32px) sind auf Touch-Geräten schwer zu treffen.

**Lösung:** Auf mobilen Geräten Medium (40px) oder Large (48px) verwenden.

```css
/* Responsive Button-Größen */
@media (max-width: 768px) {
  .button--small {
    /* Small Buttons auf Mobile vermeiden oder mit Abstand kompensieren */
    min-height: var(--button-size-medium-min-height);
  }
}
```

### ❌ Animierte Größenänderungen bei Hover/Active

**Problem:** Größenänderungen bei Hover verschieben umliegende Elemente und wirken unruhig.

**Lösung:** Nur Farbänderungen bei Hover/Active. Keine `transform: scale()` oder Padding-Änderungen.

```css
/* Falsch */
.button:hover {
  transform: scale(1.05); /* ❌ Verschiebt Layout */
}

/* Richtig */
.button:hover {
  background-color: var(--button-primary-background-hover); /* ✓ Nur Farbe */
}
```

### ❌ Farbwerte hardcoden

**Problem:** Inkonsistenz mit Design-Tokens, schwer wartbar.

**Lösung:** Immer Design-Tokens verwenden, niemals Hex-Codes direkt.

```css
/* Falsch */
.button--primary {
  background-color: #008bd2; /* ❌ Hardcoded */
}

/* Richtig */
.button--primary {
  background-color: var(--button-primary-background-default); /* ✓ Token */
}
```

### ❌ Icon-Only Buttons ohne aria-label

**Problem:** Screenreader können Button-Funktion nicht vermitteln. WCAG-Verstoß.

**Lösung:** Immer `aria-label` für Icon-Only Buttons verwenden.

```html
<!-- Falsch -->
<button class="button button--icon-only">
  <svg class="icon">...</svg> <!-- ❌ Keine Beschreibung -->
</button>

<!-- Richtig -->
<button class="button button--icon-only" aria-label="Menü öffnen">
  <svg class="icon" aria-hidden="true">...</svg> <!-- ✓ aria-label vorhanden -->
</button>
```

---

## Token-Referenz

Alle Button-Tokens sind in `design-system/tokens/buttons.json` definiert und werden als CSS Custom Properties in `build/css/variables.css` kompiliert.

**Verfügbare Token-Kategorien:**
- `button.primary.*` — Primary Button Farben
- `button.secondary.*` — Secondary Button Farben
- `button.tertiary.*` — Tertiary Button Farben
- `button.size.{small|medium|large}.*` — Button-Größen
- `button.focus.*` — Focus-Indikatoren
- `button.iconOnly.*` — Icon-Only Button-Dimensionen
- `button.borderRadius`, `button.borderWidth`, `button.fontWeight`, `button.transition` — Basis-Eigenschaften

**Verwendung:**
```css
.button--primary {
  background-color: var(--button-primary-background-default);
}
```

---

**Letzte Aktualisierung:** 2026-01-28
**Version:** 1.0
**Status:** Final
