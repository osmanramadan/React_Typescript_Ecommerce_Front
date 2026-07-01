import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '@api/axios'
import type { RootState } from '@store/index'
import type { IProduct } from '@types'
import { getAxiosErrorMessage } from '@/utils/axiosError'

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

      const res = await axiosInstance.get<IProduct[]>(`/products?${mixedItemsId}`, { signal })

      return res.data
    } catch (error) {
      return rejectWithValue(getAxiosErrorMessage(error))
    }
  }
)

export default ActGetCart
