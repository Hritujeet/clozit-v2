import { configureStore } from '@reduxjs/toolkit'
import cartReducer from '@/lib/redux/cart/cartSlice'

export default configureStore({
  reducer: {
    cart: cartReducer
  }
})