import { configureStore } from '@reduxjs/toolkit'
import productReducer from "@/redux/slice"

export default configureStore({
  reducer: {
    product : productReducer
  }
})