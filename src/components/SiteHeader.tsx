import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

export function SiteHeader() {
  const location = useLocation()
  const navigate = useNavigate()
  const [params, setParams] = useSearchParams()

  const onListing = location.pathname === '/'
  const urlQuery = onListing ? (params.get('q') ?? '') : ''

  const [local, setLocal] = useState(urlQuery)
  const [synced, setSynced] = useState(urlQuery)

  // Keep local input in sync when the URL changes externally (e.g. clear-all,
  // navigation, browser back).
  if (synced !== urlQuery) {
    setSynced(urlQuery)
    setLocal(urlQuery)
  }

  // Debounce writes back to the URL.
  useEffect(() => {
    if (local === urlQuery) return
    const handle = setTimeout(() => {
      if (onListing) {
        const next = new URLSearchParams(params)
        if (local) next.set('q', local)
        else next.delete('q')
        next.delete('page')
        setParams(next)
      } else {
        // Searching from the detail page: jump to listing with the query.
        navigate(local ? `/?q=${encodeURIComponent(local)}` : '/')
      }
    }, 300)
    return () => clearTimeout(handle)
  }, [local, urlQuery, onListing, params, setParams, navigate])

  return (
    <header className="site-header">
      <button
        type="button"
        className="icon-btn"
        aria-label="Open menu"
        title="Menu"
      >
        <span aria-hidden>☰</span>
      </button>
      <div className="header-search">
        <span className="header-search-icon" aria-hidden>
          🔍
        </span>
        <input
          type="search"
          placeholder="Search products..."
          value={local}
          onChange={(e) => setLocal(e.target.value)}
          aria-label="Search products"
        />
      </div>
      <nav className="header-actions" aria-label="Account">
        <Link to="/" className="icon-btn" aria-label="Home" title="Home">
          <span aria-hidden>🛒</span>
        </Link>
        <button type="button" className="icon-btn" aria-label="Notifications">
          <span aria-hidden>🔔</span>
        </button>
        <button type="button" className="icon-btn" aria-label="Account">
          <span aria-hidden>👤</span>
        </button>
      </nav>
    </header>
  )
}
