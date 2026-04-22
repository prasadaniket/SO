import { Router } from 'express'
import { prisma } from '../lib/prisma'
import { z } from 'zod'

const router = Router()

const CreateCustomerSchema = z.object({
  deviceId: z.string().min(1),
  fullName: z.string().min(1),
  phone: z.string().min(10).max(15),
  email: z.string().email().nullable().optional(),
  birthDate: z.string(),
  anniversaryDate: z.string().nullable().optional(),
  gender: z.enum(['Male', 'Female', 'Transgender', 'RatherNotSay']),
  maritalStatus: z.enum(['Married', 'Unmarried']),
  firstVisitOutletId: z.string().uuid().nullable().optional(),
})

// GET /customers/by-device/:deviceId
router.get('/by-device/:deviceId', async (req, res, next) => {
  try {
    const { deviceId } = req.params
    const customer = await prisma.customer.findUnique({
      where: { deviceId },
      include: { firstVisitOutlet: true },
    })

    if (!customer) {
      res.status(404).json({ error: 'Customer not found' })
      return
    }

    res.json(customer)
  } catch (err) {
    next(err)
  }
})

// POST /customers — upsert on deviceId so re-submission doesn't 500
router.post('/', async (req, res, next) => {
  try {
    const body = CreateCustomerSchema.parse(req.body)

    const parsedBirth = new Date(body.birthDate)
    const parsedAnniversary = body.anniversaryDate ? new Date(body.anniversaryDate) : null

    try {
      const customer = await prisma.customer.upsert({
        where: { deviceId: body.deviceId },
        create: {
          deviceId:           body.deviceId,
          fullName:           body.fullName,
          phone:              body.phone,
          email:              body.email ?? null,
          birthDate:          parsedBirth,
          anniversaryDate:    parsedAnniversary,
          gender:             body.gender,
          maritalStatus:      body.maritalStatus,
          firstVisitOutletId: body.firstVisitOutletId ?? null,
          lastVisitDate:      new Date(),
          totalVisits:        1,
        },
        update: {
          fullName:        body.fullName,
          phone:           body.phone,
          email:           body.email ?? null,
          birthDate:       parsedBirth,
          anniversaryDate: parsedAnniversary,
          gender:          body.gender,
          maritalStatus:   body.maritalStatus,
          lastVisitDate:   new Date(),
        },
      })
      res.status(201).json(customer)
    } catch (prismaErr: any) {
      // P2002 = unique constraint violation
      // Check both code and message since meta.target format varies by Prisma version
      const isUniqueViolation = prismaErr?.code === 'P2002' ||
        prismaErr?.message?.includes('Unique constraint failed')

      if (isUniqueViolation) {
        // Phone already registered on another device — link this device to existing customer
        const existing = await prisma.customer.findUnique({ where: { phone: body.phone } })
        if (existing) {
          const updated = await prisma.customer.update({
            where: { id: existing.id },
            data: { deviceId: body.deviceId, lastVisitDate: new Date() },
          })
          res.status(201).json(updated)
          return
        }
      }
      throw prismaErr
    }
  } catch (err) {
    next(err)
  }
})

export default router
