import { Router } from 'express'
import type { RequestHandler } from 'express'
import { supabaseAdmin } from '../config/supabase'

export const router = Router()

const placeholder = (message: string): RequestHandler => (_req, res) => {
  res.json({ message })
}

const supabaseStatus: RequestHandler = async (_req, res, next) => {
  try {
    const { error } = await supabaseAdmin.auth.admin.listUsers({
      page: 1,
      perPage: 1,
    })

    if (error) throw error

    res.json({
      success: true,
      message: 'Supabase connection established',
    })
  } catch (error) {
    next(error)
  }
}

router.get('/supabase/status', supabaseStatus)

// Health ping
router.get('/ping', (_req, res) => {
  res.json({ success: true, message: 'Pakistan Bloodcare API is running' })
})

// Route stubs; controllers added in Phase 2+
router.get('/auth/me', placeholder('auth route'))
router.get('/donors', placeholder('donors route'))
router.get('/blood-requests', placeholder('blood-requests route'))
router.get('/inventory', placeholder('inventory route'))
router.get('/appointments', placeholder('appointments route'))
router.get('/blood-banks', placeholder('blood-banks route'))
router.get('/admin/stats', placeholder('admin route'))
router.get('/notifications', placeholder('notifications route'))
