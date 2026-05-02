import { Router } from 'express'
import type { Request, RequestHandler, Response } from 'express'
import { z } from 'zod'
import { supabaseAdmin } from '../config/supabase'
import { missingRequiredEnv } from '../config/env'
import { createError } from '../middleware/errorHandler'
import {
  type AuthenticatedRequest,
  isBankAdmin,
  isNationalAdmin,
  requireAuth,
  requireRoles,
} from '../middleware/auth'

export const router = Router()

type Row = Record<string, unknown>

const asyncHandler = (handler: (req: Request, res: Response) => Promise<void>): RequestHandler => {
  return (req, res, next) => {
    handler(req, res).catch(next)
  }
}

const ok = <T>(res: Response, data: T, message = 'OK', status = 200): void => {
  res.status(status).json({ success: true, message, data })
}

const parsePaging = (req: Request): { page: number; pageSize: number; from: number; to: number } => {
  const page = Math.max(Number(req.query.page ?? 1), 1)
  const pageSize = Math.min(Math.max(Number(req.query.pageSize ?? 25), 1), 100)
  const from = (page - 1) * pageSize
  const to = from + pageSize - 1
  return { page, pageSize, from, to }
}

const pick = (input: Row, fields: string[]): Row => {
  return fields.reduce<Row>((acc, field) => {
    if (input[field] !== undefined) acc[field] = input[field]
    return acc
  }, {})
}

const idSchema = z.string().uuid()

const donorFields = [
  'profile_id',
  'blood_group',
  'weight_kg',
  'date_of_birth',
  'gender',
  'is_available',
  'is_eligible',
  'last_donation_date',
  'city',
  'address',
  'medical_conditions',
  'medications',
]

const requestFields = [
  'requester_id',
  'blood_group',
  'component',
  'units_needed',
  'urgency',
  'status',
  'hospital_name',
  'city',
  'patient_name',
  'contact_phone',
  'notes',
  'expires_at',
  'fulfilled_at',
]

const bankFields = [
  'admin_id',
  'name',
  'type',
  'city',
  'address',
  'phone',
  'email',
  'is_verified',
  'is_active',
  'latitude',
  'longitude',
]

const inventoryFields = ['blood_bank_id', 'blood_group', 'component', 'units', 'expiry_date']
const appointmentFields = ['donor_id', 'blood_bank_id', 'scheduled_at', 'status', 'notes']
const donationHistoryFields = ['donor_id', 'blood_bank_id', 'blood_group', 'component', 'units', 'donated_at', 'certificate_url']
const notificationFields = ['user_id', 'type', 'title', 'message', 'is_read', 'data']
const campaignFields = ['title', 'description', 'blood_group', 'city', 'starts_at', 'ends_at', 'is_active', 'created_by']

const assertOwnProfile = (req: AuthenticatedRequest, profileId: unknown): void => {
  if (!isNationalAdmin(req) && profileId !== req.auth.userId) {
    throw createError('You can only manage your own record', 403)
  }
}

const assertBankAccess = async (req: AuthenticatedRequest, bankId: unknown): Promise<void> => {
  if (isNationalAdmin(req)) return
  if (!bankId || typeof bankId !== 'string') throw createError('Blood bank id is required', 400)

  const { data, error } = await supabaseAdmin
    .from('blood_banks')
    .select('id')
    .eq('id', bankId)
    .eq('admin_id', req.auth.userId)
    .maybeSingle()

  if (error) throw error
  if (!data) throw createError('You can only manage your own blood bank', 403)
}

const publicDonorSelect = `
  id,
  blood_group,
  is_available,
  is_eligible,
  last_donation_date,
  total_donations,
  city,
  address,
  profile:profiles(id, full_name, city, is_verified)
`

router.get('/ping', (_req, res) => {
  res.json({ success: true, message: 'Pakistan Bloodcare API is running' })
})

router.get('/config/status', (_req, res) => {
  const missing = missingRequiredEnv()
  res.status(missing.length ? 503 : 200).json({
    success: missing.length === 0,
    message: missing.length
      ? 'Missing required Vercel environment variables'
      : 'Required environment variables are configured',
    missing,
  })
})

router.get('/supabase/status', asyncHandler(async (_req, res) => {
  const { error } = await supabaseAdmin.auth.admin.listUsers({ page: 1, perPage: 1 })
  if (error) throw error
  ok(res, null, 'Supabase connection established')
}))

router.get('/auth/me', requireAuth, asyncHandler(async (req, res) => {
  ok(res, (req as AuthenticatedRequest).auth.profile, 'Authenticated profile')
}))

router.patch('/auth/me', requireAuth, asyncHandler(async (req, res) => {
  const authReq = req as AuthenticatedRequest
  const update = pick(req.body as Row, ['full_name', 'phone', 'avatar_url', 'city', 'cnic'])
  const { data, error } = await supabaseAdmin
    .from('profiles')
    .update(update)
    .eq('id', authReq.auth.userId)
    .select('*')
    .single()

  if (error) throw error
  ok(res, data, 'Profile updated')
}))

router.get('/donors', asyncHandler(async (req, res) => {
  const { from, to, page, pageSize } = parsePaging(req)
  let query = supabaseAdmin
    .from('donors')
    .select(publicDonorSelect, { count: 'exact' })
    .range(from, to)
    .order('total_donations', { ascending: false })

  if (req.query.blood_group) query = query.eq('blood_group', String(req.query.blood_group))
  if (req.query.city) query = query.ilike('city', String(req.query.city))
  if (req.query.available !== 'false') query = query.eq('is_available', true).eq('is_eligible', true)

  const { data, error, count } = await query
  if (error) throw error
  ok(res, { data, total: count ?? 0, page, pageSize, totalPages: Math.ceil((count ?? 0) / pageSize) })
}))

router.get('/donors/:id', asyncHandler(async (req, res) => {
  idSchema.parse(req.params.id)
  const { data, error } = await supabaseAdmin
    .from('donors')
    .select(publicDonorSelect)
    .eq('id', req.params.id)
    .single()

  if (error) throw error
  ok(res, data)
}))

router.post('/donors', requireAuth, asyncHandler(async (req, res) => {
  const authReq = req as AuthenticatedRequest
  const payload = { ...pick(req.body as Row, donorFields), profile_id: authReq.auth.userId }
  const { data, error } = await supabaseAdmin.from('donors').insert(payload).select('*').single()
  if (error) throw error
  ok(res, data, 'Donor profile created', 201)
}))

router.patch('/donors/:id', requireAuth, asyncHandler(async (req, res) => {
  idSchema.parse(req.params.id)
  const authReq = req as AuthenticatedRequest
  const { data: donor, error: donorError } = await supabaseAdmin
    .from('donors')
    .select('profile_id')
    .eq('id', req.params.id)
    .single()

  if (donorError) throw donorError
  assertOwnProfile(authReq, (donor as { profile_id: string }).profile_id)

  const { data, error } = await supabaseAdmin
    .from('donors')
    .update(pick(req.body as Row, donorFields))
    .eq('id', req.params.id)
    .select('*')
    .single()

  if (error) throw error
  ok(res, data, 'Donor profile updated')
}))

router.get('/blood-requests', requireAuth, asyncHandler(async (req, res) => {
  const authReq = req as AuthenticatedRequest
  const { from, to, page, pageSize } = parsePaging(req)
  let query = supabaseAdmin
    .from('blood_requests')
    .select('*, requester:profiles(id, full_name, phone, city)', { count: 'exact' })
    .range(from, to)
    .order('created_at', { ascending: false })

  if (!isBankAdmin(authReq)) query = query.eq('requester_id', authReq.auth.userId)
  if (req.query.status) query = query.eq('status', String(req.query.status))
  if (req.query.city) query = query.ilike('city', String(req.query.city))
  if (req.query.blood_group) query = query.eq('blood_group', String(req.query.blood_group))

  const { data, error, count } = await query
  if (error) throw error
  ok(res, { data, total: count ?? 0, page, pageSize, totalPages: Math.ceil((count ?? 0) / pageSize) })
}))

router.post('/blood-requests', requireAuth, asyncHandler(async (req, res) => {
  const authReq = req as AuthenticatedRequest
  const payload = { ...pick(req.body as Row, requestFields), requester_id: authReq.auth.userId }
  const { data, error } = await supabaseAdmin.from('blood_requests').insert(payload).select('*').single()
  if (error) throw error
  ok(res, data, 'Blood request created', 201)
}))

router.patch('/blood-requests/:id', requireAuth, asyncHandler(async (req, res) => {
  idSchema.parse(req.params.id)
  const authReq = req as AuthenticatedRequest
  const { data: request, error: requestError } = await supabaseAdmin
    .from('blood_requests')
    .select('requester_id')
    .eq('id', req.params.id)
    .single()

  if (requestError) throw requestError
  if (!isBankAdmin(authReq)) assertOwnProfile(authReq, (request as { requester_id: string }).requester_id)

  const { data, error } = await supabaseAdmin
    .from('blood_requests')
    .update(pick(req.body as Row, requestFields))
    .eq('id', req.params.id)
    .select('*')
    .single()

  if (error) throw error
  ok(res, data, 'Blood request updated')
}))

router.post('/blood-requests/:id/matches', requireAuth, requireRoles(['blood_bank_admin', 'national_admin']), asyncHandler(async (req, res) => {
  idSchema.parse(req.params.id)
  const { data, error } = await supabaseAdmin.rpc('match_donors_for_request', { request_id: req.params.id })
  if (error) throw error
  ok(res, data, 'Matching donors found')
}))

router.get('/blood-banks', asyncHandler(async (req, res) => {
  const { from, to, page, pageSize } = parsePaging(req)
  let query = supabaseAdmin
    .from('blood_banks')
    .select('*', { count: 'exact' })
    .eq('is_active', true)
    .range(from, to)
    .order('name')

  if (req.query.city) query = query.ilike('city', String(req.query.city))
  if (req.query.verified !== 'false') query = query.eq('is_verified', true)

  const { data, error, count } = await query
  if (error) throw error
  ok(res, { data, total: count ?? 0, page, pageSize, totalPages: Math.ceil((count ?? 0) / pageSize) })
}))

router.post('/blood-banks', requireAuth, requireRoles(['blood_bank_admin', 'national_admin']), asyncHandler(async (req, res) => {
  const authReq = req as AuthenticatedRequest
  const payload = { ...pick(req.body as Row, bankFields), admin_id: isNationalAdmin(authReq) ? req.body.admin_id ?? authReq.auth.userId : authReq.auth.userId }
  const { data, error } = await supabaseAdmin.from('blood_banks').insert(payload).select('*').single()
  if (error) throw error
  ok(res, data, 'Blood bank created', 201)
}))

router.patch('/blood-banks/:id', requireAuth, requireRoles(['blood_bank_admin', 'national_admin']), asyncHandler(async (req, res) => {
  idSchema.parse(req.params.id)
  await assertBankAccess(req as AuthenticatedRequest, req.params.id)

  const { data, error } = await supabaseAdmin
    .from('blood_banks')
    .update(pick(req.body as Row, bankFields))
    .eq('id', req.params.id)
    .select('*')
    .single()

  if (error) throw error
  ok(res, data, 'Blood bank updated')
}))

router.delete('/blood-banks/:id', requireAuth, requireRoles(['national_admin']), asyncHandler(async (req, res) => {
  idSchema.parse(req.params.id)
  const { error } = await supabaseAdmin.from('blood_banks').delete().eq('id', req.params.id)
  if (error) throw error
  ok(res, null, 'Blood bank deleted')
}))

router.get('/inventory', requireAuth, asyncHandler(async (req, res) => {
  let query = supabaseAdmin
    .from('blood_inventory')
    .select('*, blood_bank:blood_banks(id, name, city, admin_id)')
    .order('updated_at', { ascending: false })

  if (req.query.blood_bank_id) query = query.eq('blood_bank_id', String(req.query.blood_bank_id))
  if (req.query.blood_group) query = query.eq('blood_group', String(req.query.blood_group))
  if (req.query.component) query = query.eq('component', String(req.query.component))

  const { data, error } = await query
  if (error) throw error
  ok(res, data)
}))

router.post('/inventory', requireAuth, requireRoles(['blood_bank_admin', 'national_admin']), asyncHandler(async (req, res) => {
  await assertBankAccess(req as AuthenticatedRequest, req.body.blood_bank_id)
  const { data, error } = await supabaseAdmin.from('blood_inventory').insert(pick(req.body as Row, inventoryFields)).select('*').single()
  if (error) throw error
  ok(res, data, 'Inventory item created', 201)
}))

router.patch('/inventory/:id', requireAuth, requireRoles(['blood_bank_admin', 'national_admin']), asyncHandler(async (req, res) => {
  idSchema.parse(req.params.id)
  const { data: item, error: itemError } = await supabaseAdmin.from('blood_inventory').select('blood_bank_id').eq('id', req.params.id).single()
  if (itemError) throw itemError
  await assertBankAccess(req as AuthenticatedRequest, (item as { blood_bank_id: string }).blood_bank_id)

  const { data, error } = await supabaseAdmin
    .from('blood_inventory')
    .update(pick(req.body as Row, inventoryFields))
    .eq('id', req.params.id)
    .select('*')
    .single()

  if (error) throw error
  ok(res, data, 'Inventory item updated')
}))

router.delete('/inventory/:id', requireAuth, requireRoles(['blood_bank_admin', 'national_admin']), asyncHandler(async (req, res) => {
  idSchema.parse(req.params.id)
  const { data: item, error: itemError } = await supabaseAdmin.from('blood_inventory').select('blood_bank_id').eq('id', req.params.id).single()
  if (itemError) throw itemError
  await assertBankAccess(req as AuthenticatedRequest, (item as { blood_bank_id: string }).blood_bank_id)

  const { error } = await supabaseAdmin.from('blood_inventory').delete().eq('id', req.params.id)
  if (error) throw error
  ok(res, null, 'Inventory item deleted')
}))

router.get('/appointments', requireAuth, asyncHandler(async (req, res) => {
  const authReq = req as AuthenticatedRequest
  let query = supabaseAdmin
    .from('appointments')
    .select('*, donor:donors(id, profile_id, blood_group, profile:profiles(full_name, phone)), blood_bank:blood_banks(id, name, admin_id, city)')
    .order('scheduled_at', { ascending: true })

  if (authReq.auth.role === 'donor') {
    const { data: donor } = await supabaseAdmin.from('donors').select('id').eq('profile_id', authReq.auth.userId).maybeSingle()
    query = query.eq('donor_id', (donor as { id?: string } | null)?.id ?? '00000000-0000-0000-0000-000000000000')
  }

  if (authReq.auth.role === 'blood_bank_admin') {
    const { data: banks } = await supabaseAdmin.from('blood_banks').select('id').eq('admin_id', authReq.auth.userId)
    const bankIds = ((banks ?? []) as { id: string }[]).map((bank) => bank.id)
    query = bankIds.length ? query.in('blood_bank_id', bankIds) : query.eq('blood_bank_id', '00000000-0000-0000-0000-000000000000')
  }

  const { data, error } = await query
  if (error) throw error
  ok(res, data)
}))

router.post('/appointments', requireAuth, asyncHandler(async (req, res) => {
  const payload = pick(req.body as Row, appointmentFields)
  const authReq = req as AuthenticatedRequest

  if (authReq.auth.role === 'donor') {
    const { data: donor, error: donorError } = await supabaseAdmin.from('donors').select('id').eq('profile_id', authReq.auth.userId).single()
    if (donorError) throw donorError
    payload.donor_id = (donor as { id: string }).id
  }

  if (authReq.auth.role === 'blood_bank_admin') await assertBankAccess(authReq, payload.blood_bank_id)

  const { data, error } = await supabaseAdmin.from('appointments').insert(payload).select('*').single()
  if (error) throw error
  ok(res, data, 'Appointment created', 201)
}))

router.patch('/appointments/:id', requireAuth, asyncHandler(async (req, res) => {
  idSchema.parse(req.params.id)
  const authReq = req as AuthenticatedRequest
  const { data: appt, error: apptError } = await supabaseAdmin.from('appointments').select('donor_id, blood_bank_id').eq('id', req.params.id).single()
  if (apptError) throw apptError

  if (authReq.auth.role === 'blood_bank_admin') await assertBankAccess(authReq, (appt as { blood_bank_id: string }).blood_bank_id)
  if (authReq.auth.role === 'donor') {
    const { data: donor } = await supabaseAdmin.from('donors').select('id').eq('profile_id', authReq.auth.userId).maybeSingle()
    if ((appt as { donor_id: string }).donor_id !== (donor as { id?: string } | null)?.id) throw createError('You can only update your own appointments', 403)
  }

  const { data, error } = await supabaseAdmin
    .from('appointments')
    .update(pick(req.body as Row, appointmentFields))
    .eq('id', req.params.id)
    .select('*')
    .single()

  if (error) throw error
  ok(res, data, 'Appointment updated')
}))

router.delete('/appointments/:id', requireAuth, asyncHandler(async (req, res) => {
  idSchema.parse(req.params.id)
  const authReq = req as AuthenticatedRequest
  const { data: appt, error: apptError } = await supabaseAdmin.from('appointments').select('donor_id, blood_bank_id').eq('id', req.params.id).single()
  if (apptError) throw apptError

  if (authReq.auth.role === 'blood_bank_admin') await assertBankAccess(authReq, (appt as { blood_bank_id: string }).blood_bank_id)
  if (authReq.auth.role === 'donor') {
    const { data: donor } = await supabaseAdmin.from('donors').select('id').eq('profile_id', authReq.auth.userId).maybeSingle()
    if ((appt as { donor_id: string }).donor_id !== (donor as { id?: string } | null)?.id) throw createError('You can only delete your own appointments', 403)
  }

  const { error } = await supabaseAdmin.from('appointments').delete().eq('id', req.params.id)
  if (error) throw error
  ok(res, null, 'Appointment deleted')
}))

router.get('/donation-history', requireAuth, asyncHandler(async (req, res) => {
  const authReq = req as AuthenticatedRequest
  let query = supabaseAdmin
    .from('donation_history')
    .select('*, donor:donors(id, profile_id, blood_group, profile:profiles(full_name, phone)), blood_bank:blood_banks(id, name, admin_id, city)')
    .order('donated_at', { ascending: false })

  if (authReq.auth.role === 'donor') {
    const { data: donor } = await supabaseAdmin.from('donors').select('id').eq('profile_id', authReq.auth.userId).maybeSingle()
    query = query.eq('donor_id', (donor as { id?: string } | null)?.id ?? '00000000-0000-0000-0000-000000000000')
  }

  if (authReq.auth.role === 'blood_bank_admin') {
    const { data: banks } = await supabaseAdmin.from('blood_banks').select('id').eq('admin_id', authReq.auth.userId)
    const bankIds = ((banks ?? []) as { id: string }[]).map((bank) => bank.id)
    query = bankIds.length ? query.in('blood_bank_id', bankIds) : query.eq('blood_bank_id', '00000000-0000-0000-0000-000000000000')
  }

  const { data, error } = await query
  if (error) throw error
  ok(res, data)
}))

router.post('/donation-history', requireAuth, requireRoles(['blood_bank_admin', 'national_admin']), asyncHandler(async (req, res) => {
  const payload = pick(req.body as Row, donationHistoryFields)
  await assertBankAccess(req as AuthenticatedRequest, payload.blood_bank_id)

  const { data, error } = await supabaseAdmin.from('donation_history').insert(payload).select('*').single()
  if (error) throw error
  ok(res, data, 'Donation recorded', 201)
}))

router.get('/donor-badges/:donorId', requireAuth, asyncHandler(async (req, res) => {
  idSchema.parse(req.params.donorId)
  const { data, error } = await supabaseAdmin
    .from('donor_badges')
    .select('*')
    .eq('donor_id', req.params.donorId)
    .order('earned_at', { ascending: false })

  if (error) throw error
  ok(res, data)
}))

router.get('/notifications', requireAuth, asyncHandler(async (req, res) => {
  const authReq = req as AuthenticatedRequest
  const { data, error } = await supabaseAdmin
    .from('notifications')
    .select('*')
    .eq('user_id', authReq.auth.userId)
    .order('created_at', { ascending: false })

  if (error) throw error
  ok(res, data)
}))

router.patch('/notifications/:id', requireAuth, asyncHandler(async (req, res) => {
  idSchema.parse(req.params.id)
  const authReq = req as AuthenticatedRequest
  const { data, error } = await supabaseAdmin
    .from('notifications')
    .update(pick(req.body as Row, ['is_read']))
    .eq('id', req.params.id)
    .eq('user_id', authReq.auth.userId)
    .select('*')
    .single()

  if (error) throw error
  ok(res, data, 'Notification updated')
}))

router.post('/notifications', requireAuth, requireRoles(['blood_bank_admin', 'national_admin']), asyncHandler(async (req, res) => {
  const { data, error } = await supabaseAdmin.from('notifications').insert(pick(req.body as Row, notificationFields)).select('*').single()
  if (error) throw error
  ok(res, data, 'Notification created', 201)
}))

router.get('/admin/stats', requireAuth, requireRoles(['national_admin']), asyncHandler(async (_req, res) => {
  const [profiles, donors, banks, requests, appointments, inventory] = await Promise.all([
    supabaseAdmin.from('profiles').select('id', { count: 'exact', head: true }),
    supabaseAdmin.from('donors').select('id', { count: 'exact', head: true }),
    supabaseAdmin.from('blood_banks').select('id', { count: 'exact', head: true }),
    supabaseAdmin.from('blood_requests').select('id', { count: 'exact', head: true }),
    supabaseAdmin.from('appointments').select('id', { count: 'exact', head: true }),
    supabaseAdmin.from('blood_inventory').select('units'),
  ])

  const errors = [profiles.error, donors.error, banks.error, requests.error, appointments.error, inventory.error].filter(Boolean)
  if (errors[0]) throw errors[0]

  const totalUnits = ((inventory.data ?? []) as { units: number }[]).reduce((sum, item) => sum + Number(item.units ?? 0), 0)
  ok(res, {
    users: profiles.count ?? 0,
    donors: donors.count ?? 0,
    bloodBanks: banks.count ?? 0,
    bloodRequests: requests.count ?? 0,
    appointments: appointments.count ?? 0,
    inventoryUnits: totalUnits,
  })
}))

router.get('/admin/users', requireAuth, requireRoles(['national_admin']), asyncHandler(async (req, res) => {
  const { from, to, page, pageSize } = parsePaging(req)
  let query = supabaseAdmin.from('profiles').select('*', { count: 'exact' }).range(from, to).order('created_at', { ascending: false })
  if (req.query.role) query = query.eq('role', String(req.query.role))
  if (req.query.search) query = query.or(`full_name.ilike.%${String(req.query.search)}%,email.ilike.%${String(req.query.search)}%`)

  const { data, error, count } = await query
  if (error) throw error
  ok(res, { data, total: count ?? 0, page, pageSize, totalPages: Math.ceil((count ?? 0) / pageSize) })
}))

router.patch('/admin/users/:id', requireAuth, requireRoles(['national_admin']), asyncHandler(async (req, res) => {
  idSchema.parse(req.params.id)
  const update = pick(req.body as Row, ['full_name', 'phone', 'role', 'city', 'cnic', 'is_verified', 'avatar_url'])
  const { data, error } = await supabaseAdmin.from('profiles').update(update).eq('id', req.params.id).select('*').single()
  if (error) throw error
  ok(res, data, 'User updated')
}))

router.delete('/admin/users/:id', requireAuth, requireRoles(['national_admin']), asyncHandler(async (req, res) => {
  const userId = idSchema.parse(req.params.id)
  const { error } = await supabaseAdmin.auth.admin.deleteUser(userId)
  if (error) throw error
  ok(res, null, 'User deleted')
}))

router.get('/admin/campaigns', requireAuth, requireRoles(['national_admin']), asyncHandler(async (_req, res) => {
  const { data, error } = await supabaseAdmin.from('campaigns').select('*').order('created_at', { ascending: false })
  if (error) throw error
  ok(res, data)
}))

router.post('/admin/campaigns', requireAuth, requireRoles(['national_admin']), asyncHandler(async (req, res) => {
  const authReq = req as AuthenticatedRequest
  const payload = { ...pick(req.body as Row, campaignFields), created_by: authReq.auth.userId }
  const { data, error } = await supabaseAdmin.from('campaigns').insert(payload).select('*').single()
  if (error) throw error
  ok(res, data, 'Campaign created', 201)
}))

router.patch('/admin/campaigns/:id', requireAuth, requireRoles(['national_admin']), asyncHandler(async (req, res) => {
  idSchema.parse(req.params.id)
  const { data, error } = await supabaseAdmin.from('campaigns').update(pick(req.body as Row, campaignFields)).eq('id', req.params.id).select('*').single()
  if (error) throw error
  ok(res, data, 'Campaign updated')
}))

router.delete('/admin/campaigns/:id', requireAuth, requireRoles(['national_admin']), asyncHandler(async (req, res) => {
  idSchema.parse(req.params.id)
  const { error } = await supabaseAdmin.from('campaigns').delete().eq('id', req.params.id)
  if (error) throw error
  ok(res, null, 'Campaign deleted')
}))

const getAuditLogs = async (req: Request, res: Response): Promise<void> => {
  const { from, to, page, pageSize } = parsePaging(req)
  const { data, error, count } = await supabaseAdmin
    .from('audit_logs')
    .select('*, actor:profiles(id, full_name, email)', { count: 'exact' })
    .range(from, to)
    .order('created_at', { ascending: false })

  if (error) throw error
  ok(res, { data, total: count ?? 0, page, pageSize, totalPages: Math.ceil((count ?? 0) / pageSize) })
}

router.get('/admin/audit-logs', requireAuth, requireRoles(['national_admin']), asyncHandler(getAuditLogs))
router.get('/admin/audit-log', requireAuth, requireRoles(['national_admin']), asyncHandler(getAuditLogs))

router.post('/admin/audit-logs', requireAuth, requireRoles(['national_admin']), asyncHandler(async (req, res) => {
  const authReq = req as AuthenticatedRequest
  const payload = {
    actor_id: authReq.auth.userId,
    ...pick(req.body as Row, ['action', 'entity', 'entity_id', 'metadata']),
  }

  const { data, error } = await supabaseAdmin.from('audit_logs').insert(payload).select('*').single()
  if (error) throw error
  ok(res, data, 'Audit log created', 201)
}))
