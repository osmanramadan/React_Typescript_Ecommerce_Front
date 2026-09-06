import { useNavigate } from 'react-router-dom'
import styles from './styles.module.css'

const { summary, checkoutBtn } = styles

interface CartSubtotalProps {
  totalPrice: number
}

const CartSubtotal = ({ totalPrice }: CartSubtotalProps) => {
  const navigate = useNavigate()

  return (
    <div className={summary}>
      <h3>Total: ${totalPrice.toFixed(2)}</h3>

      <button className={checkoutBtn} onClick={() => navigate('/payment')}>
        Proceed to Checkout
      </button>
    </div>
  )
}

export default CartSubtotal
