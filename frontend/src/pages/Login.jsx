import React, { useState } from 'react'
import { TextField, Button, Paper, Stack, Typography } from '@mui/material'
import { apiRequest } from '../api/client'
import { useDispatch } from 'react-redux'
import { setCredentials } from '../store/authSlice'
import { useNavigate, Link } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const data = await apiRequest('/auth/login', 'POST', { email, password })
      dispatch(setCredentials(data))
      navigate('/')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <Paper sx={{ maxWidth: 400, mx: 'auto', mt: 8, p: 3 }}>
      <Typography variant="h5" gutterBottom>Login</Typography>
      <form onSubmit={onSubmit}>
        <Stack spacing={2}>
          <TextField label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          <TextField label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          {error && <Typography color="error">{error}</Typography>}
          <Button type="submit" variant="contained">Login</Button>
          <Typography variant="body2">No account? <Link to="/signup">Sign up</Link></Typography>
        </Stack>
      </form>
    </Paper>
  )
}
