# Hydrophon Design-System

Dokumentation für Markenkonsistenz, Komponenten und technische Implementierung.

## Schnelleinstieg

| Sie sind... | Starten Sie hier |
|-------------|------------------|
| Marketing / Agentur | [Marketing Onboarding Guide](./00-quick-start/marketing-onboarding.md) |
| Designer | [Designer-Guide](./05-audience-guides/for-designers.md) |
| Entwickler | [Entwickler-Guide](./05-audience-guides/for-developers.md) |

---

## Für Marketing-Teams

Alles für Präsentationen, Social Media und Markenarbeit.

### Einstieg
- **[Marketing Onboarding Guide](./00-quick-start/marketing-onboarding.md)** - Umfassender Einstieg (15-20 Seiten)

### Schnellzugriff
- [Logo-Varianten und -Regeln](./logo-guidelines.md)
- [Markenfarben](./colors.md)
- [Typografie](./typography.md)

→ [Vollständiger Marketing-Guide](./05-audience-guides/for-marketing.md)

---

## Für Designer

Komponenten, Patterns und Gestaltungsregeln.

### Design-Grundlagen

| Thema | Dokumentation |
|-------|---------------|
| Farben | [Farbsystem](./colors.md) |
| Typografie | [Schriftsystem](./typography.md) |
| Spacing & Grid | [Abstands- und Rastersystem](./spacing-grid.md) |
| Effekte | [Schatten & Rundungen](./effects.md) |
| Icons | [Icon-System](./icons.md) |

### Komponenten

- **Interaktiv:** [Buttons](./buttons.md)
- **Formulare:** [Index](./forms/index.md) | [Text Input](./forms/text-input.md) | [Validation](./forms/validation.md)
- **Navigation:** [Index](./navigation/index.md) | [Header](./navigation/header.md) | [Mobile Drawer](./navigation/mobile-drawer.md)
- **Inhalte:** [Product Card](./components/product-card.md) | [Content Card](./components/content-card.md) | [Data Table](./components/data-table.md)
- **Feedback:** [Index](./feedback/index.md) | [Modal](./feedback/modal.md) | [Toast](./feedback/toast.md)

### Markenidentität

- [Logo-Guidelines](./logo-guidelines.md)

→ [Vollständiger Designer-Guide](./05-audience-guides/for-designers.md)

---

## Für Entwickler

Tokens, CSS-Variablen und technische Spezifikationen.

### Technische Referenz

- [Design Tokens Übersicht](./04-technical-reference/design-tokens.md)
- [CSS-Variablen Referenz](./04-technical-reference/css-variables.md)
- [Grid & Breakpoints](./04-technical-reference/grid-breakpoints.md)

### Quick Start

```css
@import 'design-system/build/css/variables.css';

.button {
  background: var(--button-primary-background-default);
}
```

### Komponenten mit Specs

Jede Komponenten-Dokumentation enthält technische Spezifikationen, ARIA-Patterns und Code-Beispiele:
- [Formulare](./forms/index.md) - Inputs, Validation, ARIA
- [Navigation](./navigation/index.md) - Focus Management, Keyboard Nav
- [Feedback](./feedback/index.md) - Live Regions, Modal Patterns

→ [Vollständiger Entwickler-Guide](./05-audience-guides/for-developers.md)

---

## Barrierefreiheit

WCAG 2.1 Level AA Compliance für alle Komponenten.

- [Accessibility Übersicht](./03-accessibility/overview.md) - Grundprinzipien und ARIA-Patterns
- [WCAG Compliance](./03-accessibility/wcag-compliance.md) - Komponenten-spezifische Anforderungen
- [Testing Guide](./03-accessibility/testing-guide.md) - Prüfmethoden und Checklisten

---

## Dokumentationsstruktur

```
docs/
├── README.md                          # Diese Datei (Hub)
├── 00-quick-start/
│   └── marketing-onboarding.md        # Marketing Onboarding (15-20 S.)
├── buttons.md
├── colors.md
├── typography.md
├── spacing-grid.md
├── effects.md
├── icons.md
├── logo-guidelines.md
├── forms/
│   ├── index.md
│   ├── text-input.md
│   ├── textarea.md
│   ├── select.md
│   ├── checkbox.md
│   ├── radio-button.md
│   ├── labels-helper-text.md
│   └── validation.md
├── navigation/
│   ├── index.md
│   ├── header.md
│   ├── mobile-drawer.md
│   ├── breadcrumb.md
│   └── footer.md
├── components/
│   ├── product-card.md
│   ├── content-card.md
│   └── data-table.md
├── feedback/
│   ├── index.md
│   ├── modal.md
│   ├── tooltip.md
│   ├── toast.md
│   └── loading.md
├── 03-accessibility/
│   ├── overview.md
│   ├── wcag-compliance.md
│   └── testing-guide.md
├── 04-technical-reference/
│   ├── design-tokens.md
│   ├── css-variables.md
│   └── grid-breakpoints.md
└── 05-audience-guides/
    ├── for-marketing.md
    ├── for-designers.md
    └── for-developers.md
```

---

## Asset-Dateien

| Was | Pfad |
|-----|------|
| Logo SVG | `design-system/assets/logo/hydrophon/svg/` |
| Logo PNG | `design-system/assets/logo/hydrophon/png/` |
| Token JSON | `design-system/tokens/` |
| CSS Variables | `design-system/build/css/variables.css` |

---

*Hydrophon Design-System v1.0*
*Dokumentation erstellt: Januar 2026*
