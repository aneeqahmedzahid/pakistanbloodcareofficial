import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Box, Typography, Grid, Card, CardContent, Button, Chip, LinearProgress } from '@mui/material'
import { 
  BloodtypeRounded, AccessTimeRounded, LocalHospitalRounded, AddRounded
} from '@mui/icons-material'
import { useAuthStore } from '../../stores/authStore'
import { ROUTES } from '../../router/routes'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.4 } })
}

const PatientDashboard: React.FC = () => {
  const { user } = useAuthStore()

  // Mock active request
  const activeRequest = {
    id: 'req_1',
    bloodGroup: 'O+',
    unitsNeeded: 3,
    unitsFulfilled: 1,
    hospital: 'Aga Khan University Hospital',
    urgency: 'critical',
    status: 'matched',
    matches: 2,
    createdAt: '2 hours ago'
  }

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
      <motion.div custom={0} initial="hidden" animate="visible" variants={fadeUp}>
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 800, fontFamily: 'heading', color: 'text.primary', mb: 0.5 }}>
              Patient Dashboard
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              Welcome, {user?.full_name}. Manage your blood requests here.
            </Typography>
          </Box>
          <Button 
            variant="contained" 
            component={Link} 
            to={ROUTES.REQUEST_BLOOD}
            startIcon={<AddRounded />}
            sx={{ borderRadius: '10px', fontWeight: 700, background: 'linear-gradient(135deg, #C8102E, #9b0b22)', boxShadow: '0 4px 14px rgba(200, 16, 46, 0.4)' }}
          >
            New Blood Request
          </Button>
        </Box>
      </motion.div>

      <Grid container spacing={3}>
        {/* Active Request Tracker */}
        <Grid item xs={12} md={8}>
          <motion.div custom={1} initial="hidden" animate="visible" variants={fadeUp}>
            <Card sx={{ mb: 3, borderRadius: 4, border: '1px solid', borderColor: 'error.200', position: 'relative', overflow: 'hidden' }}>
              {/* Emergency Accent */}
              <Box sx={{ position: 'absolute', top: 0, left: 0, w: 6, h: '100%', bgcolor: 'error.main' }} />
              
              <CardContent sx={{ p: 4, pl: 5 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                  <Box>
                    <Chip label="Critical Emergency" color="error" size="small" sx={{ fontWeight: 700, mb: 1, borderRadius: 1 }} />
                    <Typography variant="h5" sx={{ fontWeight: 800, fontFamily: 'heading', mb: 0.5 }}>
                      Active Blood Request
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <AccessTimeRounded fontSize="small" /> Requested {activeRequest.createdAt}
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: 'center' }}>
                    <Box sx={{ w: 56, h: 56, borderRadius: '50%', bgcolor: 'error.50', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'error.main', mx: 'auto', mb: 0.5 }}>
                      <Typography variant="h6" sx={{ fontWeight: 800, fontFamily: 'heading' }}>{activeRequest.bloodGroup}</Typography>
                    </Box>
                    <Typography variant="caption" sx={{ fontWeight: 600 }}>Blood Group</Typography>
                  </Box>
                </Box>

                <Grid container spacing={3} sx={{ mb: 4 }}>
                  <Grid item xs={6} sm={4}>
                    <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>HOSPITAL</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <LocalHospitalRounded fontSize="small" color="primary" /> {activeRequest.hospital}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>POTENTIAL MATCHES</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: 'success.main' }}>
                      {activeRequest.matches} Donors Found
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>STATUS</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: 'primary.main', textTransform: 'capitalize' }}>
                      {activeRequest.status}
                    </Typography>
                  </Grid>
                </Grid>

                <Box sx={{ bgcolor: 'surface.50', p: 3, borderRadius: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Fulfillment Progress</Typography>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'error.main' }}>
                      {activeRequest.unitsFulfilled} / {activeRequest.unitsNeeded} Units
                    </Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={(activeRequest.unitsFulfilled / activeRequest.unitsNeeded) * 100} 
                    color="error" 
                    sx={{ height: 10, borderRadius: 5, mb: 2 }} 
                  />
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    We are actively notifying eligible {activeRequest.bloodGroup} donors in your area.
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} md={4}>
          <motion.div custom={2} initial="hidden" animate="visible" variants={fadeUp}>
            <Card sx={{ mb: 3, borderRadius: 4, bgcolor: 'primary.900', color: 'white', position: 'relative', overflow: 'hidden' }}>
              <Box sx={{ position: 'absolute', top: -30, right: -30, opacity: 0.1 }}>
                <BloodtypeRounded sx={{ fontSize: 150 }} />
              </Box>
              <CardContent sx={{ p: 4, position: 'relative', zIndex: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, fontFamily: 'heading', mb: 2 }}>
                  Need Help?
                </Typography>
                <Typography variant="body2" sx={{ mb: 3, opacity: 0.9, lineHeight: 1.6 }}>
                  If you are unable to find donors in time, our support team can manually escalate your request to our broader network.
                </Typography>
                <Button variant="contained" fullWidth sx={{ bgcolor: 'white', color: 'primary.900', fontWeight: 700, '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' } }}>
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div custom={3} initial="hidden" animate="visible" variants={fadeUp}>
            <Card sx={{ borderRadius: 4 }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, fontFamily: 'heading' }}>
                    Past Requests
                  </Typography>
                  <Button component={Link} to={ROUTES.MY_REQUESTS} size="small">View All</Button>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, bgcolor: 'surface.50', borderRadius: 2 }}>
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>A+ • 2 Units</Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>Jan 12, 2026</Typography>
                  </Box>
                  <Chip label="Fulfilled" color="success" size="small" sx={{ fontWeight: 600 }} />
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  )
}

export default PatientDashboard
