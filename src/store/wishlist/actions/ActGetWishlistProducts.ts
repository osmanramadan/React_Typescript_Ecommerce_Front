import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstance from "../../../api/axios";
import type { RootState } from "../../index";
import type { IProduct } from "../../../types/product";




const ActGetWishlistProducts= createAsyncThunk('wishlist/ActGetWishlist',
    async (_,thunkAPI)=>{

        const {rejectWithValue,getState} = thunkAPI ;
        
        const {wishlist} = getState() as RootState

        const itemsId = wishlist.itemsId

        try{    

            if(!itemsId.length){
                return []
            }

            const mixedItemsId = itemsId.map((v)=>{return  `id=${v}`}).join('&')

                            
            const res = await axiosInstance.get<IProduct[]>(`/products?${mixedItemsId}`)

            return res.data
            

          

        }catch (error){
            if (axios.isAxiosError(error)){
                return rejectWithValue(error.response?.data.message || error.message)
            }else{
                return rejectWithValue('unkwon error')
            }
        }


    }
)

export default ActGetWishlistProducts