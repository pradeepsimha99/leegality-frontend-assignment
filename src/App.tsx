import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import { SiteHeader } from './components/SiteHeader'
import { ProductDetailPage } from './pages/ProductDetailPage'
import { ProductListPage } from './pages/ProductListPage'

function NotFound() {
  return (
    <div className="not-found">
      <h1>404</h1>
      <p>This page doesn't exist.</p>
      <Link to="/" className="back-button">← Back to products</Link>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <SiteHeader />
      <div className="site-main">
        <Routes>
          <Route path="/" element={<ProductListPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
