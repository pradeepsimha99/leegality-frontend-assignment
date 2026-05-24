// import type { Category, Product, ProductsResponse } from '../types/product'

// const BASE = 'https://dummyjson.com'

// async function request<T>(url: string): Promise<T> {
//   const res = await fetch(url)
//   if (!res.ok) {
//     throw new Error(`Request failed (${res.status}): ${url}`)
//   }
//   return res.json() as Promise<T>
// }

// const categoryCache = new Map<string, Product[]>()
// const ALL_KEY = '__all__'

// export async function fetchAllProducts(): Promise<Product[]> {
//   const cached = categoryCache.get(ALL_KEY)
//   if (cached) return cached
//   const data = await request<ProductsResponse>(`${BASE}/products?limit=0`)
//   categoryCache.set(ALL_KEY, data.products)
//   return data.products
// }

// export async function fetchByCategory(slug: string): Promise<Product[]> {
//   const cached = categoryCache.get(slug)
//   if (cached) return cached
//   const data = await request<ProductsResponse>(
//     `${BASE}/products/category/${encodeURIComponent(slug)}?limit=0`,
//   )
//   categoryCache.set(slug, data.products)
//   return data.products
// }

// export async function fetchCategories(): Promise<Category[]> {
//   return request<Category[]>(`${BASE}/products/categories`)
// }

// export async function searchProducts(query: string): Promise<Product[]> {
//   const data = await request<ProductsResponse>(
//     `${BASE}/products/search?q=${encodeURIComponent(query)}&limit=0`,
//   )
//   return data.products
// }

// export async function fetchProductById(id: string | number): Promise<Product> {
//   return request<Product>(`${BASE}/products/${id}`)
// }




import type {
  Category,
  Product,
  ProductsResponse,
} from '../types/product'

const BASE = 'https://dummyjson.com'

// Simple memory cache
let productsCache: Product[] | null = null
let categoriesCache: Category[] | null = null

async function request<T>(url: string): Promise<T> {
  const res = await fetch(url)

  if (!res.ok) {
    throw new Error(
      `Request failed (${res.status}): ${url}`
    )
  }

  return res.json() as Promise<T>
}

// Fetch ALL products once
export async function fetchAllProducts(): Promise<Product[]> {
  // Use cache if available
  if (productsCache) {
    return productsCache
  }

  const data = await request<ProductsResponse>(
    `${BASE}/products?limit=0`
  )

  productsCache = data.products

  return data.products
}

// Fetch categories
export async function fetchCategories(): Promise<Category[]> {
  if (categoriesCache) {
    return categoriesCache
  }

  const data = await request<Category[]>(
    `${BASE}/products/categories`
  )

  categoriesCache = data

  return data
}

// Optional search API
// You may NOT need this anymore if searching locally
export async function searchProducts(
  query: string
): Promise<Product[]> {
  const data = await request<ProductsResponse>(
    `${BASE}/products/search?q=${encodeURIComponent(
      query
    )}&limit=0`
  )

  return data.products
}

// Single product details page
export async function fetchProductById(
  id: string | number
): Promise<Product> {
  return request<Product>(
    `${BASE}/products/${id}`
  )
}