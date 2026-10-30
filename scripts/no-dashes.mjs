// The site does not use dashes as punctuation. This fails the build if one slips in.
// Number ranges like 1941–1945 are fine; a dash between words is not.
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'

const BANNED = /—|\s–\s|\s-\s(?=[\u0590-\u05FF])/
const files = (dir) => readdirSync(dir).flatMap((f) => {
  const p = join(dir, f)
  return statSync(p).isDirectory() ? files(p) : /\.(tsx?|css|html)$/.test(p) ? [p] : []
})

const hits = [...files('src'), 'index.html'].flatMap((f) =>
  readFileSync(f, 'utf8').split('\n').flatMap((line, i) => (BANNED.test(line) ? [`${f}:${i + 1}: ${line.trim().slice(0, 100)}`] : [])))

if (hits.length) {
  console.error(`No dashes on the site. Use a comma, a colon or a full stop instead:\n${hits.join('\n')}`)
  process.exit(1)
}
