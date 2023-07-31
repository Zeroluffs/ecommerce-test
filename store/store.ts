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
