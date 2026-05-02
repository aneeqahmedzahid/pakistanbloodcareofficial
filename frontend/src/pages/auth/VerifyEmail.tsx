import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '@mui/material'
import { CheckCircleRounded, ErrorRounded } from '@mui/icons-material'
import { supabase } from '../../config/supabase'
import { ROUTES } from '../../router/routes'
import { Spinner } from '../../components/ui/Spinner'

const VerifyEmail: React.FC = () => {
  const navigate = useNavigate()
  const hash = window.location.hash
  const hasSupportedHash = hash.includes('type=signup') || hash.includes('type=recovery')
  const [verifying, setVerifying] = useState(hasSupportedHash)
  const [error, setError] = useState<string | null>(hasSupportedHash ? null : 'Invalid verification link.')

  useEffect(() => {
    if (hasSupportedHash) {
      // Supabase automatically handles the hash in the URL and logs the user in if successful
      // We just need to check if we have a session after a brief delay
      const timeoutId = window.setTimeout(async () => {
        const { data: { session } } = await supabase.auth.getSession()
        if (session) {
          setVerifying(false)
        } else {
          setError('Verification failed or link expired. Please try again.')
          setVerifying(false)
        }
      }, 1500)
      return () => window.clearTimeout(timeoutId)
    }
  }, [hasSupportedHash])

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-surface-50 dark:bg-surface-900">
      <div className="w-full max-w-md bg-white dark:bg-surface-800 p-8 rounded-3xl shadow-card text-center border border-surface-100 dark:border-surface-700">
        {verifying ? (
          <div className="flex flex-col items-center py-8">
            <Spinner size="lg" className="mb-6" />
            <h2 className="font-heading font-bold text-xl dark:text-white">Verifying your email...</h2>
            <p className="text-surface-500 mt-2">Please wait while we confirm your address.</p>
          </div>
        ) : error ? (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="py-4">
            <ErrorRounded sx={{ fontSize: 64, color: '#C8102E', mb: 2 }} />
            <h2 className="font-heading font-bold text-xl dark:text-white mb-2">Verification Failed</h2>
            <p className="text-surface-500 mb-6">{error}</p>
            <Link to={ROUTES.LOGIN} className="no-underline">
              <Button variant="contained" color="primary">Go to Login</Button>
            </Link>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="py-4">
            <CheckCircleRounded sx={{ fontSize: 64, color: '#01411C', mb: 2 }} />
            <h2 className="font-heading font-bold text-xl dark:text-white mb-2">Email Verified!</h2>
            <p className="text-surface-500 mb-6">Your account is now verified. You can start using the platform.</p>
            <Button variant="contained" onClick={() => navigate(ROUTES.HOME)} sx={{ background: '#01411C' }}>
              Go to Dashboard
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default VerifyEmail
