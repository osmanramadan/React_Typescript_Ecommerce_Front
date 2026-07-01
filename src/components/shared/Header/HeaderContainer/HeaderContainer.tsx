import Cart from '@assets/svg/cart.svg?react'
import Heart from '@assets/svg/heart.svg?react'

import { useAppSelector } from '@store/hooks'
import { cartItemsCount } from '@store/cart/selector'
import HeaderCounter from '../HeaderCounter/HeaderCounter'
import styles from './styles.module.css'

const { rightSideContainer } = styles

export default function HeaderContainer() {
  let itemCount = useAppSelector(cartItemsCount)
  const wishlistCount = useAppSelector((state) => state.wishlist.itemsId.length)

  return (
    <div className={rightSideContainer}>
      <HeaderCounter toPage="wishlist" itemCount={wishlistCount} icon={Heart} />
      <HeaderCounter toPage="cart" itemCount={itemCount} icon={Cart} />
    </div>
  )
}
