import { Router } from 'express'
import { prisma } from '../lib/prisma'
import { z } from 'zod'

const router = Router()

const CreateReviewSchema = z.object({
  customerId: z.string().uuid().nullable().optional(),
  outletId: z.string().uuid(),
  reviewText: z.string().nullable().optional(),
  stars: z.number().int().min(1).max(5),
  reviewType: z.enum(['first_visit', 'repeat']),
})

// POST /reviews
router.post('/', async (req, res, next) => {
  try {
    const body = CreateReviewSchema.parse(req.body)

    const review = await prisma.review.create({ data: body })

    // Mark hasSubmittedFirstReview on first visit
    if (body.customerId && body.reviewType === 'first_visit') {
      await prisma.customer.update({
        where: { id: body.customerId },
        data: { hasSubmittedFirstReview: true },
      })
    }

    res.status(201).json(review)
  } catch (err) {
    next(err)
  }
})

export default router
