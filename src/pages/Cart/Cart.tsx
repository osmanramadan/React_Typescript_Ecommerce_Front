import { Container } from 'react-bootstrap'
import styles from './styles.module.css'
import CartItem from '@components/ecommerce/Cart/CartItem'
import CartSubtotal from '@components/ecommerce/Cart/CartSubTotal'
import Loading from '@components/message/Loading/Loading'
import { Link } from 'react-router-dom'
import { useCart } from '@hooks/useCart'

const { page, header, title, subtitle, empty } = styles

const CartPage = () => {
  const { productsFullData, loading, error, items, totalPrice, rmItemFromCart, changeQuantity } =
    useCart()

  return (
    <Container className={page}>
      <Loading error={error} status={loading} type="cart">
        <div className={header}>
          <h1 className={title}>Shopping Cart</h1>
          <p className={subtitle}>Review your items before checkout</p>
        </div>

        {productsFullData && productsFullData.length > 0 ? (
          productsFullData.map((product) => (
            <CartItem
              key={product.id}
              product={product}
              quantityValue={items[product.id]}
              rmCartItem={rmItemFromCart}
              changeQuantity={changeQuantity}
            />
          ))
        ) : (
          <div className={empty}>
            <p>Your cart is empty.</p>
            <Link to="/products">Continue Shopping</Link>
          </div>
        )}

        <CartSubtotal totalPrice={totalPrice} />
      </Loading>
    </Container>
  )
}

export default CartPage
