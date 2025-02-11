import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    viewMode: 'grid', // 'grid' or 'list'
    showFilters: false,
    loading: false,
    error: null,
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        toggleViewMode: (state) => {
            state.viewMode = state.viewMode === 'grid' ? 'list' : 'grid';
        },
        toggleFiltersPanel: (state) => {
            state.showFilters = !state.showFilters;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        clearError: (state) => {
            state.error = null;
        },
    },
});

export const {
    toggleViewMode,
    toggleFiltersPanel,
    setLoading,
    setError,
    clearError,
} = uiSlice.actions;
export default uiSlice.reducer;