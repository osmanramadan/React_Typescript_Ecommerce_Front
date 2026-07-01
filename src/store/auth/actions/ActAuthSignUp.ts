
import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '@api/axios'
import { getAxiosErrorMessage } from '@/utils/axiosError'
import type { IAuthResponse} from '@/types'
import type { signUpType } from '@/validation/signUpSchema'




const ActAuthSignUp = createAsyncThunk('signUp/ActAuthSignUp', async (data:signUpType, thunkAPI) => {
  const { rejectWithValue, signal } = thunkAPI

  try {
    const { confirmPassword, ...userData } = data
    const res = await axiosInstance.post<IAuthResponse>('/signup',userData, { signal })
    return res.data
  } catch (error) {
    
    return rejectWithValue(getAxiosErrorMessage(error))
  }
})

export default ActAuthSignUp
