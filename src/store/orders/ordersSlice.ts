import { createSlice } from '@reduxjs/toolkit'
import type { IOrder, IOrderState } from '@types'
import ActGetOrders from './actions/ActGetOrders'
import ActPlaceOrder from './actions/ActPlaceOrder'

const sortOrdersByNewestFirst = (orders: IOrder[]) => {
  return [...orders].sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })
}

const initialState: IOrderState = {
  records: [],
  loading: 'idle',
  error: null,
  placing: false,
}

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearOrders: (state) => {
      state.records = []
      state.error = null
      state.loading = 'idle'
      state.placing = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(ActGetOrders.pending, (state) => {
        state.loading = 'pending'
        state.error = null
      })
      .addCase(ActGetOrders.fulfilled, (state, action) => {
        state.loading = 'succeeded'
        state.records = sortOrdersByNewestFirst(action.payload)
      })
      .addCase(ActGetOrders.rejected, (state, action) => {
        state.loading = 'failed'
        if (action.payload && typeof action.payload === 'string') {
          state.error = action.payload
        }
      })
      .addCase(ActPlaceOrder.pending, (state) => {
        state.placing = true
        state.error = null
      })
      .addCase(ActPlaceOrder.fulfilled, (state, action) => {
        state.placing = false
        state.records = sortOrdersByNewestFirst([action.payload, ...state.records])
      })
      .addCase(ActPlaceOrder.rejected, (state, action) => {
        state.placing = false
        if (action.payload && typeof action.payload === 'string') {
          state.error = action.payload
        }
      })
  },
})

export { ActGetOrders, ActPlaceOrder }
export const { clearOrders } = ordersSlice.actions
export default ordersSlice.reducer
