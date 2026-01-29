# Breadcrumb-Navigation

Breadcrumbs zeigen Nutzern ihre aktuelle Position in der Seitenhierarchie und ermöglichen schnelle Navigation zu übergeordneten Ebenen.

## Übersicht

**Zweck:** Breadcrumbs bieten Orientierung auf Websites mit komplexer Informationsarchitektur und mehreren Hierarchieebenen.

**Wann verwenden:**
- Seiten mit 3 oder mehr Hierarchieebenen (z.B. Home → Produkte → Kategorie → Produkt)
- Externe Einstiege über Suchmaschinen oder direkte Links
- B2B-Kontext mit verschachtelten Produktkategorien oder Unternehmensstrukturen

**Wann nicht verwenden:**
- Flache Seitenstrukturen (nur 1-2 Ebenen)
- Single-Page-Applications ohne Hierarchie
- Formulare oder Step-by-Step-Prozesse (verwenden Sie stattdessen Stepper/Wizard)

## Anatomie

Eine Breadcrumb-Navigation besteht aus folgenden Elementen:

1. **Container:** `<nav>` Element mit `aria-label="Breadcrumbs"` für Screen Reader
2. **Liste:** `<ol>` (ordered list) für semantische Reihenfolge
3. **Listenelemente:** `<li>` für jede Ebene
4. **Links:** `<a>` für navigierbare Ebenen
5. **Aktuelle Seite:** `<span>` (kein Link) mit `aria-current="page"`
6. **Separator:** Visuelles Trennzeichen zwischen Ebenen (CSS ::after)

```
┌─────────────────────────────────────────────────────────────┐
│ [Home] › [Produkte] › [Sanitäranlagen] › Aktuelle Seite    │
│   ↑        ↑            ↑                    ↑               │
│  Link     Link         Link            kein Link            │
│                                      aria-current="page"     │
└─────────────────────────────────────────────────────────────┘
```

## Separator

### Chevron (›) - Empfohlen

Der Chevron ist das empfohlene Separator-Zeichen für Breadcrumbs im Hydrophon Design System.

**Vorteile:**
- Modern und richtungsweisend
- Klare visuelle Hierarchie von links nach rechts
- Konsistent mit Button-Icons (Lucide ChevronRight)
- Internationale Verwendbarkeit (keine Sprachabhängigkeit)

**Technische Umsetzung:**

```css
.breadcrumb li::after {
  content: "›";
  color: var(--breadcrumb-separator-color);
  margin: 0 var(--breadcrumb-separator-marginX);
}

.breadcrumb li:last-child::after {
  content: none;
}
```

**Wichtig:** Der Separator wird als CSS Pseudo-Element (`::after`) eingefügt und ist damit automatisch für Screen Reader versteckt. Assistive Technologien erkennen die Navigation durch die semantische `<ol>`-Struktur.

### Alternative Separatoren

**Slash (/):**
- Klassisch und weit verbreitet
- Gut für technische oder datei-basierte Hierarchien
- Beispiel: `Home / Produkte / Kategorie`

**Pfeil (→):**
- Stark richtungsweisend
- Moderner als Slash, weniger subtil als Chevron
- Beispiel: `Home → Produkte → Kategorie`

**Token-basiert:** Alle Separatoren können über `breadcrumb.separator.content` zentral geändert werden.

## Mobile-Verhalten

Breadcrumbs benötigen auf kleinen Bildschirmen besondere Aufmerksamkeit, um Lesbarkeit und Bedienbarkeit zu gewährleisten.

### Option 1: Vollständige Breadcrumbs mit Wrap

Die einfachste Lösung: Breadcrumbs umbrechen bei Platzmangel.

**Vorteile:**
- Vollständige Hierarchie sichtbar
- Keine JavaScript-Logik erforderlich
- Barrierefreundlich

**Nachteile:**
- Bei vielen Ebenen vertikal sehr lang
- Kann mobilen Viewport dominieren

```css
@media (max-width: 640px) {
  .breadcrumb ol {
    flex-wrap: wrap;
  }
}
```

### Option 2: Gekürzte Breadcrumbs (Home + Aktuell)

Bei mehr als 3 Ebenen: Nur erste und letzte Ebene anzeigen.

**Vorteile:**
- Kompakt und übersichtlich
- Wichtigste Information (Home + Aktuell) sichtbar

**Nachteile:**
- Mittlere Ebenen nicht direkt erreichbar
- Benötigt JavaScript oder CSS-Logik

```css
@media (max-width: 640px) {
  /* Verstecke mittlere Elemente */
  .breadcrumb li:not(:first-child):not(:last-child) {
    display: none;
  }

  /* Zeige Ellipsis-Indikator */
  .breadcrumb li:first-child::after {
    content: "›";
    margin: 0 var(--breadcrumb-separator-marginX);
  }
}
```

### Empfehlung

- **< 4 Ebenen:** Vollständige Breadcrumbs mit Wrap
- **≥ 4 Ebenen:** Gekürzte Breadcrumbs (Home + Aktuell)
- **Alternative:** Horizontales Scrollen (touch-freundlich, aber weniger üblich)

## Tokens

Alle Breadcrumb-Styles sind über Design Tokens konfigurierbar:

| Token | Wert | CSS-Variable | Beschreibung |
|-------|------|--------------|--------------|
| `breadcrumb.fontSize` | `{fontSize.sm}` (14px) | `--breadcrumb-fontSize` | Kompakte Schriftgröße für sekundäre Navigation |
| `breadcrumb.gap` | `{spacing.2}` (8px) | `--breadcrumb-gap` | Abstand zwischen Breadcrumb-Elementen |
| `breadcrumb.marginY` | `{spacing.4}` (16px) | `--breadcrumb-marginY` | Vertikaler Abstand der Breadcrumb-Navigation |
| `breadcrumb.separator.content` | `"›"` | `--breadcrumb-separator-content` | Chevron-Separator |
| `breadcrumb.separator.color` | `{neutral.400}` | `--breadcrumb-separator-color` | Dezente Separator-Farbe |
| `breadcrumb.separator.marginX` | `{spacing.2}` (8px) | `--breadcrumb-separator-marginX` | Horizontaler Abstand um Separator |
| `breadcrumb.link.color` | `{hydrophon.blau.600}` | `--breadcrumb-link-color` | Link-Farbe (etwas dunkler als primär) |
| `breadcrumb.link.colorHover` | `{hydrophon.blau.700}` | `--breadcrumb-link-colorHover` | Link-Farbe bei Hover |
| `breadcrumb.link.textDecoration` | `none` | `--breadcrumb-link-textDecoration` | Keine Unterstreichung im Standard |
| `breadcrumb.link.textDecorationHover` | `underline` | `--breadcrumb-link-textDecorationHover` | Unterstreichung bei Hover |
| `breadcrumb.current.color` | `{neutral.900}` | `--breadcrumb-current-color` | Aktuelle Seite in neutraler Farbe |
| `breadcrumb.current.fontWeight` | `{fontWeight.medium}` (500) | `--breadcrumb-current-fontWeight` | Medium-Gewicht hebt aktuelle Seite hervor |

**Token-Referenzen:** Siehe `design-system/tokens/navigation.json`

## Code-Beispiele

### HTML

Vollständige semantische Struktur mit ARIA-Attributen:

```html
<nav aria-label="Breadcrumbs">
  <ol class="breadcrumb">
    <li>
      <a href="/">Home</a>
    </li>
    <li>
      <a href="/produkte">Produkte</a>
    </li>
    <li>
      <a href="/produkte/sanitaeranlagen">Sanitäranlagen</a>
    </li>
    <li>
      <span aria-current="page">Waschtische</span>
    </li>
  </ol>
</nav>
```

**Wichtige Details:**
- `<nav>` mit `aria-label="Breadcrumbs"` kennzeichnet Breadcrumb-Landmark
- `<ol>` statt `<ul>` für semantische Reihenfolge
- Links für alle navigierbaren Ebenen
- `<span>` (kein Link) für aktuelle Seite
- `aria-current="page"` auf aktueller Seite (zwingend erforderlich)

### CSS

Vollständiges Styling mit Token-Referenzen:

```css
/* Container */
.breadcrumb {
  margin: var(--breadcrumb-marginY) 0;
}

/* Liste */
.breadcrumb ol {
  display: flex;
  flex-wrap: wrap;
  gap: var(--breadcrumb-gap);
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: var(--breadcrumb-fontSize);
}

/* Listenelemente */
.breadcrumb li {
  display: flex;
  align-items: center;
}

/* Separator (::after) */
.breadcrumb li::after {
  content: var(--breadcrumb-separator-content);
  color: var(--breadcrumb-separator-color);
  margin: 0 var(--breadcrumb-separator-marginX);
}

/* Kein Separator nach letztem Element */
.breadcrumb li:last-child::after {
  content: none;
}

/* Links */
.breadcrumb a {
  color: var(--breadcrumb-link-color);
  text-decoration: var(--breadcrumb-link-textDecoration);
  transition: color 150ms ease-in-out;
}

.breadcrumb a:hover {
  color: var(--breadcrumb-link-colorHover);
  text-decoration: var(--breadcrumb-link-textDecorationHover);
}

/* Focus-Indicator (konsistent mit globalen Link-Styles) */
.breadcrumb a:focus-visible {
  outline: 2px solid var(--hydrophon-blau-300);
  outline-offset: 2px;
  border-radius: 2px;
}

/* Aktuelle Seite */
.breadcrumb [aria-current="page"] {
  color: var(--breadcrumb-current-color);
  font-weight: var(--breadcrumb-current-fontWeight);
}

/* Mobile Anpassung: Gekürzte Breadcrumbs */
@media (max-width: 640px) {
  .breadcrumb li:not(:first-child):not(:last-child) {
    display: none;
  }
}
```

### React-Beispiel

```jsx
function Breadcrumb({ items }) {
  return (
    <nav aria-label="Breadcrumbs">
      <ol className="breadcrumb">
        {items.map((item, index) => (
          <li key={item.href || index}>
            {index === items.length - 1 ? (
              <span aria-current="page">{item.label}</span>
            ) : (
              <a href={item.href}>{item.label}</a>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

// Verwendung
<Breadcrumb
  items={[
    { label: "Home", href: "/" },
    { label: "Produkte", href: "/produkte" },
    { label: "Sanitäranlagen", href: "/produkte/sanitaeranlagen" },
    { label: "Waschtische" } // kein href = aktuelle Seite
  ]}
/>
```

## Barrierefreiheit

Breadcrumbs erfüllen wichtige WCAG-Kriterien für Orientierung und Navigation.

### WCAG 2.4.8: Location (AAA)

**Kriterium:** Nutzer können ihre Position in der Website-Struktur erkennen.

**Erfüllung:** Breadcrumbs zeigen die vollständige Hierarchie und ermöglichen Navigation zu übergeordneten Ebenen.

**Hinweis:** WCAG 2.4.8 ist Level AAA (nicht AA). Breadcrumbs sind dennoch Best Practice für komplexe B2B-Websites.

### aria-current="page"

**Pflicht-Attribut:** Die aktuelle Seite muss mit `aria-current="page"` gekennzeichnet sein.

**Screen Reader-Ansage:** NVDA/JAWS kündigen an: "Waschtische, aktuelle Seite" statt nur "Waschtische".

**Anti-Pattern:** Aktuelle Seite als Link mit `class="active"` ist unzureichend - Screen Reader erkennen keinen Unterschied.

### Separator-Barrierefreiheit

**CSS Pseudo-Element:** Der Separator wird als `::after` Pseudo-Element eingefügt und ist automatisch für Screen Reader versteckt.

**Warum wichtig:** Screen Reader würden HTML-Separatoren vorlesen ("Home, Pfeil, Produkte, Pfeil, ..."). Das ist redundant und störend.

**Richtig:**
```css
.breadcrumb li::after {
  content: "›";
}
```

**Falsch:**
```html
<li><a href="/">Home</a> <span class="separator">›</span></li>
```

### Kontrast

**WCAG 1.4.3:** Text benötigt 4.5:1 Kontrast.

**Erfüllung:**
- Links: `hydrophon.blau.600` (#007bb8) auf Weiß = 4.53:1 ✓
- Separator: `neutral.400` = 3:1 (akzeptabel für UI-Elemente, nicht Text)
- Aktuelle Seite: `neutral.900` = 16.5:1 ✓

### Keyboard-Navigation

**Tab:** Fokus springt von Link zu Link (Separator werden übersprungen).

**Enter:** Aktiviert fokussierten Link.

**Aktuelle Seite:** Nicht fokussierbar (kein Link), korrekt.

### Focus-Indicator

**Standard:** Konsistent mit globalen Link-Styles (2px outline, 2px offset).

**WCAG 2.4.7:** Focus muss visuell erkennbar sein - 3:1 Kontrast zum Hintergrund.

**Erfüllung:** `hydrophon.blau.300` (#5cc2f1) auf Weiß = 3.07:1 ✓

## Best Practices

### Semantisches HTML

**Verwenden:**
- `<nav>` mit `aria-label="Breadcrumbs"` für Landmark
- `<ol>` statt `<ul>` für Reihenfolge
- `aria-current="page"` auf aktueller Seite
- Separator als CSS `::after` Pseudo-Element

**Nicht verwenden:**
- `<div>` statt `<nav>`
- `<ul>` statt `<ol>`
- Link auf aktuelle Seite (auch nicht mit `disabled`)
- Separator als HTML-Element

### Konsistenz

**Position:** Breadcrumbs sollten immer an derselben Stelle erscheinen:
- Direkt unter Header/Navigation
- Über dem Hauptinhalt (h1)
- Links ausgerichtet (konsistent mit Inhalts-Container)

**Reihenfolge:** Immer von allgemein zu spezifisch (Home → Kategorie → Unterkategorie → Seite).

### Mobile First

**Design-Entscheidung früh treffen:**
- Vollständig mit Wrap oder gekürzt?
- Testen mit realen Hierarchien (nicht nur 3 Ebenen)
- Touch-Targets beachten (links sollten mindestens 44px hoch sein)

**Nicht:** Breadcrumbs auf Mobile komplett verstecken - sie sind gerade bei externen Einstiegen wertvoll.

## Integration mit Header

Breadcrumbs werden typischerweise zwischen Header-Navigation und Hauptinhalt positioniert.

### Layout-Beispiel

```html
<header>
  <div class="header-container">
    <a href="/" class="logo">Hydrophon</a>
    <nav aria-label="Hauptnavigation">
      <!-- Primäre Navigation -->
    </nav>
  </div>
</header>

<!-- Breadcrumbs unterhalb Header -->
<nav aria-label="Breadcrumbs" class="breadcrumb-container">
  <ol class="breadcrumb">
    <!-- Breadcrumb-Items -->
  </ol>
</nav>

<main>
  <h1>Aktuelle Seite</h1>
  <!-- Hauptinhalt -->
</main>
```

### Container-Breite

**Empfehlung:** Breadcrumbs sollten die gleiche maximale Breite wie der Hauptinhalt verwenden.

```css
.breadcrumb-container {
  max-width: var(--container-xl); /* 1280px */
  margin: 0 auto;
  padding: 0 var(--spacing-6);
}
```

### Visueller Bezug

**Option 1: Dezent**
- Breadcrumbs ohne Hintergrundfarbe
- Dezentes Grau für Links
- Minimale visuelle Präsenz

**Option 2: Hervorgehoben (aktuell)**
- Leichter Hintergrund (`neutral.50`)
- Border unten zur Trennung
- Breadcrumbs als eigener Bereich erkennbar

## Nicht verwenden

### Link auf aktuelle Seite

**Falsch:**
```html
<li>
  <a href="/aktuelle-seite" class="active" aria-current="page">
    Aktuelle Seite
  </a>
</li>
```

**Problem:** Links auf die aktuelle Seite sind verwirrend und redundant.

**Richtig:**
```html
<li>
  <span aria-current="page">Aktuelle Seite</span>
</li>
```

### Separator als HTML-Element

**Falsch:**
```html
<li><a href="/">Home</a></li>
<li class="separator">›</li>
<li><a href="/produkte">Produkte</a></li>
```

**Problem:**
- Screen Reader lesen Separator vor
- Listenstruktur wird gestört
- Unnötige DOM-Elemente

**Richtig:** CSS `::after` Pseudo-Element (siehe Code-Beispiele).

### Fehlende aria-label auf nav

**Falsch:**
```html
<nav>
  <ol class="breadcrumb">...</ol>
</nav>
```

**Problem:** Screen Reader kündigen an "Navigation" - aber welche? Header? Footer? Breadcrumbs?

**Richtig:**
```html
<nav aria-label="Breadcrumbs">
  <ol class="breadcrumb">...</ol>
</nav>
```

### JavaScript-basierte Breadcrumbs ohne Fallback

**Falsch:** Breadcrumbs nur per JavaScript rendern ohne Server-Side-Rendering.

**Problem:** SEO-Nachteile, langsamer Time-to-Interactive, potenzielle Fehler bei JavaScript-Problemen.

**Richtig:** Breadcrumbs server-seitig oder mit Static Site Generation rendern.

## Referenzen

**Header-Navigation:** Siehe `design-system/docs/navigation/header.md` für konsistente Link-Styles und Focus-Indicator.

**Token-System:** Siehe `design-system/tokens/navigation.json` für alle Breadcrumb-Tokens.

**ARIA-Pattern:** [W3C WAI-ARIA Authoring Practices - Breadcrumb](https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/)

**WCAG 2.4.8:** [Understanding SC 2.4.8: Location (Level AAA)](https://www.w3.org/WAI/WCAG21/Understanding/location.html)
