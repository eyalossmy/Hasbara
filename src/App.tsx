import { lazy, Suspense, useEffect, type ComponentType } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'

/** A lazy page that can be fetched ahead of time, and renders without suspending once it is in. */
function page(load: () => Promise<{ default: ComponentType }>) {
  let Loaded: ComponentType | undefined
  const preload = () => load().then((m) => { Loaded = m.default; return m })
  const Lazy = lazy(preload)
  const Page = () => (Loaded ? <Loaded /> : <Lazy />)
  Page.preload = preload
  return Page
}

const Timeline = page(() => import('./pages/Timeline'))
const Oct7 = page(() => import('./pages/Oct7'))
const Myths = page(() => import('./pages/Myths'))
const Toolkit = page(() => import('./pages/Toolkit'))
const Law = page(() => import('./pages/Law'))
const WorldMap = page(() => import('./pages/WorldMap'))
const Quiz = page(() => import('./pages/Quiz'))
const GazaOrNot = page(() => import('./pages/GazaOrNot'))
const Glossary = page(() => import('./pages/Glossary'))
const About = page(() => import('./pages/About'))
const NotFound = page(() => import('./pages/NotFound'))

// Light pages are fetched once the first page is idle, so moving between them never waits on the network
const LIGHT = [Timeline, Oct7, Myths, Toolkit, Law, Quiz, GazaOrNot, Glossary, About]

export default function App() {
  useEffect(() => {
    const idle = window.requestIdleCallback ?? ((f: () => void) => window.setTimeout(f, 1200))
    idle(() => LIGHT.forEach((p) => p.preload()))
    // The map is heavy (map engine and flags), so it is fetched only when someone heads for it
    const toMap = (e: Event) => { if ((e.target as Element).closest?.('a[href="/map"]')) WorldMap.preload() }
    document.addEventListener('pointerover', toMap, { passive: true })
    document.addEventListener('touchstart', toMap, { passive: true })
    return () => { document.removeEventListener('pointerover', toMap); document.removeEventListener('touchstart', toMap) }
  }, [])

  return (
    <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="timeline" element={<Timeline />} />
          <Route path="oct7" element={<Oct7 />} />
          <Route path="myths" element={<Myths />} />
          <Route path="toolkit" element={<Toolkit />} />
          <Route path="law" element={<Law />} />
          <Route path="map" element={<WorldMap />} />
          <Route path="quiz" element={<Quiz />} />
          <Route path="gaza-or-not" element={<GazaOrNot />} />
          <Route path="glossary" element={<Glossary />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
