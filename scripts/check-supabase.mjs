import { readFileSync } from 'node:fs'

const envFile = readFileSync(new URL('../frontend/.env.local', import.meta.url), 'utf8')
const env = Object.fromEntries(
  envFile
    .split(/\r?\n/)
    .filter((line) => line && !line.startsWith('#') && line.includes('='))
    .map((line) => {
      const index = line.indexOf('=')
      return [line.slice(0, index), line.slice(index + 1)]
    }),
)

const supabaseUrl = env.VITE_SUPABASE_URL
const anonKey = env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !anonKey) {
  console.error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY in frontend/.env.local')
  process.exit(1)
}

const headers = {
  apikey: anonKey,
  Authorization: `Bearer ${anonKey}`,
}

const check = async (label, url) => {
  const response = await fetch(url, { headers })
  const body = await response.text()
  console.log(`${label}: ${response.status} ${response.statusText}`)
  if (!response.ok && body) {
    console.log(body)
  }
  return response.ok
}

await check('Auth health', `${supabaseUrl}/auth/v1/health`)
await check('Profiles table', `${supabaseUrl}/rest/v1/profiles?select=id&limit=1`)
