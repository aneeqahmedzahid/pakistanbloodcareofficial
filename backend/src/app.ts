import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { rateLimit } from 'express-rate-limit'
import cookieParser from 'cookie-parser'
import { env } from './config/env'
import { logger } from './config/logger'
import { errorHandler } from './middleware/errorHandler'
import { Request, Response, NextFunction } from 'express'
import { router } from './routes'

const app = express()

// ─── Security Middleware ────────────────────────────────────
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
}))

app.use(cors({
  origin: (origin, callback) => {
    // Allow local development, FRONTEND_URL, and any Vercel domain
    const isVercel = origin?.includes('.vercel.app')
    const isLocal  = !origin || origin.includes('localhost') || origin.includes('127.0.0.1')
    
    if (isLocal || isVercel || origin === env.FRONTEND_URL) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
  methods:     ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}))

// ─── Rate Limiting ───────────────────────────────────────────
const limiter = rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW_MS,
  max:      env.RATE_LIMIT_MAX,
  standardHeaders: true,
  legacyHeaders:   false,
  message: { success: false, message: 'Too many requests, please try again later.' },
})
app.use('/api/', limiter)

// ─── Body Parsing ────────────────────────────────────────────
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))
app.use(cookieParser())

// ─── Request Logging ─────────────────────────────────────────
app.use((req: Request, _res: Response, next: NextFunction) => {
  logger.info(`${req.method} ${req.path}`, {
    ip: req.ip,
    userAgent: req.get('user-agent'),
  })
  next()
})

// ─── Health Check ────────────────────────────────────────────
app.get('/health', (_req: Request, res: Response) => {
  res.json({
    status:    'ok',
    platform:  'Pakistan Bloodcare Official',
    manager:   'Rukhsar Rajpoot',
    contact:   'rukhsarjpoot@gmail.com',
    version:   '1.0.0',
    timestamp: new Date().toISOString(),
  })
})

app.get('/debug-ping', (_req: Request, res: Response) => {
  res.json({ success: true, message: 'Direct App Ping Success! 🩸' })
})

// ─── API Routes ──────────────────────────────────────────────
app.use('/api', router)
app.use('/', router) // Also mount at root to support direct API domain deployments

// ─── 404 Handler ─────────────────────────────────────────────
app.use((_req: Request, res: Response) => {
  res.status(404).json({ success: false, message: 'Route not found' })
})

// ─── Global Error Handler ────────────────────────────────────
app.use(errorHandler)

export default app
