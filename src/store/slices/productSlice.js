import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../api';

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (query, { rejectWithValue }) => {
        try {
            console.log('Fetching products for query:', query);
            const response = await API.get(`search/?query=${encodeURIComponent(query)}`);
            console.log('API Response:', response.data);
            
            // Make sure we're returning the products array properly
            if (response.data && response.data.products) {
                const products = response.data.products;
                
                // Log source distribution for debugging
                const sources = {};
                products.forEach(product => {
                    const source = product.source || 'Unknown';
                    sources[source] = (sources[source] || 0) + 1;
                });
                console.log('Fetched products by source:', sources);
                
                return products;
            } else {
                console.error('Invalid response format:', response.data);
                return [];
            }
        } catch (error) {
            console.error('API Error:', error);
            
            // Handle network errors separately
            if (!error.response) {
                return rejectWithValue(
                    error.message || 
                    'Failed to connect to the server. Please check if the backend server is running.'
                );
            }
            
            // For other types of errors, use the response data message if available
            return rejectWithValue(
                error.response?.data?.message || 
                'Failed to fetch products. Please try again later.'
            );
        }
    }
);

// For testing only - remove in production
export const fetchTestProducts = createAsyncThunk(
    'products/fetchTestProducts',
    async (query, { rejectWithValue }) => {
        try {
            // Mock data for when server is down
            console.log('Using test data for query:', query);
            const testProducts = [
                {
                    id: '1',
                    title: 'Test TV 55" Smart 4K',
                    price: 49999,
                    source: 'Amazon',
                    image: 'https://via.placeholder.com/300x300.png?text=Test+TV+1',
                    rating: 4.5,
                    link: 'https://www.amazon.com/test'
                },
                {
                    id: '2',
                    title: 'Test TV 43" LED Full HD',
                    price: 32999,
                    source: 'Flipkart',
                    image: 'https://via.placeholder.com/300x300.png?text=Test+TV+2',
                    rating: 4.2,
                    link: 'https://www.flipkart.com/test'
                }
            ];
            
            return testProducts;
        } catch (error) {
            return rejectWithValue('Error loading test data');
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
                console.log('Updated products in store:', state.products.length, 'items');
                // If products array is empty, log a warning
                if (state.products.length === 0) {
                    console.warn('No products returned from API');
                } else {
                    // Log source distribution for debugging
                    const sources = {};
                    state.products.forEach(product => {
                        const source = product.source || 'Unknown';
                        sources[source] = (sources[source] || 0) + 1;
                    });
                    console.log('Products in store by source:', sources);
                }
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to load products. Please try again.';
                state.products = [];
                
                console.error('Error fetching products:', action.payload);
            })
            // Test products actions
            .addCase(fetchTestProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTestProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = Array.isArray(action.payload) ? action.payload : [];
                state.error = null;
            })
            .addCase(fetchTestProducts.rejected, (state, action) => {
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