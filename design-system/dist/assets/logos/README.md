# Hydrophon Logo-Assets v1.0.0

Dieses Paket enthält alle Logos der Hydrophon-Marken in optimierten Formaten für Web- und Print-Verwendung.

## Inhalt

- **SVG-Dateien** - Vektorformat, unbegrenzt skalierbar, ideal für Web und Druck
- **PNG-Dateien** - Rasterformat in drei Auflösungen (@1x, @2x, @3x) für verschiedene Bildschirmauflösungen

## Marken und Varianten

| Marke | Varianten |
|-------|-----------|
| **Hydrophon** | original, weiss, schwarz, blau, grau |
| **Gluy** | original, weiss, schwarz, hellblau, dunkelblau |
| **HyHero** | original, weiss, schwarz |
| **HyIndustry** | original, weiss, schwarz |

**Gesamt:** 16 Logo-Varianten

## Verwendung

### SVG-Dateien (`svg/`)

**Vorteile:**
- Unbegrenzt skalierbar ohne Qualitätsverlust
- Kleine Dateigröße (SVGO-optimiert, durchschnittlich 16% Reduzierung)
- Ideal für responsive Webdesign
- Geeignet für Druck in beliebiger Größe

**Einsatz:**
- Websites und Web-Anwendungen
- Druckmaterialien (Flyer, Broschüren, Banner)
- Präsentationen mit Vektorgrafik-Unterstützung

### PNG-Dateien (`png/`)

**Auflösungen:**
- **@1x (200px Breite)** - Standard-Displays (96 DPI), E-Mail, Office-Dokumente
- **@2x (400px Breite)** - Retina/HiDPI-Displays (192 DPI), MacBook, iPad
- **@3x (600px Breite)** - Ultra-High-Density-Displays (288 DPI), iPhone Pro

**Einsatz:**
- E-Mail-Signaturen und Newsletter
- Microsoft Office-Dokumente (Word, PowerPoint)
- Social-Media-Profile
- Anwendungen ohne SVG-Unterstützung

## Namenskonvention

Alle Dateien folgen einem konsistenten Namensschema:

```
logo-{marke}-{variante}.svg
logo-{marke}-{variante}@{scale}.png
```

**Beispiele:**
- `logo-hydrophon-original.svg`
- `logo-hydrophon-weiss@2x.png`
- `logo-gluy-hellblau@1x.png`

## Richtlinien

Vollständige Logo-Richtlinien (Clearspace, Mindestgrößen, Farbverwendung) finden Sie in der Design-System-Dokumentation:

📄 `docs/01-foundation/logo-guidelines.md`

**Wichtige Regeln:**
- Clearspace: Mindestabstand von 1X (Höhe des "H")
- Mindestgröße digital: 120px Breite
- Nie Logo verzerren (Seitenverhältnis beibehalten)
- Verwenden Sie "weiss" auf dunklem Hintergrund, "schwarz" auf hellem Hintergrund

## Lizenz

Diese Logo-Assets sind urheberrechtlich geschützt und ausschließlich für autorisierte Verwendung durch Partner, Händler und Mitarbeiter der Hydrophon GmbH bestimmt.

**Nicht gestattet:**
- Weitergabe an Dritte ohne Genehmigung
- Veränderung der Logos (Farbe, Proportionen, Elemente)
- Verwendung für nicht autorisierte Zwecke

Bei Fragen zur Verwendung wenden Sie sich bitte an: design@hydrophon.de

---

**Version:** 1.0.0
**Erstellt:** 2026-01-29
**Optimiert mit:** SVGO 4.0 + sharp 0.34
