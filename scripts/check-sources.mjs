// Every item on a content page needs at least two sources, and at least one of them independent:
// not Wikipedia, and not an Israeli government or Israeli advocacy body. Run: node scripts/check-sources.mjs
import { readdirSync } from 'node:fs'
import { createServer } from 'vite'

// Vite loads the TypeScript data files as they are, imports and all
const vite = await createServer({ logLevel: 'error', server: { middlewareMode: true } })

const ISRAELI = /\.gov\.il|idf\.il|knesset|yadvashem|bringthemhomenow|cbs\.gov|timesofisrael|jpost|ynetnews|haaretz|i24news|israaid/
const notIndependent = (u) => /wikipedia\.org/.test(u) || ISRAELI.test(u)

let bad = 0
for (const f of readdirSync('src/data/pages')) {
  const mod = await vite.ssrLoadModule(`/src/data/pages/${f}`)
  for (const art of Object.values(mod)) {
    for (const b of art.blocks ?? []) {
      if (b.type === 'photos') continue // photos carry their own credit
      const items = b.items && b.type !== 'stats' ? b.items : [{ title: `[${b.type}] ${b.title ?? b.head?.title ?? ''}`, sources: b.sources ?? [] }]
      for (const it of items) {
        const s = it.sources ?? []
        if (b.type === 'honest' && !b.sources) continue
        if (s.length < 2 || s.every((x) => notIndependent(x.url))) { bad++; console.log(`${f}: ${it.title} (${s.length})`) }
      }
    }
  }
}
console.log(bad ? `${bad} items need more or independent sources` : 'all items have two sources, one independent')
await vite.close()
process.exitCode = bad ? 1 : 0
