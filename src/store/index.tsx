import {configureStore, combineReducers} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

// Reducers
import favoriteReducer from './slices/favorites';
import cartReducer from './slices/cart';
// API
import {productApi} from './api/product';

const rootReducer = combineReducers({
  favorites: favoriteReducer,
  cart: cartReducer,
  [productApi.reducerPath]: productApi.reducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: {
        warnAfter: 1000,
      },
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        warnAfter: 1000,
      },
    }).concat(productApi.middleware),
});

// Define RootState type
export type RootState = ReturnType<typeof rootReducer>;

// Redux hooks with types
export const persistor = persistStore(store);
