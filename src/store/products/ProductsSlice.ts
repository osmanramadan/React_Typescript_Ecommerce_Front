import { createSlice } from "@reduxjs/toolkit";
import ActGetProducts from  './actions/ActGetProducts'
import type IProductsState from "../../types/product";



const initialState : IProductsState = {

    records:[],
    loading:'idle',
    error:null
}


const productsSlice = createSlice(
    {
        name:'products',
        initialState,
        reducers:{
            ClearProducts:(state)=>{
                 state.records = []
            }
        },
        
        extraReducers: (builder) => {
              builder.addCase(ActGetProducts.pending, (state) => {
               state.loading = "pending",
               state.error = null
          }),
              builder.addCase(ActGetProducts.fulfilled, (state , action) => {
               state.loading = "succeeded",
               state.records = action.payload 
          }),
              builder.addCase(ActGetProducts.rejected, (state , action ) => {
  
               state.loading = "failed"
               
               if(action.payload && typeof action.payload === "string"){
                  state.error = action.payload

               }
          })

    }
    }
)
export const {ClearProducts} = productsSlice.actions
export {ActGetProducts}
export default productsSlice.reducer