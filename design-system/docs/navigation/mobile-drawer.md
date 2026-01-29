# Mobile Navigation (Drawer)

Die Mobile Navigation verwendet ein Hamburger-Menü mit Slide-Out-Drawer Pattern. Dieses bewährte Pattern ermöglicht vollständige Navigation auf kleinen Bildschirmen ohne Viewport-Platz zu verschwenden.

**Anforderungen:** NAV-05 (Hamburger-Button), NAV-06 (Slide-Out-Drawer), NAV-07 (Focus-Management), NAV-08 (Keyboard-Accessibility)

---

## Übersicht

Das Mobile-Drawer-Pattern besteht aus zwei Komponenten:

1. **Hamburger-Button** — Toggle-Button im Header (nur sichtbar < 768px)
2. **Slide-Out-Drawer** — Overlay-Panel mit vollständiger Navigation

**Warum dieses Pattern:**

- **Standardisiert** — Nutzer*innen kennen Hamburger-Icon als Navigation-Indikator
- **Voll zugänglich** — Mit korrektem ARIA und Focus-Management WCAG-konform
- **Vollständige Navigation** — Alle Links sichtbar, kein versteckter Content
- **Touch-optimiert** — Große Touch-Targets (48px Höhe) für Mobilgeräte

**B2B-Kontext:**

Mobile B2B-Nutzer*innen sind oft unterwegs (Baustelle, Lager, Außendienst). Die Navigation muss mit einer Hand bedienbar sein, schnell öffnen und klare Hierarchie zeigen.

---

## Anatomie

Der Mobile-Drawer besteht aus fünf Elementen:

```
┌─────────────────────┐
│ [X Close]           │  ← Close-Button
│                     │
│ • Home              │  ← Navigation-Links
│ • Produkte          │     (vertikal gestapelt)
│ • Lösungen          │
│ • Support           │
│ • Unternehmen       │
│ • Kontakt           │
│                     │
└─────────────────────┘
         │
    [Backdrop]  ← Halbtransparentes Overlay
```

### 1. Hamburger-Button (Toggle)

**Funktion:** Öffnet/schließt den Drawer

**Element:** `<button>` mit aria-expanded und aria-controls

**Sizing:** 44x44px (WCAG AAA Touch-Target)

**Icon:** Lucide Menu (24px, 2px stroke)

### 2. Drawer-Container

**Funktion:** Enthält die vollständige Navigation

**Element:** `<div>` mit `role="dialog"`, `aria-modal="true"`

**Sizing:** 280px Breite, max 80vw (auf sehr kleinen Geräten)

**Position:** Fixed, links außerhalb des Viewports, slide-in via CSS Transform

### 3. Close-Button

**Funktion:** Schließt den Drawer

**Element:** `<button>` mit aria-label

**Icon:** Lucide X (24px, 2px stroke)

**Verhalten:** Erhält Fokus beim Öffnen des Drawers

### 4. Navigation-Links

**Funktion:** Gleiche Links wie Desktop-Header

**Element:** `<nav>` mit vertikaler Link-Liste

**Sizing:** 48px Mindesthöhe für Touch-Targets

**States:** Default, Hover, Active (aria-current), Focus

### 5. Backdrop-Overlay

**Funktion:** Visueller Kontext, schließt Drawer bei Klick

**Element:** `<div>` mit rgba(0, 0, 0, 0.5) Background

**Verhalten:** Fade-in/out mit Drawer, klickbar zum Schließen

---

## Hamburger-Button

### Visuelles Design

**Tokens:**

- Größe: `navigation.toggle.size` (44px)
- Icon-Größe: `navigation.toggle.iconSize` (24px)
- Farbe Default: `navigation.toggle.color.default` (neutral.700)
- Farbe Hover: `navigation.toggle.color.hover` (neutral.900)
- Hintergrund Default: `navigation.toggle.background.default` (transparent)
- Hintergrund Hover: `navigation.toggle.background.hover` (neutral.100)
- Border-Radius: `navigation.toggle.borderRadius` (4px)

### HTML-Struktur

```html
<button
  class="header__toggle"
  aria-label="Menü öffnen"
  aria-expanded="false"
  aria-controls="mobile-drawer"
  id="drawer-toggle"
>
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
</button>
```

### CSS

```css
.header__toggle {
  display: none; /* Nur auf Mobile sichtbar */
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

.header__toggle:focus-visible {
  outline: var(--navigation-focus-outline-width) solid var(--navigation-focus-outline-color);
  outline-offset: var(--navigation-focus-outline-offset);
}

@media (max-width: 767px) {
  .header__toggle {
    display: flex;
  }
}
```

### ARIA-Attribute

| Attribut         | Wert (geschlossen) | Wert (offen)      | Zweck                                              |
|------------------|--------------------|-------------------|----------------------------------------------------|
| `aria-label`     | "Menü öffnen"      | "Menü schließen"  | Benennt Button für Screenreader                    |
| `aria-expanded`  | "false"            | "true"            | Kommuniziert Drawer-Status                         |
| `aria-controls`  | "mobile-drawer"    | "mobile-drawer"   | Verknüpft Button mit gesteuertem Element           |

**JavaScript-Update beim Toggle:**

```javascript
function toggleDrawer() {
  const isOpen = toggle.getAttribute('aria-expanded') === 'true';

  if (isOpen) {
    closeDrawer();
  } else {
    openDrawer();
  }
}
```

### Sichtbarkeit (Responsive)

**Desktop (>= 768px):** `display: none` — Desktop-Navigation ist im Header sichtbar

**Mobile (< 768px):** `display: flex` — Hamburger ersetzt horizontale Navigation

---

## Drawer-Verhalten

### Öffnen (Opening)

**Trigger:** Klick auf Hamburger-Button

**Schritte:**

1. Entferne `hidden`-Attribut vom Drawer
2. Setze `aria-hidden="false"` auf Drawer
3. Setze `aria-expanded="true"` auf Toggle-Button
4. Update Toggle aria-label zu "Menü schließen"
5. Bewege Fokus auf Close-Button
6. Aktiviere Fokus-Trap (Tab-Loop innerhalb Drawer)
7. Add Event-Listener für ESC-Taste

**CSS-Animation:** Transform von `translateX(-100%)` zu `translateX(0)`

**JavaScript:**

```javascript
function openDrawer() {
  const drawer = document.getElementById('mobile-drawer');
  const toggle = document.getElementById('drawer-toggle');
  const closeButton = drawer.querySelector('.drawer__close');

  // Update Attribute
  drawer.removeAttribute('hidden');
  drawer.setAttribute('aria-hidden', 'false');
  toggle.setAttribute('aria-expanded', 'true');
  toggle.setAttribute('aria-label', 'Menü schließen');

  // Body Scroll Lock (verhindert Hintergrund-Scrollen)
  document.body.style.overflow = 'hidden';

  // Fokus auf Close-Button
  closeButton.focus();

  // Fokus-Trap aktivieren
  trapFocus(drawer);

  // ESC-Handler
  document.addEventListener('keydown', handleEscapeKey);
}
```

### Schließen (Closing)

**Trigger:**

- Klick auf Close-Button
- Klick auf Backdrop
- ESC-Taste
- Klick auf Navigation-Link (Navigation zu neuer Seite)

**Schritte:**

1. Setze `hidden`-Attribut auf Drawer
2. Setze `aria-hidden="true"` auf Drawer
3. Setze `aria-expanded="false"` auf Toggle-Button
4. Update Toggle aria-label zu "Menü öffnen"
5. Bewege Fokus zurück zum Toggle-Button
6. Deaktiviere Fokus-Trap
7. Remove Event-Listener für ESC-Taste

**CSS-Animation:** Transform von `translateX(0)` zu `translateX(-100%)`

**JavaScript:**

```javascript
function closeDrawer() {
  const drawer = document.getElementById('mobile-drawer');
  const toggle = document.getElementById('drawer-toggle');

  // Update Attribute
  drawer.setAttribute('hidden', '');
  drawer.setAttribute('aria-hidden', 'true');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Menü öffnen');

  // Body Scroll Unlock
  document.body.style.overflow = '';

  // Fokus zurück zum Toggle
  toggle.focus();

  // ESC-Handler entfernen
  document.removeEventListener('keydown', handleEscapeKey);
}

function handleEscapeKey(event) {
  if (event.key === 'Escape') {
    closeDrawer();
  }
}
```

### Animation

**CSS Transform + Transition:**

```css
.drawer {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: var(--navigation-drawer-width);
  max-width: var(--navigation-drawer-max-width);
  background-color: var(--navigation-drawer-background);
  box-shadow: var(--navigation-drawer-shadow);
  z-index: var(--navigation-drawer-z-index);
  transform: translateX(-100%);
  transition: transform var(--navigation-drawer-transition-duration) var(--navigation-drawer-transition-easing);
}

.drawer:not([hidden]) {
  transform: translateX(0);
}

.drawer__backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--navigation-drawer-backdrop-color);
  z-index: calc(var(--navigation-drawer-z-index) - 1);
  opacity: 0;
  transition: opacity var(--navigation-drawer-transition-duration) var(--navigation-drawer-transition-easing);
}

.drawer__backdrop:not([hidden]) {
  opacity: 1;
}
```

**Timing:** 300ms ease-in-out (aus Token `navigation.drawer.transition.duration`)

---

## Focus-Trap Implementation

Ein Focus-Trap hält den Keyboard-Fokus innerhalb des Drawers. Ohne Focus-Trap könnte Tab den Fokus auf Elemente hinter dem Drawer bewegen.

### Anforderungen

1. **Tab am Ende** wraps zum ersten fokussierbaren Element
2. **Shift+Tab am Anfang** wraps zum letzten fokussierbaren Element
3. **Nur sichtbare, fokussierbare Elemente** werden berücksichtigt

### Vollständige JavaScript-Implementation

```javascript
function trapFocus(element) {
  const focusableElements = element.querySelectorAll(
    'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
  );

  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];

  function handleTabKey(event) {
    if (event.key !== 'Tab') return;

    if (event.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstFocusable) {
        event.preventDefault();
        lastFocusable.focus();
      }
    } else {
      // Tab
      if (document.activeElement === lastFocusable) {
        event.preventDefault();
        firstFocusable.focus();
      }
    }
  }

  element.addEventListener('keydown', handleTabKey);

  // Cleanup-Funktion für Event-Listener-Entfernung beim Schließen
  return () => {
    element.removeEventListener('keydown', handleTabKey);
  };
}
```

### Verwendung

```javascript
let removeFocusTrap = null;

function openDrawer() {
  // ... andere Opening-Logik

  removeFocusTrap = trapFocus(drawer);
}

function closeDrawer() {
  // ... andere Closing-Logik

  if (removeFocusTrap) {
    removeFocusTrap();
    removeFocusTrap = null;
  }
}
```

---

## Navigation-Links im Drawer

### Layout

Navigation-Links werden vertikal gestapelt statt horizontal angeordnet.

**Tokens:**

- Link Padding X: `navigation.drawer.link.padding.x` (16px)
- Link Padding Y: `navigation.drawer.link.padding.y` (12px)
- Link Min-Height: `navigation.drawer.link.minHeight` (48px)
- Link Gap: `navigation.drawer.link.gap` (8px)

### HTML-Struktur

```html
<nav class="drawer__nav" aria-label="Hauptnavigation">
  <a href="/" class="drawer__link">Home</a>
  <a href="/produkte" class="drawer__link" aria-current="page">Produkte</a>
  <a href="/loesungen" class="drawer__link">Lösungen</a>
  <a href="/support" class="drawer__link">Support</a>
  <a href="/unternehmen" class="drawer__link">Unternehmen</a>
  <a href="/kontakt" class="drawer__link">Kontakt</a>
</nav>
```

### CSS

```css
.drawer__nav {
  display: flex;
  flex-direction: column;
  gap: var(--navigation-drawer-link-gap);
  padding: var(--navigation-drawer-padding);
}

.drawer__link {
  display: flex;
  align-items: center;
  min-height: var(--navigation-drawer-link-min-height);
  padding: var(--navigation-drawer-link-padding-y) var(--navigation-drawer-link-padding-x);
  color: var(--navigation-link-color-default);
  font-size: var(--navigation-link-font-size);
  font-weight: var(--navigation-link-font-weight-default);
  text-decoration: none;
  border-radius: var(--border-radius-base);
  transition: var(--navigation-link-transition);
}

.drawer__link:hover {
  color: var(--navigation-link-color-hover);
  background-color: var(--neutral-100);
}

.drawer__link[aria-current="page"] {
  color: var(--navigation-link-color-active);
  font-weight: var(--navigation-link-font-weight-active);
  background-color: var(--hydrophon-blau-50);
  border-left: 3px solid var(--navigation-active-indicator-color);
}

.drawer__link:focus-visible {
  outline: var(--navigation-focus-outline-width) solid var(--navigation-focus-outline-color);
  outline-offset: var(--navigation-focus-outline-offset);
}
```

### Zustände

Drawer-Links verwenden die gleichen Zustände wie Desktop-Navigation:

1. **Default** — neutral.700, medium weight
2. **Hover** — neutral.900 + neutral.100 Background
3. **Active (aria-current)** — blau.600, semibold, blau.50 Background, linker Border
4. **Focus** — 2px Outline blau.300

**Unterschied zum Desktop:**

- **Vertikales Layout** statt horizontal
- **Größere Touch-Targets** (48px min-height)
- **Hintergrundfarbe bei Hover/Active** statt nur Textfarbe

---

## Tokens

| Token-Name                                | Wert              | Beschreibung                                     |
|-------------------------------------------|-------------------|--------------------------------------------------|
| `navigation.drawer.width`                 | 280px             | Drawer feste Breite                              |
| `navigation.drawer.maxWidth`              | 80vw              | Drawer maximale Breite (kleine Geräte)           |
| `navigation.drawer.background`            | #ffffff           | Drawer Hintergrundfarbe (neutral.white)          |
| `navigation.drawer.shadow`                | 0 20px 25px ...   | Drawer Schatten (shadow.xl)                      |
| `navigation.drawer.backdropColor`         | rgba(0,0,0,0.5)   | Backdrop Overlay Farbe                           |
| `navigation.drawer.zIndex`                | 1000              | Drawer z-Index (über Content)                    |
| `navigation.drawer.transition.duration`   | 300ms             | Slide-Animation Dauer                            |
| `navigation.drawer.transition.easing`     | ease-in-out       | Slide-Animation Easing                           |
| `navigation.drawer.padding`               | 24px              | Drawer inneres Padding (spacing.6)               |
| `navigation.drawer.link.padding.x`        | 16px              | Drawer Link horizontales Padding (spacing.4)     |
| `navigation.drawer.link.padding.y`        | 12px              | Drawer Link vertikales Padding (spacing.3)       |
| `navigation.drawer.link.minHeight`        | 48px              | Drawer Link minimale Höhe (Touch-Target)         |
| `navigation.drawer.link.gap`              | 8px               | Vertikaler Abstand zwischen Links (spacing.2)    |
| `navigation.toggle.size`                  | 44px              | Hamburger-Button Größe (WCAG AAA)                |
| `navigation.toggle.iconSize`              | 24px              | Hamburger-Icon Größe                             |
| `navigation.toggle.color.default`         | #404040           | Hamburger Standard-Farbe (neutral.700)           |
| `navigation.toggle.color.hover`           | #171717           | Hamburger Hover-Farbe (neutral.900)              |
| `navigation.toggle.background.default`    | transparent       | Hamburger Standard-Hintergrund                   |
| `navigation.toggle.background.hover`      | #f5f5f5           | Hamburger Hover-Hintergrund (neutral.100)        |
| `navigation.toggle.borderRadius`          | 4px               | Hamburger Eckenradius (borderRadius.base)        |

**CSS-Variable-Mapping:**

```
navigation.drawer.width             → --navigation-drawer-width
navigation.drawer.transition.duration → --navigation-drawer-transition-duration
navigation.toggle.size              → --navigation-toggle-size
```

---

## Code-Beispiele

### Vollständiges HTML

```html
<!-- Hamburger-Button (im Header) -->
<button
  class="header__toggle"
  aria-label="Menü öffnen"
  aria-expanded="false"
  aria-controls="mobile-drawer"
  id="drawer-toggle"
>
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
</button>

<!-- Drawer (außerhalb Header) -->
<div
  id="mobile-drawer"
  class="drawer"
  role="dialog"
  aria-modal="true"
  aria-label="Navigation"
  hidden
  aria-hidden="true"
>
  <!-- Close-Button -->
  <button class="drawer__close" aria-label="Menü schließen">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  </button>

  <!-- Navigation-Links -->
  <nav class="drawer__nav" aria-label="Hauptnavigation">
    <a href="/" class="drawer__link">Home</a>
    <a href="/produkte" class="drawer__link" aria-current="page">Produkte</a>
    <a href="/loesungen" class="drawer__link">Lösungen</a>
    <a href="/support" class="drawer__link">Support</a>
    <a href="/unternehmen" class="drawer__link">Unternehmen</a>
    <a href="/kontakt" class="drawer__link">Kontakt</a>
  </nav>
</div>

<!-- Backdrop -->
<div
  id="drawer-backdrop"
  class="drawer__backdrop"
  hidden
  aria-hidden="true"
></div>
```

### Vollständiges CSS

```css
/* Drawer Container */
.drawer {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: var(--navigation-drawer-width);
  max-width: var(--navigation-drawer-max-width);
  background-color: var(--navigation-drawer-background);
  box-shadow: var(--navigation-drawer-shadow);
  z-index: var(--navigation-drawer-z-index);
  overflow-y: auto;
  transform: translateX(-100%);
  transition: transform var(--navigation-drawer-transition-duration) var(--navigation-drawer-transition-easing);
}

.drawer:not([hidden]) {
  transform: translateX(0);
}

/* Close-Button */
.drawer__close {
  position: absolute;
  top: var(--spacing-4);
  right: var(--spacing-4);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  padding: 0;
  border: none;
  background-color: transparent;
  color: var(--neutral-700);
  border-radius: var(--border-radius-base);
  cursor: pointer;
  transition: background-color 150ms ease-in-out, color 150ms ease-in-out;
}

.drawer__close:hover {
  background-color: var(--neutral-100);
  color: var(--neutral-900);
}

.drawer__close:focus-visible {
  outline: var(--navigation-focus-outline-width) solid var(--navigation-focus-outline-color);
  outline-offset: var(--navigation-focus-outline-offset);
}

/* Navigation */
.drawer__nav {
  display: flex;
  flex-direction: column;
  gap: var(--navigation-drawer-link-gap);
  padding: var(--navigation-drawer-padding);
  margin-top: 60px; /* Raum für Close-Button */
}

.drawer__link {
  display: flex;
  align-items: center;
  min-height: var(--navigation-drawer-link-min-height);
  padding: var(--navigation-drawer-link-padding-y) var(--navigation-drawer-link-padding-x);
  color: var(--navigation-link-color-default);
  font-size: var(--navigation-link-font-size);
  font-weight: var(--navigation-link-font-weight-default);
  text-decoration: none;
  border-radius: var(--border-radius-base);
  transition: var(--navigation-link-transition), background-color 150ms ease-in-out;
}

.drawer__link:hover {
  color: var(--navigation-link-color-hover);
  background-color: var(--neutral-100);
}

.drawer__link[aria-current="page"] {
  color: var(--navigation-link-color-active);
  font-weight: var(--navigation-link-font-weight-active);
  background-color: var(--hydrophon-blau-50);
  border-left: 3px solid var(--navigation-active-indicator-color);
}

.drawer__link:focus-visible {
  outline: var(--navigation-focus-outline-width) solid var(--navigation-focus-outline-color);
  outline-offset: var(--navigation-focus-outline-offset);
}

/* Backdrop */
.drawer__backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--navigation-drawer-backdrop-color);
  z-index: calc(var(--navigation-drawer-z-index) - 1);
  opacity: 0;
  transition: opacity var(--navigation-drawer-transition-duration) var(--navigation-drawer-transition-easing);
  cursor: pointer;
}

.drawer__backdrop:not([hidden]) {
  opacity: 1;
}
```

### Vollständiges JavaScript

```javascript
// Elemente
const toggle = document.getElementById('drawer-toggle');
const drawer = document.getElementById('mobile-drawer');
const backdrop = document.getElementById('drawer-backdrop');
const closeButton = drawer.querySelector('.drawer__close');

let removeFocusTrap = null;

// Event-Listener
toggle.addEventListener('click', toggleDrawer);
closeButton.addEventListener('click', closeDrawer);
backdrop.addEventListener('click', closeDrawer);

// Toggle-Funktion
function toggleDrawer() {
  const isOpen = toggle.getAttribute('aria-expanded') === 'true';
  isOpen ? closeDrawer() : openDrawer();
}

// Drawer öffnen
function openDrawer() {
  drawer.removeAttribute('hidden');
  drawer.setAttribute('aria-hidden', 'false');
  backdrop.removeAttribute('hidden');
  backdrop.setAttribute('aria-hidden', 'false');

  toggle.setAttribute('aria-expanded', 'true');
  toggle.setAttribute('aria-label', 'Menü schließen');

  document.body.style.overflow = 'hidden';

  closeButton.focus();

  removeFocusTrap = trapFocus(drawer);

  document.addEventListener('keydown', handleEscapeKey);
}

// Drawer schließen
function closeDrawer() {
  drawer.setAttribute('hidden', '');
  drawer.setAttribute('aria-hidden', 'true');
  backdrop.setAttribute('hidden', '');
  backdrop.setAttribute('aria-hidden', 'true');

  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Menü öffnen');

  document.body.style.overflow = '';

  toggle.focus();

  if (removeFocusTrap) {
    removeFocusTrap();
    removeFocusTrap = null;
  }

  document.removeEventListener('keydown', handleEscapeKey);
}

// ESC-Taste Handler
function handleEscapeKey(event) {
  if (event.key === 'Escape') {
    closeDrawer();
  }
}

// Focus-Trap
function trapFocus(element) {
  const focusableElements = element.querySelectorAll(
    'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
  );

  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];

  function handleTabKey(event) {
    if (event.key !== 'Tab') return;

    if (event.shiftKey) {
      if (document.activeElement === firstFocusable) {
        event.preventDefault();
        lastFocusable.focus();
      }
    } else {
      if (document.activeElement === lastFocusable) {
        event.preventDefault();
        firstFocusable.focus();
      }
    }
  }

  element.addEventListener('keydown', handleTabKey);

  return () => {
    element.removeEventListener('keydown', handleTabKey);
  };
}
```

---

## Barrierefreiheit

### WCAG 2.4.3: Focus Order

Fokus-Reihenfolge im Drawer:

1. Close-Button (erhält Fokus beim Öffnen)
2. Navigation-Link 1
3. Navigation-Link 2
4. ...
5. Navigation-Link N
6. (Tab wraps zu Close-Button)

### WCAG 2.1.1: Keyboard Accessible

**Anforderungen erfüllt:**

- ✅ Drawer öffnet per Enter/Space auf Toggle-Button
- ✅ Drawer schließt per ESC-Taste
- ✅ Drawer schließt per Enter/Space auf Close-Button
- ✅ Tab-Navigation innerhalb Drawer
- ✅ Backdrop schließt per Click (optional, nicht Keyboard)

### WCAG 2.1.2: No Keyboard Trap

Focus-Trap hält Fokus im Drawer, ABER:

- ✅ ESC-Taste schließt Drawer und gibt Fokus frei
- ✅ Close-Button ist immer fokussierbar
- ✅ Fokus kehrt zu Toggle-Button zurück (kein Verlust)

### ARIA-Attribute

| Element        | ARIA-Attribut       | Wert/Zweck                                        |
|----------------|---------------------|---------------------------------------------------|
| Drawer         | `role="dialog"`     | Identifiziert als Dialog-Komponente               |
| Drawer         | `aria-modal="true"` | Kommuniziert modales Verhalten                    |
| Drawer         | `aria-label`        | "Navigation" — Benennt Dialog                     |
| Drawer         | `aria-hidden`       | "true" (geschlossen) / "false" (offen)            |
| Toggle         | `aria-expanded`     | "false" (geschlossen) / "true" (offen)            |
| Toggle         | `aria-controls`     | ID des Drawers — Verknüpfung                      |
| Toggle         | `aria-label`        | "Menü öffnen" / "Menü schließen" — Beschreibung   |
| Close-Button   | `aria-label`        | "Menü schließen" — Beschreibung                   |

### Screen Reader Ankündigungen

**Beim Öffnen:**

"Dialog, Navigation. Menü schließen, Button."

**Beim Schließen:**

"Menü öffnen, Button."

**Bei Navigation-Link:**

"Produkte, aktuelle Seite, Link."

---

## Best Practices

### UX-Richtlinien

1. **Close-Button erhält Fokus beim Öffnen**
   Screenreader-Nutzer*innen hören sofort, dass ein Dialog geöffnet wurde und wie man ihn schließt.

2. **Immer ESC zum Schließen**
   Keyboard-Nutzer*innen erwarten ESC-Funktionalität bei modalen Overlays.

3. **Backdrop klickbar**
   Maus-Nutzer*innen erwarten, dass Klick außerhalb des Drawers diesen schließt.

4. **Body-Scroll-Lock aktivieren**
   Verhindert verwirrende Situation, wenn Hintergrund scrollt, während Drawer offen ist.

5. **Fokus-Rückkehr zum Toggle**
   Nutzer*innen wissen nach dem Schließen, wo sie waren.

### Technische Richtlinien

1. **hidden statt display: none (JavaScript)**
   `hidden`-Attribut ist semantisch korrekter und kombiniert gut mit CSS `[hidden]`.

2. **aria-hidden synchron mit hidden**
   Beide Attribute müssen immer zusammen gesetzt werden.

3. **Transform statt left/right für Animation**
   Transform ist GPU-beschleunigt, performanter als Layout-Shifts.

4. **z-index Hierarchie**
   Backdrop: 999, Drawer: 1000 (damit Drawer über Backdrop liegt).

5. **Event-Listener Cleanup**
   Entferne ESC-Listener beim Schließen, um Memory Leaks zu vermeiden.

### Accessibility-Richtlinien

1. **role="dialog" + aria-modal="true"**
   Kommuniziert, dass Drawer modalen Kontext erzeugt (Hintergrund nicht interagierbar).

2. **aria-label auf Drawer**
   Benennt Dialog für Screenreader (nicht nur visuell erkennbar).

3. **Focus-Trap ist Pflicht**
   Ohne Focus-Trap können Tastatur-Nutzer*innen hinter den Drawer gelangen.

4. **Close-Button immer sichtbar**
   Auch wenn visuell klar ist, wie man schließt — Screenreader brauchen Button.

---

## Nicht verwenden

### ❌ display: none ohne aria-hidden

**Problem:** Element ist visuell versteckt, aber für Screenreader noch erreichbar.

**Alternative:** Immer beide Attribute setzen: `hidden` + `aria-hidden="true"`.

### ❌ Fokus-Verlust beim Schließen

**Problem:** Fokus bleibt im geschlossenen (versteckten) Drawer, Tastatur-Nutzer*innen wissen nicht, wo sie sind.

**Alternative:** Fokus immer zurück zum Toggle-Button bewegen.

### ❌ Fehlende ESC-Unterstützung

**Problem:** WCAG 2.1.2 verlangt Keyboard-Escape aus modalen Dialogen.

**Alternative:** Immer ESC-Listener implementieren.

### ❌ Backdrop nicht klickbar

**Problem:** Maus-Nutzer*innen erwarten, dass Klick außerhalb schließt.

**Alternative:** Click-Event-Listener auf Backdrop.

### ❌ Kein Body-Scroll-Lock

**Problem:** Hintergrund scrollt, während Drawer offen ist — verwirrend und visuell unschön.

**Alternative:** `document.body.style.overflow = 'hidden'` beim Öffnen.

### ❌ Animationen ohne prefers-reduced-motion

**Problem:** Nutzer*innen mit vestibulären Störungen können durch Animationen desorientiert werden.

**Alternative:**

```css
@media (prefers-reduced-motion: reduce) {
  .drawer,
  .drawer__backdrop {
    transition: none;
  }
}
```

---

## Verwandte Komponenten

- **[Header Navigation](./header.md)** — Desktop Header mit horizontaler Navigation
- **[Breadcrumb](./breadcrumb.md)** — Sekundäre Navigation für Hierarchie

---

## Changelog

| Version | Datum       | Änderungen                                           |
|---------|-------------|------------------------------------------------------|
| 1.0     | 2026-01-29  | Initiale Dokumentation (Mobile Navigation Drawer)   |
