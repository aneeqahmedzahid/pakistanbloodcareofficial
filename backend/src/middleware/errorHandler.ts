import type { Request, Response, NextFunction } from 'express'
import { logger } from '../config/logger'

export interface AppError extends Error {
  statusCode?: number
  isOperational?: boolean
}

export const errorHandler = (
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  const statusCode = err.statusCode ?? 500
  const message    = err.isOperational ? err.message : 'Internal server error'

  if (statusCode >= 500) {
    logger.error('Server Error:', { message: err.message, stack: err.stack })
  } else {
    logger.warn('Client Error:', { message: err.message, statusCode })
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  })
}

export const createError = (message: string, statusCode: number): AppError => {
  const err = new Error(message) as AppError
  err.statusCode     = statusCode
  err.isOperational  = true
  return err
}
