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
Use the on-screen buttons to move left/right, rotate, soft drop, or hard drop. No keyboard is required.

## Auto-merge (Option A)
PRs targeting `main` auto-merge after checks pass when:
- They have the `automerge` label, or
- They are opened by `github-actions[bot]`/`codex[bot]`.

Requires:
- Repo setting **Auto-merge** enabled in Settings.
- Branch protection on `main` must **not** require reviews.

How to use it now
• On the PR you want merged automatically, add the label automerge (or make sure it’s opened by the bot).
• That’s it—once CI passes, GitHub will merge it into main for you. If it doesn’t, the workflow comment will point to the likely setting that needs a quick toggle.

