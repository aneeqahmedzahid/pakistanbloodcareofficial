import { z } from 'zod'
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })
dotenv.config()

const envSchema = z.object({
  PORT:                    z.coerce.number().default(5000),
  NODE_ENV:                z.enum(['development', 'production', 'test']).default('development'),
  SUPABASE_URL:            z.string().url(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
  SUPABASE_ANON_KEY:       z.string().min(1),
  JWT_SECRET:              z.string().min(32),
  FRONTEND_URL:            z.string().url().default('http://localhost:5173'),
  RATE_LIMIT_WINDOW_MS:    z.coerce.number().default(900000),
  RATE_LIMIT_MAX:          z.coerce.number().default(100),
  LOG_LEVEL:               z.enum(['error','warn','info','debug']).default('info'),
  PLATFORM_MANAGER_NAME:   z.string().default('Rukhsar Rajpoot'),
  PLATFORM_MANAGER_EMAIL:  z.string().email().default('rukhsarjpoot@gmail.com'),
  PLATFORM_MANAGER_PHONE:  z.string().default('03129958597'),
})

const parsed = envSchema.safeParse(process.env)

if (!parsed.success) {
  console.error('❌ Invalid environment variables:')
  console.error(parsed.error.flatten().fieldErrors)
  process.exit(1)
}

export const env = parsed.data
