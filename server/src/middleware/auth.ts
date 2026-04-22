import { Request, Response, NextFunction } from 'express'
import { supabaseAdmin } from '../lib/supabase'
import { prisma } from '../lib/prisma'

export interface StaffPayload {
  id: string
  fullName: string
  email: string
  role: string
  assignedOutletId: string | null
}

declare global {
  namespace Express {
    interface Request {
      staff?: StaffPayload
    }
  }
}

export async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Missing or invalid Authorization header' })
    return
  }

  const token = authHeader.split(' ')[1]

  try {
    const {
      data: { user },
      error,
    } = await supabaseAdmin.auth.getUser(token)

    if (error || !user) {
      res.status(401).json({ error: 'Invalid or expired token' })
      return
    }

    const staff = await prisma.staff.findUnique({ where: { id: user.id } })

    if (!staff || !staff.isActive) {
      res.status(403).json({ error: 'Staff account not found or inactive' })
      return
    }

    req.staff = {
      id: staff.id,
      fullName: staff.fullName,
      email: staff.email,
      role: staff.role,
      assignedOutletId: staff.assignedOutletId,
    }

    next()
  } catch (err) {
    res.status(500).json({ error: 'Authentication error' })
  }
}

export function requireMainOwner(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (req.staff?.role !== 'main_owner') {
    res.status(403).json({ error: 'Main owner access required' })
    return
  }
  next()
}
