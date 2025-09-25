import { Router } from 'express'
import { sequelize, Transaction } from '../models'
import { QueryTypes } from 'sequelize'
import { authMiddleware, AuthRequest } from '../middleware/auth'

const router = Router()

router.use(authMiddleware)

router.get('/', async (req: AuthRequest, res) => {
  const userId = req.user!.id

  const byCategory = await sequelize.query<{ name: string; value: number }>(
    'SELECT category as name, SUM(amount) as value FROM transactions WHERE user_id = :userId AND date >= DATE_SUB(CURDATE(), INTERVAL 90 DAY) GROUP BY category',
    { replacements: { userId }, type: QueryTypes.SELECT }
  )

  const monthlyTotals = await sequelize.query<{ month: string; expenses: number }>(
    "SELECT DATE_FORMAT(date, '%Y-%m') as month, SUM(amount) as expenses FROM transactions WHERE user_id = :userId AND date >= DATE_SUB(CURDATE(), INTERVAL 180 DAY) GROUP BY DATE_FORMAT(date, '%Y-%m') ORDER BY month",
    { replacements: { userId }, type: QueryTypes.SELECT }
  )

  res.json({ byCategory, monthlyTotals })
})

export default router

