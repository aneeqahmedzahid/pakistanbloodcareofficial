import React from 'react'
import { Outlet } from 'react-router-dom'
import { IconButton, AppBar, Toolbar, Box, Avatar } from '@mui/material'
import { MenuRounded, NotificationsRounded } from '@mui/icons-material'
import { Sidebar } from './Sidebar'
import { useUIStore } from '../../stores/uiStore'
import { useAuthStore } from '../../stores/authStore'

const DRAWER_WIDTH = 260

export const DashboardLayout: React.FC = () => {
  const { setSidebarOpen } = useUIStore()
  const { user } = useAuthStore()

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <Sidebar />
      
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', width: { md: `calc(100% - ${DRAWER_WIDTH}px)` } }}>
        <AppBar 
          position="sticky" 
          elevation={0}
          sx={{ 
            bgcolor: 'background.paper', 
            borderBottom: 1, 
            borderColor: 'divider',
            color: 'text.primary',
            backdropFilter: 'blur(8px)',
            background: 'rgba(255, 255, 255, 0.9)'
          }}
        >
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <IconButton
              color="inherit"
              edge="start"
              onClick={() => setSidebarOpen(true)}
              sx={{ mr: 2, display: { md: 'none' } }}
            >
              <MenuRounded />
            </IconButton>

            <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto', gap: 2 }}>
              <IconButton color="inherit" sx={{ bgcolor: 'rgba(0,0,0,0.04)' }}>
                <NotificationsRounded fontSize="small" />
              </IconButton>
              <Avatar sx={{ width: 36, height: 36, bgcolor: 'primary.main', fontSize: '0.9rem' }}>
                {user?.full_name?.charAt(0)}
              </Avatar>
            </Box>
          </Toolbar>
        </AppBar>

        <Box component="main" sx={{ flexGrow: 1, p: { xs: 2, md: 4 }, overflowX: 'hidden' }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  )
}
