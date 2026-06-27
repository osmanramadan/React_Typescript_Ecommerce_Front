import { createSlice } from "@reduxjs/toolkit";
import type ICategoiesState from "../../types/category"
import ActGetCategories from  './actions/ActGetCategories'



const initialState : ICategoiesState = {

    records:[],
    loading:'idle',
    error:null
} 




const categoriesSlice = createSlice(
    {
        name:'categories',
        initialState,
        reducers:{
            
            ClearCategories:(state)=>{
                 state.records = []
            }
        },
        
        extraReducers: (builder) => {
              builder.addCase(ActGetCategories.pending, (state) => {
               state.loading = "pending",
               state.error = null
          }),
              builder.addCase(ActGetCategories.fulfilled, (state , action) => {
               state.loading = "succeeded",
               state.records = action.payload 
          }),
              builder.addCase(ActGetCategories.rejected, (state , action ) => {
  
               state.loading = "failed",
               state.error = action.error as string
          })

    }
    }
)

export {ActGetCategories}
export const {ClearCategories} = categoriesSlice.actions

export default categoriesSlice.reducer