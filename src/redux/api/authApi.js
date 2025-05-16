import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import serverUrl from "../../server";

export const authApi = createApi({
  reducerPath: "authApi",
  // refetchOnMountOrArgChange: true,
  // refetchOnReconnect: true,

  baseQuery: fetchBaseQuery({
    baseUrl: `${serverUrl}/auth`,
  }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (body) => ({
        url: "/register",
        method: "POST",
        body,
      }),
    }),
    login: builder.mutation({
      query: (body) => ({
        url: "/login",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;
