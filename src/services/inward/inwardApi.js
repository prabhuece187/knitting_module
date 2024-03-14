import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const inwardApi = createApi({
    reducerPath: "inwardApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://knitting.coderplays.com/api/" }),
    endpoints: (build) => ({
        getInward: build.query({
            query: () => ({
                url: "inward",
                method: "GET"
            }),
        }),
        getInwardById: build.query({
            query: (id) => ({
                url: `inward_edit/${id}`,
                method: "GET"
            }),
        }),
        postInward: build.mutation({
            query: (data) => ({
                url: "inward_add",
                method: "POST",
                body:data,
                headers:{
                    'Content-Type': 'application/json'
                }
            }),
        }),
        putInward: build.mutation({
            query: (data) => ({
                url: `inward_update/${data.id}`,
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
    useGetInwardQuery,
    useGetInwardByIdQuery,
    usePostInwardMutation, 
    usePutInwardMutation, 
} = inwardApi;