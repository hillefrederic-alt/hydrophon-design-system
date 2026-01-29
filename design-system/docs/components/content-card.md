# Content Card

## Übersicht

Content Cards präsentieren allgemeine Inhalte wie Blog-Posts, News-Artikel, Features oder Service-Angebote. Im Gegensatz zu Product Cards sind sie flexibler in Struktur und Inhalt.

**Verwendung:** Blog-Übersichten, News-Bereiche, Feature-Highlights, Service-Kacheln, Team-Profile

**Kontext:** Content Cards ermöglichen visuelle Hierarchie für verschiedene Content-Typen. Sie sind anpassbar und können mit oder ohne Bild, mit Meta-Informationen und unterschiedlichen Call-to-Actions verwendet werden.

## Unterschied zu Product Cards

| Product Card | Content Card |
|--------------|--------------|
| Quadratisches Bild (1:1) | Flexibles Bildformat (16:9, 4:3, oder kein Bild) |
| Specs-Liste (immer) | Optional: Description, Excerpt |
| Produkt-CTA | Flexibler CTA-Text |
| Grid-optimiert | Grid oder List-Layout |

## Anatomie

Eine Content Card besteht aus folgenden Elementen:

1. **Card Container** (`<article>`) – Semantischer Container
2. **Image** (optional) – Bild mit flexiblem Aspect Ratio
3. **Content Area** – Text-Container
4. **Meta** (optional) – Datum, Autor, Kategorie
5. **Title** (`<h3>`) – Content-Überschrift
6. **Description/Excerpt** (optional) – Kurzbeschreibung
7. **CTA Link** (optional) – "Mehr erfahren", "Artikel lesen"

```
┌─────────────────────────┐
│                         │
│   [Image 16:9]          │
│                         │
├─────────────────────────┤
│  Meta: Datum · Autor    │
│                         │
│  Content-Titel          │
│                         │
│  Kurze Beschreibung     │
│  des Inhalts...         │
│                         │
│  [Mehr erfahren →]      │
└─────────────────────────┘
```

## Varianten

### 1. Vertikale Card mit Bild

Standard-Variante: Bild oben, Content unten.

```html
<article class="content-card content-card--vertical">
  <div class="content-card__image">
    <img
      src="/images/blog-post.jpg"
      alt="Hydrophon Installation im Industriebad"
      loading="lazy"
    >
  </div>
  <div class="content-card__content">
    <div class="content-card__meta">
      <span class="content-card__date">15. Januar 2026</span>
      <span class="content-card__category">Installationstipps</span>
    </div>
    <h3 class="content-card__title">Professionelle Installation von Bodenabläufen</h3>
    <p class="content-card__description">
      Erfahren Sie, wie Sie Hydrophon Bodenabläufe fachgerecht installieren
      und häufige Fehler vermeiden.
    </p>
    <a href="/blog/installation-bodenablaeufe" class="content-card__cta">
      Artikel lesen →
    </a>
  </div>
</article>
```

### 2. Horizontale Card mit Bild

Bild links, Content rechts – für breitere Layouts.

```html
<article class="content-card content-card--horizontal">
  <div class="content-card__image">
    <img src="/images/news.jpg" alt="...">
  </div>
  <div class="content-card__content">
    <div class="content-card__meta">
      <span class="content-card__date">12. Januar 2026</span>
    </div>
    <h3 class="content-card__title">Neue Produktlinie hyIndustry</h3>
    <p class="content-card__description">
      Hydrophon erweitert Portfolio um industrielle Ablaufsysteme.
    </p>
    <a href="/news/hyindustry-launch" class="content-card__cta">
      Mehr erfahren →
    </a>
  </div>
</article>
```

**CSS für horizontales Layout:**

```css
.content-card--horizontal {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: var(--spacing-6);
}

@media (max-width: 768px) {
  .content-card--horizontal {
    grid-template-columns: 1fr;
  }
}
```

### 3. Card ohne Bild (Text-Only)

Für textbasierte Inhalte oder wenn kein passendes Bild verfügbar ist.

```html
<article class="content-card content-card--text-only">
  <div class="content-card__content">
    <div class="content-card__meta">
      <span class="content-card__category">Service</span>
    </div>
    <h3 class="content-card__title">24/7 Technischer Support</h3>
    <p class="content-card__description">
      Unser Support-Team steht Ihnen bei Fragen zu Installation,
      Wartung und Produktauswahl zur Verfügung.
    </p>
    <a href="/service/support" class="content-card__cta">
      Kontakt aufnehmen →
    </a>
  </div>
</article>
```

### 4. Feature Card mit Icon

Für Service-Features oder Produkt-Highlights.

```html
<article class="content-card content-card--feature">
  <div class="content-card__content">
    <div class="content-card__icon">
      <svg><!-- Lucide Icon --></svg>
    </div>
    <h3 class="content-card__title">Schnelle Lieferung</h3>
    <p class="content-card__description">
      Alle Produkte ab Lager verfügbar. Lieferung innerhalb von 2-3 Werktagen.
    </p>
  </div>
</article>
```

**CSS für Icon:**

```css
.content-card__icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--hydrophon-blau-50);
  border-radius: var(--border-radius-lg);
  margin-bottom: var(--spacing-4);
}

.content-card__icon svg {
  width: 24px;
  height: 24px;
  color: var(--hydrophon-blau-600);
}
```

## States

### Default

Basis-State ohne Interaktion.

### Hover

Gleicher Effekt wie Product Cards:

```css
.content-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--card-shadow-hover);
}
```

### Focus

Für Keyboard-Navigation:

```css
.content-card:focus-within {
  outline: 2px solid var(--hydrophon-blau-500);
  outline-offset: 2px;
}
```

### Disabled (optional)

Falls Content nicht verfügbar oder archiviert:

```css
.content-card--disabled {
  opacity: 0.6;
  pointer-events: none;
}
```

```html
<article class="content-card content-card--disabled" aria-disabled="true">
  <!-- ... -->
</article>
```

## Tokens

Content Cards nutzen die gleichen Tokens wie Product Cards aus `tokens/cards.json`:

| Token | Wert | Verwendung |
|-------|------|------------|
| `card.padding` | 24px | Innenabstand |
| `card.radius` | 8px | Abgerundete Ecken |
| `card.shadow.default` | shadow.sm | Shadow im Ruhezustand |
| `card.shadow.hover` | shadow.md | Shadow bei Hover |
| `card.transition.duration` | 300ms | Animationsdauer |
| `card.title.fontSize` | 18px | Titel-Größe |
| `card.title.fontWeight` | 600 | Titel-Gewicht |
| `card.cta.color` | hydrophon.blau.600 | CTA-Farbe |

**Zusätzliche Token für Content Cards:**

- `fontSize.sm` (14px) – Meta-Informationen
- `color.text.secondary` (neutral.700) – Description-Text
- `color.text.muted` (neutral.500) – Meta-Text

## Code-Beispiele

### Vertikale Card (vollständig)

```html
<article class="content-card content-card--vertical">
  <a href="/blog/installation-tipps" class="content-card__link">
    <div class="content-card__image">
      <img
        src="/images/blog/installation-tipps.jpg"
        alt="Handwerker installiert Bodenablauf"
        loading="lazy"
        decoding="async"
      >
    </div>
    <div class="content-card__content">
      <div class="content-card__meta">
        <time datetime="2026-01-15" class="content-card__date">15. Januar 2026</time>
        <span class="content-card__category">Installationstipps</span>
      </div>
      <h3 class="content-card__title">Professionelle Installation von Bodenabläufen</h3>
      <p class="content-card__description">
        Erfahren Sie, wie Sie Hydrophon Bodenabläufe fachgerecht installieren
        und häufige Fehler vermeiden. Mit praktischen Schritt-für-Schritt-Anleitungen.
      </p>
      <span class="content-card__cta">
        Artikel lesen →
      </span>
    </div>
  </a>
</article>
```

### CSS-Implementierung

```css
/* Card Container */
.content-card {
  position: relative;
  background: var(--card-background);
  border: var(--card-border-width) solid var(--card-border-color);
  border-radius: var(--card-radius);
  box-shadow: var(--card-shadow-default);
  overflow: hidden;
  transition: transform var(--card-transition-duration) ease,
              box-shadow var(--card-transition-duration) ease;
}

.content-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--card-shadow-hover);
}

/* Link */
.content-card__link {
  display: block;
  text-decoration: none;
  color: inherit;
}

/* Image */
.content-card__image {
  aspect-ratio: 16 / 9;
  background: var(--card-image-background);
  overflow: hidden;
}

.content-card__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Content Area */
.content-card__content {
  padding: var(--card-padding);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-3);
}

/* Meta */
.content-card__meta {
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
}

.content-card__date::after {
  content: '·';
  margin-left: var(--spacing-3);
}

.content-card__category {
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: var(--font-weight-medium);
  color: var(--hydrophon-blau-600);
}

/* Title */
.content-card__title {
  margin: 0;
  font-size: var(--card-title-font-size);
  font-weight: var(--card-title-font-weight);
  color: var(--card-title-color);
  line-height: 1.3;
}

/* Description */
.content-card__description {
  margin: 0;
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
  line-height: 1.6;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}

/* CTA */
.content-card__cta {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-top: auto;
  font-weight: var(--card-cta-font-weight);
  color: var(--card-cta-color);
  transition: color 150ms ease;
}

.content-card:hover .content-card__cta {
  color: var(--card-cta-color-hover);
}

/* Horizontal Variant */
.content-card--horizontal {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: var(--spacing-6);
}

.content-card--horizontal .content-card__image {
  aspect-ratio: 4 / 3;
}

@media (max-width: 768px) {
  .content-card--horizontal {
    grid-template-columns: 1fr;
  }
}

/* Text-Only Variant */
.content-card--text-only .content-card__content {
  padding: var(--spacing-8);
}

/* Feature Card Variant */
.content-card--feature {
  text-align: center;
  border: 2px dashed var(--neutral-200);
}

.content-card--feature:hover {
  border-color: var(--hydrophon-blau-300);
}

/* Disabled State */
.content-card--disabled {
  opacity: 0.6;
  pointer-events: none;
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  .content-card {
    transition: none;
  }
  .content-card:hover {
    transform: none;
  }
}
```

## Barrierefreiheit

### Semantisches HTML

- `<article>` für Card (self-contained content)
- `<h3>` für Titel (korrekte Heading-Hierarchie)
- `<time datetime="...">` für Datum (maschinenlesbar)
- `<a>` für klickbare Card (native Keyboard-Unterstützung)

### Screen Reader

- `alt`-Attribut auf Images beschreibt Bildinhalt
- `datetime`-Attribut auf `<time>` für maschinenlesbare Datumsformate
- Heading-Hierarchie ermöglicht Navigation via Headings

### Keyboard-Navigation

```css
.content-card:focus-within {
  outline: 2px solid var(--hydrophon-blau-500);
  outline-offset: 2px;
}
```

### ARIA für Disabled State

```html
<article class="content-card content-card--disabled" aria-disabled="true">
  <!-- ... -->
</article>
```

## Best Practices

### Dos

- **Flexibles Image Aspect Ratio** – 16:9 für Landscape, 4:3 für Square, 1:1 für Portrait
- **Line-Clamp für Description** – Begrenzt Text auf 3 Zeilen, verhindert Layout-Bruch
- **Meta-Informationen gruppieren** – Datum, Autor, Kategorie logisch zusammenfassen
- **CTA-Text anpassen** – "Artikel lesen", "Mehr erfahren", "Details ansehen" je nach Kontext
- **Semantic HTML** – `<article>`, `<time>`, `<h3>` für bessere Accessibility

### Don'ts

- **Zu langer Description-Text** – Nutze `line-clamp` oder `max-height` mit `overflow: hidden`
- **Fehlende Meta-Informationen** – Nutzer erwarten Datum/Kategorie bei News/Blog
- **Generischer CTA** – "Mehr" oder "Klick hier" sind nicht aussagekräftig
- **Zu viele Varianten mischen** – Einheitlichkeit innerhalb einer Sektion

## Grid-Layout für Content Cards

Gleicher `auto-fit` Ansatz wie bei Product Cards:

```css
.content-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(320px, 100%), 1fr));
  gap: var(--card-gap);
}
```

**Hinweis:** Content Cards können breiter sein als Product Cards (320px statt 280px), da oft mehr Text enthalten ist.

## Verwandte Komponenten

- **Product Card** – Produkt-spezifische Cards
- **Data Table** – Tabellarische Darstellung
- **Button** – CTA-Buttons in Cards

## Ressourcen

- [HTML5 `<article>` Element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/article)
- [CSS `line-clamp`](https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-line-clamp)
- [WCAG 2.1 - Time Element](https://www.w3.org/TR/html52/textlevel-semantics.html#the-time-element)
