import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const yarntypeApi = createApi({
    reducerPath: "yarntypeApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://knitting.coderplays.com/api/" }),
    tagTypes: ["YarnTypeTag"],
    endpoints: (build) => ({
        getYarnType: build.query({
            query: ({ limit, offset, curpage }) => ({
                url: `yarn_types?limit=${limit}&offset=${offset}&curpage=${curpage}`,
                method: "GET"
            }),
            providesTags: ["YarnTypeTag"],
        }),
        getYarnTypeById: build.query({
            query: (id) => ({
                url: `yarn_types/${id}`,
                method: "GET"
            }),
            providesTags: ["YarnTypeTag"],
        }),
        postYarnType: build.mutation({
            query: (data) => ({
                url: "yarn_types",
                method: "POST",
                body:data,
                headers:{
                    'Content-Type': 'application/json'
                }
            }),
            invalidatesTags: ["YarnTypeTag"],
        }),
        putYarnType: build.mutation({
            query: (data) => ({
                url: `yarn_types/${data.id}`,
                method: "PUT",
                body:data,
                headers:{
                    'Content-Type': 'application/json'
                }
            }),
            invalidatesTags: ["YarnTypeTag"],
        }),
    }),
});

export const { 
    useGetYarnTypeQuery,
    useGetYarnTypeByIdQuery,
    usePostYarnTypeMutation, 
    usePutYarnTypeMutation, 
} = yarntypeApi;