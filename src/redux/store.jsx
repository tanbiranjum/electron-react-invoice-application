import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import invoiceSlice from './invoiceSlice'
import authSlice from './authSlice'

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
})
const store = configureStore({
  reducer: {
    invoice: invoiceSlice,
    auth: authSlice,
  },
  middleware: customizedMiddleware,
})

export default store
