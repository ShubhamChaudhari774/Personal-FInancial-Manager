import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function Nav() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [token, setToken] = useState<string | null>(null)
  useEffect(() => {
    setToken(localStorage.getItem('token'))
  }, [pathname])
  const link = (to: string, label: string) => (
    <Link
      to={to}
      className={`px-3 py-2 rounded hover:bg-blue-50 ${pathname === to ? 'text-blue-700 font-semibold' : 'text-gray-700'}`}
    >
      {label}
    </Link>
  )
  return (
    <nav className="w-full bg-white border-b">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-3">
        <div className="font-bold text-lg">Finance</div>
        <div className="space-x-2">
          {link('/dashboard', 'Dashboard')}
          {link('/transactions', 'Transactions')}
          {link('/suggestions', 'AI Suggestions')}
          {token ? (
            <button
              onClick={() => { localStorage.removeItem('token'); navigate('/login') }}
              className="px-3 py-2 rounded bg-gray-100 hover:bg-gray-200"
            >Logout</button>
          ) : (
            <Link to="/login" className="px-3 py-2 rounded bg-blue-600 text-white">Login</Link>
          )}
        </div>
      </div>
    </nav>
  )
}

