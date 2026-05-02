import app from './app'
import { env } from './config/env'
import { logger } from './config/logger'

const PORT = env.PORT

const server = app.listen(PORT, () => {
  logger.info(`🩸 Pakistan Bloodcare API running on http://localhost:${PORT}`)
  logger.info(`📋 Environment: ${env.NODE_ENV}`)
  logger.info(`👤 Manager: Rukhsar Rajpoot | rukhsarjpoot@gmail.com`)
})

// Graceful shutdown
const shutdown = (signal: string) => {
  logger.info(`Received ${signal}. Shutting down gracefully...`)
  server.close(() => {
    logger.info('Server closed.')
    process.exit(0)
  })
}

process.on('SIGTERM', () => shutdown('SIGTERM'))
process.on('SIGINT',  () => shutdown('SIGINT'))

process.on('unhandledRejection', (reason) => {
  logger.error('Unhandled Rejection:', reason)
})

process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error)
  process.exit(1)
})

export default server
