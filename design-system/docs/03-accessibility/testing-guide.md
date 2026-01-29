# Accessibility Testing Guide

Praktische Anleitung zur Überprüfung der WCAG 2.1 AA Compliance im Hydrophon Design-System.

**Ziel:** Sicherstellen, dass alle Komponenten für alle Nutzer zugänglich sind — unabhängig von Sehvermögen, Mobilität oder verwendeter Technologie.

---

## Test-Strategie

Accessibility-Testing folgt der **30/70-Regel**:

- **30%** der Probleme werden durch automatisierte Tools gefunden
- **70%** erfordern manuelle Prüfung

**Warum beide nötig sind:**

- **Automatisierte Tools** finden technische Fehler (fehlende `alt`-Attribute, Kontrast-Probleme, ungültige ARIA)
- **Manuelle Tests** prüfen Nutzbarkeit (ist die Tab-Reihenfolge logisch? sind Labels verständlich? funktioniert Keyboard-Navigation?)

**Empfohlener Workflow:**

1. **Automatisiert testen** (axe DevTools + Lighthouse) — findet schnell offensichtliche Fehler
2. **Keyboard-Test** — prüft ob alle Funktionen per Tastatur erreichbar sind
3. **Screenreader-Test** — prüft ob Inhalte verständlich vorgelesen werden
4. **Kontrast-Prüfung** — prüft Farbkontraste manuell
5. **Zoom-Test** — prüft Nutzbarkeit bei 200% Zoom
6. **Motion-Test** — prüft `prefers-reduced-motion` Respekt

---

## Automatisierte Tests

### axe DevTools (Empfohlen)

Browser-Extension für Chrome, Firefox, Edge.

**Installation:**

1. Chrome Web Store öffnen
2. "axe DevTools" suchen
3. Extension installieren
4. DevTools öffnen (F12)
5. Tab "axe DevTools" wählen

**Verwendung:**

1. Seite oder Komponente laden
2. "Analyze" klicken
3. Ergebnisse nach Schweregrad sortieren:
   - **Critical:** Sofort beheben (blockiert Nutzer)
   - **Serious:** Priorität (beeinträchtigt Nutzbarkeit)
   - **Moderate:** Wichtig (kann verwirren)
   - **Minor:** Nice-to-have (verbessert UX)
4. Issues beheben und erneut testen

**Was axe findet:**

✓ Fehlende `alt`-Texte auf Bildern
✓ Kontrastprobleme (Text zu hell)
✓ Fehlende Labels auf Formularfeldern
✓ Ungültige ARIA-Attribute
✓ Fehlende Landmarks (`<nav>`, `<main>`, `<footer>`)
✓ Fokusreihenfolge-Probleme (`tabindex` Chaos)
✓ Redundante ARIA (z.B. `role="button"` auf `<button>`)

**Was axe NICHT findet:**

✗ Ob Labels **sinnvoll** sind (nur dass sie existieren)
✗ Ob Fokusreihenfolge **logisch** ist (nur dass sie existiert)
✗ Ob Inhalte **verständlich** sind
✗ Komplexe Interaktionsmuster (Modals, Drawers, Custom Widgets)
✗ Keyboard-Traps

**Ziel:** 0 kritische und serious Fehler vor Release.

---

### Lighthouse

In Chrome DevTools integriert.

**Verwendung:**

1. Chrome DevTools öffnen (F12)
2. Tab "Lighthouse" wählen
3. "Categories" → nur "Accessibility" auswählen
4. "Analyze page load" klicken
5. Report durchlesen

**Lighthouse-Score:**

- **90-100:** Excellent (Hydrophon-Ziel)
- **50-89:** Needs improvement
- **0-49:** Poor

Lighthouse gibt konkrete Handlungsempfehlungen mit Links zu WCAG-Dokumentation.

**Unterschied zu axe:**

- axe: Detaillierter, mehr Tests, bessere Erklärungen
- Lighthouse: Schneller Überblick, Performance + A11y zusammen

**Empfehlung:** Beide verwenden (axe für Details, Lighthouse für Score-Tracking).

---

## Manuelle Tests

### 1. Tastatur-Navigation

**Warum wichtig:**

- 15% der Nutzer verwenden keine Maus (Motorik, Präferenz, Power-User)
- Screenreader-Nutzer navigieren primär per Tastatur
- B2B-Kontext: Baustellenumgebung, Handschuhe, schmutzige Hände

**Checkliste:**

- [ ] Alle interaktiven Elemente per Tab erreichbar
- [ ] Fokus-Indikator immer sichtbar (kein `outline: none` ohne Alternative)
- [ ] Logische Tab-Reihenfolge (links→rechts, oben→unten)
- [ ] Enter/Space aktiviert Buttons und Links
- [ ] ESC schließt Modals/Drawers/Tooltips
- [ ] Pfeiltasten funktionieren in Radio-Groups
- [ ] Keine Tastaturfallen (Fokus kann immer weiterbewegt werden)
- [ ] Skip-Links vorhanden (direkt zu Hauptinhalt springen)

**Test-Methode:**

1. Maus weglegen / Touch deaktivieren
2. Mit Tab durch Seite navigieren
3. Alle Funktionen nur per Tastatur ausführen:
   - Formular ausfüllen
   - Modal öffnen und schließen
   - Navigation verwenden
   - Buttons klicken
   - Tooltips öffnen

**Häufige Probleme:**

| Problem | Ursache | Lösung |
|---------|---------|--------|
| Fokus nicht sichtbar | `outline: none` im CSS | `:focus-visible` mit 2px Outline |
| Falsche Tab-Reihenfolge | `tabindex` > 0 verwendet | `tabindex` entfernen, DOM-Reihenfolge anpassen |
| Element nicht fokussierbar | `<div>` statt `<button>` | Natives HTML-Element verwenden |
| Tastatur-Falle in Modal | Kein Focus Trap | Radix UI Dialog verwenden |

---

### 2. Screenreader-Test

**Warum wichtig:**

- 2% der Nutzer verwenden Screenreader (Blindheit, Sehbehinderung)
- Prüft ob ARIA-Attribute korrekt sind
- Prüft ob Inhalte verständlich sind

**Empfohlene Screenreader:**

| Plattform | Screenreader | Kosten | Marktanteil |
|-----------|--------------|--------|-------------|
| Windows | NVDA | Kostenlos | 72% |
| Windows | JAWS | ~2000€/Jahr | 53% |
| macOS | VoiceOver | Integriert (Cmd+F5) | 11% |

**NVDA Installation (Windows):**

1. https://www.nvaccess.org/ besuchen
2. "Download" klicken
3. Installer ausführen
4. NVDA starten (Ctrl+Alt+N)

**Grundlegende NVDA-Befehle:**

| Taste | Aktion |
|-------|--------|
| Caps Lock + Leertaste | NVDA-Modus wechseln (Browse/Focus) |
| Tab | Nächstes fokussierbares Element |
| H | Nächste Überschrift (Shift+H für vorherige) |
| B | Nächster Button |
| E | Nächstes Eingabefeld |
| K | Nächster Link |
| Caps Lock + ↓ | Zeile vorlesen |
| Caps Lock + T | Titel vorlesen |

**VoiceOver (macOS):**

- **Aktivieren:** Cmd+F5
- **Navigation:** Ctrl+Option+→ (nächstes Element)
- **Aktivieren:** Ctrl+Option+Space
- **Rotor:** Ctrl+Option+U (Liste aller Überschriften, Links, etc.)

**Test-Checkliste:**

- [ ] Seitenstruktur wird korrekt vorgelesen (Überschriften-Hierarchie)
- [ ] Landmarks werden identifiziert (`<nav>`, `<main>`, `<footer>`)
- [ ] Bilder haben sinnvolle `alt`-Texte (nicht nur "Bild" oder Dateiname)
- [ ] Formularfelder werden mit Label vorgelesen
- [ ] Fehler werden angekündigt (`role="alert"`)
- [ ] Statusänderungen werden angekündigt (Toast-Notifications mit `role="status"`)
- [ ] Modal-Inhalte werden vorgelesen (`role="dialog"`, `aria-labelledby`)
- [ ] Aktuelle Seite wird markiert (`aria-current="page"`)
- [ ] Buttons haben aussagekräftige Namen (nicht nur Icon)

**Häufige Probleme:**

| Problem | Ursache | Lösung |
|---------|---------|--------|
| "Button" ohne Name | Icon-Button ohne `aria-label` | `aria-label="Schließen"` hinzufügen |
| Fehler nicht angekündigt | Fehler ohne `role="alert"` | `role="alert"` auf Fehlermeldung |
| Formular-Chaos | Labels nicht verknüpft | `<label for="id">` verwenden |
| "Bild" vorgelesen | `alt=""` oder Dateiname | Beschreibenden `alt`-Text schreiben |

---

### 3. Kontrastprüfung

**Warum wichtig:**

- 8% der Männer haben Farbsehschwäche (Rot-Grün-Blindheit)
- Ältere Nutzer haben reduziertes Sehvermögen
- B2B-Kontext: Sonnenlicht auf Baustelle, schlechte Bildschirme

**Tools:**

- **WebAIM Contrast Checker:** https://webaim.org/resources/contrastchecker/
  - Vorder- und Hintergrundfarbe eingeben
  - Sofort WCAG AA/AAA Status sehen
- **Chrome DevTools:**
  - Element inspizieren
  - "Computed" → "Contrast ratio" zeigt automatisch AA/AAA Status

**WCAG-Mindestanforderungen:**

| Element | WCAG AA | WCAG AAA | Hydrophon |
|---------|---------|----------|-----------|
| Normaler Text (< 18px) | 4.5:1 | 7:1 | 5.9:1 ✓ |
| Großer Text (≥18px bold oder ≥24px) | 3:1 | 4.5:1 | 5.9:1 ✓ |
| Grafische Elemente (Icons, Fokus) | 3:1 | — | 4.5:1 ✓ |

**Hydrophon-Farbkontraste:**

| Kombination | Kontrast | Status |
|-------------|----------|--------|
| Grau #575656 auf Weiß | 5.9:1 | ✓ AA (Normal) |
| Weiß auf Blau #008BD2 | 4.9:1 | ✓ AA (Normal) |
| Fokus-Ring Blau #008BD2 auf Weiß | 4.5:1 | ✓ AA (Grafik) |
| Fehler-Rot auf Weiß | 4.8:1 | ✓ AA (Normal) |

**Test-Methode:**

1. Screenshot der Komponente machen
2. Farben mit Eyedropper-Tool (Chrome DevTools) identifizieren
3. In WebAIM Contrast Checker eingeben
4. Prüfen ob Minimum erfüllt ist

**Häufige Probleme:**

- Hellgraue Placeholder-Texte (oft < 4.5:1)
- Disabled States (erlaubt < 4.5:1)
- Sekundäre Texte zu hell
- Links ohne Underline UND zu wenig Kontrast

---

### 4. Zoom-Test

**Warum wichtig:**

- Sehbehinderungen erfordern 200% Zoom
- WCAG 2.1 fordert Nutzbarkeit bis 200% Zoom
- Ältere Nutzer zoomen häufig

**WCAG-Anforderung:**

> Content can be zoomed up to 200% without loss of content or functionality, and without requiring horizontal scrolling.

**Test-Methode:**

1. Browser auf 200% zoomen (Cmd/Ctrl + + + +)
2. Prüfen:
   - [ ] Kein Text abgeschnitten?
   - [ ] Kein horizontales Scrollen nötig?
   - [ ] Alle Funktionen erreichbar?
   - [ ] Layout responsiv (kein fixed-width Chaos)?
3. Funktionen testen (Modal öffnen, Formular absenden, etc.)

**Häufige Probleme:**

- Fixed-width Container schneiden Text ab
- Buttons überlappen
- Fixed Header verdeckt Inhalt
- Horizontal Scroll erscheint

**Hydrophon-Lösung:**

- Responsive Grid mit `max-width` statt `width`
- Relative Units (`rem`, `em`) statt `px` für Text
- Flexible Layouts mit Flexbox/Grid

---

### 5. Motion-Test

**Warum wichtig:**

- Vestibulare Störungen: Animationen lösen Schwindel, Übelkeit aus
- WCAG 2.1 (2.3.3): Motion from Interactions (Level AAA, but recommended)
- Einige Nutzer aktivieren `prefers-reduced-motion` dauerhaft

**Test-Methode:**

1. In Betriebssystem "Reduzierte Bewegung" aktivieren:
   - **macOS:** Systemeinstellungen → Bedienungshilfen → Anzeige → Bewegung reduzieren
   - **Windows:** Einstellungen → Erleichterte Bedienung → Anzeige → Animationen deaktivieren
2. Seite neu laden (wichtig!)
3. Prüfen:
   - [ ] Animationen reduziert oder entfernt?
   - [ ] Spinner statisch (keine Rotation)?
   - [ ] Skeleton ohne Shimmer?
   - [ ] Modal fade-in instant?
   - [ ] Toast slide-in wird zu fade-in?
4. Prüfen: Funktionalität erhalten? (Loading-Zustände erkennbar?)

**Hydrophon-Pattern:**

```css
.spinner {
  animation: rotate 1s linear infinite;
}

@media (prefers-reduced-motion: reduce) {
  .spinner {
    animation: none;
    opacity: 0.6; /* Statisches Icon, aber sichtbar */
  }
}
```

**Betroffene Komponenten:**

- Spinner (Rotation → statisch)
- Skeleton (Shimmer → statisch)
- Modal (Scale+Fade → instant)
- Toast (Slide → Fade)
- Drawer (Slide → Fade)
- Transitions (Reduziert auf 50ms oder entfernt)

---

## Test-Checkliste für neue Komponenten

Vor Release einer neuen Komponente diese Checkliste durchgehen:

### Automatisiert

- [ ] **axe DevTools:** 0 kritische Fehler, 0 serious Fehler
- [ ] **Lighthouse Accessibility:** Score 90+ (Hydrophon-Ziel: 95+)

### Manuell — Tastatur

- [ ] Alle interaktiven Elemente per Tab erreichbar
- [ ] Fokus-Indikator immer sichtbar (2px Outline, 3:1 Kontrast)
- [ ] Tab-Reihenfolge logisch (links→rechts, oben→unten)
- [ ] Enter/Space aktiviert Buttons
- [ ] ESC schließt Overlays (Modal, Drawer, Tooltip)
- [ ] Keine Tastaturfallen

### Manuell — Screenreader

- [ ] NVDA oder VoiceOver Test durchgeführt
- [ ] Inhalte verständlich vorgelesen
- [ ] Labels vorhanden und sinnvoll
- [ ] Fehler werden angekündigt
- [ ] Status-Updates werden angekündigt (Toasts)
- [ ] ARIA-Attribute korrekt (role, aria-label, aria-describedby)

### Manuell — Visuell

- [ ] Kontrast: Alle Texte ≥ 4.5:1 (normale), ≥ 3:1 (große)
- [ ] Fokus-Indikator: ≥ 3:1 Kontrast gegen Hintergrund
- [ ] Informationen nicht nur durch Farbe (Farbe + Icon + Text)
- [ ] Zoom: 200% funktional, kein horizontaler Scroll
- [ ] Reduced Motion: Animationen respektieren Einstellung

### Komponenten-spezifisch

**Modal/Drawer:**

- [ ] Focus Trap aktiv (Tab bleibt im Modal)
- [ ] ESC schließt Modal
- [ ] Fokus kehrt zu Trigger zurück
- [ ] `role="dialog"`, `aria-modal="true"`

**Formularfelder:**

- [ ] Label mit `for`/`id` verknüpft
- [ ] Fehler mit `aria-invalid` und `aria-describedby`
- [ ] Pflichtfelder mit `required` und visueller Markierung (*)

**Toasts:**

- [ ] `role="status"` (Erfolg/Info) oder `role="alert"` (Warnung/Fehler)
- [ ] Fehler-Toasts bleiben sichtbar (kein Auto-dismiss)

---

## Häufige Fehler und Lösungen

### Formular-Fehler

| Fehler | Beispiel | Lösung |
|--------|----------|--------|
| "Form elements must have labels" | `<input>` ohne `<label>` | `<label for="id">` hinzufügen |
| "Form fields must have error messages" | Fehler nur visuell (rot) | `aria-describedby="error-id"` + `<span id="error-id" role="alert">` |
| "Placeholder is not a label" | Placeholder als einziger Text | Sichtbares `<label>` hinzufügen |

### Interaktive Elemente

| Fehler | Beispiel | Lösung |
|--------|----------|--------|
| "Interactive controls must be focusable" | `<div onclick="...">` | `<button>` verwenden |
| "Button has no accessible name" | Icon-Button ohne Text | `aria-label="Schließen"` |
| "Links must have discernible text" | `<a href="#">Mehr</a>` ohne Kontext | Kontext im Link: "Mehr über Produkt XY" |

### ARIA-Fehler

| Fehler | Beispiel | Lösung |
|--------|----------|--------|
| "ARIA attributes must have valid values" | `aria-expanded="yes"` | `aria-expanded="true"` (Boolean) |
| "ARIA role not allowed" | `<button role="button">` | `role` entfernen (redundant) |
| "aria-describedby ID does not exist" | Tippfehler in ID | IDs prüfen und synchronisieren |

### Kontrast-Fehler

| Fehler | Beispiel | Lösung |
|--------|----------|--------|
| "Elements must have sufficient color contrast" | Hellgrau #AAAAAA auf Weiß = 2.3:1 | Dunkleres Grau #757575 (4.5:1) |
| "Focus indicator must be visible" | `outline: none` ohne Alternative | `:focus-visible { outline: 2px solid blue; }` |

### Struktur-Fehler

| Fehler | Beispiel | Lösung |
|--------|----------|--------|
| "Page must have one main landmark" | Kein `<main>` | `<main>` um Hauptinhalt |
| "Heading levels should not skip" | `<h1>` → `<h3>` | `<h2>` einfügen |
| "Landmarks must have unique labels" | Zwei `<nav>` ohne Label | `aria-label="Hauptnavigation"` + `aria-label="Footer-Navigation"` |

---

## Testing-Tools Übersicht

| Tool | Typ | Kosten | Verwendung |
|------|-----|--------|------------|
| **axe DevTools** | Browser Extension | Kostenlos | Automatisierte Tests, detaillierte Fehlerberichte |
| **Lighthouse** | Chrome DevTools | Kostenlos | Schneller Score, Performance + A11y |
| **NVDA** | Screenreader (Windows) | Kostenlos | Manuelle Screenreader-Tests |
| **JAWS** | Screenreader (Windows) | ~2000€/Jahr | Manuelle Tests (Marktführer) |
| **VoiceOver** | Screenreader (macOS) | Integriert | Manuelle Tests (macOS/iOS) |
| **WebAIM Contrast Checker** | Online Tool | Kostenlos | Kontrast-Prüfung |
| **WAVE** | Browser Extension | Kostenlos | Visuelles Overlay, zeigt Fehler inline |

---

## Weiterführende Ressourcen

**Offizielle Dokumentation:**

- [WCAG 2.1 Quick Reference](https://www.w3.org/WAI/WCAG21/quickref/) — Alle WCAG-Kriterien mit Erklärungen
- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/) — ARIA-Patterns für Widgets
- [WebAIM Articles](https://webaim.org/articles/) — Praktische Anleitungen

**Testing-Tools:**

- [axe DevTools](https://www.deque.com/axe/devtools/) — Browser Extension
- [Lighthouse](https://developer.chrome.com/docs/lighthouse/) — Chrome DevTools
- [NVDA Screenreader](https://www.nvaccess.org/) — Kostenloser Screenreader

**Hydrophon-spezifisch:**

- [Accessibility Overview](./overview.md) — Grundprinzipien und ARIA-Patterns
- [WCAG Compliance](./wcag-compliance.md) — Komponenten-spezifische Compliance

---

**Letzte Aktualisierung:** 2026-01-29
