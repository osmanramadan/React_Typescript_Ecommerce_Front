import { createSlice } from '@reduxjs/toolkit'
import ActAuthLogin from './actions/ActAuthLogin'
import ActAuthSignUp from './actions/ActAuthSignUp'
import ActAuthUpdate from './actions/ActAuthUpdate'
import type { IAuthState } from '@/types'




const initialState:IAuthState = {
  user:null,
  accessToken:'',
  loading: 'idle',
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authClear: (state) => {
      state.error = null,
      state.loading = "idle"
    },
    authLogout: (state) => {
      state.user = null,
      state.accessToken = null
      localStorage.removeItem('accessToken')
      localStorage.removeItem('persist:wishlist')
      try {
        const rootPersist = localStorage.getItem('persist:root')
        if (rootPersist) {
          const parsed = JSON.parse(rootPersist)
          if (parsed && typeof parsed === 'object' && 'wishlist' in parsed) {
            delete parsed.wishlist
            localStorage.setItem('persist:root', JSON.stringify(parsed))
          }
        }
      } catch {
        // ignore malformed persisted state
      }
    },
    authUpdate: (state, action) => {
      if (state.user && action.payload) {
        state.user = { ...state.user, ...action.payload }
      }
    },
  },
  
  // login
  extraReducers: (builder) => {
    builder
      .addCase(ActAuthLogin.pending, (state) => {
        state.loading = 'pending'
        state.error = null
      })
      .addCase(ActAuthLogin.fulfilled, (state, action) => {
        state.loading = 'succeeded'
        state.user = action.payload.user
        state.accessToken = action.payload.accessToken
        localStorage.setItem('accessToken', action.payload.accessToken)
      })
      .addCase(ActAuthLogin.rejected, (state, action) => {
        state.loading = 'failed'

        if (action.payload && typeof action.payload === 'string') {
          state.error = action.payload
        }
      })
      .addCase(ActAuthSignUp.pending, (state) => {
        state.loading = 'pending'
        state.error = null
      })
      .addCase(ActAuthSignUp.fulfilled, (state) => {
        state.loading = 'succeeded'
        state.user = null
        state.accessToken = null
      })
      .addCase(ActAuthSignUp.rejected, (state, action) => {
        state.loading = 'failed'

        if (action.payload && typeof action.payload === 'string') {
          state.error = action.payload
        }
      })
      .addCase(ActAuthUpdate.pending, (state) => {
        state.loading = 'pending'
        state.error = null
      })
      .addCase(ActAuthUpdate.fulfilled, (state, action) => {
        state.loading = 'succeeded'
        if (state.user) {
          state.user = { ...state.user, ...action.payload }
        }
      })
      .addCase(ActAuthUpdate.rejected, (state, action) => {
        state.loading = 'failed'

        if (action.payload && typeof action.payload === 'string') {
          state.error = action.payload
        }
      })
  },
})

export { ActAuthLogin, ActAuthSignUp, ActAuthUpdate }
export const { authClear, authLogout, authUpdate } = authSlice.actions

export default authSlice.reducer
