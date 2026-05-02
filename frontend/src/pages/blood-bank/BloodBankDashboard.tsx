import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Box, Typography, Grid, Card, CardContent, Button, LinearProgress, Chip } from '@mui/material'
import { 
  BloodtypeRounded, TrendingUpRounded, LocalHospitalRounded, 
  NotificationsActiveRounded, ArrowForwardRounded, Inventory2Rounded
} from '@mui/icons-material'
import { useAuthStore } from '../../stores/authStore'
import { ROUTES } from '../../router/routes'
import { BLOOD_GROUPS } from '../../config/constants'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.4 } })
}

const INVENTORY_SNAPSHOT = BLOOD_GROUPS.map((group, index) => {
  const units = [28, 12, 34, 7, 18, 5, 41, 3][index] ?? 0
  return {
    group,
    units,
    status: units <= 5 ? 'critical' : units <= 12 ? 'low' : 'optimal',
  }
})

const BloodBankDashboard: React.FC = () => {
  const { user } = useAuthStore()

  // Mock Data
  const stats = {
    totalUnits: 145,
    criticalLow: ['O-', 'AB-'],
    todayAppointments: 12,
    activeRequests: 5
  }

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
      <motion.div custom={0} initial="hidden" animate="visible" variants={fadeUp}>
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 800, fontFamily: 'heading', color: 'text.primary', mb: 0.5 }}>
              Blood Bank Operations
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              {user?.full_name || 'Jinnah Hospital'} • Central Dashboard
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button 
              variant="outlined" 
              component={Link} 
              to={ROUTES.BANK_REQUESTS}
              startIcon={<NotificationsActiveRounded />}
              sx={{ borderRadius: '10px', fontWeight: 600 }}
            >
              Pending Requests ({stats.activeRequests})
            </Button>
            <Button 
              variant="contained" 
              component={Link} 
              to={ROUTES.BANK_INVENTORY}
              startIcon={<Inventory2Rounded />}
              sx={{ borderRadius: '10px', fontWeight: 600, background: 'linear-gradient(135deg, #01411C, #016b2e)' }}
            >
              Update Inventory
            </Button>
          </Box>
        </Box>
      </motion.div>

      {/* Overview Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {[
          { label: 'Total Units Available', value: stats.totalUnits, icon: <BloodtypeRounded />, color: 'primary' },
          { label: 'Critical Shortages', value: stats.criticalLow.length, icon: <TrendingUpRounded sx={{ transform: 'rotate(180deg)' }} />, color: 'error' },
          { label: 'Appointments Today', value: stats.todayAppointments, icon: <LocalHospitalRounded />, color: 'info' },
          { label: 'Emergency Requests', value: stats.activeRequests, icon: <NotificationsActiveRounded />, color: 'warning' },
        ].map((stat, i) => (
          <Grid item xs={12} sm={6} md={3} key={i}>
            <motion.div custom={i + 1} initial="hidden" animate="visible" variants={fadeUp}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ 
                    w: 48, h: 48, borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    bgcolor: `${stat.color}.light`, color: `${stat.color}.main`, flexShrink: 0 
                  }}>
                    {stat.icon}
                  </Box>
                  <Box>
                    <Typography variant="h5" sx={{ fontWeight: 800, fontFamily: 'heading', color: 'text.primary' }}>
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                      {stat.label}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* Inventory Snapshot */}
        <Grid item xs={12} md={8}>
          <motion.div custom={5} initial="hidden" animate="visible" variants={fadeUp}>
            <Card sx={{ mb: 3 }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, fontFamily: 'heading' }}>
                    Live Inventory Status
                  </Typography>
                  <Button component={Link} to={ROUTES.BANK_INVENTORY} endIcon={<ArrowForwardRounded />} size="small">
                    Manage Stock
                  </Button>
                </Box>
                
                <Grid container spacing={2}>
                  {INVENTORY_SNAPSHOT.map((item) => (
                    <Grid item xs={6} sm={3} key={item.group}>
                      <Box sx={{ 
                        p: 2, borderRadius: 2, border: '1px solid',
                        borderColor: item.status === 'critical' ? 'error.300' : item.status === 'low' ? 'warning.300' : 'success.300',
                        bgcolor: item.status === 'critical' ? 'error.50' : item.status === 'low' ? 'warning.50' : 'success.50'
                      }}>
                        <Typography variant="h6" sx={{ fontWeight: 800, color: item.status === 'critical' ? 'error.main' : 'text.primary' }}>
                          {item.group}
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mt: 1 }}>
                          <Typography variant="h5" sx={{ fontWeight: 800 }}>{item.units}</Typography>
                          <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.secondary' }}>Units</Typography>
                        </Box>
                        <LinearProgress 
                          variant="determinate" 
                          value={Math.min(100, (item.units / 50) * 100)} 
                          color={item.status === 'critical' ? 'error' : item.status === 'low' ? 'warning' : 'success'}
                          sx={{ height: 4, borderRadius: 2, mt: 1 }} 
                        />
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Action Center Sidebar */}
        <Grid item xs={12} md={4}>
          <motion.div custom={6} initial="hidden" animate="visible" variants={fadeUp}>
            <Card sx={{ mb: 3 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, fontFamily: 'heading', mb: 2 }}>
                  Today's Donors
                </Typography>
                
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {[
                    { name: 'Ali Khan', time: '10:00 AM', group: 'O+' },
                    { name: 'Sarah Ahmed', time: '11:30 AM', group: 'A-' },
                  ].map((appt, i) => (
                    <Box key={i} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, bgcolor: 'surface.50', borderRadius: 2 }}>
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{appt.name}</Typography>
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>{appt.time}</Typography>
                      </Box>
                      <Chip label={appt.group} size="small" sx={{ fontWeight: 700, bgcolor: 'blood.50', color: 'blood.700' }} />
                    </Box>
                  ))}
                </Box>
                <Button fullWidth variant="outlined" component={Link} to={ROUTES.BANK_APPTS} sx={{ mt: 3, borderRadius: '8px' }}>
                  View All Appointments
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  )
}

export default BloodBankDashboard
