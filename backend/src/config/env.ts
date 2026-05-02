import { z } from 'zod'
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })
dotenv.config()

const envSchema = z.object({
  PORT:                    z.coerce.number().default(5000),
  NODE_ENV:                z.enum(['development', 'production', 'test']).default('development'),
  SUPABASE_URL:            z.string().url().default('https://memlvaxrzbxvxfhucune.supabase.co'),
  SUPABASE_SERVICE_ROLE_KEY: z.string().optional().default(''),
  SUPABASE_ANON_KEY:       z.string().min(1).default('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1lbWx2YXhyemJ4dnhmaHVjdW5lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc2Mjg2MjQsImV4cCI6MjA5MzIwNDYyNH0.n4sK3U9EU8roHmvlNtCjWIPqka2xb5yS-vT8bs2JmBY'),
  JWT_SECRET:              z.string().min(32).default('aneeq_pakistan_bloodcare_default_jwt_secret_change_in_vercel'),
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
  throw new Error('Invalid environment variables')
}

export const env = parsed.data

export const missingRequiredEnv = (): string[] => {
  return [
    ['SUPABASE_ANON_KEY', env.SUPABASE_ANON_KEY],
    ['SUPABASE_SERVICE_ROLE_KEY', env.SUPABASE_SERVICE_ROLE_KEY],
  ]
    .filter(([, value]) => !value || String(value).startsWith('PASTE_'))
    .map(([key]) => key)
}
