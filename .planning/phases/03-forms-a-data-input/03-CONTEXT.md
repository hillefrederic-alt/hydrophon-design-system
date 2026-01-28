# Phase 3: Forms & Data Input - Context

**Gathered:** 2026-01-29
**Status:** Ready for planning

<domain>
## Phase Boundary

Vollständiges Formularsystem mit allen Basiseingabe-Komponenten: Text Input, Textarea, Select/Dropdown, Checkbox und Radio Button. Abdeckung von Validierung, Fehlerzuständen, Labels, Helper Text und Barrierefreiheit. Erweiterte Eingabetypen (Date Picker, File Upload, Multi-Select) gehören in separate Phasen.

</domain>

<decisions>
## Implementation Decisions

### Input-Stile & Varianten
- **Visueller Stil:** Claude's discretion — Wahl zwischen outline (nur Border) oder filled (Hintergrund) basierend auf Phase 1/2 Design-Tokens und Konsistenz mit Button-Komponenten
- **Größen:** 3 Größen (Small 32px, Medium 40px, Large 48px) — konsistent mit Button-Größen aus Phase 2
- **Severity-States:** Claude's discretion — Entscheidung ob Success/Warning/Error States oder nur Error State basierend auf UX Best Practices
- **Disabled State:** Subtil (leicht reduziert) — leicht grauer Hintergrund, aber Inhalt bleibt lesbar, nicht stark abgeschwächt

### Validierung & Feedback
- **Validierungs-Timing:** Claude's discretion — Wahl zwischen onBlur, onChange oder Hybrid-Ansatz basierend auf UX Standards
- **Fehler-Position:** Claude's discretion — inline unter Input oder inline + Summary oben basierend auf WCAG Accessibility Guidelines
- **Success-Feedback:** Ja, grünes Checkmark Icon — positives visuelles Feedback bei korrekter Eingabe (z.B. E-Mail-Format valide)
- **Fehlertext-Stil:** Erklärend-hilfsbereit — nicht nur "ungültig", sondern mit Beispiel und Erklärung (z.B. "Bitte gib eine gültige E-Mail-Adresse ein (z.B. name@firma.de)")

### Required/Optional Kennzeichnung
- **Kennzeichnungs-Methode:** Claude's discretion — Asterisk (*) bei Pflichtfeldern oder (optional) bei optionalen Feldern basierend auf UX Best Practices
- **Position:** Claude's discretion — nach Label-Text oder rechtsbündig basierend auf Layout-Constraints
- **Farbe:** Claude's discretion — Rot (error.500), Brand-Farbe (Hydrophon Blau) oder Neutral (Grau) basierend auf visueller Hierarchie
- **Legende:** Claude's discretion — "* Pflichtfeld" oben oder "Alle Felder außer ... sind Pflicht" oder keine Legende basierend auf Accessibility Guidelines

### Helper Text & Platzhalter
- **Placeholder-Strategie:** Claude's discretion — als Beispiel-Werte, zusätzliche Hinweise oder sparsam einsetzen basierend auf WCAG Best Practices (Accessibility-Probleme vermeiden)
- **Helper Text Position:** Claude's discretion — unter Input oder über Input (unter Label) basierend auf Layout-Best-Practices
- **Text-Verwaltung:** Claude's discretion — Helper Text und Fehlermeldungen teilen gleichen Bereich oder separate Bereiche basierend auf UX-Konventionen
- **Helper Text Stil:** Claude's discretion — kleinere Schrift + Grau, nur Grau, oder Icon + Text basierend auf Typografie-Hierarchie

### Claude's Discretion
Claude hat volle Entscheidungsfreiheit bei folgenden Aspekten:
- Input visueller Stil (outline vs filled)
- Severity-States (Success/Warning/Error oder nur Error)
- Validierungs-Timing (onBlur, onChange, Hybrid)
- Fehler-Position (inline only oder inline + Summary)
- Required/Optional Kennzeichnungs-Details (Methode, Position, Farbe, Legende)
- Helper Text Implementation (Strategie, Position, Verwaltung, Stil)

</decisions>

<specifics>
## Specific Ideas

**Brand context:**
- Hydrophon ist B2B-Sanitärbereich mit moderner, innovativer Positionierung
- Zielgruppe: Handwerker, Installateure, Großkunden (professionelle Nutzer)
- Formulare müssen professionell, aber nicht steril wirken

**Technical foundation:**
- Phase 1: Design Tokens (Farben, Typografie, Spacing, Effects) etabliert
- Phase 2: Button-Komponenten (3 Varianten, 3 Größen, 5 States) als Referenz
- Phase 2: Icon-System mit Lucide (2px Stroke, 5 Größen) verfügbar
- Inter Font Family für moderne B2B-Typografie

**Quality requirements:**
- WCAG 2.1 AA Compliance mandatory für alle Formular-Komponenten
- Touch-Target-Mindestgröße 44px für mobile Nutzer (Small nur für Desktop)
- Responsive Verhalten über alle Breakpoints (sm: 640px, md: 768px, lg: 1024px, xl: 1280px)
- Deutsche Dokumentation für alle Komponenten

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope (basic form inputs only).

Advanced input types deferred to future phases:
- Date Picker / Calendar Input
- File Upload Component
- Multi-Select / Combo Box
- Rich Text Editor
- Autocomplete / Search Input

</deferred>

---

*Phase: 03-forms-a-data-input*
*Context gathered: 2026-01-29*
