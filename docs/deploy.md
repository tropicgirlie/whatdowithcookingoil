# Deploying OilCycle

v0.1 ships as a pure static site on Vercel. No backend, no Worker, no database.
The locator reads from the bundled `data/points.v1.json`. The "Suggest a drop-off"
form opens the user's email client with the details pre-filled. Easiest possible
setup, zero ongoing cost.

## First deploy (one-time, ~5 minutes)

1. Push this repo to GitHub if it isn't already there:
   ```bash
   git push origin main
   ```
2. Go to <https://vercel.com/new> and import the GitHub repo.
3. Vercel auto-detects Vite from `vercel.json`. Leave the defaults:
   - Framework: Vite
   - Build command: `npm run build`
   - Output directory: `dist`
4. Click **Deploy**. First build takes about a minute.
5. Live at `https://<project-name>.vercel.app` (e.g. `https://whatdowithcookingoil.vercel.app`).

## Day-to-day

| Change | How to ship |
|---|---|
| Frontend code | Push to `main`. Vercel auto-builds and deploys. |
| Data (add or edit points) | Edit `data/points.v1.json`, push, Vercel rebuilds. |
| Bulk pull from OpenStreetMap | `npm run data:seed:osm -- --write` then commit and push. |

## Adding a custom domain later

When you buy a domain (e.g. `oilcycle.ie`):
1. In Vercel project settings → Domains → Add.
2. Vercel walks you through the DNS records to set at your registrar.
3. SSL is automatic.

## Adding a backend later (when submissions become a problem)

The current `/suggest` flow is mailto-only. When that gets noisy, two cheap paths:

- **Vercel Function** at `api/suggest.ts` writing to GitHub Issues (zero cost,
  becomes a free public database with built-in moderation).
- **Cloudflare Worker** (the `worker/` folder in this repo is already scaffolded;
  re-add the `/api/*` rewrite to `vercel.json` and follow `worker/README.md`).

Neither is needed for v0.1.
