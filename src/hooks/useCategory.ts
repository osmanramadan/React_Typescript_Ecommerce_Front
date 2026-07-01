import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { ActGetCategories, ClearCategories } from '@store/categories/CategoriesSlice'

export function useCategory() {
  const dispatch = useAppDispatch()
  const { loading, records, error } = useAppSelector((state) => state.categories)

  useEffect(() => {
    const promise = dispatch(ActGetCategories())

    return () => {
      promise.abort()
      dispatch(ClearCategories())
    }
  }, [dispatch])

  return {
    loading,
    records,
    error,
  }
}
