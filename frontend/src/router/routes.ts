export const ROUTES = {
  // Public
  HOME:        '/',
  FIND_DONOR:  '/find-donor',
  FIND_BANK:   '/find-blood-bank',
  EMERGENCY:   '/emergency',

  // Auth
  LOGIN:           '/login',
  REGISTER:        '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD:  '/reset-password',
  VERIFY_EMAIL:    '/verify-email',

  // Donor
  DONOR_DASHBOARD:  '/donor/dashboard',
  DONOR_PROFILE:    '/donor/profile',
  ELIGIBILITY:      '/donor/eligibility',
  BOOK_APPOINTMENT: '/donor/book-appointment',
  DONATION_HISTORY: '/donor/history',
  MY_BADGES:        '/donor/badges',
  LEADERBOARD:      '/donor/leaderboard',

  // Patient
  PATIENT_DASHBOARD: '/patient/dashboard',
  REQUEST_BLOOD:     '/patient/request-blood',
  MY_REQUESTS:       '/patient/my-requests',

  // Blood Bank Admin
  BANK_DASHBOARD: '/blood-bank/dashboard',
  BANK_INVENTORY: '/blood-bank/inventory',
  BANK_APPTS:     '/blood-bank/appointments',
  BANK_REQUESTS:  '/blood-bank/requests',
  BANK_ANALYTICS: '/blood-bank/analytics',

  // National Admin
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_BANKS:     '/admin/blood-banks',
  ADMIN_USERS:     '/admin/users',
  ADMIN_ANALYTICS: '/admin/analytics',
  ADMIN_CAMPAIGNS: '/admin/campaigns',
  ADMIN_AUDIT:     '/admin/audit-log',

  // Errors
  UNAUTHORIZED: '/unauthorized',
  NOT_FOUND:    '/404',
} as const
