import { createSlice } from '@reduxjs/toolkit'
import  ActAuthLogin from './actions/ActAuthLogin'
import  ActAuthSignUp from './actions/ActAuthSignUp'
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
    },
  },
  
  // login
  extraReducers: (builder) => {
    ;(builder.addCase( ActAuthLogin.pending, (state) => {
      ;((state.loading = 'pending'), (state.error = null))
    }),
      builder.addCase( ActAuthLogin.fulfilled, (state, action) => {
        ;((state.loading = 'succeeded'), (state.user = action.payload.user,state.accessToken=action.payload.accessToken))
      }),
      builder.addCase( ActAuthLogin.rejected, (state, action) => {
        state.loading = 'failed'

        if (action.payload && typeof action.payload === 'string') {
          state.error = action.payload
        }
      })
    ),
    // register
      (builder.addCase( ActAuthSignUp.pending, (state) => {
      ;((state.loading = 'pending'), (state.error = null))
    }),
      builder.addCase( ActAuthSignUp.fulfilled, (state) => {
        ;((state.loading = 'succeeded'), (state.user =null,state.accessToken=null))
      }),
      builder.addCase( ActAuthSignUp.rejected, (state, action) => {
        state.loading = 'failed'

        if (action.payload && typeof action.payload === 'string') {
          state.error = action.payload
        }
      })
    )
  },
  
})

export { ActAuthLogin ,  ActAuthSignUp}
export const { authClear ,authLogout } = authSlice.actions

export default authSlice.reducer
