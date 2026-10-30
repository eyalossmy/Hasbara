import { useState } from 'react'
import { SourceLinks } from './ui'
import { wiki } from '../data/sources'

// 7 October at the scale of other countries. Israel had about 9.8 million people in October 2023.
const ISRAEL = 9_800_000
const KILLED = 1_200
const TAKEN = 251

/** Each country is compared with the attack its people remember */
const COUNTRIES = [
  { id: 'us', name: 'ארה״ב', pop: 335_000_000, ref: 2_977, event: '11 בספטמבר', src: wiki('en', 'September 11 attacks') },
  { id: 'uk', name: 'בריטניה', pop: 68_300_000, ref: 52, event: 'פיגועי 7 ביולי 2005 בלונדון', src: wiki('en', '7 July 2005 London bombings') },
  { id: 'fr', name: 'צרפת', pop: 68_200_000, ref: 130, event: 'פיגועי נובמבר 2015 בפריז', src: wiki('en', 'November 2015 Paris attacks') },
  { id: 'de', name: 'גרמניה', pop: 84_500_000, ref: 13, event: 'הפיגוע בשוק חג המולד בברלין, 2016', src: wiki('en', '2016 Berlin truck attack') },
  { id: 'ca', name: 'קנדה', pop: 40_100_000, ref: 158, event: 'כל החיילים הקנדים שנפלו באפגניסטן', src: wiki('en', 'Canadian Armed Forces casualties in Afghanistan') },
  { id: 'au', name: 'אוסטרליה', pop: 26_600_000, ref: 521, event: 'כל האוסטרלים שנפלו במלחמת וייטנאם', src: wiki('en', 'Military history of Australia during the Vietnam War') },
]

const round = (n: number) => Math.round(n / 10) * 10

export default function Scale() {
  const [id, setId] = useState('us')
  const c = COUNTRIES.find((x) => x.id === id)!
  const killed = (KILLED * c.pop) / ISRAEL
  return (
    <div className="scale reveal">
      <span className="think-k">פרופורציה</span>
      <h2>ואם זה היה קורה אצלכם?</h2>
      <p>ב־7 באוקטובר נרצחו כ־1,200 בני אדם ונחטפו 251, במדינה של כ־9.8 מיליון. כך זה נראה באותו יחס, במדינות אחרות:</p>
      <div className="chips" role="tablist">
        {COUNTRIES.map((x) => (
          <button key={x.id} role="tab" aria-selected={x.id === id} className={`chip ${x.id === id ? 'on' : ''}`} onClick={() => setId(x.id)}>{x.name}</button>
        ))}
      </div>
      <div className="scale-nums">
        <div><div className="n">{round(killed).toLocaleString('en-US')}</div><div className="t">נרצחים ביום אחד</div></div>
        <div><div className="n">{round((TAKEN * c.pop) / ISRAEL).toLocaleString('en-US')}</div><div className="t">חטופים, מתינוקות ועד קשישים</div></div>
        <div><div className="n">×{Math.round(killed / c.ref).toLocaleString('en-US')}</div><div className="t">פי כמה מ{c.event} ({c.ref.toLocaleString('en-US')} הרוגים)</div></div>
      </div>
      <p className="fine">חישוב פשוט: מספר הנרצחים והחטופים כפול היחס בין אוכלוסיית המדינה לאוכלוסיית ישראל, מעוגל לעשרות. הוא לא מתיימר לומר מה היה קורה שם, רק לתת תחושה של גודל.</p>
      <SourceLinks sources={[
        { label: 'World Bank: population by country', url: 'https://data.worldbank.org/indicator/SP.POP.TOTL' },
        { label: 'Britannica: October 7 attack', url: 'https://www.britannica.com/event/October-7-attack' },
        c.src,
      ]} />
    </div>
  )
}
