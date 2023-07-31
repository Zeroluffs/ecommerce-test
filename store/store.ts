import { configureStore } from '@reduxjs/toolkit'
import cartReducer from '../slices/cart'

const reducer = {
  cart: cartReducer,
}

const store = configureStore({
  reducer: reducer,
  devTools: true,
})

export default store

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
