import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const inwardApi = createApi({
    reducerPath: "inwardApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://knitting.coderplays.com/api/" }),
    tagTypes: ["InwardTag"],
    endpoints: (build) => ({
        getInward: build.query({
            query: ({limit, offset, curpage }) => ({
                url: `inward?limit=${limit}&offset=${offset}&curpage=${curpage}`,
                method: "GET"
            }),
            providesTags: ["InwardTag"],
        }),
        getInwardById: build.query({
            query: (id) => ({
                url: `inward_edit/${id}`,
                method: "GET"
            }),
            providesTags: ["InwardTag"],
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
            invalidatesTags: ["InwardTag"],
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
            invalidatesTags: ["InwardTag"],
        }),
    }),
});

export const { 
    useGetInwardQuery,
    useGetInwardByIdQuery,
    usePostInwardMutation, 
    usePutInwardMutation, 
} = inwardApi;