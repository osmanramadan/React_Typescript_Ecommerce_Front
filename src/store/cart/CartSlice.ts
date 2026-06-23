import { createSlice , createSelector} from "@reduxjs/toolkit";
import type ICartState from "../../types/cart";
import type { RootState } from '../index'




const initialState : ICartState= {

   items:{},
   productFullData:[]
} 


const cartSlice = createSlice(
    {
        name:'cart',
        initialState,
        reducers:{
           addCartItem : (state,action)=>{
                 const id = action.payload.id
                 if(state.items[id]){
                    state.items[id]++
                 }else{
                     state.items[id]=1
                 }
            }
        },
       
    }
)



const cartItemsCount = createSelector(
  (state: RootState) => state.cart.items,
  (items) =>{
    return Object.values(items).reduce(
      (total, quantity) => total + quantity,
      0
    )}
);




export {cartItemsCount}
export const {addCartItem} = cartSlice.actions
export default cartSlice.reducer