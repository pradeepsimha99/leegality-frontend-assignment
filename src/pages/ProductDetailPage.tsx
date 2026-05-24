import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchProductById } from '../api/products'
import { ErrorState } from '../components/ErrorState'
import { Loader } from '../components/Loader'
import { StarRating } from '../components/StarRating'
import type { Product } from '../types/product'

interface State {
  product: Product | null
  error: string | null
  loadedKey: string | null
}

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [reloadKey, setReloadKey] = useState(0)
  const [state, setState] = useState<State>({
    product: null,
    error: null,
    loadedKey: null,
  })
  const [activeImage, setActiveImage] = useState(0)

  const requestKey = `${id ?? ''}:${reloadKey}`

  useEffect(() => {
    if (!id) return
    let cancelled = false
    fetchProductById(id)
      .then((product) => {
        if (cancelled) return
        setState({ product, error: null, loadedKey: requestKey })
        setActiveImage(0)
      })
      .catch((err: unknown) => {
        if (cancelled) return
        const message =
          err instanceof Error ? err.message : 'Failed to load product'
        setState({ product: null, error: message, loadedKey: requestKey })
      })
    return () => {
      cancelled = true
    }
  }, [requestKey, id])

  const loading = state.loadedKey !== requestKey

  const back = (
    <button
      type="button"
      className="back-button"
      onClick={() => navigate(-1)}
    >
      ← Back
    </button>
  )

  if (loading) {
    return (
      <article className="detail-card">
        {back}
        <Loader label="Loading product…" />
      </article>
    )
  }

  if (state.error || !state.product) {
    return (
      <article className="detail-card">
        {back}
        <ErrorState
          message={state.error ?? 'Product not found'}
          onRetry={() => setReloadKey((k) => k + 1)}
        />
      </article>
    )
  }

  const product = state.product
  const images = product.images.length > 0 ? product.images : [product.thumbnail]
  const reviews = product.reviews ?? []

  return (
    <article className="detail-card">
      <div className="detail-card-top">{back}</div>
      <div className="detail-grid">
        <div className="detail-gallery">
          <div className="detail-gallery-main">
            <img src={images[activeImage]} alt={product.title} />
          </div>
          {images.length > 1 && (
            <div className="detail-gallery-thumbs">
              {images.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  className={i === activeImage ? 'is-active' : ''}
                  onClick={() => setActiveImage(i)}
                  aria-label={`View image ${i + 1}`}
                >
                  <img src={src} alt="" />
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="detail-info">
          <h1>{product.title}</h1>
          <div className="detail-pricerow">
            <span className="detail-price">${product.price.toFixed(2)}</span>
            <StarRating value={product.rating} size="md" />
          </div>
          <dl className="detail-attributes">
            <div>
              <dt>Brand:</dt>
              <dd>{product.brand ?? '—'}</dd>
            </div>
            <div>
              <dt>Category:</dt>
              <dd>{product.category}</dd>
            </div>
          </dl>
          <hr className="detail-divider" />
          <section>
            <h2 className="detail-section-title">Description</h2>
            <p className="detail-description">{product.description}</p>
          </section>
          <hr className="detail-divider" />
          <section>
            <h2 className="detail-section-title">Reviews</h2>
            {reviews.length === 0 ? (
              <p className="detail-empty">No reviews yet.</p>
            ) : (
              <ul className="reviews">
                {reviews.map((r, i) => (
                  <li key={`${r.reviewerEmail}-${i}`} className="review">
                    <div className="review-head">
                      <span className="review-name">{r.reviewerName}</span>
                      <StarRating value={r.rating} />
                    </div>
                    <p className="review-comment">{r.comment}</p>
                  </li>
                ))}
              </ul>
            )}


          </section>
        </div>
      </div>
    </article>
  )
}
