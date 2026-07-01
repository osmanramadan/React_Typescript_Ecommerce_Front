import { createAsyncThunk } from '@reduxjs/toolkit'
import type { IProduct } from '@types'
import axiosInstance from '@api/axios'
import { getAxiosErrorMessage } from '@/utils/axiosError'

const ActGetProducts = createAsyncThunk(
  'products/ActGetProducts',
  async (cat: string, thunkAPI) => {
    const { rejectWithValue, signal } = thunkAPI

    try {
      let res

      if (cat) {
        res = await axiosInstance.get<IProduct[]>(`/products?category=${cat}`, { signal })
      } else {
        res = await axiosInstance.get<IProduct[]>(`/products`, { signal })
      }
      return res.data
    } catch (error) {
      return rejectWithValue(getAxiosErrorMessage(error))
    }
  }
)

export default ActGetProducts
