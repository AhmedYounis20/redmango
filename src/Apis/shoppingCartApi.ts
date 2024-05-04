import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { ApiResponse } from "../Interfaces";
import { url } from "inspector";

const shoppingCartApi = createApi({
    reducerPath:"shoppingCartApi",
    baseQuery: fetchBaseQuery({
        baseUrl:"https://redmangoapi.azurewebsites.net/api/",
    }),
    tagTypes:["ShoppingCarts"],
    endpoints: (builder)=>({
        getShoppingCartByUserId : builder.query({
            query:(userId)=>({
                url:"shoppingCart",
                params:{
                    userId:userId
                }
            }),
            providesTags:["ShoppingCarts"]
        }),
        updateShoppingCart:builder.mutation({
            query:({userId,menuItemId,updateQuantityBy})=>({
                url:"shoppingCart",
                method:"POST",
                params:{
                    menuItemId:menuItemId,
                    userId:userId,
                    updateQuantityBy,
                }
            }),
            invalidatesTags:["ShoppingCarts"]
        })
    })
});

export const {useGetShoppingCartByUserIdQuery,useUpdateShoppingCartMutation}  = shoppingCartApi;
export default shoppingCartApi;