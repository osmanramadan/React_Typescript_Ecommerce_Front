import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '@api/axios'
import type { RootState } from '@store/index'
import type { IOrder } from '@types'
import { getAxiosErrorMessage } from '@/utils/axiosError'

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

const ActGetOrders = createAsyncThunk<IOrder[], void, { rejectValue: string }>(
  'orders/ActGetOrders',
  async (_, thunkAPI) => {
    const { rejectWithValue, getState, signal } = thunkAPI
    const { auth } = getState() as RootState

    if (!auth.user?.id) {
      return []
    }

    try {
      const res = await axiosInstance.get<unknown[]>(`/orders?userId=${auth.user.id}`, { signal })
      return res.data.map((order) => normalizeOrder(order as Partial<IOrder>))
    } catch (error) {
      return rejectWithValue(getAxiosErrorMessage(error))
    }
  }
)

export default ActGetOrders
