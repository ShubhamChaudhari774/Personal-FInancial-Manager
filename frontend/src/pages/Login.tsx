import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../utils/hooks'
import { login } from '../slices/authSlice'
import { Navigate, Link } from 'react-router-dom'

export default function Login() {
  const dispatch = useAppDispatch()
  const token = useAppSelector((s) => s.auth.token)
  const status = useAppSelector((s) => s.auth.status)
  const error = useAppSelector((s) => s.auth.error)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  if (token) return <Navigate to="/dashboard" replace />

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white w-full max-w-md p-6 rounded shadow">
        <h1 className="text-xl font-semibold mb-4">Log in</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            dispatch(login({ email, password }))
          }}
          className="space-y-3"
        >
          <input className="w-full border rounded p-2" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input className="w-full border rounded p-2" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <button disabled={status==='loading'} className="w-full bg-blue-600 text-white py-2 rounded">{status==='loading' ? 'Signing in...' : 'Sign in'}</button>
        </form>
        <div className="text-sm text-gray-600 mt-3">Don't have an account? <Link to="/register" className="text-blue-600">Register</Link></div>
      </div>
    </div>
  )
}

