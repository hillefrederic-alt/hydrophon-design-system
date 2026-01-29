# Toast-Benachrichtigungen

Toast-Benachrichtigungen sind nicht-blockierende Rückmeldungen, die abgeschlossene Aktionen bestätigen, Systemzustände kommunizieren und wichtige Ereignisse melden.

**Anforderungen:** TST-01 (Toast-Varianten), TST-02 (Timing), TST-03 (Positionierung), TST-04 (Aktions-Buttons)

---

## Uebersicht

Toasts erscheinen temporär am Bildschirmrand, um Nutzer*innen über den Status von Aktionen zu informieren, ohne den aktuellen Workflow zu unterbrechen.

**Charakteristika:**
- **Nicht-blockierend:** Nutzer können weiterarbeiten, während Toast sichtbar ist
- **Automatisches Schliessen:** Success/Info/Warning verschwinden nach festgelegter Zeit
- **Top-Right Position:** Konsistent mit Desktop-Anwendungen, stört Hauptinhalt nicht
- **Severity-basiert:** Vier Varianten (Success, Info, Warning, Error) mit unterschiedlichem Timing

**Verwendungszwecke:**
- Aktionsbestätigungen ("Aenderungen gespeichert")
- Systemmeldungen ("Neue Nachricht eingegangen")
- Warnungen ("Verbindung instabil")
- Fehlerbenachrichtigungen ("Fehler beim Speichern")

**Abgrenzung:**
- **Nicht für Formular-Validierung:** Fehler direkt am Eingabefeld anzeigen (Phase 3)
- **Nicht für kritische Entscheidungen:** Modal-Dialoge verwenden (Phase 5)
- **Nicht für permanente Infos:** Inline-Meldungen oder Banner verwenden

---

## Varianten

### Success (Erfolg)

**Verwendung:** Bestätigung erfolgreicher Aktionen.

**Visuell:**
- Hellgrüner Hintergrund (success.50: #f0fdf4)
- Grüner Rahmen (success.200: #bbf7d0)
- Grünes Icon (success.600: #16a34a)
- Dunkelgrüner Text (success.800: #166534)

**Timing:** Automatische Schließung nach **3 Sekunden**

**Beispiele (Deutsch):**
- "Aenderungen gespeichert"
- "Element erfolgreich geloescht"
- "Datei hochgeladen"
- "Einstellungen aktualisiert"
- "Nachricht gesendet"

**Mit Undo-Aktion:**
```javascript
toast.success('Element geloescht', {
  action: {
    label: 'Rueckgaengig',
    onClick: () => undoDelete(),
  },
});
```

---

### Info (Information)

**Verwendung:** Neutrale Informationen und System-Updates.

**Visuell:**
- Hellblauer Hintergrund (info.50: #eff6ff)
- Blauer Rahmen (info.200: #bfdbfe)
- Blaues Icon (info.600: #2563eb)
- Dunkelblauer Text (info.800: #1e40af)

**Timing:** Automatische Schließung nach **4 Sekunden**

**Beispiele (Deutsch):**
- "Neue Nachricht eingegangen"
- "Update verfuegbar"
- "Synchronisierung abgeschlossen"
- "Export wird vorbereitet"
- "Sitzung laeuft in 5 Minuten ab"

---

### Warning (Warnung)

**Verwendung:** Wichtige Hinweise, die Aufmerksamkeit erfordern, aber nicht kritisch sind.

**Visuell:**
- Hellgelber Hintergrund (warning.50: #fffbeb)
- Gelber Rahmen (warning.200: #fde68a)
- Oranges Icon (warning.600: #d97706)
- Dunkelorange Text (warning.800: #92400e)

**Timing:** Automatische Schließung nach **5 Sekunden**

**Beispiele (Deutsch):**
- "Verbindung instabil"
- "Speicherplatz wird knapp"
- "Ungespeicherte Aenderungen vorhanden"
- "Browser-Version veraltet"
- "Zeitlimit bald erreicht"

---

### Error (Fehler)

**Verwendung:** Fehler und kritische Probleme, die sofortige Aufmerksamkeit benötigen.

**Visuell:**
- Hellroter Hintergrund (error.50: #fef2f2)
- Roter Rahmen (error.200: #fecaca)
- Rotes Icon (error.600: #dc2626)
- Dunkelroter Text (error.800: #991b1b)

**Timing:** **Bleibt sichtbar bis manuell geschlossen** (duration: 0ms)

**Rationale:** Fehler erfordern Nutzeraktion oder -kenntnisnahme. Automatisches Schließen könnte dazu führen, dass kritische Fehler übersehen werden.

**Beispiele (Deutsch):**
- "Fehler beim Speichern. Bitte erneut versuchen."
- "Verbindung zum Server verloren"
- "Datei konnte nicht hochgeladen werden"
- "Ungueltige Daten. Bitte pruefen."
- "Authentifizierung fehlgeschlagen"

**Mit Retry-Aktion:**
```javascript
toast.error('Fehler beim Laden', {
  action: {
    label: 'Erneut versuchen',
    onClick: () => retryLoad(),
  },
});
```

---

## Design-Token

Alle Toast-Eigenschaften sind als Design-Token definiert und in `design-system/tokens/feedback.json` verfügbar.

### Layout-Token

| Token                              | Wert             | CSS-Variable                       | Verwendung                              |
|------------------------------------|------------------|------------------------------------|------------------------------------------|
| `toast.position.top`               | spacing.4        | `--toast-position-top`             | Abstand vom oberen Bildschirmrand (16px) |
| `toast.position.right`             | spacing.4        | `--toast-position-right`           | Abstand vom rechten Bildschirmrand (16px)|
| `toast.width`                      | 360px            | `--toast-width`                    | Standardbreite für Toasts                |
| `toast.max-width`                  | calc(100vw - 32px) | `--toast-max-width`              | Responsive maximale Breite               |
| `toast.padding.x`                  | spacing.4        | `--toast-padding-x`                | Horizontaler Innenabstand (16px)         |
| `toast.padding.y`                  | spacing.3        | `--toast-padding-y`                | Vertikaler Innenabstand (12px)           |
| `toast.border-radius`              | radius.lg        | `--toast-border-radius`            | Eckenradius (8px)                        |
| `toast.shadow`                     | shadow.lg        | `--toast-shadow`                   | Schatten für Elevation                   |
| `toast.gap`                        | spacing.3        | `--toast-gap`                      | Abstand zwischen Icon und Text (12px)    |
| `toast.stack-gap`                  | spacing.2        | `--toast-stack-gap`                | Abstand zwischen gestapelten Toasts (8px)|
| `toast.max-visible`                | 4                | `--toast-max-visible`              | Maximale Anzahl gleichzeitig sichtbar    |
| `toast.z-index`                    | 1200             | `--toast-z-index`                  | Z-Index für Positionierung               |

### Timing-Token

| Token                              | Wert             | CSS-Variable                       | Verwendung                              |
|------------------------------------|------------------|------------------------------------|------------------------------------------|
| `toast.duration.success`           | 3000ms           | `--toast-duration-success`         | Auto-Dismiss nach 3 Sekunden             |
| `toast.duration.info`              | 4000ms           | `--toast-duration-info`            | Auto-Dismiss nach 4 Sekunden             |
| `toast.duration.warning`           | 5000ms           | `--toast-duration-warning`         | Auto-Dismiss nach 5 Sekunden             |
| `toast.duration.error`             | 0ms              | `--toast-duration-error`           | Bleibt bis manuell geschlossen           |
| `toast.animation.enter-duration`   | 200ms            | `--toast-animation-enter-duration` | Einblend-Animation                       |
| `toast.animation.exit-duration`    | 150ms            | `--toast-animation-exit-duration`  | Ausblend-Animation                       |

### Varianten-Token (Success)

| Token                              | Wert             | CSS-Variable                          | Verwendung                              |
|------------------------------------|------------------|---------------------------------------|-----------------------------------------|
| `toast.variant.success.background` | color.success.50 | `--toast-variant-success-background`  | Hellgrüner Hintergrund                  |
| `toast.variant.success.border`     | color.success.200| `--toast-variant-success-border`      | Grüner Rahmen                           |
| `toast.variant.success.icon-color` | color.success.600| `--toast-variant-success-icon-color`  | Grünes Icon                             |
| `toast.variant.success.text-color` | color.success.800| `--toast-variant-success-text-color`  | Dunkelgrüner Text                       |

*Info, Warning, Error folgen demselben Muster mit jeweiligen Farben.*

### Aktions-Token

| Token                              | Wert             | CSS-Variable                       | Verwendung                              |
|------------------------------------|------------------|------------------------------------|------------------------------------------|
| `toast.action.font-size`           | fontSize.sm      | `--toast-action-font-size`         | Schriftgröße für Aktions-Buttons (14px)  |
| `toast.action.font-weight`         | fontWeight.medium| `--toast-action-font-weight`       | Schriftgewicht für Aktions-Buttons       |
| `toast.close-button.size`          | 24px             | `--toast-close-button-size`        | Größe des Schließen-Buttons              |
| `toast.close-button.icon-size`     | 16px             | `--toast-close-button-icon-size`   | Größe des X-Icons                        |

---

## Positionierung

### Top-Right Corner

Toasts erscheinen in der **oberen rechten Ecke** des Viewports:
- **16px Abstand von oben** (toast.position.top)
- **16px Abstand von rechts** (toast.position.right)

**Rationale:**
- Industriestandard für Desktop-Anwendungen
- Stört den Hauptinhalt nicht (meist links/mittig)
- Konsistent mit natürlichem Blickverlauf (oben rechts = sekundäre Info)
- Zugänglich auf allen Bildschirmgrößen

**CSS-Positionierung:**

```css
.toast-container {
  position: fixed;
  top: var(--toast-position-top);
  right: var(--toast-position-right);
  z-index: var(--toast-z-index);
  display: flex;
  flex-direction: column;
  gap: var(--toast-stack-gap);
}
```

---

## Timing

### Severity-basierte Auto-Dismiss

Die Anzeigedauer variiert je nach Schweregrad der Nachricht:

| Variante | Dauer | Rationale |
|----------|-------|-----------|
| Success  | 3s    | Bestätigung schnell erkannt, kurze Verweildauer ausreichend |
| Info     | 4s    | Neutrale Info, etwas mehr Lesezeit |
| Warning  | 5s    | Wichtiger Hinweis, mehr Zeit zum Verstehen |
| Error    | ∞     | Kritisch, bleibt bis Nutzer aktiv schließt |

**Warum Error nicht auto-dismissed wird:**
- Fehler erfordern oft Nutzeraktion (z.B. "Erneut versuchen")
- Automatisches Schließen könnte zu übersehenen Fehlern führen
- Nutzer brauchen Zeit, Fehlertext zu lesen und zu verstehen
- WCAG-konform: Kritische Infos nicht zeitbeschränkt

**Pause-on-Hover:**
Toasts pausieren den Auto-Dismiss-Timer bei Hover, damit Nutzer Zeit haben, den Text zu lesen oder Aktions-Buttons zu klicken.

---

## Stacking-Verhalten

### Vertikale Stapelung

Mehrere Toasts werden vertikal gestapelt:
- **Neueste oben:** Neue Toasts erscheinen oberhalb bestehender
- **8px Abstand:** Zwischen gestapelten Toasts (toast.stack-gap)
- **Maximale Anzahl:** 4 gleichzeitig sichtbar (toast.max-visible)

**Verhalten bei Limit-Überschreitung:**
Wenn ein 5. Toast erscheint, wird der **älteste Toast automatisch geschlossen** (FIFO - First In, First Out).

**Beispiel-Reihenfolge:**

```
┌─────────────────────────┐
│ 4. Neueste Toast        │ ← Gerade erschienen
└─────────────────────────┘
        ⬇ 8px Gap
┌─────────────────────────┐
│ 3. Toast                │
└─────────────────────────┘
        ⬇ 8px Gap
┌─────────────────────────┐
│ 2. Toast                │
└─────────────────────────┘
        ⬇ 8px Gap
┌─────────────────────────┐
│ 1. Älteste Toast        │ ← Wird geschlossen bei 5. Toast
└─────────────────────────┘
```

---

## Aktions-Buttons

Toasts können optionale Aktions-Buttons enthalten für häufige Interaktionen:

### Undo (Rückgängig)

**Verwendung:** Bei destruktiven Aktionen, die rückgängig gemacht werden können.

**Beispiele:**
- Element gelöscht → "Rückgängig" Button
- E-Mail archiviert → "Rückgängig" Button
- Benachrichtigung als gelesen markiert → "Rückgängig" Button

```javascript
toast.success('Element geloescht', {
  duration: 3000,
  action: {
    label: 'Rueckgaengig',
    onClick: () => {
      restoreItem();
      toast.dismiss(toastId);
    },
  },
});
```

**Best Practice:** Undo-Toasts sollten länger sichtbar sein (5-10s statt 3s), damit Nutzer Zeit haben zu reagieren.

---

### Retry (Erneut versuchen)

**Verwendung:** Bei fehlgeschlagenen Aktionen, die wiederholt werden können.

**Beispiele:**
- Netzwerkfehler → "Erneut versuchen" Button
- Upload fehlgeschlagen → "Erneut versuchen" Button
- API-Aufruf gescheitert → "Erneut versuchen" Button

```javascript
toast.error('Fehler beim Speichern. Bitte erneut versuchen.', {
  duration: Infinity, // Error-Toasts bleiben
  action: {
    label: 'Erneut versuchen',
    onClick: () => {
      retrySave();
    },
  },
});
```

---

### View Details (Details anzeigen)

**Verwendung:** Bei komplexen Ereignissen mit zusätzlichen Informationen.

**Beispiele:**
- "5 neue Benachrichtigungen" → "Details anzeigen"
- "Export abgeschlossen" → "Datei oeffnen"
- "Update verfügbar" → "Mehr erfahren"

```javascript
toast.info('Export abgeschlossen', {
  duration: 4000,
  action: {
    label: 'Datei oeffnen',
    onClick: () => {
      window.open(downloadUrl, '_blank');
    },
  },
});
```

---

### Schließen-Button

Jeder Toast sollte einen **Close-Button (X)** haben:
- **24px × 24px** Größe (toast.close-button.size)
- **16px Icon** (toast.close-button.icon-size)
- **Top-right** Position innerhalb des Toasts

**Rationale:**
- Error-Toasts MÜSSEN schließbar sein (bleiben sonst ewig)
- Nutzer möchten manchmal Toasts manuell schließen
- Touch-Geräte: Tippen auf Close ist einfacher als Warten

---

## Barrierefreiheit

### ARIA Live Regions

Toasts müssen für Screenreader über **ARIA Live Regions** angekündigt werden:

**role="status" für nicht-dringende Nachrichten:**
- Success-Toasts
- Info-Toasts

```html
<div role="status" aria-live="polite" class="toast toast--success">
  Aenderungen gespeichert
</div>
```

**role="alert" für dringende Nachrichten:**
- Warning-Toasts
- Error-Toasts

```html
<div role="alert" aria-live="assertive" class="toast toast--error">
  Fehler beim Speichern. Bitte erneut versuchen.
</div>
```

**Unterschied:**
- `aria-live="polite"` — Screenreader wartet, bis aktuelle Ausgabe endet
- `aria-live="assertive"` — Screenreader unterbricht und liest sofort

---

### Pause on Hover/Focus

Auto-Dismiss-Timer muss pausieren, wenn:
- Maus über Toast (Hover)
- Toast oder dessen Button im Fokus (Keyboard-Navigation)

**Warum:** Nutzer brauchen Zeit, um:
- Text zu lesen
- Aktions-Button zu erreichen
- Screenreader-Ausgabe zu hören

```javascript
let dismissTimer;

function showToast(message, duration) {
  const toast = createToastElement(message);
  
  dismissTimer = setTimeout(() => {
    dismissToast(toast);
  }, duration);
  
  toast.addEventListener('mouseenter', () => {
    clearTimeout(dismissTimer);
  });
  
  toast.addEventListener('mouseleave', () => {
    dismissTimer = setTimeout(() => {
      dismissToast(toast);
    }, duration);
  });
  
  toast.addEventListener('focusin', () => {
    clearTimeout(dismissTimer);
  });
  
  toast.addEventListener('focusout', () => {
    dismissTimer = setTimeout(() => {
      dismissToast(toast);
    }, duration);
  });
}
```

---

### Keyboard-Navigation

Toasts und deren Aktions-Buttons müssen per Tastatur erreichbar sein:

**Tab-Navigation:**
- Fokus springt zu Close-Button und Aktions-Buttons
- Fokus-Ring sichtbar (WCAG 2.4.7)

**Enter/Space:**
- Aktiviert fokussierten Button

**ESC-Taste:**
- Schließt alle sichtbaren Toasts

```javascript
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    dismissAllToasts();
  }
});
```

---

## Code-Beispiele

### Sonner (empfohlen)

Sonner ist die moderne Standard-Bibliothek für React Toast-Benachrichtigungen.

**Installation:**

```bash
npm install sonner
```

**Setup im App-Root:**

```jsx
import { Toaster } from 'sonner';

export function App() {
  return (
    <>
      <Toaster
        position="top-right"
        visibleToasts={4}
        duration={3000}
        expand={false}
        richColors={false}
      />
      {/* Rest der App */}
    </>
  );
}
```

**Verwendung in Komponenten:**

```jsx
import { toast } from 'sonner';

function SaveButton() {
  const handleSave = async () => {
    try {
      await saveData();
      toast.success('Aenderungen gespeichert');
    } catch (error) {
      toast.error('Fehler beim Speichern. Bitte erneut versuchen.', {
        action: {
          label: 'Erneut versuchen',
          onClick: () => handleSave(),
        },
      });
    }
  };
  
  return <button onClick={handleSave}>Speichern</button>;
}
```

**Severity-basiertes Timing:**

```jsx
// Success: 3 Sekunden
toast.success('Element geloescht', {
  duration: 3000,
  action: {
    label: 'Rueckgaengig',
    onClick: () => undoDelete(),
  },
});

// Info: 4 Sekunden
toast.info('Neue Nachricht eingegangen', {
  duration: 4000,
});

// Warning: 5 Sekunden
toast.warning('Verbindung instabil', {
  duration: 5000,
});

// Error: Bleibt bis geschlossen
toast.error('Fehler beim Laden', {
  duration: Infinity,
  action: {
    label: 'Erneut versuchen',
    onClick: () => retryLoad(),
  },
});
```

**Sonner Features:**
- ✅ Top-right Positionierung (konfigurierbar)
- ✅ Severity-basiertes Timing konfigurierbar
- ✅ Stacking mit max 4 sichtbar (visibleToasts)
- ✅ Pause-on-hover automatisch
- ✅ ARIA Live Regions automatisch
- ✅ Aktions-Buttons mit `action` prop
- ✅ Keine manuelle Setup-Logik nötig

**Styling mit Design-Token:**

```css
[data-sonner-toaster] {
  --toast-width: var(--toast-width);
  --toast-padding-x: var(--toast-padding-x);
  --toast-padding-y: var(--toast-padding-y);
  --toast-border-radius: var(--toast-border-radius);
  --toast-shadow: var(--toast-shadow);
  --toast-gap: var(--toast-gap);
}

[data-sonner-toast][data-type="success"] {
  background-color: var(--toast-variant-success-background);
  border: 1px solid var(--toast-variant-success-border);
  color: var(--toast-variant-success-text-color);
}

[data-sonner-toast][data-type="error"] {
  background-color: var(--toast-variant-error-background);
  border: 1px solid var(--toast-variant-error-border);
  color: var(--toast-variant-error-text-color);
}
```

---

## Deutsche Nachricht-Beispiele

### Success-Nachrichten

- "Aenderungen gespeichert"
- "Element erfolgreich geloescht"
- "Datei hochgeladen"
- "Einstellungen aktualisiert"
- "Nachricht gesendet"
- "Benutzer hinzugefuegt"
- "Passwort geaendert"
- "Zahlungsmethode aktualisiert"

### Info-Nachrichten

- "Neue Nachricht eingegangen"
- "Update verfuegbar"
- "Synchronisierung abgeschlossen"
- "Export wird vorbereitet"
- "Sitzung laeuft in 5 Minuten ab"
- "5 neue Benachrichtigungen"
- "Download gestartet"
- "Seite wurde aktualisiert"

### Warning-Nachrichten

- "Verbindung instabil"
- "Speicherplatz wird knapp"
- "Ungespeicherte Aenderungen vorhanden"
- "Browser-Version veraltet"
- "Zeitlimit bald erreicht"
- "Maximale Anzahl erreicht"
- "Langsame Internetverbindung"
- "Cache muss geleert werden"

### Error-Nachrichten

- "Fehler beim Speichern. Bitte erneut versuchen."
- "Verbindung zum Server verloren"
- "Datei konnte nicht hochgeladen werden"
- "Ungueltige Daten. Bitte pruefen."
- "Authentifizierung fehlgeschlagen"
- "Zugriff verweigert"
- "Timeout: Vorgang abgebrochen"
- "Element nicht gefunden"

**Formulierungs-Richtlinien:**
- **Klar und prägnant:** Maximal 1-2 Sätze
- **Handlungsorientiert:** Was ist passiert, was tun?
- **Freundlich:** "Bitte erneut versuchen" statt "Fehler"
- **Deutsch:** Sie-Form, höflich aber direkt
- **Keine Fachbegriffe:** "Verbindung verloren" statt "HTTP 503 Error"

---

## Anti-Patterns

### ❌ Formular-Validierung in Toasts

**Problem:** Fehler sollten inline am betroffenen Feld erscheinen, nicht in Toast-Benachrichtigungen.

**Falsch:**
```javascript
// Formular absenden
if (!email.isValid) {
  toast.error('E-Mail-Adresse ungueltig'); // ❌
}
```

**Richtig:**
```html
<!-- Inline-Fehler -->
<input type="email" aria-invalid="true" aria-describedby="email-error" />
<span id="email-error" class="error">
  Bitte geben Sie eine gueltige E-Mail-Adresse ein.
</span>
```

**Rationale:** Formular-Fehler müssen direkt am betroffenen Feld sichtbar sein, damit Nutzer wissen, was zu korrigieren ist.

---

### ❌ Auto-Dismissing Error-Toasts

**Problem:** Fehler verschwinden, bevor Nutzer sie lesen oder darauf reagieren können.

**Falsch:**
```javascript
toast.error('Fehler beim Laden', {
  duration: 3000, // ❌ Verschwindet automatisch
});
```

**Richtig:**
```javascript
toast.error('Fehler beim Laden', {
  duration: Infinity, // ✅ Bleibt bis manuell geschlossen
  action: {
    label: 'Erneut versuchen',
    onClick: () => retryLoad(),
  },
});
```

---

### ❌ Zu viele gleichzeitige Toasts

**Problem:** Mehr als 4 Toasts überfordern den Nutzer und überdecken Inhalte.

**Falsch:**
```javascript
// Mehrere Aktionen hintereinander
items.forEach(item => {
  toast.success(`${item.name} geloescht`); // ❌ 10+ Toasts
});
```

**Richtig:**
```javascript
// Zusammengefasste Nachricht
toast.success(`${items.length} Elemente geloescht`, {
  action: {
    label: 'Rueckgaengig',
    onClick: () => undoDeleteAll(items),
  },
});
```

---

### ❌ Toast-Spam bei schnellen Aktionen

**Problem:** Wiederholte Toasts bei schnell aufeinanderfolgenden Aktionen (z.B. "Like"-Button).

**Falsch:**
```javascript
function handleLike() {
  toast.success('Beitrag geliked'); // ❌ Bei jedem Klick
}
```

**Richtig:**
```javascript
// Optimistic UI ohne Toast
function handleLike() {
  setLiked(!liked); // Sofortiges visuelles Feedback
  // Kein Toast nötig - UI-Änderung ist ausreichend
}
```

---

### ❌ Technische Fehler-Nachrichten

**Problem:** Technischer Jargon verwirrt Nutzer.

**Falsch:**
```javascript
toast.error('HTTP 500 Internal Server Error'); // ❌
```

**Richtig:**
```javascript
toast.error('Serverfehler. Bitte versuchen Sie es spaeter erneut.', {
  action: {
    label: 'Erneut versuchen',
    onClick: () => retry(),
  },
});
```

---

## Zusammenfassung

**Toast Best Practices:**

✅ **Top-Right Position:** 16px Abstand von oben und rechts  
✅ **Severity-basiertes Timing:** 3s/4s/5s/∞ je nach Wichtigkeit  
✅ **Max 4 sichtbar:** Älteste verschwindet bei Überschreitung  
✅ **Error bleibt:** Fehler nie auto-dismissing  
✅ **Aktions-Buttons:** Undo, Retry, View Details wo sinnvoll  
✅ **ARIA Live Regions:** role="status" (Success/Info), role="alert" (Warning/Error)  
✅ **Pause-on-Hover:** Timer pausiert bei Hover/Focus  
✅ **Sonner empfohlen:** Moderne Bibliothek mit allen Features  

❌ **Nicht verwenden für:** Formular-Validierung, kritische Entscheidungen, permanente Infos, zu viele gleichzeitige Meldungen

---

**Siehe auch:**
- [Tooltips](tooltip.md) — Für kurze Labels bei Hover
- [Modal-Dialoge](modal.md) — Für kritische Bestätigungen
- [Form Validation](../forms/validation.md) — Inline-Fehler bei Formularen

---

*Zuletzt aktualisiert: 2026-01-29*
