import { prisma } from '../lib/prisma'
import { supabaseAdmin } from '../lib/supabase'

// ─── Staff setup data ──────────────────────────────────────────────────────────

const STAFF = [
  {
    email:     'unicord26@gmail.com',
    password:  'Avi26#uni',
    fullName:  'Aniket (UniCord)',
    role:      'admin' as const,
    outlet:    null, // admin has access to all
  },
  {
    email:     'owner@stoneoven.com',
    password:  'Stoneoven',
    fullName:  'Nitesh Save',
    role:      'owner' as const,
    outlet:    null, // owner sees all outlets
  },
  {
    email:     'fbowner@stoneoven.com',
    password:  'Stoneoven.fb',
    fullName:  'Franchise Owner — Boisar',
    role:      'franchise_owner' as const,
    outlet:    'boisar',
  },
  {
    email:     'fpowner@stoneoven.com',
    password:  'Stoneoven.fp',
    fullName:  'Franchise Owner — Palghar',
    role:      'franchise_owner' as const,
    outlet:    'palghar',
  },
  {
    email:     'fviowner@stoneoven.com',
    password:  'Stoneoven.fvi',
    fullName:  'Franchise Owner — Virar',
    role:      'franchise_owner' as const,
    outlet:    'virar',
  },
  {
    email:     'fvaowner@stoneoven.com',
    password:  'Stoneoven.fva',
    fullName:  'Franchise Owner — Vasai',
    role:      'franchise_owner' as const,
    outlet:    'vasai',
  },
]

async function main() {
  console.log('=== StoneOven Staff Setup ===\n')

  // Load all outlets by slug
  const outlets = await prisma.outlet.findMany({ select: { id: true, slug: true, name: true } })
  const outletBySlug: Record<string, string> = {}
  for (const o of outlets) outletBySlug[o.slug] = o.id
  console.log('Outlets loaded:', outlets.map(o => `${o.slug}(${o.id.slice(0,8)}..)`).join(', '))

  // Migrate existing main_owner records to admin
  const migrated = await prisma.staff.updateMany({
    where: { role: 'main_owner' },
    data:  { role: 'admin' },
  })
  if (migrated.count > 0) {
    console.log(`Migrated ${migrated.count} main_owner records → admin`)
  }

  for (const staff of STAFF) {
    console.log(`\n→ Processing: ${staff.email} (${staff.role})`)

    const assignedOutletId = staff.outlet ? outletBySlug[staff.outlet] : null

    if (!assignedOutletId && staff.outlet) {
      console.error(`  ❌ Outlet slug "${staff.outlet}" not found in DB! Skipping.`)
      continue
    }

    // 1. Create or update Supabase Auth user
    let authUserId: string | null = null

    // First try to find existing auth user
    const { data: existingUsers } = await supabaseAdmin.auth.admin.listUsers()
    const existingUser = existingUsers?.users?.find(u => u.email === staff.email)

    if (existingUser) {
      authUserId = existingUser.id
      // Update password
      await supabaseAdmin.auth.admin.updateUserById(existingUser.id, {
        password: staff.password,
        email_confirm: true,
      })
      console.log(`  ✅ Auth user exists, password updated. ID: ${authUserId.slice(0,8)}..`)
    } else {
      const { data: newUser, error } = await supabaseAdmin.auth.admin.createUser({
        email:            staff.email,
        password:         staff.password,
        email_confirm:    true,
        user_metadata:    { fullName: staff.fullName, role: staff.role },
      })
      if (error || !newUser?.user) {
        console.error(`  ❌ Failed to create auth user: ${error?.message}`)
        continue
      }
      authUserId = newUser.user.id
      console.log(`  ✅ Auth user created. ID: ${authUserId.slice(0,8)}..`)
    }

    // 2. Upsert staff DB record
    const staffRecord = await prisma.staff.upsert({
      where:  { id: authUserId },
      create: {
        id:               authUserId,
        email:            staff.email,
        fullName:         staff.fullName,
        role:             staff.role,
        assignedOutletId: assignedOutletId,
        isActive:         true,
      },
      update: {
        email:            staff.email,
        fullName:         staff.fullName,
        role:             staff.role,
        assignedOutletId: assignedOutletId,
        isActive:         true,
      },
    })
    console.log(`  ✅ Staff DB record upserted. Role: ${staffRecord.role}, Outlet: ${assignedOutletId?.slice(0,8) ?? 'all'}`)
  }

  console.log('\n=== Staff setup complete! ===\n')

  // Final summary
  const allStaff = await prisma.staff.findMany({
    include: { assignedOutlet: { select: { name: true } } },
    orderBy: { createdAt: 'asc' },
  })
  console.log('Current staff in DB:')
  for (const s of allStaff) {
    console.log(`  ${s.role.padEnd(16)} | ${s.email.padEnd(32)} | ${s.assignedOutlet?.name ?? 'All Outlets'}`)
  }
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
