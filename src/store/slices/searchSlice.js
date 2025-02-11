import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    query: '',
    searchHistory: [],
};

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setQuery: (state, action) => {
            state.query = action.payload;
        },
        clearQuery: (state) => {
            state.query = '';
        },
        saveSearchHistory: (state, action) => {
            // Prevent duplicate entries and limit history to 10 items
            if (!state.searchHistory.includes(action.payload)) {
                state.searchHistory = [action.payload, ...state.searchHistory.slice(0, 9)];
            }
        },
        clearSearchHistory: (state) => {
            state.searchHistory = [];
        },
    },
});

export const { setQuery, clearQuery, saveSearchHistory, clearSearchHistory } = searchSlice.actions;
export default searchSlice.reducer;