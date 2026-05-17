# OilCycle

Find where to recycle your used cooking oil in Ireland. Free, no account, works offline.

## Why

Pouring cooking oil down the drain causes [fatbergs](https://en.wikipedia.org/wiki/Fatberg) and is illegal under the Irish Waste Management Act. But there's no consumer-friendly index of where to take household oil — [MyWaste.ie](https://mywaste.ie/) is web-only with no API, councils publish lists in PDFs, and commercial collectors (Frylite, Pure Oil) serve B2B.

OilCycle solves that for Ireland first, then UK + EU.

## Stack

- **Frontend**: Vite + React + TypeScript + Tailwind v4 + MapLibre GL + OpenStreetMap tiles
- **API**: Cloudflare Worker (Hono)
- **Data**: Cloudflare KV — entire dataset is one JSON blob (~300 KB at full Ireland coverage)
- **Hosting**: Vercel (frontend) + Cloudflare (worker)

No database. The whole MVP runs free under Cloudflare + Vercel free tiers.

## Local dev

```bash
# 1. Install
npm install
cd worker && npm install && cd ..

# 2. Run the worker (terminal 1)
npm run worker:dev   # → http://localhost:8787

# 3. Seed local KV with the starter dataset (one-off)
cd worker
wrangler kv:key put --binding OILCYCLE --local "points:v1" --path ../data/points.v1.json
cd ..

# 4. Run the frontend (terminal 2)
npm run dev          # → http://localhost:5173
```

Vite proxies `/api` to `localhost:8787`, so the frontend calls work without CORS hassle.

## First-time Cloudflare setup

```bash
cd worker
wrangler login
wrangler kv namespace create OILCYCLE
# Copy the id into worker/wrangler.toml
wrangler secret put ADMIN_PASSWORD          # type a long random string

# Seed production KV
WORKER_URL=https://oilcycle-worker.<you>.workers.dev \
  ADMIN_PASSWORD=<the password> \
  npm run data:upload

wrangler deploy
```

## API

| Method | Path | Auth | Purpose |
|---|---|---|---|
| `GET` | `/api/points` | public | Whole approved dataset (edge-cached 5 min) |
| `GET` | `/api/points/:id` | public | One point |
| `POST` | `/api/suggest` | public | Submit a new place (goes to pending queue) |
| `GET` | `/api/admin/pending` | admin | List pending submissions |
| `POST` | `/api/admin/pending/:id/approve` | admin | Approve + merge into dataset |
| `POST` | `/api/admin/pending/:id/reject` | admin | Reject |
| `POST` | `/api/admin/dataset` | admin | Replace whole dataset (used by seed script) |
| `GET` | `/api/health` | public | `{ status, points, last_updated }` |

Admin auth: `X-Admin-Password` header.

## Project layout

```
oilcycle/
├── src/                     # React app
│   ├── pages/               # home, results, detail, suggest, about
│   ├── components/          # map, point-card, filter-chips
│   ├── lib/                 # api, distance (haversine), geocode, types, utils
│   ├── styles/index.css     # Tailwind v4 theme tokens
│   ├── App.tsx
│   └── main.tsx
├── worker/                  # Cloudflare Worker
│   ├── src/index.ts         # Hono router
│   ├── src/types.ts         # shared with frontend
│   └── wrangler.toml
├── data/
│   └── points.v1.json       # seed dataset
├── scripts/
│   └── upload_dataset.ts    # writes JSON → KV via admin API
├── index.html
├── vite.config.ts
└── package.json
```

## Data sources & attribution

- [MyWaste.ie](https://mywaste.ie/) — civic amenity centre index (scraped politely; we link back).
- [OpenStreetMap](https://www.openstreetmap.org/copyright) — `amenity=recycling` + `recycling:cooking_oil=yes`.
- Local council pages (Dublin City, Fingal, DLR, South Dublin, etc.).
- Commercial collectors verified directly.
- User submissions via `/suggest`, reviewed before going live.

## Roadmap

- **v0.1** Ireland locator (this)
- **v0.2** UK coverage (350+ councils via Recycle Now data)
- **v0.3** B2C paid pickup booking (needs collector partner)
- **v0.4** Photo recognition ("snap your bottle, get instructions") — inspired by [ecosnap](https://github.com/alyssaxuu/ecosnap)
