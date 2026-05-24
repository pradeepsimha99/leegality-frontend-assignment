interface Props {
  page: number
  totalPages: number
  onChange: (page: number) => void
}

function pageRange(current: number, total: number): (number | 'gap')[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }
  const pages: (number | 'gap')[] = [1]
  const start = Math.max(2, current - 1)
  const end = Math.min(total - 1, current + 1)
  if (start > 2) pages.push('gap')
  for (let i = start; i <= end; i++) pages.push(i)
  if (end < total - 1) pages.push('gap')
  pages.push(total)
  return pages
}

export function Pagination({ page, totalPages, onChange }: Props) {
  if (totalPages <= 1) return null

  const pages = pageRange(page, totalPages)

  return (
    <nav className="pagination" aria-label="Pagination">
      <button
        type="button"
        onClick={() => onChange(page - 1)}
        disabled={page <= 1}
      >
        ← Prev
      </button>
      {pages.map((p, i) =>
        p === 'gap' ? (
          <span key={`gap-${i}`} className="pagination-gap">
            …
          </span>
        ) : (
          <button
            key={p}
            type="button"
            onClick={() => onChange(p)}
            className={p === page ? 'is-active' : ''}
            aria-current={p === page ? 'page' : undefined}
          >
            {p}
          </button>
        ),
      )}
      <button
        type="button"
        onClick={() => onChange(page + 1)}
        disabled={page >= totalPages}
      >
        Next →
      </button>
    </nav>
  )
}
