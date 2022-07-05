import { configureStore } from '@reduxjs/toolkit'
import listReducer from './features/listSlice'

export default configureStore({
  reducer: {
    list: listReducer
  },
})