"use client";

import { configureStore } from "@reduxjs/toolkit";
import dialogReducer from "./slices/dialogSlice";
import toastReducer from "./slices/toastSlice";
import paginationReducer from "./slices/paginationSlice";
import searchReducer from "./slices/searchSlice";
import categoryReducer from "./slices/categorySlice";
import coursesReducer from "./features/coursesSlice";
import lessonReducer from "./slices/lessonSlice";
import filterReducer from "./slices/filterSlice";
import getRatingsReducer from "./features/getRatingsSlice";

export const store = configureStore({
    reducer : {
        dialog : dialogReducer,
        toast : toastReducer,
        search : searchReducer,
        pagination : paginationReducer,
        category : categoryReducer,
        course : coursesReducer,
        lesson : lessonReducer,
        filter : filterReducer,
        getRatings : getRatingsReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;