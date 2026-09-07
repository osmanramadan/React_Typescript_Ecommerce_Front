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

const ActGetCart = createAsyncThunk(
  'cart/ActGetCart',

  async (_, thunkAPI) => {
    const { rejectWithValue, getState, signal } = thunkAPI

    const { cart } = getState() as RootState

    const itemsId = Object.keys(cart.items)
    try {
      if (!itemsId.length) {
        return []
      }

      const mixedItemsId = itemsId
        .map((v) => {
          return `id=${v}`
        })
        .join('&')

      const res = await axiosInstance.get<any[]>(`/products?${mixedItemsId}`, { signal })

      return res.data.map(normalizeProduct)
    } catch (error) {
      return rejectWithValue(getAxiosErrorMessage(error))
    }
  }
)

export default ActGetCart
