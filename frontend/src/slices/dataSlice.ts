import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { get } from '../utils/api'

type Transaction = {
  id: number
  category: string
  amount: number
  date: string
  description?: string
}

type Suggestion = {
  category: string
  suggestion: string
  estimated_savings: number
}

type DashboardData = {
  byCategory: { name: string; value: number }[]
  monthlyTotals: { month: string; expenses: number; savings?: number }[]
}

type DataState = {
  transactions: Transaction[]
  suggestions: Suggestion[]
  dashboard: DashboardData | null
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
}

const initialState: DataState = {
  transactions: [],
  suggestions: [],
  dashboard: null,
  status: 'idle',
}

export const fetchDashboard = createAsyncThunk('data/fetchDashboard', async () => {
  return (await get('/api/dashboard')) as DashboardData
})

export const fetchSuggestions = createAsyncThunk('data/fetchSuggestions', async () => {
  return (await get('/api/analytics')) as Suggestion[]
})

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboard.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchDashboard.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.dashboard = action.payload
      })
      .addCase(fetchDashboard.rejected, (state) => {
        state.status = 'failed'
      })
      .addCase(fetchSuggestions.fulfilled, (state, action) => {
        state.suggestions = action.payload
      })
  },
})

export default dataSlice.reducer

