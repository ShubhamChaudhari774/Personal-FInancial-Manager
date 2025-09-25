import { configureStore } from '@reduxjs/toolkit'
import uiReducer from './slices/uiSlice'
import dataReducer from './slices/dataSlice'
import authReducer from './slices/authSlice'

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    data: dataReducer,
    auth: authReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

