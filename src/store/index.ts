import { configureStore, combineReducers } from '@reduxjs/toolkit'
import categories from './categories/CategoriesSlice'
import products from './products/ProductsSlice'
import cart from './cart/CartSlice'
import wishlist from './wishlist/wishlistSlice'
import auth from './auth/authSlice'
import orders from './orders/ordersSlice'
import { persistStore, persistReducer } from 'redux-persist'
import storageModule from 'redux-persist/lib/storage'
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'

const rootPersistConfig = {
  key: 'root',
  storage: (storageModule as any).default ?? storageModule,
  whitelist: ['cart', 'auth'],
}

const authPersistConfig = {
  key: 'auth',
  storage: (storageModule as any).default ?? storageModule,
  whitelist: ['user', 'accessToken'],
}

const cartPersistConfig = {
  key: 'cart',
  storage: (storageModule as any).default ?? storageModule,
  whitelist: ['items'],
}

const wishlistPersistConfig = {
  key: 'wishlist',
  storage: (storageModule as any).default ?? storageModule,
  whitelist: ['itemsId'],
}

const rootReducers = combineReducers({
  categories,
  products,
  wishlist: persistReducer(wishlistPersistConfig, wishlist),
  cart: persistReducer(cartPersistConfig, cart),
  auth: persistReducer(authPersistConfig, auth),
  orders,
})

const persistedReducer = persistReducer(rootPersistConfig, rootReducers)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export { store, persistor }
