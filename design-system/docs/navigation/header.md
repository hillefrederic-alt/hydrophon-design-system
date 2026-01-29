# Header Navigation (Desktop)

Die Header-Navigation ermöglicht Nutzer*innen die primäre Orientierung auf der Website. Als persistentes Element bildet der Header den Einstieg in alle Hauptbereiche und kommuniziert die Markenidentität durch Logo-Platzierung.

**Anforderungen:** NAV-01 (Header-Struktur), NAV-02 (Navigation-Links), NAV-03 (Sticky-Behavior), NAV-04 (Responsive Breakpoints)

---

## Übersicht

Der Desktop-Header kombiniert Logo-Präsenz mit horizontaler Navigation. Die klare Aufteilung folgt dem F-Pattern-Lesefluss: Logo links (primäre visuelle Anker), Navigation rechts (Aktionselemente).

**Design-Prinzipien:**

1. **Klarheit** — Maximal 7 Hauptnavigationspunkte für kognitive Verarbeitung
2. **Konsistenz** — Identische Header-Struktur über alle Seiten hinweg
3. **Barrierefreiheit** — Semantische HTML-Struktur mit ARIA-Landmarks
4. **Performance** — Leichtgewichtige Implementierung ohne JavaScript-Frameworks

**B2B-Kontext:**

Professionelle B2B-Navigation vermeidet überladene Mega-Menüs und Dropdown-Strukturen. Der flache Header kommuniziert Übersichtlichkeit und Zielgerichtetheit — wichtige Signale für Geschäftskunden mit begrenzter Zeit.

---

## Anatomie

Der Header besteht aus drei funktionalen Bereichen:

```
┌─────────────────────────────────────────────────────────────┐
│  [Logo]                    [Nav 1] [Nav 2] [Nav 3] [Nav 4]  │
└─────────────────────────────────────────────────────────────┘
```

### 1. Logo-Bereich (Links)

- **Funktion:** Markenidentität, Link zur Startseite
- **Element:** `<a>` mit Logo-SVG
- **Sizing:** Minimum 120px Breite (aus Logo-Guidelines)
- **Verhalten:** Logo ist immer klickbar und führt zur Startseite

### 2. Hauptnavigation (Rechts)

- **Funktion:** Zugang zu allen Hauptbereichen
- **Element:** `<nav>` mit horizontaler Link-Liste
- **Layout:** Flexbox mit gap-spacing zwischen Links
- **Verhalten:** Hover-Feedback, aktiver Zustand für aktuelle Seite

### 3. Hamburger-Button (nur Mobile < 768px)

- **Funktion:** Öffnet Mobile-Drawer
- **Dokumentation:** Siehe [mobile-drawer.md](./mobile-drawer.md)
- **Desktop:** `display: none` — vollständige Navigation ist sichtbar

---

## Varianten

### Desktop (>= 768px)

Vollständige horizontale Navigation mit allen Links sichtbar.

**Merkmale:**

- Header-Höhe: 80px
- Horizontale Link-Anordnung
- Sticky-Behavior optional (siehe unten)
- Logo left + Nav right Layout

### Tablet/Mobile (< 768px)

Logo + Hamburger-Button, vollständige Navigation im Slide-Out Drawer.

**Merkmale:**

- Header-Höhe: 64px (kompakter für Viewport-Platzersparnis)
- Nur Logo und Hamburger sichtbar
- Navigation versteckt, wird über Drawer geöffnet
- Kein Sticky-Behavior (Mobile Viewport zu wertvoll)

**Breakpoint:**

```css
@media (min-width: 768px) {
  /* Desktop: Vollständige Navigation */
  .header__nav {
    display: flex;
  }
  .header__toggle {
    display: none;
  }
}

@media (max-width: 767px) {
  /* Mobile: Nur Hamburger */
  .header__nav {
    display: none;
  }
  .header__toggle {
    display: flex;
  }
}
```

---

## Sticky-Behavior

Der Header kann optional als `position: sticky` implementiert werden, um beim Scrollen sichtbar zu bleiben.

**Empfehlung:** Nur auf Desktop aktivieren. Mobile Viewports profitieren von maximalem Content-Platz.

### Desktop Sticky mit Scroll-Shadow

Beim Scrollen erhält der Header einen subtilen Schatten für visuelle Trennung vom Content.

**Implementierung:**

```html
<header class="header" id="main-header">
  <!-- Header Content -->
</header>
```

```css
.header {
  position: sticky;
  top: 0;
  z-index: var(--navigation-header-z-index); /* 100 */
  background-color: var(--navigation-header-background);
  border-bottom: var(--navigation-header-border-bottom-width) solid var(--navigation-header-border-bottom-color);
  height: var(--navigation-header-height-desktop); /* 80px */
  transition: box-shadow 200ms ease-in-out;
}

.header--scrolled {
  box-shadow: var(--navigation-header-shadow); /* 0 1px 2px rgba(0,0,0,0.05) */
}

@media (max-width: 767px) {
  .header {
    position: relative; /* Kein Sticky auf Mobile */
    height: var(--navigation-header-height-mobile); /* 64px */
  }
}
```

**JavaScript für Scroll-Detection:**

```javascript
const header = document.getElementById('main-header');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;

  if (currentScrollY > 10) {
    header.classList.add('header--scrolled');
  } else {
    header.classList.remove('header--scrolled');
  }

  lastScrollY = currentScrollY;
});
```

**Performance-Tipp:** Verwende `requestAnimationFrame` oder Debouncing für bessere Scroll-Performance bei älteren Geräten.

---

## Navigation-Links

### Zustände

Navigation-Links durchlaufen vier visuelle Zustände:

#### 1. Default (Standard)

Der Ruhezustand für nicht-aktive Links.

**Tokens:**

- Farbe: `navigation.link.color.default` (neutral.700)
- Schriftgröße: `navigation.link.fontSize` (16px)
- Schriftgewicht: `navigation.link.fontWeight.default` (500 medium)

**CSS:**

```css
.nav__link {
  color: var(--navigation-link-color-default);
  font-size: var(--navigation-link-font-size);
  font-weight: var(--navigation-link-font-weight-default);
  padding: var(--navigation-link-padding-y) var(--navigation-link-padding-x);
  text-decoration: none;
  transition: var(--navigation-link-transition);
}
```

#### 2. Hover (Maus darüber)

Visuelles Feedback bei Mouse-Over.

**Tokens:**

- Farbe: `navigation.link.color.hover` (neutral.900)

**CSS:**

```css
.nav__link:hover {
  color: var(--navigation-link-color-hover);
}
```

#### 3. Active (Aktuelle Seite)

Die aktuell angezeigte Seite erhält besondere Hervorhebung.

**Tokens:**

- Farbe: `navigation.link.color.active` (hydrophon.blau.600)
- Schriftgewicht: `navigation.link.fontWeight.active` (600 semibold)
- Indikator-Farbe: `navigation.activeIndicator.color` (hydrophon.blau.500)
- Indikator-Höhe: `navigation.activeIndicator.height` (2px)

**CSS:**

```css
.nav__link[aria-current="page"] {
  color: var(--navigation-link-color-active);
  font-weight: var(--navigation-link-font-weight-active);
  position: relative;
}

.nav__link[aria-current="page"]::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: var(--navigation-link-padding-x);
  right: var(--navigation-link-padding-x);
  height: var(--navigation-active-indicator-height);
  background-color: var(--navigation-active-indicator-color);
}
```

#### 4. Focus (Tastatur-Navigation)

Sichtbarer Focus-Ring für Tastatur-Nutzer*innen.

**Tokens:**

- Outline-Farbe: `navigation.focus.outline.color` (hydrophon.blau.300)
- Outline-Breite: `navigation.focus.outline.width` (2px)
- Outline-Offset: `navigation.focus.outline.offset` (2px)

**CSS:**

```css
.nav__link:focus-visible {
  outline: var(--navigation-focus-outline-width) solid var(--navigation-focus-outline-color);
  outline-offset: var(--navigation-focus-outline-offset);
  border-radius: 2px;
}

/* Focus-Ring nur bei Tastatur-Navigation, nicht bei Maus-Klick */
.nav__link:focus:not(:focus-visible) {
  outline: none;
}
```

### aria-current Pattern

Das `aria-current="page"` Attribut kommuniziert die aktuelle Seite an assistive Technologien.

**Regeln:**

1. **Nur EIN Element** darf `aria-current="page"` haben
2. **Server-seitig setzen** — nicht per JavaScript nachladen (verhindert Flash of Incorrect State)
3. **Nicht bei Logo** — nur bei Navigation-Links
4. **Kombination mit visuellem Indikator** — Color + Underline + Font Weight

**HTML-Beispiel:**

```html
<nav class="header__nav" aria-label="Hauptnavigation">
  <a href="/" class="nav__link">Home</a>
  <a href="/produkte" class="nav__link" aria-current="page">Produkte</a>
  <a href="/loesungen" class="nav__link">Lösungen</a>
  <a href="/support" class="nav__link">Support</a>
  <a href="/kontakt" class="nav__link">Kontakt</a>
</nav>
```

**Server-seitig (Beispiel mit Template-Logik):**

```html
<a
  href="/produkte"
  class="nav__link"
  {{ if currentPage == "produkte" }}aria-current="page"{{ end }}
>
  Produkte
</a>
```

---

## Layout

### Flexbox-Container

```css
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 var(--navigation-header-padding-x-desktop); /* 24px */
  height: var(--navigation-header-height-desktop); /* 80px */
  max-width: var(--container-xl); /* 1280px */
  margin: 0 auto;
}
```

**Layout-Prinzipien:**

- `justify-content: space-between` — Logo links, Navigation rechts
- `align-items: center` — Vertikale Zentrierung beider Elemente
- `max-width: 1280px` — Begrenzt Header-Breite auf großen Bildschirmen
- `margin: 0 auto` — Zentriert Container horizontal

### Navigation-Liste

```css
.header__nav {
  display: flex;
  gap: var(--navigation-link-gap); /* 24px */
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
}
```

**Spacing:**

- `gap: 24px` zwischen Links (nicht margin/padding, um konsistente Abstände zu garantieren)
- Touch-Targets mindestens 44x44px (erfüllt durch padding + font-size)

---

## Tokens

| Token-Name                                | Wert              | Beschreibung                                     |
|-------------------------------------------|-------------------|--------------------------------------------------|
| `navigation.header.height.desktop`        | 80px              | Header-Höhe auf Desktop-Geräten                  |
| `navigation.header.height.mobile`         | 64px              | Header-Höhe auf mobilen Geräten                  |
| `navigation.header.background`            | #ffffff           | Header Hintergrundfarbe (neutral.white)          |
| `navigation.header.borderBottom.width`    | 1px               | Untere Rahmenlinie Breite                        |
| `navigation.header.borderBottom.color`    | #e5e5e5           | Untere Rahmenlinie Farbe (neutral.200)           |
| `navigation.header.zIndex`                | 100               | Z-Index für Sticky-Verhalten                     |
| `navigation.header.shadow`                | 0 1px 2px ...     | Schatten beim Scrollen (shadow.sm)               |
| `navigation.header.padding.x.desktop`     | 24px              | Horizontales Padding Desktop (spacing.6)         |
| `navigation.header.padding.x.mobile`      | 16px              | Horizontales Padding Mobile (spacing.4)          |
| `navigation.link.color.default`           | #404040           | Link Standard-Farbe (neutral.700)                |
| `navigation.link.color.hover`             | #171717           | Link Hover-Farbe (neutral.900)                   |
| `navigation.link.color.active`            | #007bb8           | Link aktiv-Farbe (hydrophon.blau.600)            |
| `navigation.link.fontSize`                | 16px              | Link Schriftgröße (fontSize.base)                |
| `navigation.link.fontWeight.default`      | 500               | Link Standard-Gewicht (fontWeight.medium)        |
| `navigation.link.fontWeight.active`       | 600               | Link aktiv-Gewicht (fontWeight.semibold)         |
| `navigation.link.padding.x`               | 16px              | Link horizontales Padding (spacing.4)            |
| `navigation.link.padding.y`               | 12px              | Link vertikales Padding (spacing.3)              |
| `navigation.link.gap`                     | 24px              | Abstand zwischen Links (spacing.6)               |
| `navigation.activeIndicator.color`        | #008bd2           | Aktiver Link Unterstreichung (hydrophon.blau.500)|
| `navigation.activeIndicator.height`       | 2px               | Aktiver Link Unterstreichung Höhe                |
| `navigation.focus.outline.color`          | #5cc2f1           | Focus Outline Farbe (hydrophon.blau.300)         |
| `navigation.focus.outline.width`          | 2px               | Focus Outline Breite                             |
| `navigation.focus.outline.offset`         | 2px               | Focus Outline Abstand                            |

**CSS-Variable-Mapping:**

Tokens werden von Style Dictionary in CSS Custom Properties transformiert:

```
navigation.header.height.desktop  → --navigation-header-height-desktop
navigation.link.color.default     → --navigation-link-color-default
navigation.focus.outline.color    → --navigation-focus-outline-color
```

---

## Code-Beispiele

### Vollständiges HTML

```html
<header class="header" role="banner">
  <div class="header__container">
    <!-- Logo-Bereich -->
    <a href="/" class="header__logo" aria-label="Zur Startseite">
      <img
        src="/assets/logo/hydrophon-logo.svg"
        alt="Hydrophon"
        width="180"
        height="auto"
      />
    </a>

    <!-- Desktop Navigation -->
    <nav class="header__nav" aria-label="Hauptnavigation">
      <a href="/" class="nav__link">Home</a>
      <a href="/produkte" class="nav__link" aria-current="page">Produkte</a>
      <a href="/loesungen" class="nav__link">Lösungen</a>
      <a href="/support" class="nav__link">Support</a>
      <a href="/unternehmen" class="nav__link">Unternehmen</a>
      <a href="/kontakt" class="nav__link">Kontakt</a>
    </nav>

    <!-- Mobile Toggle (nur < 768px sichtbar) -->
    <button
      class="header__toggle"
      aria-label="Menü öffnen"
      aria-expanded="false"
      aria-controls="mobile-drawer"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <line x1="3" y1="12" x2="21" y2="12" stroke-width="2"/>
        <line x1="3" y1="6" x2="21" y2="6" stroke-width="2"/>
        <line x1="3" y1="18" x2="21" y2="18" stroke-width="2"/>
      </svg>
    </button>
  </div>
</header>
```

### Vollständiges CSS

```css
/* Header Container */
.header {
  position: sticky;
  top: 0;
  z-index: var(--navigation-header-z-index);
  background-color: var(--navigation-header-background);
  border-bottom: var(--navigation-header-border-bottom-width) solid var(--navigation-header-border-bottom-color);
  transition: box-shadow 200ms ease-in-out;
}

.header--scrolled {
  box-shadow: var(--navigation-header-shadow);
}

.header__container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: var(--navigation-header-height-desktop);
  max-width: var(--container-xl);
  margin: 0 auto;
  padding: 0 var(--navigation-header-padding-x-desktop);
}

/* Logo */
.header__logo {
  display: flex;
  align-items: center;
  text-decoration: none;
}

.header__logo img {
  display: block;
  height: auto;
  max-height: 48px; /* Gibt Logo Raum innerhalb 80px Header */
}

/* Desktop Navigation */
.header__nav {
  display: flex;
  gap: var(--navigation-link-gap);
  align-items: center;
  margin: 0;
  padding: 0;
  list-style: none;
}

.nav__link {
  color: var(--navigation-link-color-default);
  font-size: var(--navigation-link-font-size);
  font-weight: var(--navigation-link-font-weight-default);
  padding: var(--navigation-link-padding-y) var(--navigation-link-padding-x);
  text-decoration: none;
  transition: var(--navigation-link-transition);
  position: relative;
}

.nav__link:hover {
  color: var(--navigation-link-color-hover);
}

.nav__link[aria-current="page"] {
  color: var(--navigation-link-color-active);
  font-weight: var(--navigation-link-font-weight-active);
}

.nav__link[aria-current="page"]::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: var(--navigation-link-padding-x);
  right: var(--navigation-link-padding-x);
  height: var(--navigation-active-indicator-height);
  background-color: var(--navigation-active-indicator-color);
}

.nav__link:focus-visible {
  outline: var(--navigation-focus-outline-width) solid var(--navigation-focus-outline-color);
  outline-offset: var(--navigation-focus-outline-offset);
  border-radius: 2px;
}

/* Mobile Toggle (versteckt auf Desktop) */
.header__toggle {
  display: none;
}

/* Responsive: Mobile */
@media (max-width: 767px) {
  .header {
    position: relative; /* Kein Sticky */
  }

  .header__container {
    height: var(--navigation-header-height-mobile);
    padding: 0 var(--navigation-header-padding-x-mobile);
  }

  .header__nav {
    display: none; /* Versteckt auf Mobile, im Drawer sichtbar */
  }

  .header__toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--navigation-toggle-size);
    height: var(--navigation-toggle-size);
    padding: 0;
    border: none;
    background-color: var(--navigation-toggle-background-default);
    color: var(--navigation-toggle-color-default);
    border-radius: var(--navigation-toggle-border-radius);
    cursor: pointer;
    transition: background-color 150ms ease-in-out, color 150ms ease-in-out;
  }

  .header__toggle:hover {
    background-color: var(--navigation-toggle-background-hover);
    color: var(--navigation-toggle-color-hover);
  }
}
```

---

## Barrierefreiheit

### Semantische HTML-Struktur

```html
<header role="banner">
  <nav aria-label="Hauptnavigation">
    <!-- Navigation Links -->
  </nav>
</header>
```

**ARIA-Landmarks:**

- `role="banner"` auf `<header>` — Identifiziert primären Header (nur einmal pro Seite)
- `<nav>` — Semantisches Element für Navigationsbereich
- `aria-label="Hauptnavigation"` — Benennt Navigation für Screenreader

### Tastatur-Navigation

**Anforderungen:**

- `Tab` — Springt zum nächsten Link
- `Shift + Tab` — Springt zum vorherigen Link
- `Enter` — Aktiviert Link
- `:focus-visible` — Zeigt Focus-Ring nur bei Tastatur-Navigation

**WCAG 2.4.3 (Focus Order):** Links erscheinen in logischer Reihenfolge (left-to-right).

### aria-current für aktuelle Seite

Screenreader kündigen an: "Produkte, aktuelle Seite, Link" statt nur "Produkte, Link".

**WCAG 1.3.1 (Info and Relationships):** Visuelle Information (Farbe, Unterstreichung) wird programmatisch übermittelt.

### Kontrast-Anforderungen

| Element          | Farbe            | Hintergrund | Kontrast | WCAG Level |
|------------------|------------------|-------------|----------|------------|
| Link Default     | neutral.700      | white       | 10.4:1   | AAA        |
| Link Hover       | neutral.900      | white       | 16.1:1   | AAA        |
| Link Active      | blau.600         | white       | 5.8:1    | AA         |
| Focus Outline    | blau.300         | white       | 3.2:1    | AA (UI)    |

**WCAG 1.4.3 (Contrast Minimum):** Alle Text-Kontraste erfüllen mindestens AA (4.5:1 für Text).

**WCAG 1.4.11 (Non-text Contrast):** Focus Outline erfüllt 3:1 für UI-Komponenten.

### Skip-Link Pattern (optional)

Ermöglicht Tastatur-Nutzer*innen, direkt zum Hauptinhalt zu springen.

```html
<a href="#main-content" class="skip-link">
  Zum Hauptinhalt springen
</a>

<header class="header">
  <!-- Header Content -->
</header>

<main id="main-content">
  <!-- Page Content -->
</main>
```

```css
.skip-link {
  position: absolute;
  top: -100px;
  left: 0;
  background: var(--hydrophon-blau-500);
  color: white;
  padding: 12px 16px;
  text-decoration: none;
  z-index: 9999;
}

.skip-link:focus {
  top: 0;
}
```

**Empfehlung:** Implementiere Skip-Links für Websites mit umfangreichen Headern oder komplexen Navigationen.

---

## Best Practices

### Inhaltliche Richtlinien

1. **Maximal 7 Hauptnavigationspunkte**
   Millers Gesetz: Menschen können 7±2 Informationseinheiten im Arbeitsgedächtnis behalten. Mehr Links führen zu Entscheidungslähmung.

2. **Klare, aktionsorientierte Labels**
   ✅ "Produkte", "Support", "Kontakt"
   ❌ "Mehr erfahren", "Hier klicken", "Seite 1"

3. **Konsistente Benennung über alle Seiten**
   Wenn "Produkte" im Header steht, muss der `<title>` der Seite "Produkte" heißen, nicht "Produktübersicht".

4. **Logische Informationsarchitektur**
   Sortiere Links nach Nutzerpriorität: Home → Produkte → Support → Unternehmen → Kontakt

### Technische Richtlinien

1. **Server-seitig aria-current setzen**
   Verhindert Flash of Incorrect State bei JavaScript-Initialisierung.

2. **Verwende semantisches HTML**
   `<nav>` statt `<div role="navigation">` — semantische Elemente sind besser unterstützt.

3. **Optimiere Logo-Asset**
   SVG mit SVGO komprimieren, `alt="Hydrophon"` Text für Image Replacement.

4. **Implementiere Preconnect für externe Fonts**
   ```html
   <link rel="preconnect" href="https://fonts.googleapis.com">
   ```

5. **Lazy-load Scroll-Shadow JavaScript**
   Verwende Intersection Observer API statt Scroll-Events für bessere Performance.

### UX-Richtlinien

1. **Sichtbares Feedback für alle Interaktionen**
   Hover, Focus und Active-Zustände müssen visuell unterscheidbar sein.

2. **Keine plötzlichen Layout-Shifts**
   Active-Indikator mit `position: absolute` verhindert Layout-Verschiebung.

3. **Touch-Targets mindestens 44x44px**
   Link-Padding (12px + 16px × 2 = 40px) + Font-Size (16px) ≈ 44px vertikal.

---

## Nicht verwenden

### ❌ Dropdown-Menüs auf Desktop

**Problem:** Verstecken Inhalt, benötigen komplexe JavaScript-Logik, sind schwierig barrierefrei umzusetzen.

**Alternative:** Flache Navigation mit max. 7 Links, detaillierte Unterseiten mit Breadcrumb-Navigation.

### ❌ Versteckte Navigation auf Desktop

**Problem:** "Hamburger-only" Header auf Desktop verwirren Nutzer*innen, die horizontale Navigation erwarten.

**Alternative:** Vollständige Navigation auf Desktop, Hamburger nur auf Mobile.

### ❌ Auto-Hiding Header (versteckt beim Scrollen)

**Problem:** Nutzer*innen verlieren Orientierung, müssen nach oben scrollen, um Navigation zu sehen.

**Alternative:** Sticky Header bleibt immer sichtbar.

### ❌ Animations-Exzesse

**Problem:** Slide-In-Animationen, Fadein-Effekte und Parallax-Scrolling wirken unprofessionell im B2B-Kontext.

**Alternative:** Subtile 150ms Farbübergänge (transition: color), keine bewegten Elemente.

### ❌ JavaScript-abhängige Navigation

**Problem:** Wenn JavaScript nicht lädt, ist die Navigation unbrauchbar.

**Alternative:** HTML-Links funktionieren immer, JavaScript nur für Progressive Enhancement (Scroll-Shadow).

---

## Verwandte Komponenten

- **[Mobile Drawer](./mobile-drawer.md)** — Mobile Navigation mit Hamburger-Button
- **[Breadcrumb](./breadcrumb.md)** — Sekundäre Navigation für Hierarchie
- **[Footer](./footer.md)** — Footer-Navigation mit Sitemap

---

## Changelog

| Version | Datum       | Änderungen                                           |
|---------|-------------|------------------------------------------------------|
| 1.0     | 2026-01-29  | Initiale Dokumentation (Header Desktop Navigation)  |
