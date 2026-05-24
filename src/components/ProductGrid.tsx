import type { Product } from '../types/product'
import { ProductCard } from './ProductCard'

interface Props {
  products: Product[]
}

export function ProductGrid({ products }: Props) {
  if (products.length === 0) {
    return (
      <div className="empty-state">
        <p>No products match the current filters.</p>
      </div>
    )
  }

  return (
    <div className="grid">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  )
}
