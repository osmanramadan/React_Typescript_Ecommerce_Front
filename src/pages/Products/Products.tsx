import { useEffect, useMemo, useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ProductItem from '@components/ecommerce/Product/Product'
import styles from './styles.module.css'
import Loading from '@components/message/Loading/Loading'
import { CATEGORIES } from '@data/categories'
import GridList from '@components/shared/GridList/GridList'
import { useProduct } from '@hooks/useProduct'

const { page, breadcrumb, toolbar, resultCount, sortSelect, empty, navlinks } = styles
const PRODUCTS_PER_PAGE = 8

const Products = () => {
  const { loading, sortedProducts, sortBy, setSortBy, error, category } = useProduct()
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    setCurrentPage(1)
  }, [category, sortBy])

  useEffect(() => {
    const totalPages = Math.max(1, Math.ceil(sortedProducts.length / PRODUCTS_PER_PAGE))
    if (currentPage > totalPages) {
      setCurrentPage(totalPages)
    }
  }, [currentPage, sortedProducts.length])

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(sortedProducts.length / PRODUCTS_PER_PAGE)),
    [sortedProducts.length],
  )

  const currentProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE
    return sortedProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE)
  }, [currentPage, sortedProducts])

  return (
    <Container style={{ marginBottom: '200px' }} className={page}>
      <Loading status={loading} error={error} type="product">
        <nav className={breadcrumb} aria-label="Breadcrumb">
          <Link to="/">Home</Link> / <Link to="/products">Shop</Link> / <span>{category}</span>
        </nav>

        <div style={{ display: 'flex', justifyContent: 'center', justifyItems: 'center' }}>
          <ul className={navlinks}>
            {CATEGORIES.map((categoryItem) => (
              <li key={categoryItem.slug}>
                <Link to={`/products/${categoryItem.slug}`}>{categoryItem.slug}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={toolbar}>
          <span className={resultCount}>
            {sortedProducts.length} {sortedProducts.length === 1 ? 'product' : 'products'}
          </span>

          <select
            className={sortSelect}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            aria-label="Sort products"
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>

        {sortedProducts.length > 0 ? (
          <>
            <GridList
              records={currentProducts}
              renderItem={(record) => <ProductItem key={record.id} product={record} />}
            />

            {sortedProducts.length > PRODUCTS_PER_PAGE && (
              <div className="d-flex justify-content-center align-items-center gap-2 mt-4">
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>

                <span className="mx-2">
                  Page {currentPage} of {totalPages}
                </span>

                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className={empty}>
            <p>No products found yet.</p>
          </div>
        )}
      </Loading>
    </Container>
  )
}

export default Products
