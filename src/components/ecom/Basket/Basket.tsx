import Cart from "../../../assets/svg/cart.svg?react"
import styles from './styles.module.css'


const {cartIcon} = styles

const Basket = ()=>{
   return (
    <div className={cartIcon}>
        <Cart/>
   </div>
   )
}

export default Basket
