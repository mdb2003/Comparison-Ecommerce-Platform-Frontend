import { createSlice } from '@reduxjs/toolkit';

const savedItemsSlice = createSlice({
    name: 'savedItems',
    initialState: {
        items: [],
    },
    reducers: {
        toggleSavedItem: (state, action) => {
            const itemIndex = state.items.findIndex(
                item => item.title === action.payload.title && item.source === action.payload.source
            );
            
            if (itemIndex >= 0) {
                // Remove item if it exists
                state.items.splice(itemIndex, 1);
            } else {
                // Add item if it doesn't exist
                state.items.push(action.payload);
            }
        },
        clearSavedItems: (state) => {
            state.items = [];
        },
    },
});

export const { toggleSavedItem, clearSavedItems } = savedItemsSlice.actions;
export default savedItemsSlice.reducer; 