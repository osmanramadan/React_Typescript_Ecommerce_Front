import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '@api/axios'
import { getAxiosErrorMessage } from '@/utils/axiosError'
import type { IAuthResponse } from '@/types'
import type { signInType } from '@/validation/loginSchema'




const ActAuthLogin = createAsyncThunk('login/ActAuthLogin', async (data:signInType, thunkAPI) => {
  const { rejectWithValue, signal } = thunkAPI

  try {
    const res = await axiosInstance.post<IAuthResponse>('/login',data, { signal })
    return res.data
  } catch (error) {
    
    return rejectWithValue(getAxiosErrorMessage(error))
  }
})

export default  ActAuthLogin
