import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const millApi = createApi({
    reducerPath: "millApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://knitting.coderplays.com/api/" }),
    tagTypes: ["MillTag"],
    endpoints: (build) => ({
        getMill: build.query({
            query: ({ limit, offset, curpage }) => ({
                url: `mills?limit=${limit}&offset=${offset}&curpage=${curpage}`,
                method: "GET"
            }),
            providesTags: ["MillTag"],
        }),
        getMillById: build.query({
            query: (id) => ({
                url: `mills/${id}`,
                method: "GET"
            }),
            providesTags: ["MillTag"],
        }),
        postMill: build.mutation({
            query: (data) => ({
                url: "mills",
                method: "POST",
                body:data,
                headers:{
                    'Content-Type': 'application/json'
                }
            }),
            invalidatesTags: ["MillTag"],
        }),
        putMill: build.mutation({
            query: (data) => ({
                url: `mills/${data.id}`,
                method: "PUT",
                body:data,
                headers:{
                    'Content-Type': 'application/json'
                }
            }),
            invalidatesTags: ["MillTag"],
        }),
    }),
});

export const { 
    useGetMillQuery,
    useGetMillByIdQuery,
    usePostMillMutation, 
    usePutMillMutation, 
} = millApi;