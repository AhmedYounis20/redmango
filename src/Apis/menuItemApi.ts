import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { ApiResponse } from "../Interfaces";

const menuItemApi = createApi({
    reducerPath:"menuItemApi",
    baseQuery: fetchBaseQuery({
        baseUrl:"https://redmangoapiv1.azurewebsites.net/api/",
    }),
    tagTypes:["menuItems"],
    endpoints: (builder)=>({
        getMenuItems : builder.query<ApiResponse,any>({
            query:()=>({
                url:"menuItems"
            }),
            providesTags:["menuItems"]
        }),
        getMenuItemById : builder.query({
            query:(id)=>({
                url:`menuItems/${id}`
            }),
            providesTags:["menuItems"]
        }),
    })
});

export const {useGetMenuItemsQuery,useGetMenuItemByIdQuery}  = menuItemApi;
export default menuItemApi;