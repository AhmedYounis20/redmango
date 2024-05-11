import { createSlice } from "@reduxjs/toolkit";
import { userModel } from "../../Interfaces";

const initialState : userModel  = {
    fullname: "",
    email : "",
    id :"",
    role :""
};



export const userAuthSlice  = createSlice({
    name:"CartItems",
    initialState:initialState,
    reducers:{
        setLoggedInUser: (state,action) =>{
            state.email = action.payload.email;
            state.fullname = action.payload.fullname;
            state.id = action.payload.id;
            state.role = action.payload.role;
        }
    },
});

// export const { setShoppingCart, updateQuantity, removeFromCart } = authSlice.actions;
export const userAuthReducer = userAuthSlice.reducer;