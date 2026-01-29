# Für Designer

Übersicht aller Komponenten, Tokens und Gestaltungsregeln.

## Design-Grundlagen

| Thema | Dokumentation |
|-------|---------------|
| Farbsystem | [Farben & Abstufungen](../colors.md) |
| Typografie | [Schriftsystem](../typography.md) |
| Spacing & Grid | [Abstands- und Rastersystem](../spacing-grid.md) |
| Effekte | [Schatten & Rundungen](../effects.md) |
| Icons | [Icon-System](../icons.md) |
| Logo | [Logo-Guidelines](../logo-guidelines.md) |

## Komponenten

### Interaktive Elemente

- [Buttons](../buttons.md) - Primary, Secondary, Tertiary Varianten

### Formulare

- [Text-Inputs](../forms/text-input.md)
- [Textarea](../forms/textarea.md)
- [Select](../forms/select.md)
- [Checkbox](../forms/checkbox.md)
- [Radio Buttons](../forms/radio-button.md)
- [Labels & Hilfetexte](../forms/labels-helper-text.md)
- [Validierung](../forms/validation.md)

→ [Formular-Übersicht](../forms/index.md)

### Navigation

- [Header](../navigation/header.md)
- [Mobile Drawer](../navigation/mobile-drawer.md)
- [Breadcrumb](../navigation/breadcrumb.md)
- [Footer](../navigation/footer.md)

→ [Navigation-Übersicht](../navigation/index.md)

### Inhaltsdarstellung

- [Product Cards](../components/product-card.md)
- [Content Cards](../components/content-card.md)
- [Data Tables](../components/data-table.md)

### Feedback & System

- [Modal Dialoge](../feedback/modal.md)
- [Tooltips](../feedback/tooltip.md)
- [Toast Notifications](../feedback/toast.md)
- [Loading States](../feedback/loading.md)

→ [Feedback-Übersicht](../feedback/index.md)

## Wann welche Variante?

### Buttons

| Aktion | Variante | Beispiel |
|--------|----------|----------|
| Hauptaktion (1x pro Bereich) | Primary | "Jetzt kaufen", "Anfrage senden" |
| Alternative Aktionen | Secondary | "Mehr erfahren", "Zur Vergleichsliste" |
| Tertiäre/Abbrechen | Tertiary | "Abbrechen", "Zurück" |

**Faustregel:** Ein Primary Button pro Viewport-Bereich. Mehrere Aktionen? → 1x Primary + Rest Secondary/Tertiary.

### Karten

| Inhalt | Komponente | Wann verwenden |
|--------|------------|----------------|
| Produkt mit Bild | [Product Card](../components/product-card.md) | E-Commerce, Produktlisten, Kataloge |
| Artikel/Blog | [Content Card](../components/content-card.md) | News, Ratgeber, Blog-Posts |
| Vergleichsdaten | [Data Table](../components/data-table.md) | Technische Spezifikationen, Produktvergleiche |

### Formulare

| Feldtyp | Komponente | Wann verwenden |
|---------|------------|----------------|
| Kurze Texteingabe | [Text-Input](../forms/text-input.md) | Name, E-Mail, Telefon |
| Mehrzeilige Eingabe | [Textarea](../forms/textarea.md) | Nachricht, Kommentar, Beschreibung |
| Auswahl aus Liste | [Select](../forms/select.md) | Land, Kategorie, Produktlinie |
| Mehrfachauswahl | [Checkbox](../forms/checkbox.md) | Newsletter, Zustimmungen, Features |
| Einfachauswahl | [Radio Button](../forms/radio-button.md) | Anrede, Zahlungsart, Versandoption |

### Navigation

| Kontext | Komponente | Wann verwenden |
|---------|------------|----------------|
| Hauptnavigation | [Header](../navigation/header.md) | Top-Level Menü (Desktop) |
| Mobile Navigation | [Mobile Drawer](../navigation/mobile-drawer.md) | Hamburger-Menü (Mobile/Tablet) |
| Seitenhierarchie | [Breadcrumb](../navigation/breadcrumb.md) | Tiefe Content-Strukturen (3+ Ebenen) |
| Seiten-Fußzeile | [Footer](../navigation/footer.md) | Links, Rechtliches, Kontakt |

### Feedback

| Situation | Komponente | Wann verwenden |
|-----------|------------|----------------|
| Wichtige Entscheidung | [Modal Dialog](../feedback/modal.md) | Bestätigung, kritische Warnung, mehrstufige Formulare |
| Kurze Erklärung | [Tooltip](../feedback/tooltip.md) | Icon-Erklärung, Label-Ergänzung (1-5 Wörter) |
| System-Feedback | [Toast](../feedback/toast.md) | Erfolg/Fehler nach Aktion, nicht-blockierend |
| Ladevorgang | [Loading States](../feedback/loading.md) | Daten laden, Formular absenden, Seite wechseln |

## Barrierefreiheit

**Umfassende Accessibility-Dokumentation:**

- [Accessibility-Übersicht](../03-accessibility/overview.md) - Prinzipien, WCAG-Grundlagen, Design-Checkliste
- [WCAG-Compliance](../03-accessibility/wcag-compliance.md) - Komponenten-spezifische Compliance-Details
- [Testing-Guide](../03-accessibility/testing-guide.md) - axe DevTools, manuelles Testing, Screen Reader

### Wichtige Prinzipien

**WCAG 2.1 AA Compliance:**
- Alle interaktiven Elemente haben 44x44px Touch-Targets (WCAG 2.5.5)
- Farbkontrast mindestens 4.5:1 für Text, 3:1 für UI-Komponenten
- Fokus-Indikatoren: 2px Outline + 2px Offset für Tastaturnavigation
- Screen Reader-freundlich: Semantisches HTML, ARIA-Attribute

**In jeder Komponenten-Dokumentation:**
- Accessibility-Sektion mit ARIA-Patterns
- Keyboard Navigation-Spezifikation
- Screen Reader-Verhalten

## Token-Referenz

### Design Tokens verstehen

Alle visuellen Eigenschaften sind als Design Tokens definiert:

```
colors.json       → Farbpalette (50-900 Abstufungen)
typography.json   → Schriften, Größen, Zeilenhöhen
spacing.json      → Abstände (4px-Basis)
buttons.json      → Button-spezifische Tokens
forms.json        → Formular-spezifische Tokens
navigation.json   → Navigation-spezifische Tokens
feedback.json     → Feedback-spezifische Tokens
```

**Verwendung in Design-Tools:**
→ Tokens können in Figma/Sketch als Variablen importiert werden (zukünftige Integration)

## Markenidentität

### Logo-System
→ [Logo-Guidelines](../logo-guidelines.md) - Alle Varianten, Schutzraum, Mindestgrößen

### Farbidentität
→ [Farbsystem](../colors.md) - Primär/Sekundär/Funktionale Farben mit Verwendungsrichtlinien

### Typografie
→ [Typografie](../typography.md) - Inter als Markenschrift, semantische Textstile

---

**Zielgruppe:** UI/UX Designer, Visuelle Gestalter
**Zweck:** Schneller Zugriff auf alle Komponenten mit "Wann welche Variante?"-Entscheidungshilfen
