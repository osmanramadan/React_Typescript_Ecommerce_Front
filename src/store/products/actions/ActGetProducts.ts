import { createAsyncThunk } from '@reduxjs/toolkit'
import type { IProduct } from '@types'
import axiosInstance from '@api/axios'
import { getAxiosErrorMessage } from '@/utils/axiosError'

const normalizeProduct = (product: any): IProduct => ({
  ...product,
  price: Number(product.price),
  rating: Number(product.rating ?? 0),
  reviewCount: Number(product.review_count ?? product.reviewCount ?? 0),
  numInStock: Number(product.num_in_stock ?? product.numInStock ?? 0),
  inStock: product.in_stock ?? product.inStock ?? true,
})

const ActGetProducts = createAsyncThunk(
  'products/ActGetProducts',
  async (cat: string, thunkAPI) => {
    const { rejectWithValue, signal } = thunkAPI

    try {
      let res

      if (cat) {
        res = await axiosInstance.get<any[]>(`/products?category=${cat}`, { signal })
      } else {
        res = await axiosInstance.get<any[]>(`/products`, { signal })
      }

      return res.data.map(normalizeProduct)
    } catch (error) {
      return rejectWithValue(getAxiosErrorMessage(error))
    }
  }
)

export default ActGetProducts
