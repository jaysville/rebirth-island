import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import serverUrl from "../../server";

export const adminApi = createApi({
  reducerPath: "adminApi",
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
    getOrders: builder.query({
      query: () => "/orders",
    }),
    initializeTransaction: builder.mutation({
      query: (body) => {
        return {
          url: "/transaction/initialize",
          method: "POST",
          body,
        };
      },
    }),
    verifyTransaction: builder.mutation({
      query: (reference) => {
        return {
          url: `/transaction/verify/${reference}`,
          method: "Post",
        };
      },
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useInitializeTransactionMutation,
  useVerifyTransactionMutation,
} = adminApi;
