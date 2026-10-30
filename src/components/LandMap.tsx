import { useId } from 'react'
import { LAKES, LAND, LAND_VIEW } from '../data/landmap'
import { CITIES, COLORS, PERIODS, type Period, type Region } from '../data/periods'

// Same projection the shapes were generated with (see data/landmap.ts)
const proj = (lon: number, lat: number) => [(lon - 32.2) * 85.35, (33.55 - lat) * 100]

const BASE: Region[] = ['egypt', 'sinai', 'saudi', 'jordan', 'syria', 'lebanon', 'golan', 'israel', 'westbank', 'gaza']
const ANCIENT: Region[] = ['philistia', 'kIsrael', 'kJudah', 'judea']
const LAND_FILL = '#e7e6df'
const STRIPES = `repeating-linear-gradient(45deg, ${COLORS.pa} 0 3px, ${COLORS.held} 3px 6px)`

const NAMES = {
  egypt: { at: proj(32.62, 30.55), text: 'מצרים' },
  sinai: { at: proj(33.75, 29.95), text: 'סיני' },
  jordan: { at: proj(36.45, 31.0), text: 'ירדן' },
  syria: { at: proj(36.55, 33.2), text: 'סוריה' },
  lebanon: { at: proj(35.42, 33.42), text: 'לבנון' },
}
const [SEA_X, SEA_Y] = proj(33.4, 31.8)
const [DEAD_X, DEAD_Y] = proj(35.5, 31.5)

/** The land in one period: who held what, its towns and names. */
export function LandSvg({ period }: { period: Period }) {
  const p = PERIODS[period]
  // Each map needs its own pattern id: copies inside hidden mobile blocks would otherwise swallow the reference
  const uid = useId().replace(/:/g, '')
  const mix = `lm-mix-${uid}`
  const line = `lm-gl-${uid}`
  const fill = (c: string | undefined, fallback: string) => (c === COLORS.mix ? `url(#${mix})` : c ?? fallback)
  return (
    <svg className="lm-svg" viewBox={`0 0 ${LAND_VIEW.w} ${LAND_VIEW.h}`} role="img" aria-label={`מפת הארץ: ${p.title}, ${p.years}`}>
      <defs>
        <pattern id={mix} patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
          <rect width="6" height="6" fill={COLORS.held} />
          <rect width="3" height="6" fill={COLORS.pa} />
        </pattern>
        {/* The Green Line is only where Israel meets the territories, not its coast or other borders */}
        <clipPath id={line}><path d={LAND.westbank} /><path d={LAND.gaza} /><path d={LAND.golan} /></clipPath>
      </defs>
      <rect width={LAND_VIEW.w} height={LAND_VIEW.h} className="lm-sea" />
      {BASE.map((r) => <path key={r} d={LAND[r]} className="lm-r" style={{ fill: fill(p.fills[r], LAND_FILL) }} />)}
      {ANCIENT.map((r) => <path key={r} d={LAND[r]} className="lm-r lm-old" style={{ fill: fill(p.fills[r], 'transparent'), opacity: p.fills[r] ? 1 : 0 }} />)}
      {p.greenLine && <path d={LAND.israel} className="lm-green" clipPath={`url(#${line})`} />}
      <path d={LAKES} className="lm-sea lm-lake" />
      <text x={SEA_X} y={SEA_Y} className="lm-name sea">הים התיכון</text>
      <text x={DEAD_X + 6} y={DEAD_Y} className="lm-name tiny">ים המלח</text>
      {(Object.keys(NAMES) as (keyof typeof NAMES)[]).map((k) => {
        const label = p.labels?.[k] === undefined ? NAMES[k].text : p.labels[k]
        return label ? <text key={k} x={NAMES[k].at[0]} y={NAMES[k].at[1]} className="lm-name">{label}</text> : null
      })}
      {p.marks?.map(([lon, lat, text, small]) => {
        const [x, y] = proj(lon, lat)
        return <text key={text} x={x} y={y} className={`lm-mark ${small ? 'small' : ''}`}>{text}</text>
      })}
      {p.cities.map((id) => {
        const [x, y] = proj(...CITIES[id].at)
        const capital = id === 'jerusalem' || id === 'aelia'
        return (
          <g key={id} className={`lm-town ${capital ? 'capital' : ''}`}>
            <circle cx={x} cy={y} r={capital ? 3.6 : 2.4} />
            <text x={x + (capital ? 6 : 5)} y={y + 3.5}>{CITIES[id].name}</text>
          </g>
        )
      })}
    </svg>
  )
}

/** The map with its key laid over the sea. */
export function MapView({ period }: { period: Period }) {
  const p = PERIODS[period]
  return (
    <div className="lm-frame">
      <LandSvg period={period} />
      <ul className="lm-legend" key={period} aria-label="מקרא">
        <li className="k">מקרא</li>
        {p.legend.map(([c, label]) => (
          <li key={label}><i style={{ background: c === COLORS.mix ? STRIPES : c }} />{label}</li>
        ))}
        {p.greenLine && <li><i className="gl" />הקו הירוק, גבולות 1949</li>}
      </ul>
    </div>
  )
}

/** The period's title, its answer on a Palestinian state and the point to take away. */
export function PeriodText({ period }: { period: Period }) {
  const p = PERIODS[period]
  return (
    <div className="lm-info" key={period}>
      <div className="lm-years">{p.years}</div>
      <h3>{p.title}</h3>
      <div className={`lm-state ${p.state.no ? 'no' : ''}`}>מדינה פלסטינית: <b>{p.state.text}</b></div>
      <p className="lm-ctx">{p.note}</p>
    </div>
  )
}

/** Map and text stacked, for narrow screens. */
export default function LandMap({ period }: { period: Period }) {
  return (
    <figure className="lm">
      <div className="lm-map"><MapView period={period} /></div>
      <figcaption><PeriodText period={period} /></figcaption>
    </figure>
  )
}
