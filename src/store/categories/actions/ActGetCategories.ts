import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type {ICategory} from "../../../types/category";
import axiosInstance from "../../../api/axios";



const ActGetCategories = createAsyncThunk('categories/ActGetCategories',
    async (_,thunkAPI)=>{

        const {rejectWithValue} = thunkAPI ;

        try{

            const res = await axiosInstance.get<ICategory[]>('/categories')
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

export default ActGetCategories