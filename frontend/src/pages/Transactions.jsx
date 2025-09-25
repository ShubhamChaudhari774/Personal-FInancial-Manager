import React, { useEffect, useState } from 'react'
import { Paper, Typography, Stack, TextField, Button, Grid, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { useSelector } from 'react-redux'
import { apiRequest } from '../api/client'

export default function Transactions() {
  const token = useSelector(s => s.auth.token)
  const [items, setItems] = useState([])
  const [form, setForm] = useState({ category: '', amount: '', date: '', description: '' })
  const [error, setError] = useState('')

  const load = async () => {
    try {
      const data = await apiRequest('/transactions', 'GET', undefined, token)
      setItems(data)
    } catch (e) {}
  }

  useEffect(() => { if (token) load() }, [token])

  const add = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const payload = { ...form, amount: Number(form.amount) }
      await apiRequest('/transactions', 'POST', payload, token)
      setForm({ category: '', amount: '', date: '', description: '' })
      await load()
    } catch (e) { setError(e.message) }
  }

  const remove = async (id) => {
    try {
      await apiRequest(`/transactions/${id}`, 'DELETE', undefined, token)
      await load()
    } catch {}
  }

  return (
    <Stack spacing={3}>
      <Typography variant="h5">Transactions</Typography>
      <Paper sx={{ p: 2 }}>
        <form onSubmit={add}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}><TextField label="Category" fullWidth value={form.category} onChange={e => setForm(f => ({...f, category: e.target.value}))} required /></Grid>
            <Grid item xs={12} md={3}><TextField label="Amount" type="number" fullWidth value={form.amount} onChange={e => setForm(f => ({...f, amount: e.target.value}))} required /></Grid>
            <Grid item xs={12} md={3}><TextField label="Date" type="date" fullWidth InputLabelProps={{ shrink: true }} value={form.date} onChange={e => setForm(f => ({...f, date: e.target.value}))} required /></Grid>
            <Grid item xs={12} md={3}><TextField label="Description" fullWidth value={form.description} onChange={e => setForm(f => ({...f, description: e.target.value}))} /></Grid>
            {error && <Grid item xs={12}><Typography color="error">{error}</Typography></Grid>}
            <Grid item xs={12}><Button type="submit" variant="contained">Add</Button></Grid>
          </Grid>
        </form>
      </Paper>
      <Paper sx={{ p: 2 }}>
        <Stack spacing={1}>
          {items.map(item => (
            <Grid container key={item.id} alignItems="center">
              <Grid item xs={3}><Typography>{item.category}</Typography></Grid>
              <Grid item xs={3}><Typography>${Number(item.amount).toFixed(2)}</Typography></Grid>
              <Grid item xs={3}><Typography>{item.date}</Typography></Grid>
              <Grid item xs={2}><Typography>{item.description}</Typography></Grid>
              <Grid item xs={1}>
                <IconButton onClick={() => remove(item.id)} aria-label="delete"><DeleteIcon /></IconButton>
              </Grid>
            </Grid>
          ))}
          {items.length === 0 && <Typography color="text.secondary">No transactions yet.</Typography>}
        </Stack>
      </Paper>
    </Stack>
  )
}
