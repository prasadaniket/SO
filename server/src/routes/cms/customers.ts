import { Router } from 'express'
import { prisma } from '../../lib/prisma'
import { paginate } from '../../lib/paginate'
import { requireAuth } from '../../middleware/auth'

const router = Router()

router.use(requireAuth)

// GET /cms/customers
router.get('/', async (req, res, next) => {
  try {
    const page = parseInt(req.query.page as string) || 0
    const size = parseInt(req.query.size as string) || 20
    const isMainOwner = req.staff!.role === 'main_owner'

    const where = isMainOwner
      ? {}
      : { firstVisitOutletId: req.staff!.assignedOutletId ?? '' }

    const [customers, total] = await Promise.all([
      prisma.customer.findMany({
        where,
        skip: page * size,
        take: size,
        orderBy: { createdAt: 'desc' },
        include: { firstVisitOutlet: { select: { name: true, code: true } } },
      }),
      prisma.customer.count({ where }),
    ])

    res.json(paginate(customers, total, page, size))
  } catch (err) {
    next(err)
  }
})

// GET /cms/customers/:id — individual customer with their reviews
router.get('/:id', async (req, res, next) => {
  try {
    const customer = await prisma.customer.findUnique({
      where: { id: req.params.id },
      include: { firstVisitOutlet: { select: { name: true, code: true } } },
    })

    if (!customer) {
      res.status(404).json({ error: 'Customer not found' })
      return
    }

    // Scope check for franchise owners
    if (
      req.staff!.role === 'franchise_owner' &&
      customer.firstVisitOutletId !== req.staff!.assignedOutletId
    ) {
      res.status(403).json({ error: 'Access denied' })
      return
    }

    res.json(customer)
  } catch (err) {
    next(err)
  }
})

export default router
