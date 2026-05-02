import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { TextField, Button, Alert, InputAdornment, IconButton, MenuItem } from '@mui/material'
import { VisibilityRounded, VisibilityOffRounded, EmailRounded, LockRounded, PersonRounded, PhoneRounded } from '@mui/icons-material'
import toast from 'react-hot-toast'
import { supabase } from '../../config/supabase'
import { ROUTES } from '../../router/routes'
import { PAKISTAN_CITIES, USER_ROLES } from '../../config/constants'

const schema = z.object({
  full_name: z.string().min(3, 'Name must be at least 3 characters'),
  email: z.string().email('Enter a valid email'),
  phone: z.string().min(10, 'Enter a valid phone number'),
  city: z.string().min(1, 'Select a city'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirm_password: z.string(),
  role: z.enum([USER_ROLES.DONOR, USER_ROLES.PATIENT, USER_ROLES.BLOOD_BANK_ADMIN]),
}).refine((data) => data.password === data.confirm_password, {
  message: "Passwords don't match",
  path: ["confirm_password"],
})

type RegisterFormType = z.infer<typeof schema>

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.4 } }),
}

const Register: React.FC = () => {
  const navigate = useNavigate()
  const [showPass, setShowPass] = useState(false)
  const [showConfPass, setShowConfPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormType>({
    resolver: zodResolver(schema),
    defaultValues: { role: USER_ROLES.DONOR, city: 'Karachi' },
  })

  const onSubmit = async (data: RegisterFormType) => {
    setLoading(true)
    setError(null)
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.full_name,
            role: data.role,
            phone: data.phone,
            city: data.city,
          },
        },
      })
      
      if (authError) throw authError
      
      if (authData.user && authData.session === null) {
        toast.success('Registration successful! Please check your email to verify.')
        navigate(ROUTES.LOGIN)
      } else {
        toast.success('Registration successful! Welcome aboard.')
        navigate(ROUTES.HOME)
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Registration failed'
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
            <Link to={ROUTES.HOME} className="flex items-center gap-2 no-underline mb-8">
              <img src="/logo.png" alt="Pakistan Bloodcare Official" className="w-11 h-11 rounded-full object-cover" />
              <span className="font-heading font-bold text-primary-700 dark:text-primary-400">Pakistan Bloodcare</span>
            </Link>
          </motion.div>

          <motion.h1 custom={1} initial="hidden" animate="visible" variants={fadeUp}
            className="font-heading font-bold text-3xl text-surface-900 dark:text-white mb-2">
            Create Account
          </motion.h1>
          <motion.p custom={2} initial="hidden" animate="visible" variants={fadeUp}
            className="text-surface-500 dark:text-surface-400 mb-8">
            Join the national platform and start making a difference.
          </motion.p>

          {error && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6">
              <Alert severity="error" sx={{ borderRadius: '12px' }}>{error}</Alert>
            </motion.div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <motion.div custom={3} initial="hidden" animate="visible" variants={fadeUp} className="grid grid-cols-2 gap-4">
              <TextField select fullWidth label="Account Type" {...register('role')} defaultValue={USER_ROLES.DONOR}>
                <MenuItem value={USER_ROLES.DONOR}>Blood Donor</MenuItem>
                <MenuItem value={USER_ROLES.PATIENT}>Patient / Requester</MenuItem>
                <MenuItem value={USER_ROLES.BLOOD_BANK_ADMIN}>Blood Bank</MenuItem>
              </TextField>
              <TextField select fullWidth label="City" {...register('city')} defaultValue="Karachi">
                {PAKISTAN_CITIES.map(city => (
                  <MenuItem key={city} value={city}>{city}</MenuItem>
                ))}
              </TextField>
            </motion.div>

            <motion.div custom={4} initial="hidden" animate="visible" variants={fadeUp}>
              <TextField fullWidth label="Full Name" {...register('full_name')}
                error={!!errors.full_name} helperText={errors.full_name?.message}
                InputProps={{ startAdornment: <InputAdornment position="start"><PersonRounded sx={{ color: '#94a3b8', fontSize: 20 }} /></InputAdornment> }}
              />
            </motion.div>

            <motion.div custom={5} initial="hidden" animate="visible" variants={fadeUp}>
              <TextField fullWidth label="Email Address" type="email" {...register('email')}
                error={!!errors.email} helperText={errors.email?.message}
                InputProps={{ startAdornment: <InputAdornment position="start"><EmailRounded sx={{ color: '#94a3b8', fontSize: 20 }} /></InputAdornment> }}
              />
            </motion.div>

            <motion.div custom={6} initial="hidden" animate="visible" variants={fadeUp}>
              <TextField fullWidth label="Phone Number" {...register('phone')}
                error={!!errors.phone} helperText={errors.phone?.message}
                InputProps={{ startAdornment: <InputAdornment position="start"><PhoneRounded sx={{ color: '#94a3b8', fontSize: 20 }} /></InputAdornment> }}
              />
            </motion.div>

            <motion.div custom={7} initial="hidden" animate="visible" variants={fadeUp} className="grid grid-cols-2 gap-4">
              <TextField fullWidth label="Password" type={showPass ? 'text' : 'password'} {...register('password')}
                error={!!errors.password} helperText={errors.password?.message}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><LockRounded sx={{ color: '#94a3b8', fontSize: 20 }} /></InputAdornment>,
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPass(!showPass)} edge="end" size="small">
                        {showPass ? <VisibilityOffRounded fontSize="small" /> : <VisibilityRounded fontSize="small" />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField fullWidth label="Confirm Pass" type={showConfPass ? 'text' : 'password'} {...register('confirm_password')}
                error={!!errors.confirm_password} helperText={errors.confirm_password?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowConfPass(!showConfPass)} edge="end" size="small">
                        {showConfPass ? <VisibilityOffRounded fontSize="small" /> : <VisibilityRounded fontSize="small" />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </motion.div>

            <motion.div custom={8} initial="hidden" animate="visible" variants={fadeUp} className="mt-6">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button fullWidth variant="contained" type="submit" size="large" disabled={loading}
                  sx={{
                    background: 'linear-gradient(135deg, #01411C, #016b2e)',
                    borderRadius: '12px', py: 1.5, fontSize: '1rem', fontWeight: 700,
                    boxShadow: '0 4px 16px rgba(1,65,28,0.35)',
                    '&:hover': { boxShadow: '0 6px 24px rgba(1,65,28,0.45)' },
                  }}>
                  {loading ? 'Creating Account…' : 'Register'}
                </Button>
              </motion.div>
            </motion.div>
          </form>

          <motion.div custom={9} initial="hidden" animate="visible" variants={fadeUp} className="mt-8 text-center">
            <p className="text-surface-500 text-sm">
              Already have an account?{' '}
              <Link to={ROUTES.LOGIN} className="text-primary-700 dark:text-primary-400 font-semibold no-underline hover:underline">
                Sign In
              </Link>
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right — Hero Panel */}
      <div className="hidden lg:flex hero-bg flex-col items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-blood-600/20 blur-3xl" />
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 text-center"
        >
          <div className="text-8xl mb-6 animate-float">🌟</div>
          <h2 className="font-heading font-black text-4xl text-white mb-4">
            Join the Lifesavers.
          </h2>
          <p className="text-white/70 text-lg max-w-sm mx-auto">
            Become a part of Pakistan's largest blood donation network. Your single donation can make a world of difference.
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default Register
