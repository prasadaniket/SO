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
        // On re-submit: update personal info but keep firstVisitOutletId unchanged
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
  } catch (err) {
    next(err)
  }
})

export default router
