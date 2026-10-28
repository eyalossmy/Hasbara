import L from 'leaflet'
import { maplibreGL } from '@maplibre/maplibre-gl-leaflet'
import * as maplibregl from 'maplibre-gl'
import type { StyleSpecification } from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'

// OpenFreeMap: free vector tiles, no API key.
const STYLE_URL = 'https://tiles.openfreemap.org/styles/positron'
const ATTRIBUTION =
  '<a href="https://openfreemap.org" target="_blank">OpenFreeMap</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>'

let stylePromise: Promise<StyleSpecification> | null = null

/** Positron, re-labelled in Hebrew and tinted to the site's palette. */
function loadStyle() {
  stylePromise ??= fetch(STYLE_URL)
    .then((r) => r.json() as Promise<StyleSpecification>)
    .then((style) => {
      for (const layer of style.layers) {
        if (layer.type === 'symbol' && layer.layout?.['text-field'] && JSON.stringify(layer.layout['text-field']).includes('name')) {
          layer.layout['text-field'] = ['coalesce', ['get', 'name:he'], ['get', 'name']]
        }
        if (layer.type === 'fill' && layer.id === 'water') layer.paint = { ...layer.paint, 'fill-color': '#c9d8f5' }
        if (layer.type === 'background') layer.paint = { ...layer.paint, 'background-color': '#f4f6fb' }
      }
      return style
    })
    .catch((e) => {
      stylePromise = null
      throw e
    })
  return stylePromise
}

export async function addBasemap(map: L.Map) {
  // MapLibre v6 shapes Hebrew/RTL labels itself; only the worker location needs setting.
  maplibregl.setWorkerUrl(`${location.origin}/maplibre/maplibre-gl-worker.mjs`)
  try {
    const style = await loadStyle()
    // The map may have been torn down while the style loaded
    if (!map.getPane('tilePane')) return
    const layer = maplibreGL({ style, attribution: ATTRIBUTION } as Parameters<typeof maplibreGL>[0]).addTo(map)
    // Resolve once the first frame is drawn (or after a few seconds, so a slow network never hides the map)
    await new Promise<void>((resolve) => {
      layer.getMaplibreMap().once('load', () => resolve())
      setTimeout(resolve, 6000)
    })
  } catch {
    // Vector style unavailable: fall back to plain OSM raster tiles
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(map)
  }
}
