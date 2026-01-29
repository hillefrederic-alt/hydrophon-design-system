# Hydrophon Design-System

## What This Is

Ein umfassendes Corporate Identity Design-System für die Hydrophon Kunststoff GmbH - ein mittelständischer Hersteller von selbstklebenden Abdichtungen im Sanitärbereich. Das System dokumentiert alle visuellen und gestalterischen Regeln und dient als Grundlage für die neue Unternehmenswebsite sowie als Referenz für interne Teams und externe Agenturen.

## Core Value

Das Design-System vermittelt Hydrophons moderne, innovative Positionierung im B2B-Sanitärbereich und ermöglicht konsistente Markenkommunikation über alle Touchpoints hinweg.

## Current Status

**Version:** v1.0.0
**Released:** 2026-01-29
**Status:** Complete and distributed

Hydrophon Design System v1.0 delivered comprehensive design foundation with 400+ design tokens, 17+ documented components, multi-format documentation (PDF, web), and distribution packages for all stakeholders.

**Key Deliverables:**
- W3C DTCG token system with CSS/SCSS/JSON outputs
- 26,658+ lines of German documentation
- 13.5MB PDF with Hydrophon branding
- 64 logo assets (SVG/PNG), color palettes (ASE/GPL)
- NPM package with dual ESM/CJS support
- Stakeholder-specific distribution bundles

## Next Milestone Goals

*(To be defined with `/gsd:new-milestone` command)*

## Requirements

### Validated (v1.0)

<details>
<summary>v1.0 Requirements (64 total — all satisfied)</summary>

**Foundation:**
- [x] Logo-Dokumentation mit Anwendungsregeln (Varianten, Schutzraum, Mindestgrößen, Fehlverwendung)
- [x] Farbsystem mit Primär-, Sekundär- und funktionalen Farben inkl. Anwendungsregeln
- [x] Typografie-System mit Schriftfamilien, Hierarchien, Größen und Verwendungsbeispielen
- [x] Icon-System mit Stil-Definition und Basisset (35 Lucide icons)
- [x] Spacing- und Grid-System mit Breakpoints
- [x] Design Token System (W3C DTCG format)

**Components:**
- [x] UI-Komponenten (Buttons, Formulare, Karten, Navigation, Modals, Tooltips, Toasts, Loading States, Tables)
- [x] Alle Komponenten mit Accessibility (WCAG 2.1 AA)
- [x] Alle Komponenten mit States (hover, focus, active, disabled, error)

**Documentation:**
- [x] Dokumentation als PDF (13.5MB, 35+ sections, Hydrophon branding)
- [x] Quick Start Guide für Marketing (1,204 lines)
- [x] Audience-spezifische Guides (Marketing, Designer, Developer)
- [x] Accessibility Guidelines (WCAG 2.1 AA)
- [x] Technical Reference (Design Tokens, CSS Variables, Grid/Breakpoints)

**Distribution:**
- [x] Asset-Export-System (Logo-Files SVG/PNG, Farben ASE/GPL, Tokens CSS/SCSS/JSON)
- [x] NPM Package mit dual ESM/CJS support
- [x] Stakeholder-spezifische ZIP-Pakete (Complete, Logos, Tokens, Marketing)
- [x] Figma Library Setup-Dokumentation

See [v1.0-REQUIREMENTS.md](./milestones/v1.0-REQUIREMENTS.md) for complete list.
</details>

### Active

*(No active requirements — use `/gsd:new-milestone` to define next milestone)*

### Out of Scope

- Interaktive Design-System-Website — statische Dokumentation reicht für v1
- Print-spezifische Guidelines — Fokus liegt auf digitalen Medien
- Produktlinien-spezifische Sub-Brands — Fokus auf Hydrophon Hauptmarke, Produktlinien nutzen gleiches System
- Animation/Motion Guidelines — kann später ergänzt werden
- Detaillierte Tone-of-Voice/Copy-Guidelines — visuelles System hat Priorität

## Context

**Firma:**
- Hydrophon Kunststoff GmbH, Sauerland
- Mittelständisches Unternehmen, Produktion in Deutschland
- Spezialisierung: selbstklebende Abdichtungen im Sanitärbereich

**Zielgruppen:**
- Primär: Handwerker/Installateure
- Sekundär: Potenzielle Podbauer, Sanitär-Großkunden (z.B. MEPA, Kaldewei)

**Markenarchitektur:**
- Hydrophon = Hauptmarke (Corporate Brand)
- Gluy, hyHero, hyIndustry = Produktlinien unter Hydrophon

**Bestehende Assets:**
- Logo existiert in mehreren Varianten (Original, Weiß, Schwarz, Grau, Blau)
- Zwei Markenfarben definiert: Hydrophon Blau (#008BD2), Grau (#575656)
- Minimales Brand-CI-Dokument vorhanden (nur Logo + Farben)
- Bestehende Website: hydrophon.de (als Referenz, soll neu gebaut werden)
- Logo-Files strukturiert vorhanden: SVG, PNG, PDF in RGB/CMYK

**Nutzung:**
- Neue Website wird über Claude Code gebaut
- 3 externe Agenturen nutzen das Design-System
- Interne Marketing-Teams nutzen es für Präsentationen, Materialien
- Designer brauchen Figma/Sketch-Grundlagen
- Entwickler brauchen technische Specs (Tokens, Code-Snippets)

**Technische Besonderheit:**
- 3D-Produktvisualisierung statt klassischer Produktfotografie
- Modern-innovative Positionierung (nicht traditionell-konservativ)

## Constraints

- **Technologie**: Statische Dokumentation (PDF + Asset-Files), keine interaktive Web-Plattform für v1
- **Bestehende Assets**: Logo und zwei Markenfarben müssen integriert werden
- **Zielgruppe**: B2B-Kontext mit technischem Anspruch (Handwerker, Industriekunden)
- **Brand-Positionierung**: Modern und innovativ (kein traditionelles "Made in Germany"-Image)
- **Multi-User**: Muss für Designer, Entwickler UND Marketing-Laien verständlich sein
- **Website-Vorbereitung**: System muss direkt in Website-Entwicklung überführbar sein

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Statische Dokumentation statt Web-Tool | Schneller zu erstellen, alle Nutzergruppen erreicht, keine Maintenance | ✓ Shipped: 13.5MB PDF + web docs |
| W3C DTCG Token Format | Industry standard, future-proof, Style Dictionary support | ✓ Implemented: 400+ tokens |
| Lucide Icon Library | Open source, consistent style, 1,000+ icons available | ✓ Selected: 35 icons documented |
| Native-first Form Controls | Accessibility, browser compatibility, progressive enhancement | ✓ Documented: opacity:0 pattern |
| Dual ESM/CJS NPM Package | Modern + legacy support, developer flexibility | ✓ Published: dist/tokens/ |
| Einheitliches System für alle Produktlinien | Konsistenz, weniger Komplexität, Hydrophon als Dachmarke | ✓ Shipped: All brand logos included |

---
*Last updated: 2026-01-29 after v1.0 completion*
