import { StarRating } from './StarRating'

import type { Review } from '../types/product'

interface Props {
  reviews?: Review[]
}

export function ReviewsSection({
  reviews,
}: Props) {
  if (!reviews || reviews.length === 0) {
    return (
      <section className="reviews">
        <h2>Reviews</h2>

        <p>No reviews available.</p>
      </section>
    )
  }

  return (
    <section className="reviews">
      <h2>
        Reviews ({reviews.length})
      </h2>

      <div className="reviews-list">
        {reviews.map(
          (review, index) => (
            <article
              key={index}
              className="review-card"
            >
              <header className="review-header">
                <div>
                  <h3>
                    {
                      review.reviewerName
                    }
                  </h3>

                  <p className="review-email">
                    {
                      review.reviewerEmail
                    }
                  </p>
                </div>

                <StarRating
                  value={
                    review.rating
                  }
                  showValue={
                    false
                  }
                />
              </header>

              <p className="review-comment">
                {
                  review.comment
                }
              </p>

              <time className="review-date">
                {new Date(
                  review.date
                ).toLocaleDateString()}
              </time>
            </article>
          )
        )}
      </div>
    </section>
  )
}