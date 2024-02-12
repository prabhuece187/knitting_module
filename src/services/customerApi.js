import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const customerApi = createApi({
    reducerPath: "customerApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://knitting.coderplays.com/api/" }),
    endpoints: (build) => ({
        getCustomer: build.query({
            query: () => ({
                url: "customers",
                method: "GET"
            }),
        }),
        getCustomerById: build.query({
            query: (id) => ({
                url: `customers/${id}`,
                method: "GET"
            }),
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
        }),
    }),
});

export const { 
    useGetCustomerQuery,
    useGetCustomerByIdQuery,
    usePostCustomerMutation, 
    usePutCustomerMutation, 
} = customerApi;