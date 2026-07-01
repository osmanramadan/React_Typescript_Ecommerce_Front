import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ProductItem from '@components/ecommerce/Product/Product'
import styles from './styles.module.css'
import Loading from '@components/message/Loading/Loading'
import { CATEGORIES } from '@data/categories'
import GridList from '@components/shared/GridList/GridList'
import { useProduct } from '@hooks/useProduct'

const { page, breadcrumb, toolbar, resultCount, sortSelect, empty, navlinks } = styles

const Products = () => {
  const { loading, sortedProducts, sortBy, setSortBy, error, category } = useProduct()

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
          <GridList
            records={sortedProducts}
            renderItem={(record) => <ProductItem key={record.id} product={record} />}
          />
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
