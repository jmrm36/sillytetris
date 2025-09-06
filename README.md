# New Tetris (Web)
## Local dev
1. Install Node 18+.
2. `npm i`
3. `npm run dev` → open the printed local URL.

## Build
`npm run build` → outputs to `dist/`

## Deploy (GitHub Pages)
- This repo has a Pages workflow at `.github/workflows/deploy.yml`.
- In repo Settings → Pages, set **Source = GitHub Actions**.
- Set `base` in `vite.config.js` to `/REPO_NAME_HERE/` (already done).
- Push to `main` and Pages will auto-publish to `gh-pages`.

## Controls
← → move, ↑ rotate, ↓ soft drop, Space hard drop.
