import { configureStore } from '@reduxjs/toolkit'
import cartReducer from '../slices/cart'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import cart from '../slices/cart'
import AsyncStorage from '@react-native-async-storage/async-storage'
const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
}
const persistedReducer = persistReducer(persistConfig, cartReducer)

// const reducer = {
//   cart: cartReducer,
// }

// const store = configureStore({
//   reducer: reducer,
//   devTools: true,
// })
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

export { store, persistor }

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
