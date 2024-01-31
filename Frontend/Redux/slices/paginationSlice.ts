import { createSlice } from "@reduxjs/toolkit";

const paginationSlice = createSlice({
    initialState : 1,
    name : "Pagination Click Slice",
    reducers : {
        setPagination : (state, action) => action.payload
    }
});

export const { setPagination } = paginationSlice.actions;
export default paginationSlice.reducer;