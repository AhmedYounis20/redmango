import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { ApiResponse, UserLoginModel, UserRegisterModel, authApiResponse } from "../Interfaces";

const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://redmangoapi.azurewebsites.net/api/",
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userLoginData: UserLoginModel) => ({
        url: "auth/login",
        method: "POST",
        body: userLoginData,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    register: builder.mutation({
      query: (userRegisterData: UserRegisterModel) => ({
        url: "auth/register",
        method: "POST",
        body: userRegisterData,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const {useRegisterMutation,useLoginMutation}  = authApi;
export default authApi;