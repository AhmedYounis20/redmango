import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { ApiResponse } from "../Interfaces";

const menuItemApi = createApi({
    reducerPath:"menuItemApi",
    baseQuery: fetchBaseQuery({
        baseUrl:"https://redmangoapi.azurewebsites.net/api/",
    }),
    tagTypes:["menuItems"],
    endpoints: (builder)=>({
        getMenuItems : builder.query<ApiResponse,any>({
            query:()=>({
                url:"menuItem"
            }),
            providesTags:["menuItems"]
        }),
        getMenuItemById : builder.query({
            query:(id)=>({
                url:`menuItem/${id}`
            }),
            providesTags:["menuItems"]
        }),
    })
});

export const {useGetMenuItemsQuery,useGetMenuItemByIdQuery}  = menuItemApi;
export default menuItemApi;