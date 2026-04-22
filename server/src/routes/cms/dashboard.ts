import { Router } from 'express'
import { prisma } from '../../lib/prisma'
import { requireAuth } from '../../middleware/auth'

const router = Router()
router.use(requireAuth)

function daysAgo(n: number): Date {
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  d.setDate(d.getDate() - n)
  return d
}

function monthRange(): { start: Date; end: Date } {
  const now = new Date()
  const start = new Date(now.getFullYear(), now.getMonth(), 1)
  const end   = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999)
  return { start, end }
}

// GET /cms/dashboard/stats
router.get('/stats', async (req, res, next) => {
  try {
    const isMainOwner = req.staff!.role === 'main_owner'
    const outletFilter = isMainOwner ? {} : { id: req.staff!.assignedOutletId ?? '' }

    const outlets = await prisma.outlet.findMany({
      where: outletFilter,
      select: { id: true, name: true, code: true },
    })
    const outletIds = outlets.map((o) => o.id)

    const thirtyDaysAgo = daysAgo(30)
    const sevenDaysAgo  = daysAgo(7)
    const { start: monthStart, end: monthEnd } = monthRange()

    const customerOutletWhere = isMainOwner
      ? { firstVisitOutletId: { in: outletIds } }
      : { firstVisitOutletId: req.staff!.assignedOutletId ?? '' }

    const [
      totalCustomers,
      totalReviews,
      totalVisits,
      avgStarsResult,
      inactiveCustomers,
      newCustomersThisWeek,
      newReviewsThisWeek,
      birthdaysThisMonth,
      anniversariesThisMonth,
    ] = await Promise.all([
      prisma.customer.count({ where: customerOutletWhere }),
      prisma.review.count({ where: { outletId: { in: outletIds } } }),
      prisma.customerVisit.count({ where: { outletId: { in: outletIds } } }),
      prisma.review.aggregate({
        where: { outletId: { in: outletIds } },
        _avg: { stars: true },
      }),
      // No visit in 30+ days (excludes never-visited customers)
      prisma.customer.count({
        where: {
          ...customerOutletWhere,
          lastVisitDate: { lt: thirtyDaysAgo },
        },
      }),
      // New in last 7 days
      prisma.customer.count({
        where: { ...customerOutletWhere, createdAt: { gte: sevenDaysAgo } },
      }),
      prisma.review.count({
        where: { outletId: { in: outletIds }, createdAt: { gte: sevenDaysAgo } },
      }),
      // Birthdays this month (by month+day range)
      prisma.customer.count({
        where: {
          ...customerOutletWhere,
          birthDate: { gte: monthStart, lte: monthEnd },
        },
      }),
      // Anniversaries this month
      prisma.customer.count({
        where: {
          ...customerOutletWhere,
          anniversaryDate: { gte: monthStart, lte: monthEnd },
        },
      }),
    ])

    // Per-outlet breakdown — main owner only
    const outletStats = isMainOwner
      ? await Promise.all(
          outlets.map(async (outlet) => {
            const [customers, reviews, visits, avgResult, inactiveCount] = await Promise.all([
              prisma.customer.count({ where: { firstVisitOutletId: outlet.id } }),
              prisma.review.count({ where: { outletId: outlet.id } }),
              prisma.customerVisit.count({ where: { outletId: outlet.id } }),
              prisma.review.aggregate({
                where: { outletId: outlet.id },
                _avg: { stars: true },
              }),
              prisma.customer.count({
                where: {
                  firstVisitOutletId: outlet.id,
                  lastVisitDate: { lt: thirtyDaysAgo },
                },
              }),
            ])
            return {
              outletCode:        outlet.code,
              outletName:        outlet.name,
              customers,
              reviews,
              visits,
              avgRating:         avgResult._avg.stars ?? null,
              inactiveCustomers: inactiveCount,
            }
          })
        )
      : null

    res.json({
      totalCustomers,
      totalReviews,
      totalVisits,
      averageRating:          avgStarsResult._avg.stars ?? null,
      inactiveCustomers,
      newCustomersThisWeek,
      newReviewsThisWeek,
      birthdaysThisMonth,
      anniversariesThisMonth,
      outletStats,
    })
  } catch (err) {
    next(err)
  }
})

export default router
