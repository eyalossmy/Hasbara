import { Fragment, useEffect, useRef, useState } from 'react'

interface Drip { x: number; w: number; len: number; delay: number; drop: boolean }

// Small deterministic noise so the drips look random but never jump between renders
const noise = (n: number) => {
  const s = Math.sin(n * 127.1 + 311.7) * 43758.5453
  return s - Math.floor(s)
}

/**
 * Finds where each word's letters meet the baseline with a solid stroke: the word is drawn
 * on a hidden canvas and every pixel column whose ink ends on the baseline counts.
 * Returns stroke segments as [from, to] in the word's own pixels.
 */
function strokeBottoms(word: HTMLElement, text: string) {
  const cs = getComputedStyle(word)
  const fs = parseFloat(cs.fontSize)
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d', { willReadFrequently: true })!
  const font = `${cs.fontWeight} ${fs}px ${cs.fontFamily}`
  ctx.font = font
  const inkW = Math.ceil(ctx.measureText(text).width) + 4
  canvas.width = inkW
  canvas.height = Math.ceil(fs * 1.4)
  ctx.font = font
  ctx.direction = 'rtl'
  ctx.textAlign = 'right'
  ctx.fillText(text, inkW - 2, fs)
  const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height)
  // A trailing "?" sits at the far left in right-to-left text; it never bleeds
  const skip = text.endsWith('?') ? ctx.measureText('?').width + 4 : 0
  const scale = word.getBoundingClientRect().width / (inkW - 4)
  const segs: [number, number][] = []
  let open = -1
  for (let x = 0; x <= canvas.width; x++) {
    let bottom = -1
    if (x < canvas.width && x > skip) {
      for (let y = canvas.height - 1; y >= 0; y--) if (data[(y * canvas.width + x) * 4 + 3] > 140) { bottom = y; break }
    }
    const onBase = bottom > 0 && Math.abs(bottom - fs) < fs * 0.035
    if (onBase && open < 0) open = x
    if (!onBase && open >= 0) {
      if (x - open > fs * 0.05) segs.push([(open - 2) * scale, (x - 2) * scale])
      open = -1
    }
  }
  return { segs, fs }
}

function plan(word: HTMLElement, text: string, wi: number): Drip[] {
  const { segs, fs } = strokeBottoms(word, text)
  return segs.flatMap(([a, b], si) => {
    const r = noise(wi * 13 + si * 7)
    if (r < 0.42) return []
    const width = b - a
    const w = Math.max(fs * 0.058, Math.min(fs * 0.09, width * 0.45))
    // Drip off-centre within the stroke, as liquid does
    const x = a + width * (0.3 + noise(wi * 5 + si) * 0.4)
    return [{ x, w, len: fs * (0.3 + noise(wi * 3 + si * 11) * 0.55), delay: noise(wi + si * 17) * 1.6, drop: r > 0.82 }]
  })
}

/**
 * Headline that rises in word by word, then bleeds from the bottom of its letters.
 * Two copies of the text are stacked: the lower one carries the drips through a "goo" filter
 * that melts them into the strokes, the upper one keeps the letters crisp.
 */
export default function BloodText({ text, start = 0 }: { text: string; start?: number }) {
  const goo = useRef<HTMLSpanElement>(null)
  const [drips, setDrips] = useState<Drip[][]>([])
  const [base, setBase] = useState(0)
  const [blur, setBlur] = useState(3)
  const words = text.split(' ')

  useEffect(() => {
    const el = goo.current
    if (!el) return
    let frame = 0
    const measure = () => {
      const spans = [...el.querySelectorAll<HTMLElement>('.w')]
      if (!spans.length) return
      // Baseline offset from the top of a word box
      const probe = document.createElement('span')
      probe.style.cssText = 'display:inline-block;width:0;height:0;vertical-align:baseline'
      spans[0].appendChild(probe)
      setBase(probe.getBoundingClientRect().top - spans[0].getBoundingClientRect().top)
      probe.remove()
      // The melt scales with the type, or thin runs vanish at small sizes
      setBlur(parseFloat(getComputedStyle(spans[0]).fontSize) * 0.026)
      // When the headline wraps, runs from an upper line stop before the line below
      const lastTop = Math.max(...spans.map((s) => s.offsetTop))
      setDrips(spans.map((s, i) => {
        const fs = parseFloat(getComputedStyle(s).fontSize)
        const ds = plan(s, words[i], i)
        return s.offsetTop < lastTop ? ds.map((d) => ({ ...d, len: Math.min(d.len, fs * 0.32), drop: false })) : ds
      }))
    }
    const later = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(measure) }
    document.fonts.ready.then(later)
    const ro = new ResizeObserver(later)
    ro.observe(el)
    return () => { ro.disconnect(); cancelAnimationFrame(frame) }
  }, [text])

  const line = (layer: 'goo' | 'top') => words.map((w, i) => (
    <Fragment key={i}>
      {i > 0 && ' '}
      <span className="w" style={{ ['--i' as string]: i + start }} aria-hidden>
        {w}
        {layer === 'goo' && drips[i]?.map((d, j) => (
          <i key={j} className="drip" style={{
            left: d.x, top: base, ['--w' as string]: `${d.w}px`, ['--len' as string]: `${d.len}px`, animationDelay: `${1.5 + d.delay}s`,
          }}>
            {d.drop && <b className="drop" style={{ animationDelay: `${4.5 + d.delay}s` }} />}
          </i>
        ))}
      </span>
    </Fragment>
  ))

  return (
    <span className="blood" aria-label={text}>
      <svg width="0" height="0" aria-hidden style={{ position: 'absolute' }}>
        <filter id="blood-goo" x="-10%" y="-20%" width="120%" height="260%">
          <feGaussianBlur in="SourceGraphic" stdDeviation={blur} result="b" />
          <feColorMatrix in="b" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 24 -10" />
        </filter>
      </svg>
      <span ref={goo} className="split blood-goo" aria-hidden>{line('goo')}</span>
      <span className="split blood-top" aria-hidden>{line('top')}</span>
    </span>
  )
}
