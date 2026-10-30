import type { VideoRef } from '../components/Video'

// Every id was checked against YouTube's oEmbed endpoint; the channel is what YouTube reports.
export const VIDEOS = {
  oct7: [
    { id: 'NZ2zfiptS5U', title: 'The Children of October 7: survivors speak', channel: 'CBS News' },
    { id: 'Gans7Rm_2bw', title: '"We Will Dance Again": the Nova massacre', channel: 'CBS New York' },
    { id: 'Qmh83DV1CRw', title: '"October 8": the day after, around the world', channel: 'CP24' },
  ],
  holocaust: [
    { id: 'N-kHHGAT2AE', title: 'What was the Holocaust?', channel: 'BBC Newsround' },
    { id: 'MmgGHMyZPhY', title: 'What was the Holocaust?', channel: 'Holocaust Memorial Day Trust' },
  ],
  antisemitism: [
    { id: '7L4OqpeERdY', title: 'Unprecedented rise in antisemitic incidents after October 7', channel: 'MS NOW (MSNBC)' },
    { id: 'W3zRHeIXDV4', title: 'Blind Spot: a documentary on campus antisemitism', channel: 'JBS' },
  ],
  achievements: [
    { id: 'm8LQKBqBcpw', title: 'Israel the Startup Nation', channel: 'Unpacked' },
    { id: '4wspTRnwcgc', title: 'The true story of drip irrigation and Kibbutz Hatzerim', channel: 'Lev Haolam' },
  ],
  conflictHistory: [
    { id: 'vqMstcasciA', title: 'What was the UN Partition Plan, and why does it matter?', channel: 'American Jewish Committee' },
    { id: 'jfkEf4C0mew', title: 'Why was there no Palestinian state after 1948?', channel: 'History Hustle' },
    { id: 'sKRYSPKR4To', title: 'The War of Return: Dr. Einat Wilf', channel: 'ELNET' },
  ],
  war: [
    { id: 'VX2Q2FdgX-8', title: '"There is no Gaza thanks to Hamas," says the Son of Hamas', channel: 'i24NEWS English' },
    { id: 'PLKU-ok18a4', title: 'War in the City: John Spencer on Gaza and civilians', channel: 'Touro University' },
  ],
  compare: [
    { id: 'xqxzscalX2E', title: 'Urban Warfare 2.0: Sam Harris with John Spencer', channel: 'Sam Harris' },
    { id: 'a4nbPsPia_g', title: 'Urban warfare, civilian casualties and human shields', channel: 'Jordan B Peterson' },
  ],
  protest: [
    { id: 'yar2eoosMAw', title: 'What "from the river to the sea" means to different people', channel: 'CBC News: The National' },
    { id: 'rClsarOLYoI', title: 'Mosab Hassan Yousef, son of a Hamas founder, at the UN', channel: 'AIJAC' },
    { id: '3sKxnG-fuE4', title: 'The history of "From the River to the Sea"', channel: 'The Daily Signal' },
  ],
} satisfies Record<string, VideoRef[]>
