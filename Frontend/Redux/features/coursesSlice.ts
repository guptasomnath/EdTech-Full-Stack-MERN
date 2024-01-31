import { ICourseData } from "@/types/CoursePageTypes";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";


interface MyDataState {
    response : ResponseType;
    isLoading : boolean;
    error : string | null
}

interface ResponseType {
    courses : ICourseData[];
    pages : number
}

const initialState : MyDataState = {
   response : { courses : [], pages : 0 },
   isLoading : true,
   error : null
}

export const fetchCourse = createAsyncThunk("slice/getAllCourses", async (url : string) => {
    const response = await fetch(url);
    const { data } = await response.json();
    return data;
});

const coursesSlice = createSlice({
    name : "Courses",
    initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder.addCase(fetchCourse.pending, (state) => {
            state.isLoading = true
        });
        builder.addCase(fetchCourse.fulfilled, (state, action : PayloadAction<ResponseType>) => {
            state.isLoading = false;
            state.error = null;
            state.response = action.payload;
        });
        builder.addCase(fetchCourse.rejected, (state, action : PayloadAction<any>) => {
            state.isLoading = false;
            state.error = action.payload;
        });
    }
});

export default coursesSlice.reducer;