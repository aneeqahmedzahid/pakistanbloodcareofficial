import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Box, Typography, Grid, Card, CardContent, Button, Chip, LinearProgress } from '@mui/material'
import { 
  BloodtypeRounded, CalendarMonthRounded, EmojiEventsRounded, 
  ArrowForwardRounded, WarningRounded, LocalHospitalRounded, FavoriteRounded
} from '@mui/icons-material'
import { useAuthStore } from '../../stores/authStore'
import { ROUTES } from '../../router/routes'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.4 } })
}

const DonorDashboard: React.FC = () => {
  const { user } = useAuthStore()

  // Mock data for now
  const stats = {
    totalDonations: 4,
    nextEligible: '2026-06-15',
    badges: 2,
    bloodGroup: 'O+',
    isEligible: false,
  }

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
      <motion.div custom={0} initial="hidden" animate="visible" variants={fadeUp}>
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 800, fontFamily: 'heading', color: 'text.primary', mb: 0.5 }}>
              Welcome back, {user?.full_name?.split(' ')[0]} 👋
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              Your dashboard overview and recent activities.
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button 
              variant="outlined" 
              component={Link} 
              to={ROUTES.FIND_BANK}
              startIcon={<LocalHospitalRounded />}
              sx={{ borderRadius: '10px', fontWeight: 600, borderColor: 'primary.main', color: 'primary.main' }}
            >
              Find Blood Bank
            </Button>
            <Button 
              variant="contained" 
              component={Link} 
              to={ROUTES.BOOK_APPOINTMENT}
              startIcon={<BloodtypeRounded />}
              sx={{ borderRadius: '10px', fontWeight: 600, background: 'linear-gradient(135deg, #01411C, #016b2e)' }}
            >
              Donate Now
            </Button>
          </Box>
        </Box>
      </motion.div>

      {/* Overview Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {[
          { label: 'Blood Group', value: stats.bloodGroup, icon: <BloodtypeRounded />, color: 'error' },
          { label: 'Total Donations', value: stats.totalDonations, icon: <FavoriteRounded />, color: 'primary' },
          { label: 'Badges Earned', value: stats.badges, icon: <EmojiEventsRounded />, color: 'warning' },
          { label: 'Next Eligible', value: stats.nextEligible, icon: <CalendarMonthRounded />, color: 'info' },
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
                    <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600, mb: 0.5 }}>
                      {stat.label}
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 800, fontFamily: 'heading', color: 'text.primary' }}>
                      {stat.value}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* Main Section */}
        <Grid item xs={12} md={8}>
          <motion.div custom={5} initial="hidden" animate="visible" variants={fadeUp}>
            <Card sx={{ mb: 3 }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, fontFamily: 'heading' }}>
                    Eligibility Status
                  </Typography>
                  <Chip 
                    label={stats.isEligible ? "Eligible" : "Not Eligible"} 
                    color={stats.isEligible ? "success" : "default"}
                    size="small"
                    sx={{ fontWeight: 600, borderRadius: '8px' }}
                  />
                </Box>
                
                {!stats.isEligible ? (
                  <Box sx={{ bgcolor: 'error.50', p: 3, borderRadius: 3, border: '1px solid', borderColor: 'error.100' }}>
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                      <WarningRounded color="error" />
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'error.900' }}>
                          You are currently not eligible to donate.
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'error.700', mb: 2 }}>
                          Based on your last donation date, you must wait until {stats.nextEligible} before your next whole blood donation.
                        </Typography>
                        <LinearProgress variant="determinate" value={60} color="error" sx={{ height: 6, borderRadius: 3, mb: 1 }} />
                        <Typography variant="caption" sx={{ color: 'error.700', fontWeight: 500 }}>
                          Approx. 35 days remaining
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                ) : (
                  <Box sx={{ bgcolor: 'success.50', p: 3, borderRadius: 3, border: '1px solid', borderColor: 'success.100' }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'success.900', mb: 1 }}>
                      You're ready to save lives!
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'success.700', mb: 2 }}>
                      It's been over 90 days since your last donation.
                    </Typography>
                    <Button 
                      variant="contained" 
                      color="success" 
                      component={Link} 
                      to={ROUTES.BOOK_APPOINTMENT}
                      sx={{ borderRadius: '8px', fontWeight: 600 }}
                    >
                      Book Appointment
                    </Button>
                  </Box>
                )}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div custom={6} initial="hidden" animate="visible" variants={fadeUp}>
            <Card>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, fontFamily: 'heading' }}>
                    Recent Donations
                  </Typography>
                  <Button component={Link} to={ROUTES.DONATION_HISTORY} endIcon={<ArrowForwardRounded />} size="small">
                    View All
                  </Button>
                </Box>
                
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {[1, 2].map((i) => (
                    <Box key={i} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, bgcolor: 'background.default', borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
                      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                        <Box sx={{ w: 40, h: 40, borderRadius: '50%', bgcolor: 'primary.50', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'primary.main' }}>
                          <BloodtypeRounded fontSize="small" />
                        </Box>
                        <Box>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Whole Blood (1 Unit)</Typography>
                          <Typography variant="caption" sx={{ color: 'text.secondary' }}>Jinnah Hospital, Karachi</Typography>
                        </Box>
                      </Box>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.secondary' }}>
                        {i === 1 ? 'Mar 15, 2026' : 'Dec 02, 2025'}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Sidebar Section */}
        <Grid item xs={12} md={4}>
          <motion.div custom={7} initial="hidden" animate="visible" variants={fadeUp}>
            <Card sx={{ mb: 3 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, fontFamily: 'heading', mb: 3 }}>
                  Your Badges
                </Typography>
                <Grid container spacing={2}>
                  {[
                    { icon: '💧', label: 'First Drop' },
                    { icon: '❤️', label: 'Life Saver' },
                  ].map((b, i) => (
                    <Grid item xs={6} key={i}>
                      <Box sx={{ 
                        p: 2, textAlign: 'center', bgcolor: 'background.default', 
                        borderRadius: 3, border: '1px solid', borderColor: 'divider'
                      }}>
                        <Typography sx={{ fontSize: '2rem', mb: 1 }}>{b.icon}</Typography>
                        <Typography variant="caption" sx={{ fontWeight: 600 }}>{b.label}</Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
                <Button fullWidth variant="outlined" component={Link} to={ROUTES.MY_BADGES} sx={{ mt: 3, borderRadius: '8px' }}>
                  View Badges
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div custom={8} initial="hidden" animate="visible" variants={fadeUp}>
            <Card sx={{ background: 'linear-gradient(135deg, #C8102E 0%, #9b0b22 100%)', color: 'white' }}>
              <CardContent sx={{ p: 3, textAlign: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 700, fontFamily: 'heading', mb: 1 }}>
                  Urgent Need in Your City
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9, mb: 3 }}>
                  There are 3 critical requests for O+ blood in Karachi today.
                </Typography>
                <Button 
                  variant="contained" 
                  fullWidth
                  sx={{ bgcolor: 'white', color: '#C8102E', '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' }, fontWeight: 700, borderRadius: '10px' }}
                >
                  View Emergency Requests
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  )
}

export default DonorDashboard
