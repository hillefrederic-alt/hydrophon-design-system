# Figma Library Setup - Hydrophon Design System

Umfassende Anleitung zur Erstellung und Veröffentlichung der Hydrophon Figma-Bibliothek.

**Hinweis:** Dieses Handbuch richtet sich an Designer, die die Figma-Bibliothek manuell erstellen. Die vollständige Automatisierung von Figma-Bibliotheken ist nicht möglich, da Figma Professional/Organization Plan und manuelle Komponenten-Erstellung erforderlich sind.

---

## 1. Voraussetzungen

Bevor Sie beginnen, stellen Sie sicher, dass folgende Anforderungen erfüllt sind:

- **Figma Professional oder Organization Plan** - Notwendig für Library Publishing
- **Tokens Studio Plugin** (ehemals Figma Tokens) - Für Variables Import
- **Zugriff auf tokens-for-figma.json** - Token-Datei im `figma/` Ordner des Design Systems
- **Grundkenntnisse in Figma** - Auto Layout, Components, Variants
- **Zeit:** Ca. 3-5 Stunden für vollständige Bibliothek

### Tokens Studio Plugin installieren

1. Öffnen Sie Figma
2. Gehen Sie zu **Plugins > Browse plugins in Community**
3. Suchen Sie nach "Tokens Studio for Figma"
4. Klicken Sie auf **Install**

---

## 2. Figma-Datei erstellen

### 2.1 Neue Datei anlegen

1. Erstellen Sie eine neue Figma-Datei
2. Benennen Sie die Datei: **"Hydrophon Design System Library"**
3. Speichern Sie die Datei in einem geeigneten Projekt-Ordner

### 2.2 Seiten-Struktur erstellen

Legen Sie folgende Seiten (Pages) in dieser Reihenfolge an:

| Seite | Zweck |
|-------|-------|
| **Cover** | Titelseite mit Hydrophon Logo, Versionsnummer, Beschreibung |
| **Colors** | Farbdokumentation mit allen Farbskalen und Semantic Colors |
| **Typography** | Schriftstile (Headings, Body, UI) mit Beispielen |
| **Icons** | Icon-Bibliothek basierend auf Lucide Icons (2px stroke) |
| **Components** | Alle UI-Komponenten (Buttons, Inputs, Cards, etc.) |
| **Patterns** | Layoutmuster (Grid, Header, Footer, Forms) |

### 2.3 Cover-Seite gestalten

Minimale Elemente für die Cover-Seite:

```
Hydrophon Logo (SVG aus design-system/assets/logos/)
Titel: "Hydrophon Design System"
Version: "v1.0.0"
Letzte Aktualisierung: [Datum]
Kurzbeschreibung: "Konsistente B2B-Markenkommunikation über alle Touchpoints"
```

---

## 3. Variables importieren

Mit Tokens Studio können Sie alle Design Tokens als Figma Variables importieren.

### 3.1 Plugin öffnen und Datei laden

1. Öffnen Sie die Figma-Datei
2. Starten Sie **Plugins > Tokens Studio for Figma**
3. Klicken Sie auf **Import** (oder **Load from file**)
4. Wählen Sie `figma/tokens-for-figma.json` aus

### 3.2 Collections erstellen

Das Plugin organisiert die Tokens automatisch in Collections. Überprüfen Sie folgende Struktur:

| Collection | Token-Typen | Anzahl |
|-----------|-------------|---------|
| **Colors** | Alle color-Tokens | ~51 |
| **Typography** | fontFamily, fontSize, fontWeight, lineHeight, letterSpacing | ~18 |
| **Spacing** | spacing-* Tokens (4px-128px) | ~22 |
| **Effects** | borderRadius, shadow, elevation | ~22 |

**Gesamtzahl:** ~150 Tokens

### 3.3 Variables als Figma Variables erstellen

1. Klicken Sie im Tokens Studio auf **Create Variables**
2. Wählen Sie alle Collections aus
3. Klicken Sie auf **Create**
4. Figma erstellt nun Local Variables für alle Tokens

**Tipp:** Sie können die Variables jederzeit über **Plugins > Tokens Studio > Update Variables** aktualisieren, wenn sich die Token-Datei ändert.

### 3.4 Modes definieren (Optional)

Falls Sie Light/Dark-Theme unterstützen möchten:

1. Öffnen Sie **Local variables** (Rechte Sidebar)
2. Wählen Sie die **Colors** Collection
3. Fügen Sie einen neuen Mode hinzu: "Dark"
4. Definieren Sie alternative Werte für Dark Mode

**Hinweis:** Das Hydrophon Design System ist aktuell Light-Only. Dark Mode kann später ergänzt werden.

---

## 4. Komponenten erstellen

Jetzt erstellen Sie die UI-Komponenten basierend auf der Dokumentation und den Variables.

### 4.1 Allgemeine Komponenten-Richtlinien

Für alle Komponenten gilt:

- **Auto Layout verwenden** - Für responsive Verhalten
- **Varianten definieren** - Für Zustände (hover, focus, disabled, error)
- **Token-Referenzen nutzen** - Verwenden Sie Variables, KEINE hardcodierten Werte
- **Benennung konsistent** - Verwenden Sie Component-Namen aus der Dokumentation

### 4.2 Komponenten-Checkliste

#### Priorität 1: Basis-Komponenten (2-3 Stunden)

Starten Sie mit den am häufigsten verwendeten Komponenten:

- [ ] **Button**
  - Varianten: Primary, Secondary, Tertiary, Icon-only
  - Größen: Small (32px), Medium (40px), Large (48px)
  - Zustände: Default, Hover, Focus, Disabled
  - Icon-Platzierung: Left, Right, Icon-only
  - Dokumentation: `docs/02-components/button.md`

- [ ] **Input**
  - Varianten: Text, Password, Email, Number
  - Größen: Small (32px), Medium (40px), Large (48px)
  - Zustände: Default, Hover, Focus, Error, Disabled, Success
  - Mit/ohne Label, Helper Text, Error Message
  - Dokumentation: `docs/03-forms/text-input.md`

- [ ] **Textarea**
  - Größen: Medium (3 rows), Large (5 rows)
  - Zustände: Default, Hover, Focus, Error, Disabled
  - Mit Character Counter
  - Dokumentation: `docs/03-forms/textarea.md`

- [ ] **Select**
  - Native vs. Custom Dropdown
  - Zustände: Default, Hover, Focus, Open, Error, Disabled
  - Dokumentation: `docs/03-forms/select.md`

- [ ] **Checkbox**
  - Größen: Default (20px), Large (24px)
  - Zustände: Unchecked, Checked, Indeterminate, Disabled
  - Mit Label
  - Dokumentation: `docs/03-forms/checkbox.md`

- [ ] **Radio Button**
  - Größen: Default (20px), Large (24px)
  - Zustände: Unselected, Selected, Disabled
  - Mit Label
  - Dokumentation: `docs/03-forms/radio.md`

- [ ] **Card - Product**
  - Aspect Ratio: 1:1
  - Image, Title, Price, Button
  - Hover-Effekt (translateY + shadow)
  - Dokumentation: `docs/04-layout/product-card.md`

- [ ] **Card - Content**
  - Varianten: Vertical, Horizontal, Text-only, Feature
  - Aspect Ratio: 16:9 (Vertical), flexible (Horizontal)
  - Image, Title, Description, CTA
  - Dokumentation: `docs/04-layout/content-card.md`

#### Priorität 2: Erweiterte Komponenten (1-2 Stunden)

- [ ] **Table**
  - Header Row, Body Rows
  - Zebra-Striping (optional)
  - Sortierung (Pfeil-Icons)
  - Dokumentation: `docs/04-layout/data-table.md`

- [ ] **Modal**
  - Größen: Small (400px), Medium (600px), Large (900px)
  - Header, Body, Footer
  - Close Button
  - Dokumentation: `docs/05-feedback/modal.md`

- [ ] **Toast**
  - Varianten: Success, Info, Warning, Error
  - Mit Icon, Message, Action Button, Close
  - Dokumentation: `docs/05-feedback/toast.md`

- [ ] **Tooltip**
  - Minimal (1-5 Wörter)
  - Positioning: Top, Bottom, Left, Right
  - Dokumentation: `docs/05-feedback/tooltip.md`

- [ ] **Spinner**
  - Größen: sm (16px), md (24px), lg (32px), xl (48px)
  - Farben: Primary, Secondary, Neutral
  - Dokumentation: `docs/05-feedback/loading.md`

- [ ] **Progress Bar**
  - Determinate (mit Prozent)
  - Indeterminate (animiert)
  - Dokumentation: `docs/05-feedback/loading.md`

#### Priorität 3: Layout-Komponenten (1-2 Stunden)

- [ ] **Header**
  - Logo Left + Navigation Right
  - Desktop Height: 64px, Mobile: 56px
  - Sticky auf Desktop only
  - Dokumentation: `docs/04-layout/header.md`

- [ ] **Mobile Drawer**
  - Full-height overlay
  - Close Button (oben rechts)
  - Navigation Links (44px touch targets)
  - Dokumentation: `docs/04-layout/mobile-drawer.md`

- [ ] **Footer**
  - CSS Grid Layout (4 Spalten Desktop, 1-2 Spalten Mobile)
  - Link Groups mit Headings
  - Copyright, Legal Links
  - Dokumentation: `docs/04-layout/footer.md`

- [ ] **Breadcrumb**
  - Links mit Chevron-Separator (›)
  - Letzte Seite mit aria-current
  - Dokumentation: `docs/04-layout/breadcrumb.md`

### 4.3 Komponenten-Workflow (Beispiel: Button)

**Schritt 1: Frame erstellen**

1. Erstellen Sie einen Frame auf der "Components"-Seite
2. Benennen Sie ihn: "Button"
3. Aktivieren Sie Auto Layout (Shift + A)

**Schritt 2: Inhalte hinzufügen**

1. Fügen Sie ein Text-Element hinzu: "Button Text"
2. Optional: Icon links oder rechts

**Schritt 3: Variables anwenden**

- Padding Horizontal: `{spacing-4}` (16px)
- Padding Vertical: `{spacing-2.5}` (10px) für Medium-Größe
- Background: `{color-primary}` für Primary Variant
- Border Radius: `{borderRadius-base}` (4px)
- Font Size: `{fontSize-sm}` (14px)
- Font Weight: `{fontWeight-medium}` (500)

**Schritt 4: Component erstellen**

1. Wählen Sie den Frame
2. Klicken Sie auf **Create component** (Ctrl/Cmd + Alt + K)
3. Benennen Sie die Component: "Button/Primary/Medium"

**Schritt 5: Varianten hinzufügen**

1. Erstellen Sie Duplikate für andere Varianten
2. Wählen Sie alle Varianten
3. Klicken Sie auf **Combine as variants**
4. Properties definieren:
   - Type: Primary, Secondary, Tertiary
   - Size: Small, Medium, Large
   - State: Default, Hover, Focus, Disabled

**Schritt 6: Interaktive States**

Für jeden State (Hover, Focus) definieren Sie:

- Background-Farbe anpassen
- Border anpassen
- Shadow anpassen

**Beispiel Hover für Primary Button:**

- Background: `{hydrophon-blau-600}` (dunkleres Blau)

**Beispiel Focus für Primary Button:**

- Border: 2px `{hydrophon-blau-300}`
- Box Shadow: 0 0 0 3px `{hydrophon-blau-300}` (ring effect)

---

## 5. Library veröffentlichen

Nachdem alle Komponenten erstellt sind, veröffentlichen Sie die Library.

### 5.1 Library Publishing aktivieren

1. Klicken Sie auf den Dateinamen (oben links)
2. Wählen Sie **Publish library** (oder **Publish changes**)
3. Geben Sie eine Beschreibung ein:
   ```
   Hydrophon Design System v1.0.0

   Initiale Veröffentlichung mit:
   - 150+ Design Tokens (Colors, Typography, Spacing, Effects)
   - 17 UI-Komponenten (Button, Input, Card, Modal, etc.)
   - Layout-Patterns (Header, Footer, Grid)

   Dokumentation: [Link zu Dokumentation]
   ```
4. Klicken Sie auf **Publish**

### 5.2 Veröffentlichungs-Checkliste

Vor dem Publishing überprüfen Sie:

- [ ] Alle Komponenten haben korrekte Namen
- [ ] Varianten sind vollständig (alle States)
- [ ] Alle Token-Referenzen sind korrekt (keine hardcodierten Werte)
- [ ] Cover-Seite enthält Versionsnummer und Datum
- [ ] Komponenten-Seite ist übersichtlich organisiert

---

## 6. Team-Zugriff einrichten

Je nach Zielgruppe wählen Sie die passende Zugriffsmethode.

### 6.1 Für Teammitglieder (Intern)

**Voraussetzung:** Teammitglieder haben Zugriff auf das Figma-Projekt.

**Aktivierung:**

1. Öffnen Sie eine beliebige Figma-Datei
2. Gehen Sie zu **Assets** (linke Sidebar)
3. Klicken Sie auf **Library-Symbol** (Buch-Icon)
4. Suchen Sie nach "Hydrophon Design System"
5. Aktivieren Sie den Schalter
6. Klicken Sie auf **Done**

Ab jetzt können Teammitglieder alle Library-Komponenten über die Assets-Sidebar einfügen.

### 6.2 Für externe Agenturen

Es gibt drei Optionen für externe Agenturen:

#### Option A: Guest Seats (empfohlen für regelmäßige Nutzung)

**Voraussetzung:** Organization Plan mit verfügbaren Guest Seats.

**Vorteil:**

- Agentur-Mitglieder können die Library direkt nutzen
- Automatische Updates bei Library-Änderungen
- Zugriff auf alle Komponenten

**Nachteil:**

- Kosten für Guest Seats

**Setup:**

1. Gehen Sie zu **Team > Members**
2. Klicken Sie auf **Invite members**
3. Geben Sie E-Mail-Adressen der Agentur-Mitglieder ein
4. Wählen Sie **Guest** als Role
5. Beschränken Sie Zugriff auf das Design System Project
6. Senden Sie Einladungen

#### Option B: Figma Community File (für öffentliche Libraries)

**Vorteil:**

- Kostenlos
- Jeder kann die Library nutzen
- Erhöht Reichweite und Markenbekanntheit

**Nachteil:**

- Öffentlich sichtbar
- Nur Read-only für Community-Nutzer
- Community-Nutzer müssen Library duplizieren

**Setup:**

1. Klicken Sie auf Dateiname > **Publish to Community**
2. Fügen Sie Beschreibung, Cover-Bild, Tags hinzu
3. Wählen Sie **Public** oder **Private** (Private nur mit Link zugänglich)
4. Klicken Sie auf **Publish**

**Agentur-Workflow:**

1. Agentur öffnet Community-Link
2. Klickt auf **Duplicate**
3. Aktiviert Library in Assets
4. Nutzt Komponenten (aber keine automatischen Updates)

#### Option C: .fig Datei Export (für einmalige Projekte)

**Vorteil:**

- Keine Kosten
- Keine Figma-Accounts für Agentur nötig
- Volle Kontrolle über die Datei

**Nachteil:**

- Keine automatischen Updates
- Agentur muss Library manuell aktivieren
- Datei kann verändert werden

**Setup:**

1. Klicken Sie auf Dateiname > **Export...**
2. Wählen Sie **.fig** als Format
3. Klicken Sie auf **Export**
4. Senden Sie die Datei per E-Mail oder Cloud-Link

**Agentur-Workflow:**

1. Agentur öffnet .fig Datei in Figma
2. Datei wird automatisch importiert
3. Aktiviert Library in Assets
4. Nutzt Komponenten

---

## 7. Wartung und Updates

### 7.1 Token-Updates

Wenn sich Design Tokens ändern:

1. Führen Sie `npm run build:figma` im Design System aus
2. Laden Sie die aktualisierte `tokens-for-figma.json` Datei
3. Öffnen Sie Tokens Studio in Figma
4. Klicken Sie auf **Import** und wählen Sie die neue Datei
5. Klicken Sie auf **Update Variables**
6. Figma aktualisiert alle Variables automatisch

**Wichtig:** Komponenten, die Variables referenzieren, werden automatisch aktualisiert!

### 7.2 Komponenten-Updates

Wenn Sie Komponenten ändern:

1. Nehmen Sie die Änderungen in der Library-Datei vor
2. Klicken Sie auf **Publish changes**
3. Fügen Sie eine Beschreibung hinzu:
   ```
   v1.1.0 - Button Updates

   - Padding für Small Buttons angepasst
   - Focus State für bessere Accessibility verbessert
   - Neue Icon-only Variante hinzugefügt
   ```
4. Klicken Sie auf **Publish**

**Alle Nutzer erhalten eine Benachrichtigung:**

- Figma zeigt "Library updates available" in der rechten Sidebar
- Nutzer können Updates selektiv anwenden oder alle auf einmal

### 7.3 Versionierung

Verwenden Sie Semantic Versioning für Library-Updates:

| Version | Typ | Beispiele |
|---------|-----|-----------|
| **1.0.0** | Initial Release | Erste Veröffentlichung |
| **1.0.1** | Patch | Bug-Fixes, kleinere Korrekturen |
| **1.1.0** | Minor | Neue Komponenten, nicht-breaking Changes |
| **2.0.0** | Major | Breaking Changes, größere Umstrukturierungen |

### 7.4 Changelog dokumentieren

Führen Sie einen Changelog auf der Cover-Seite:

```
# Changelog

## v1.1.0 (2026-02-15)
- Added: Skeleton Loading Component
- Improved: Button focus states for WCAG 2.2
- Fixed: Select dropdown alignment on mobile

## v1.0.0 (2026-01-29)
- Initial release
- 150+ Design Tokens
- 17 UI Components
```

---

## 8. Best Practices

### 8.1 Naming Conventions

Verwenden Sie konsistente Benennung:

- **Components:** `ComponentName/Variant/Size`
  - Beispiel: `Button/Primary/Medium`
- **Pages:** Klare, beschreibende Namen (Cover, Components, Patterns)
- **Frames:** Gruppenname für Organisation
  - Beispiel: "Buttons", "Form Inputs", "Cards"

### 8.2 Auto Layout verwenden

- Alle Komponenten sollten Auto Layout nutzen
- Macht Komponenten responsive und flexibel
- Erleichtert Anpassungen für Nutzer

### 8.3 Variables konsequent nutzen

- NIEMALS hardcoded Werte verwenden
- Immer auf Variables referenzieren
- Erleichtert Updates und Theme-Wechsel

### 8.4 Komponenten-Dokumentation

Fügen Sie Beschreibungen zu Komponenten hinzu:

1. Wählen Sie eine Component
2. Rechte Sidebar > **Description**
3. Fügen Sie Nutzungshinweise hinzu:
   ```
   Primary Button für wichtigste Aktionen (max. 1 pro Seite).
   Siehe Dokumentation: docs/02-components/button.md
   ```

### 8.5 Regelmäßige Reviews

- Überprüfen Sie Library alle 3-6 Monate
- Entfernen Sie veraltete Komponenten
- Ergänzen Sie fehlende Varianten basierend auf Feedback

---

## 9. Troubleshooting

### Problem: Token-Import funktioniert nicht

**Lösung:**

1. Überprüfen Sie, ob `tokens-for-figma.json` valides JSON ist
2. Stellen Sie sicher, dass Tokens Studio aktuell ist
3. Versuchen Sie, Figma neu zu starten
4. Prüfen Sie Browser-Console auf Fehler

### Problem: Variables werden nicht in Komponenten angewendet

**Lösung:**

1. Öffnen Sie Local Variables (rechte Sidebar)
2. Prüfen Sie, ob Collections existieren
3. Wählen Sie Component und prüfen Sie, ob Variables-Binding funktioniert
4. Falls nicht: Manuell Variable über Dropdown auswählen

### Problem: Library-Updates erreichen Nutzer nicht

**Lösung:**

1. Prüfen Sie, ob Library tatsächlich published ist
2. Nutzer müssen Library aktiviert haben (Assets > Library)
3. Nutzer müssen auf "Update" klicken, wenn Figma Benachrichtigung zeigt
4. Bei Guest Users: Prüfen Sie Zugriffsrechte

### Problem: Komponenten sehen anders aus als dokumentiert

**Lösung:**

1. Prüfen Sie, ob korrekte Variables verwendet werden
2. Vergleichen Sie Token-Werte mit Dokumentation
3. Überprüfen Sie Layer-Reihenfolge (z.B. Border über Background)
4. Stellen Sie sicher, dass keine lokalen Overrides existieren

---

## 10. Weiterführende Ressourcen

### Figma-Ressourcen

- [Figma Libraries Best Practices](https://help.figma.com/hc/en-us/articles/360041051154)
- [Creating and publishing libraries](https://help.figma.com/hc/en-us/articles/360025508373)
- [Tokens Studio Documentation](https://docs.tokens.studio/)

### Hydrophon Design System Dokumentation

- **README:** `design-system/README.md` - Übersicht und Einstieg
- **Marketing Guide:** `docs/00-quick-start/marketing-onboarding.md`
- **Designer Guide:** `docs/00-quick-start/for-designers.md`
- **Developer Guide:** `docs/00-quick-start/for-developers.md`
- **Component Docs:** `docs/02-components/`, `docs/03-forms/`, `docs/04-layout/`, `docs/05-feedback/`

### Support

Bei Fragen oder Problemen:

- **E-Mail:** design@hydrophon.de
- **Interner Slack:** #design-system Channel
- **Dokumentation:** Siehe `design-system/docs/`

---

**Version:** 1.0.0
**Letzte Aktualisierung:** 2026-01-29
**Autor:** Hydrophon Design Team
