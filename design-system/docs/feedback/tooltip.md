# Tooltip

Tooltips sind kurze, kontextuelle Beschriftungen, die beim Hovern über ein Element erscheinen. Sie liefern zusätzliche Informationen zu Icons, Buttons oder abgeschnittenem Text.

**Anforderungen:** TTP-01 (Hover-Verhalten), TTP-02 (Positionierung), TTP-03 (Barrierefreiheit WCAG 1.4.13)

---

## Uebersicht

Tooltips ergänzen die Benutzeroberfläche mit prägnanten Beschriftungen, die bei Bedarf sichtbar werden. Sie sind ideal für:

- **Icon-Buttons** — Benennung der Funktion (z.B. "Loeschen", "Bearbeiten")
- **Verkuerzter Text** — Vollständiger Text bei abgeschnittenen Überschriften
- **Zusatzinformationen** — Ergänzende Details zu Formularfeldern

**Inhaltsbeschränkung:** 1-5 Wörter pro Tooltip. Tooltips sind keine Hilfetexte oder Erklärungen – nur kurze Labels.

**Beispiele guter Tooltip-Inhalte:**
- "Element loeschen"
- "Als PDF exportieren"
- "Ansicht aktualisieren"
- "In Zwischenablage kopieren"

**Was NICHT in Tooltips gehört:**
- Lange Erklärungen oder Beschreibungen
- Kritische Informationen (nicht auf Touch-Geräten verfügbar)
- Formular-Validierungsfehler (inline anzeigen)
- Aktionsbestätigungen (Toast verwenden)

---

## Verwendung

### Wann Tooltips verwenden

**Icon-Buttons ohne Text:**
Icons allein können mehrdeutig sein. Ein Tooltip stellt sicher, dass die Funktion klar ist.

```html
<button aria-label="Element loeschen">
  <TrashIcon />
  <!-- Tooltip: "Element loeschen" -->
</button>
```

**Abgeschnittener Text:**
Wenn Text aus Platzgründen verkürzt wird (Ellipsis), zeigt der Tooltip den vollständigen Inhalt.

```html
<div class="truncated-text" title="Sehr langer Produktname der nicht in eine Zeile passt">
  Sehr langer Produktname...
</div>
```

**Ergänzende Informationen:**
Zusätzlicher Kontext für Formularfelder oder Einstellungen.

```html
<label>
  Timeout-Dauer
  <InfoIcon aria-label="Weitere Informationen" />
  <!-- Tooltip: "In Sekunden" -->
</label>
```

### Wann KEINE Tooltips verwenden

**Kritische Informationen:**
Tooltips sind auf Touch-Geräten schwer zugänglich. Kritische Infos müssen immer sichtbar oder über andere Mechanismen verfügbar sein.

**Mobile als Primärziel:**
Touch-Geräte haben kein Hover-Ereignis. Tooltips funktionieren dort nur über Fokus (Tippen auf fokussierbares Element).

**Deaktivierte Elemente:**
Deaktivierte Buttons empfangen kein Hover- oder Focus-Ereignis. Alternative: Wrapper-Element mit Tooltip oder Inline-Erklärung.

```html
<!-- Anti-Pattern -->
<button disabled title="Nicht verfuegbar">Speichern</button>

<!-- Besser -->
<div class="tooltip-wrapper" aria-label="Funktion nicht verfuegbar: Formular unvollstaendig">
  <button disabled>Speichern</button>
</div>
```

---

## Design-Token

Alle Tooltip-Eigenschaften sind als Design-Token definiert und in `design-system/tokens/feedback.json` verfügbar.

### Tooltip-Token

| Token                              | Wert             | CSS-Variable                       | Verwendung                              |
|------------------------------------|------------------|------------------------------------|------------------------------------------|
| `tooltip.delay`                    | 300ms            | `--tooltip-delay`                  | Verzoegerung vor dem Anzeigen            |
| `tooltip.background`               | neutral.900      | `--tooltip-background`             | Dunkler Hintergrund für hohen Kontrast   |
| `tooltip.color`                    | neutral.white    | `--tooltip-color`                  | Weisser Text auf dunklem Hintergrund     |
| `tooltip.font-size`                | typography.body.sm.fontSize | `--tooltip-font-size` | Kleine Schriftgroesse (14px)             |
| `tooltip.padding.x`                | spacing.2        | `--tooltip-padding-x`              | Horizontaler Innenabstand (8px)          |
| `tooltip.padding.y`                | spacing.1        | `--tooltip-padding-y`              | Vertikaler Innenabstand (4px)            |
| `tooltip.border-radius`            | radius.sm        | `--tooltip-border-radius`          | Leichte Rundung (2px)                    |
| `tooltip.max-width`                | 200px            | `--tooltip-max-width`              | Maximale Breite vor Umbruch              |
| `tooltip.arrow.size`               | 6px              | `--tooltip-arrow-size`             | Groesse des Pfeil-Indikators             |
| `tooltip.offset`                   | 5px              | `--tooltip-offset`                 | Abstand zum Trigger-Element              |
| `tooltip.z-index`                  | 1100             | `--tooltip-z-index`                | Positionierung ueber anderen Inhalten    |
| `tooltip.animation.duration`       | 150ms            | `--tooltip-animation-duration`     | Ein-/Ausblend-Animation                  |

**CSS-Anwendung:**

```css
.tooltip {
  background-color: var(--tooltip-background);
  color: var(--tooltip-color);
  font-size: var(--tooltip-font-size);
  padding: var(--tooltip-padding-y) var(--tooltip-padding-x);
  border-radius: var(--tooltip-border-radius);
  max-width: var(--tooltip-max-width);
  z-index: var(--tooltip-z-index);
}

.tooltip-arrow {
  width: var(--tooltip-arrow-size);
  height: var(--tooltip-arrow-size);
}
```

---

## Verhalten

### Hover-Trigger mit Verzoegerung

Tooltips erscheinen nach **300ms Hover-Verzoegerung**. Diese kurze Pause verhindert, dass Tooltips bei versehentlichem Überfahren aufblitzen.

**Timing-Logik:**
1. Mauszeiger bewegt sich über Trigger-Element
2. 300ms Wartezeit
3. Tooltip erscheint mit 150ms Fade-in
4. Mauszeiger verlässt Trigger-Element
5. Tooltip verschwindet mit 150ms Fade-out

**Warum 300ms?**
- Zu kurz (<200ms): Tooltips erscheinen bei schneller Mausbewegung ungewollt (Flackern)
- Zu lang (>500ms): Nutzer warten zu lange, wirkt träge
- 300ms: Industriestandard, optimal für Desktop-Nutzung

### Keyboard-Fokus

Tooltips müssen auch über Tastatur-Navigation erreichbar sein (WCAG 2.1.1 Keyboard).

**Fokus-Verhalten:**
- **Tab-Navigation:** Tooltip erscheint sofort bei Focus (keine Verzögerung)
- **ESC-Taste:** Schließt Tooltip
- **Tab weiter:** Tooltip schließt automatisch

```html
<button aria-label="Element loeschen" aria-describedby="delete-tooltip">
  <TrashIcon />
</button>
<div role="tooltip" id="delete-tooltip" hidden>
  Element loeschen
</div>
```

---

## Positionierung

### Bevorzugte Position: Oben

Tooltips werden standardmäßig **oberhalb** des Trigger-Elements positioniert. Diese Position stört den Inhalt darunter nicht und folgt dem natürlichen Lesefluss (von oben nach unten).

**Position-Priorität:**
1. **Top** (Standard) — Oberhalb des Elements
2. **Bottom** — Wenn oben kein Platz (Viewport-Rand)
3. **Left/Right** — Wenn vertikal kein Platz

### Smart Positioning (Collision Detection)

Tooltips müssen am Viewport-Rand automatisch umpositioniert werden, um Abschneiden zu vermeiden.

**Empfohlene Bibliothek: Floating UI**

Floating UI (ehemals Popper.js) ist der moderne Standard für intelligente Positionierung:
- **Automatisches Flipping:** Wechselt die Seite bei Platzmangel
- **Shift-Verhalten:** Verschiebt Tooltip horizontal bei seitlichem Abschneiden
- **Collision Padding:** Mindestabstand zum Viewport-Rand (10px)

**Floating UI Integration:**

```javascript
import { computePosition, flip, shift, offset, arrow } from '@floating-ui/dom';

const triggerElement = document.querySelector('.trigger');
const tooltipElement = document.querySelector('.tooltip');

computePosition(triggerElement, tooltipElement, {
  placement: 'top',
  middleware: [
    offset(5), // 5px Abstand zum Trigger
    flip(), // Flip zu bottom/left/right bei Platzmangel
    shift({ padding: 10 }), // 10px Mindestabstand zum Viewport
    arrow({ element: arrowElement }) // Pfeil-Element
  ]
}).then(({ x, y, placement, middlewareData }) => {
  Object.assign(tooltipElement.style, {
    left: `${x}px`,
    top: `${y}px`,
  });
  
  // Pfeil-Position basierend auf middlewareData.arrow
  const arrowX = middlewareData.arrow.x;
  const arrowY = middlewareData.arrow.y;
  Object.assign(arrowElement.style, {
    left: arrowX != null ? `${arrowX}px` : '',
    top: arrowY != null ? `${arrowY}px` : '',
  });
});
```

### Pfeil-Indikator

Ein kleiner Pfeil (6px) zeigt vom Tooltip zum Trigger-Element und verdeutlicht die Beziehung.

**Pfeil-Rendering (CSS):**

```css
.tooltip-arrow {
  width: var(--tooltip-arrow-size);
  height: var(--tooltip-arrow-size);
  background-color: var(--tooltip-background);
  transform: rotate(45deg);
  position: absolute;
}

.tooltip[data-placement^="top"] .tooltip-arrow {
  bottom: calc(var(--tooltip-arrow-size) / -2);
}

.tooltip[data-placement^="bottom"] .tooltip-arrow {
  top: calc(var(--tooltip-arrow-size) / -2);
}
```

---

## Barrierefreiheit (WCAG 1.4.13)

**WCAG 1.4.13 Content on Hover or Focus** definiert drei Anforderungen für Hover-Inhalte wie Tooltips:

### 1. Dismissible (Schliessbar)

Nutzer müssen Tooltips ohne Mausbewegung schließen können.

**Lösung:** ESC-Taste schließt Tooltip.

```javascript
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeTooltip();
  }
});
```

### 2. Hoverable (Hover-faehig)

Der Tooltip-Inhalt selbst muss hoverbar sein. Nutzer müssen mit der Maus über den Tooltip fahren können, ohne dass er verschwindet.

**Problem:** Wenn Tooltip nur beim Hover des Triggers sichtbar ist, verschwindet er beim Verlassen des Triggers.

**Lösung:** Tooltip bleibt sichtbar, solange Maus über Trigger ODER Tooltip ist.

```javascript
let isHoveringTrigger = false;
let isHoveringTooltip = false;

triggerElement.addEventListener('mouseenter', () => {
  isHoveringTrigger = true;
  showTooltip();
});

triggerElement.addEventListener('mouseleave', () => {
  isHoveringTrigger = false;
  setTimeout(() => {
    if (!isHoveringTooltip) {
      hideTooltip();
    }
  }, 100);
});

tooltipElement.addEventListener('mouseenter', () => {
  isHoveringTooltip = true;
});

tooltipElement.addEventListener('mouseleave', () => {
  isHoveringTooltip = false;
  if (!isHoveringTrigger) {
    hideTooltip();
  }
});
```

### 3. Persistent (Bestaendig)

Tooltip bleibt sichtbar, bis Nutzer den Hover beendet oder ESC drückt. Kein automatisches Ausblenden nach Zeit.

**Umsetzung:** Keine Auto-Dismiss-Timer für Tooltips (im Gegensatz zu Toasts).

### ARIA-Attribute

Für Screenreader-Unterstützung:

```html
<!-- Methode 1: aria-label auf Trigger (einfach) -->
<button aria-label="Element loeschen">
  <TrashIcon />
</button>

<!-- Methode 2: aria-describedby + role="tooltip" (detailliert) -->
<button aria-describedby="delete-tooltip-id">
  <TrashIcon />
</button>
<div role="tooltip" id="delete-tooltip-id" hidden>
  Element loeschen
</div>
```

**Empfehlung:** Methode 1 für einfache Labels, Methode 2 für komplexere Tooltips mit dynamischem Inhalt.

---

## Code-Beispiele

### Radix UI Tooltip (empfohlen)

Radix UI liefert eine barrierefreie Tooltip-Primitive, die alle WCAG-Anforderungen erfüllt.

**Installation:**

```bash
npm install @radix-ui/react-tooltip
```

**Verwendung:**

```jsx
import * as Tooltip from '@radix-ui/react-tooltip';

export function IconButton() {
  return (
    <Tooltip.Provider delayDuration={300}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <button className="icon-button" aria-label="Element loeschen">
            <TrashIcon />
          </button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="tooltip"
            sideOffset={5}
            side="top"
            collisionPadding={10}
            avoidCollisions={true}
          >
            Element loeschen
            <Tooltip.Arrow className="tooltip-arrow" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
```

**Radix UI Features:**
- ✅ 300ms Delay konfigurierbar (`delayDuration`)
- ✅ Smart Positioning (`side`, `avoidCollisions`, `collisionPadding`)
- ✅ WCAG 1.4.13 konform (hoverable, dismissible, persistent)
- ✅ Keyboard-Zugriff automatisch (Focus zeigt Tooltip)
- ✅ ESC-Taste schließt Tooltip
- ✅ Portal-Rendering (Z-Index-Probleme vermeiden)

**Styling:**

```css
.tooltip {
  background-color: var(--tooltip-background);
  color: var(--tooltip-color);
  font-size: var(--tooltip-font-size);
  padding: var(--tooltip-padding-y) var(--tooltip-padding-x);
  border-radius: var(--tooltip-border-radius);
  max-width: var(--tooltip-max-width);
  z-index: var(--tooltip-z-index);
  animation: fadeIn var(--tooltip-animation-duration) ease-out;
}

.tooltip-arrow {
  fill: var(--tooltip-background);
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}
```

---

## Anti-Patterns

### ❌ Tooltips auf deaktivierten Elementen

**Problem:** Deaktivierte Elemente empfangen keine Mouse- oder Focus-Events.

**Falsch:**
```html
<button disabled title="Funktion nicht verfuegbar">
  Speichern
</button>
```

**Richtig:** Wrapper-Element mit Tooltip:
```html
<div class="tooltip-wrapper" aria-label="Speichern nicht moeglich: Formular unvollstaendig">
  <button disabled>Speichern</button>
</div>
```

---

### ❌ Kritische Informationen im Tooltip

**Problem:** Tooltips sind auf Touch-Geräten schwer zugänglich und werden leicht übersehen.

**Falsch:**
```html
<button aria-label="Loeschen">
  <TrashIcon />
  <!-- Tooltip: "Achtung: Diese Aktion kann nicht rueckgaengig gemacht werden" -->
</button>
```

**Richtig:** Kritische Info inline oder in Bestätigungs-Modal:
```html
<button aria-label="Loeschen" onClick={showConfirmDialog}>
  <TrashIcon />
</button>

<!-- Modal -->
<Dialog>
  <h2>Element loeschen?</h2>
  <p>Diese Aktion kann nicht rueckgaengig gemacht werden.</p>
  <button>Loeschen</button>
  <button>Abbrechen</button>
</Dialog>
```

---

### ❌ Lange Texte im Tooltip

**Problem:** Tooltips sind für kurze Labels gedacht, nicht für Erklärungen.

**Falsch:**
```html
<InfoIcon aria-label="Weitere Informationen" />
<!-- Tooltip: "Die Timeout-Dauer bestimmt, wie lange das System auf eine Antwort wartet, bevor die Verbindung getrennt wird. Werte zwischen 30 und 300 Sekunden sind empfohlen." -->
```

**Richtig:** Kurzes Label + ausklappbare Hilfe:
```html
<label>
  Timeout-Dauer
  <button aria-expanded="false" aria-controls="timeout-help">
    <InfoIcon />
    <!-- Tooltip: "Weitere Informationen" -->
  </button>
</label>
<div id="timeout-help" hidden>
  <p>Die Timeout-Dauer bestimmt, wie lange das System auf eine Antwort wartet...</p>
</div>
```

---

### ❌ Automatisches Ausblenden nach Zeit

**Problem:** Verstößt gegen WCAG 1.4.13 (Persistent). Nutzer müssen Zeit haben, Tooltip zu lesen.

**Falsch:**
```javascript
setTimeout(() => {
  hideTooltip();
}, 3000); // Auto-Hide nach 3 Sekunden
```

**Richtig:** Tooltip bleibt sichtbar bis Hover/Focus endet:
```javascript
// Kein Timer - nur bei mouseleave/blur schließen
triggerElement.addEventListener('mouseleave', hideTooltip);
triggerElement.addEventListener('blur', hideTooltip);
```

---

## Zusammenfassung

**Tooltip Best Practices:**

✅ **Kurz halten:** 1-5 Wörter, keine langen Erklärungen  
✅ **300ms Delay:** Verhindert ungewolltes Aufblitzen  
✅ **Smart Positioning:** Floating UI für automatisches Flipping  
✅ **WCAG 1.4.13:** Hoverable, Dismissible, Persistent  
✅ **Keyboard-Zugriff:** Fokus zeigt Tooltip sofort  
✅ **Radix UI:** Empfohlene Bibliothek für barrierefreie Implementierung  

❌ **Nicht verwenden für:** Kritische Infos, lange Texte, deaktivierte Elemente, mobile Primärziele

---

**Siehe auch:**
- [Toast-Benachrichtigungen](toast.md) — Für Aktionsbestätigungen
- [Buttons](../buttons.md) — Icon-Button-Muster
- [Forms](../forms/labels-helper-text.md) — Formular-Hilfe inline

---

*Zuletzt aktualisiert: 2026-01-29*
