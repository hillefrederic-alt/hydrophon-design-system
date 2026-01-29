# Footer

Der Footer bietet sekundäre Navigation, Kontaktinformationen und rechtlich erforderliche Links am Ende jeder Seite.

## Übersicht

**Zweck:** Der Footer ist die letzte Orientierungshilfe auf einer Seite und vermittelt Vertrauen durch Vollständigkeit und Professionalität.

**B2B-Kontext:** Im B2B-Bereich ist der Footer besonders wichtig für:
- Kontaktinformationen (Vertrieb, Support, Service-Hotlines)
- Rechtliche Pflichtangaben (Impressum, Datenschutz, AGB)
- Sekundäre Navigation (Über uns, Karriere, Presse)
- Vertrauensbildende Elemente (Zertifikate, Partner, Social Media)

**Wann verwenden:**
- Auf jeder öffentlichen Seite der Website
- Konsistente Darstellung über alle Seiten hinweg

**Wann nicht verwenden:**
- Single-Page-Applications ohne Footer-Anforderung
- Formulare oder Checkout-Prozesse (vereinfachter Footer möglich)

## Anatomie

Ein Footer besteht typischerweise aus folgenden Bereichen:

1. **Footer-Container:** `<footer>` Element mit automatischem `role="contentinfo"`
2. **Logo (optional):** Markenidentität und Link zur Startseite
3. **Link-Gruppen:** 3-4 thematische Spalten mit Überschriften und Links
4. **Kontakt (optional):** Adresse, Telefon, E-Mail in `<address>` Element
5. **Legal-Bereich:** Copyright, Impressum, Datenschutz, AGB

```
┌──────────────────────────────────────────────────────────────────┐
│                                                                  │
│  [Logo]        [Produkte]      [Unternehmen]      [Service]     │
│                - Link 1        - Über uns         - Support     │
│                - Link 2        - Karriere         - Downloads   │
│                - Link 3        - Presse           - FAQ         │
│                                - Partner          - Kontakt     │
│                                                                  │
│  ────────────────────────────────────────────────────────────── │
│                                                                  │
│  © 2024 Hydrophon | Impressum | Datenschutz | AGB              │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

## Layout

### Desktop (>= 768px)

Auf Desktop-Geräten wird ein mehrspaliges Grid-Layout verwendet:

**Grid-Struktur:**
- 3-4 Spalten für Link-Gruppen
- Optional: Logo links (zusätzliche Spalte oder über Link-Gruppen)
- Legal-Bereich volle Breite unten

**Vorteile:**
- Übersichtliche Gruppierung verwandter Links
- Effiziente Platznutzung
- Schnelles Scannen durch klare Struktur

```css
.footer-content {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--footer-gap); /* 32px */
}
```

### Tablet (768px - 1024px)

**Option 1:** 3 Spalten (eine Gruppe bricht um)
**Option 2:** 2 Spalten (je 2 Gruppen)

```css
@media (min-width: 768px) and (max-width: 1023px) {
  .footer-content {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

### Mobile (< 768px)

**Einspaltig:** Alle Link-Gruppen untereinander gestapelt.

**Option 1: Gestackt (empfohlen)**
- Alle Gruppen permanent sichtbar
- Einfache Implementierung
- Kein JavaScript erforderlich

**Option 2: Akkordeon**
- Überschriften klappbar
- Kompakter initial
- Benötigt JavaScript + ARIA-Attribute

**Empfehlung:** Gestackt für < 6 Link-Gruppen, Akkordeon für ≥ 6 Gruppen.

```css
@media (max-width: 767px) {
  .footer-content {
    grid-template-columns: 1fr;
  }
}
```

## Link-Gruppen

### Typische Gruppierung

Für eine B2B-Website wie Hydrophon empfehlen sich folgende Link-Gruppen:

**Gruppe 1: Produkte**
- Produktkategorien (z.B. Waschtische, Duschen, Armaturen)
- Produktlinien (Hydrophon, Gluy)
- Zubehör

**Gruppe 2: Unternehmen**
- Über uns
- Karriere
- Nachhaltigkeit
- Presse
- Partner

**Gruppe 3: Service**
- Support
- Downloads (Kataloge, Technische Datenblätter)
- FAQ
- Garantie
- Händlersuche

**Gruppe 4: Kontakt**
- Kontaktformular
- Service-Hotline
- Vertrieb
- Showrooms
- Adresse (falls in `<address>` Element)

**Anzahl:** Maximum 4-5 Gruppen für gute Übersichtlichkeit.

### Styling

**Überschriften:**
- Uppercase für visuelle Hierarchie
- Semibold (600) für Betonung
- 14px für kompakte Darstellung
- 16px Abstand nach unten

```css
.footer-heading {
  font-size: var(--footer-heading-fontSize); /* 14px */
  font-weight: var(--footer-heading-fontWeight); /* 600 */
  color: var(--footer-heading-color); /* neutral.900 */
  text-transform: var(--footer-heading-textTransform); /* uppercase */
  letter-spacing: var(--footer-heading-letterSpacing); /* 0.05em */
  margin-bottom: var(--footer-heading-marginBottom); /* 16px */
}
```

**Links:**
- Dezentes Grau (`neutral.600`) für sekundäre Navigation
- Dunkler bei Hover (`neutral.900`)
- 14px Schriftgröße
- line-height 2 für großzügige Touch-Targets (28px bei 14px Schrift)

```css
.footer-link {
  color: var(--footer-link-color); /* neutral.600 */
  font-size: var(--footer-link-fontSize); /* 14px */
  line-height: var(--footer-link-lineHeight); /* 2 */
  text-decoration: none;
  transition: color 150ms ease-in-out;
}

.footer-link:hover {
  color: var(--footer-link-colorHover); /* neutral.900 */
}
```

### Navigation-Semantik

Jede Link-Gruppe sollte in einem `<nav>` Element mit eindeutigem `aria-label` verschachtelt sein:

```html
<nav aria-label="Produkt-Links">
  <h3>Produkte</h3>
  <ul>
    <li><a href="/produkte/waschtische">Waschtische</a></li>
    <li><a href="/produkte/duschen">Duschen</a></li>
  </ul>
</nav>
```

**Warum wichtig:** Screen Reader erkennen mehrere Navigations-Landmarks. `aria-label` unterscheidet sie eindeutig.

## Legal-Bereich

Der Legal-Bereich enthält rechtlich erforderliche Informationen und Links.

### Pflicht-Elemente (Deutschland)

**Copyright-Text:**
- Jahreszahl und Firmenname
- Beispiel: `© 2024 Hydrophon GmbH`

**Impressum:**
- Anbieterkennzeichnung nach § 5 TMG
- Link zu Impressumsseite

**Datenschutzerklärung:**
- Pflicht nach DSGVO Art. 13
- Link zu Datenschutzseite

**Optional (je nach Website):**
- AGB (bei Online-Shop)
- Widerrufsbelehrung (bei Online-Shop)
- Cookie-Einstellungen (DSGVO-Compliance)

### Styling

**Separator:** Links inline mit vertikalem Trennzeichen (|) oder flex mit gap.

**Kleinere Schrift:** 12px für dezente sekundäre Information.

**Dezente Farbe:** `neutral.500` für weniger visuelles Gewicht.

**Abstand:** Border und Padding trennen Legal-Bereich vom Hauptfooter.

```css
.footer-legal {
  font-size: var(--footer-legal-fontSize); /* 12px */
  color: var(--footer-legal-color); /* neutral.500 */
  margin-top: var(--footer-legal-marginTop); /* 32px */
  border-top: 1px solid var(--footer-legal-borderTop-color); /* neutral.200 */
  padding-top: var(--footer-legal-paddingTop); /* 24px */
}
```

### Layout-Optionen

**Option 1: Inline mit Separator**

```html
<div class="footer-legal">
  <p>
    © 2024 Hydrophon GmbH |
    <a href="/impressum">Impressum</a> |
    <a href="/datenschutz">Datenschutz</a> |
    <a href="/agb">AGB</a>
  </p>
</div>
```

**Option 2: Flex mit Gap (empfohlen)**

```html
<div class="footer-legal">
  <p>© 2024 Hydrophon GmbH</p>
  <nav aria-label="Rechtliche Links">
    <a href="/impressum">Impressum</a>
    <a href="/datenschutz">Datenschutz</a>
    <a href="/agb">AGB</a>
  </nav>
</div>
```

```css
.footer-legal {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--spacing-4);
}

.footer-legal nav {
  display: flex;
  gap: var(--spacing-4);
}
```

**Vorteil Option 2:** Bessere Kontrolle über Layout, keine Text-Separatoren, responsive-freundlicher.

## Tokens

Alle Footer-Styles sind über Design Tokens konfigurierbar:

| Token | Wert | CSS-Variable | Beschreibung |
|-------|------|--------------|--------------|
| `footer.background` | `{neutral.100}` | `--footer-background` | Hintergrundfarbe - dezent vom Hauptinhalt abgesetzt |
| `footer.borderTop.color` | `{neutral.200}` | `--footer-borderTop-color` | Obere Rahmenlinie |
| `footer.paddingY` | `{spacing.12}` (48px) | `--footer-paddingY` | Vertikales Padding für großzügigen Abstand |
| `footer.paddingX` | `{spacing.6}` (24px) | `--footer-paddingX` | Horizontales Padding |
| `footer.maxWidth` | `1280px` | `--footer-maxWidth` | Maximale Breite konsistent mit Grid |
| `footer.gap` | `{spacing.8}` (32px) | `--footer-gap` | Abstand zwischen Spalten |
| `footer.heading.fontSize` | `{fontSize.sm}` (14px) | `--footer-heading-fontSize` | Überschriften-Größe |
| `footer.heading.fontWeight` | `{fontWeight.semibold}` (600) | `--footer-heading-fontWeight` | Überschriften-Gewicht |
| `footer.heading.color` | `{neutral.900}` | `--footer-heading-color` | Überschriften-Farbe |
| `footer.heading.textTransform` | `uppercase` | `--footer-heading-textTransform` | Uppercase für Hierarchie |
| `footer.heading.letterSpacing` | `0.05em` | `--footer-heading-letterSpacing` | Buchstabenabstand |
| `footer.heading.marginBottom` | `{spacing.4}` (16px) | `--footer-heading-marginBottom` | Abstand unter Überschrift |
| `footer.link.color` | `{neutral.600}` | `--footer-link-color` | Link-Farbe |
| `footer.link.colorHover` | `{neutral.900}` | `--footer-link-colorHover` | Link-Farbe bei Hover |
| `footer.link.fontSize` | `{fontSize.sm}` (14px) | `--footer-link-fontSize` | Link-Größe |
| `footer.link.lineHeight` | `2` | `--footer-link-lineHeight` | Touch-Target-freundliche Zeilenhöhe |
| `footer.legal.fontSize` | `{fontSize.xs}` (12px) | `--footer-legal-fontSize` | Legal-Text Größe |
| `footer.legal.color` | `{neutral.500}` | `--footer-legal-color` | Legal-Text Farbe |
| `footer.legal.marginTop` | `{spacing.8}` (32px) | `--footer-legal-marginTop` | Abstand über Legal-Bereich |
| `footer.legal.borderTop.color` | `{neutral.200}` | `--footer-legal-borderTop-color` | Legal-Bereich obere Linie |
| `footer.legal.paddingTop` | `{spacing.6}` (24px) | `--footer-legal-paddingTop` | Legal-Bereich oberes Padding |

**Token-Referenzen:** Siehe `design-system/tokens/navigation.json`

## Code-Beispiele

### HTML - Vollständige Struktur

```html
<footer class="footer">
  <div class="footer-container">
    <!-- Optional: Logo -->
    <div class="footer-logo">
      <a href="/">
        <img src="/logo.svg" alt="Hydrophon" />
      </a>
    </div>

    <!-- Link-Gruppen -->
    <div class="footer-content">
      <!-- Gruppe 1: Produkte -->
      <nav aria-label="Produkt-Links">
        <h3 class="footer-heading">Produkte</h3>
        <ul>
          <li><a href="/produkte/waschtische">Waschtische</a></li>
          <li><a href="/produkte/duschen">Duschen</a></li>
          <li><a href="/produkte/armaturen">Armaturen</a></li>
          <li><a href="/produkte/zubehoer">Zubehör</a></li>
        </ul>
      </nav>

      <!-- Gruppe 2: Unternehmen -->
      <nav aria-label="Unternehmen">
        <h3 class="footer-heading">Unternehmen</h3>
        <ul>
          <li><a href="/ueber-uns">Über uns</a></li>
          <li><a href="/karriere">Karriere</a></li>
          <li><a href="/nachhaltigkeit">Nachhaltigkeit</a></li>
          <li><a href="/presse">Presse</a></li>
        </ul>
      </nav>

      <!-- Gruppe 3: Service -->
      <nav aria-label="Service">
        <h3 class="footer-heading">Service</h3>
        <ul>
          <li><a href="/support">Support</a></li>
          <li><a href="/downloads">Downloads</a></li>
          <li><a href="/faq">FAQ</a></li>
          <li><a href="/haendlersuche">Händlersuche</a></li>
        </ul>
      </nav>

      <!-- Gruppe 4: Kontakt -->
      <nav aria-label="Kontakt">
        <h3 class="footer-heading">Kontakt</h3>
        <ul>
          <li><a href="/kontakt">Kontaktformular</a></li>
          <li><a href="tel:+4912345678">+49 123 456 78</a></li>
          <li><a href="mailto:info@hydrophon.de">info@hydrophon.de</a></li>
        </ul>
      </nav>
    </div>

    <!-- Legal-Bereich -->
    <div class="footer-legal">
      <p>© 2024 Hydrophon GmbH</p>
      <nav aria-label="Rechtliche Links">
        <a href="/impressum">Impressum</a>
        <a href="/datenschutz">Datenschutz</a>
        <a href="/agb">AGB</a>
      </nav>
    </div>
  </div>
</footer>
```

### CSS - Vollständiges Styling

```css
/* Footer Container */
.footer {
  background-color: var(--footer-background);
  border-top: 1px solid var(--footer-borderTop-color);
  padding: var(--footer-paddingY) var(--footer-paddingX);
}

.footer-container {
  max-width: var(--footer-maxWidth);
  margin: 0 auto;
}

/* Optional: Logo */
.footer-logo {
  margin-bottom: var(--spacing-8);
}

.footer-logo img {
  height: 40px;
  width: auto;
}

/* Link-Gruppen Grid */
.footer-content {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--footer-gap);
  margin-bottom: var(--footer-legal-marginTop);
}

/* Gruppe-Navigation */
.footer-content nav {
  /* Keine zusätzlichen Styles - aria-label ist nicht visuell */
}

/* Überschriften */
.footer-heading {
  font-size: var(--footer-heading-fontSize);
  font-weight: var(--footer-heading-fontWeight);
  color: var(--footer-heading-color);
  text-transform: var(--footer-heading-textTransform);
  letter-spacing: var(--footer-heading-letterSpacing);
  margin-bottom: var(--footer-heading-marginBottom);
}

/* Listen */
.footer-content ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

/* Links */
.footer-content a {
  color: var(--footer-link-color);
  font-size: var(--footer-link-fontSize);
  line-height: var(--footer-link-lineHeight);
  text-decoration: none;
  transition: color 150ms ease-in-out;
}

.footer-content a:hover {
  color: var(--footer-link-colorHover);
}

.footer-content a:focus-visible {
  outline: 2px solid var(--hydrophon-blau-300);
  outline-offset: 2px;
  border-radius: 2px;
}

/* Legal-Bereich */
.footer-legal {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--spacing-4);
  padding-top: var(--footer-legal-paddingTop);
  border-top: 1px solid var(--footer-legal-borderTop-color);
  font-size: var(--footer-legal-fontSize);
  color: var(--footer-legal-color);
}

.footer-legal p {
  margin: 0;
}

.footer-legal nav {
  display: flex;
  gap: var(--spacing-4);
}

.footer-legal a {
  color: var(--footer-legal-color);
  text-decoration: none;
  transition: color 150ms ease-in-out;
}

.footer-legal a:hover {
  color: var(--neutral-700);
}

/* Responsive: Tablet */
@media (max-width: 1023px) {
  .footer-content {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Responsive: Mobile */
@media (max-width: 767px) {
  .footer-content {
    grid-template-columns: 1fr;
  }

  .footer-legal {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-3);
  }

  .footer-legal nav {
    flex-direction: column;
    gap: var(--spacing-2);
  }
}
```

### React-Beispiel

```jsx
function Footer() {
  const linkGroups = [
    {
      title: "Produkte",
      ariaLabel: "Produkt-Links",
      links: [
        { label: "Waschtische", href: "/produkte/waschtische" },
        { label: "Duschen", href: "/produkte/duschen" },
        { label: "Armaturen", href: "/produkte/armaturen" },
        { label: "Zubehör", href: "/produkte/zubehoer" }
      ]
    },
    {
      title: "Unternehmen",
      ariaLabel: "Unternehmen",
      links: [
        { label: "Über uns", href: "/ueber-uns" },
        { label: "Karriere", href: "/karriere" },
        { label: "Nachhaltigkeit", href: "/nachhaltigkeit" },
        { label: "Presse", href: "/presse" }
      ]
    },
    {
      title: "Service",
      ariaLabel: "Service",
      links: [
        { label: "Support", href: "/support" },
        { label: "Downloads", href: "/downloads" },
        { label: "FAQ", href: "/faq" },
        { label: "Händlersuche", href: "/haendlersuche" }
      ]
    },
    {
      title: "Kontakt",
      ariaLabel: "Kontakt",
      links: [
        { label: "Kontaktformular", href: "/kontakt" },
        { label: "+49 123 456 78", href: "tel:+4912345678" },
        { label: "info@hydrophon.de", href: "mailto:info@hydrophon.de" }
      ]
    }
  ];

  const legalLinks = [
    { label: "Impressum", href: "/impressum" },
    { label: "Datenschutz", href: "/datenschutz" },
    { label: "AGB", href: "/agb" }
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          {linkGroups.map((group) => (
            <nav key={group.ariaLabel} aria-label={group.ariaLabel}>
              <h3 className="footer-heading">{group.title}</h3>
              <ul>
                {group.links.map((link) => (
                  <li key={link.href}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="footer-legal">
          <p>© {new Date().getFullYear()} Hydrophon GmbH</p>
          <nav aria-label="Rechtliche Links">
            {legalLinks.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
```

## Barrierefreiheit

Der Footer muss für alle Nutzer zugänglich sein, unabhängig von ihren Fähigkeiten oder verwendeten Technologien.

### Landmark: role="contentinfo"

**Automatisch:** Das `<footer>` Element hat automatisch `role="contentinfo"`.

**Screen Reader-Ansage:** "Contentinfo Landmark" oder "Footer Landmark".

**Warum wichtig:** Screen Reader-Nutzer können direkt zum Footer springen (Tastenkürzel in NVDA/JAWS).

**Einschränkung:** Nur ein `contentinfo` Landmark pro Seite (äußerstes `<footer>` Element).

### Mehrere nav-Elemente

**Problem:** Footer enthält mehrere `<nav>` Elemente. Screen Reader kündigen alle als "Navigation" an.

**Lösung:** Jedes `<nav>` benötigt eindeutiges `aria-label`.

```html
<nav aria-label="Produkt-Links">...</nav>
<nav aria-label="Unternehmen">...</nav>
<nav aria-label="Service">...</nav>
<nav aria-label="Rechtliche Links">...</nav>
```

**Screen Reader-Ansage:** "Produkt-Links Navigation", "Unternehmen Navigation", etc.

### Skip-Links

**Problem:** Keyboard-Nutzer müssen alle Header- und Footer-Links durchtabben.

**Lösung:** Skip-Link am Seitenanfang ("Zum Hauptinhalt springen").

```html
<a href="#main" class="skip-link">Zum Hauptinhalt springen</a>

<header>...</header>

<main id="main">...</main>

<footer>...</footer>
```

**Styling:** Skip-Link visuell versteckt, sichtbar bei Fokus.

```css
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  z-index: 100;
}

.skip-link:focus {
  top: 0;
}
```

### Touch-Targets

**WCAG 2.5.5 (AAA):** Touch-Targets sollten mindestens 44x44px sein.

**Erfüllung:** Footer-Links haben `line-height: 2`, was bei 14px Schrift 28px ergibt. Für AAA-Compliance zusätzliches Padding hinzufügen:

```css
.footer-content a {
  display: inline-block;
  padding: 8px 0; /* Erreicht 44px Höhe: 8 + 28 + 8 */
}
```

### Kontrast

**WCAG 1.4.3:** Text benötigt 4.5:1 Kontrast (oder 3:1 für große Schrift ≥ 18px).

**Erfüllung:**
- Footer-Links: `neutral.600` (#757575) auf `neutral.100` (#f5f5f5) = 4.5:1 ✓
- Legal-Text: `neutral.500` (#9e9e9e) auf `neutral.100` = 3.2:1 (grenzwertig)

**Empfehlung bei strenger WCAG-Compliance:** Legal-Text auf `neutral.600` anpassen.

### Focus-Indicator

**Standard:** Konsistent mit globalen Link-Styles (2px outline, 2px offset).

**WCAG 2.4.7:** Focus muss visuell erkennbar sein.

**Erfüllung:** Siehe CSS-Beispiele - `hydrophon.blau.300` outline.

## Best Practices

### Konsistenz

**Position:** Footer sollte auf allen Seiten an derselben Position erscheinen.

**Inhalt:** Gleiche Link-Gruppen und Legal-Links auf allen Seiten (außer spezielle Landing Pages).

**Styling:** Einheitliche Farben, Abstände, Typografie.

### Klare Gruppierung

**Maximum 4-5 Gruppen:** Mehr verwirrt Nutzer.

**Logische Themen:** Verwandte Links gruppieren (nicht alphabetisch).

**Überschriften:** Kurz und prägnant (1-2 Wörter).

### Legal immer unten

**Trennung:** Visuell vom Hauptfooter getrennt (Border, zusätzlicher Abstand).

**Vollständigkeit:** Alle rechtlich erforderlichen Links enthalten.

**Aktualität:** Copyright-Jahr automatisch aktualisieren (JavaScript oder Server-Side).

### Performance

**Bilder optimieren:** Logo als SVG oder optimiertes PNG/WebP.

**Lazy Loading:** Nicht erforderlich für Footer (unterhalb Fold).

**Critical CSS:** Footer-Styles können nachgeladen werden.

## Nicht verwenden

### Zu viele Links ohne Gruppierung

**Falsch:** 20+ Links ohne thematische Gruppierung.

**Problem:** Überfordernd, schwer zu scannen, keine Orientierung.

**Richtig:** Maximum 4-5 Gruppen mit je 4-6 Links.

### Fehlende Landmark-Region

**Falsch:**
```html
<div class="footer">...</div>
```

**Problem:** Screen Reader erkennen keine contentinfo-Landmark.

**Richtig:**
```html
<footer class="footer">...</footer>
```

### nav ohne aria-label

**Falsch:**
```html
<nav>
  <h3>Produkte</h3>
  ...
</nav>
<nav>
  <h3>Service</h3>
  ...
</nav>
```

**Problem:** Screen Reader kündigen beide als "Navigation" an - nicht unterscheidbar.

**Richtig:** Siehe Code-Beispiele mit `aria-label`.

### Copyright ohne Jahr

**Falsch:** `© Hydrophon GmbH` (statisch)

**Problem:** Wirkt veraltet, rechtlich unklar.

**Richtig:** `© 2024 Hydrophon GmbH` (automatisch aktualisiert)

```jsx
<p>© {new Date().getFullYear()} Hydrophon GmbH</p>
```

## Referenzen

**Token-System:** Siehe `design-system/tokens/navigation.json` für alle Footer-Tokens.

**Header-Navigation:** Konsistente Focus-Indicator und Link-Styles.

**Grid-System:** Footer-Breite konsistent mit Grid-Container (1280px).

**WCAG 2.1 AA:** [Understanding WCAG 2.1](https://www.w3.org/WAI/WCAG21/Understanding/)

**Contentinfo Landmark:** [W3C ARIA Landmarks](https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/)
