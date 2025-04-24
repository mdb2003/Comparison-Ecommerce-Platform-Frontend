import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../api';

// Async thunks for API operations
export const fetchSavedItems = createAsyncThunk(
    'savedItems/fetchSavedItems',
    async (_, { rejectWithValue }) => {
        try {
            const response = await API.get('saved-items/');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to fetch saved items');
        }
    }
);

export const addSavedItem = createAsyncThunk(
    'savedItems/addSavedItem',
    async (product, { rejectWithValue }) => {
        try {
            const response = await API.post('saved-items/', {
                product_id: product.id || `${product.title}-${product.source}`,
                title: product.title,
                price: product.price,
                source: product.source,
                link: product.link,
                image: product.image,
                rating: product.rating
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to add saved item');
        }
    }
);

export const removeSavedItem = createAsyncThunk(
    'savedItems/removeSavedItem',
    async (product, { rejectWithValue }) => {
        try {
            const productId = product.id || `${product.title}-${product.source}`;
            const response = await API.delete('saved-items/', {
                data: { product_id: productId }
            });
            return { ...response.data, removed: productId };
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to remove saved item');
        }
    }
);

export const toggleSavedItemAsync = createAsyncThunk(
    'savedItems/toggleSavedItemAsync',
    async (product, { rejectWithValue, getState, dispatch }) => {
        try {
            const state = getState();
            const productId = product.id || `${product.title}-${product.source}`;
            
            // Check if item exists in saved items
            const isAlreadySaved = state.savedItems.items.some(item => {
                const itemId = item.id || `${item.title}-${item.source}`;
                return itemId === productId;
            });
            
            if (isAlreadySaved) {
                return dispatch(removeSavedItem(product));
            } else {
                return dispatch(addSavedItem(product));
            }
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to toggle saved item');
        }
    }
);

const savedItemsSlice = createSlice({
    name: 'savedItems',
    initialState: {
        items: [],
        loading: false,
        error: null
    },
    reducers: {
        // Keep these for offline/fallback functionality
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
        // Add a reducer to handle logout
        resetSavedItemsState: (state) => {
            state.items = [];
            state.loading = false;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch Saved Items
            .addCase(fetchSavedItems.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSavedItems.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload || [];
            })
            .addCase(fetchSavedItems.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to fetch saved items';
            })
            
            // Add Saved Item
            .addCase(addSavedItem.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addSavedItem.fulfilled, (state, action) => {
                state.loading = false;
                // If the backend returns a single item, add it
                if (action.payload && !Array.isArray(action.payload)) {
                    const existingIndex = state.items.findIndex(
                        item => item.product_id === action.payload.product_id
                    );
                    
                    if (existingIndex === -1) {
                        state.items.push(action.payload);
                    }
                }
            })
            .addCase(addSavedItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to add saved item';
            })
            
            // Remove Saved Item
            .addCase(removeSavedItem.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeSavedItem.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload.removed) {
                    state.items = state.items.filter(item => 
                        (item.id || `${item.title}-${item.source}`) !== action.payload.removed
                    );
                }
            })
            .addCase(removeSavedItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to remove saved item';
            });
    }
});

export const { toggleSavedItem, clearSavedItems, resetSavedItemsState } = savedItemsSlice.actions;
export default savedItemsSlice.reducer; 