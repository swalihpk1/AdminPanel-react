import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    adminInfo: localStorage.getItem('adminInfo') ? JSON.parse(localStorage.getItem('adminInfo')) : null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAdminCredentials: (state, action) => {
            state.adminInfo = action.payload;
            localStorage.setItem('adminInfo', JSON.stringify(action.payload));
        },
        adminLogout: (state) => {
            state.adminInfo = null;
            localStorage.removeItem('adminInfo');
        },
    },
});

export default authSlice.reducer;
export const {setAdminCredentials,adminLogout} = authSlice.actions;
