import { useEffect, useState } from 'react'

interface Props {
  query: string
  onChange: (q: string) => void
}

export function SidebarSearch({ query, onChange }: Props) {
  const [local, setLocal] = useState(query)
  const [synced, setSynced] = useState(query)

  if (synced !== query) {
    setSynced(query)
    setLocal(query)
  }

  useEffect(() => {
    if (local === query) return
    const handle = setTimeout(() => onChange(local), 300)
    return () => clearTimeout(handle)
  }, [local, query, onChange])

  return (
    <div className="sidebar-search">
      <span className="sidebar-search-icon" aria-hidden>
        🔍
      </span>
      <input
        type="search"
        placeholder="Search..."
        value={local}
        onChange={(e) => setLocal(e.target.value)}
        aria-label="Search products"
      />
    </div>
  )
}
