import { createSlice } from "@reduxjs/toolkit";

interface IActionAceptValue {
  catName : string | undefined,
  catClickIndex : number
}

interface IActionType{
    payload : IActionAceptValue;
    type : string;
}

const initialState : IActionAceptValue = {
    catName : undefined,
    catClickIndex : 0
}

const categorySlice = createSlice({
    initialState,
    name: "Category Slice",
    reducers: {
        setCategory: (state, action : IActionType) => action.payload
    }
});

export const { setCategory } = categorySlice.actions;
export default categorySlice.reducer;