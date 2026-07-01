import { createSlice } from '@reduxjs/toolkit'
import { type ICategoiesState } from '@types'
import ActGetCategories from './actions/ActGetCategories'

const initialState: ICategoiesState = {
  records: [],
  loading: 'idle',
  error: null,
}

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    ClearCategories: (state) => {
      state.records = []
    },
  },

  extraReducers: (builder) => {
    ;(builder.addCase(ActGetCategories.pending, (state) => {
      ;((state.loading = 'pending'), (state.error = null))
    }),
      builder.addCase(ActGetCategories.fulfilled, (state, action) => {
        ;((state.loading = 'succeeded'), (state.records = action.payload))
      }),
      builder.addCase(ActGetCategories.rejected, (state, action) => {
        state.loading = 'failed'

        if (action.payload && typeof action.payload === 'string') {
          state.error = action.payload
        }
      })
    )
  },
})

export { ActGetCategories }
export const { ClearCategories } = categoriesSlice.actions

export default categoriesSlice.reducer
