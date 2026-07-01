import { createAsyncThunk } from '@reduxjs/toolkit'
import type { ICategory } from '@types'
import axiosInstance from '@api/axios'
import { getAxiosErrorMessage } from '@/utils/axiosError'

const ActGetCategories = createAsyncThunk('categories/ActGetCategories', async (_, thunkAPI) => {
  const { rejectWithValue, signal } = thunkAPI

  try {
    const res = await axiosInstance.get<ICategory[]>('/categories', { signal })
    return res.data
  } catch (error) {
    return rejectWithValue(getAxiosErrorMessage(error))
  }
})

export default ActGetCategories
