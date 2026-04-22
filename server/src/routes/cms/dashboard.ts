import { Router } from 'express'
import { prisma } from '../../lib/prisma'
import { requireAuth, requireMainOwner } from '../../middleware/auth'

const router = Router()

router.use(requireAuth)

// GET /cms/dashboard/stats
router.get('/stats', async (req, res, next) => {
  try {
    const isMainOwner = req.staff!.role === 'main_owner'

    const outletFilter = isMainOwner
      ? {}
      : { id: req.staff!.assignedOutletId ?? '' }

    const outlets = await prisma.outlet.findMany({
      where: outletFilter,
      select: { id: true, name: true, code: true, slug: true },
    })

    const outletIds = outlets.map((o) => o.id)

    const [totalCustomers, totalReviews, totalVisits, avgStarsResult] =
      await Promise.all([
        prisma.customer.count({
          where: isMainOwner
            ? {}
            : { firstVisitOutletId: req.staff!.assignedOutletId ?? '' },
        }),
        prisma.review.count({
          where: { outletId: { in: outletIds } },
        }),
        prisma.customerVisit.count({
          where: { outletId: { in: outletIds } },
        }),
        prisma.review.aggregate({
          where: { outletId: { in: outletIds } },
          _avg: { stars: true },
        }),
      ])

    const outletStats = await Promise.all(
      outlets.map(async (outlet) => {
        const [customers, reviews, visits] = await Promise.all([
          prisma.customer.count({
            where: { firstVisitOutletId: outlet.id },
          }),
          prisma.review.count({ where: { outletId: outlet.id } }),
          prisma.customerVisit.count({ where: { outletId: outlet.id } }),
        ])
        return { outlet, customers, reviews, visits }
      })
    )

    res.json({
      totalCustomers,
      totalReviews,
      totalVisits,
      avgStars: avgStarsResult._avg.stars ?? 0,
      outletStats: isMainOwner ? outletStats : undefined,
    })
  } catch (err) {
    next(err)
  }
})

export default router
