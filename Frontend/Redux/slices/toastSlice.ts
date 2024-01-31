"use client";

import { createSlice } from "@reduxjs/toolkit";

// bg-yellow-500 -> for warning
// bg-purple-500 -> normal toast
// bg-red-500 -> for error

const toastSlice = createSlice({
    name : 'toastSlice',
    initialState : {
        visibility : 'hidden',
        bgcolor : 'bg-purple-500',
        text : 'This is a simple notification'
    },
    reducers : {
        setToast : (state, action) => {
            return {...state, ...action.payload}
        }
    }
});

export const  { setToast } = toastSlice.actions;
export default toastSlice.reducer;