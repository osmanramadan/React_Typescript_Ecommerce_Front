import { configureStore, combineReducers } from '@reduxjs/toolkit'
//import { useDispatch } from 'react-redux'
import categories from './categories/CategoriesSlice'
import products from './products/ProductsSlice'
import cart from './cart/CartSlice'
import wishlist from './wishlist/wishlistSlice'
import auth from './auth/authSlice'
import { persistStore, persistReducer } from 'redux-persist'
import storageModule from 'redux-persist/lib/storage'
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'


const rootPersistConfig = {
  key: 'root',
  storage: (storageModule as any).default ?? storageModule,
  whitelist: ['cart','auth'],
}


const authPersistConfig = {
  key: 'auth',
  storage: (storageModule as any).default ?? storageModule,
  whitelist: ['user','accessToken'],
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
  auth: persistReducer(authPersistConfig, auth)
})

const persistedReducer = persistReducer(rootPersistConfig,rootReducers)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

let persistor = persistStore(store)

// Export a hook that can be reused to resolve types
// export const useAppDispatch = useDispatch.withTypes<AppDispatch>()  ?

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export { store, persistor }
