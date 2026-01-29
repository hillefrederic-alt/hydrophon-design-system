# Figma Library - Quick Setup

Schnellstart-Anleitung für die Hydrophon Figma Library.

**Version:** 1.0.0
**Letzte Aktualisierung:** 2026-01-29
**Geschätzte Gesamtzeit:** 3-5 Stunden

---

## Schnellstart-Checkliste

### Phase 1: Vorbereitung (5 min)

- [ ] Figma Professional/Organization Account verifizieren
- [ ] Tokens Studio Plugin installieren (Plugins > Browse plugins > "Tokens Studio for Figma")
- [ ] `tokens-for-figma.json` aus diesem Ordner bereithalten (150 Tokens exportiert)

**Prüfen:** Plugin ist installiert und in Figma verfügbar.

---

### Phase 2: Datei erstellen (10 min)

- [ ] Neue Figma-Datei erstellen
- [ ] Datei benennen: "Hydrophon Design System Library"
- [ ] Seiten anlegen:
  - [ ] Cover
  - [ ] Colors
  - [ ] Typography
  - [ ] Icons
  - [ ] Components
  - [ ] Patterns
- [ ] Hydrophon Logo auf Cover-Seite platzieren (aus `design-system/assets/logos/hydrophon/`)
- [ ] Versionsnummer und Datum auf Cover eintragen

**Prüfen:** 6 Seiten existieren, Cover-Seite ist gestaltet.

---

### Phase 3: Variables importieren (15 min)

- [ ] Tokens Studio Plugin öffnen (Plugins > Tokens Studio for Figma)
- [ ] JSON-Import wählen (Import/Load from file)
- [ ] `tokens-for-figma.json` aus diesem Ordner hochladen
- [ ] Collections prüfen:
  - [ ] Colors Collection (51 Tokens)
  - [ ] Typography Collection (18 Tokens)
  - [ ] Spacing Collection (22 Tokens)
  - [ ] Effects Collection (22 Tokens)
- [ ] "Create Variables" klicken
- [ ] Alle Collections auswählen und Variables erstellen
- [ ] Local Variables überprüfen (rechte Sidebar)

**Prüfen:** 150 Variables sind als Figma Local Variables verfügbar.

---

### Phase 4: Basis-Komponenten (2-4 Stunden)

Erstellen Sie Komponenten in dieser Priorität. Verwenden Sie **immer Variables**, keine hardcodierten Werte.

#### Priorität 1 (häufigste Verwendung)

- [ ] **Button** (45-60 min)
  - [ ] 3 Varianten: Primary, Secondary, Tertiary
  - [ ] 3 Größen: Small (32px), Medium (40px), Large (48px)
  - [ ] 4 Zustände: Default, Hover, Focus, Disabled
  - [ ] Icon-Platzierung: Left, Right, Icon-only
  - [ ] Variables verwenden: spacing, color, borderRadius, fontSize, fontWeight
  - [ ] Dokumentation: `docs/02-components/button.md`

- [ ] **Input** (30-45 min)
  - [ ] 3 Größen: Small (32px), Medium (40px), Large (48px)
  - [ ] 6 Zustände: Default, Hover, Focus, Error, Disabled, Success
  - [ ] Mit Label, Helper Text, Error Message
  - [ ] Variables verwenden: spacing, color, borderRadius, fontSize
  - [ ] Dokumentation: `docs/03-forms/text-input.md`

- [ ] **Card - Product** (30 min)
  - [ ] Aspect Ratio 1:1
  - [ ] Image, Title, Price, Button
  - [ ] Hover-Effekt: translateY(-4px) + shadow-md
  - [ ] Variables verwenden: spacing, borderRadius, shadow
  - [ ] Dokumentation: `docs/04-layout/product-card.md`

- [ ] **Card - Content** (45 min)
  - [ ] 4 Varianten: Vertical, Horizontal, Text-only, Feature
  - [ ] Aspect Ratio 16:9 (Vertical)
  - [ ] Image, Title, Description, CTA
  - [ ] Variables verwenden: spacing, borderRadius, shadow
  - [ ] Dokumentation: `docs/04-layout/content-card.md`

#### Priorität 2 (erweiterte Verwendung)

- [ ] **Checkbox** (20 min)
  - [ ] 2 Größen: Default (20px), Large (24px)
  - [ ] 4 Zustände: Unchecked, Checked, Indeterminate, Disabled
  - [ ] Lucide Check Icon für Checked State
  - [ ] Dokumentation: `docs/03-forms/checkbox.md`

- [ ] **Radio Button** (20 min)
  - [ ] 2 Größen: Default (20px), Large (24px)
  - [ ] 3 Zustände: Unselected, Selected, Disabled
  - [ ] Inner dot (50% of container) für Selected State
  - [ ] Dokumentation: `docs/03-forms/radio.md`

- [ ] **Textarea** (20 min)
  - [ ] 2 Größen: Medium (3 rows), Large (5 rows)
  - [ ] 5 Zustände: Default, Hover, Focus, Error, Disabled
  - [ ] Character Counter optional
  - [ ] Dokumentation: `docs/03-forms/textarea.md`

- [ ] **Select** (30 min)
  - [ ] Native vs. Custom Dropdown Varianten
  - [ ] Zustände: Default, Hover, Focus, Open, Error, Disabled
  - [ ] Chevron Down Icon
  - [ ] Dokumentation: `docs/03-forms/select.md`

- [ ] **Table** (30 min)
  - [ ] Header Row mit Sortierung (Pfeil-Icons)
  - [ ] Body Rows mit Hover State
  - [ ] Zebra-Striping optional (neutral-50)
  - [ ] Variables verwenden: spacing, color, borderRadius
  - [ ] Dokumentation: `docs/04-layout/data-table.md`

- [ ] **Modal** (30 min)
  - [ ] 3 Größen: Small (400px), Medium (600px), Large (900px)
  - [ ] Header (mit Close Button), Body, Footer
  - [ ] Overlay (rgba(0,0,0,0.5))
  - [ ] Variables verwenden: spacing, borderRadius, shadow-xl
  - [ ] Dokumentation: `docs/05-feedback/modal.md`

- [ ] **Toast** (30 min)
  - [ ] 4 Varianten: Success, Info, Warning, Error
  - [ ] Icon, Message, Action Button, Close
  - [ ] Variables verwenden: spacing, borderRadius, color
  - [ ] Dokumentation: `docs/05-feedback/toast.md`

- [ ] **Tooltip** (15 min)
  - [ ] Minimal (max. 1-5 Wörter)
  - [ ] 4 Positionen: Top, Bottom, Left, Right (Pfeil)
  - [ ] Variables verwenden: spacing, borderRadius, shadow-md, neutral-900
  - [ ] Dokumentation: `docs/05-feedback/tooltip.md`

#### Priorität 3 (Layout-Komponenten)

- [ ] **Header** (45 min)
  - [ ] Logo Left + Navigation Right Layout
  - [ ] Desktop Height: 64px, Mobile: 56px
  - [ ] Navigation Links (44px touch targets)
  - [ ] Variables verwenden: spacing, color
  - [ ] Dokumentation: `docs/04-layout/header.md`

- [ ] **Mobile Drawer** (30 min)
  - [ ] Full-height overlay (100vh)
  - [ ] Close Button (44px, oben rechts)
  - [ ] Navigation Links (44px touch targets)
  - [ ] Transform-based slide animation
  - [ ] Dokumentation: `docs/04-layout/mobile-drawer.md`

- [ ] **Footer** (30 min)
  - [ ] CSS Grid Layout (4 Spalten Desktop)
  - [ ] Link Groups mit Uppercase Headings
  - [ ] Copyright und Legal Links
  - [ ] Variables verwenden: spacing, color
  - [ ] Dokumentation: `docs/04-layout/footer.md`

- [ ] **Breadcrumb** (20 min)
  - [ ] Links mit Chevron-Separator (›)
  - [ ] Current Page mit aria-current
  - [ ] Variables verwenden: spacing, color, fontSize
  - [ ] Dokumentation: `docs/04-layout/breadcrumb.md`

**Prüfen:** Alle gewünschten Komponenten sind als Figma Components erstellt und verwenden Variables.

---

### Phase 5: Publizieren (5 min)

- [ ] Alle Komponenten-Namen überprüfen (keine Tippfehler)
- [ ] Alle Varianten vollständig (alle States vorhanden)
- [ ] Token-Referenzen korrekt (keine hardcodierten Werte)
- [ ] Cover-Seite aktualisiert (Version, Datum)
- [ ] Datei > Library veröffentlichen
- [ ] Beschreibung eingeben:
  ```
  Hydrophon Design System v1.0.0

  Initiale Veröffentlichung mit:
  - 150+ Design Tokens (Colors, Typography, Spacing, Effects)
  - 17 UI-Komponenten (Button, Input, Card, Modal, etc.)
  - Layout-Patterns (Header, Footer, Grid)

  Dokumentation: design-system/docs/
  Token Export: npm run build:figma
  ```
- [ ] "Publish" klicken

**Prüfen:** Library ist published und in Assets verfügbar.

---

### Phase 6: Verteilen

#### Team-intern

- [ ] Teammitglieder informieren (E-Mail, Slack)
- [ ] Anleitung senden:
  1. Beliebige Figma-Datei öffnen
  2. Assets > Library-Symbol (Buch-Icon)
  3. "Hydrophon Design System" suchen
  4. Schalter aktivieren
  5. "Done" klicken
- [ ] Bei Fragen: Verweis auf `docs/06-distribution/figma-library-setup.md`

#### Externe Agenturen

Wählen Sie eine Zugriffsmethode:

**Option A: Guest Seats** (empfohlen für regelmäßige Nutzung)

- [ ] Team > Members > Invite members
- [ ] E-Mail-Adressen eingeben
- [ ] Role: "Guest" wählen
- [ ] Zugriff auf Design System Project beschränken
- [ ] Einladungen senden

**Option B: Figma Community File** (für öffentliche Libraries)

- [ ] Dateiname > Publish to Community
- [ ] Beschreibung, Cover-Bild, Tags hinzufügen
- [ ] "Public" oder "Private" wählen
- [ ] Publish klicken
- [ ] Community-Link an Agenturen senden

**Option C: .fig Datei Export** (für einmalige Projekte)

- [ ] Dateiname > Export...
- [ ] Format: .fig
- [ ] Export klicken
- [ ] Datei per E-Mail oder Cloud-Link senden

**Prüfen:** Alle gewünschten Nutzer haben Zugriff auf die Library.

---

## Token-Updates durchführen

Falls sich Design Tokens ändern:

1. **Im Design System:**
   ```bash
   npm run build:figma
   ```
2. **In Figma:**
   - Tokens Studio öffnen
   - Import > aktualisierte `tokens-for-figma.json` hochladen
   - "Update Variables" klicken
3. **Komponenten prüfen:**
   - Komponenten, die Variables nutzen, werden automatisch aktualisiert
   - Keine manuellen Änderungen nötig
4. **Library neu veröffentlichen:**
   - Publish changes
   - Changelog-Beschreibung hinzufügen

---

## Dateien in diesem Ordner

| Datei | Beschreibung |
|-------|--------------|
| `tokens-for-figma.json` | Token-Export für Figma Variables Import (150 Tokens) |
| `FIGMA-SETUP.md` | Diese Anleitung (Schnellstart-Checkliste) |

**Generierung:**

```bash
npm run build:figma
```

Erzeugt: `figma/tokens-for-figma.json` aus allen Token-Dateien (`tokens/*.json`)

---

## Ausführliche Dokumentation

Für detaillierte Erklärungen zu jedem Schritt:

**Siehe:** `docs/06-distribution/figma-library-setup.md`

Enthält:

1. Voraussetzungen
2. Figma-Datei erstellen
3. Variables importieren
4. Komponenten erstellen (mit detaillierten Workflows)
5. Library veröffentlichen
6. Team-Zugriff einrichten
7. Wartung und Updates
8. Best Practices
9. Troubleshooting
10. Weiterführende Ressourcen

---

## Komponenten-Dokumentation

Alle Komponenten sind vollständig in Markdown dokumentiert:

| Bereich | Dateien |
|---------|---------|
| **Buttons** | `docs/02-components/button.md` |
| **Forms** | `docs/03-forms/text-input.md`, `textarea.md`, `select.md`, `checkbox.md`, `radio.md` |
| **Layout** | `docs/04-layout/product-card.md`, `content-card.md`, `data-table.md`, `header.md`, `footer.md`, `breadcrumb.md`, `mobile-drawer.md` |
| **Feedback** | `docs/05-feedback/modal.md`, `toast.md`, `tooltip.md`, `loading.md` |

Jede Datei enthält:

- Token-Referenzen
- Varianten und Zustände
- Code-Beispiele (HTML + CSS)
- Accessibility-Guidelines
- Anti-Patterns

---

## Support

Bei Fragen oder Problemen:

- **E-Mail:** design@hydrophon.de
- **Interner Slack:** #design-system Channel
- **Dokumentation:** `design-system/docs/`

---

**Tipp:** Arbeiten Sie die Checkliste systematisch ab. Priorisieren Sie Komponenten nach Häufigkeit der Verwendung. Sie können jederzeit Komponenten ergänzen und die Library aktualisieren.

**Viel Erfolg beim Setup der Hydrophon Figma Library!** 🎨
