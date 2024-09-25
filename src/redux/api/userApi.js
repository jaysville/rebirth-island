import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import serverUrl from "../../server";

export const userApi = createApi({
  reducerPath: "userApi",

  baseQuery: fetchBaseQuery({
    baseUrl: `${serverUrl}`,
    prepareHeaders: (headers) => {
      // headers.set("Authorization", `Bearer ${token}`);

      return headers;
    },
  }),
  endpoints: (builder) => ({
    placeOrder: builder.mutation({
      query: (body) => {
        return {
          url: "/order",
          method: "Post",
          body,
        };
      },
    }),
  }),
});

export const { usePlaceOrderMutation } = userApi;
