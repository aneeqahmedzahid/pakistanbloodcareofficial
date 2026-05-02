import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Drawer, List, ListItemButton, ListItemIcon, ListItemText, 
  Divider, Box, Typography, Avatar 
} from '@mui/material'
import { 
  DashboardRounded, PersonRounded, FavoriteRounded, HistoryRounded, 
  EmojiEventsRounded, LeaderboardRounded, BloodtypeRounded, LocalHospitalRounded,
  EventRounded, ListAltRounded, AnalyticsRounded, PeopleRounded, SecurityRounded
} from '@mui/icons-material'
import { useAuthStore } from '../../stores/authStore'
import { useUIStore } from '../../stores/uiStore'
import { ROUTES } from '../../router/routes'

const DRAWER_WIDTH = 260

type SidebarMenuItem = {
  text: string
  icon: React.ReactNode
  path: string
}

const DONOR_MENU: SidebarMenuItem[] = [
  { text: 'Dashboard', icon: <DashboardRounded />, path: ROUTES.DONOR_DASHBOARD },
  { text: 'Profile', icon: <PersonRounded />, path: ROUTES.DONOR_PROFILE },
  { text: 'Eligibility Test', icon: <FavoriteRounded />, path: ROUTES.ELIGIBILITY },
  { text: 'Book Appointment', icon: <LocalHospitalRounded />, path: ROUTES.BOOK_APPOINTMENT },
  { text: 'Donation History', icon: <HistoryRounded />, path: ROUTES.DONATION_HISTORY },
  { text: 'My Badges', icon: <EmojiEventsRounded />, path: ROUTES.MY_BADGES },
  { text: 'Leaderboard', icon: <LeaderboardRounded />, path: ROUTES.LEADERBOARD },
]

export const Sidebar: React.FC = () => {
  const { user, role } = useAuthStore()
  const { isSidebarOpen, setSidebarOpen } = useUIStore()
  const location = useLocation()

  // Simplified: Using Donor menu as base. Other roles will be added later.
  let menuItems: SidebarMenuItem[] = DONOR_MENU
  if (role === 'patient') {
    menuItems = [
      { text: 'Dashboard', icon: <DashboardRounded />, path: ROUTES.PATIENT_DASHBOARD },
      { text: 'Request Blood', icon: <BloodtypeRounded />, path: ROUTES.REQUEST_BLOOD },
      { text: 'My Requests', icon: <HistoryRounded />, path: ROUTES.MY_REQUESTS },
    ]
  } else if (role === 'blood_bank_admin') {
    menuItems = [
      { text: 'Dashboard', icon: <DashboardRounded />, path: ROUTES.BANK_DASHBOARD },
      { text: 'Inventory', icon: <BloodtypeRounded />, path: ROUTES.BANK_INVENTORY },
      { text: 'Appointments', icon: <EventRounded />, path: ROUTES.BANK_APPTS },
      { text: 'Requests', icon: <ListAltRounded />, path: ROUTES.BANK_REQUESTS },
      { text: 'Analytics', icon: <AnalyticsRounded />, path: ROUTES.BANK_ANALYTICS },
    ]
  } else if (role === 'national_admin') {
    menuItems = [
      { text: 'Dashboard', icon: <DashboardRounded />, path: ROUTES.ADMIN_DASHBOARD },
      { text: 'Blood Banks', icon: <LocalHospitalRounded />, path: ROUTES.ADMIN_BANKS },
      { text: 'Users', icon: <PeopleRounded />, path: ROUTES.ADMIN_USERS },
      { text: 'Analytics', icon: <AnalyticsRounded />, path: ROUTES.ADMIN_ANALYTICS },
      { text: 'Audit Log', icon: <SecurityRounded />, path: ROUTES.ADMIN_AUDIT },
    ]
  }

  const drawerContent = (
    <div className="h-full flex flex-col bg-white dark:bg-surface-900 border-r border-surface-100 dark:border-surface-800">
      <div className="p-5 flex items-center gap-3">
        <img src="/logo.png" alt="Pakistan Bloodcare Official" className="w-12 h-12 rounded-full object-cover shadow-glow-green" />
        <div className="flex flex-col">
          <span className="font-heading font-bold text-primary-700 dark:text-primary-400 leading-tight">
            Pakistan
          </span>
          <span className="text-blood-600 text-xs font-semibold leading-tight">Bloodcare</span>
        </div>
      </div>

      <Divider sx={{ borderColor: 'rgba(0,0,0,0.05)' }} />

      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar sx={{ bgcolor: '#01411C' }}>{user?.full_name?.charAt(0)}</Avatar>
        <Box>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'text.primary' }}>
            {user?.full_name}
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
            {role?.replace('_', ' ')}
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ borderColor: 'rgba(0,0,0,0.05)' }} />

      <List sx={{ px: 2, pt: 2, flex: 1, overflowY: 'auto' }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path
          return (
            <motion.div key={item.path} whileHover={{ x: 4 }} whileTap={{ scale: 0.98 }}>
              <ListItemButton
                component={Link}
                to={item.path}
                selected={isActive}
                onClick={() => {
                  if (window.innerWidth < 900) setSidebarOpen(false)
                }}
                sx={{
                  borderRadius: '12px',
                  mb: 1,
                  '&.Mui-selected': {
                    bgcolor: 'primary.main',
                    color: '#fff',
                    boxShadow: '0 4px 12px rgba(1, 65, 28, 0.2)',
                    '&:hover': { bgcolor: 'primary.dark' },
                    '& .MuiListItemIcon-root': { color: '#fff' }
                  },
                  '&:not(.Mui-selected)': {
                    color: 'text.secondary',
                    '&:hover': { bgcolor: 'rgba(1, 65, 28, 0.05)', color: 'primary.main' },
                    '& .MuiListItemIcon-root': { color: 'text.secondary' }
                  }
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
                <ListItemText 
                  primary={item.text} 
                  primaryTypographyProps={{ fontWeight: isActive ? 600 : 500, fontSize: '0.9rem' }} 
                />
              </ListItemButton>
            </motion.div>
          )
        })}
      </List>
    </div>
  )

  return (
    <>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': { width: DRAWER_WIDTH, boxSizing: 'border-box', borderRight: 'none' },
        }}
        open
      >
        {drawerContent}
      </Drawer>
      <Drawer
        variant="temporary"
        open={isSidebarOpen}
        onClose={() => setSidebarOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { width: DRAWER_WIDTH, boxSizing: 'border-box' },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  )
}
