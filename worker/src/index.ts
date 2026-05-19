import { Hono } from 'hono'
import { cors } from 'hono/cors'
import type { Bindings, Point, PendingSubmission } from './types'

const app = new Hono<{ Bindings: Bindings }>()

app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'X-Admin-Password'],
}))

// ── Admin gate ───────────────────────────────────────────────────────────────
// Simple shared-secret gate for v0.1. Move to Cloudflare Access JWT before
// exposing the admin UI to anyone other than Luana.
async function adminGate(c: any, next: any) {
  const env = c.env as Bindings
  if (!env.ADMIN_PASSWORD) return c.json({ error: 'Admin not configured' }, 503)
  const provided = c.req.header('X-Admin-Password') || c.req.header('x-admin-password')
  if (provided !== env.ADMIN_PASSWORD) return c.json({ error: 'Unauthorized' }, 401)
  await next()
}

app.use('/api/admin/*', adminGate)

// ── GET /api/points ──────────────────────────────────────────────────────────
// Returns the whole approved dataset as JSON. Edge-cached for 5 minutes.
app.get('/api/points', async (c) => {
  const json = await c.env.OILCYCLE.get('points:v1')
  const body = json ?? '[]'
  return new Response(body, {
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'public, max-age=300, s-maxage=600',
    },
  })
})

// ── GET /api/points/:id ──────────────────────────────────────────────────────
app.get('/api/points/:id', async (c) => {
  const id = c.req.param('id')
  const all = await c.env.OILCYCLE.get<Point[]>('points:v1', 'json') ?? []
  const point = all.find(p => p.id === id)
  if (!point) return c.json({ error: 'Not found' }, 404)
  return c.json(point)
})

// ── POST /api/suggest ────────────────────────────────────────────────────────
app.post('/api/suggest', async (c) => {
  const body = await c.req.json<{
    name?: string
    address?: string
    county?: string
    notes?: string
    submitter_email?: string
  }>()

  if (!body.name?.trim() || !body.address?.trim()) {
    return c.json({ error: 'name and address are required' }, 400)
  }
  if (body.submitter_email && !body.submitter_email.includes('@')) {
    return c.json({ error: 'submitter_email looks invalid' }, 400)
  }

  const id = crypto.randomUUID()
  const submission: PendingSubmission = {
    id,
    payload: {
      name: body.name.trim(),
      address: body.address.trim(),
      county: body.county?.trim(),
      notes: body.notes?.trim(),
    },
    submitter_email: body.submitter_email?.trim(),
    status: 'pending',
    created_at: new Date().toISOString(),
  }
  await c.env.OILCYCLE.put(`pending:${id}`, JSON.stringify(submission))
  return c.json({ ok: true, id })
})

// ── Admin: list pending submissions ──────────────────────────────────────────
app.get('/api/admin/pending', async (c) => {
  const list = await c.env.OILCYCLE.list({ prefix: 'pending:' })
  const items: PendingSubmission[] = []
  for (const key of list.keys) {
    const val = await c.env.OILCYCLE.get<PendingSubmission>(key.name, 'json')
    if (val) items.push(val)
  }
  items.sort((a, b) => b.created_at.localeCompare(a.created_at))
  return c.json({ count: items.length, items })
})

// ── Admin: approve a submission (merges into points:v1) ──────────────────────
app.post('/api/admin/pending/:id/approve', async (c) => {
  const id = c.req.param('id')
  const sub = await c.env.OILCYCLE.get<PendingSubmission>(`pending:${id}`, 'json')
  if (!sub) return c.json({ error: 'Not found' }, 404)
  const extra = await c.req.json<Partial<Point>>().catch(() => ({} as Partial<Point>))

  const merged: Point = {
    id,
    name: sub.payload.name ?? 'Untitled',
    kind: extra.kind ?? 'civic',
    address: sub.payload.address ?? '',
    county: sub.payload.county ?? extra.county ?? '',
    lat: extra.lat ?? 0,
    lng: extra.lng ?? 0,
    accepts_oil: extra.accepts_oil ?? true,
    accepts_household_quantity: extra.accepts_household_quantity ?? true,
    fee: extra.fee ?? 'unknown',
    notes: sub.payload.notes,
    source: 'user',
    last_verified_at: new Date().toISOString(),
    country: extra.country ?? 'IE',
    confidence: extra.confidence ?? 'community_submitted',
    ...extra,
  }

  if (!merged.lat || !merged.lng) {
    return c.json({ error: 'lat/lng required in approval body' }, 400)
  }

  const all = await c.env.OILCYCLE.get<Point[]>('points:v1', 'json') ?? []
  const without = all.filter(p => p.id !== id)
  without.push(merged)
  await c.env.OILCYCLE.put('points:v1', JSON.stringify(without))
  await c.env.OILCYCLE.put(`pending:${id}`, JSON.stringify({
    ...sub,
    status: 'approved',
    reviewed_at: new Date().toISOString(),
  }))
  await c.env.OILCYCLE.put('meta:last_updated', new Date().toISOString())
  return c.json({ ok: true, point: merged })
})

// ── Admin: reject a submission ───────────────────────────────────────────────
app.post('/api/admin/pending/:id/reject', async (c) => {
  const id = c.req.param('id')
  const sub = await c.env.OILCYCLE.get<PendingSubmission>(`pending:${id}`, 'json')
  if (!sub) return c.json({ error: 'Not found' }, 404)
  await c.env.OILCYCLE.put(`pending:${id}`, JSON.stringify({
    ...sub,
    status: 'rejected',
    reviewed_at: new Date().toISOString(),
  }))
  return c.json({ ok: true })
})

// ── Admin: replace the whole dataset (used by scripts/upload_dataset.ts) ─────
app.post('/api/admin/dataset', async (c) => {
  const body = await c.req.json<Point[]>()
  if (!Array.isArray(body)) return c.json({ error: 'Expected an array of points' }, 400)
  await c.env.OILCYCLE.put('points:v1', JSON.stringify(body))
  await c.env.OILCYCLE.put('meta:last_updated', new Date().toISOString())
  await c.env.OILCYCLE.put('meta:counts', JSON.stringify({
    total: body.length,
    by_county: countByCounty(body),
  }))
  return c.json({ ok: true, total: body.length })
})

// ── Health check ─────────────────────────────────────────────────────────────
app.get('/api/health', async (c) => {
  const all = await c.env.OILCYCLE.get<Point[]>('points:v1', 'json') ?? []
  const lastUpdated = await c.env.OILCYCLE.get('meta:last_updated')
  return c.json({ status: 'ok', points: all.length, last_updated: lastUpdated })
})

function countByCounty(points: Point[]): Record<string, number> {
  const out: Record<string, number> = {}
  for (const p of points) out[p.county] = (out[p.county] ?? 0) + 1
  return out
}

export default { fetch: app.fetch }
