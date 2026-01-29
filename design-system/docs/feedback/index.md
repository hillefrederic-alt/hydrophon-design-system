# Feedback & Systemrueckmeldungen

Vollstaendiges Feedback-System fuer Benutzerinteraktionen mit Fokus auf Klarheit und Barrierefreiheit.

## Uebersicht

Dieses Kapitel dokumentiert alle Feedback-Komponenten des Hydrophon Design Systems. Feedback-Komponenten kommunizieren Systemzustaende, bestaetigen Nutzeraktionen und leiten durch komplexe Interaktionen.

**Kernprinzip:** Feedback sollte **nicht-aufdringlich** sein – es unterstuetzt Nutzer, statt sie zu unterbrechen.

### Design-Philosophie

**1. Hierarchie der Aufmerksamkeit**

Nicht jedes Feedback ist gleich wichtig. Unsere Komponenten folgen einer klaren Hierarchie:

| Komponente | Aufmerksamkeit | Verwendung |
|------------|----------------|------------|
| **Modal** | Hoch (blockierend) | Destruktive Aktionen, wichtige Entscheidungen |
| **Toast** | Mittel (sichtbar, nicht blockierend) | Aktionsbestaetigung, Fehler mit Retry |
| **Tooltip** | Niedrig (bei Bedarf) | Kontextuelle Labels, Erklaerungen |
| **Loading** | Kontextabhaengig | Fortschritt, Ladezustaende |

**2. Non-Intrusive Feedback**

- Feedback stoert den Workflow nicht unnoetig
- Toasts statt Modals wo moeglich
- Inline-Feedback (Formular-Validierung) vor globalen Meldungen
- Optimistic UI fuer schnelle gefuehlte Performance

**3. Accessibility First**

Alle Feedback-Komponenten erfuellen **WCAG 2.1 AA**:

- ARIA-Attribute fuer Screenreader
- Tastatur-Navigation
- prefers-reduced-motion Unterstuetzung
- Farbunabhaengige visuelle Indikatoren

## Komponenten

### Modal-Dialoge

**Zweck:** Fokussierte Interaktionen, die volle Aufmerksamkeit erfordern

**Dokumentation:** *(Link wird in Plan 05-01 erstellt)*

**Verwendung:**

- **Bestaetigungsdialoge:** "Wirklich loeschen?" mit Ja/Abbrechen
- **Formulare:** Kontaktformular, Benutzer anlegen
- **Informationsdialoge:** Datenschutzhinweis, Willkommensnachricht

**Eigenschaften:**

- Drei Groessen (sm/md/lg)
- ESC-Key + Close-Button (X)
- KEIN Backdrop-Click (verhindert versehentliches Schliessen)
- Focus-Trap Pattern
- Overlay mit halbtransparentem Schwarz
- Zentrale Positionierung

**Wann NICHT verwenden:**

- Einfache Bestaetigung (verwende Toast)
- Nicht-kritische Info (verwende Tooltip)
- Haeufige Aktionen (zu stoerend)

---

### Tooltips

**Zweck:** Kurze kontextuelle Labels fuer Icons und Buttons

**Dokumentation:** *(Link wird in Plan 05-02 erstellt)*

**Verwendung:**

- Icon-Button-Labels ("Loeschen", "Bearbeiten", "Exportieren")
- Kurze Erklaerungen (1-5 Woerter)
- Supplemental Info (nicht kritisch)

**Eigenschaften:**

- Hover-Trigger (~300ms Delay)
- Smart Positioning (top bevorzugt, flipped bei Viewport-Edge)
- Pfeil-Indikator zeigt auf Trigger-Element
- Dunkler Hintergrund (neutral.900), weisser Text
- Nicht fuer Touch-Geraete (keine kritischen Infos)

**Wann NICHT verwenden:**

- Kritische Informationen (immer sichtbar machen)
- Lange Erklaerungen (verwende Helptext oder Modal)
- Mobile-First Content (Tooltips auf Touch schwierig)

---

### Toast-Benachrichtigungen

**Zweck:** Nicht-blockierende Bestaetigung von Aktionen

**Dokumentation:** *(Link wird in Plan 05-02 erstellt)*

**Verwendung:**

- Erfolgsbestaetigung ("Aenderungen gespeichert")
- Fehler mit Retry-Option ("Upload fehlgeschlagen – Erneut versuchen")
- Info-Meldungen ("Neue Nachricht erhalten")
- Warnungen ("Verbindung instabil")

**Eigenschaften:**

- Position: Top-Right
- Auto-Dismiss nach Schweregrad:
  - Success: 3s
  - Info: 4s
  - Warning: 5s
  - Error: Manuell (bleibt bis geschlossen)
- 1-2 Action-Buttons (Undo, Retry, Details)
- Stacken vertikal (max 4 gleichzeitig)

**Wann NICHT verwenden:**

- Formular-Validierungsfehler (inline statt Toast)
- Kritische Entscheidungen (Modal statt Toast)
- Sehr haeufige Meldungen (stoeren Workflow)

---

### Ladezustaende

**Zweck:** Nutzer waehrend asynchroner Operationen informiert halten

**Dokumentation:** [loading.md](./loading.md)

**Drei Arten:**

1. **Spinner** – Kurze unbestimmte Aktionen (<3s)
2. **Progress Bar** – Laengere Aktionen mit bekannter/unbekannter Dauer
3. **Skeleton Screens** – Content-Laden (Cards, Tabellen, Listen)

**Verwendung:**

| Kontext | Dauer | Indikator | Beispiel |
|---------|-------|-----------|----------|
| Button-Aktion | <1s | Spinner (delayed) | Formular absenden |
| API-Call | 1-3s | Spinner (immediate) | Daten laden |
| Upload | >3s, bekannt | Progress Bar (determinate) | Datei hochladen |
| Verarbeitung | >3s, unbekannt | Progress Bar (indeterminate) | PDF generieren |
| Content-Laden | Beliebig | Skeleton Screen | Produktkarten |

**Eigenschaften:**

- Spinner: 4 Groessen (sm/md/lg/xl), 200ms Delay gegen Flash
- Progress Bar: Native `<progress>` Element, determinate/indeterminate
- Skeleton: react-loading-skeleton, matcht finales Layout exakt
- Optimistic UI fuer Like/Save-Aktionen
- prefers-reduced-motion Unterstuetzung

**Wann welchen Indikator:**

- **Spinner:** "Ich arbeite daran" (unbestimmt)
- **Progress Bar:** "Ich bin zu X% fertig" (bestimmt) oder "Ich arbeite, weiss aber nicht wie lange" (unbestimmt)
- **Skeleton:** "So wird der Content aussehen" (Struktur-Vorschau)

---

## Wann welche Komponente

Entscheidungsmatrix fuer Feedback-Komponenten:

| Use Case | Komponente | Begruendung |
|----------|------------|-------------|
| Destruktive Aktion bestaetigen (Loeschen) | **Modal** | Volle Aufmerksamkeit noetig, verhindert Fehler |
| Aenderungen gespeichert | **Toast (Success)** | Bestaetigung ohne Unterbrechung |
| Upload fehlgeschlagen | **Toast (Error) + Retry** | Nicht-blockierend, bietet Loesung |
| Icon-Button erklaeren | **Tooltip** | Kurzes Label bei Bedarf |
| Formular mit Fehler | **Inline Error + Icon** | Nah am Problem, nicht global |
| Seite laedt | **Skeleton Screen** | Zeigt Struktur, vermeidet Layout Shift |
| Button-Aktion verarbeiten | **Spinner (delayed)** | Zeigt Aktivitaet, vermeidet Flash |
| Datei hochladen | **Progress Bar (determinate)** | Zeigt Fortschritt, beruhigt User |
| Komplexes Formular | **Modal** | Fokussierte Eingabe ohne Ablenkung |
| Hilfetext zu Eingabefeld | **Helper Text (inline)** | Immer sichtbar, nicht versteckt |
| "Erfolgreich angelegt" | **Toast (Success) + Redirect** | Kurze Bestaetigung, dann weiter |
| Verbindungsfehler | **Toast (Error) + Retry** | Persistent bis Loesung |

### Entscheidungsbaum

```
Braucht Nutzer sofortige Entscheidung zu treffen?
├─ Ja → Ist Aktion destruktiv/kritisch?
│  ├─ Ja → MODAL (Bestaetigungsdialog)
│  └─ Nein → TOAST mit Action-Buttons
└─ Nein → Ist es eine Bestaetigung?
   ├─ Ja → TOAST (Auto-Dismiss)
   └─ Nein → Ist es kontextuelle Info?
      ├─ Ja → TOOLTIP (bei Hover)
      └─ Nein → Ist System am Laden?
         ├─ Ja → LOADING (Spinner/Progress/Skeleton)
         └─ Sonst → Inline-Feedback (Text/Icon)
```

## Gemeinsame Prinzipien

Alle Feedback-Komponenten teilen diese Design-Prinzipien:

### 1. Klarheit

**Feedback muss eindeutig sein:**

- Erfolg → Gruen + Checkmark + "Gespeichert"
- Fehler → Rot + X + "Fehler: [was schiefging]" + "Wie beheben"
- Warning → Gelb + Alert-Icon + "Achtung: [was beachten]"
- Info → Blau + Info-Icon + "Hinweis: [zusaetzliche Info]"

**Nicht nur Farbe:** Immer Icon + Text kombinieren (WCAG 1.4.1).

### 2. Timing

**Auto-Dismiss-Regeln:**

| Typ | Dauer | Begruendung |
|-----|-------|-------------|
| Success | 3s | Kurz – Nutzer weiss, was passiert ist |
| Info | 4s | Etwas laenger – evtl. neue Info zu lesen |
| Warning | 5s | Laenger – Nutzer soll aufmerksam werden |
| Error | Manuell | Bleibt bis geschlossen – Nutzer muss reagieren |

**Verzoegerung (Delay):**

- Spinner: 200ms Delay (vermeidet Flash bei schnellen Ops)
- Tooltip: 300ms Delay (vermeidet versehentliches Triggern)

### 3. Konsistente Positionierung

**Modals:** Zentriert (vertikal & horizontal)
**Toasts:** Top-Right (nicht blockierend, konsistent mit Desktop-Apps)
**Tooltips:** Smart Positioning (Preferenz: oben, flipped bei Bedarf)
**Loading:**

- Inline-Spinner: Im Button/Container selbst
- Page-Spinner: Zentriert ueber Content
- Skeleton: Ersetzt Content-Bereich 1:1

### 4. Animation

**Einheitliche Animations-Dauer:**

- Modal: 200ms (ease-out)
- Toast: Slide + Fade (Sonner default)
- Tooltip: Fade 150ms (schnell, nicht stoerend)
- Spinner: 750ms Rotation (linear)
- Skeleton Shimmer: 1.5s (ease-in-out)

**prefers-reduced-motion:**

Alle Animationen haben Fallback fuer Nutzer mit Bewegungsempfindlichkeit:

```css
@media (prefers-reduced-motion: reduce) {
  .modal {
    animation: none;
    opacity: 1; /* Sofort sichtbar */
  }

  .spinner {
    animation: none;
    opacity: 0.5; /* Statisch, halbtransparent */
  }
}
```

### 5. Barrierefreiheit

**ARIA-Patterns:**

- Modals: `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, Focus-Trap
- Toasts: `role="status"` (Success/Info) oder `role="alert"` (Error/Warning), `aria-live="polite"`
- Tooltips: `role="tooltip"`, `aria-describedby` Verknuepfung
- Loading: `role="status"`, `aria-live="polite"`, `aria-busy="true"`

**Tastatur-Navigation:**

- Modal: Tab-Cycling innerhalb, ESC schliesst
- Toast: Fokussierbar, Space/Enter fuer Action-Buttons
- Tooltip: Fokussierbar via Keyboard (nicht nur Hover)
- Spinner: Nicht fokussierbar (Container hat focus)

**Screenreader-Ansagen:**

- Modal-Oeffnen: Focus auf ersten Heading/Close-Button
- Toast: Live-Region kuendigt Inhalt an
- Loading-Abschluss: "X Produkte geladen" Ansage
- Error: Alert-Region zieht sofort Aufmerksamkeit

## Integration

Alle Feedback-Komponenten verwenden Token aus `design-system/tokens/feedback.json`:

```javascript
import tokens from '../design-system/build/json/tokens.json';

// Modal-Sizing
const modalWidth = tokens.modal.size.md.width.$value; // "600px"

// Toast-Duration
const toastDuration = tokens.toast.duration.success.$value; // "3000ms"

// Spinner-Size
const spinnerSize = tokens.spinner.size.md.$value; // "24px"

// Skeleton-Colors
const skeletonBase = tokens.skeleton['base-color'].$value; // "#e5e5e5"
```

**CSS Custom Properties:**

Alle Tokens werden von Style Dictionary zu CSS-Variablen kompiliert:

```css
.modal {
  width: var(--modal-size-md-width);
  padding: var(--modal-content-padding-x) var(--modal-content-padding-y);
  border-radius: var(--modal-content-border-radius);
  box-shadow: var(--modal-content-shadow);
}

.toast-success {
  border-left: 4px solid var(--toast-border-success);
  padding: var(--toast-container-padding);
}

.spinner-md {
  width: var(--spinner-size-md);
  height: var(--spinner-size-md);
  border-width: var(--spinner-stroke-width);
  animation-duration: var(--spinner-animation-duration);
}
```

## Best Practices

### Do's

- **Modal fuer kritische Entscheidungen** (Loeschen, Verwerfen, Verlassen)
- **Toast fuer Aktionsbestaetigung** (Gespeichert, Geloescht mit Undo)
- **Tooltip fuer Icon-Labels** (kurz, supplemental)
- **Skeleton fuer Content-Laden** (zeigt Struktur, vermeidet Shift)
- **Spinner mit 200ms Delay** (vermeidet Flash)
- **Progress Bar fuer lange Ops** (Upload, Download, Processing)
- **Optimistic UI fuer Like/Save** (sofortiges Feedback)
- **Error mit Retry-Button** (gibt Nutzer Kontrolle)
- **prefers-reduced-motion** (immer implementieren)

### Don'ts

- **Kein Modal fuer Simple Bestaetigung** (Toast reicht)
- **Kein Toast fuer Formular-Fehler** (Inline Error am Field)
- **Kein Tooltip fuer kritische Info** (immer sichtbar machen)
- **Kein Backdrop-Click** (versehentliches Schliessen)
- **Keine Auto-Dismiss Errors** (Nutzer muss lesen koennen)
- **Kein Spinner ohne Delay** (Flash-Problem)
- **Keine Hardcoded Skeleton-Groessen** (Layout Shift)
- **Kein Optimistic UI fuer Destruktive Aktionen** (zu riskant)
- **Keine Animationen ohne prefers-reduced-motion Fallback**

## Verwandte Phasen

### Phase 1: Foundation & Brand Identity

- Farben (Success/Error/Warning/Info) → Feedback-Farben
- Typografie → Modal/Toast Schriftgroessen
- Spacing → Padding/Margins in Feedback-Komponenten

### Phase 2: Icons & Basic Interactions

- Icons → Toast Icons (Check, X, Alert, Info)
- Button-System → Modal Action-Buttons, Toast Action-Buttons

### Phase 3: Forms & Data Input

- Form-Validierung → Toast Error-Pattern
- Input States → Konsistente Error-Darstellung

### Phase 4: Navigation & Content Structure

- Cards → Skeleton Patterns (ProductCardSkeleton)
- Tables → Skeleton Patterns (TableSkeleton)
- Focus-Trap → Modal Focus-Management

## Weiterfuehrende Ressourcen

### WCAG Guidelines

- [WCAG 2.1.2 - No Keyboard Trap](https://www.w3.org/WAI/WCAG21/Understanding/no-keyboard-trap.html)
- [WCAG 1.4.1 - Use of Color](https://www.w3.org/WAI/WCAG21/Understanding/use-of-color.html)
- [WCAG 1.4.13 - Content on Hover or Focus](https://www.w3.org/WAI/WCAG21/Understanding/content-on-hover-or-focus.html)
- [WCAG 2.2.4 - Interruptions](https://www.w3.org/WAI/WCAG21/Understanding/interruptions.html)

### ARIA Patterns

- [ARIA: Dialog (Modal) Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)
- [ARIA: Tooltip Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/)
- [ARIA: Alert Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/alert/)
- [ARIA: Status Role](https://www.w3.org/TR/wai-aria-1.1/#status)

### Libraries

- [Radix UI Primitives](https://www.radix-ui.com/primitives) – Headless UI fuer Modal/Tooltip
- [Sonner](https://sonner.emilkowal.ski/) – Modern Toast Library
- [react-loading-skeleton](https://www.npmjs.com/package/react-loading-skeleton) – Auto-sizing Skeleton Screens

### Articles

- [Nielsen Norman: Progress Indicators](https://www.nngroup.com/articles/progress-indicators/)
- [Smashing Magazine: Skeleton Screens](https://www.smashingmagazine.com/2020/04/skeleton-screens-react/)
- [Web.dev: Optimistic UI](https://web.dev/articles/optimistic-ui)

---

**Phase 5 abgeschlossen:** Feedback & System Responses vollstaendig dokumentiert mit 4 Komponenten (Modal, Tooltip, Toast, Loading) und 150+ Tokens.

**Letzte Aktualisierung:** 2026-01-29
**Version:** 1.0
