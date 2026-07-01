import { createSlice } from '@reduxjs/toolkit'
import ActGetWishlistProducts from './actions/ActGetWishlistProducts'
import type { IWishlistState } from '@types'

const initialState: IWishlistState = {
  itemsId: [],
  productsFullData: [],
  loading: 'idle',
  error: null,
}

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    ToggleWishlistLike: (state, action) => {
      const id = action.payload.id

      if (state.itemsId.includes(id)) {
        state.itemsId = state.itemsId.filter((e) => e != id)
        state.productsFullData = state.productsFullData.filter((e) => e.id != id)
      } else {
        state.itemsId.push(id)
      }
    },
    ClearWishlist: (state) => {
      state.productsFullData = []
    },
  },

  extraReducers: (builder) => {
    ;(builder.addCase(ActGetWishlistProducts.pending, (state) => {
      ;((state.loading = 'pending'), (state.error = null))
    }),
      builder.addCase(ActGetWishlistProducts.fulfilled, (state, action) => {
        ;((state.loading = 'succeeded'), (state.productsFullData = action.payload))
      }),
      builder.addCase(ActGetWishlistProducts.rejected, (state, action) => {
        state.loading = 'failed'

        if (action.payload && typeof action.payload === 'string') {
          state.error = action.payload
        }
      }))
  },
})
export const { ClearWishlist, ToggleWishlistLike } = wishlistSlice.actions
export { ActGetWishlistProducts }
export default wishlistSlice.reducer
