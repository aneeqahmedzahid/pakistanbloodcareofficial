import { createClient } from '@supabase/supabase-js'
import { env } from './env'

// Admin client with service role — bypasses RLS for backend operations
export const supabaseAdmin = createClient(
  env.SUPABASE_URL,
  env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession:   false,
    },
  }
)

// Regular client with anon key — respects RLS
export const supabaseClient = createClient(
  env.SUPABASE_URL,
  env.SUPABASE_ANON_KEY
)

export default supabaseAdmin
