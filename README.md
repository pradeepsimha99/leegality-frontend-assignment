# Leegality Store

A small Amazon-style product browsing app built against the public [DummyJSON Products API](https://dummyjson.com/docs/products) for the Leegality frontend assessment.

Two screens — a Product Listing page with text search, category, price-range and brand filters plus pagination, and a Product Detail page (with image gallery and reviews) reachable via `/product/:id`. Filters are encoded in the URL so they are shareable, reload-safe, and restored automatically when the user navigates back from the detail page.

## Stack

- **React 19** (functional components + hooks) with the React Compiler enabled
- **TypeScript 6**
- **Vite 8** for dev server and build
- **react-router-dom v7** for routing
- Plain CSS (no UI library) — kept the bundle small and the styling explicit

## Setup

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build
npm run lint
npm run preview  # serve the built bundle
```

No environment variables required — the app talks directly to `https://dummyjson.com`.

## Project structure

```
src/
  api/products.ts            # fetch helpers + per-category in-memory cache
  types/product.ts           # Product, Category, ProductsResponse
  hooks/
    useFilters.ts            # typed wrapper over useSearchParams
    useProducts.ts           # loads products for the current category
  components/
    ProductCard.tsx
    ProductGrid.tsx
    Pagination.tsx
    Loader.tsx
    ErrorState.tsx
    SiteHeader.tsx           # navy app bar with search + nav icons
    StarRating.tsx           # SVG star rating (full / half / empty)
    filters/
      FiltersPanel.tsx
      SidebarSearch.tsx
      CategoryFilter.tsx
      PriceFilter.tsx
      BrandFilter.tsx
  pages/
    ProductListPage.tsx
    ProductDetailPage.tsx
  App.tsx                    # router + layout shell
  main.tsx
  index.css                  # global styles + design tokens
```

## Architectural decisions

1. **Filters live in the URL** (`useSearchParams`).
   The spec requires that filters survive navigation back from the detail page. Putting filter state in the URL solves this for free — the listing's URL itself encodes `?category=…&min=…&max=…&brands=a,b&page=2`. Browser back from `/product/:id` restores the listing exactly as it was; reload also works; and the listing is shareable.

2. **Fetch-once-per-category, filter and paginate client-side.**
   DummyJSON only supports `limit`/`skip` and category filtering server-side; price and brand filtering have to happen on the client. Doing pagination server-side while filtering client-side leads to "page 3 is empty because everything got filtered out" — counts become dishonest. Instead, on category change we issue a single `?limit=0` request (cached in a module-level `Map`), then apply price + brand + pagination in the browser. The dataset is ~200 products so this is fast and gives correct counts.

   When the search box is used, we hit `GET /products/search?q=…&limit=0` instead. The category selection is then applied client-side on top of the search results, since the API does not let you combine the two server-side.

3. **Brand options are derived from the currently fetched product set** — i.e. they reflect the active category but ignore the active price and brand selections themselves. This keeps the option list stable while the user is interacting with it.

4. **Price input is debounced (300ms)** before being written back to the URL, so typing doesn't spam history entries.

5. **Detail page fetches by id directly** rather than reading from the listing's data, so deep links to `/product/:id` work even on first load. The Back button uses `navigate(-1)` so it relies on browser history (which preserves the listing's URL params).

6. **No data-fetching library.** The data flow is small enough that two custom hooks (`useFilters`, `useProducts`) over `fetch` are clearer than introducing React Query / SWR. Likewise no global store — URL + local component state cover the needs.

## Assumptions

- DummyJSON's category list is small enough (~24 categories) to render without grouping or search.
- Some products have no `brand` — those are included in results but excluded from the brand option list and bypassed by an active brand filter.
- Page size is fixed at **8 items**. Changing categories or any filter resets to page 1.
- Cache is in-memory only — products are refetched per category on full page reload, which is acceptable given the small dataset.
- Network is assumed to be reasonably reliable; on failure the user sees an error state with a retry button rather than automatic retries.

## Verification checklist

- Open `/`, pick a category → grid updates, brand options change, page resets, URL gains `?category=…`.
- Set min=100, max=500 → only in-range products show, URL updates after a brief debounce.
- Tick multiple brands → only those brands are shown, page resets to 1.
- Click a product → detail page loads with image gallery, title, brand, category, rating, price, description.
- Press **Back** from the detail page → listing returns with all filters and current page intact.
- Reload the listing with filters in the URL → state is restored.
- Visit a bad id like `/product/999999` → error state with retry; bad route → 404.

## Improvements if given more time

- **Sort controls** — by price asc/desc and rating, alongside the filters.
- **Search input** with debounced server-side `?q=…` querying, combined with the existing filters.
- **Skeleton loaders** for cards and the detail layout instead of a single spinner.
- **Image lightbox / zoom** on the detail page gallery.
- **Saved-views** or a recently-viewed list (using `localStorage`).
- **Tests** — unit tests for `useFilters` URL round-tripping and the filter pipeline (`applyFilters`); component tests with React Testing Library; API mocking via MSW.
- **Error boundary** at the route level for unexpected render-time crashes.
- **Accessibility pass** — verified focus management on route changes, screen-reader audit of filter interactions, prefers-reduced-motion handling for the spinner.
- **Code splitting** — lazy-load the detail page via `React.lazy`.
- **Polish** — proper meta tags / OG images, dark mode tokens (already structured to allow it), an empty-favorites state, etc.
