import { createSlice } from "@reduxjs/toolkit";
import { CartModel } from "../../Interfaces/CartModel";

const initialState : CartModel = {
    cartItems:[],
    id :0,
    userId: "",
    cartTotal :0
};



export const shoppingCartSlice  = createSlice({
    name:"CartItems",
    initialState:initialState,
    reducers:{
        setShoppingCart : (state,action)=>{
            state.cartItems = action.payload;
        },
        updateQuantity: (state,action)=>{
            state.cartItems  = state.cartItems.map((item)=>{
                if(item.id === action.payload.cartItem?.id)
                    item.quantity = action.payload.quantity;
                return item;
            });
        },
          removeFromCart: (state,action)=>{
            state.cartItems  = state.cartItems.filter((item)=>{
                if(item.id === action.payload.cartItem?.id)
                    return null;
                else return item;
            });
        }
    },
});

export const {setShoppingCart,updateQuantity,removeFromCart} = shoppingCartSlice.actions;
export const shoppingCartReducer = shoppingCartSlice.reducer;