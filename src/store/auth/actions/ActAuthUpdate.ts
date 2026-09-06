import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '@api/axios'
import { getAxiosErrorMessage } from '@/utils/axiosError'

export type UpdateProfilePayload = {
  id: number
  firstName: string
  lastName: string
  email: string
}

export type UpdateProfileResponse = {
  id: number
  firstName: string
  lastName: string
  email: string
}

const ActAuthUpdate = createAsyncThunk(
  'auth/ActAuthUpdate',
  async (data: UpdateProfilePayload, thunkAPI) => {
    const { rejectWithValue, signal } = thunkAPI

    try {
      const res = await axiosInstance.patch<UpdateProfileResponse>(
        `/users/${data.id}`,
        {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
        },
        { signal },
      )

      return res.data
    } catch (error) {
      return rejectWithValue(getAxiosErrorMessage(error))
    }
  },
)

export default ActAuthUpdate
