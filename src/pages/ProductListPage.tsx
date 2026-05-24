import { ErrorState } from '../components/ErrorState'
import { Loader } from '../components/Loader'
import { Pagination } from '../components/Pagination'
import { ProductGrid } from '../components/ProductGrid'

import { FiltersPanel } from '../components/filters/FiltersPanel'

import {
  PAGE_SIZE,
  useFilters,
} from '../hooks/useFilters'

import { useProducts } from '../hooks/useProducts'

import type { Product } from '../types/product'

function filterProducts(
  products: Product[],

  query: string,

  categories: string[],

  minPrice: number | null,

  maxPrice: number | null,

  brands: string[]
): Product[] {
  const brandSet =
    brands.length > 0
      ? new Set(brands)
      : null

  const categorySet =
    categories.length > 0
      ? new Set(categories)
      : null

  return products.filter((p) => {
    // SEARCH
    if (
      query &&
      !p.title
        .toLowerCase()
        .includes(
          query.toLowerCase()
        )
    ) {
      return false
    }

    // CATEGORY
    if (
      categorySet &&
      !categorySet.has(
        p.category
      )
    ) {
      return false
    }

    // MIN PRICE
    if (
      minPrice !== null &&
      p.price < minPrice
    ) {
      return false
    }

    // MAX PRICE
    if (
      maxPrice !== null &&
      p.price > maxPrice
    ) {
      return false
    }

    // BRAND
    if (
      brandSet &&
      (!p.brand ||
        !brandSet.has(
          p.brand
        ))
    ) {
      return false
    }

    return true
  })
}

export function ProductListPage() {
  const filters = useFilters()

  const {
    products,
    loading,
    error,
    refetch,
  } = useProducts({
    query: filters.query,
  })

  // FINAL FILTERED PRODUCTS
  const filtered =
    filterProducts(
      products,
      filters.query,
      filters.category,
      filters.minPrice,
      filters.maxPrice,
      filters.brands
    )

  // CATEGORY OPTIONS
  // depends on selected brands
  const categoryFilteredProducts =
    filterProducts(
      products,
      filters.query,
      [],
      filters.minPrice,
      filters.maxPrice,
      filters.brands
    )

  // BRAND OPTIONS
  // depends on selected categories
  const brandFilteredProducts =
    filterProducts(
      products,
      filters.query,
      filters.category,
      filters.minPrice,
      filters.maxPrice,
      []
    )

  const totalPages = Math.max(
    1,
    Math.ceil(
      filtered.length /
        PAGE_SIZE
    )
  )

  const safePage = Math.min(
    filters.page,
    totalPages
  )

  const start =
    (safePage - 1) *
    PAGE_SIZE

  const pageItems =
    filtered.slice(
      start,
      start + PAGE_SIZE
    )

  return (
    
    <div className="layout">
  <div
  className="mobile-sidebar-overlay hidden"
  onClick={() => {
    document
      .querySelector('.filters')
      ?.classList.remove(
        'is-open'
      )

    document
      .querySelector(
        '.mobile-sidebar-overlay'
      )
      ?.classList.add(
        'hidden'
      )
  }}
/>
      <FiltersPanel
        query={filters.query}
        category={
          filters.category
        }
        minPrice={
          filters.minPrice
        }
        maxPrice={
          filters.maxPrice
        }
        brands={filters.brands}
        products={
          brandFilteredProducts
        }
        categoryProducts={
          categoryFilteredProducts
        }
        onQueryChange={
          filters.setQuery
        }
        onCategoryToggle={
          filters.toggleCategory
        }
        onPriceChange={
          filters.setPriceRange
        }
        onBrandToggle={
          filters.toggleBrand
        }
        onClear={filters.clear}
      />

      <main className="results">
        <header className="results-header">
          <h1 className="results-title">
            <span aria-hidden>
              🔍
            </span>{' '}
            Filters
          </h1>

          {!loading &&
            !error && (
              <p className="results-count">
                {
                  filtered.length
                }{' '}
                {filtered.length ===
                1
                  ? 'item'
                  : 'items'}
              </p>
            )}
        </header>

        {loading ? (
          <Loader label="Loading products…" />
        ) : error ? (
          <ErrorState
            message={error}
            onRetry={refetch}
          />
        ) : (
          <>
            <ProductGrid
              products={
                pageItems
              }
            />

            <Pagination
              page={safePage}
              totalPages={
                totalPages
              }
              onChange={
                filters.setPage
              }
            />
          </>
        )}
      </main>
    </div>
  )
}