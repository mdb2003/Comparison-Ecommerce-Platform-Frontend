import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import productReducer from './slices/productSlice';
import searchReducer from './slices/searchSlice';
import filterReducer from './slices/filterSlice';
import uiReducer from './slices/uiSlice';
import authReducer from './slices/authSlice';
import savedItemsReducer from './slices/savedItemsSlice';
import cartReducer from './slices/cartSlice';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['search', 'auth', 'savedItems', 'cart'], // Add savedItems and cart to whitelist
};

// Create persist reducers for savedItems and cart
const savedItemsPersistConfig = {
    key: 'savedItems',
    storage,
};

const cartPersistConfig = {
    key: 'cart',
    storage,
};

const store = configureStore({
    reducer: {
        products: productReducer,
        search: persistReducer(persistConfig, searchReducer),
        filter: filterReducer,
        ui: uiReducer,
        auth: persistReducer(persistConfig, authReducer),
        savedItems: persistReducer(savedItemsPersistConfig, savedItemsReducer), // Persist savedItems
        cart: persistReducer(cartPersistConfig, cartReducer), // Persist cart
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store);
export default store;