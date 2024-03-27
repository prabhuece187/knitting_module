import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const itemApi = createApi({
    reducerPath: "itemApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://knitting.coderplays.com/api/" }),
    tagTypes: ["ItemTag"],
    endpoints: (build) => ({
        getItem: build.query({
            query: ({ limit, offset, curpage }) => ({
                url: `items?limit=${limit}&offset=${offset}&curpage=${curpage}`,
                method: "GET"
            }),
            providesTags: ["ItemTag"],
        }),
        getItemById: build.query({
            query: (id) => ({
                url: `items/${id}`,
                method: "GET"
            }),
            providesTags: ["ItemTag"],
        }),
        postItem: build.mutation({
            query: (data) => ({
                url: "items",
                method: "POST",
                body:data,
                headers:{
                    'Content-Type': 'application/json'
                }
            }),
            invalidatesTags: ["ItemTag"],
        }),
        putItem: build.mutation({
            query: (data) => ({
                url: `items/${data.id}`,
                method: "PUT",
                body:data,
                headers:{
                    'Content-Type': 'application/json'
                }
            }),
            invalidatesTags: ["ItemTag"],
        }),
    }),
});

export const { 
    useGetItemQuery,
    useGetItemByIdQuery,
    usePostItemMutation, 
    usePutItemMutation, 
} = itemApi;