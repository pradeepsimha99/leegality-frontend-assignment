import { useId } from 'react'

interface Props {
  value: number
  max?: number
  showValue?: boolean
  size?: 'sm' | 'md'
}

function Star({ fill, gradientId }: { fill: 'full' | 'half' | 'empty'; gradientId: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`star star-${fill}`}
      aria-hidden
      focusable="false"
    >
      {fill === 'half' && (
        <defs>
          <linearGradient id={gradientId}>
            <stop offset="50%" stopColor="currentColor" />
            <stop offset="50%" stopColor="transparent" />
          </linearGradient>
        </defs>
      )}
      <path
        fill={fill === 'half' ? `url(#${gradientId})` : 'currentColor'}
        stroke="currentColor"
        strokeWidth="1"
        d="M12 2.5l2.95 5.98 6.6.96-4.78 4.66 1.13 6.58L12 17.77l-5.9 3.1 1.13-6.58L2.45 9.44l6.6-.96L12 2.5z"
      />
    </svg>
  )
}

export function StarRating({
  value,
  max = 5,
  showValue = true,
  size = 'sm',
}: Props) {
  const baseId = useId()
  const stars: ('full' | 'half' | 'empty')[] = []
  for (let i = 1; i <= max; i++) {
    if (value >= i) stars.push('full')
    else if (value >= i - 0.5) stars.push('half')
    else stars.push('empty')
  }

  console.log({ value, stars })

  return (
    <span
      className={`rating rating-${size}`}
      aria-label={`Rated ${value.toFixed(1)} out of ${max}`}
    >
      <span className="rating-stars">
        {stars.map((fill, i) => (
          <Star key={i} fill={fill} gradientId={`${baseId}-${i}`} />
        ))}
      </span>
      {showValue && <span className="rating-value">({value.toFixed(1)})</span>}
    </span>
  )
}
