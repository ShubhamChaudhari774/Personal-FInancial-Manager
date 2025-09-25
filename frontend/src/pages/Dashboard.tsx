import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../utils/hooks'
import { fetchDashboard } from '../slices/dataSlice'
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend, BarChart, Bar } from 'recharts'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#7C3AED', '#EF4444']

export default function Dashboard() {
  const dispatch = useAppDispatch()
  const dashboard = useAppSelector((s) => s.data.dashboard)

  useEffect(() => {
    dispatch(fetchDashboard())
  }, [dispatch])

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg shadow p-4 h-80">
          <h2 className="font-medium mb-2">Spending by Category</h2>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={dashboard?.byCategory || []} dataKey="value" nameKey="name" outerRadius={100}>
                {(dashboard?.byCategory || []).map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-lg shadow p-4 h-80">
          <h2 className="font-medium mb-2">Monthly Expenses</h2>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dashboard?.monthlyTotals || []}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="expenses" stroke="#2563EB" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-lg shadow p-4 h-80 md:col-span-2">
          <h2 className="font-medium mb-2">Suggested Reductions</h2>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={(dashboard?.byCategory || []).map((d) => ({ category: d.name, reduction: Math.round(d.value * 0.1) }))}>
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="reduction" fill="#16A34A" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

