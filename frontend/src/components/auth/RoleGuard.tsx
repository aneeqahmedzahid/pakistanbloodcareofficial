import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../../stores/authStore'
import { ROUTES } from '../../router/routes'
import type { UserRole } from '../../types'

interface RoleGuardProps {
  allowed: UserRole[]
}

export const RoleGuard: React.FC<RoleGuardProps> = ({ allowed }) => {
  const { role } = useAuthStore()

  if (!role || !allowed.includes(role)) {
    return <Navigate to={ROUTES.UNAUTHORIZED} replace />
  }

  return <Outlet />
}
