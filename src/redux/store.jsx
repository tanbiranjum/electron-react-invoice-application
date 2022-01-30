import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import invoiceSlice from './invoiceSlice'

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
})
const store = configureStore({
  reducer: {
    invoice: invoiceSlice,
  },
  middleware: customizedMiddleware,
})

export default store
