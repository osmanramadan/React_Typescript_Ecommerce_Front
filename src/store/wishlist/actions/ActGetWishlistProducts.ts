import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '@api/axios'
import type { RootState } from '@store/index'
import type { IProduct } from '@types'
import { getAxiosErrorMessage } from '@/utils/axiosError'

const ActGetWishlistProducts = createAsyncThunk('wishlist/ActGetWishlist', async (_, thunkAPI) => {
  const { rejectWithValue, getState, signal } = thunkAPI

  const { auth } = getState() as RootState

  if (!auth.user?.id) {
    return []
  }

  try {
    const userWishlist = await axiosInstance.get<{ productId: number }[]>(
      `/wishlist?userId=${auth.user.id}`,
      { signal }
    )

    if (!userWishlist.data.length) {
      return []
    }

    const mixedItemsId = userWishlist.data
      .map((v) => {
        return `id=${v.productId}`
      })
      .join('&')

    const res = await axiosInstance.get<IProduct[]>(`/products?${mixedItemsId}`, { signal })

    return res.data
  } catch (error) {
    return rejectWithValue(getAxiosErrorMessage(error))
  }
})

export default ActGetWishlistProducts
