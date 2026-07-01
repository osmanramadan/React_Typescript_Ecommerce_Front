import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { ActGetProducts, ClearProducts } from '@store/products/ProductsSlice'
import type { IProduct } from '@types'

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating'

export function useProduct() {
  const param = useParams()
  const dispatch = useAppDispatch()

  const { loading, records, error } = useAppSelector((state) => state.products)

  useEffect(() => {
    const promise = dispatch(ActGetProducts(param.prefex ?? ''))

    return () => {
      promise.abort()
      dispatch(ClearProducts())
    }
  }, [dispatch, param.prefex])

  const products: IProduct[] = records.length > 0 ? records : []

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
    records,
    error,
    products,
    sortedProducts,
    sortBy,
    setSortBy,
    category: param.prefex ?? '',
  }
}
