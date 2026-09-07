import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '@api/axios'
import type { RootState } from '@store/index'
import type { IProduct } from '@types'
import { getAxiosErrorMessage } from '@/utils/axiosError'

const normalizeProduct = (product: any): IProduct => ({
  ...product,
  price: Number(product.price),
  rating: Number(product.rating ?? 0),
  reviewCount: Number(product.review_count ?? product.reviewCount ?? 0),
  numInStock: Number(product.num_in_stock ?? product.numInStock ?? 0),
  inStock: product.in_stock ?? product.inStock ?? true,
})

const ActGetWishlistProducts = createAsyncThunk('wishlist/ActGetWishlist', async (_, thunkAPI) => {
  const { rejectWithValue, getState, signal } = thunkAPI

  const { auth } = getState() as RootState

  if (!auth.user?.id) {
    return []
  }

  try {
    const userWishlist = await axiosInstance.get<{ productId?: number; product_id?: number }[]>(
      `/wishlist?userId=${auth.user.id}`,
      { signal }
    )

    const productIds = userWishlist.data
      .map((item) => Number(item.productId ?? item.product_id))
      .filter((id) => Number.isFinite(id))

    if (!productIds.length) {
      return []
    }

    const queryString = productIds.map((id) => `id=${id}`).join('&')
    const res = await axiosInstance.get<any[]>(`/products?${queryString}`, { signal })

    return res.data.map(normalizeProduct)
  } catch (error) {
    return rejectWithValue(getAxiosErrorMessage(error))
  }
})

export default ActGetWishlistProducts
