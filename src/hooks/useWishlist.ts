import { useEffect, useMemo, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { ActGetWishlistProducts, ClearWishlist } from '@store/wishlist/wishlistSlice'
import type { IProduct } from '@types'

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating'

export function useWishlist() {
  const dispatch = useAppDispatch()
  const { productsFullData, loading, error } = useAppSelector((state) => state.wishlist)

  useEffect(() => {
    const promise = dispatch(ActGetWishlistProducts())

    return () => {
      promise.abort()
      dispatch(ClearWishlist())
    }
  }, [dispatch])

  const products: IProduct[] = productsFullData.length > 0 ? productsFullData : []

  const [sortBy, setSortBy] = useState<SortOption>('featured')

  const sortedProducts = useMemo(() => {
    const list = [...products]
    switch (sortBy) {
      case 'price-asc':
        return list.sort((a, b) => a.price - b.price)
      case 'price-desc':
        return list.sort((a, b) => b.price - a.price)
      case 'rating':
        return list.sort((a, b) => b.rating - a.rating)
      default:
        return list
    }
  }, [products, sortBy])

  return {
    loading,
    error,
    products,
    sortedProducts,
    sortBy,
    setSortBy,
  }
}
