import React from 'react'
import { CircularProgress } from '@mui/material'

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  color?: string
  className?: string
}

const sizeMap = { sm: 20, md: 32, lg: 48 }

export const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  color = '#01411C',
  className = '',
}) => (
  <div className={`flex items-center justify-center ${className}`}>
    <CircularProgress size={sizeMap[size]} sx={{ color }} thickness={4} />
  </div>
)
