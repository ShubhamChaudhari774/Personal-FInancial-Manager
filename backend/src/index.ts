import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { sequelize } from './models'
import authRoutes from './routes/auth'
import transactionRoutes from './routes/transactions'
import dashboardRoutes from './routes/dashboard'
import analyticsRoutes from './routes/analytics'

const app = express()

app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }))
app.use(express.json())
app.use(morgan('dev'))

app.use('/api/auth', authRoutes)
app.use('/api/transactions', transactionRoutes)
app.use('/api/dashboard', dashboardRoutes)
app.use('/api/analytics', analyticsRoutes)

app.get('/api/health', (_req, res) => {
  res.json({ ok: true })
})

const port = process.env.PORT || 4000

async function start() {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    app.listen(port, () => console.log(`API running on :${port}`))
  } catch (err) {
    console.error('Failed to start server', err)
    process.exit(1)
  }
}

start()

