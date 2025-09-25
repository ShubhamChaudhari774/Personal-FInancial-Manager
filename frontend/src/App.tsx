import { Route, Routes, Navigate } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Transactions from './pages/Transactions'
import Suggestions from './pages/Suggestions'
import MainLayout from './layouts/MainLayout'
import Login from './pages/Login'
import Register from './pages/Register'
import ProtectedRoute from './components/ProtectedRoute'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<ProtectedRoute><MainLayout><Dashboard /></MainLayout></ProtectedRoute>} />
      <Route path="/transactions" element={<ProtectedRoute><MainLayout><Transactions /></MainLayout></ProtectedRoute>} />
      <Route path="/suggestions" element={<ProtectedRoute><MainLayout><Suggestions /></MainLayout></ProtectedRoute>} />
    </Routes>
  )
}

