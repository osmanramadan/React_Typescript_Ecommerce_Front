import Cart from '@assets/svg/cart.svg?react'
import styles from './styles.module.css'
import { useAppSelector } from '@store/hooks'
import { cartItemsCount } from '@store/cart/selector'
import { useNavigate } from 'react-router-dom'

const Basket = () => {
  const navigate = useNavigate()

  let itemCount = useAppSelector(cartItemsCount)

  return (
    <button
      type="button"
      className={styles.cartIcon}
      onClick={() => navigate('/cart')}

      aria-label={`Basket, ${itemCount} item${itemCount === 1 ? '' : 's'}`}
    >
      <Cart className={styles.cartSvg} />
      {itemCount > 0 && <span className={styles.badge}>{itemCount}</span>}
    </button>
  )
}

export default Basket
