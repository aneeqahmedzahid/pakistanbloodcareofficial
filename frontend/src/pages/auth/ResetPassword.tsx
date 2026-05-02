import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { TextField, Button, Alert, InputAdornment, IconButton } from '@mui/material'
import { LockRounded, VisibilityRounded, VisibilityOffRounded } from '@mui/icons-material'
import toast from 'react-hot-toast'
import { supabase } from '../../config/supabase'
import { ROUTES } from '../../router/routes'

const ResetPassword: React.FC = () => {
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password.length < 6) return setError('Password must be at least 6 characters')
    
    setLoading(true)
    setError(null)
    try {
      const { error: resetError } = await supabase.auth.updateUser({ password })
      if (resetError) throw resetError
      toast.success('Password updated successfully!')
      navigate(ROUTES.LOGIN)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to update password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-surface-50 dark:bg-surface-900">
      <div className="w-full max-w-md bg-white dark:bg-surface-800 p-8 rounded-3xl shadow-card border border-surface-100 dark:border-surface-700">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-heading font-bold text-2xl text-center text-surface-900 dark:text-white mb-2">
            Set New Password
          </h1>
          <p className="text-surface-500 text-center mb-6 text-sm">
            Please enter your new password below.
          </p>

          {error && <Alert severity="error" sx={{ mb: 4, borderRadius: '10px' }}>{error}</Alert>}

          <form onSubmit={onSubmit} className="space-y-4">
            <TextField fullWidth label="New Password" type={showPass ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                startAdornment: <InputAdornment position="start"><LockRounded sx={{ color: '#94a3b8' }} /></InputAdornment>,
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPass(!showPass)} edge="end" size="small">
                      {showPass ? <VisibilityOffRounded fontSize="small" /> : <VisibilityRounded fontSize="small" />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button fullWidth variant="contained" type="submit" size="large" disabled={loading}
              sx={{
                background: 'linear-gradient(135deg, #01411C, #016b2e)', borderRadius: '12px', py: 1.5, fontWeight: 700,
              }}>
              {loading ? 'Updating...' : 'Update Password'}
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
  )
}

export default ResetPassword
