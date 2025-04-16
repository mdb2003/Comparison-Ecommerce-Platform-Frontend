import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        total: 0,
    },
    reducers: {
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
    },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer; 