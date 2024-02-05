import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_BASE_URL } from "../../config";
import type { ISearchData } from "../../types/data";

type IState = {
    items: any[];
    total_count: number;
    loading: boolean;
    error: boolean;
}

const initialState: IState = {
    items: [],
    total_count: 0,
    loading: false,
    error: false,
}

export const fetchRepositories = createAsyncThunk<IState, ISearchData>(
    'repositories/fetchRepositories',
    async function(data) {
        const response = await fetch(`${API_BASE_URL}/search/repositories?q=${data.name}&page=${data.page}&per_page=10`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            }
        })

        return await response.json()
    }
)

const repoSlice = createSlice({
    name: 'repositories',
    initialState,
    reducers: {
        resetResults() {
            return initialState
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchRepositories.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(fetchRepositories.rejected, (state) => {
                state.error = true;
                state.loading = false;
            })
            .addCase(fetchRepositories.fulfilled, (state, action) => {
                state.items = state.items.concat(action.payload.items);
                state.total_count = action.payload.total_count;
                state.error = false;
                state.loading = false;
            })
    },
})

export const { resetResults } = repoSlice.actions;
export default repoSlice.reducer;