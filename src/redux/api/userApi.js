import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import serverUrl from "../../server";
import ResetPassword from "../../pages/Reset-Password";

export const userApi = createApi({
  reducerPath: "userApi",

  baseQuery: fetchBaseQuery({
    baseUrl: `${serverUrl}`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().app.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getOrderHistory: builder.query({
      query: (email) => `/orders/user/${email}`,
      providesTags: ["Order"],
    }),
    placeOrder: builder.mutation({
      query: (body) => {
        return {
          url: "/order",
          method: "Post",
          body,
        };
      },
      invalidatesTags: ["Order"],
    }),
    forgotPassword: builder.mutation({
      query: (body) => {
        return {
          url: "/forgot-password",
          method: "Post",
          body,
        };
      },
    }),
    ResetPassword: builder.mutation({
      query: ({ token, password }) => {
        return {
          url: `/reset-password/${token}`,
          method: "Post",
          body: { password },
        };
      },
    }),
  }),
});

export const {
  usePlaceOrderMutation,
  useGetOrderHistoryQuery,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = userApi;
