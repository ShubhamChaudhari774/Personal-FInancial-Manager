import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

type AuthState = {
  token: string | null
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error?: string
}

const initialState: AuthState = {
  token: typeof localStorage !== 'undefined' ? localStorage.getItem('token') : null,
  status: 'idle',
}

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000'

export const login = createAsyncThunk(
  'auth/login',
  async (payload: { email: string; password: string }) => {
    const res = await fetch(`${API_BASE}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      throw new Error(err.error || 'Login failed')
    }
    return (await res.json()) as { token: string }
  }
)

export const register = createAsyncThunk(
  'auth/register',
  async (payload: { name: string; email: string; password: string }) => {
    const res = await fetch(`${API_BASE}/api/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      throw new Error(err.error || 'Signup failed')
    }
    return (await res.json()) as { id: number; name: string; email: string }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.token = null
      localStorage.removeItem('token')
    },
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload
      localStorage.setItem('token', action.payload)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading'
        state.error = undefined
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.token = action.payload.token
        localStorage.setItem('token', action.payload.token)
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(register.pending, (state) => {
        state.status = 'loading'
        state.error = undefined
      })
      .addCase(register.fulfilled, (state) => {
        state.status = 'succeeded'
      })
      .addCase(register.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export const { logout, setToken } = authSlice.actions
export default authSlice.reducer

