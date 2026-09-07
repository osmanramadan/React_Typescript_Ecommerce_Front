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

const normalizeOrder = (order: Partial<IOrder> & Record<string, unknown>): IOrder => ({
  id: typeof order.id === 'number' ? order.id : undefined,
  userId:
    typeof order.userId === 'number'
      ? order.userId
      : typeof order.user_id === 'number'
        ? order.user_id
        : null,
  items: Array.isArray(order.items) ? order.items : [],
  total: Number(order.total ?? 0),
  createdAt: (order.createdAt as string) ?? (order.created_at as string) ?? new Date().toISOString(),
  status: (order.status as IOrder['status']) ?? 'pending',
})

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
      const res = await axiosInstance.post<unknown>('/orders', newOrder, { signal })
      return normalizeOrder(res.data as Partial<IOrder>)
    } catch (error) {
      return rejectWithValue(getAxiosErrorMessage(error))
    }
  }
)

export default ActPlaceOrder
