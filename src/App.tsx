import { Routes, Route, Link, useLocation } from 'react-router-dom'
import HomePage from './pages/home'
import ResultsPage from './pages/results'
import DetailPage from './pages/detail'
import SuggestPage from './pages/suggest'
import AboutPage from './pages/about'
import { Droplet } from 'lucide-react'

export default function App() {
  const location = useLocation()
  const onHome = location.pathname === '/'

  return (
    <div className="min-h-screen flex flex-col">
      <header className={`sticky top-0 z-30 backdrop-blur border-b border-line/60 ${onHome ? 'bg-cream/80' : 'bg-cream/95'}`}>
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="w-7 h-7 rounded-full bg-olive grid place-items-center">
              <Droplet className="w-4 h-4 text-amber" fill="currentColor" />
            </span>
            <span>OilCycle</span>
          </Link>
          <nav className="flex items-center gap-1 text-sm">
            <Link to="/about" className="px-3 py-1.5 rounded-full hover:bg-cream-2 text-ink-2">Why recycle</Link>
            <Link to="/suggest" className="px-3 py-1.5 rounded-full hover:bg-cream-2 text-ink-2">Suggest a place</Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 flex flex-col">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/near" element={<ResultsPage />} />
          <Route path="/places/:id" element={<DetailPage />} />
          <Route path="/suggest" element={<SuggestPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </main>

      <footer className="mt-12 border-t border-line/60 py-6 text-xs text-muted">
        <div className="max-w-5xl mx-auto px-4 flex flex-wrap items-center justify-between gap-2">
          <span>OilCycle · Made in Dublin · Data from MyWaste.ie, OpenStreetMap, councils + you</span>
          <span>v0.1</span>
        </div>
      </footer>
    </div>
  )
}
