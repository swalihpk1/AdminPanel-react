import { apiSlice } from "./apiSlices";
const ADMIN_URL = '/api/admin';

export const adminApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        adminLogin: builder.mutation({
            query: (data) => ({
                url: `${ADMIN_URL}/auth`,
                method: 'POST',
                body: data
            })
        }),
        adminLogout: builder.mutation({
            query: () => ({
                url: `${ADMIN_URL}/logout`,
                method: 'POST'
            })
        }),
        getUsersData: builder.mutation({
            query: () => ({
                url: `${ADMIN_URL}/employeeList`,
                method: 'GET',
            })
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `${ADMIN_URL}/deleteEmployee/${id}`,
                method: 'DELETE',
            })
        }),
        getUpdateUser: builder.mutation({
            query: (id) => ({
                url: `${ADMIN_URL}/editEmployee/${id}`,
                method: 'GET',
            })
        }),
        updateUserData: builder.mutation({
            query: (data) => ({
                url: `${ADMIN_URL}/editEmployee`,
                method: 'PUT',
                body: data
            })
        }),
        addNewUser: builder.mutation({
            query: (data) => ({
                url: `${ADMIN_URL}/createEmployee`,
                method: 'POST',
                body: data
            })
        }),
        activationUser: builder.mutation({
            query: (data) => ({
                url: `${ADMIN_URL}/activationUser`,
                method: 'PATCH',
                body:data
            })
        })

    })
});

export const { useAdminLoginMutation, useAdminLogoutMutation,
    useGetUsersDataMutation, useDeleteUserMutation,
    useGetUpdateUserMutation, useUpdateUserDataMutation,
    useAddNewUserMutation,useActivationUserMutation } = adminApiSlice;