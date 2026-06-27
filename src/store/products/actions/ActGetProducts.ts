import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { IProduct } from "../../../types/product";
import axiosInstance from "../../../api/axios";




const ActGetProducts= createAsyncThunk('products/ActGetProducts',
    async (cat:string,thunkAPI)=>{

        const {rejectWithValue,signal} = thunkAPI ;

        try{
            let res;

            if(cat){
                 res = await axiosInstance.get<IProduct[]>(`/products?category=${cat}`,{signal})
            }else{
                 res = await axiosInstance.get<IProduct[]>(`/products`,{signal})
            }
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

export default ActGetProducts