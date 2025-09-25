import { Router } from 'express'
import { authMiddleware, AuthRequest } from '../middleware/auth'
import fetch from 'node-fetch'

const router = Router()

router.use(authMiddleware)

router.get('/', async (_req: AuthRequest, res) => {
  const url = `${process.env.AI_SERVICE_URL || 'http://localhost:8000'}/analyze`
  try {
    const r = await fetch(url)
    const data = await r.json()
    res.json(data)
  } catch (e) {
    res.status(502).json({ error: 'AI service unavailable' })
  }
})

export default router

