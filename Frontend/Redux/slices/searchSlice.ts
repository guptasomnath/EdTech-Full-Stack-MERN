"use client";

import { createSlice } from '@reduxjs/toolkit';

const initialState = null

export const searchSlice = createSlice({
    name : "search slice",
    initialState,
    reducers : {
        setSearchText : (state, actions) => actions.payload,
    }
});

export const { setSearchText } = searchSlice.actions;
export default searchSlice.reducer;