import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: { role: null },
    reducers: {
        setRole: (state, action) => {
            state.role = action.payload;
        },
        clearRole: (state) => {
            state.role = null;
        },
    },
});

export const { setRole, clearRole } = userSlice.actions;
export default userSlice.reducer;
