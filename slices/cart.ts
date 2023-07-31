import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit'
import { RootState } from '@/store/store'

const initialState = {
  items: [] as Product[],
  status: 'idle',
  error: null,
}
export const addToCart = createAsyncThunk('cart/addToCart', async (product: Product) => {
  console.log('product', product)
  return product
})
const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  extraReducers(builder) {
    builder.addCase(addToCart.fulfilled, (state, action) => {
      state.items.push(action.payload)
    })
  },
  reducers: {},
})

export default cartSlice.reducer

export const numberOfItems = (state: RootState) => state.cart.items.length
export const totalPrice = (state: { cart: { items: any[] } }) => {
  let total = 0
  state.cart.items.map((item) => {
    total += item.price
  })
  return total
}
