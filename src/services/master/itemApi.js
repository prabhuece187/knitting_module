import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const itemApi = createApi({
    reducerPath: "itemApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://knitting.coderplays.com/api/" }),
    endpoints: (build) => ({
        getItem: build.query({
            query: () => ({
                url: "items",
                method: "GET"
            }),
        }),
        getItemById: build.query({
            query: (id) => ({
                url: `items/${id}`,
                method: "GET"
            }),
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
        }),
    }),
});

export const { 
    useGetItemQuery,
    useGetItemByIdQuery,
    usePostItemMutation, 
    usePutItemMutation, 
} = itemApi;