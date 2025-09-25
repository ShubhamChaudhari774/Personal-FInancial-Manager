import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function SuggestionsBar({ data }) {
  const chartData = (data || []).map(d => ({ category: d.category, savings: Number(d.estimated_savings) }))
  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="category" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="savings" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  )
}
