import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

export interface AuthRequest extends Request {
  user?: { id: number; email: string }
}

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  const header = req.headers.authorization
  if (!header) return res.status(401).json({ error: 'Missing authorization header' })
  const token = header.replace('Bearer ', '')
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'devsecret') as any
    req.user = { id: decoded.id, email: decoded.email }
    next()
  } catch {
    res.status(401).json({ error: 'Invalid token' })
  }
}

