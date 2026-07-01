import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ProductItem from '@components/ecommerce/Product/Product'
import GridList from '@components/shared/GridList/GridList'
import Loading from '@components/message/Loading/Loading'
import { useWishlist } from '@hooks/useWishlist'
import styles from './styles.module.css'

const { page, toolbar, resultCount, sortSelect, empty } = styles

export default function Wishlist() {
  const { loading, error, sortedProducts, sortBy, setSortBy } = useWishlist()

  return (
    <Container className={page}>
      <Loading status={loading} error={error} type="wishlist">
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
            <p>No liked products found yet.</p>
            <Link to="/products">Browse all products</Link>
          </div>
        )}
      </Loading>
    </Container>
  )
}
