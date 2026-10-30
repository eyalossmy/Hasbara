import type { Source, Status } from './types'

// The shape of a content page. Every item carries its own sources, so nothing on the page stands without one.

export interface Head { eyebrow: string; title: string; text?: string }

export interface Item {
  /** A year, date or short label above the title */
  k?: string
  title: string
  /** Supports **bold** phrases; death tolls are bolded automatically */
  text: string
  status?: Status
  sources: Source[]
}

export type Block =
  | { type: 'stats'; items: { n: string; t: string }[]; sources: Source[] }
  | { type: 'cards'; head: Head; items: Item[] }
  | { type: 'steps'; head: Head; items: Item[] }
  | { type: 'compare'; head: Head; cols: [string, string]; rows: { label: string; a: string; b: string }[]; sources: Source[] }
  | { type: 'honest'; title: string; text: string; sources?: Source[] }

export interface Article {
  eyebrow: string
  title: string
  lead: string
  blocks: Block[]
  /** Questions that send the reader to check for themselves */
  think: string[]
  next?: { to: string; label: string }[]
}
