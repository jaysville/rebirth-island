import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import serverUrl from "../../server";

export const merchApi = createApi({
  reducerPath: "merchApi",
  // refetchOnMountOrArgChange: true,
  // refetchOnReconnect: true,
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
    getMerch: builder.query({
      query: () => "/merch",
      providesTags: ["Merch"],
    }),
    getCollections: builder.query({
      query: (collection) => `/collections/${collection}`,
      providesTags: ["Merch"],
    }),
    getSingleMerch: builder.query({
      query: (id) => `/merch/${id}`,
      providesTags: ["Merch"],
    }),
    addMerch: builder.mutation({
      query: ({ name, category, price, sizes, images }) => {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("category", category);
        formData.append("price", price);
        formData.append("sizes", sizes);
        for (let i = 0; i < images.length; i++) {
          formData.append("images", images[i]);
        }
        return {
          url: "/merch",
          method: "Post",
          body: formData,
        };
      },
      invalidatesTags: ["Merch"],
    }),
    editMerch: builder.mutation({
      query: ({ name, category, price, sizes, images, id }) => {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("category", category);
        formData.append("price", price);
        formData.append("sizes", sizes);
        if (images.length > 0) {
          for (let i = 0; i < images.length; i++) {
            formData.append("images", images[i]);
          }
        }

        return {
          url: `/merch/edit/${id}`,
          method: "Post",
          body: formData,
        };
      },
      invalidatesTags: ["Merch"],
    }),
    deleteMerch: builder.mutation({
      query: (merchId) => ({
        url: `/merch/delete/${merchId}`,
        method: "delete",
      }),
      invalidatesTags: ["Merch"],
    }),
  }),
});

export const {
  useGetMerchQuery,
  useGetCollectionsQuery,
  useGetSingleMerchQuery,
  useAddMerchMutation,
  useEditMerchMutation,
  useDeleteMerchMutation,
} = merchApi;
