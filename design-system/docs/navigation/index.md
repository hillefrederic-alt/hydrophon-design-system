# Navigation & Content Structure

## Übersicht

Phase 4 des Hydrophon Design-Systems umfasst Navigation-Komponenten für die Website-Struktur sowie Content-Darstellungskomponenten für Produkte und Inhalte.

**Ziel:** Nutzer können sich effizient durch die Website navigieren, ihre Position in der Hierarchie verstehen und Inhalte schnell erfassen.

**Komponenten:** Navigation (Header, Mobile Drawer, Breadcrumb, Footer) und Content-Struktur (Cards, Tables)

## Navigation-Komponenten

### Header Navigation

**Zweck:** Primäre Website-Navigation mit Logo und Hauptmenü

**Dokumentation:** [header.md](./header.md)

**Eigenschaften:**

- Logo links + Navigation rechts (F-Pattern Reading Flow)
- Horizontale Menüstruktur für Desktop
- Sticky Behavior auf Desktop (Mobile: statisch)
- WCAG AAA Touch Targets (44px)
- `aria-current="page"` für aktiven Link
- Server-Side Rendering empfohlen (keine FOIS)

**Tokens:** `navigation.header.*` (48+ Tokens)

**Verwendung:** Jede Website-Seite

---

### Mobile Drawer

**Zweck:** Slide-Out Navigation für mobile Geräte

**Dokumentation:** [mobile-drawer.md](./mobile-drawer.md)

**Eigenschaften:**

- Hamburger-Toggle mit X-Icon für Close
- Links-seitiger Slide-Out mit Overlay
- Focus-Trap Pattern (Tab wrapping)
- ESC-Key schließt Drawer (WCAG 2.1.2)
- Focus auf Close-Button beim Öffnen
- Transform-basierte Animation (GPU-beschleunigt)
- Body-Scroll Lock während Drawer offen

**Tokens:** `navigation.drawer.*`

**Verwendung:** Mobile Viewport (< 768px)

---

### Breadcrumb Navigation

**Zweck:** Hierarchische Position innerhalb der Website anzeigen

**Dokumentation:** [breadcrumb.md](./breadcrumb.md)

**Eigenschaften:**

- Chevron (›) als Separator
- `<ol>` für semantische Liste
- `aria-current="page"` für aktuelle Seite
- Automatisches Screen Reader Hiding für Separatoren (CSS ::after)
- Responsive: Collapsing auf Mobile (nur Parent + Current)

**Tokens:** `navigation.breadcrumb.*`

**Verwendung:** Unterseiten mit Hierarchie (nicht Homepage)

**Beispiel-Pfad:**

```
Home > Produkte > Ablaufrinnen > Hydrophon 80cm
```

---

### Footer Navigation

**Zweck:** Sekundäre Navigation, rechtliche Links, Kontaktinformationen

**Dokumentation:** [footer.md](./footer.md)

**Eigenschaften:**

- CSS Grid Layout (responsive Spalten)
- Mehrere `<nav>` mit eindeutigen `aria-label`
- Uppercase Headings mit Letter-Spacing
- `line-height: 2` für Touch-Target-Optimierung (28px bei 14px Font)
- Automatische `role="contentinfo"` durch `<footer>`-Element

**Tokens:** `navigation.footer.*`

**Verwendung:** Jede Website-Seite

**Typische Sektionen:**

- Produkte
- Unternehmen
- Service & Support
- Rechtliches (Impressum, Datenschutz, AGB)

---

## Content-Komponenten

### Product Card

**Zweck:** Produkte in Grid-Listen anzeigen

**Dokumentation:** [../components/product-card.md](../components/product-card.md)

**Eigenschaften:**

- Quadratisches Bild (1:1 Aspect Ratio)
- Produktname + 2-3 Specs + CTA
- CSS Grid auto-fit Pattern (keine Media Queries)
- Hover-Effekt: Lift + Shadow (GPU-beschleunigt)
- Lazy Loading für Performance
- `<article>` für Semantik

**Tokens:** `card.*` (48+ Tokens)

**Verwendung:** Produktkataloge, Kategorie-Seiten, Suchergebnisse

**Grid-Pattern:**

```css
grid-template-columns: repeat(auto-fit, minmax(min(280px, 100%), 1fr));
```

---

### Content Card

**Zweck:** Allgemeine Inhalte (Blog, News, Features) präsentieren

**Dokumentation:** [../components/content-card.md](../components/content-card.md)

**Eigenschaften:**

- Flexibles Bildformat (16:9, 4:3, oder kein Bild)
- Meta-Informationen (Datum, Kategorie)
- Description mit `line-clamp` (max 3 Zeilen)
- Varianten: Vertikal, Horizontal, Text-Only, Feature mit Icon
- Gleiche Hover-Effekte wie Product Card

**Tokens:** `card.*` (shared mit Product Card)

**Verwendung:** Blog-Übersichten, News-Bereiche, Feature-Highlights

**Varianten:**

- **Vertikal:** Bild oben, Content unten
- **Horizontal:** Bild links, Content rechts
- **Text-Only:** Nur Content, kein Bild
- **Feature:** Icon statt Bild

---

### Data Table

**Zweck:** Strukturierte Daten in tabellarischer Form (Produktvergleiche)

**Dokumentation:** [../components/data-table.md](../components/data-table.md)

**Eigenschaften:**

- Semantisches `<table>` mit `<caption>`
- `scope="col"` auf allen `<th>` in `<thead>`
- `scope="row"` auf ersten `<th>` in `<tbody>`
- Zebra-Striping: Subtiler Kontrast (neutral.50)
- Row Hover: Hydrophon-Blau.50
- Responsive: Horizontaler Scroll (empfohlen)

**Tokens:** `table.*` (36+ Tokens)

**Verwendung:** Produktvergleiche, technische Datenblätter, Preislisten

**Accessibility:**

- WCAG 1.3.1 - Info and Relationships
- Screen Reader Table Commands
- Native Keyboard Navigation

---

## Token-Dateien

### tokens/navigation.json

**Inhalt:** Tokens für Header, Drawer, Breadcrumb, Footer

**Tokens:** 72+ Tokens

**Bereiche:**

- `navigation.header.*` – Header Heights, Link States, Logo Size
- `navigation.drawer.*` – Drawer Width, Overlay, Transition
- `navigation.breadcrumb.*` – Font Size, Colors, Separator
- `navigation.footer.*` – Grid, Link States, Headings

**Dokumentation:** [04-01-SUMMARY.md](../../.planning/phases/04-navigation-content-structure/04-01-SUMMARY.md), [04-02-SUMMARY.md](../../.planning/phases/04-navigation-content-structure/04-02-SUMMARY.md)

---

### tokens/cards.json

**Inhalt:** Tokens für Product Cards und Content Cards

**Tokens:** 48+ Tokens

**Bereiche:**

- `card.*` – Container, Padding, Border, Radius
- `card.shadow.*` – Default, Hover, Active
- `card.image.*` – Aspect Ratio, Background
- `card.title.*` – Font Size, Weight, Color
- `card.specs.*` – Font Size, Color, Line Height
- `card.cta.*` – Colors, Weight

**Dokumentation:** Siehe [Product Card](../components/product-card.md) und [Content Card](../components/content-card.md)

---

### tokens/tables.json

**Inhalt:** Tokens für Data Tables

**Tokens:** 36+ Tokens

**Bereiche:**

- `table.*` – Font Size, Background, Border
- `table.cell.*` – Padding
- `table.header.*` – Background, Color, Weight, Border
- `table.row.*` – Default, Stripe, Hover, Border
- `table.caption.*` – Font Size, Weight, Padding
- `table.responsive.*` – Min Width, Overflow

**Dokumentation:** Siehe [Data Table](../components/data-table.md)

---

## Architektur-Entscheidungen

### Navigation

1. **Logo links + Navigation rechts:** Folgt B2B F-Pattern Reading Flow
2. **Desktop-only Sticky Header:** Mobile Viewport zu wertvoll (64px = 10% Screen)
3. **Hamburger-only Mobile:** Kein Desktop Hamburger, volle horizontale Navigation sichtbar
4. **44px Touch Targets:** WCAG AAA (nicht nur AA) für B2B-Outdoor-Umgebungen
5. **Transform-basierte Slide-Animation:** GPU-beschleunigt (translateX vs position)
6. **Server-Side aria-current:** Verhindert Flash of Incorrect State (FOIS)

### Content

1. **CSS Grid auto-fit:** Responsive ohne Media Queries (intrinsic design)
2. **GPU-beschleunigter Hover:** `transform: translateY()` statt `top` oder `margin`
3. **Shadow-Animation via ::after:** `opacity` statt `box-shadow` (Performance)
4. **Horizontaler Scroll für Tables:** Behält Semantik für Screen Reader
5. **Subtile Zebra-Stripes:** neutral.50 (nicht stärker) für Lesbarkeit ohne visuelle Störung

---

## Accessibility-Patterns

### ARIA-Patterns

- `aria-current="page"` – Aktiver Navigations-Link
- `aria-expanded` – Drawer-Toggle-State
- `aria-controls` – Verknüpfung Toggle → Drawer
- `aria-label` – Eindeutige Labels für Navigation-Landmarks
- `aria-sort` – Sortierungs-State für Tabellen (optional)

### Semantic HTML

- `<nav>` – Navigation-Bereiche
- `<header>` – Site-Header (automatisch `role="banner"`)
- `<footer>` – Site-Footer (automatisch `role="contentinfo"`)
- `<article>` – Cards (self-contained content)
- `<table>` – Tabellarische Daten (nicht divs)
- `<caption>` – Tabellen-Beschreibung

### Keyboard-Navigation

- **Tab:** Navigiert durch interaktive Elemente
- **Enter/Space:** Aktiviert Links/Buttons
- **ESC:** Schließt Drawer
- **Arrow Keys:** Screen Reader Table Navigation

### Focus Management

- `:focus-visible` – Keyboard-only Focus Indicators
- Focus-Trap in Drawer – Tab wrapping innerhalb Modal
- Focus auf Close-Button beim Drawer-Öffnen

---

## Performance-Patterns

### CSS

- **Transform statt Position:** GPU-beschleunigt
- **Pseudo-Element für Shadow-Animation:** Nur `opacity` animieren
- **will-change sparsam:** Nur auf Hover/Focus-Kandidaten

### Images

- **Lazy Loading:** `loading="lazy"` auf alle Product/Content Images
- **Async Decoding:** `decoding="async"` für non-blocking
- **Aspect Ratio:** CSS `aspect-ratio` verhindert Layout Shift

### JavaScript

- **Focus-Trap nur bei Open:** Nicht pre-render
- **Body-Scroll Lock:** `overflow: hidden` + padding-right kompensation
- **ResizeObserver für Responsive:** Event-basiert statt Polling

---

## Verwandte Phasen

### Phase 1: Foundation & Brand Identity

- Farben, Typografie, Spacing → Basis für alle Navigation/Content-Komponenten

### Phase 2: Icons & Basic Interactions

- Lucide Icons → Hamburger, Close, Chevrons in Navigation
- Button-Komponenten → CTAs in Cards

### Phase 3: Forms & Data Input

- Input-Patterns → Suchfeld in Header (falls implementiert)

---

## Weitere Ressourcen

### WCAG Guidelines

- [WCAG 2.1.2 - No Keyboard Trap](https://www.w3.org/WAI/WCAG21/Understanding/no-keyboard-trap.html)
- [WCAG 2.4.7 - Focus Visible](https://www.w3.org/WAI/WCAG21/Understanding/focus-visible.html)
- [WCAG 1.3.1 - Info and Relationships](https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html)

### ARIA Patterns

- [ARIA: navigation role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/navigation_role)
- [ARIA: aria-current](https://www.w3.org/TR/wai-aria-1.1/#aria-current)
- [ARIA: Dialog (Modal) Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)

### CSS Patterns

- [CSS Grid auto-fit vs auto-fill](https://css-tricks.com/auto-sizing-columns-css-grid-auto-fill-vs-auto-fit/)
- [CSS Tricks: Responsive Tables](https://css-tricks.com/responsive-data-tables/)
- [Web.dev: Lazy Loading Images](https://web.dev/browser-level-image-lazy-loading/)

### Performance

- [Google Web Fundamentals: Animations](https://developers.google.com/web/fundamentals/design-and-ux/animations)
- [MDN: will-change](https://developer.mozilla.org/en-US/docs/Web/CSS/will-change)
- [Web.dev: prefers-reduced-motion](https://web.dev/prefers-reduced-motion/)

---

**Phase 4 abgeschlossen:** Navigation & Content Structure vollständig dokumentiert mit 6 Komponenten (Header, Mobile Drawer, Breadcrumb, Footer, Product Card, Content Card, Data Table) und 156+ Tokens.
