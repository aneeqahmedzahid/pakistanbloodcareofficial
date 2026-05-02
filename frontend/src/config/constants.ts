// ─── App Constants ──────────────────────────────────────────
export const APP_NAME = 'Pakistan Bloodcare Official'
export const APP_VERSION = '1.0.0'
export const APP_DESCRIPTION = "Pakistan's National Blood Donation Management Platform"

// ─── Manager / Contact ──────────────────────────────────────
export const PLATFORM_MANAGER = {
  name:  'Rukhsar Rajpoot',
  phone: '03129958597',
  email: 'rukhsarjpoot@gmail.com',
  role:  'Platform Manager',
}

// ─── Blood Groups ───────────────────────────────────────────
export const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] as const
export type BloodGroup = typeof BLOOD_GROUPS[number]

// Blood compatibility map: key donates TO values
export const BLOOD_COMPATIBILITY: Record<BloodGroup, BloodGroup[]> = {
  'O-':  ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'],
  'O+':  ['O+', 'A+', 'B+', 'AB+'],
  'A-':  ['A-', 'A+', 'AB-', 'AB+'],
  'A+':  ['A+', 'AB+'],
  'B-':  ['B-', 'B+', 'AB-', 'AB+'],
  'B+':  ['B+', 'AB+'],
  'AB-': ['AB-', 'AB+'],
  'AB+': ['AB+'],
}

// ─── User Roles ──────────────────────────────────────────────
export const USER_ROLES = {
  DONOR:            'donor',
  PATIENT:          'patient',
  BLOOD_BANK_ADMIN: 'blood_bank_admin',
  NATIONAL_ADMIN:   'national_admin',
  ADMIN:            'admin',
} as const
export type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES]

// ─── Urgency Levels ──────────────────────────────────────────
export const URGENCY_LEVELS = {
  CRITICAL: 'critical',
  URGENT:   'urgent',
  NORMAL:   'normal',
} as const
export type UrgencyLevel = typeof URGENCY_LEVELS[keyof typeof URGENCY_LEVELS]

export const URGENCY_LABELS: Record<UrgencyLevel, string> = {
  critical: '🚨 Critical (< 6 hrs)',
  urgent:   '⚠️ Urgent (< 24 hrs)',
  normal:   '📋 Normal (1–3 days)',
}

// ─── Blood Components ────────────────────────────────────────
export const BLOOD_COMPONENTS = [
  'Whole Blood',
  'Red Blood Cells',
  'Platelets',
  'Fresh Frozen Plasma',
  'Cryoprecipitate',
] as const
export type BloodComponent = typeof BLOOD_COMPONENTS[number]

// ─── Pakistan Cities ─────────────────────────────────────────
export const PAKISTAN_CITIES = [
  'Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Faisalabad',
  'Multan', 'Peshawar', 'Quetta', 'Hyderabad', 'Sialkot',
  'Gujranwala', 'Bahawalpur', 'Sargodha', 'Sukkur', 'Larkana',
  'Abbottabad', 'Mardan', 'Dera Ghazi Khan', 'Gujrat', 'Nawabshah',
  'Sahiwal', 'Mirpur Khas', 'Okara', 'Mingora', 'Chiniot',
  'Kotri', 'Kamoke', 'Hafizabad', 'Sadiqabad', 'Muzaffarabad',
] as const
export type PakistanCity = typeof PAKISTAN_CITIES[number]

// ─── Donation Eligibility ─────────────────────────────────────
export const DONATION_RULES = {
  MIN_AGE:              18,
  MAX_AGE:              65,
  MIN_WEIGHT_KG:        50,
  MIN_HEMOGLOBIN_MALE:  13.0,
  MIN_HEMOGLOBIN_FEMALE:12.5,
  BETWEEN_DONATIONS_DAYS: 90, // Whole blood: 90 days min
}

// ─── Gamification Badges ─────────────────────────────────────
export const DONOR_BADGES = [
  { id: 'first_drop',    label: 'First Drop',    icon: '💧', threshold: 1 },
  { id: 'life_saver',    label: 'Life Saver',    icon: '❤️', threshold: 3 },
  { id: 'hero',          label: 'Blood Hero',    icon: '🦸', threshold: 5 },
  { id: 'champion',      label: 'Champion',      icon: '🏆', threshold: 10 },
  { id: 'legend',        label: 'Legend',        icon: '⭐', threshold: 20 },
  { id: 'guardian',      label: 'Guardian Angel',icon: '👼', threshold: 50 },
] as const

// ─── Stock Levels ─────────────────────────────────────────────
export const STOCK_LEVELS = {
  CRITICAL:  { max: 2,  label: 'Critical',  color: 'text-red-600' },
  LOW:       { max: 5,  label: 'Low',       color: 'text-orange-500' },
  ADEQUATE:  { max: 10, label: 'Adequate',  color: 'text-blue-600' },
  GOOD:      { max: Infinity, label: 'Good',color: 'text-green-600' },
}

// ─── API ──────────────────────────────────────────────────────
export const API_BASE = import.meta.env.PROD 
  ? (import.meta.env.VITE_BACKEND_URL?.includes('localhost') ? '/api' : (import.meta.env.VITE_BACKEND_URL || '/api'))
  : (import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000/api')
