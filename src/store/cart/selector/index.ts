import type { RootState } from '@store/index'
import { createSelector } from '@reduxjs/toolkit'

const cartItemsCount = createSelector(
  (state: RootState) => state.cart.items,
  (items) => {
    return Object.values(items).reduce((total, quantity) => total + quantity, 0)
  }
)

export { cartItemsCount }
