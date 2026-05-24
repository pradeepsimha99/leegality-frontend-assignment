import type { Product } from '../../types/product'

interface Props {
  value: string[]

  onToggle: (
    slug: string
  ) => void

  products: Product[]
}

function uniqueCategories(
  products: Product[]
): string[] {
  const set = new Set<string>()

  for (const p of products) {
    if (p.category) {
      set.add(p.category)
    }
  }

  return Array.from(set).sort(
    (a, b) =>
      a.localeCompare(b)
  )
}

export function CategoryFilter({
  value,
  onToggle,
  products,
}: Props) {
  const categories =
    uniqueCategories(products)

  const selectedSet =
    new Set(value)

  if (categories.length === 0) {
    return (
      <fieldset className="filter">
        <legend>
          Categories
        </legend>

        <p className="filter-empty">
          No categories available.
        </p>
      </fieldset>
    )
  }

  return (
    <fieldset className="filter">
      <legend>Categories</legend>

      <div className="filter-scroll">
        {categories.map(
          (category) => (
            <label
              key={category}
              className="filter-option"
            >
              <input
                type="checkbox"
                checked={selectedSet.has(
                  category
                )}
                onChange={() =>
                  onToggle(
                    category
                  )
                }
              />

              <span>
                {category}
              </span>
            </label>
          )
        )}
      </div>
    </fieldset>
  )
}