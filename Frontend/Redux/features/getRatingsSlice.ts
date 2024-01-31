import { IErrorResponse, ISuccessResponse } from "@/types/ApiTypes";
import { RatingsResponse } from "@/types/RatingTypes";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { doQuery } from "doquery";


interface IRatingsResponse {
    userRatingDetails: RatingsResponse | null;
    ratings: RatingsResponse[];
    pages: number;
}

interface IInitialStateType {
    response: IRatingsResponse | undefined;
    isLoading: boolean;
    error: IErrorResponse | null
}

const initialState: IInitialStateType = {
    response: undefined,
    isLoading: true,
    error: null
}


export const fetchRatings = createAsyncThunk("ratings-data", async (url : string, { rejectWithValue }) => {
    const { success, response, error } = await doQuery<ISuccessResponse<IRatingsResponse>, IErrorResponse>({method : "GET", url : url});
    if(!success){
        return rejectWithValue(error);
    };
    return response?.data;
});

interface IGetRatingsWithUserId {
    url : string,
    userID? : string;
}

export const getRatingsWithUserId = createAsyncThunk("ratings-data", async ({ url, userID} : IGetRatingsWithUserId, { rejectWithValue }) => {
    const { success, response, error } = await doQuery<ISuccessResponse<IRatingsResponse>, IErrorResponse>({method : "GET", url : url});
    if(!success){
        return rejectWithValue(error);
    };
    return response?.data;
});


const getRatingsSlice = createSlice({
    name: "ratings-data",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchRatings.pending, (state) => {
            state.isLoading = true;
            state.response = undefined;
        });
        builder.addCase(fetchRatings.fulfilled, (state, action: PayloadAction<IRatingsResponse | undefined>) => {
            state.isLoading = false;
            state.error = null;
            state.response = action.payload;
        });
        builder.addCase(fetchRatings.rejected, (state, action : PayloadAction<any>) => {
            state.isLoading = false;
            state.error = action.payload;
            state.response = undefined;
        })
    },
});

export default getRatingsSlice.reducer;