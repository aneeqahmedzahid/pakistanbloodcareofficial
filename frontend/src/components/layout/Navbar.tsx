import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  AppBar, Toolbar, Button, IconButton, Avatar, Menu, MenuItem,
  Drawer, List, ListItemButton, ListItemIcon, ListItemText,
  Divider, useMediaQuery, useTheme, Badge, Tooltip,
} from '@mui/material'
import {
  MenuRounded, CloseRounded,
  NotificationsRounded, DarkModeRounded, LightModeRounded,
  PersonRounded, LogoutRounded, DashboardRounded,
} from '@mui/icons-material'
import { useAuthStore } from '../../stores/authStore'
import { useUIStore } from '../../stores/uiStore'
import { useNotificationStore } from '../../stores/notificationStore'
import { ROUTES } from '../../router/routes'
import { APP_NAME } from '../../config/constants'

const NAV_LINKS = [
  { label: 'Find Donor',     href: ROUTES.FIND_DONOR },
  { label: 'Blood Banks',    href: ROUTES.FIND_BANK },
  { label: 'Emergency',      href: ROUTES.EMERGENCY },
]

const ROLE_DASHBOARD: Record<string, string> = {
  donor:            ROUTES.DONOR_DASHBOARD,
  patient:          ROUTES.PATIENT_DASHBOARD,
  blood_bank_admin: ROUTES.BANK_DASHBOARD,
  national_admin:   ROUTES.ADMIN_DASHBOARD,
  admin:            ROUTES.ADMIN_DASHBOARD,
}

export const Navbar: React.FC = () => {
  const { user, role, logout }     = useAuthStore()
  const { isDarkMode, toggleDarkMode } = useUIStore()
  const { unreadCount }            = useNotificationStore()
  const location  = useLocation()
  const navigate  = useNavigate()
  const muiTheme  = useTheme()
  const isMobile  = useMediaQuery(muiTheme.breakpoints.down('md'))

  const [drawerOpen,   setDrawerOpen]   = useState(false)
  const [anchorEl,     setAnchorEl]     = useState<null | HTMLElement>(null)
  const [scrolled,     setScrolled]     = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLogout = async () => {
    await logout()
    navigate(ROUTES.HOME)
    setAnchorEl(null)
  }

  const dashboardRoute = role ? ROLE_DASHBOARD[role] : null

  const isActive = (href: string) => location.pathname === href

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        bgcolor: 'background.paper',
        backdropFilter: 'blur(12px)',
        borderBottom:   scrolled ? 1 : 0,
        borderColor:    'divider',
        transition:     'all 0.3s ease',
      }}
    >
      <Toolbar sx={{ maxWidth: '1280px', mx: 'auto', width: '100%', px: { xs: 2, md: 4 } }}>

        {/* Logo */}
        <Link to={ROUTES.HOME} className="flex items-center gap-2 no-underline mr-8">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2"
          >
            <img src="/logo.png" alt="Pakistan Bloodcare Official" className="w-11 h-11 rounded-full object-cover shadow-glow-green" />
            <span className="font-heading font-bold text-lg text-primary-700 dark:text-primary-400 hidden sm:block leading-tight">
              Pakistan<br />
              <span className="text-blood-600 text-sm font-semibold">Bloodcare</span>
            </span>
          </motion.div>
        </Link>

        {/* Desktop Nav Links */}
        {!isMobile && (
          <div className="flex items-center gap-1 flex-1">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} to={link.href} className="no-underline">
                <motion.div whileHover={{ y: -1 }}>
                  <Button
                    sx={{
                      color:      isActive(link.href) ? '#01411C' : '#475569',
                      fontWeight: isActive(link.href) ? 700 : 500,
                      borderRadius: '10px',
                      px: 2,
                      '&:hover': { background: 'rgba(1,65,28,0.06)', color: '#01411C' },
                    }}
                  >
                    {link.label}
                    {link.href === ROUTES.EMERGENCY && (
                      <span className="ml-1.5 w-2 h-2 rounded-full bg-blood-600 animate-pulse-slow inline-block" />
                    )}
                  </Button>
                </motion.div>
              </Link>
            ))}
          </div>
        )}

        <div className="flex-1" />

        {/* Right Actions */}
        <div className="flex items-center gap-1">
          {/* Dark Mode Toggle */}
          <Tooltip title={isDarkMode ? 'Light Mode' : 'Dark Mode'}>
            <IconButton onClick={toggleDarkMode} size="small"
              sx={{ color: '#475569', '&:hover': { color: '#01411C' } }}>
              {isDarkMode
                ? <LightModeRounded fontSize="small" />
                : <DarkModeRounded  fontSize="small" />}
            </IconButton>
          </Tooltip>

          {user ? (
            <>
              {/* Notifications */}
              <Tooltip title="Notifications">
                <IconButton size="small" sx={{ color: '#475569', '&:hover': { color: '#01411C' } }}>
                  <Badge badgeContent={unreadCount} color="error" max={9}>
                    <NotificationsRounded fontSize="small" />
                  </Badge>
                </IconButton>
              </Tooltip>

              {/* Dashboard shortcut */}
              {!isMobile && dashboardRoute && (
                <Link to={dashboardRoute} className="no-underline">
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<DashboardRounded />}
                    sx={{
                      borderColor: '#01411C', color: '#01411C', borderRadius: '10px',
                      '&:hover': { background: '#01411C', color: '#fff' },
                      mx: 0.5,
                    }}
                  >
                    Dashboard
                  </Button>
                </Link>
              )}

              {/* User Avatar */}
              <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} size="small">
                <Avatar sx={{ width: 34, height: 34, fontSize: 14 }}>
                  {user.full_name?.[0]?.toUpperCase()}
                </Avatar>
              </IconButton>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                PaperProps={{ sx: { borderRadius: '14px', mt: 1, minWidth: 180, boxShadow: '0 8px 32px rgba(0,0,0,0.12)' } }}
              >
                <div className="px-4 py-2">
                  <p className="font-semibold text-sm text-surface-900">{user.full_name}</p>
                  <p className="text-xs text-surface-500 capitalize">{role?.replace('_', ' ')}</p>
                </div>
                <Divider />
                <MenuItem onClick={() => { navigate(dashboardRoute ?? ROUTES.HOME); setAnchorEl(null) }}>
                  <ListItemIcon><DashboardRounded fontSize="small" /></ListItemIcon>
                  Dashboard
                </MenuItem>
                <MenuItem onClick={() => { navigate(ROUTES.DONOR_PROFILE); setAnchorEl(null) }}>
                  <ListItemIcon><PersonRounded fontSize="small" /></ListItemIcon>
                  Profile
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout} sx={{ color: '#C8102E' }}>
                  <ListItemIcon><LogoutRounded fontSize="small" sx={{ color: '#C8102E' }} /></ListItemIcon>
                  Sign Out
                </MenuItem>
              </Menu>
            </>
          ) : (
            !isMobile && (
              <div className="flex items-center gap-2 ml-2">
                <Link to={ROUTES.LOGIN} className="no-underline">
                  <Button variant="text" sx={{ color: '#475569', fontWeight: 500 }}>
                    Sign In
                  </Button>
                </Link>
                <Link to={ROUTES.REGISTER} className="no-underline">
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Button
                      variant="contained"
                      size="small"
                      sx={{
                        background: 'linear-gradient(135deg, #01411C 0%, #016b2e 100%)',
                        borderRadius: '10px',
                        px: 2.5,
                        boxShadow: '0 4px 12px rgba(1,65,28,0.3)',
                        '&:hover': { boxShadow: '0 6px 20px rgba(1,65,28,0.4)' },
                      }}
                    >
                      Donate Blood
                    </Button>
                  </motion.div>
                </Link>
              </div>
            )
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <IconButton onClick={() => setDrawerOpen(true)} sx={{ color: '#01411C' }}>
              <MenuRounded />
            </IconButton>
          )}
        </div>
      </Toolbar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{ sx: { width: 280, borderRadius: '20px 0 0 20px' } }}
      >
        <div className="p-4 flex justify-between items-center border-b border-surface-100">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="" className="w-9 h-9 rounded-full object-cover" />
            <span className="font-heading font-bold text-primary-700">{APP_NAME}</span>
          </div>
          <IconButton onClick={() => setDrawerOpen(false)}>
            <CloseRounded />
          </IconButton>
        </div>
        <List className="p-2">
          {NAV_LINKS.map((link) => (
            <ListItemButton
              key={link.href}
              component={Link}
              to={link.href}
              onClick={() => setDrawerOpen(false)}
              sx={{ borderRadius: '10px', mb: 0.5 }}
              selected={isActive(link.href)}
            >
              <ListItemText primary={link.label} />
            </ListItemButton>
          ))}
          <Divider sx={{ my: 1 }} />
          {user ? (
            <>
              {dashboardRoute && (
                <ListItemButton
                  component={Link} to={dashboardRoute}
                  onClick={() => setDrawerOpen(false)}
                  sx={{ borderRadius: '10px', mb: 0.5 }}
                >
                  <ListItemIcon><DashboardRounded sx={{ color: '#01411C' }} /></ListItemIcon>
                  <ListItemText primary="Dashboard" />
                </ListItemButton>
              )}
              <ListItemButton onClick={handleLogout} sx={{ borderRadius: '10px', color: '#C8102E' }}>
                <ListItemIcon><LogoutRounded sx={{ color: '#C8102E' }} fontSize="small" /></ListItemIcon>
                <ListItemText primary="Sign Out" />
              </ListItemButton>
            </>
          ) : (
            <div className="p-2 flex flex-col gap-2">
              <Link to={ROUTES.LOGIN} className="no-underline" onClick={() => setDrawerOpen(false)}>
                <Button fullWidth variant="outlined" sx={{ borderRadius: '10px', borderColor: '#01411C', color: '#01411C' }}>
                  Sign In
                </Button>
              </Link>
              <Link to={ROUTES.REGISTER} className="no-underline" onClick={() => setDrawerOpen(false)}>
                <Button fullWidth variant="contained"
                  sx={{ borderRadius: '10px', background: 'linear-gradient(135deg, #01411C, #016b2e)' }}>
                  Donate Blood
                </Button>
              </Link>
            </div>
          )}
        </List>
      </Drawer>
    </AppBar>
  )
}
