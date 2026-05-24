import { useEffect, useState } from 'react'

import {
  fetchAllProducts,
  searchProducts,
} from '../api/products'

import type { Product } from '../types/product'

interface State {
  products: Product[]
  error: string | null
  loadedKey: string | null
}

interface Args {
  query: string
}

export function useProducts({
  query,
}: Args) {
  const [reloadKey, setReloadKey] =
    useState(0)

  const [state, setState] = useState<State>({
    products: [],
    error: null,
    loadedKey: null,
  })

  const requestKey = `${query}|${reloadKey}`

  useEffect(() => {
    let cancelled = false

    // IMPORTANT:
    // We now fetch ALL products and
    // do category/brand filtering locally

    const promise = query
      ? searchProducts(query)
      : fetchAllProducts()

    promise
      .then((products) => {
        if (cancelled) return

        setState({
          products,
          error: null,
          loadedKey: requestKey,
        })
      })
      .catch((err: unknown) => {
        if (cancelled) return

        const message =
          err instanceof Error
            ? err.message
            : 'Failed to load products'

        setState({
          products: [],
          error: message,
          loadedKey: requestKey,
        })
      })

    return () => {
      cancelled = true
    }
  }, [requestKey, query])

  return {
    products: state.products,

    error: state.error,

    loading:
      state.loadedKey !== requestKey,

    refetch: () =>
      setReloadKey((k) => k + 1),
  }
}