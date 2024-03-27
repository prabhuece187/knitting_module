import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const customerApi = createApi({
    reducerPath: "customerApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://knitting.coderplays.com/api/" }),
    tagTypes: ["CustomerTag"],
    endpoints: (build) => ({
        getCustomer: build.query({
            query: ({ limit, offset, curpage }) => ({
                url: `customers?limit=${limit}&offset=${offset}&curpage=${curpage}`,
                method: "GET"
            }),
            providesTags: ["CustomerTag"],
        }),
        getCustomerById: build.query({
            query: (id) => ({
                url: `customers/${id}`,
                method: "GET"
            }),
            providesTags: ["CustomerTag"],
        }),
        postCustomer: build.mutation({
            query: (data) => ({
                url: "customers",
                method: "POST",
                body:data,
                headers:{
                    'Content-Type': 'application/json'
                }
            }),
            invalidatesTags: ["CustomerTag"],
        }),
        putCustomer: build.mutation({
            query: (data) => ({
                url: `customers/${data.id}`,
                method: "PUT",
                body:data,
                headers:{
                    'Content-Type': 'application/json'
                }
            }),
            invalidatesTags: ["CustomerTag"],
        }),
    }),
});

export const { 
    useGetCustomerQuery,
    useGetCustomerByIdQuery,
    usePostCustomerMutation, 
    usePutCustomerMutation, 
} = customerApi;