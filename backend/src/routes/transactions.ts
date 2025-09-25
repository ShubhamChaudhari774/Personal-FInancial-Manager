import { Router } from 'express'
import { Transaction } from '../models'
import { authMiddleware, AuthRequest } from '../middleware/auth'

const router = Router()

router.use(authMiddleware)

router.get('/', async (req: AuthRequest, res) => {
  const items = await Transaction.findAll({ where: { user_id: req.user!.id }, order: [['date', 'DESC']] })
  res.json(items)
})

router.post('/', async (req: AuthRequest, res) => {
  const { category, amount, date, description } = req.body
  const item = await Transaction.create({ user_id: req.user!.id, category, amount, date, description })
  res.json(item)
})

router.put('/:id', async (req: AuthRequest, res) => {
  const { id } = req.params
  const item = await Transaction.findOne({ where: { id, user_id: req.user!.id } })
  if (!item) return res.status(404).json({ error: 'Not found' })
  await item.update(req.body)
  res.json(item)
})

router.delete('/:id', async (req: AuthRequest, res) => {
  const { id } = req.params
  const item = await Transaction.findOne({ where: { id, user_id: req.user!.id } })
  if (!item) return res.status(404).json({ error: 'Not found' })
  await item.destroy()
  res.json({ ok: true })
})

export default router

