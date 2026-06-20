import Cart from "../../../assets/svg/cart.svg?react"
import styles from './styles.module.css'

interface BasketProps {
  itemCount?: number
  onClick?: () => void
}

const Basket = ({ itemCount = 0, onClick }: BasketProps) => {
  return (
    <button
      type="button"
      className={styles.cartIcon}
      onClick={onClick}
      aria-label={`Basket, ${itemCount} item${itemCount === 1 ? '' : 's'}`}
    >
      <Cart className={styles.cartSvg} />
          {itemCount > 0 && (<span className={styles.badge}>{itemCount > 99 ? '99+' : itemCount}</span>)}
    </button>
  )
}

export default Basket