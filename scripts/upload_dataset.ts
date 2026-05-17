/**
 * Uploads data/points.v1.json into the live Worker's KV via the admin endpoint.
 *
 * Usage:
 *   ADMIN_PASSWORD=xxx WORKER_URL=https://oilcycle-worker.you.workers.dev \
 *     npm run data:upload
 *
 * For local dev (wrangler dev), set WORKER_URL=http://localhost:8787.
 *
 * Alternative for the initial seed, no admin password needed:
 *   wrangler kv:key put --binding OILCYCLE "points:v1" --path data/points.v1.json
 */

import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

async function main() {
  const workerUrl = process.env.WORKER_URL
  const adminPassword = process.env.ADMIN_PASSWORD
  if (!workerUrl) throw new Error('Set WORKER_URL=<https://oilcycle-worker.workers.dev>')
  if (!adminPassword) throw new Error('Set ADMIN_PASSWORD=<the secret you set with wrangler>')

  const path = resolve(process.cwd(), 'data/points.v1.json')
  const raw = await readFile(path, 'utf-8')
  const points = JSON.parse(raw)
  console.log(`Uploading ${points.length} points to ${workerUrl}`)

  const res = await fetch(`${workerUrl}/api/admin/dataset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Admin-Password': adminPassword,
    },
    body: JSON.stringify(points),
  })
  if (!res.ok) {
    const txt = await res.text()
    throw new Error(`Upload failed (${res.status}): ${txt}`)
  }
  const json = await res.json()
  console.log('OK', json)
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
