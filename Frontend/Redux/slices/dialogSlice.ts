"use client";

import { createSlice } from '@reduxjs/toolkit';


interface MyState {
  visibility : string,
  componentName: string
  extraInfo? : object
}

const initialState: MyState = {
    visibility : 'hidden',
    componentName: "",
    extraInfo : {}
};

interface IAction {
    payload : string;
    type : string;
}

export const dialogSlice = createSlice({
    name : "dialogSlice",
    initialState,
    reducers : {
        showDialog : (state, action : IAction) => {
            return {
                visibility : "flex",
                componentName : action.payload
            };
        },
        hideDialog : (state) => {
            return {
                visibility : "hidden",
                componentName: ""
            };
        }
    }
});

export const { showDialog, hideDialog } = dialogSlice.actions;
export default dialogSlice.reducer;