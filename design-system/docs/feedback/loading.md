# Ladezustände

Ladeindikatoren halten Nutzer während asynchroner Operationen bei Laune und vermitteln, dass das System arbeitet.

## Übersicht

Ladezustände sind ein kritischer Teil der User Experience. Sie zeigen Nutzern, dass ihre Aktion erfolgreich registriert wurde und das System arbeitet. Ohne Feedback entsteht schnell der Eindruck, die Anwendung sei abgestürzt oder die Aktion nicht erfolgreich gewesen.

**Zweck:**

- Nutzer wissen, dass das System ihre Aktion verarbeitet
- Vermittelt gefühlte Geschwindigkeit durch sofortiges visuelles Feedback
- Verhindert Doppel-Klicks und wiederholte Aktionen
- Bietet Kontext über Fortschritt bei längeren Operationen

**Drei Arten von Ladeindikatoren:**

1. **Spinner** – Unbestimmte kurze Aktionen (<3 Sekunden)
2. **Progress Bar** – Längere Aktionen mit bekannter Dauer (Uploads, Downloads)
3. **Skeleton Screens** – Content-Laden (Cards, Tabellen, Listen)

## Wann welchen Indikator verwenden

Die Wahl des richtigen Ladeindikators hängt von Kontext und erwarteter Dauer ab:

| Kontext | Erwartete Dauer | Indikator | Beispiel |
|---------|-----------------|-----------|----------|
| Button-Aktion | < 1 Sekunde | Spinner (delayed) | Formular absenden, Element löschen |
| API-Call | 1-3 Sekunden | Spinner (immediate) | Daten nachladen, Suche |
| Upload/Download | > 3 Sekunden, bekannte Größe | Progress Bar (determinate) | Datei-Upload, Export |
| Verarbeitung | > 3 Sekunden, unbekannte Dauer | Progress Bar (indeterminate) | Bildverarbeitung, PDF-Generierung |
| Content-Laden | Beliebig | Skeleton Screen | Produktkarten, Tabellen, Listen |

**Faustregel:**

- **Spinner:** "Ich arbeite daran"
- **Progress Bar:** "Ich bin zu X% fertig" oder "Ich arbeite, weiß aber nicht wie lange"
- **Skeleton Screen:** "So wird der Content aussehen, gleich ist er da"

## Spinner

Kreisförmiger Ladeindikator für kurze, unbestimmte Wartezeiten.

### Größen

Spinner-Größen sind mit dem Icon-System aus Phase 2 abgestimmt:

| Token | Größe | Verwendung |
|-------|-------|------------|
| `spinner.size.sm` | 16px | Kleine Buttons, Inline-Icons |
| `spinner.size.md` | 24px | Standard-Buttons, Standard-Kontext |
| `spinner.size.lg` | 32px | Große Buttons, Seitenbereiche |
| `spinner.size.xl` | 48px | Vollbild-Lader, zentrale Seiten-Ladeindikator |

### Farben

| Token | Verwendung |
|-------|------------|
| `spinner.color.primary` | Hydrophon Blau – Standard auf weißem/hellem Hintergrund |
| `spinner.color.light` | Neutral 400 – Sekundärer Spinner, weniger Aufmerksamkeit |
| `spinner.color.on-primary` | Weiß – Spinner auf primärem Button (blauer Hintergrund) |

**Track Color:** `spinner.track-color` (neutral.200) – Hintergrundkreis für Kontrast

### Verzögertes Erscheinen

**Problem:** Spinner, die sofort erscheinen und bei schnellen Operationen (<200ms) sofort wieder verschwinden, erzeugen störende Flashes.

**Lösung:** `spinner.delay` (200ms) – Spinner erscheint erst nach 200-300ms Wartezeit.

**Implementierung:**

```jsx
function DelayedSpinner({ delay = 200, size = 'md' }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  if (!show) return null;

  return (
    <svg
      className={`spinner spinner-${size}`}
      width={`var(--spinner-size-${size})`}
      height={`var(--spinner-size-${size})`}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="var(--spinner-track-color)"
        strokeWidth="var(--spinner-stroke-width)"
        fill="none"
      />
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="var(--spinner-color-primary)"
        strokeWidth="var(--spinner-stroke-width)"
        fill="none"
        strokeDasharray="31.4 31.4"
        strokeDashoffset="0"
        strokeLinecap="round"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 12 12"
          to="360 12 12"
          dur="var(--spinner-animation-duration)"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
}
```

### CSS-Animation

Alternative: Reine CSS-Lösung mit `@keyframes`:

```css
.spinner {
  animation: spin var(--spinner-animation-duration) var(--spinner-animation-timing) infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
```

### Barrierefreiheit

**ARIA-Attribute:**

```jsx
<div role="status" aria-live="polite" aria-label="Wird geladen">
  <Spinner />
</div>
```

- `role="status"` – Screenreader erkennt Statusänderung
- `aria-live="polite"` – Ankündigung nach aktueller Ausgabe
- `aria-label="Wird geladen"` – Beschreibender Text für Screenreader

**Tastaturnutzer:** Spinner selbst ist nicht fokussierbar. Bei Button-Spinner sollte der Button disabled sein während Laden.

## Progress Bar

Balken-Indikator für längere Aktionen mit oder ohne bekannten Fortschritt.

### Determinate vs. Indeterminate

**Determinate:** Fortschritt ist bekannt (0-100%)

- Datei-Upload (Bytes hochgeladen / Gesamtgröße)
- Download
- Mehrstufige Formulare (Schritt X von Y)

**Indeterminate:** Fortschritt ist unbekannt

- Server-Verarbeitung unbekannter Dauer
- Komplexe Berechnungen
- Warteschlange ohne Zeit-Schätzung

### Native HTML Progress Element

**Empfehlung:** Verwende das native `<progress>` Element – Accessibility out-of-the-box.

**Determinate:**

```html
<div class="progress-container">
  <label for="upload-progress">Datei wird hochgeladen</label>
  <progress
    id="upload-progress"
    value="45"
    max="100"
    aria-valuenow="45"
    aria-valuemin="0"
    aria-valuemax="100"
  >
    45%
  </progress>
  <span class="progress-label">45%</span>
</div>
```

**Indeterminate:**

```html
<progress aria-label="Wird verarbeitet">Wird verarbeitet...</progress>
```

**Kein `value` Attribut** = Browser rendert indeterminate animation.

### Styling

```css
.progress-container {
  display: flex;
  flex-direction: column;
  gap: var(--progress-label-gap);
}

progress {
  width: 100%;
  height: var(--progress-height);
  border-radius: var(--progress-border-radius);
  overflow: hidden;
  appearance: none;
  border: none;
}

/* Track (Hintergrund) */
progress::-webkit-progress-bar {
  background: var(--progress-track-background);
  border-radius: var(--progress-border-radius);
}

progress::-moz-progress-bar {
  background: var(--progress-track-background);
}

/* Bar (Fortschritt) */
progress::-webkit-progress-value {
  background: var(--progress-bar-background);
  border-radius: var(--progress-border-radius);
  transition: width 0.3s ease;
}

progress::-moz-progress-bar {
  background: var(--progress-bar-background);
  border-radius: var(--progress-border-radius);
}

/* Indeterminate Animation */
progress:indeterminate::-webkit-progress-bar {
  background: linear-gradient(
    90deg,
    var(--progress-track-background) 0%,
    var(--progress-bar-background) 50%,
    var(--progress-track-background) 100%
  );
  background-size: 200% 100%;
  animation: indeterminate var(--progress-indeterminate-animation-duration) linear infinite;
}

@keyframes indeterminate {
  from {
    background-position: 200% 0;
  }
  to {
    background-position: -200% 0;
  }
}

.progress-label {
  font-size: var(--progress-label-font-size);
  color: var(--progress-label-color);
  text-align: right;
}
```

### Erfolgsstatus

Bei Abschluss auf 100% kann die Bar-Farbe auf Erfolgsgrün wechseln:

```jsx
function ProgressBar({ value, max = 100, label }) {
  const percentage = Math.round((value / max) * 100);
  const isComplete = percentage >= 100;

  return (
    <div className="progress-container">
      {label && <label>{label}</label>}
      <progress
        value={value}
        max={max}
        className={isComplete ? 'progress-success' : ''}
        aria-valuenow={value}
        aria-valuemin="0"
        aria-valuemax={max}
      >
        {percentage}%
      </progress>
      <span className="progress-label">{percentage}%</span>
    </div>
  );
}
```

```css
progress.progress-success::-webkit-progress-value {
  background: var(--progress-bar-success);
}

progress.progress-success::-moz-progress-bar {
  background: var(--progress-bar-success);
}
```

### Barrierefreiheit

**ARIA-Attribute für Determinate Progress:**

- `aria-valuenow` – Aktueller Wert
- `aria-valuemin` – Minimum (0)
- `aria-valuemax` – Maximum (100)
- `aria-label` oder `<label>` – Beschreibung der Operation

**Screenreader-Ansage:**

Bei Fortschrittsänderungen **nicht** bei jedem Prozentpunkt ankündigen (zu verbose). Entweder:

- Nur bei 25%, 50%, 75%, 100%
- Oder mit `aria-live="polite"` und debounced Updates

## Skeleton Screens

Content-Platzhalter, die das finale Layout vorwegnehmen.

### Was sind Skeleton Screens?

Skeleton Screens sind Platzhalter, die die Struktur des kommenden Contents nachbilden – graue Boxen in Form von Text, Bildern, Buttons. Sie vermitteln:

1. **Was kommt:** Nutzer sehen die Struktur, bevor Content da ist
2. **Kein Stillstand:** Seite fühlt sich schneller an (Progressive Loading)
3. **Kein Layout Shift:** Platzhalter matcht finale Größe exakt

**Wann verwenden:**

- Produktkarten-Grids
- Tabellen
- Listen (News, Blog-Posts)
- Detailseiten

**Wann NICHT verwenden:**

- Sehr schnelles Laden (<300ms) – Skeleton würde flashen
- Unvorhersehbare Content-Struktur
- Einfache Texte/Überschriften – einfacher Spinner reicht

### react-loading-skeleton Empfehlung

**Library:** [`react-loading-skeleton`](https://www.npmjs.com/package/react-loading-skeleton)

**Warum:**

- Auto-sizing auf Content-Größe (kein manuelles Hardcoding)
- Eingebauter Shimmer-Effekt
- Einfachste API: `<Skeleton />` – fertig
- Themable für Design-System-Integration

**Installation:**

```bash
npm install react-loading-skeleton
```

**Setup mit Design-System:**

```jsx
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function App() {
  return (
    <SkeletonTheme
      baseColor="var(--skeleton-base-color)"
      highlightColor="var(--skeleton-highlight-color)"
    >
      {/* App content */}
    </SkeletonTheme>
  );
}
```

### Skeleton-Patterns

**Produktkarte Skeleton:**

```jsx
function ProductCardSkeleton() {
  return (
    <article className="card">
      {/* Image (1:1 Aspect Ratio) */}
      <Skeleton height={280} />

      <div className="card-content">
        {/* Produktname */}
        <Skeleton height={24} width="80%" style={{ marginTop: 16 }} />

        {/* Specs (3 Zeilen) */}
        <Skeleton count={3} height={16} style={{ marginTop: 8 }} />

        {/* CTA Button */}
        <Skeleton height={40} width={120} style={{ marginTop: 16 }} />
      </div>
    </article>
  );
}

function ProductGrid({ loading, products }) {
  if (loading) {
    return (
      <div className="product-grid">
        {Array(6)
          .fill(0)
          .map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

**Tabelle Skeleton:**

```jsx
function TableSkeleton({ rows = 5, columns = 4 }) {
  return (
    <table className="table">
      <thead>
        <tr>
          {Array(columns)
            .fill(0)
            .map((_, i) => (
              <th key={i}>
                <Skeleton width="80%" />
              </th>
            ))}
        </tr>
      </thead>
      <tbody>
        {Array(rows)
          .fill(0)
          .map((_, rowIndex) => (
            <tr key={rowIndex}>
              {Array(columns)
                .fill(0)
                .map((_, colIndex) => (
                  <td key={colIndex}>
                    <Skeleton />
                  </td>
                ))}
            </tr>
          ))}
      </tbody>
    </table>
  );
}
```

### Shimmer-Animation

**GPU-beschleunigt:** Animate `transform: translateX()` statt `background-position` für 60fps.

```css
@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.skeleton {
  position: relative;
  overflow: hidden;
  background: var(--skeleton-base-color);
  border-radius: var(--skeleton-border-radius);
}

.skeleton::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent 0%,
    var(--skeleton-highlight-color) 50%,
    transparent 100%
  );
  animation: shimmer var(--skeleton-animation-duration) var(--skeleton-animation-timing) infinite;
}
```

### Layout-Match

**Wichtig:** Skeleton muss EXAKT das finale Layout matchen, sonst entsteht Layout Shift.

**Checkliste:**

- [ ] Gleiche Grid-Spalten/Struktur
- [ ] Gleiche Padding/Margins
- [ ] Gleiche Border-Radius
- [ ] Gleiche Höhen (oder aspect-ratio)
- [ ] Gleiche Schriftgröße (bei Text-Skeleton)

**Beispiel:** Produktkarte hat `aspect-ratio: 1/1` für Bild → Skeleton Image braucht gleiche Höhe:

```jsx
<Skeleton height={280} /> {/* Entspricht 280px card-image */}
```

## Optimistic UI

Zeige Erfolg sofort, rollback bei Fehler.

### Was ist Optimistic UI?

Statt auf Server-Response zu warten, zeigt die UI **sofort** den Erfolg an – "optimistisch" annehmend, dass die Aktion erfolgreich sein wird.

**Beispiel:**

1. User klickt "Like"
2. UI zeigt sofort "Liked" (Herz gefüllt, Counter +1)
3. API-Call im Hintergrund
4. **Erfolg:** Alles gut, kein Change nötig
5. **Fehler:** Rollback zu "Not Liked" + Error Toast

**Gefühlte Geschwindigkeit:** Instant Response vs. 200-500ms Wartezeit.

### Wann verwenden

**Gut geeignet:**

- Like/Unlike (Social Features)
- Favorit hinzufügen/entfernen
- Artikel in Warenkorb legen
- Einfache Toggle-Aktionen
- Drafts auto-speichern

**NICHT geeignet:**

- Destruktive Aktionen (Löschen, Konto schließen)
- Finanztransaktionen (Zahlung, Überweisung)
- Kritische Operationen (Veröffentlichung, Freigabe)
- Aktionen mit komplexen Seiteneffekten

**Faustregel:** Nur für Aktionen, die:

1. Sehr wahrscheinlich erfolgreich sind (>95%)
2. Einfach rückgängig zu machen sind
3. Keine kritischen Konsequenzen haben

### React useOptimistic Hook

React 19+ bietet `useOptimistic` Hook für optimistische Updates:

```jsx
import { useOptimistic } from 'react';
import { toast } from 'sonner';

function LikeButton({ postId, initialLikes, initialLiked }) {
  const [optimisticState, setOptimisticState] = useOptimistic(
    { likes: initialLikes, liked: initialLiked },
    (current, newLiked) => ({
      likes: current.likes + (newLiked ? 1 : -1),
      liked: newLiked,
    })
  );

  async function handleLike() {
    const newLiked = !optimisticState.liked;

    // Sofortiges UI-Update (optimistisch)
    setOptimisticState(newLiked);

    try {
      // API-Call im Hintergrund
      await updateLike(postId, newLiked);
      // Erfolg: State ist bereits richtig
    } catch (error) {
      // Fehler: useOptimistic rollt automatisch zurück
      toast.error('Like konnte nicht gespeichert werden', {
        action: {
          label: 'Erneut versuchen',
          onClick: () => handleLike(),
        },
      });
    }
  }

  return (
    <button onClick={handleLike} className={optimisticState.liked ? 'liked' : ''}>
      ❤️ {optimisticState.likes}
    </button>
  );
}
```

**Vorteile useOptimistic:**

- Automatischer Rollback bei Fehler
- Keine manuellen State-Flags (isOptimistic, isPending)
- Race-Condition-sicher
- Server State bleibt Source of Truth

### Rollback mit Toast

Bei Fehler: **Rollback + Error Toast mit Retry**

```jsx
catch (error) {
  // useOptimistic rollt zurück
  toast.error('Aktion fehlgeschlagen', {
    duration: 5000,
    action: {
      label: 'Erneut versuchen',
      onClick: () => handleLike(),
    },
  });
}
```

**Nutzer-Kommunikation:**

- Toast erscheint top-right (nicht blockierend)
- Fehlertext erklärt, was schiefging
- Retry-Button bietet einfache Wiederholung
- 5s duration (länger als Success, kürzer als manual-only)

## Fehlerbehandlung

Wenn Laden fehlschlägt: Error Toast + Retry.

### Error State Pattern

**Komponente hat drei States:**

1. **Loading:** Spinner/Skeleton wird angezeigt
2. **Success:** Content wird angezeigt
3. **Error:** Error-Message + Retry-Button

**Implementierung:**

```jsx
function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function loadProducts() {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (err) {
      setError(err.message);
      toast.error('Produkte konnten nicht geladen werden', {
        duration: Infinity,
        action: {
          label: 'Erneut versuchen',
          onClick: () => loadProducts(),
        },
      });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  if (loading) {
    return (
      <div className="product-grid">
        {Array(6)
          .fill(0)
          .map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-state">
        <p>Fehler beim Laden der Produkte</p>
        <button onClick={loadProducts}>Erneut versuchen</button>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

### Non-Blocking Errors

**Toast statt Inline:** Bei Hintergrund-Operationen (Auto-Save, Analytics) error toasten, aber UI nicht blockieren.

```jsx
async function autoSave(draft) {
  try {
    await saveDraft(draft);
    // Kein Toast bei Erfolg (nicht stören)
  } catch (error) {
    toast.error('Entwurf konnte nicht gespeichert werden', {
      duration: 5000,
      action: {
        label: 'Erneut',
        onClick: () => autoSave(draft),
      },
    });
  }
}
```

## Barrierefreiheit

Loading States müssen für alle Nutzer zugänglich sein.

### prefers-reduced-motion

**Wichtig:** Nutzer mit Bewegungsüberempfindlichkeit (Vestibular Disorders) sollten animationsfreie Versionen erhalten.

```css
@media (prefers-reduced-motion: reduce) {
  .spinner {
    animation: none;
    opacity: 0.5; /* Statischer Spinner, halbtransparent */
  }

  @keyframes shimmer {
    /* Keine Animation */
  }

  progress:indeterminate::-webkit-progress-bar {
    animation: none;
    background: linear-gradient(90deg, var(--progress-track-background) 0%, var(--progress-bar-background) 100%);
  }
}
```

### aria-busy

Container mit loadendem Content sollte `aria-busy="true"` haben:

```jsx
<div aria-busy={loading}>
  {loading ? <Skeleton /> : <Content />}
</div>
```

**Screenreader:** Erkennt, dass dieser Bereich aktuell lädt.

### Live-Region Ankündigungen

Bei wichtigen Lade-Abschlüssen: Screenreader-Announcement via `aria-live`:

```jsx
function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  return (
    <>
      {/* Live-Region für Ankündigung */}
      <div role="status" aria-live="polite" className="sr-only">
        {loading ? 'Produkte werden geladen...' : `${products.length} Produkte geladen`}
      </div>

      <div aria-busy={loading}>
        {loading ? <ProductGridSkeleton /> : <ProductGrid products={products} />}
      </div>
    </>
  );
}
```

**CSS für .sr-only (Screen Reader Only):**

```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

## Code-Beispiele

### DelayedSpinner Component

Vollständige Spinner-Komponente mit Delay:

```tsx
interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'light' | 'on-primary';
  delay?: number;
  label?: string;
}

export function Spinner({ size = 'md', color = 'primary', delay = 200, label = 'Wird geladen' }: SpinnerProps) {
  const [show, setShow] = useState(delay === 0);

  useEffect(() => {
    if (delay === 0) return;

    const timer = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  if (!show) return null;

  return (
    <div role="status" aria-live="polite" aria-label={label}>
      <svg
        className={`spinner spinner-${size} spinner-${color}`}
        width={`var(--spinner-size-${size})`}
        height={`var(--spinner-size-${size})`}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="12" r="10" stroke="var(--spinner-track-color)" strokeWidth="var(--spinner-stroke-width)" fill="none" />
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke={`var(--spinner-color-${color})`}
          strokeWidth="var(--spinner-stroke-width)"
          fill="none"
          strokeDasharray="31.4 31.4"
          strokeLinecap="round"
          className="spinner-circle"
        />
      </svg>
    </div>
  );
}
```

**CSS:**

```css
.spinner-circle {
  animation: spin var(--spinner-animation-duration) var(--spinner-animation-timing) infinite;
  transform-origin: center;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .spinner-circle {
    animation: none;
    opacity: 0.5;
  }
}
```

### ProgressBar Component

```tsx
interface ProgressBarProps {
  value?: number; // undefined = indeterminate
  max?: number;
  label?: string;
  showPercentage?: boolean;
}

export function ProgressBar({ value, max = 100, label, showPercentage = true }: ProgressBarProps) {
  const isDeterminate = value !== undefined;
  const percentage = isDeterminate ? Math.round((value / max) * 100) : undefined;
  const isComplete = percentage === 100;

  return (
    <div className="progress-container">
      {label && (
        <label className="progress-label-text">
          {label}
          {showPercentage && isDeterminate && ` (${percentage}%)`}
        </label>
      )}
      <progress
        className={isComplete ? 'progress-success' : ''}
        value={isDeterminate ? value : undefined}
        max={isDeterminate ? max : undefined}
        aria-valuenow={isDeterminate ? value : undefined}
        aria-valuemin={isDeterminate ? 0 : undefined}
        aria-valuemax={isDeterminate ? max : undefined}
        aria-label={label || 'Lädt...'}
      >
        {isDeterminate ? `${percentage}%` : 'Lädt...'}
      </progress>
    </div>
  );
}
```

### Optimistic Update Pattern

```tsx
function useLike(postId: string, initialLikes: number, initialLiked: boolean) {
  const [optimisticState, setOptimistic] = useOptimistic(
    { likes: initialLikes, liked: initialLiked },
    (current, action: 'like' | 'unlike') => ({
      likes: current.likes + (action === 'like' ? 1 : -1),
      liked: action === 'like',
    })
  );

  const [isPending, startTransition] = useTransition();

  async function toggleLike() {
    const action = optimisticState.liked ? 'unlike' : 'like';

    startTransition(async () => {
      setOptimistic(action);

      try {
        await updateLike(postId, action === 'like');
      } catch (error) {
        toast.error('Like konnte nicht gespeichert werden', {
          action: {
            label: 'Erneut',
            onClick: () => toggleLike(),
          },
        });
      }
    });
  }

  return { ...optimisticState, toggleLike, isPending };
}

// Verwendung
function Post({ postId, initialLikes, initialLiked }) {
  const { likes, liked, toggleLike, isPending } = useLike(postId, initialLikes, initialLiked);

  return (
    <button onClick={toggleLike} disabled={isPending} className={liked ? 'liked' : ''}>
      ❤️ {likes}
    </button>
  );
}
```

## Anti-Patterns

Häufige Fehler bei Ladezuständen:

### 1. Spinner-Flash für schnelle Operationen

**Problem:** Spinner erscheint und verschwindet sofort (<200ms), erzeugt visuelles Flackern.

**Lösung:** `spinner.delay` (200ms) verwenden – Spinner erscheint erst nach Verzögerung.

### 2. Hardcoded Skeleton-Dimensionen

**Problem:** Skeleton hat feste Größen, finale Content-Größe weicht ab → Layout Shift.

**Lösung:** Verwende `react-loading-skeleton` (auto-sizing) oder matche Skeleton exakt auf finale Größe.

### 3. Optimistic UI für destruktive Aktionen

**Problem:** "Löschen" optimistisch zeigen – bei Fehler ist Item schon aus Liste verschwunden, Rollback verwirrend.

**Lösung:** Destruktive Aktionen NIEMALS optimistisch. Immer warten auf Server-Bestätigung.

### 4. Keine prefers-reduced-motion Unterstützung

**Problem:** Spinner und Shimmer-Animationen lösen bei manchen Nutzern Übelkeit aus.

**Lösung:** `@media (prefers-reduced-motion: reduce)` – Animationen deaktivieren oder stark reduzieren.

### 5. Indeterminate Progress für bekannte Dauer

**Problem:** Upload mit bekannter Dateigröße zeigt indeterminate Bar – Nutzer hat keine Info über Fortschritt.

**Lösung:** Determinate Progress mit Percentage verwenden, wenn Fortschritt berechenbar ist.

### 6. Zu viele gleichzeitige Spinner

**Problem:** Jeder kleine Bereich hat eigenen Spinner – UI wirkt chaotisch.

**Lösung:** Einen zentralen Spinner für Seiten-Load, lokale Spinner nur für isolierte Aktionen.

### 7. Fehlende Error Recovery

**Problem:** Laden schlägt fehl, Spinner verschwindet, Nutzer sieht leere Seite ohne Info.

**Lösung:** Error State mit klarer Message + Retry-Button anzeigen.

---

**Phase:** 05 - Feedback & System Responses
**Zuletzt aktualisiert:** 2026-01-29
**Version:** 1.0
