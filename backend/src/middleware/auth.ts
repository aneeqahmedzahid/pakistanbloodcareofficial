import type { NextFunction, Request, RequestHandler, Response } from 'express'
import { supabaseAdmin } from '../config/supabase'
import { createError } from './errorHandler'

export type UserRole = 'donor' | 'patient' | 'blood_bank_admin' | 'national_admin'

export interface AuthProfile {
  id: string
  email: string
  full_name: string
  role: UserRole
  phone: string | null
  city: string | null
  is_verified: boolean
}

export interface AuthenticatedRequest extends Request {
  auth: {
    userId: string
    email: string
    profile: AuthProfile
    role: UserRole
  }
}

const getBearerToken = (req: Request): string | null => {
  const header = req.get('authorization')
  if (!header?.startsWith('Bearer ')) return null
  return header.slice('Bearer '.length).trim()
}

export const requireAuth: RequestHandler = async (req: Request, _res: Response, next: NextFunction) => {
  try {
    const token = getBearerToken(req)
    if (!token) throw createError('Missing bearer token', 401)

    const { data: userData, error: userError } = await supabaseAdmin.auth.getUser(token)
    if (userError || !userData.user) throw createError('Invalid or expired token', 401)

    const { data: profile, error: profileError } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .eq('id', userData.user.id)
      .single()

    if (profileError || !profile) throw createError('Profile not found', 404)

    const typedProfile = profile as AuthProfile
    ;(req as AuthenticatedRequest).auth = {
      userId: userData.user.id,
      email: userData.user.email ?? typedProfile.email,
      profile: typedProfile,
      role: typedProfile.role,
    }

    next()
  } catch (error) {
    next(error)
  }
}

export const requireRoles = (roles: UserRole[]): RequestHandler => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const authReq = req as AuthenticatedRequest
    if (!authReq.auth || !roles.includes(authReq.auth.role)) {
      next(createError('You are not allowed to perform this action', 403))
      return
    }
    next()
  }
}

export const isNationalAdmin = (req: AuthenticatedRequest): boolean => req.auth.role === 'national_admin'

export const isBankAdmin = (req: AuthenticatedRequest): boolean =>
  req.auth.role === 'blood_bank_admin' || req.auth.role === 'national_admin'
