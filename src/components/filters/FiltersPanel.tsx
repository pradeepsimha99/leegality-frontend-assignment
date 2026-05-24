import type { Product } from '../../types/product'

import { BrandFilter } from './BrandFilter'
import { CategoryFilter } from './CategoryFilter'
import { PriceFilter } from './PriceFilter'

interface Props {
  query: string

  category: string[]

  minPrice: number | null

  maxPrice: number | null

  brands: string[]

  products: Product[]

  categoryProducts: Product[]

  onQueryChange: (q: string) => void

  onCategoryToggle: (
    slug: string
  ) => void

  onPriceChange: (
    min: number | null,
    max: number | null
  ) => void

  onBrandToggle: (
    brand: string
  ) => void

  onClear: () => void
}

export function FiltersPanel(
  props: Props
) {
  const hasFilters =
    props.query !== '' ||
    props.category.length > 0 ||
    props.minPrice !== null ||
    props.maxPrice !== null ||
    props.brands.length > 0

  function closeSidebar() {
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
  }

  return (
    <aside className="filters">
      {/* CLOSE BUTTON */}
      <button
        type="button"
        className="sidebar-close-btn"
        aria-label="Close filters"
        onClick={closeSidebar}
      >
        ✕
      </button>

      <CategoryFilter
        value={props.category}
        onToggle={
          props.onCategoryToggle
        }
        products={
          props.categoryProducts
        }
      />

      <PriceFilter
        min={props.minPrice}
        max={props.maxPrice}
        onChange={
          props.onPriceChange
        }
      />

      <BrandFilter
        products={props.products}
        selected={props.brands}
        onToggle={
          props.onBrandToggle
        }
      />

      {hasFilters && (
        <button
          type="button"
          className="link-button clear-all"
          onClick={props.onClear}
        >
          Clear all filters
        </button>
      )}
    </aside>
  )
}