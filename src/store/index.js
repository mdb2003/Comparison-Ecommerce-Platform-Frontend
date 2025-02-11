import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import productReducer from './slices/productSlice';
import searchReducer from './slices/searchSlice';
import filterReducer from './slices/filterSlice';
import uiReducer from './slices/uiSlice';
import authReducer from './slices/authSlice';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['search', 'auth'], // Only persist search history and auth state
};

const store = configureStore({
    reducer: {
        products: productReducer,
        search: persistReducer(persistConfig, searchReducer),
        filter: filterReducer,
        ui: uiReducer,
        auth: persistReducer(persistConfig, authReducer),
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store);
export default store;