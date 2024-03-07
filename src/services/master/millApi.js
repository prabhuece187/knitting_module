import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const millApi = createApi({
    reducerPath: "millApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://knitting.coderplays.com/api/" }),
    endpoints: (build) => ({
        getMill: build.query({
            query: () => ({
                url: "mills",
                method: "GET"
            }),
        }),
        getMillById: build.query({
            query: (id) => ({
                url: `mills/${id}`,
                method: "GET"
            }),
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
        }),
    }),
});

export const { 
    useGetMillQuery,
    useGetMillByIdQuery,
    usePostMillMutation, 
    usePutMillMutation, 
} = millApi;