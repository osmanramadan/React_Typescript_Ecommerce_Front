import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '@api/axios'
import type { RootState } from '@store/index'
import type { IOrder } from '@types'
import { getAxiosErrorMessage } from '@/utils/axiosError'

const ActGetOrders = createAsyncThunk<IOrder[], void, { rejectValue: string }>(
  'orders/ActGetOrders',
  async (_, thunkAPI) => {
    const { rejectWithValue, getState, signal } = thunkAPI
    const { auth } = getState() as RootState

    if (!auth.user?.id) {
      return []
    }

    try {
      const res = await axiosInstance.get<IOrder[]>(`/orders?userId=${auth.user.id}`, { signal })
      return res.data
    } catch (error) {
      return rejectWithValue(getAxiosErrorMessage(error))
    }
  }
)

export default ActGetOrders
