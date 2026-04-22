import { Router } from 'express'
import { prisma } from '../lib/prisma'
import { z } from 'zod'

const router = Router()

const CreateVisitSchema = z.object({
  customerId: z.string().uuid().optional(),
  deviceId: z.string().min(1),
  outletId: z.string().uuid(),
  visitType: z.enum(['qr_scan', 'payment']).default('qr_scan'),
})

// POST /visits
router.post('/', async (req, res, next) => {
  try {
    const body = CreateVisitSchema.parse(req.body)

    const visit = await prisma.customerVisit.create({ data: body })

    // Update customer's lastVisitDate and totalVisits
    if (body.customerId) {
      await prisma.customer.update({
        where: { id: body.customerId },
        data: {
          lastVisitDate: new Date(),
          totalVisits: { increment: 1 },
        },
      })
    }

    res.status(201).json(visit)
  } catch (err) {
    next(err)
  }
})

export default router
