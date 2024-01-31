import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IInitialState {
    index : number,
    lessonID : string | null
}

const initialState : IInitialState = {
  index : 0,
  lessonID : null
}

const lessonSlice = createSlice({
    initialState,
    name : "lessonSlice",
    reducers : {
        setLessonState : (state, action : PayloadAction<IInitialState>) => {
            return action.payload
        }
    }
});

export const { setLessonState } = lessonSlice.actions;
export default lessonSlice.reducer