import React from 'react'
import { motion } from 'framer-motion'
import { Box, Typography, Grid, Card, CardContent, Chip } from '@mui/material'
import { 
  SupervisedUserCircleRounded, LocalHospitalRounded, 
  MapRounded, SecurityRounded 
} from '@mui/icons-material'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.4 } })
}

const AdminDashboard: React.FC = () => {
  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
      <motion.div custom={0} initial="hidden" animate="visible" variants={fadeUp}>
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 800, fontFamily: 'heading', color: 'text.primary', mb: 0.5 }}>
              National Administration
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              Platform manager overview and system-wide metrics.
            </Typography>
          </Box>
          <Chip label="Platform Manager: Rukhsar Rajpoot" color="primary" sx={{ fontWeight: 700, borderRadius: '8px' }} />
        </Box>
      </motion.div>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {[
          { label: 'Registered Donors', value: '52,104', icon: <SupervisedUserCircleRounded />, color: 'primary' },
          { label: 'Verified Blood Banks', value: '1,240', icon: <LocalHospitalRounded />, color: 'success' },
          { label: 'Cities Covered', value: '124', icon: <MapRounded />, color: 'info' },
          { label: 'System Health', value: '99.9%', icon: <SecurityRounded />, color: 'warning' },
        ].map((stat, i) => (
          <Grid item xs={12} sm={6} md={3} key={i}>
            <motion.div custom={i + 1} initial="hidden" animate="visible" variants={fadeUp}>
              <Card sx={{ height: '100%', borderRadius: 4, boxShadow: 'var(--shadow-card)' }}>
                <CardContent sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ 
                    w: 56, h: 56, borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    bgcolor: `${stat.color}.50`, color: `${stat.color}.main`, flexShrink: 0 
                  }}>
                    {stat.icon}
                  </Box>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 800, fontFamily: 'heading', color: 'text.primary', lineHeight: 1.2 }}>
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
        <Grid item xs={12} md={8}>
          <motion.div custom={5} initial="hidden" animate="visible" variants={fadeUp}>
            <Card sx={{ borderRadius: 4, height: '100%', boxShadow: 'var(--shadow-card)' }}>
              <CardContent sx={{ p: 4, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: 300 }}>
                <Typography variant="h6" sx={{ color: 'text.secondary', mb: 2 }}>
                  National Map Integration
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center', maxWidth: 400 }}>
                  This section is reserved for the Leaflet.js map integration showing active blood requests and blood bank locations across Pakistan.
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        <Grid item xs={12} md={4}>
          <motion.div custom={6} initial="hidden" animate="visible" variants={fadeUp}>
            <Card sx={{ borderRadius: 4, height: '100%', boxShadow: 'var(--shadow-card)' }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, fontFamily: 'heading', mb: 3 }}>
                  System Alerts
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {[
                    { title: 'New Blood Bank Registration', desc: 'Indus Hospital Lahore is pending verification.', color: 'warning' },
                    { title: 'O- Shortage in Karachi', desc: 'System matched 150 potential donors.', color: 'error' },
                    { title: 'Database Backup Complete', desc: 'Automated backup completed at 03:00 AM.', color: 'success' },
                  ].map((alert, i) => (
                    <Box key={i} sx={{ p: 2, borderRadius: 2, bgcolor: `${alert.color}.50`, borderLeft: '4px solid', borderColor: `${alert.color}.main` }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: `${alert.color}.900` }}>
                        {alert.title}
                      </Typography>
                      <Typography variant="caption" sx={{ color: `${alert.color}.700` }}>
                        {alert.desc}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  )
}

export default AdminDashboard
