import { useSearchParams } from 'react-router-dom'

export const PAGE_SIZE = 8

export interface Filters {
  query: string

  category: string[]

  minPrice: number | null

  maxPrice: number | null

  brands: string[]

  page: number
}

function parseNumber(
  value: string | null
): number | null {
  if (value === null || value === '') {
    return null
  }

  const n = Number(value)

  return Number.isFinite(n)
    ? n
    : null
}

export function useFilters() {
  const [params, setParams] =
    useSearchParams()

  const filters: Filters = {
    query: params.get('q') ?? '',

    category:
      params
        .get('category')
        ?.split(',')
        .filter(Boolean) ?? [],

    minPrice: parseNumber(
      params.get('min')
    ),

    maxPrice: parseNumber(
      params.get('max')
    ),

    brands:
      params
        .get('brands')
        ?.split(',')
        .filter(Boolean) ?? [],

    page: Math.max(
      1,
      parseNumber(params.get('page')) ??
        1
    ),
  }

  function update(
    mutate: (
      next: URLSearchParams
    ) => void,
    resetPage = true
  ) {
    const next = new URLSearchParams(
      params
    )

    mutate(next)

    if (resetPage) {
      next.delete('page')
    }

    setParams(next, {
      replace: false,
    })
  }

  return {
    ...filters,

    setQuery(query: string) {
      update((p) => {
        if (query) {
          p.set('q', query)
        } else {
          p.delete('q')
        }
      })
    },

    // MULTIPLE CATEGORY SUPPORT
    toggleCategory(slug: string) {
      update((p) => {
        const set = new Set(
          filters.category
        )

        if (set.has(slug)) {
          set.delete(slug)
        } else {
          set.add(slug)
        }

        if (set.size === 0) {
          p.delete('category')
        } else {
          p.set(
            'category',
            Array.from(set).join(',')
          )
        }

        // remove stale brands
        p.delete('brands')
      })
    },

    setPriceRange(
      min: number | null,
      max: number | null
    ) {
      update((p) => {
        if (min === null) {
          p.delete('min')
        } else {
          p.set('min', String(min))
        }

        if (max === null) {
          p.delete('max')
        } else {
          p.set('max', String(max))
        }
      })
    },

    toggleBrand(brand: string) {
      update((p) => {
        const set = new Set(
          filters.brands
        )

        if (set.has(brand)) {
          set.delete(brand)
        } else {
          set.add(brand)
        }

        if (set.size === 0) {
          p.delete('brands')
        } else {
          p.set(
            'brands',
            Array.from(set).join(',')
          )
        }
      })
    },

    setPage(page: number) {
      update(
        (p) => {
          if (page <= 1) {
            p.delete('page')
          } else {
            p.set(
              'page',
              String(page)
            )
          }
        },
        false
      )
    },

    clear() {
      setParams(
        new URLSearchParams(),
        {
          replace: false,
        }
      )
    },
  }
}