import { Link } from 'react-router-dom'
import type { Product } from '../types/product'
import { StarRating } from './StarRating'

interface Props {
  product: Product
}

export function ProductCard({ product }: Props) {
  return (
    <Link to={`/product/${product.id}`} className="card">
      <div className="card-image">
        <img src={product.thumbnail} alt={product.title} loading="lazy" />
      </div>
      <div className="card-body">
        <h3 className="card-title">{product.title}</h3>
        <div className="card-meta">
          <span className="card-price">${product.price.toFixed(2)}</span>
          <StarRating value={product.rating} />
        </div>
      </div>
    </Link>
  )
}
