# Product Card

## Übersicht

Product Cards präsentieren Hydrophon-Produkte in scannable Grid-Listen. Sie zeigen die wichtigsten Produktinformationen auf einen Blick und ermöglichen schnellen Zugriff auf Produktdetails.

**Verwendung:** Produktkataloge, Kategorie-Seiten, verwandte Produkte, Suchergebnisse

**Kontext:** B2B-Nutzer möchten Produkte schnell vergleichen und technische Spezifikationen erfassen. Die Card-Darstellung ermöglicht effizientes Scannen großer Produktlisten.

## Anatomie

Eine Product Card besteht aus folgenden Elementen:

1. **Card Container** (`<article>`) – Semantischer Container für Produktinformation
2. **Product Image** – Quadratisches Produktbild (1:1 Aspect Ratio)
3. **Content Area** – Text-Container mit Padding
4. **Title** (`<h3>`) – Produktname als Heading
5. **Specs List** (`<ul>`) – 2-3 technische Spezifikationen
6. **CTA Link** – "Details ansehen" oder ähnliche Aktion

```
┌─────────────────────────┐
│                         │
│   [Product Image 1:1]   │
│                         │
├─────────────────────────┤
│  Produktname            │
│                         │
│  • Spec 1               │
│  • Spec 2               │
│  • Spec 3               │
│                         │
│  [Details ansehen →]    │
└─────────────────────────┘
```

## Grid-Layout

### CSS Grid auto-fit Pattern

Product Cards nutzen ein modernes CSS Grid-Pattern, das **ohne Media Queries** responsive Layouts ermöglicht:

```css
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(280px, 100%), 1fr));
  gap: var(--card-gap); /* 24px */
}
```

**Wie funktioniert dieses Pattern?**

- `repeat(auto-fit, ...)` – Grid erstellt automatisch so viele Spalten wie möglich
- `minmax(min(280px, 100%), 1fr)` – Jede Spalte ist mindestens 280px breit (oder 100% auf sehr kleinen Screens)
- `1fr` – Spalten teilen verfügbaren Platz gleichmäßig
- `auto-fit` kollabiert leere Spalten, sodass vorhandene Cards mehr Platz bekommen

**Vorteile:**

- Keine Breakpoints in JavaScript oder CSS erforderlich
- Cards passen sich automatisch an Container-Breite an
- Funktioniert in jeder Container-Größe (nicht nur Viewport)
- Intrinsic Responsive Design

### Responsive Verhalten

Das Grid passt sich automatisch an:

| Viewport-Breite | Spalten | Card-Breite |
|-----------------|---------|-------------|
| < 560px         | 1       | 100%        |
| 560-840px       | 2       | ~260px      |
| 840-1120px      | 3       | ~266px      |
| > 1120px        | 4       | ~280px      |

Diese Breakpoints entstehen **automatisch** durch die `minmax(280px, 1fr)` Berechnung. Bei größeren Viewports können auch 5+ Spalten entstehen.

## Hover-Effekt

Product Cards reagieren auf Hover mit einer subtilen Animation, die Interaktivität signalisiert:

**Effekt:**

- Card hebt sich um 4px (`translateY(-4px)`)
- Shadow wechselt von `sm` zu `md`
- Transition dauert 300ms mit `ease` Timing

**Warum Transform statt Position?**

- `transform: translateY()` ist GPU-beschleunigt
- Höhere Performance als `top` oder `margin`
- Löst kein Layout-Reflow aus

**Accessibility:**

- `prefers-reduced-motion: reduce` deaktiviert Animation für Nutzer mit Vestibular Disorders

```css
.product-card {
  transition: transform 300ms ease, box-shadow 300ms ease;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--card-shadow-hover);
}

@media (prefers-reduced-motion: reduce) {
  .product-card {
    transition: none;
  }
  .product-card:hover {
    transform: none;
  }
}
```

## Performance-Optimierung

### Shadow-Animation mit Pseudo-Element

**Problem:** `box-shadow` direkt zu animieren ist CPU-intensiv und kann zu Jank führen.

**Lösung:** Nutze ein `::after` Pseudo-Element mit `opacity`:

```css
.product-card {
  position: relative;
  box-shadow: var(--card-shadow-default);
}

.product-card::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  box-shadow: var(--card-shadow-hover);
  opacity: 0;
  transition: opacity 300ms ease;
  pointer-events: none;
  z-index: -1;
}

.product-card:hover::after {
  opacity: 1;
}
```

**Vorteil:** Nur `opacity` wird animiert (GPU-beschleunigt), Shadow ist pre-rendered.

### Lazy Loading

Product Images sollten lazy-loaded werden, um Initial Page Load zu beschleunigen:

```html
<img
  src="hydrophon-produkt.jpg"
  alt="Hydrophon Ablaufrinne 80cm"
  loading="lazy"
  decoding="async"
>
```

- `loading="lazy"` – Browser lädt Bild erst kurz bevor es ins Viewport scrollt
- `decoding="async"` – Bild-Dekodierung blockiert nicht Main Thread

### will-change Sparsam Nutzen

```css
/* NICHT auf alle Cards anwenden! */
.product-card:hover,
.product-card:focus-within {
  will-change: transform;
}
```

`will-change: transform` bereitet GPU-Layers vor, verbraucht aber Speicher. Nur auf Hover/Focus-Kandidaten anwenden, nicht auf alle Cards gleichzeitig.

## Tokens

Product Cards nutzen Tokens aus `tokens/cards.json`:

| Token | Wert | Verwendung |
|-------|------|------------|
| `card.minWidth` | 280px | Grid minmax() Berechnung |
| `card.gap` | 24px (spacing.6) | Abstand zwischen Cards |
| `card.padding` | 24px (spacing.6) | Innenabstand |
| `card.radius` | 8px (borderRadius.lg) | Abgerundete Ecken |
| `card.border.width` | 1px | Border-Stärke |
| `card.border.color` | neutral.200 | Border-Farbe |
| `card.shadow.default` | shadow.sm | Shadow im Ruhezustand |
| `card.shadow.hover` | shadow.md | Shadow bei Hover |
| `card.transition.duration` | 300ms | Animationsdauer |
| `card.hover.transform` | translateY(-4px) | Hover-Bewegung |
| `card.image.aspectRatio` | 1 / 1 | Quadratisches Bild |
| `card.image.background` | neutral.100 | Placeholder-Hintergrund |
| `card.title.fontSize` | 18px (fontSize.lg) | Titel-Größe |
| `card.title.fontWeight` | 600 (semibold) | Titel-Gewicht |
| `card.specs.fontSize` | 14px (fontSize.sm) | Specs-Größe |
| `card.specs.color` | neutral.700 | Specs-Farbe |
| `card.specs.gap` | 4px (spacing.1) | Abstand zwischen Specs |
| `card.cta.color` | hydrophon.blau.600 | CTA-Linkfarbe |
| `card.cta.colorHover` | hydrophon.blau.700 | CTA-Linkfarbe Hover |

## Code-Beispiele

### HTML-Struktur

```html
<div class="product-grid">

  <article class="product-card">
    <a href="/produkte/ablaufrinne-80cm" class="product-card__link">
      <div class="product-card__image">
        <img
          src="/images/products/ablaufrinne-80cm.jpg"
          alt="Hydrophon Ablaufrinne 80cm"
          loading="lazy"
          decoding="async"
        >
      </div>
      <div class="product-card__content">
        <h3 class="product-card__title">Ablaufrinne 80cm</h3>
        <ul class="product-card__specs">
          <li>Länge: 80cm</li>
          <li>Material: Edelstahl</li>
          <li>Ablauf: Seitlich</li>
        </ul>
        <span class="product-card__cta">
          Details ansehen →
        </span>
      </div>
    </a>
  </article>

  <article class="product-card">
    <!-- Weitere Cards... -->
  </article>

</div>
```

**Semantik:**

- `<article>` für jede Card (self-contained content)
- `<a>` wrappt gesamte Card (gesamte Card klickbar)
- `<h3>` für Produktname (wenn Cards in Sektion mit `<h2>` Überschrift)
- `<ul>` für Specs-Liste (semantische Liste)

### CSS-Implementierung

```css
/* Grid Container */
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(280px, 100%), 1fr));
  gap: var(--card-gap);
}

/* Card Container */
.product-card {
  position: relative;
  background: var(--card-background);
  border: var(--card-border-width) solid var(--card-border-color);
  border-radius: var(--card-radius);
  box-shadow: var(--card-shadow-default);
  overflow: hidden;
  transition: transform var(--card-transition-duration) var(--card-transition-timing),
              box-shadow var(--card-transition-duration) var(--card-transition-timing);
}

.product-card:hover {
  transform: var(--card-hover-transform);
  box-shadow: var(--card-shadow-hover);
}

/* Link (entire card clickable) */
.product-card__link {
  display: block;
  text-decoration: none;
  color: inherit;
}

/* Image Container */
.product-card__image {
  aspect-ratio: var(--card-image-aspect-ratio);
  background: var(--card-image-background);
  overflow: hidden;
}

.product-card__image img {
  width: 100%;
  height: 100%;
  object-fit: var(--card-image-object-fit);
}

/* Content Area */
.product-card__content {
  padding: var(--card-padding);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-3);
}

/* Title */
.product-card__title {
  margin: 0;
  font-size: var(--card-title-font-size);
  font-weight: var(--card-title-font-weight);
  color: var(--card-title-color);
}

/* Specs List */
.product-card__specs {
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: var(--card-specs-font-size);
  color: var(--card-specs-color);
  line-height: var(--card-specs-line-height);
  display: flex;
  flex-direction: column;
  gap: var(--card-specs-gap);
}

.product-card__specs li::before {
  content: '•';
  margin-right: 8px;
  color: var(--neutral-400);
}

/* CTA */
.product-card__cta {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-top: auto; /* Push to bottom */
  font-weight: var(--card-cta-font-weight);
  color: var(--card-cta-color);
  transition: color 150ms ease;
}

.product-card:hover .product-card__cta {
  color: var(--card-cta-color-hover);
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  .product-card {
    transition: none;
  }
  .product-card:hover {
    transform: none;
  }
}
```

### Performance-optimierte Shadow-Animation

```css
.product-card {
  position: relative;
  box-shadow: var(--card-shadow-default);
  /* ... andere Styles ... */
}

/* Pseudo-Element für Hover-Shadow */
.product-card::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  box-shadow: var(--card-shadow-hover);
  opacity: 0;
  transition: opacity 300ms ease;
  pointer-events: none;
  z-index: -1;
}

.product-card:hover::after {
  opacity: 1;
}
```

## Barrierefreiheit

### Semantisches HTML

- `<article>` für Card-Container (self-contained content)
- `<h3>` für Produktname (korrekte Heading-Hierarchie)
- `<ul>` für Specs-Liste (semantische Struktur)

### Keyboard-Navigation

- Gesamte Card als `<a>` wrappt ermöglicht Fokus auf gesamter Card
- `:focus-visible` State für Keyboard-Navigation (ohne Hover)
- `Enter` oder `Space` aktiviert Link

```css
.product-card:focus-within {
  outline: 2px solid var(--hydrophon-blau-500);
  outline-offset: 2px;
}
```

### Screen Reader

- `alt`-Attribut auf Images mit beschreibendem Text: "Hydrophon Ablaufrinne 80cm"
- Heading (`<h3>`) wird als Produktname erkannt
- Specs-Liste wird als Liste vorgelesen

### Lazy Loading

- `loading="lazy"` ist accessibility-friendly (kein JavaScript erforderlich)
- Screen Reader lesen `alt`-Text unabhängig vom Loading-Status

## Best Practices

### Dos

- **CSS Grid auto-fit nutzen** – Responsive ohne Media Queries
- **Transform für Animationen** – GPU-beschleunigt, bessere Performance
- **Lazy Loading für Images** – Schnellerer Initial Load
- **Semantisches HTML** – `<article>`, `<h3>`, `<ul>` für bessere Accessibility
- **prefers-reduced-motion** – Animationen deaktivieren für Motion-Sensitive Users
- **Alt-Text auf Images** – Beschreibend und informativ
- **2-3 Specs maximal** – Übersichtlich, nicht überladen

### Don'ts

- **Feste Spaltenanzahl vermeiden** – `grid-template-columns: repeat(4, 1fr)` ist nicht responsive
- **box-shadow direkt animieren** – CPU-intensiv, nutze Pseudo-Element mit `opacity`
- **will-change auf allen Cards** – Speicher-Verschwendung, nur auf Hover
- **Zu viele Specs** – Mehr als 3 überladen die Card
- **Bilder ohne alt-Attribut** – Screen Reader können Kontext nicht vermitteln
- **Click-Handler auf Card-Container** – Nutze `<a>` für native Keyboard-Unterstützung

## Varianten

### Ohne CTA-Link

Falls gesamte Card bereits Link ist, kann separater CTA weggelassen werden:

```html
<article class="product-card">
  <a href="/produkte/ablaufrinne-80cm">
    <div class="product-card__image">...</div>
    <div class="product-card__content">
      <h3 class="product-card__title">Ablaufrinne 80cm</h3>
      <ul class="product-card__specs">...</ul>
    </div>
  </a>
</article>
```

### Mit Badge

Für "Neu" oder "Sale" Badges:

```html
<div class="product-card__image">
  <span class="product-card__badge">Neu</span>
  <img src="..." alt="...">
</div>
```

```css
.product-card__badge {
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 4px 12px;
  background: var(--hydrophon-blau-500);
  color: white;
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  border-radius: var(--border-radius-base);
  z-index: 1;
}
```

### Mit Preis

```html
<div class="product-card__content">
  <h3 class="product-card__title">Ablaufrinne 80cm</h3>
  <p class="product-card__price">189,00 €</p>
  <ul class="product-card__specs">...</ul>
</div>
```

```css
.product-card__price {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--hydrophon-blau-600);
  margin: 0;
}
```

## Beispiel-Integration

```html
<section class="product-catalog">
  <h2>Unsere Ablaufrinnen</h2>

  <div class="product-grid">
    <article class="product-card">...</article>
    <article class="product-card">...</article>
    <article class="product-card">...</article>
    <article class="product-card">...</article>
    <article class="product-card">...</article>
    <article class="product-card">...</article>
  </div>
</section>
```

## Verwandte Komponenten

- **Content Card** – Allgemeine Inhalte (Blog, Features)
- **Data Table** – Produkt-Vergleichstabellen
- **Button** – CTA-Buttons in Cards

## Ressourcen

- [CSS Grid auto-fit vs auto-fill](https://css-tricks.com/auto-sizing-columns-css-grid-auto-fill-vs-auto-fit/)
- [Lazy Loading Images](https://web.dev/browser-level-image-lazy-loading/)
- [prefers-reduced-motion](https://web.dev/prefers-reduced-motion/)
- [WCAG 2.1 - Focus Visible](https://www.w3.org/WAI/WCAG21/Understanding/focus-visible.html)
