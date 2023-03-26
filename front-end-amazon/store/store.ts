import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST, persistReducer, PURGE,
  REGISTER,
  REHYDRATE
} from 'redux-persist';
import persistStore from 'redux-persist/es/persistStore';
import storage from 'redux-persist/lib/storage';
import { userSlice } from './user/user.slice';

import { carouselSlice } from './carousel/carousel.slice';
import { cartSlice } from './cart/cart.slice';

const persistConfig = {
  key: 'amaz-on',
  storage,
  whitlist: ['cart'],
};

const rootReducer = combineReducers({
  cart: cartSlice.reducer,
  carousel: carouselSlice.reducer,
  user: userSlice.reducer
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

export type TypeRootState = ReturnType<typeof store.getState>

export const persistor = persistStore(store);
