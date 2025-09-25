import React, { useEffect, useState } from 'react'
import { Grid, Paper, Typography, Stack, Card, CardContent } from '@mui/material'
import { useSelector } from 'react-redux'
import { apiRequest } from '../api/client'
import SpendingPie from '../components/SpendingPie'
import MonthlyLine from '../components/MonthlyLine'
import SuggestionsBar from '../components/SuggestionsBar'

export default function Dashboard() {
  const token = useSelector(s => s.auth.token)
  const [byCategory, setByCategory] = useState([])
  const [byMonth, setByMonth] = useState([])
  const [recommendations, setRecommendations] = useState([])

  useEffect(() => {
    if (!token) return
    ;(async () => {
      try {
        const dash = await apiRequest('/dashboard', 'GET', undefined, token)
        setByCategory(dash.byCategory || [])
        setByMonth(dash.byMonth || [])
      } catch {}
      try {
        const ai = await apiRequest('/analytics', 'GET', undefined, token)
        setRecommendations(ai.recommendations || [])
      } catch {}
    })()
  }, [token])

  return (
    <Stack spacing={3}>
      <Typography variant="h5">Dashboard</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: 360 }}>
            <Typography variant="subtitle1" gutterBottom>Spending by Category</Typography>
            <SpendingPie data={byCategory} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: 360 }}>
            <Typography variant="subtitle1" gutterBottom>Monthly Expenses</Typography>
            <MonthlyLine data={byMonth} />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1" gutterBottom>AI Suggestions (10% reductions)</Typography>
            <SuggestionsBar data={recommendations} />
            <Grid container spacing={2} sx={{ mt: 1 }}>
              {recommendations.map((r, idx) => (
                <Grid item xs={12} md={4} key={idx}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">{r.category}</Typography>
                      <Typography variant="body2">{r.suggestion}</Typography>
                      <Typography variant="subtitle2" sx={{ mt: 1 }}>Estimated savings: ${r.estimated_savings}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Stack>
  )
}
