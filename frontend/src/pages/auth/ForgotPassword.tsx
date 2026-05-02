import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { TextField, Button, Alert, InputAdornment } from '@mui/material'
import { EmailRounded, ArrowBackRounded } from '@mui/icons-material'
import toast from 'react-hot-toast'
import { supabase } from '../../config/supabase'
import { ROUTES } from '../../router/routes'

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return setError('Email is required')
    
    setLoading(true)
    setError(null)
    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}${ROUTES.RESET_PASSWORD}`,
      })
      if (resetError) throw resetError
      setSuccess(true)
      toast.success('Password reset email sent!')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to send reset email')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-surface-50 dark:bg-surface-900">
      <div className="w-full max-w-md bg-white dark:bg-surface-800 p-8 rounded-3xl shadow-card border border-surface-100 dark:border-surface-700">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex justify-center mb-6">
            <img src="/logo.png" alt="Pakistan Bloodcare Official" className="w-16 h-16 rounded-full object-cover shadow-glow-green" />
          </div>
          
          <h1 className="font-heading font-bold text-2xl text-center text-surface-900 dark:text-white mb-2">
            Forgot Password?
          </h1>
          <p className="text-surface-500 text-center mb-6 text-sm">
            Enter your email address and we'll send you a link to reset your password.
          </p>

          {error && <Alert severity="error" sx={{ mb: 4, borderRadius: '10px' }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 4, borderRadius: '10px' }}>Check your email for the reset link.</Alert>}

          <form onSubmit={onSubmit} className="space-y-4">
            <TextField fullWidth label="Email Address" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              disabled={success}
              InputProps={{ startAdornment: <InputAdornment position="start"><EmailRounded sx={{ color: '#94a3b8' }} /></InputAdornment> }}
            />

            <Button fullWidth variant="contained" type="submit" size="large" disabled={loading || success}
              sx={{
                background: 'linear-gradient(135deg, #01411C, #016b2e)', borderRadius: '12px', py: 1.5, fontWeight: 700,
                '&:hover': { background: '#013016' },
              }}>
              {loading ? 'Sending...' : 'Send Reset Link'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Link to={ROUTES.LOGIN} className="text-surface-500 hover:text-primary-700 dark:hover:text-primary-400 text-sm font-semibold no-underline flex items-center justify-center gap-1">
              <ArrowBackRounded fontSize="small" /> Back to Login
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default ForgotPassword
