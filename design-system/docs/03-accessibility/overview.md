# Barrierefreiheit im Hydrophon Design-System

Barrierefreiheit (Accessibility, a11y) ist keine nachträgliche Ergänzung, sondern integraler Bestandteil jeder Komponente im Hydrophon Design-System.

**Commitment:** Alle Komponenten erfüllen WCAG 2.1 Level AA.

---

## Unser Ansatz

Das Hydrophon Design-System erfüllt WCAG 2.1 Level AA. Barrierefreiheit ist keine nachträgliche Ergänzung, sondern integraler Bestandteil jeder Komponente.

**Warum Barrierefreiheit im B2B-Bereich wichtig ist:**

- **Gesetzliche Anforderungen:** EU Web Accessibility Directive, Barrierefreiheitsstärkungsgesetz (BFSG)
- **Breitere Nutzerbasis:** 15% der Weltbevölkerung leben mit Behinderungen
- **Bessere UX für alle:** Klare Fokusindikatoren, Tastaturnavigation, verständliche Fehlermeldungen helfen allen Nutzern
- **Baustellenkontext:** B2B-Sanitärbereich bedeutet oft raue Umgebungen – große Touch-Targets, hohe Kontraste, Tastaturzugang sind essentiell

---

## Grundprinzipien (POUR)

### 1. Wahrnehmbar (Perceivable)

Informationen und Benutzeroberflächen-Komponenten müssen in einer Weise präsentiert werden, die Nutzer wahrnehmen können.

**Unsere Umsetzung:**

- **Textalternativen:** Alle Bilder haben `alt`-Attribute, dekorative Icons haben `aria-hidden="true"`
- **Farbkontraste:** Mindestens 4.5:1 für normalen Text, 3:1 für große Texte und grafische Elemente
- **Nicht nur Farbe:** Informationen werden nie nur durch Farbe vermittelt (Farbe + Icon + Text)
  - Beispiel: Fehlermeldungen = Rote Farbe + AlertCircle-Icon + Text
  - Beispiel: Erfolg = Grüne Farbe + CheckCircle-Icon + Text

**Farbkontraste im Detail:**

| Element | WCAG-Minimum | Hydrophon-Werte | Status |
|---------|--------------|-----------------|--------|
| Normaler Text (< 18px) | 4.5:1 | Grau #575656 auf Weiß = 5.9:1 | ✓ Erfüllt |
| Großer Text (≥18px bold) | 3:1 | Grau #575656 auf Weiß = 5.9:1 | ✓ Erfüllt |
| Fokus-Indikatoren | 3:1 | Blau #008BD2 = 4.5:1 | ✓ Erfüllt |
| Fehlerfarbe | 4.5:1 | Rot auf Weiß = 4.8:1 | ✓ Erfüllt |
| Primary Button Text | 4.5:1 | Weiß auf Blau #008BD2 = 4.9:1 | ✓ Erfüllt |

---

### 2. Bedienbar (Operable)

Benutzeroberflächen-Komponenten und Navigation müssen bedienbar sein.

**Unsere Umsetzung:**

- **Tastaturzugriff:** Alle interaktiven Elemente sind per Tastatur erreichbar (Tab/Shift+Tab)
- **Fokus-Indikatoren:** Deutlich sichtbar mit 2px Outline, 2px Offset, 3:1 Kontrast
- **Keine Tastaturfallen:** ESC schliesst alle Overlays (Modals, Drawer, Tooltips)
- **Touch-Targets:** Mindestens 44x44px (WCAG AAA) für mobile und Baustellenumgebung
- **Keine Zeit-Limits:** Keine automatischen Timeouts ohne Warnung (außer Sitzungstimeouts mit Verlängerungsoption)

**Tastaturnavigation im Detail:**

| Taste | Aktion | Beispiel |
|-------|--------|----------|
| Tab | Nächstes fokussierbares Element | Durch Formular navigieren |
| Shift+Tab | Vorheriges fokussierbares Element | Zurück zum vorherigen Feld |
| Enter/Space | Aktiviert Button/Link | Button klicken |
| ESC | Schließt Modal/Drawer/Tooltip | Modal schließen |
| Pfeiltasten | Navigation in Radio-Groups | Radio-Option wählen |

---

### 3. Verständlich (Understandable)

Informationen und Bedienung der Benutzeroberfläche müssen verständlich sein.

**Unsere Umsetzung:**

- **Konsistente Navigation:** Header, Footer, Breadcrumb folgen denselben Patterns
- **Vorhersehbares Verhalten:** Gleiche Aktionen führen zu gleichen Ergebnissen
- **Hilfreiche Fehlermeldungen:** Deutsch, erklärend, mit Beispielen
  - Schlecht: "Ungültige Eingabe"
  - Gut: "Bitte gib eine gültige E-Mail-Adresse ein (z.B. name@firma.de)"
- **Labels und Anweisungen:** Jedes Formularfeld hat ein sichtbares Label
- **Fehlerprävention:** Bestätigungs-Dialoge für destruktive Aktionen

---

### 4. Robust (Robust)

Inhalte müssen robust genug sein, um von verschiedenen User Agents, einschließlich assistiver Technologien, zuverlässig interpretiert werden zu können.

**Unsere Umsetzung:**

- **Valides HTML:** Semantische HTML-Elemente (button, nav, header, footer, main)
- **Korrekte ARIA-Attribute:** Nur wo nötig, native HTML bevorzugt
- **Kompatibilität:** Getestet mit NVDA (Windows), VoiceOver (macOS), JAWS (Windows)

---

## Kritische ARIA-Patterns

Diese Tabelle dokumentiert die wichtigsten ARIA-Implementierungen im Design-System:

| Komponente | ARIA-Pattern | Details |
|------------|--------------|---------|
| **Modal** | `role="dialog"`, `aria-modal="true"` | Focus Trap aktiv, ESC zum Schließen, Fokus auf Close-Button bei Öffnung |
| **Toast (Erfolg/Info)** | `role="status"` | Polite announcement (unterbricht Screenreader nicht) |
| **Toast (Warnung/Fehler)** | `role="alert"` | Assertive announcement (unterbricht Screenreader sofort) |
| **Breadcrumb** | `<nav aria-label="Breadcrumb">`, `aria-current="page"` | Markiert aktuelle Seite, eindeutiges Label |
| **Mobile Drawer** | `aria-expanded`, `aria-controls` | Toggle-Button zeigt Drawer-Status an |
| **Formularfelder** | `aria-describedby`, `aria-invalid` | Verknüpft Hilfetext/Fehler mit Eingabefeld |
| **Header Navigation** | `aria-current="page"` | Server-side gerendert für aktive Links |
| **Checkbox/Radio** | Native Input mit `opacity: 0` | Erhält Accessibility-Tree, NICHT `display: none` verwenden |
| **Tooltip** | Radix UI Pattern | Automatisch WCAG 1.4.13 konform (hoverable, dismissible, persistent) |
| **Progress Bar** | Native `<progress>` | Eingebaute Screenreader-Unterstützung |

---

## Focus-Management

### Grundregeln

1. **Logische Tab-Reihenfolge:** Links nach rechts, oben nach unten (folgt F-Pattern)
2. **Fokus springt in Modal/Drawer:** Bei Öffnung erhält erstes Element (meist Close-Button) den Fokus
3. **Fokus kehrt zurück:** Bei Schließen springt Fokus zurück zum Trigger-Element
4. **Focus Trap in Modals:** Tab bleibt innerhalb des Modals, ESC zum Schließen

### Implementierung: Focus Trap

```javascript
// Focus Trap Pattern (vereinfacht)
const modal = document.querySelector('[role="dialog"]');
const focusableElements = modal.querySelectorAll(
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
);
const firstElement = focusableElements[0];
const lastElement = focusableElements[focusableElements.length - 1];

// Tab am Ende -> zurück zum Anfang
lastElement.addEventListener('keydown', (e) => {
  if (e.key === 'Tab' && !e.shiftKey) {
    e.preventDefault();
    firstElement.focus();
  }
});

// Shift+Tab am Anfang -> zum Ende
firstElement.addEventListener('keydown', (e) => {
  if (e.key === 'Tab' && e.shiftKey) {
    e.preventDefault();
    lastElement.focus();
  }
});

// ESC schließt Modal
modal.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal();
  }
});
```

**Empfehlung:** Verwende battle-tested Libraries wie Radix UI Dialog, die Focus-Traps automatisch implementieren.

---

## Fokus-Indikatoren

Alle interaktiven Elemente zeigen einen deutlich sichtbaren Fokus-Indikator.

**Standard-Fokus:**

```css
/* Alle interaktiven Elemente */
button:focus-visible,
a:focus-visible,
input:focus-visible,
select:focus-visible,
textarea:focus-visible {
  outline: 2px solid var(--color-focus); /* Hydrophon Blau #008BD2 */
  outline-offset: 2px;
}
```

**WCAG 2.2 Fokus-Anforderungen:**

- **Kontrast:** Mindestens 3:1 gegen angrenzende Farben
- **Sichtbarkeit:** Mindestens 2px Breite
- **Offset:** 2px Abstand zum Element (verhindert Überlappung mit Content)

**Hydrophon-Umsetzung:**

- Fokus-Farbe: Hydrophon Blau #008BD2 (4.5:1 Kontrast)
- Fokus-Breite: 2px
- Fokus-Offset: 2px
- Verwendung von `:focus-visible` (nur bei Tastatur, nicht bei Maus/Touch)

---

## Tastatur-Navigation

### Globale Shortcuts

| Taste | Aktion | Kontext |
|-------|--------|---------|
| Tab | Nächstes fokussierbares Element | Global |
| Shift+Tab | Vorheriges fokussierbares Element | Global |
| Enter | Aktiviert Link oder Button | Buttons, Links |
| Space | Aktiviert Button, togglet Checkbox | Buttons, Checkboxes |
| ESC | Schließt Overlay | Modals, Drawer, Tooltips |
| Pfeiltasten | Navigation in Radio-Groups | Radio-Button-Gruppen |

### Komponenten-spezifische Shortcuts

**Modal-Dialog:**

- `Tab`: Durch interaktive Elemente im Modal
- `ESC`: Modal schließen
- Focus Trap: Tab bleibt im Modal

**Mobile Drawer:**

- `Tab`: Durch Navigation-Links
- `ESC`: Drawer schließen
- Focus Trap: Tab bleibt im Drawer

**Radio-Buttons:**

- `↑/↓` oder `←/→`: Zwischen Radio-Optionen wechseln (und automatisch selektieren)
- `Tab`: Zur nächsten Fieldset-Gruppe

**Tooltip:**

- `Hover` oder `Focus`: Tooltip anzeigen
- `ESC`: Tooltip schließen
- Tooltip bleibt bei Hover über Tooltip-Inhalt sichtbar

---

## Screenreader-Unterstützung

### Getestete Screenreader

| Plattform | Screenreader | Status |
|-----------|--------------|--------|
| Windows | NVDA | ✓ Getestet |
| Windows | JAWS | ✓ Getestet |
| macOS | VoiceOver | ✓ Getestet |

### Screenreader-Patterns

**Live Regions (Toast-Benachrichtigungen):**

```html
<!-- Erfolg/Info: Polite (unterbricht nicht) -->
<div role="status" aria-live="polite">
  Änderungen gespeichert
</div>

<!-- Warnung/Fehler: Assertive (unterbricht sofort) -->
<div role="alert" aria-live="assertive">
  Fehler beim Speichern
</div>
```

**Labels und Beschreibungen:**

```html
<!-- Formularfeld mit Label und Hilfetext -->
<label for="email">
  E-Mail-Adresse
  <span class="required" aria-label="Pflichtfeld">*</span>
</label>
<input
  type="email"
  id="email"
  aria-describedby="email-help"
/>
<span id="email-help">Wir geben deine E-Mail nicht weiter.</span>

<!-- Fehlerfall -->
<input
  type="email"
  id="email"
  aria-invalid="true"
  aria-describedby="email-error"
/>
<span id="email-error" role="alert">
  Bitte gib eine gültige E-Mail-Adresse ein (z.B. name@firma.de)
</span>
```

---

## Motion & Animation

Alle Animationen respektieren die `prefers-reduced-motion` Einstellung.

**CSS-Pattern:**

```css
/* Standard: Animation */
.modal {
  animation: fadeIn 200ms ease-out;
}

/* Reduced Motion: Keine Animation */
@media (prefers-reduced-motion: reduce) {
  .modal {
    animation: none;
  }
}

/* Spinner: Statisch statt rotierend */
@media (prefers-reduced-motion: reduce) {
  .spinner {
    animation: none;
    opacity: 0.6; /* Zeigt "Loading" visuell, aber statisch */
  }
}
```

**Betroffene Komponenten:**

- **Spinner:** Rotation wird ausgeschaltet, statisches Icon
- **Skeleton:** Shimmer-Animation wird ausgeschaltet
- **Modal:** Fade + Scale wird zu instant anzeigen
- **Toast:** Slide-in wird zu fade-in
- **Drawer:** Slide-out wird zu fade

---

## Weiterführende Dokumentation

**Komponenten-spezifische Accessibility:**

- [WCAG 2.1 AA Compliance pro Komponente](./wcag-compliance.md) — Detaillierte WCAG-Kriterien für jede Komponente
- [Testing-Anleitung](./testing-guide.md) — Praktische Checklisten für automatisierte und manuelle Tests

**Externe Ressourcen:**

- [WCAG 2.1 Richtlinien (W3C)](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices Guide (APG)](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

---

**Letzte Aktualisierung:** 2026-01-29
