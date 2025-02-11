import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../api';

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (query, { rejectWithValue }) => {
        try {
            const response = await API.get(`search/?query=${query}`);
            return response.data.products;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch products');
        }
    }
);

const initialState = {
    products: [],
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
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearProducts } = productSlice.actions;
export default productSlice.reducer;