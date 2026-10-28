// MapLibre runs its tile worker as a separate same-origin module; ship it from /public.
import { copyFileSync, mkdirSync } from 'fs'

const src = 'node_modules/maplibre-gl/dist'
const out = 'public/maplibre'
mkdirSync(out, { recursive: true })
for (const f of ['maplibre-gl-worker.mjs', 'maplibre-gl-shared.mjs']) copyFileSync(`${src}/${f}`, `${out}/${f}`)
