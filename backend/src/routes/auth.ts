import { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { User } from '../models'

const router = Router()

router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body
  const existing = await User.findOne({ where: { email } })
  if (existing) return res.status(400).json({ error: 'Email already in use' })
  const password_hash = await bcrypt.hash(password, 10)
  const user = await User.create({ name, email, password_hash })
  res.json({ id: user.id, name: user.name, email: user.email })
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ where: { email } })
  if (!user) return res.status(400).json({ error: 'Invalid credentials' })
  const valid = await bcrypt.compare(password, user.password_hash)
  if (!valid) return res.status(400).json({ error: 'Invalid credentials' })
  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || 'devsecret', { expiresIn: '7d' })
  res.json({ token })
})

export default router

