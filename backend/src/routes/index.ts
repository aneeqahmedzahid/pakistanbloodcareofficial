import { Router, Request, Response, NextFunction } from 'express'
import { supabaseAdmin } from '../config/supabase'

export const router = Router()

router.get('/supabase/status', async (_req: Request, res: Response, next: NextFunction) => {
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
})

// Health ping
router.get('/ping', (_req: Request, res: Response) => {
  res.json({ success: true, message: 'Pakistan Bloodcare API is running 🩸' })
})

// Route stubs — controllers added in Phase 2+
router.get('/auth/me',        (_req: Request, res: Response) => res.json({ message: 'auth route' }))
router.get('/donors',         (_req: Request, res: Response) => res.json({ message: 'donors route' }))
router.get('/blood-requests', (_req: Request, res: Response) => res.json({ message: 'blood-requests route' }))
router.get('/inventory',      (_req: Request, res: Response) => res.json({ message: 'inventory route' }))
router.get('/appointments',   (_req: Request, res: Response) => res.json({ message: 'appointments route' }))
router.get('/blood-banks',    (_req: Request, res: Response) => res.json({ message: 'blood-banks route' }))
router.get('/admin/stats',    (_req: Request, res: Response) => res.json({ message: 'admin route' }))
router.get('/notifications',  (_req: Request, res: Response) => res.json({ message: 'notifications route' }))
