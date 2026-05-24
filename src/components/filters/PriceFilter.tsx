import { useEffect, useState } from 'react'

interface Props {
  min: number | null
  max: number | null
  onChange: (min: number | null, max: number | null) => void
}

function toInput(n: number | null): string {
  return n === null ? '' : String(n)
}

function fromInput(value: string): number | null {
  if (value === '') return null
  const n = Number(value)
  return Number.isFinite(n) && n >= 0 ? n : null
}

export function PriceFilter({ min, max, onChange }: Props) {
  const [localMin, setLocalMin] = useState(toInput(min))
  const [localMax, setLocalMax] = useState(toInput(max))
  // Track the props we last synced from so we can reset local state when the
  // URL changes externally (e.g. "Clear all"). Using the during-render setState
  // pattern avoids the react-hooks/set-state-in-effect violation.
  const [syncedMin, setSyncedMin] = useState(min)
  const [syncedMax, setSyncedMax] = useState(max)

  if (syncedMin !== min) {
    setSyncedMin(min)
    setLocalMin(toInput(min))
  }
  if (syncedMax !== max) {
    setSyncedMax(max)
    setLocalMax(toInput(max))
  }

  useEffect(() => {
    const nextMin = fromInput(localMin)
    const nextMax = fromInput(localMax)
    if (nextMin === min && nextMax === max) return
    const handle = window.setTimeout(() => {
      onChange(nextMin, nextMax)
    }, 300)
    return () => window.clearTimeout(handle)
  }, [localMin, localMax, min, max, onChange])

  return (
    <div className="filter">
      <fieldset>
        <legend>Price Range</legend>
        <div className="filter-price-row">
          <input
            type="number"
            inputMode="numeric"
            min={0}
            placeholder="Min"
            value={localMin}
            onChange={(e) => setLocalMin(e.target.value)}
            aria-label="Minimum price"
          />
          <input
            type="number"
            inputMode="numeric"
            min={0}
            placeholder="Max"
            value={localMax}
            onChange={(e) => setLocalMax(e.target.value)}
            aria-label="Maximum price"
          />
        </div>
      </fieldset>
    </div>
  )
}
