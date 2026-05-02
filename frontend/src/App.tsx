import { useEffect, Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import { AnimatePresence } from 'framer-motion'
import { lightTheme, darkTheme } from './styles/theme'
import { queryClient } from './config/queryClient'
import { useAuthStore } from './stores/authStore'
import { useUIStore } from './stores/uiStore'
import { supabase } from './config/supabase'
import { ROUTES } from './router/routes'

// ─── Layouts ─────────────────────────────────────────────────
import { AuthGuard }  from './components/auth/AuthGuard'
import { RoleGuard }  from './components/auth/RoleGuard'
import { Spinner }    from './components/ui/Spinner'
import { DashboardLayout } from './components/layout/DashboardLayout'

// ─── Public Pages ─────────────────────────────────────────────
const Landing       = lazy(() => import('./pages/public/Landing'))
const FindDonor     = lazy(() => import('./pages/public/FindDonor'))
const FindBloodBank = lazy(() => import('./pages/public/FindBloodBank'))
const EmergencyReq  = lazy(() => import('./pages/public/EmergencyRequest'))

// ─── Auth Pages ───────────────────────────────────────────────
const Login          = lazy(() => import('./pages/auth/Login'))
const Register       = lazy(() => import('./pages/auth/Register'))
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword'))
const ResetPassword  = lazy(() => import('./pages/auth/ResetPassword'))
const VerifyEmail    = lazy(() => import('./pages/auth/VerifyEmail'))

// ─── Donor Pages ──────────────────────────────────────────────
const DonorDashboard   = lazy(() => import('./pages/donor/DonorDashboard'))
const DonorProfile     = lazy(() => import('./pages/donor/DonorProfile'))
const EligibilityTest  = lazy(() => import('./pages/donor/EligibilityTest'))
const BookAppointment  = lazy(() => import('./pages/donor/BookAppointment'))
const DonationHistory  = lazy(() => import('./pages/donor/DonationHistory'))
const MyBadges         = lazy(() => import('./pages/donor/MyBadges'))
const Leaderboard      = lazy(() => import('./pages/donor/Leaderboard'))

// ─── Patient Pages ────────────────────────────────────────────
const PatientDashboard = lazy(() => import('./pages/patient/PatientDashboard'))
const RequestBlood     = lazy(() => import('./pages/patient/RequestBlood'))
const MyRequests       = lazy(() => import('./pages/patient/MyRequests'))

// ─── Blood Bank Pages ─────────────────────────────────────────
const BloodBankDashboard = lazy(() => import('./pages/blood-bank/BloodBankDashboard'))
const Inventory          = lazy(() => import('./pages/blood-bank/Inventory'))
const Appointments       = lazy(() => import('./pages/blood-bank/Appointments'))
const BankRequests       = lazy(() => import('./pages/blood-bank/Requests'))
const BankAnalytics      = lazy(() => import('./pages/blood-bank/Analytics'))

// ─── Admin Pages ──────────────────────────────────────────────
const AdminDashboard    = lazy(() => import('./pages/admin/AdminDashboard'))
const ManageBloodBanks  = lazy(() => import('./pages/admin/ManageBloodBanks'))
const ManageUsers       = lazy(() => import('./pages/admin/ManageUsers'))
const NationalAnalytics = lazy(() => import('./pages/admin/NationalAnalytics'))
const AuditLog          = lazy(() => import('./pages/admin/AuditLog'))

// ─── Error Pages ──────────────────────────────────────────────
const NotFound     = lazy(() => import('./pages/errors/NotFound'))
const Unauthorized = lazy(() => import('./pages/errors/Unauthorized'))

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-surface-50 dark:bg-surface-900">
    <Spinner size="lg" />
  </div>
)

function App() {
  const { isDarkMode }  = useUIStore()
  const { initialize }  = useAuthStore()

  useEffect(() => {
    initialize()

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async () => { initialize() }
    )
    return () => subscription.unsubscribe()
  }, [initialize])

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <CssBaseline />
        <BrowserRouter>
          <AnimatePresence mode="wait">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                {/* Public */}
                <Route path={ROUTES.HOME}        element={<Landing />} />
                <Route path={ROUTES.FIND_DONOR}  element={<FindDonor />} />
                <Route path={ROUTES.FIND_BANK}   element={<FindBloodBank />} />
                <Route path={ROUTES.EMERGENCY}   element={<EmergencyReq />} />

                {/* Auth */}
                <Route path={ROUTES.LOGIN}           element={<Login audience="user" />} />
                <Route path={ROUTES.ADMIN_LOGIN}     element={<Login audience="admin" />} />
                <Route path={ROUTES.REGISTER}        element={<Register />} />
                <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />
                <Route path={ROUTES.RESET_PASSWORD}  element={<ResetPassword />} />
                <Route path={ROUTES.VERIFY_EMAIL}    element={<VerifyEmail />} />

                {/* Protected Dashboard Routes */}
                <Route element={<AuthGuard />}>
                  <Route element={<DashboardLayout />}>
                    {/* Donor */}
                    <Route element={<RoleGuard allowed={['donor']} />}>
                    <Route path={ROUTES.DONOR_DASHBOARD}  element={<DonorDashboard />} />
                    <Route path={ROUTES.DONOR_PROFILE}    element={<DonorProfile />} />
                    <Route path={ROUTES.ELIGIBILITY}      element={<EligibilityTest />} />
                    <Route path={ROUTES.BOOK_APPOINTMENT} element={<BookAppointment />} />
                    <Route path={ROUTES.DONATION_HISTORY} element={<DonationHistory />} />
                    <Route path={ROUTES.MY_BADGES}        element={<MyBadges />} />
                    <Route path={ROUTES.LEADERBOARD}      element={<Leaderboard />} />
                  </Route>

                  {/* Patient */}
                  <Route element={<RoleGuard allowed={['patient']} />}>
                    <Route path={ROUTES.PATIENT_DASHBOARD} element={<PatientDashboard />} />
                    <Route path={ROUTES.REQUEST_BLOOD}     element={<RequestBlood />} />
                    <Route path={ROUTES.MY_REQUESTS}       element={<MyRequests />} />
                  </Route>

                  {/* Blood Bank Admin */}
                  <Route element={<RoleGuard allowed={['blood_bank_admin', 'national_admin']} />}>
                    <Route path={ROUTES.BANK_DASHBOARD}  element={<BloodBankDashboard />} />
                    <Route path={ROUTES.BANK_INVENTORY}  element={<Inventory />} />
                    <Route path={ROUTES.BANK_APPTS}      element={<Appointments />} />
                    <Route path={ROUTES.BANK_REQUESTS}   element={<BankRequests />} />
                    <Route path={ROUTES.BANK_ANALYTICS}  element={<BankAnalytics />} />
                  </Route>

                  {/* National Admin */}
                  <Route element={<RoleGuard allowed={['national_admin']} />}>
                    <Route path={ROUTES.ADMIN_DASHBOARD}  element={<AdminDashboard />} />
                    <Route path={ROUTES.ADMIN_BANKS}      element={<ManageBloodBanks />} />
                    <Route path={ROUTES.ADMIN_USERS}      element={<ManageUsers />} />
                    <Route path={ROUTES.ADMIN_ANALYTICS}  element={<NationalAnalytics />} />
                    <Route path={ROUTES.ADMIN_AUDIT}      element={<AuditLog />} />
                  </Route>
                </Route>
              </Route>

                {/* Errors */}
                <Route path={ROUTES.UNAUTHORIZED} element={<Unauthorized />} />
                <Route path="*"                   element={<NotFound />} />
              </Routes>
            </Suspense>
          </AnimatePresence>
        </BrowserRouter>

        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              borderRadius: '12px',
              fontFamily:   "'Inter', sans-serif",
              fontSize:     '14px',
              fontWeight:   '500',
            },
            success: { iconTheme: { primary: '#01411C', secondary: '#fff' } },
            error:   { iconTheme: { primary: '#C8102E', secondary: '#fff' } },
          }}
        />
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
