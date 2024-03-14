import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const outwardApi = createApi({
    reducerPath: "outwardApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://knitting.coderplays.com/api/" }),
    endpoints: (build) => ({
        getOutward: build.query({
            query: () => ({
                url: "outward",
                method: "GET"
            }),
        }),
        getOutwardById: build.query({
            query: (id) => ({
                url: `outward_edit/${id}`,
                method: "GET"
            }),
        }),
        postOutward: build.mutation({
            query: (data) => ({
                url: "outward_add",
                method: "POST",
                body:data,
                headers:{
                    'Content-Type': 'application/json'
                }
            }),
        }),
        putOutward: build.mutation({
            query: (data) => ({
                url: `outward_update/${data.id}`,
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
    useGetOutwardQuery,
    useGetOutwardByIdQuery,
    usePostOutwardMutation, 
    usePutOutwardMutation, 
} = outwardApi;