import { useCallback, useEffect, useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { ActGetCart, ClearCart, rmCartItem, changeCartItemQuantity } from '@store/cart/CartSlice'
import type { IProduct } from '@types'

export function useCart() {
  const dispatch = useAppDispatch()
  const { productsFullData, loading, error } = useAppSelector((state) => state.cart)
  const items = useAppSelector((state) => state.cart.items)

  useEffect(() => {
    const promise = dispatch(ActGetCart())

    return () => {
      promise.abort()
      dispatch(ClearCart())
    }
  }, [dispatch])

  const rmItemFromCart = useCallback(
    (id: number) => {
      dispatch(rmCartItem({ id }))
    },
    [dispatch]
  )

  const changeQuantity = useCallback(
    (id: number, type: 'inc' | 'dec') => {
      dispatch(changeCartItemQuantity({ id, type }))
    },
    [dispatch]
  )

  const totalPrice = useMemo(() => {
    if (!productsFullData || productsFullData.length === 0) return 0
    return productsFullData.reduce((total: number, product: IProduct) => {
      const quantity = items[product.id] ?? 0
      return total + product.price * quantity
    }, 0)
  }, [productsFullData, items])

  return {
    productsFullData,
    loading,
    error,
    items,
    totalPrice,
    rmItemFromCart,
    changeQuantity,
  }
}
