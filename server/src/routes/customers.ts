import { Router } from 'express'
import { prisma } from '../lib/prisma'
import { z } from 'zod'

const router = Router()

const CreateCustomerSchema = z.object({
  deviceId: z.string().min(1),
  fullName: z.string().min(1),
  phone: z.string().min(10).max(15),
  email: z.string().email().optional(),
  birthDate: z.string(), // ISO date string
  anniversaryDate: z.string().optional(),
  gender: z.enum(['Male', 'Female', 'Transgender', 'RatherNotSay']),
  maritalStatus: z.enum(['Married', 'Unmarried']),
  firstVisitOutletId: z.string().uuid().optional(),
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

// POST /customers
router.post('/', async (req, res, next) => {
  try {
    const body = CreateCustomerSchema.parse(req.body)

    const customer = await prisma.customer.create({
      data: {
        ...body,
        birthDate: new Date(body.birthDate),
        anniversaryDate: body.anniversaryDate
          ? new Date(body.anniversaryDate)
          : null,
        lastVisitDate: new Date(),
      },
    })

    res.status(201).json(customer)
  } catch (err) {
    next(err)
  }
})

export default router
