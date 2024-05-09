import { apiSlice } from "./apiSlices";
const USERS_URL = '/api/users';

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/auth`,
                method: 'POST',
                body: data
            }),
        }),
        register: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}`,
                method: 'POST',
                body: data
            }),
        }),
        update: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/profile`,
                method: 'PUT',
                body: data
            }),
        }),
        logout: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/logout`,
                method: 'POST',
                body: data
            }),
        }),
    }),
});

export const { useLoginMutation,useLogoutMutation,useRegisterMutation,useUpdateMutation} = userApiSlice;
