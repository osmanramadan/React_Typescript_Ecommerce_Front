import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '@api/axios'
import type { RootState } from '@store/index'
import type { IOrder } from '@types'
import { getAxiosErrorMessage } from '@/utils/axiosError'

export interface PlaceOrderPayload {
  userId: number | null
  items: Array<{
    productId: number
    name: string
    quantity: number
    price: number
    image?: string
  }>
  total: number
}

const ActPlaceOrder = createAsyncThunk<IOrder, PlaceOrderPayload, { rejectValue: string }>(
  'orders/ActPlaceOrder',
  async (payload, thunkAPI) => {
    const { rejectWithValue, getState, signal } = thunkAPI
    const { auth } = getState() as RootState

    const userId = auth.user?.id ?? payload.userId ?? null
    const newOrder: IOrder = {
      id: Date.now(),
      userId,
      items: payload.items,
      total: payload.total,
      createdAt: new Date().toISOString(),
      status: 'pending',
    }

    try {
      const res = await axiosInstance.post<IOrder>('/orders', newOrder, { signal })
      return res.data
    } catch (error) {
      return rejectWithValue(getAxiosErrorMessage(error))
    }
  }
)

export default ActPlaceOrder
