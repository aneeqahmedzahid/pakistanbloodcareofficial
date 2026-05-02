import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import { ROUTES } from '../../router/routes'

const NotFound: React.FC = () => (
  <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-surface-50 dark:bg-surface-900">
    <h1 className="text-8xl mb-4">404</h1>
    <h2 className="text-2xl font-bold dark:text-white mb-4">Page Not Found</h2>
    <p className="text-surface-500 mb-8 max-w-md">
      The page you're looking for doesn't exist or has been moved.
    </p>
    <Link to={ROUTES.HOME} className="no-underline">
      <Button variant="contained">Go Home</Button>
    </Link>
  </div>
)

export default NotFound
