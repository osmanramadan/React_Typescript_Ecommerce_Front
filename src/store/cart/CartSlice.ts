import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { ICartState } from '@types'
import ActGetCart from './actions/ActCart'

const initialState: ICartState = {
  items: {},
  productsFullData: [],
  error: null,
  loading: 'idle',
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCartItem: (state, action) => {
      const id = action.payload.id
      if (state.items[id]) {
        state.items[id]++
      } else {
        state.items[id] = 1
      }
    },

    ClearCart: (state) => {
      state.productsFullData = []
    },

    rmCartItem: (state, action) => {
      const id = action.payload.id
      delete state.items[id]
      state.productsFullData = state.productsFullData.filter((p) => p.id !== id)
    },
    changeCartItemQuantity: (state, action: PayloadAction<{ id: number; type: 'inc' | 'dec' }>) => {
      const { id, type } = action.payload
      if (type === 'inc') {
        state.items[id]++
      } else {
        if (state.items[id] > 1) {
          state.items[id]--
        }
      }
    },
  },

  extraReducers: (builder) => {
    ;(builder.addCase(ActGetCart.pending, (state) => {
      ;((state.loading = 'pending'), (state.error = null))
    }),
      builder.addCase(ActGetCart.fulfilled, (state, action) => {
        ;((state.loading = 'succeeded'), (state.productsFullData = action.payload))
      }),
      builder.addCase(ActGetCart.rejected, (state, action) => {
        state.loading = 'failed'

        if (action.payload && typeof action.payload === 'string') {
          state.error = action.payload
        }
      }))
  },
})

export { ActGetCart }
export const { addCartItem, rmCartItem, changeCartItemQuantity, ClearCart } = cartSlice.actions
export default cartSlice.reducer
