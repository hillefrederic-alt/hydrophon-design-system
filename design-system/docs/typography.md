# Typografie

Die Typografie des Hydrophon Design Systems schafft eine klare, moderne Kommunikation, die Hydrophons innovative Positionierung im B2B-Sanitärbereich widerspiegelt. Die Schrifthierarchie ist für Lesbarkeit über alle digitalen Touchpoints optimiert.

## Schriftfamilien

### Inter – Primäre Schriftfamilie

**Verwendung:** Alle Texte (Headlines, Body, UI)

Inter ist eine moderne, professionelle Sans-Serif-Schrift, die speziell für Bildschirmdarstellung optimiert wurde. Sie bietet exzellente Lesbarkeit bei allen Größen und vermittelt die gewünschte Kombination aus Innovation und technischer Glaubwürdigkeit.

**Schriftfamilie:**
```
Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif
```

**Fallback-Stack:** Das System verwendet native Systemschriften als Fallback, um optimale Performance und Lesbarkeit auf allen Plattformen zu gewährleisten.

**Bezugsquelle:**
- Google Fonts: https://fonts.google.com/specimen/Inter
- Variable Font empfohlen für optimale Performance
- Benötigte Weights: 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold)

### JetBrains Mono – Monospace-Schriftfamilie

**Verwendung:** Code-Snippets, technische Spezifikationen, Produktnummern

**Schriftfamilie:**
```
"JetBrains Mono", "Fira Code", "Courier New", monospace
```

## Typografie-Skala

Die Typografie-Skala basiert auf einer harmonischen Abstufung, die klare visuelle Hierarchien ermöglicht.

### Größenübersicht

| Token | Pixel | rem | Verwendung |
|-------|-------|-----|------------|
| **6xl** | 60px | 3.75rem | Hero-Headlines, besondere Titel |
| **5xl** | 48px | 3rem | H1 – Hauptüberschriften |
| **4xl** | 36px | 2.25rem | H2 – Abschnittsüberschriften |
| **3xl** | 30px | 1.875rem | H3 – Unterabschnittsüberschriften |
| **2xl** | 24px | 1.5rem | H4 – Card-Headlines |
| **xl** | 20px | 1.25rem | H5 – Kleine Überschriften |
| **lg** | 18px | 1.125rem | H6, großer Body-Text |
| **base** | 16px | 1rem | Standard Body-Text |
| **sm** | 14px | 0.875rem | Labels, UI-Elemente |
| **xs** | 12px | 0.75rem | Captions, rechtliche Hinweise |

### Visuelle Beispiele

```
6xl – 60px
Großflächige Markenkommunikation
```

```
5xl – 48px
H1 – Seitenhauptüberschrift
```

```
4xl – 36px
H2 – Abschnittsüberschrift
```

```
3xl – 30px
H3 – Unterabschnittsüberschrift
```

```
2xl – 24px
H4 – Card- und Modulüberschrift
```

```
xl – 20px
H5 – Kleine Überschrift
```

```
lg – 18px
Betonter Body-Text oder H6
```

```
base – 16px
Standard-Fließtext für alle Inhalte
```

```
sm – 14px
Formular-Labels, Buttons, Navigationselemente
```

```
xs – 12px
Captions, Metadaten, rechtliche Hinweise
```

## Hierarchie

### Überschriften (H1-H6)

Die Überschriftenhierarchie folgt semantischen HTML-Standards und bietet klare visuelle Abstufungen.

#### H1 – Hauptüberschrift (5xl)
- **Größe:** 48px (3rem)
- **Gewicht:** Bold (700)
- **Zeilenhöhe:** Tight (1.25)
- **Zeichenabstand:** Tight (-0.025em)
- **Verwendung:** Eine H1 pro Seite, definiert das Hauptthema
- **Beispiel:** "Hydrophon Produktkatalog 2026"

#### H2 – Abschnittsüberschrift (4xl)
- **Größe:** 36px (2.25rem)
- **Gewicht:** Bold (700)
- **Zeilenhöhe:** Tight (1.25)
- **Zeichenabstand:** Tight (-0.025em)
- **Verwendung:** Hauptabschnitte innerhalb einer Seite
- **Beispiel:** "Produktserien", "Technische Daten"

#### H3 – Unterabschnittsüberschrift (3xl)
- **Größe:** 30px (1.875rem)
- **Gewicht:** Semibold (600)
- **Zeilenhöhe:** Snug (1.375)
- **Zeichenabstand:** Normal (0)
- **Verwendung:** Unterabschnitte, thematische Gruppierungen
- **Beispiel:** "Sanitärmodule", "Installationshinweise"

#### H4 – Card-Überschrift (2xl)
- **Größe:** 24px (1.5rem)
- **Gewicht:** Semibold (600)
- **Zeilenhöhe:** Snug (1.375)
- **Zeichenabstand:** Normal (0)
- **Verwendung:** Überschriften in Cards, Modulen, Listen
- **Beispiel:** Produktname in Produktkarte

#### H5 – Kleine Überschrift (xl)
- **Größe:** 20px (1.25rem)
- **Gewicht:** Medium (500)
- **Zeilenhöhe:** Normal (1.5)
- **Zeichenabstand:** Normal (0)
- **Verwendung:** Kleinere Abschnitte, Sidebar-Headlines
- **Beispiel:** Feature-Listen, Spezifikations-Kategorien

#### H6 – Kleinste Überschrift (lg)
- **Größe:** 18px (1.125rem)
- **Gewicht:** Medium (500)
- **Zeilenhöhe:** Normal (1.5)
- **Zeichenabstand:** Normal (0)
- **Verwendung:** Inline-Headlines, hervorgehobene Labels
- **Beispiel:** Formular-Abschnittsüberschriften

### Semantische HTML-Verwendung

Überschriften müssen immer semantisch korrekt verwendet werden:
- **Eine H1 pro Seite** – definiert das Hauptthema
- **Keine Hierarchie-Ebenen überspringen** – nach H2 folgt H3, nicht H4
- **Überschriften nicht für Styling verwenden** – bei Bedarf visuelle Klassen nutzen

## Body-Texte

### Body Large (lg)
- **Größe:** 18px (1.125rem)
- **Gewicht:** Regular (400)
- **Zeilenhöhe:** Relaxed (1.625)
- **Verwendung:** Einleitungstexte, hervorgehobene Absätze, Leads
- **Optimale Zeilenlänge:** 60-75 Zeichen (ca. 550-650px Breite)

### Body Base (base) – Standard
- **Größe:** 16px (1rem)
- **Gewicht:** Regular (400)
- **Zeilenhöhe:** Normal (1.5)
- **Verwendung:** Alle Standard-Fließtexte, Absätze, Beschreibungen
- **Optimale Zeilenlänge:** 60-75 Zeichen (ca. 480-560px Breite)

**Dies ist die Basis-Schriftgröße für alle Body-Texte.** Niemals kleiner als 16px für Hauptinhalte verwenden – dies gewährleistet Barrierefreiheit und Lesbarkeit.

### Body Small (sm)
- **Größe:** 14px (0.875rem)
- **Gewicht:** Regular (400)
- **Zeilenhöhe:** Normal (1.5)
- **Verwendung:** Sekundäre Informationen, Bildunterschriften, Metadaten
- **Optimale Zeilenlänge:** 60-75 Zeichen (ca. 420-490px Breite)

### Absatzabstände

- **Standard-Absatzabstand:** 1em (entspricht Schriftgröße)
- **Nach Überschriften:** 0.5em bis 1em
- **Vor Überschriften:** 1.5em bis 2em (außer direkt nach vorheriger Überschrift)

### Zeilenlänge und Container

**Optimale Zeilenlänge für Lesbarkeit:** 60-75 Zeichen

Bei größeren Viewports Textblöcke auf maximal 75 Zeichen begrenzen durch:
- Max-width auf Textcontainern
- Mehrspalten-Layout bei sehr breiten Screens
- Padding/Margin-Anpassungen

## Line Heights & Letter Spacing

### Line Heights (Zeilenhöhen)

Die Zeilenhöhe beeinflusst Lesbarkeit und visuelle Dichte maßgeblich.

| Token | Wert | Verwendung |
|-------|------|------------|
| **Tight** | 1.25 | Große Headlines (H1, H2) – enge Führung für kompakte Darstellung |
| **Snug** | 1.375 | Subheadings (H3, H4) – ausgewogene Führung |
| **Normal** | 1.5 | Body-Text, kleinere Headlines – Standard-Lesbarkeit |
| **Relaxed** | 1.625 | Großer Body-Text – komfortable Lesbarkeit für längere Texte |
| **Loose** | 2.0 | Spezielle Layouts – sehr luftige Darstellung |

**Faustregel:**
- Je größer die Schrift, desto enger die Zeilenhöhe
- Je kleiner die Schrift, desto großzügiger die Zeilenhöhe
- Längere Texte profitieren von größzügigerer Zeilenhöhe

### Letter Spacing (Zeichenabstand)

Letter Spacing (auch Tracking genannt) steuert den horizontalen Abstand zwischen Zeichen.

| Token | Wert | Verwendung |
|-------|------|----------|
| **Tighter** | -0.05em | Extra große Display-Headlines (optional) |
| **Tight** | -0.025em | H1, H2 – Headlines wirken kompakter und kraftvoller |
| **Normal** | 0em | Body-Text, H3-H6 – Standard ohne Anpassung |
| **Wide** | 0.025em | Buttons, Badges – verbesserte Lesbarkeit bei UI-Elementen |
| **Wider** | 0.05em | Labels in Großbuchstaben (ALL CAPS) |

**Wichtig:** Letter Spacing bei Großbuchstaben-Text (ALL CAPS) erhöhen, mindestens +0.05em.

## UI-Elemente

### Button
- **Größe:** 14px (0.875rem)
- **Gewicht:** Medium (500)
- **Zeilenhöhe:** Normal (1.5)
- **Zeichenabstand:** Wide (0.025em)
- **Verwendung:** Alle Button-Texte
- **Hinweis:** Weiterer Zeichenabstand verbessert Lesbarkeit bei kurzen, aktionsbezogenen Texten

### Label
- **Größe:** 14px (0.875rem)
- **Gewicht:** Medium (500)
- **Zeilenhöhe:** Normal (1.5)
- **Zeichenabstand:** Normal (0)
- **Verwendung:** Formular-Labels, Navigationselemente, Tabs

### Caption
- **Größe:** 12px (0.75rem)
- **Gewicht:** Regular (400)
- **Zeilenhöhe:** Normal (1.5)
- **Zeichenabstand:** Normal (0)
- **Verwendung:** Hilfetext, Timestamps, Metadaten, rechtliche Hinweise

**Wichtig:** Caption-Text niemals kleiner als 12px verwenden – dies ist die absolute Untergrenze für Barrierefreiheit.

## Anwendungsbeispiele

### Produktseiten-Titel

```
H1 (5xl, bold, tight)
Hydrophon AquaTech Serie

H2 (4xl, bold, tight)
Technische Spezifikationen

Body Large (lg, relaxed)
Die AquaTech Serie vereint modernste Technologie mit
bewährter Qualität für höchste Ansprüche im gewerblichen
Sanitärbereich.
```

### Produkt-Card

```
H4 (2xl, semibold, snug)
AquaTech Pro 3000

Body Base (base, normal)
Hochleistungs-Sanitärmodul mit integrierter
Steuerungseinheit.

Caption (xs, regular, normal)
Art.-Nr.: AT-3000-PRO
```

### Formular

```
Label (sm, medium, normal)
E-Mail-Adresse*

Input (base, regular, normal)
[Eingabefeld]

Caption (xs, regular, normal)
Wir verwenden Ihre E-Mail nur für Auftragsbestätigungen.
```

### Navigationselemente

```
Primary Navigation
Label (sm, medium, normal)
Produkte | Lösungen | Service | Kontakt

Breadcrumb
Caption (xs, regular, normal)
Home > Produkte > AquaTech Serie
```

### Call-to-Action Button

```
Button (sm, medium, wide)
JETZT BERATEN LASSEN
```

### Produktspezifikationen

```
H3 (3xl, semibold, snug)
Abmessungen

H5 (xl, medium, normal)
Breite

Body Base (base, regular, normal)
850 mm (Standardausführung)
```

## Responsive Skalierung

### Desktop (1440px+)
Alle Größen wie definiert verwenden.

### Tablet (768px - 1439px)
- H1: 4xl (36px) statt 5xl (48px)
- H2: 3xl (30px) statt 4xl (36px)
- Übrige Größen unverändert

### Mobile (< 768px)
- H1: 3xl (30px) statt 5xl (48px)
- H2: 2xl (24px) statt 4xl (36px)
- H3: xl (20px) statt 3xl (30px)
- Body Text: Mindestens 16px (base) beibehalten
- Line Heights: +0.125 erhöhen für bessere Lesbarkeit auf kleinen Screens

**Wichtig:** Body-Text nie unter 16px skalieren – Barrierefreiheit hat Priorität.

## Barrierefreiheit

### WCAG-Konformität

**Minimale Schriftgrößen:**
- **Body-Text:** Mindestens 16px (1rem)
- **UI-Elemente:** Mindestens 14px (0.875rem)
- **Hilfstexte:** Mindestens 12px (0.75rem)

**Kontrastverhältnisse:**
- **Normaler Text (< 18px):** Mindestens 4.5:1 (WCAG AA)
- **Großer Text (≥ 18px):** Mindestens 3:1 (WCAG AA)
- **UI-Komponenten:** Mindestens 3:1 (WCAG AA)

### Zeilenlänge
- **Maximum:** 75 Zeichen für optimale Lesbarkeit
- **Minimum:** 45 Zeichen (auf mobilen Geräten akzeptabel)

### Anpassbare Schriftgrößen
Das System muss Browserskalierung unterstützen:
- Verwendung von `rem` statt `px` in CSS-Implementierung
- Keine festen `max-height` Einschränkungen auf Textcontainern
- Responsive Container, die wachsen können

### Fokus-Indikatoren
Bei interaktiven Textelementen (Links, Buttons):
- Deutlich sichtbarer Fokus-Indikator
- Mindestens 2px Outline-Breite
- Kontrast mindestens 3:1 zum Hintergrund

## Technische Implementierung

### Web Font Loading

**Empfohlene Strategie:**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

**CSS Font-Face (Self-Hosted):**
```css
@font-face {
  font-family: 'Inter';
  src: url('/fonts/Inter-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
```

**Font-Display:** `swap` verwenden für optimale Performance – Fallback-Font wird sofort angezeigt, bis Web Font geladen ist.

### CSS Custom Properties

```css
:root {
  /* Font Families */
  --font-sans: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-mono: "JetBrains Mono", "Fira Code", "Courier New", monospace;

  /* Font Sizes */
  --font-size-xs: 0.75rem;    /* 12px */
  --font-size-sm: 0.875rem;   /* 14px */
  --font-size-base: 1rem;     /* 16px */
  --font-size-lg: 1.125rem;   /* 18px */
  --font-size-xl: 1.25rem;    /* 20px */
  --font-size-2xl: 1.5rem;    /* 24px */
  --font-size-3xl: 1.875rem;  /* 30px */
  --font-size-4xl: 2.25rem;   /* 36px */
  --font-size-5xl: 3rem;      /* 48px */
  --font-size-6xl: 3.75rem;   /* 60px */
}
```

### Token-Referenzen

Alle Werte sind in `design-system/tokens/typography.json` definiert und können mit Style Dictionary transformiert werden in:
- CSS Custom Properties
- SCSS Variables
- JavaScript/TypeScript Konstanten
- iOS/Android native Tokens

---

**Version:** 1.0
**Letzte Aktualisierung:** Januar 2026
**Verantwortlich:** Hydrophon Design System Team
