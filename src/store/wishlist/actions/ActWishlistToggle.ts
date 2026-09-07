import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from '@api/axios'
import { getAxiosErrorMessage } from '@/utils/axiosError'
import type { RootState } from '@store/index'

const actLikeToggle = createAsyncThunk(
  'wishlist/ActLikeToggle',
  async (id: number, thunkAPI) => {
    const { rejectWithValue , getState} = thunkAPI
       const { auth } = getState() as RootState; 

    if (!auth.user?.id) {
      return rejectWithValue('Please login to manage your wishlist')
    }

    try {
      const existing = await axiosInstance.get(`/wishlist?userId=${auth.user.id}&productId=${id}`)

      if (existing.data.length > 0) {
        for (const record of existing.data) {
          if (record?.id !== undefined && record?.id !== null) {
            await axiosInstance.delete(`/wishlist/${record.id}`)
          }
        }

        return { type: 'remove', id }
      }

      await axiosInstance.post('/wishlist', { userId: auth.user?.id, productId: id })

      return { type: 'add', id }

    } catch (error) {
      return rejectWithValue(getAxiosErrorMessage(error))
    }
  }
)

export default actLikeToggle;