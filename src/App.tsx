import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'

const Timeline = lazy(() => import('./pages/Timeline'))
const Oct7 = lazy(() => import('./pages/Oct7'))
const Myths = lazy(() => import('./pages/Myths'))
const Toolkit = lazy(() => import('./pages/Toolkit'))
const Law = lazy(() => import('./pages/Law'))
const WorldMap = lazy(() => import('./pages/WorldMap'))
const Quiz = lazy(() => import('./pages/Quiz'))
const Glossary = lazy(() => import('./pages/Glossary'))
const About = lazy(() => import('./pages/About'))
const NotFound = lazy(() => import('./pages/NotFound'))

export default function App() {
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
          <Route path="glossary" element={<Glossary />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
