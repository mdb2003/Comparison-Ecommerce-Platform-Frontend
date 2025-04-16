import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../api';

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (query, { rejectWithValue }) => {
        try {
            console.log('Fetching products for query:', query);
            const response = await API.get(`search/?query=${encodeURIComponent(query)}`);
            console.log('API Response:', response.data);
            return response.data.products || [];
        } catch (error) {
            console.error('API Error:', error);
            return rejectWithValue(
                error.response?.data?.message || 
                'Failed to fetch products. Please try again later.'
            );
        }
    }
);

const initialState = {
    products: [],
    comparisonList: [],
    loading: false,
    error: null,
};

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        clearProducts: (state) => {
            state.products = [];
            state.error = null;
        },
        addToComparison: (state, action) => {
            if (state.comparisonList.length < 3 && 
                !state.comparisonList.some(p => p.title === action.payload.title)) {
                state.comparisonList.push(action.payload);
            }
        },
        removeFromComparison: (state, action) => {
            state.comparisonList = state.comparisonList.filter(
                product => product.title !== action.payload.title
            );
        },
        clearComparison: (state) => {
            state.comparisonList = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.products = [];
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = Array.isArray(action.payload) ? action.payload : [];
                console.log('Updated products in store:', state.products);
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.products = [];
            });
    },
});

export const { 
    clearProducts, 
    addToComparison, 
    removeFromComparison, 
    clearComparison 
} = productSlice.actions;

export default productSlice.reducer;