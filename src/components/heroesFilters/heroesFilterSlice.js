import { createAsyncThunk, createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

const filtersAdapter = createEntityAdapter();

const initialState = filtersAdapter.getInitialState({
    filtersLoadingStatus: 'idle',
    activeFilter: 'all',
});

export const filterHeroes = createAsyncThunk(
    'filters/fetchFilters',
    async () => {
        const { request } = useHttp();
        return await request('http://localhost:3001/filters');
    }
);

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        activeFilterChanged: (state, action) => {
            state.activeFilter = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(filterHeroes.pending, (state) => {
                state.filtersLoadingStatus = 'loading';
            })
            .addCase(filterHeroes.fulfilled, (state, action) => {
                state.filtersLoadingStatus = 'idle';
                filtersAdapter.setAll(state, action.payload); 
            })
            .addCase(filterHeroes.rejected, (state) => {
                state.filtersLoadingStatus = 'error';
            });
    }
});

const { actions, reducer } = filtersSlice;

export default reducer;

export const {
    selectAll
} = filtersAdapter.getSelectors(state => state.filterHeroes);


export const { activeFilterChanged , filtersLoadingStatus , activeFilter } = actions;

