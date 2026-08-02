# Memory

Zweispieler-Memory-Spiel mit TypeScript, Themes und animierten Karten.

## Spiel starten (Doppelklick)

```bash
npm install
npm run build
```

Danach **`index.html`** doppelklicken. JS und CSS liegen getrennt in `assets/`.

## Entwicklung

```bash
npm run dev
```

Öffnet `http://localhost:5173/app.html`.

## Projektstruktur

```
app.html           # Vite-Einstieg (Entwicklung)
index.html         # Startbar nach Build (Doppelklick)
assets/            # Gebündeltes JS/CSS nach Build
src/
  app/             # App-Controller / Navigation
  components/      # UI-Bausteine
  data/            # Themes & Motive
  game/            # Spiel-Logik
  styles/          # CSS nach Bereichen
  types/           # TypeScript-Typen
  utils/           # Hilfsfunktionen
  views/           # Bildschirme
```
