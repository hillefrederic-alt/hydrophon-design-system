# Hydrophon Farbpaletten v1.0.0

Fertig konfigurierte Farbpaletten für Design-Tools.

## Inhalt

- **`hydrophon-colors.ase`** - Adobe Swatch Exchange (Illustrator, Photoshop, InDesign)
- **`hydrophon-colors.gpl`** - GIMP Palette

## Adobe-Import (ASE)

### Illustrator

1. Öffnen Sie **Fenster** → **Farbfelder**
2. Klicken Sie auf das Menü-Symbol (☰) im Farbfelder-Bedienfeld
3. Wählen Sie **Farbfeldbibliothek öffnen** → **Andere Bibliothek...**
4. Navigieren Sie zu `hydrophon-colors.ase` und öffnen Sie die Datei
5. Die Palette erscheint als neues Bedienfeld

### Photoshop

1. Öffnen Sie **Fenster** → **Farbfelder**
2. Klicken Sie auf das Menü-Symbol (☰) im Farbfelder-Bedienfeld
3. Wählen Sie **Farbfelder importieren...**
4. Navigieren Sie zu `hydrophon-colors.ase` und öffnen Sie die Datei
5. Die Farben werden dem aktuellen Farbfelder-Set hinzugefügt

### InDesign

1. Öffnen Sie **Fenster** → **Farbe** → **Farbfelder**
2. Klicken Sie auf das Menü-Symbol (☰) im Farbfelder-Bedienfeld
3. Wählen Sie **Farbfelder laden...**
4. Navigieren Sie zu `hydrophon-colors.ase` und öffnen Sie die Datei
5. Die Farben werden dem aktuellen Dokument hinzugefügt

## GIMP-Import (GPL)

### Linux / macOS

1. Kopieren Sie `hydrophon-colors.gpl` nach `~/.config/GIMP/2.10/palettes/`
   ```bash
   cp hydrophon-colors.gpl ~/.config/GIMP/2.10/palettes/
   ```
2. Starten Sie GIMP neu
3. Die Palette erscheint automatisch im Paletten-Dialog

### Windows

1. Kopieren Sie `hydrophon-colors.gpl` nach `%APPDATA%\GIMP\2.10\palettes\`
2. Starten Sie GIMP neu
3. Die Palette erscheint automatisch im Paletten-Dialog

### Alternative: Import über GIMP-Interface

1. Öffnen Sie **Fenster** → **Andockbare Dialoge** → **Paletten**
2. Klicken Sie auf das Menü-Symbol (☰) im Paletten-Dialog
3. Wählen Sie **Palette importieren**
4. Wählen Sie **Datei** als Quelle
5. Navigieren Sie zu `hydrophon-colors.gpl` und importieren Sie die Datei

## Enthaltene Farben

| Farbgruppe          | Anzahl | Beschreibung                         |
|---------------------|--------|--------------------------------------|
| Hydrophon Blau      | 10     | Primärfarbe (50-900 Skala)           |
| Hydrophon Grau      | 10     | Sekundärfarbe (50-900 Skala)         |
| Gluy                | 3      | Produktlinie Gluy (Gelb, Hell-, Dunkelblau) |
| hyHero              | 2      | Produktlinie hyHero (Orange, Dunkelgrau) |
| hyIndustry          | 1      | Produktlinie hyIndustry (Dunkelblau) |
| Neutral             | 12     | Graustufen (50-900, Weiß, Schwarz)   |
| Semantisch          | 4      | Success, Warning, Error, Info        |
| **Gesamt**          | **42** | Alle Markenfarben                    |

## Hinweis zur Farbkonvertierung

Alle Farben sind im **RGB/sRGB-Farbraum** für digitale Verwendung optimiert.

Für Druckproduktion (CMYK):
- Verwenden Sie eine professionelle CMYK-Konvertierung in Ihrer Design-Software
- Beachten Sie, dass CMYK-Konvertierungen je nach Druckprofil variieren können
- Bei kritischen Projekten empfehlen wir eine Abstimmung mit der Druckerei

## Aktualisierung

Diese Palette wird automatisch aus den Design-Tokens generiert:
```bash
npm run build:palettes
```

---

**Version:** 1.0.0
**Stand:** Januar 2026
**Quelle:** `design-system/tokens/colors.json`
