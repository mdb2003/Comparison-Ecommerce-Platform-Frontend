import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    priceRange: {
        min: 0,
        max: 100000,
    },
    selectedRatings: [],
    selectedStores: [],
    sortOrder: 'relevance', // 'relevance', 'price_low', 'price_high', 'rating'
};

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setPriceRange: (state, action) => {
            state.priceRange = action.payload;
        },
        toggleRating: (state, action) => {
            const rating = action.payload;
            const index = state.selectedRatings.indexOf(rating);
            if (index === -1) {
                state.selectedRatings.push(rating);
            } else {
                state.selectedRatings.splice(index, 1);
            }
        },
        toggleStore: (state, action) => {
            const store = action.payload;
            const index = state.selectedStores.indexOf(store);
            if (index === -1) {
                state.selectedStores.push(store);
            } else {
                state.selectedStores.splice(index, 1);
            }
        },
        setSortOrder: (state, action) => {
            state.sortOrder = action.payload;
        },
        clearFilters: (state) => {
            state.priceRange = initialState.priceRange;
            state.selectedRatings = [];
            state.selectedStores = [];
            state.sortOrder = 'relevance';
        },
    },
});

export const {
    setPriceRange,
    toggleRating,
    toggleStore,
    setSortOrder,
    clearFilters,
} = filterSlice.actions;
export default filterSlice.reducer;