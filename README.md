# Leegality Store

A modern Amazon-style product browsing application built using the public DummyJSON Products API for the Leegality Frontend Assessment.

The application includes:

* Product Listing Page
* Product Detail Page
* Dynamic multi-filter system
* URL-synced filters
* Product reviews
* Responsive UI
* Pagination
* Search
* Dynamic faceted filtering (Amazon/Flipkart-style)

The app is designed with scalable frontend architecture, reusable hooks, typed APIs, and performant client-side filtering.

---

# Live Features

## Product Listing Page

* Product grid with pagination
* Search products
* Multi-category filtering
* Multi-brand filtering
* Price range filtering
* Dynamic filter dependencies
* URL-synced filters
* Responsive layout
* Loading and error states

## Product Detail Page

* Product image gallery
* Product information
* Ratings with SVG stars
* Reviews section
* Reviewer details
* Back-navigation state preservation

---

# Tech Stack

* React 19
* TypeScript
* Vite
* React Router DOM v7
* Functional Components + Hooks
* Plain CSS
* DummyJSON API

---

# Setup Instructions

## Clone the project

```bash
git clone <repository-url>
```

## Install dependencies

```bash
npm install
```

## Start development server

```bash
npm run dev
```

Application runs on:

```txt
http://localhost:5173
```

## Production build

```bash
npm run build
```

## Preview production build

```bash
npm run preview
```

---

# API Endpoints Used

```txt
GET /products?limit=0

GET /products/categories

GET /products/search?q=...

GET /products/:id
```

---

# Project Structure

```txt
src/
  api/
    products.ts

  hooks/
    useFilters.ts
    useProducts.ts

  components/
    ProductCard.tsx
    ProductGrid.tsx
    Pagination.tsx
    Loader.tsx
    ErrorState.tsx
    StarRating.tsx
    ReviewsSection.tsx

    filters/
      FiltersPanel.tsx
      SidebarSearch.tsx
      CategoryFilter.tsx
      BrandFilter.tsx
      PriceFilter.tsx

  pages/
    ProductListPage.tsx
    ProductDetailPage.tsx

  types/
    product.ts

  App.tsx
  main.tsx
  index.css
```

---

# Architectural Decisions

## Frontend Filtering Strategy

DummyJSON does not support:

* Multi-category filtering
* Combined category + search filtering
* Combined brand + category filtering

To solve this properly:

* Products are fetched once
* Filtering is handled client-side
* Pagination is handled client-side

This provides:

* Accurate counts
* Better UX
* Faster interactions
* Easier scalability

---

## Dynamic Faceted Filtering

Filters dynamically react to each other.

### Example

If category = `Laptops`

Then brands automatically become:

* Apple
* Dell
* HP
* Lenovo

Other unrelated brands are hidden.

Likewise:

If brand = `Apple`

Then categories dynamically become:

* Laptops
* Smartphones
* Tablets

This behavior matches modern ecommerce systems like:

* Amazon
* Flipkart
* Myntra

---

## URL-Synced Filters

All filters persist inside the URL:

```txt
?category=laptops&brands=Apple,Dell&page=2
```

Benefits:

* Shareable URLs
* Back navigation persistence
* Reload-safe state
* Better UX

---

## In-Memory Caching

Products and categories are cached in-memory to reduce unnecessary API calls.

---

## Typed URL Filters

Filters are managed using:

```ts
useSearchParams()
```

wrapped inside a custom hook:

```ts
useFilters()
```

This ensures:

* Type safety
* Clean URL handling
* Easy scalability

---

# Assumptions Made

* DummyJSON product dataset is small enough for efficient client-side filtering.
* Product categories and brands are relatively stable.
* Some products may not contain brand information.
* Internet connection is reasonably reliable.
* URL-based filter persistence is preferred over global state management.
* Pagination size is fixed to maintain consistent UI.
* Search results from DummyJSON are sufficient for the assessment scope.

---

# Reviews System

Each product detail page displays:

* Reviewer name
* Reviewer email
* Star rating
* Review comment
* Review date

---

# Performance Optimizations

* In-memory caching
* Client-side filtering
* Debounced price filters
* Efficient Set-based filtering
* Reusable hooks
* Minimal re-renders

---

# Error Handling

* API failure states
* Retry actions
* Invalid product routes
* Empty states
* Graceful fallbacks

---

# Accessibility

* Semantic HTML
* Keyboard-friendly filters
* Accessible form controls
* SVG rating accessibility labels

---

# Improvements If Given More Time

* Product sorting (price, rating, newest)
* Wishlist / favorites system
* Dark mode support
* Skeleton loaders
* Product comparison functionality
* Recently viewed products
* React Query / SWR integration
* Unit testing with Vitest
* Component testing with React Testing Library
* E2E testing with Cypress or Playwright
* Lazy loading and route-based code splitting
* Infinite scrolling
* Better animations and micro-interactions
* Offline support with service workers
* Better accessibility audit
* SEO optimization and metadata improvements

---

# Why This Project Stands Out

This project demonstrates:

* Real-world React architecture
* Advanced filtering systems
* URL state management
* TypeScript usage
* Dynamic UI behavior
* Component reusability
* Scalable frontend patterns
* API integration strategies
* Ecommerce UI/UX concepts

---

# Author

Frontend Developer Assessment Project

Built with React + TypeScript + Vite
