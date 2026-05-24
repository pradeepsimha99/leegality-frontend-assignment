import type { Product } from '../../types/product'

interface Props {
  products: Product[]
  selected: string[]
  onToggle: (brand: string) => void
}

function uniqueBrands(products: Product[]): string[] {
  const set = new Set<string>()
  for (const p of products) {
    if (p.brand) set.add(p.brand)
  }
  return Array.from(set).sort((a, b) => a.localeCompare(b))
}

export function BrandFilter({ products, selected, onToggle }: Props) {
  const brands = uniqueBrands(products)
  const selectedSet = new Set(selected)

  if (brands.length === 0) {
    return (
      <fieldset className="filter">
        <legend>Brands</legend>
        <p className="filter-empty">No brands available.</p>
      </fieldset>
    )
  }

  return (
    <fieldset className="filter">
      <legend>Brands</legend>
      <div className="filter-scroll">
        {brands.map((brand) => (
          <label key={brand} className="filter-option">
            <input
              type="checkbox"
              checked={selectedSet.has(brand)}
              onChange={() => onToggle(brand)}
            />
            <span>{brand}</span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}

