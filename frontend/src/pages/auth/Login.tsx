import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { TextField, Button, Alert, InputAdornment, IconButton } from '@mui/material'
import { VisibilityRounded, VisibilityOffRounded, EmailRounded, LockRounded } from '@mui/icons-material'
import toast from 'react-hot-toast'
import { supabase } from '../../config/supabase'
import { useAuthStore } from '../../stores/authStore'
import { ROUTES } from '../../router/routes'

const schema = z.object({
  email:    z.string().email('Enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})
type LoginForm = z.infer<typeof schema>

const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }),
}

const Login: React.FC = () => {
  const navigate   = useNavigate()
  const location   = useLocation()
  const initialize = useAuthStore((s) => s.initialize)
  const [showPass, setShowPass] = useState(false)
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState<string | null>(null)

  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: LoginForm) => {
    setLoading(true)
    setError(null)
    try {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email: data.email, password: data.password,
      })
      if (authError) throw authError
      await initialize()
      toast.success('Welcome back! 🩸')
      const state = useAuthStore.getState()
      
      let redirectPath = ROUTES.DONOR_DASHBOARD
      if (state.role === 'national_admin' || state.role === 'admin') redirectPath = ROUTES.ADMIN_DASHBOARD
      else if (state.role === 'blood_bank_admin') redirectPath = ROUTES.BANK_DASHBOARD
      else if (state.role === 'patient') redirectPath = ROUTES.PATIENT_DASHBOARD

      navigate(redirectPath, { replace: true })
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Login failed'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left — Form */}
      <div className="flex items-center justify-center p-6 sm:p-12 bg-white dark:bg-surface-900">
        <div className="w-full max-w-md">
          <motion.div custom={0} initial="hidden" animate="visible" variants={fadeUp}>
            <Link to={ROUTES.HOME} className="flex items-center gap-2 no-underline mb-10">
              <img src="/logo.png" alt="Pakistan Bloodcare Official" className="w-11 h-11 rounded-full object-cover" />
              <span className="font-heading font-bold text-primary-700 dark:text-primary-400">Pakistan Bloodcare</span>
            </Link>
          </motion.div>

          <motion.h1 custom={1} initial="hidden" animate="visible" variants={fadeUp}
            className="font-heading font-bold text-3xl text-surface-900 dark:text-white mb-2">
            Welcome Back
          </motion.h1>
          <motion.p custom={2} initial="hidden" animate="visible" variants={fadeUp}
            className="text-surface-500 dark:text-surface-400 mb-8">
            Sign in to your account to continue saving lives.
          </motion.p>

          {error && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6">
              <Alert severity="error" sx={{ borderRadius: '12px' }}>{error}</Alert>
            </motion.div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <motion.div custom={3} initial="hidden" animate="visible" variants={fadeUp}>
              <TextField fullWidth label="Email Address" type="email"
                {...register('email')}
                error={!!errors.email} helperText={errors.email?.message}
                InputProps={{ startAdornment: (
                  <InputAdornment position="start"><EmailRounded sx={{ color: '#94a3b8', fontSize: 20 }} /></InputAdornment>
                )}}
              />
            </motion.div>

            <motion.div custom={4} initial="hidden" animate="visible" variants={fadeUp}>
              <TextField fullWidth label="Password" type={showPass ? 'text' : 'password'}
                {...register('password')}
                error={!!errors.password} helperText={errors.password?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start"><LockRounded sx={{ color: '#94a3b8', fontSize: 20 }} /></InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPass(!showPass)} edge="end" size="small">
                        {showPass ? <VisibilityOffRounded fontSize="small" /> : <VisibilityRounded fontSize="small" />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </motion.div>

            <motion.div custom={5} initial="hidden" animate="visible" variants={fadeUp}
              className="flex justify-end">
              <Link to={ROUTES.FORGOT_PASSWORD} className="text-primary-700 dark:text-primary-400 text-sm font-medium no-underline hover:underline">
                Forgot password?
              </Link>
            </motion.div>

            <motion.div custom={6} initial="hidden" animate="visible" variants={fadeUp}>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button fullWidth variant="contained" type="submit" size="large" disabled={loading}
                  sx={{
                    background: 'linear-gradient(135deg, #01411C, #016b2e)',
                    borderRadius: '12px', py: 1.5, fontSize: '1rem', fontWeight: 700,
                    boxShadow: '0 4px 16px rgba(1,65,28,0.35)',
                    '&:hover': { boxShadow: '0 6px 24px rgba(1,65,28,0.45)' },
                  }}>
                  {loading ? 'Signing in…' : 'Sign In'}
                </Button>
              </motion.div>
            </motion.div>
          </form>

          <motion.div custom={7} initial="hidden" animate="visible" variants={fadeUp} className="mt-8 text-center">
            <p className="text-surface-500 text-sm">
              Don't have an account?{' '}
              <Link to={ROUTES.REGISTER} className="text-primary-700 dark:text-primary-400 font-semibold no-underline hover:underline">
                Register as Donor
              </Link>
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right — Hero Panel */}
      <div className="hidden lg:flex hero-bg flex-col items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute bottom-10 left-10 w-80 h-80 rounded-full bg-blood-600/20 blur-3xl" />
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 text-center"
        >
          <div className="text-8xl mb-6 animate-float">🩸</div>
          <h2 className="font-heading font-black text-4xl text-white mb-4">
            One Donation,<br />Three Lives Saved.
          </h2>
          <p className="text-white/70 text-lg max-w-sm mx-auto">
            50,000+ donors across Pakistan trust our platform to connect them with those who need help most.
          </p>
          <div className="mt-10 grid grid-cols-3 gap-4">
            {[['50K+','Donors'],['1.2K+','Blood Banks'],['120+','Cities']].map(([val, lbl]) => (
              <div key={lbl} className="glass-card p-4 text-center">
                <div className="text-white font-heading font-black text-2xl">{val}</div>
                <div className="text-white/60 text-xs mt-1">{lbl}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Login
