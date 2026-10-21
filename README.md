# 🧙‍♂️ Sorting Hat Game

A polished, modern Hogwarts-style sorting quiz built as a static web app for GitHub Pages. The project keeps the original Flask game mechanics, ports them to TypeScript, and delivers a premium single-page experience with responsive styling, accessible controls, a results screen, and GitHub Pages deployment support.

## Highlights

- Original 3-question house-sorting logic preserved from the Flask version
- Client-side TypeScript game engine with deterministic score handling
- Vite + React + Tailwind frontend
- Results sharing using the Web Share API with clipboard fallback
- Local result persistence using browser storage
- GitHub Actions deployment to GitHub Pages
- No backend or Python runtime required in production

## Tech stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Vitest

## Local development

From PowerShell:

```powershell
cd "D:\G DAS\sorting_hat_game"
npm install
npm run dev
```

Then open the local Vite URL shown in the terminal, typically:

```text
http://localhost:5173/
```

## Production build

```powershell
npm run build
```

The built static files are generated in the `dist/` folder.

## Testing

```powershell
npm test
```

This runs the sorting-logic tests, including normal outcomes, ties, and invalid input handling.

## Vercel deployment

The app is configured for Vercel as a Vite static site. In the Vercel project settings, use:

- **Framework preset:** Vite
- **Build command:** `npm run build`
- **Output directory:** `dist`
- **Install command:** `npm install` (or leave the default)

These build and output settings are also recorded in `vercel.json`. Vite uses `/` as its asset base, which is correct for Vercel's domain root. Push changes to the connected branch to trigger a deployment, or use **Redeploy** in the Vercel dashboard.

## Notes

- The original Python/Flask implementation is preserved in the repository history and remains accessible as legacy material.
- The deployed version is a static app and does not require Flask or Python to run in the browser.

## Legacy project note

The original Flask version used a simple scoring system:

- Q1: Dawn vs Dusk
- Q2: The Good / The Great / The Wise / The Bold
- Q3: Violin / Trumpet / Piano / Drum

Those rules were ported into a TypeScript score engine and validated by tests to maintain the same outcome logic.

## Acknowledgements

Inspired by the magical world of Hogwarts and the iconic Sorting Hat tradition.
