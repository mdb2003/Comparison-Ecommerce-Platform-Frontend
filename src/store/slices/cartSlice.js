import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../api';

// Async thunks for API operations
export const fetchCart = createAsyncThunk(
    'cart/fetchCart',
    async (_, { rejectWithValue }) => {
        try {
            const response = await API.get('cart/');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to fetch cart');
        }
    }
);

export const addItemToCart = createAsyncThunk(
    'cart/addItemToCart',
    async (product, { rejectWithValue }) => {
        try {
            const response = await API.post('cart/', {
                product_id: product.id || `${product.title}-${product.source}`,
                title: product.title,
                price: product.price,
                source: product.source,
                link: product.link,
                image: product.image,
                rating: product.rating,
                quantity: 1
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to add item to cart');
        }
    }
);

export const removeItemFromCart = createAsyncThunk(
    'cart/removeItemFromCart',
    async (product, { rejectWithValue }) => {
        try {
            const productId = product.id || `${product.title}-${product.source}`;
            const response = await API.delete('cart/', {
                data: { product_id: productId }
            });
            return { ...response.data, removed: productId };
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to remove item from cart');
        }
    }
);

export const updateItemQuantity = createAsyncThunk(
    'cart/updateItemQuantity',
    async ({ product, quantity }, { rejectWithValue, dispatch, getState }) => {
        try {
            const productId = product.id || `${product.title}-${product.source}`;
            
            // If quantity is 0, remove the item
            if (quantity <= 0) {
                return dispatch(removeItemFromCart(product));
            }
            
            // For updating quantity, we need to get current cart and modify it
            const currentState = getState();
            const currentItems = currentState.cart.items;
            
            // Create updated cart items
            const updatedItems = currentItems.map(item => {
                const itemId = item.id || `${item.title}-${item.source}`;
                if (itemId === productId) {
                    return { ...item, quantity };
                }
                return item;
            });
            
            // Update entire cart
            const response = await API.put('cart/', { items: updatedItems });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to update item quantity');
        }
    }
);

export const clearCartItems = createAsyncThunk(
    'cart/clearCartItems',
    async (_, { rejectWithValue }) => {
        try {
            const response = await API.delete('cart/');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to clear cart');
        }
    }
);

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        total: 0,
        loading: false,
        error: null
    },
    reducers: {
        // Keep these for offline/fallback functionality
        addToCart: (state, action) => {
            const existingItem = state.items.find(
                item => item.title === action.payload.title && 
                       item.source === action.payload.source
            );
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }
            
            state.total = state.items.reduce((total, item) => 
                total + (item.price * item.quantity), 0
            );
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter(
                item => !(item.title === action.payload.title && 
                         item.source === action.payload.source)
            );
            
            state.total = state.items.reduce((total, item) => 
                total + (item.price * item.quantity), 0
            );
        },
        updateQuantity: (state, action) => {
            const { product, quantity } = action.payload;
            const item = state.items.find(
                item => item.title === product.title && 
                       item.source === product.source
            );
            
            if (item) {
                item.quantity = Math.max(0, quantity);
                if (item.quantity === 0) {
                    state.items = state.items.filter(i => i !== item);
                }
            }
            
            state.total = state.items.reduce((total, item) => 
                total + (item.price * item.quantity), 0
            );
        },
        clearCart: (state) => {
            state.items = [];
            state.total = 0;
        },
        // Add a reducer to handle logout and clear cart state
        resetCartState: (state) => {
            state.items = [];
            state.total = 0;
            state.loading = false;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch Cart
            .addCase(fetchCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.items || [];
                state.total = state.items.reduce((total, item) => 
                    total + (item.price * item.quantity), 0
                );
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to fetch cart';
            })
            
            // Add Item to Cart
            .addCase(addItemToCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addItemToCart.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.items || [];
                state.total = state.items.reduce((total, item) => 
                    total + (item.price * item.quantity), 0
                );
            })
            .addCase(addItemToCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to add item to cart';
            })
            
            // Remove Item from Cart
            .addCase(removeItemFromCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeItemFromCart.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.items || [];
                state.total = state.items.reduce((total, item) => 
                    total + (item.price * item.quantity), 0
                );
            })
            .addCase(removeItemFromCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to remove item from cart';
            })
            
            // Update Item Quantity
            .addCase(updateItemQuantity.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateItemQuantity.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.items || [];
                state.total = state.items.reduce((total, item) => 
                    total + (item.price * item.quantity), 0
                );
            })
            .addCase(updateItemQuantity.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to update item quantity';
            })
            
            // Clear Cart
            .addCase(clearCartItems.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(clearCartItems.fulfilled, (state) => {
                state.loading = false;
                state.items = [];
                state.total = 0;
            })
            .addCase(clearCartItems.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to clear cart';
            });
    }
});

export const { addToCart, removeFromCart, updateQuantity, clearCart, resetCartState } = cartSlice.actions;
export default cartSlice.reducer; 