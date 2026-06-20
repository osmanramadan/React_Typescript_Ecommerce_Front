import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type Category from "../../../types/category"



const ActGetCategories = createAsyncThunk('categories/ActGetCategories',
    async (_,thunkAPI)=>{

        const {rejectWithValue} = thunkAPI ;

        try{

            const res = await axios.get('http://localhost:3000/categories')
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

export default ActGetCategories