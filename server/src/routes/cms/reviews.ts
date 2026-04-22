import { Router } from 'express'
import { prisma } from '../../lib/prisma'
import { paginate } from '../../lib/paginate'
import { requireAuth } from '../../middleware/auth'

const router = Router()

router.use(requireAuth)

// GET /cms/reviews
router.get('/', async (req, res, next) => {
  try {
    const page = parseInt(req.query.page as string) || 0
    const size = parseInt(req.query.size as string) || 20
    const isMainOwner = req.staff!.role === 'main_owner'

    const where = isMainOwner
      ? {}
      : { outletId: req.staff!.assignedOutletId ?? '' }

    const [reviews, total] = await Promise.all([
      prisma.review.findMany({
        where,
        skip: page * size,
        take: size,
        orderBy: { createdAt: 'desc' },
        include: {
          customer: { select: { fullName: true, phone: true } },
          outlet: { select: { name: true, code: true } },
        },
      }),
      prisma.review.count({ where }),
    ])

    res.json(paginate(reviews, total, page, size))
  } catch (err) {
    next(err)
  }
})

export default router
