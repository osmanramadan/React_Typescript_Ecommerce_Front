import { createSlice } from '@reduxjs/toolkit'
import ActGetWishlistProducts from './actions/ActGetWishlistProducts'
import ActLikeToggle from './actions/ActWishlistToggle'
import {authLogout} from '@store/auth/authSlice'
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
      state.itemsId = []
      state.productsFullData = []
      state.loading = 'idle'
      state.error = null
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem('persist:wishlist')
        try {
          const rootPersist = window.localStorage.getItem('persist:root')
          if (rootPersist) {
            const parsed = JSON.parse(rootPersist)
            if (parsed && typeof parsed === 'object' && 'wishlist' in parsed) {
              delete parsed.wishlist
              window.localStorage.setItem('persist:root', JSON.stringify(parsed))
            }
          }
        } catch {
          // ignore malformed persisted state
        }
      }
    },

  },

  extraReducers: (builder) => {

  // Wishlist like toggle
  builder.addCase(ActLikeToggle.pending, (state) => {
      state.loading = 'pending';
      state.error = null;
    });
    builder.addCase(ActLikeToggle.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      if (action.payload.type === 'add') {
        if (!state.itemsId.includes(action.payload.id)) {
          state.itemsId.push(action.payload.id)
        }
      } else {
        state.itemsId = state.itemsId.filter((el) => el !== action.payload.id)
        state.productsFullData = state.productsFullData.filter(
          (el) => el.id !== action.payload.id
        )
      }
    });
    builder.addCase(ActLikeToggle.rejected, (state, action) => {
      state.loading = 'failed'
      if (action.payload && typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });


    // Wishlist products data fetch
    (
      builder.addCase(ActGetWishlistProducts.pending, (state) => {
      ((state.loading = 'pending'), (state.error = null))
    }),
      builder.addCase(ActGetWishlistProducts.fulfilled, (state, action) => {
        state.loading = 'succeeded'
        state.productsFullData = action.payload
        state.itemsId = action.payload.map((product) => product.id)
      }),
      builder.addCase(ActGetWishlistProducts.rejected, (state, action) => {
        state.loading = 'failed'

        if (action.payload && typeof action.payload === 'string') {
          state.error = action.payload
        }
      })
    
    ),
       // when logout reset
    builder.addCase(authLogout, (state) => {
      state.itemsId = [];
      state.productsFullData = [];
    });

  },

  
})



export const { ClearWishlist, ToggleWishlistLike } = wishlistSlice.actions
export { ActGetWishlistProducts,ActLikeToggle }
export default wishlistSlice.reducer
