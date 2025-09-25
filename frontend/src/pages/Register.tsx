import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../utils/hooks'
import { register } from '../slices/authSlice'
import { Link } from 'react-router-dom'

export default function Register() {
  const dispatch = useAppDispatch()
  const status = useAppSelector((s) => s.auth.status)
  const error = useAppSelector((s) => s.auth.error)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white w-full max-w-md p-6 rounded shadow">
        <h1 className="text-xl font-semibold mb-4">Create account</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            dispatch(register({ name, email, password }))
          }}
          className="space-y-3"
        >
          <input className="w-full border rounded p-2" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <input className="w-full border rounded p-2" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input className="w-full border rounded p-2" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <button disabled={status==='loading'} className="w-full bg-blue-600 text-white py-2 rounded">{status==='loading' ? 'Creating...' : 'Create account'}</button>
        </form>
        <div className="text-sm text-gray-600 mt-3">Already have an account? <Link to="/login" className="text-blue-600">Log in</Link></div>
      </div>
    </div>
  )
}

