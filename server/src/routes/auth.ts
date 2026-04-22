import { Router } from 'express'
import { supabaseAdmin } from '../lib/supabase'
import { prisma } from '../lib/prisma'
import { requireAuth } from '../middleware/auth'
import { z } from 'zod'

const router = Router()

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

// POST /auth/login
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = LoginSchema.parse(req.body)

    const { data, error } = await supabaseAdmin.auth.signInWithPassword({
      email,
      password,
    })

    if (error || !data.user || !data.session) {
      res.status(401).json({ error: error?.message ?? 'Login failed' })
      return
    }

    const staff = await prisma.staff.findUnique({
      where: { id: data.user.id },
      include: { assignedOutlet: { select: { name: true } } },
    })

    if (!staff || !staff.isActive) {
      res.status(403).json({ error: 'Staff account not found or inactive' })
      return
    }

    res.json({
      token: data.session.access_token,
      refreshToken: data.session.refresh_token,
      userId: staff.id,
      fullName: staff.fullName,
      email: staff.email,
      role: staff.role,
      assignedOutletId: staff.assignedOutletId,
      assignedOutletName: staff.assignedOutlet?.name ?? null,
    })
  } catch (err) {
    next(err)
  }
})

// GET /cms/me — session restoration
router.get('/me', requireAuth, async (req, res, next) => {
  try {
    const staff = await prisma.staff.findUnique({
      where: { id: req.staff!.id },
      include: { assignedOutlet: { select: { name: true } } },
    })

    if (!staff) {
      res.status(404).json({ error: 'Staff not found' })
      return
    }

    res.json({
      token: '',
      refreshToken: '',
      userId: staff.id,
      fullName: staff.fullName,
      email: staff.email,
      role: staff.role,
      assignedOutletId: staff.assignedOutletId,
      assignedOutletName: staff.assignedOutlet?.name ?? null,
    })
  } catch (err) {
    next(err)
  }
})

export default router
