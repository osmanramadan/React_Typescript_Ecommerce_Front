import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { IProduct } from "../../../types/product";
import axiosInstance from "../../../api/axios";




const ActGetProducts= createAsyncThunk('products/ActGetProducts',
    async (cat:string,thunkAPI)=>{

        const {rejectWithValue} = thunkAPI ;

        try{
            let res;

            if(cat){
                 res = await axiosInstance.get<IProduct[]>(`/products?category=${cat}`)
            }else{
                 res = await axiosInstance.get<IProduct[]>(`/products`)
            }
            return res.data
          

        }catch (error){
            if (axios.isAxiosError(error)){
                return rejectWithValue(error.response?.data.message)
            }else{
                return rejectWithValue('unkwon error')
            }
        }


    }
)

export default ActGetProducts