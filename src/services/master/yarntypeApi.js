import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const yarntypeApi = createApi({
    reducerPath: "yarntypeApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://knitting.coderplays.com/api/" }),
    endpoints: (build) => ({
        getYarnType: build.query({
            query: () => ({
                url: "yarn_types",
                method: "GET"
            }),
        }),
        getYarnTypeById: build.query({
            query: (id) => ({
                url: `yarn_types/${id}`,
                method: "GET"
            }),
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
        }),
    }),
});

export const { 
    useGetYarnTypeQuery,
    useGetYarnTypeByIdQuery,
    usePostYarnTypeMutation, 
    usePutYarnTypeMutation, 
} = yarntypeApi;