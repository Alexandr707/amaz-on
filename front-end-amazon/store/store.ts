import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST, persistReducer,
  persistStore, PURGE,
  REGISTER,
  REHYDRATE
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { cartSlice } from './cart/cart.slice';
import { userSlice } from './user/user.slice';

const persistConfig = {
  key: 'amaz-on',
  storage,
  whitlist: ['cart'],
};

const rootReducer = combineReducers({
  cart: cartSlice.reducer,
  // carousel: carouselSlice.reducer,
  user: userSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultmiddleware =>
    getDefaultmiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
      
    }),
});

export type TypeRootState = ReturnType<typeof store.getState>;

export const persistor = persistStore(store);
