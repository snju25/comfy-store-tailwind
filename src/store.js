import { configureStore } from '@reduxjs/toolkit'
import cartSlice from './features/cartSlice'
import userSlice from './features/user/userSlice'

export const store = configureStore({
  reducer: {
    cartState: cartSlice,
    userState: userSlice,
  },
})