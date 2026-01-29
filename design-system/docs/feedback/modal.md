# Modal-Dialoge

Modale Dialoge unterbrechen den Hauptfluss und fordern den Fokus des Nutzers für wichtige Aktionen, Bestätigungen oder Formulareingaben.

**Anforderungen:** FEEDBACK-01 (Modal-Varianten), FEEDBACK-02 (Accessibility), FEEDBACK-03 (Focus-Management), FEEDBACK-04 (Keyboard-Support)

---

## Übersicht

Ein Modal-Dialog ist ein Overlay-Fenster, das über dem Hauptinhalt erscheint und die Aufmerksamkeit des Nutzers erfordert. Der Hintergrund wird abgedunkelt und nicht-interaktiv, bis der Dialog geschlossen wird.

**Wann Modals verwenden:**

- **Bestätigungsdialoge** — Kritische oder destruktive Aktionen absichern (z.B. "Artikel wirklich löschen?")
- **Formular-Dialoge** — Kurze Formulare ohne neue Seite (z.B. "Neuen Kontakt anlegen")
- **Informationsdialoge** — Wichtige Informationen präsentieren, die Aufmerksamkeit erfordern

**Wann KEINE Modals verwenden:**

- **Komplexe Workflows** — Mehrschrittige Prozesse gehören auf dedizierte Seiten
- **Nebenläufige Interaktion** — Wenn Nutzer parallel arbeiten müssen (dann Slide-Out-Panel)
- **Nicht-kritische Infos** — Standard-Inhalte gehören inline oder auf separate Seiten
- **Häufige Aktionen** — Modal-Overload frustriert Nutzer

**B2B-Kontext:**

B2B-Nutzer arbeiten oft mit komplexen Datensätzen. Modals eignen sich für schnelle Bestätigungen und kurze Formulare, aber nicht für umfangreiche Dateneingabe. Im Zweifelsfall: dedizierte Seite statt Modal.

---

## Varianten

Das Design-System definiert drei Modal-Größen für unterschiedliche Anwendungsfälle:

### Small (400px)

**Verwendung:** Bestätigungsdialoge, einfache Ja/Nein-Entscheidungen

**Typischer Inhalt:**
- Titel (1 Zeile)
- Beschreibung (2-3 Zeilen)
- 2 Buttons (Abbrechen + Aktion)

**Beispiel:**

```
┌──────────────────────────┐
│ [X]  Artikel löschen?    │
│ ───────────────────────  │
│                          │
│ Dieser Vorgang kann      │
│ nicht rückgängig         │
│ gemacht werden.          │
│                          │
│ ───────────────────────  │
│   [Abbrechen] [Löschen]  │
└──────────────────────────┘
```

**Token:** `modal.container.max-width.sm` → 400px

### Medium (600px)

**Verwendung:** Formulare mit 3-8 Feldern, mittlere Inhaltsmengen

**Typischer Inhalt:**
- Titel
- Formularfelder (Text-Inputs, Selects, Checkboxen)
- Hilfetext
- 2-3 Buttons (Abbrechen + Speichern + optional Mehr)

**Beispiel:**

```
┌────────────────────────────────────┐
│ [X]  Neuen Kontakt anlegen         │
│ ─────────────────────────────────  │
│                                    │
│ Name: [________________]           │
│                                    │
│ E-Mail: [________________]         │
│                                    │
│ Telefon: [________________]        │
│                                    │
│ Rolle: [▼ Bitte wählen]           │
│                                    │
│ ─────────────────────────────────  │
│        [Abbrechen] [Speichern]     │
└────────────────────────────────────┘
```

**Token:** `modal.container.max-width.md` → 600px

### Large (900px)

**Verwendung:** Komplexe Inhalte, Vorschau-Dialoge, mehrspaltige Formulare

**Typischer Inhalt:**
- Titel
- Mehrspaltige Layouts
- Tabellen oder Listen
- Bild-Galerien
- Komplexe Formulare (>8 Felder)

**Beispiel:**

```
┌─────────────────────────────────────────────────────────┐
│ [X]  Produktdetails                                     │
│ ──────────────────────────────────────────────────────  │
│                                                         │
│  ┌─────────────┐  Name: Hydrophon Serie A              │
│  │             │  Artikelnr.: HYD-A-001                 │
│  │   [Bild]    │  Preis: 249,00 €                       │
│  │             │  Verfügbar: Ja                         │
│  └─────────────┘  Kategorie: Armaturen                  │
│                                                         │
│  Beschreibung:                                          │
│  Lorem ipsum dolor sit amet, consectetur adipiscing...  │
│                                                         │
│  Spezifikationen:        Montage:                       │
│  • Material: Edelstahl  • Wandmontage                   │
│  • Durchfluss: 12 L/min • Höhe: 150mm                   │
│                                                         │
│ ──────────────────────────────────────────────────────  │
│                              [Schließen] [In Warenkorb] │
└─────────────────────────────────────────────────────────┘
```

**Token:** `modal.container.max-width.lg` → 900px

---

## Anatomie

Ein Modal besteht aus fünf Elementen:

```
       ┌─────────────────────────────┐
       │ [X]  Modal-Titel            │  ← Header (mit Close-Button)
       │ ──────────────────────────  │  ← Trennlinie (optional)
       │                             │
       │  Modal-Inhalt erscheint     │  ← Body
       │  hier. Text, Formulare,     │
       │  oder andere Komponenten.   │
       │                             │
       │ ──────────────────────────  │  ← Trennlinie (optional)
       │      [Abbrechen]  [Aktion]  │  ← Footer (mit Buttons)
       └─────────────────────────────┘
              ↑
         Modal-Container
              ↓
╔═════════════════════════════════════╗
║ ░░░░░░░ Overlay (abdunkelnd) ░░░░░░ ║  ← Backdrop Overlay
╚═════════════════════════════════════╝
```

### 1. Overlay (Backdrop)

**Funktion:** Visueller Kontext, signalisiert modalen Zustand

**Tokens:**
- Hintergrund: `modal.overlay.background` (rgba(0,0,0,0.5))

**Verhalten:**
- Deckung: Gesamter Viewport
- Klick: KEINE Schließ-Funktion (verhindert versehentliches Schließen)
- Z-Index: Unter Modal-Container

**Warum kein Backdrop-Click?**

Versehentliches Schließen ist frustrierend, besonders bei Formularen mit ungespeicherten Änderungen. B2B-Nutzer arbeiten oft in hektischen Umgebungen (Baustelle, Lager). Ein Fehlklick auf den Backdrop würde Datenverlust riskieren.

### 2. Modal-Container

**Funktion:** Enthält den gesamten Dialog-Inhalt

**Tokens:**
- Hintergrund: `modal.container.background` (neutral.white)
- Eckenradius: `modal.container.border-radius` (borderRadius.lg / 8px)
- Padding: `modal.container.padding` (spacing.6 / 24px)
- Breite: `modal.container.max-width.{sm|md|lg}` (400px / 600px / 900px)

**Verhalten:**
- Position: Zentriert im Viewport (horizontal & vertikal)
- Max-Höhe: 80-90vh (verhindert Viewport-Overflow)
- Scroll: Vertikal scrollbar bei langem Inhalt
- Shadow: Elevation für Tiefe (shadow.xl)

### 3. Header mit Close-Button

**Funktion:** Titel + Schließen-Möglichkeit

**Struktur:**

```html
<div class="modal__header">
  <h2 class="modal__title">Artikel löschen?</h2>
  <button class="modal__close" aria-label="Dialog schließen">
    <svg><!-- X-Icon --></svg>
  </button>
</div>
```

**Tokens:**
- Titel Font-Size: `modal.title.font-size` (typography.heading.h3.fontSize / 30px)
- Titel Font-Weight: `modal.title.font-weight` (typography.heading.h3.fontWeight / semibold)
- Titel Farbe: `modal.title.color` (neutral.900)
- Close-Button Größe: `modal.close-button.size` (32px)
- Close-Button Icon: `modal.close-button.icon-size` (20px)

**Accessibility:**
- Close-Button IMMER sichtbar (nicht nur visuell, auch für Screenreader)
- aria-label auf Close-Button: "Dialog schließen" (beschreibt Aktion)

### 4. Body

**Funktion:** Hauptinhalt des Modals

**Inhalt:** Beliebig — Text, Formulare, Bilder, Tabellen

**Tokens:**
- Padding unten: `modal.description.margin-bottom` (spacing.6 / 24px)
- Textfarbe: `modal.description.color` (neutral.600)
- Font-Size: `modal.description.font-size` (typography.body.md.fontSize / 16px)

**Scroll-Verhalten:**

```css
.modal__body {
  max-height: calc(90vh - 200px); /* Abzüglich Header + Footer */
  overflow-y: auto;
}
```

Wenn Body-Inhalt zu lang wird, scrollt nur der Body — Header und Footer bleiben fixiert.

### 5. Footer

**Funktion:** Enthält Aktions-Buttons

**Layout:** Rechtsbündig, primäre Aktion rechts

**Tokens:**
- Padding oben: `modal.footer.padding-top` (spacing.4 / 16px)
- Button-Gap: `modal.footer.gap` (spacing.3 / 12px)

**Button-Reihenfolge (Links nach Rechts):**

1. **Tertiär-Button** (optional) — Z.B. "Mehr erfahren"
2. **Sekundär-Button** — "Abbrechen" (nicht-destruktiv)
3. **Primär-Button** — Hauptaktion (z.B. "Speichern", "Löschen")

**Beispiel:**

```html
<div class="modal__footer">
  <button class="button button--tertiary">Hilfe</button>
  <button class="button button--secondary">Abbrechen</button>
  <button class="button button--primary">Speichern</button>
</div>
```

---

## Design-Token

Alle Modal-Token aus `design-system/tokens/feedback.json`:

### Overlay

| Token-Name | Wert | CSS-Variable | Beschreibung |
|------------|------|--------------|--------------|
| `modal.overlay.background` | rgba(0, 0, 0, 0.5) | `--modal-overlay-background` | Halbtransparentes Schwarz |

### Container

| Token-Name | Wert | CSS-Variable | Beschreibung |
|------------|------|--------------|--------------|
| `modal.container.background` | {color.neutral.white} | `--modal-container-background` | Weiß |
| `modal.container.border-radius` | {borderRadius.lg} | `--modal-container-border-radius` | 8px |
| `modal.container.padding` | {spacing.6} | `--modal-container-padding` | 24px |
| `modal.container.max-width.sm` | 400px | `--modal-container-max-width-sm` | Small Modal |
| `modal.container.max-width.md` | 600px | `--modal-container-max-width-md` | Medium Modal |
| `modal.container.max-width.lg` | 900px | `--modal-container-max-width-lg` | Large Modal |

### Close-Button

| Token-Name | Wert | CSS-Variable | Beschreibung |
|------------|------|--------------|--------------|
| `modal.close-button.size` | 32px | `--modal-close-button-size` | Button-Größe |
| `modal.close-button.color` | {color.neutral.600} | `--modal-close-button-color` | Standard-Farbe |
| `modal.close-button.hover-color` | {color.neutral.900} | `--modal-close-button-hover-color` | Hover-Farbe |

### Titel

| Token-Name | Wert | CSS-Variable | Beschreibung |
|------------|------|--------------|--------------|
| `modal.title.font-size` | {typography.heading.h3.fontSize} | `--modal-title-font-size` | 30px (H3) |
| `modal.title.font-weight` | {typography.heading.h3.fontWeight} | `--modal-title-font-weight` | semibold (600) |
| `modal.title.margin-bottom` | {spacing.4} | `--modal-title-margin-bottom` | 16px |

### Beschreibung

| Token-Name | Wert | CSS-Variable | Beschreibung |
|------------|------|--------------|--------------|
| `modal.description.font-size` | {typography.body.md.fontSize} | `--modal-description-font-size` | 16px |
| `modal.description.color` | {color.neutral.600} | `--modal-description-color` | Grau |
| `modal.description.margin-bottom` | {spacing.6} | `--modal-description-margin-bottom` | 24px |

---

## Verhalten

### Öffnen

**Trigger:** Button-Klick, Link-Click, oder programmatisch

**Schritte:**

1. Overlay erscheint mit Fade-In-Animation
2. Modal-Container erscheint mit Fade + Scale-Animation
3. Body-Scroll wird deaktiviert (`overflow: hidden` auf `<body>`)
4. Fokus bewegt sich auf ersten fokussierbaren Element im Modal (üblicherweise Close-Button)
5. Focus-Trap aktiviert (Tab-Taste zirkuliert innerhalb Modal)

**Animation:**

```css
/* Overlay Fade-In */
.modal-overlay {
  animation: fadeIn 200ms ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Modal Scale + Fade */
.modal-container {
  animation: modalEnter 200ms ease-out;
}

@keyframes modalEnter {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
```

**Timing:** 200ms (aus Token `modal.animation.duration`)

**Reduced Motion:**

```css
@media (prefers-reduced-motion: reduce) {
  .modal-overlay,
  .modal-container {
    animation: none;
  }
}
```

### Schließen

**Trigger:**

- **ESC-Taste** — Keyboard-Escape (WCAG 2.1.2 Pflicht)
- **Close-Button (X)** — Visueller Schließ-Mechanismus
- **Abbrechen-Button** — Im Footer (optional)
- **Erfolgreiche Aktion** — Nach "Speichern", "Löschen" etc.

**NICHT: Backdrop-Click** (verhindert versehentliches Schließen)

**Schritte:**

1. Modal-Container verschwindet mit Fade + Scale-Out-Animation
2. Overlay verschwindet mit Fade-Out-Animation
3. Fokus kehrt zu auslösendem Element zurück (Button, der Modal geöffnet hat)
4. Focus-Trap deaktiviert
5. Body-Scroll reaktiviert (`overflow: auto` auf `<body>`)

**Animation:**

```css
/* Modal Scale + Fade Out */
.modal-container--closing {
  animation: modalExit 200ms ease-in;
}

@keyframes modalExit {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.95);
  }
}
```

### Focus-Management

**Anforderung:** WCAG 2.4.3 (Focus Order) + WCAG 2.1.2 (No Keyboard Trap)

**Focus-Trap Pattern:**

Beim Öffnen wird der Fokus im Modal "gefangen". Tab-Taste zirkuliert durch alle fokussierbaren Elemente innerhalb des Modals.

**Implementation (Vanilla JavaScript):**

```javascript
function trapFocus(modalElement) {
  const focusableElements = modalElement.querySelectorAll(
    'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
  );

  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];

  function handleTabKey(event) {
    if (event.key !== 'Tab') return;

    if (event.shiftKey) {
      // Shift + Tab: Vom ersten zum letzten Element springen
      if (document.activeElement === firstFocusable) {
        event.preventDefault();
        lastFocusable.focus();
      }
    } else {
      // Tab: Vom letzten zum ersten Element springen
      if (document.activeElement === lastFocusable) {
        event.preventDefault();
        firstFocusable.focus();
      }
    }
  }

  modalElement.addEventListener('keydown', handleTabKey);

  // Cleanup-Funktion für Event-Listener-Entfernung
  return () => {
    modalElement.removeEventListener('keydown', handleTabKey);
  };
}
```

**Focus-Reihenfolge im Modal:**

1. Close-Button (X) — Erhält initialen Fokus
2. Modal-Body-Inhalt (Links, Inputs, etc.)
3. Footer-Buttons (von links nach rechts)
4. (Tab wraps zurück zu Close-Button)

**Fokus-Rückkehr:**

```javascript
// Trigger-Element speichern
const triggerElement = document.activeElement;

// Modal öffnen
openModal();

// Modal schließen
closeModal();

// Fokus zurück zu Trigger
triggerElement.focus();
```

### ESC-Taste

**Anforderung:** WCAG 2.1.2 (No Keyboard Trap)

**Implementation:**

```javascript
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modalIsOpen) {
    closeModal();
  }
});
```

**Ausnahme: Ungespeicherte Änderungen**

Wenn Formular-Daten ungespeichert sind, ESC-Taste mit Bestätigungsdialog kombinieren:

```javascript
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modalIsOpen) {
    if (hasUnsavedChanges) {
      // Bestätigungsdialog zeigen
      if (confirm('Änderungen verwerfen?')) {
        closeModal();
      }
    } else {
      closeModal();
    }
  }
});
```

---

## Barrierefreiheit (WCAG 2.1 AA)

### ARIA-Attribute

Modal-Dialoge verwenden das WAI-ARIA Dialog Pattern:

**Overlay:**

```html
<div class="modal-overlay" aria-hidden="true"></div>
```

**Modal-Container:**

```html
<div
  class="modal"
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-title"
  aria-describedby="modal-description"
>
  <h2 id="modal-title">Modal-Titel</h2>
  <p id="modal-description">Modal-Beschreibung</p>
  ...
</div>
```

| ARIA-Attribut | Wert/Zweck | Pflicht? |
|---------------|------------|----------|
| `role="dialog"` | Identifiziert Element als Dialog | Ja |
| `aria-modal="true"` | Kommuniziert modales Verhalten | Ja |
| `aria-labelledby` | Verknüpft mit Modal-Titel (ID) | Ja |
| `aria-describedby` | Verknüpft mit Beschreibung (ID) | Optional |

### Keyboard-Navigation

**Anforderungen:** WCAG 2.1.1 (Keyboard) + WCAG 2.1.2 (No Keyboard Trap)

| Taste | Aktion |
|-------|--------|
| **Tab** | Fokus zum nächsten fokussierbaren Element (innerhalb Modal) |
| **Shift+Tab** | Fokus zum vorherigen fokussierbaren Element (innerhalb Modal) |
| **ESC** | Modal schließen (Fokus kehrt zu Trigger zurück) |
| **Enter** | Primär-Button aktivieren (wenn fokussiert) |
| **Space** | Button aktivieren (wenn fokussiert) |

### Screen Reader Ankündigungen

**Beim Öffnen:**

```
"Dialog. [Modal-Titel]. [Modal-Beschreibung]. Dialog schließen, Button."
```

**Beim Fokus auf Close-Button:**

```
"Dialog schließen, Button."
```

**Beim Schließen:**

```
[Fokus kehrt zu Trigger zurück]
"[Trigger-Element-Label], Button."
```

### Focus Indicators

**WCAG 2.4.7:** Fokussierte Elemente müssen visuell erkennbar sein.

```css
.modal button:focus-visible {
  outline: 2px solid var(--color-hydrophon-blau-300);
  outline-offset: 2px;
}
```

### Color Contrast

**WCAG 1.4.3:** Text muss mindestens 4.5:1 Kontrast haben.

- Modal-Titel (neutral.900 auf white): 21:1 ✅
- Modal-Beschreibung (neutral.600 auf white): 7:1 ✅
- Button-Text: Siehe Button-Komponente (bereits WCAG-konform)

---

## Bestätigungs-Dialoge

Spezielle Modal-Variante für destruktive Aktionen.

### Verwendung

**Wann:**
- Löschen von Daten
- Verwerfen ungespeicherter Änderungen
- Abbrechen laufender Prozesse
- Andere irreversible Aktionen

**Warum:**
Versehentliche destruktive Aktionen sind im B2B-Umfeld besonders kritisch. Ein gelöschter Auftrag oder verworfene Konfiguration kann Arbeitszeit kosten.

### Struktur

```
┌──────────────────────────────────┐
│ [X]  [Warn-Icon] Artikel löschen │
│ ────────────────────────────────  │
│                                  │
│ Möchten Sie den Artikel          │
│ "Hydrophon Serie A" wirklich     │
│ löschen?                         │
│                                  │
│ Diese Aktion kann nicht          │
│ rückgängig gemacht werden.       │
│                                  │
│ ────────────────────────────────  │
│        [Abbrechen]  [Löschen]    │
└──────────────────────────────────┘
```

### Best Practices

**1. Explizite "Abbrechen"-Button ist Pflicht**

Destruktive Aktion MUSS eine klare, sichere Alternative haben.

```html
<div class="modal__footer">
  <button class="button button--secondary">Abbrechen</button>
  <button class="button button--primary button--error">Löschen</button>
</div>
```

**2. Destructive Action verwendet Error-Farbe**

Button für destruktive Aktion in Rot (color.error):

```css
.button--error {
  background-color: var(--color-error-500);
  color: white;
}

.button--error:hover {
  background-color: var(--color-error-600);
}
```

**3. Klare, spezifische Aktionsbezeichnung**

❌ Schlecht: "OK" / "Ja"
✅ Gut: "Löschen" / "Verwerfen" / "Abbrechen"

**4. Kontext in Beschreibung**

Beschreibung sollte benennen, WAS gelöscht wird:

❌ Schlecht: "Sind Sie sicher?"
✅ Gut: "Möchten Sie den Artikel 'Hydrophon Serie A' wirklich löschen?"

**5. Konsequenzen erklären**

Wenn irreversibel, explizit kommunizieren:

```
Diese Aktion kann nicht rückgängig gemacht werden.
Alle zugehörigen Daten gehen verloren.
```

### Accessibility für Bestätigungs-Dialoge

**Screenreader-Unterstützung:**

```html
<div role="alertdialog" aria-labelledby="confirm-title" aria-describedby="confirm-desc">
  <h2 id="confirm-title">Artikel löschen</h2>
  <p id="confirm-desc">Möchten Sie den Artikel "Hydrophon Serie A" wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden.</p>
</div>
```

**`role="alertdialog"` vs `role="dialog"`:**

- `alertdialog` für kritische Bestätigungen (wird als Alert angekündigt)
- `dialog` für Standard-Modals

---

## Formular-Dialoge

Modals mit Formulareingaben erfordern besondere UX-Patterns.

### Best Practices

**1. Validierung vor Schließen**

Verhindern, dass Modal mit ungültigen Daten geschlossen wird:

```javascript
function handleSaveButton() {
  if (!validateForm()) {
    // Fehler inline anzeigen, Modal bleibt offen
    return;
  }

  saveData();
  closeModal();
}
```

**2. Ungespeicherte Änderungen warnen**

Wenn Nutzer versucht, Modal mit ungespeicherten Daten zu schließen:

```javascript
function handleCloseButton() {
  if (hasUnsavedChanges) {
    const confirmClose = confirm('Änderungen verwerfen?');
    if (!confirmClose) return;
  }

  closeModal();
}
```

**Alternative: Auto-Save**

Bei unkritischen Formularen automatisch speichern:

```javascript
// Auto-Save bei jedem Input-Change (mit Debounce)
let saveTimeout;
inputElement.addEventListener('input', () => {
  clearTimeout(saveTimeout);
  saveTimeout = setTimeout(() => {
    autoSaveData();
  }, 1000);
});
```

**3. Fokus auf erstes Eingabefeld**

Beim Öffnen eines Formular-Modals Fokus auf erstes Input setzen (nicht Close-Button):

```javascript
function openFormModal() {
  showModal();

  const firstInput = modalElement.querySelector('input:not([disabled])');
  if (firstInput) {
    firstInput.focus();
  }
}
```

**4. Enter-Taste für Submit**

Standard-Form-Submit per Enter-Taste ermöglichen:

```html
<form onsubmit="handleSubmit(event)">
  <input type="text" name="name" />
  <button type="submit">Speichern</button>
</form>
```

**5. Fehler inline anzeigen**

Validierungsfehler direkt unter fehlerhaftem Feld (nicht Modal schließen):

```html
<div class="form-field">
  <label for="email">E-Mail</label>
  <input
    type="email"
    id="email"
    aria-describedby="email-error"
    aria-invalid="true"
  />
  <span id="email-error" class="form-error">
    Bitte gültige E-Mail-Adresse eingeben.
  </span>
</div>
```

---

## Technische Referenz

### Empfohlene Bibliothek: Radix UI Dialog

**Warum Radix UI:**

- **Vollständige Accessibility** — WAI-ARIA Dialog Pattern implementiert
- **Focus-Management** — Automatischer Focus-Trap und Fokus-Rückkehr
- **ESC-Taste** — Built-in ESC-Key-Handling
- **Portal-Rendering** — Automatisches Rendering außerhalb DOM-Hierarchie
- **Headless** — Bring-your-own-Styles (passt zu Token-System)

**Installation:**

```bash
npm install @radix-ui/react-dialog
```

**Basis-Implementierung:**

```typescript
import * as Dialog from '@radix-ui/react-dialog';

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function Modal({
  open,
  onOpenChange,
  title,
  description,
  size = 'md',
  children
}: ModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        {/* Overlay (Backdrop) */}
        <Dialog.Overlay className="modal-overlay" />

        {/* Modal-Container */}
        <Dialog.Content className={`modal modal--${size}`}>
          {/* Header */}
          <div className="modal__header">
            <Dialog.Title className="modal__title">
              {title}
            </Dialog.Title>
            <Dialog.Close className="modal__close" aria-label="Dialog schließen">
              <svg><!-- X-Icon --></svg>
            </Dialog.Close>
          </div>

          {/* Body */}
          <div className="modal__body">
            {description && (
              <Dialog.Description className="modal__description">
                {description}
              </Dialog.Description>
            )}
            {children}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
```

**CSS für Radix Modal:**

```css
/* Overlay */
.modal-overlay {
  position: fixed;
  inset: 0;
  background-color: var(--modal-overlay-background);
  animation: fadeIn 200ms ease-out;
}

/* Modal-Container */
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--modal-container-background);
  border-radius: var(--modal-container-border-radius);
  padding: var(--modal-container-padding);
  box-shadow: var(--shadow-xl);
  max-height: 90vh;
  overflow-y: auto;
  animation: modalEnter 200ms ease-out;
}

.modal--sm {
  width: 90%;
  max-width: var(--modal-container-max-width-sm);
}

.modal--md {
  width: 90%;
  max-width: var(--modal-container-max-width-md);
}

.modal--lg {
  width: 90%;
  max-width: var(--modal-container-max-width-lg);
}

/* Header */
.modal__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--modal-title-margin-bottom);
}

.modal__title {
  font-size: var(--modal-title-font-size);
  font-weight: var(--modal-title-font-weight);
  color: var(--modal-title-color);
  margin: 0;
}

.modal__close {
  width: var(--modal-close-button-size);
  height: var(--modal-close-button-size);
  padding: 0;
  border: none;
  background: transparent;
  color: var(--modal-close-button-color);
  cursor: pointer;
  border-radius: var(--border-radius-md);
  transition: color 150ms, background-color 150ms;
}

.modal__close:hover {
  color: var(--modal-close-button-hover-color);
  background-color: var(--color-neutral-100);
}

.modal__close:focus-visible {
  outline: 2px solid var(--color-hydrophon-blau-300);
  outline-offset: 2px;
}

/* Body */
.modal__body {
  color: var(--modal-description-color);
}

.modal__description {
  font-size: var(--modal-description-font-size);
  margin-bottom: var(--modal-description-margin-bottom);
}

/* Animationen */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes modalEnter {
  from {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  .modal-overlay,
  .modal {
    animation: none;
  }
}
```

**Verwendung:**

```typescript
function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        Modal öffnen
      </button>

      <Modal
        open={isOpen}
        onOpenChange={setIsOpen}
        title="Artikel löschen?"
        description="Diese Aktion kann nicht rückgängig gemacht werden."
        size="sm"
      >
        <div className="modal__footer">
          <button
            className="button button--secondary"
            onClick={() => setIsOpen(false)}
          >
            Abbrechen
          </button>
          <button
            className="button button--primary button--error"
            onClick={handleDelete}
          >
            Löschen
          </button>
        </div>
      </Modal>
    </>
  );
}
```

### Portal-Rendering

**Problem:** Modal befindet sich tief in DOM-Hierarchie, aber soll über allem erscheinen.

**Lösung:** Portal rendert Modal-Element außerhalb der normalen DOM-Struktur (üblicherweise direkt unter `<body>`).

**React Portal:**

```typescript
import { createPortal } from 'react-dom';

function Modal({ children }) {
  return createPortal(
    <div className="modal-overlay">
      <div className="modal">
        {children}
      </div>
    </div>,
    document.body
  );
}
```

**Radix UI Dialog:** Portal ist bereits eingebaut (`<Dialog.Portal>`).

---

## Anti-Patterns

### ❌ Modal-Overuse

**Problem:** Jede Aktion öffnet ein Modal — Nutzer fühlen sich unterbrochen

**Beispiele:**
- Login in Modal statt dedizierte Seite
- Kontaktformular in Modal statt eigene Seite
- Produktdetails in Modal statt Detailseite

**Alternative:** Modals nur für kritische, kurze Interaktionen. Alles andere auf dedizierte Seiten.

### ❌ Backdrop-Click-Dismissal

**Problem:** Nutzer klickt versehentlich auf Backdrop, Modal schließt, Daten verloren

**Warum verbreitet:** Viele UI-Bibliotheken aktivieren dies standardmäßig

**Alternative:** Nur Close-Button + ESC-Taste als Schließ-Mechanismen

### ❌ Kritische Informationen in Modal

**Problem:** Wichtige Infos in Modal versteckt — schwer wiederzufinden

**Beispiele:**
- AGB in Modal statt dedizierte Seite
- Produktspezifikationen in Modal
- Hilfetext in Modal statt Inline

**Alternative:** Modals nur für temporäre Inhalte. Permanente Infos auf eigene Seiten.

### ❌ Nested Modals (Modal über Modal)

**Problem:** Verwirrend, schwer zu navigieren, Accessibility-Albtraum

**Beispiel:**
```
Modal 1: "Artikel bearbeiten"
  → Nutzer klickt "Kategorie hinzufügen"
    → Modal 2 öffnet über Modal 1
      → Fokus-Management bricht
      → ESC schließt welches Modal?
```

**Alternative:** Workflow umstrukturieren — Multi-Step-Forms, Breadcrumb-Navigation

### ❌ Fehlende ESC-Taste-Unterstützung

**Problem:** WCAG 2.1.2-Verletzung — Keyboard-Nutzer gefangen

**Alternative:** IMMER ESC-Taste implementieren (außer bei kritischen Aktionen mit Bestätigung)

### ❌ Kein Focus-Trap

**Problem:** Tab-Taste navigiert hinter Modal — verwirrend und nicht WCAG-konform

**Alternative:** Focus-Trap implementieren (siehe "Focus-Management" Sektion)

### ❌ Unspezifische Button-Labels

**Problem:** "OK" / "Cancel" sagen nichts über Aktion aus

**Alternative:** Spezifische Labels — "Löschen", "Speichern", "Abbrechen"

---

## Verwandte Komponenten

- **[Tooltips](./tooltip.md)** — Kontextuelle Hilfe für Icons und Buttons
- **[Toasts](./toast.md)** — Nicht-blockierende System-Benachrichtigungen
- **[Mobile Drawer](../navigation/mobile-drawer.md)** — Alternative zu Modal für Navigation

---

## Changelog

| Version | Datum       | Änderungen                                    |
|---------|-------------|-----------------------------------------------|
| 1.0     | 2026-01-29  | Initiale Dokumentation (Modal-Dialoge)       |
