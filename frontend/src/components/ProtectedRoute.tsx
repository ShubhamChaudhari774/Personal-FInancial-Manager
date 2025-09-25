import { Navigate, useLocation } from 'react-router-dom'

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const token = typeof localStorage !== 'undefined' ? localStorage.getItem('token') : null
  const location = useLocation()
  if (!token) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }
  return children
}

