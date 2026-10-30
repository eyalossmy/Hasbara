import { useId } from 'react'
import { LAKES, LAND, LAND_VIEW } from '../data/landmap'
import { COLORS, PERIODS, type Period, type Region } from '../data/periods'

// Same projection the shapes were generated with (see data/landmap.ts)
const proj = (lon: number, lat: number) => [(lon - 32.2) * 85.35, (33.55 - lat) * 100]

const BASE: Region[] = ['egypt', 'sinai', 'saudi', 'jordan', 'syria', 'lebanon', 'golan', 'israel', 'westbank', 'gaza']
const ANCIENT: Region[] = ['philistia', 'kIsrael', 'kJudah', 'judea']
const LAND_FILL = '#e7e6df'

const NAMES = {
  egypt: { at: proj(32.62, 30.55), text: 'מצרים' },
  sinai: { at: proj(33.75, 29.95), text: 'סיני' },
  jordan: { at: proj(36.45, 31.0), text: 'ירדן' },
  syria: { at: proj(36.55, 33.25), text: 'סוריה' },
  lebanon: { at: proj(35.42, 33.42), text: 'לבנון' },
}

export default function LandMap({ period, compact }: { period: Period; compact?: boolean }) {
  const p = PERIODS[period]
  // Each map needs its own pattern id: copies inside hidden mobile blocks would otherwise swallow the reference
  const mix = `lm-mix-${useId().replace(/:/g, '')}`
  const fill = (c: string | undefined, fallback: string) => (c === COLORS.mix ? `url(#${mix})` : c ?? fallback)
  const [jx, jy] = proj(35.22, 31.78)
  const [sx, sy] = proj(33.25, 32.35)
  return (
    <figure className={`lm ${compact ? 'compact' : ''}`}>
      <div className="lm-map">
        <svg viewBox={`0 0 ${LAND_VIEW.w} ${LAND_VIEW.h}`} role="img" aria-label={`מפת הארץ: ${p.title}, ${p.years}`}>
          <defs>
            <pattern id={mix} patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
              <rect width="6" height="6" fill={COLORS.held} />
              <rect width="3" height="6" fill={COLORS.pa} />
            </pattern>
          </defs>
          <rect width={LAND_VIEW.w} height={LAND_VIEW.h} className="lm-sea" />
          {BASE.map((r) => <path key={r} d={LAND[r]} className="lm-r" style={{ fill: fill(p.fills[r], LAND_FILL) }} />)}
          {ANCIENT.map((r) => <path key={r} d={LAND[r]} className="lm-r lm-old" style={{ fill: fill(p.fills[r], 'transparent'), opacity: p.fills[r] ? 1 : 0 }} />)}
          <path d={LAKES} className="lm-sea" />
          <text x={sx} y={sy} className="lm-name sea">הים התיכון</text>
          {(Object.keys(NAMES) as (keyof typeof NAMES)[]).map((k) => {
            const label = p.labels?.[k] === undefined ? NAMES[k].text : p.labels[k]
            return label ? <text key={k} x={NAMES[k].at[0]} y={NAMES[k].at[1]} className="lm-name">{label}</text> : null
          })}
          <circle cx={jx} cy={jy} r="3.5" className="lm-city" />
          <text x={jx + 7} y={jy + 4} className="lm-name city">ירושלים</text>
        </svg>
        <div className="lm-head">
          <div className="lm-years">{p.years}</div>
          <h3>{p.title}</h3>
          <div className={`lm-state ${p.state.no ? 'no' : ''}`}>מדינה פלסטינית: <b>{p.state.text}</b></div>
        </div>
      </div>
      <figcaption>
        <ul className="lm-legend">
          {p.legend.map(([c, label]) => (
            <li key={label}><i style={{ background: c === COLORS.mix ? undefined : c }} />{label}</li>
          ))}
        </ul>
        <p className="lm-note">{p.note}</p>
      </figcaption>
    </figure>
  )
}
