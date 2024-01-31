import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
    initialState : {},
    name : "filterSlice",
    reducers : {
       setFilters : (state, action) => action.payload
    }
});

export const { setFilters } = filterSlice.actions;
export default filterSlice.reducer;