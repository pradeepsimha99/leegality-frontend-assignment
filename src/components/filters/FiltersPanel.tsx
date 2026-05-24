import type { Product } from '../../types/product'

import { BrandFilter } from './BrandFilter'
import { CategoryFilter } from './CategoryFilter'
import { PriceFilter } from './PriceFilter'
import { SidebarSearch } from './SidebarSearch'

interface Props {
  query: string

  category: string[]

  minPrice: number | null

  maxPrice: number | null

  brands: string[]

  // products for brand filter
  products: Product[]

  // products for category filter
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

  return (
    <aside className="filters">
      <SidebarSearch
        query={props.query}
        onChange={
          props.onQueryChange
        }
      />

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