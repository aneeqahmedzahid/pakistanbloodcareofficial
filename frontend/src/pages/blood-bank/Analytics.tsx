import React from 'react'
import { motion } from 'framer-motion'
import { Box, Typography, Card, CardContent, Grid, LinearProgress } from '@mui/material'
import { TrendingUpRounded, OpacityRounded, LocalHospitalRounded } from '@mui/icons-material'

type ProgressColor = React.ComponentProps<typeof LinearProgress>['color']
const DEMOGRAPHIC_STATS: { label: string; value: number; color: ProgressColor }[] = [
  { label: 'Male Donors', value: 65, color: 'primary' },
  { label: 'Female Donors', value: 35, color: 'secondary' },
  { label: 'First Time Donors', value: 20, color: 'success' },
  { label: 'Regular Donors', value: 80, color: 'info' },
]

const Analytics: React.FC = () => {
  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 800, fontFamily: 'heading', mb: 0.5 }}>
            Analytics & Reports
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            Insights into donations, request fulfillments, and inventory trends.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {/* Summary Cards */}
          <Grid item xs={12} sm={4}>
            <Card sx={{ borderRadius: 4, height: '100%' }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: 'primary.50', color: 'primary.main' }}>
                    <OpacityRounded />
                  </Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.secondary' }}>Total Donations (This Month)</Typography>
                </Box>
                <Typography variant="h3" sx={{ fontWeight: 800, fontFamily: 'heading', mb: 1 }}>142</Typography>
                <Typography variant="body2" sx={{ color: 'success.main', fontWeight: 600, display: 'flex', alignItems: 'center' }}>
                  <TrendingUpRounded fontSize="small" sx={{ mr: 0.5 }} /> +12% from last month
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <Card sx={{ borderRadius: 4, height: '100%' }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: 'success.50', color: 'success.main' }}>
                    <LocalHospitalRounded />
                  </Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.secondary' }}>Requests Fulfilled</Typography>
                </Box>
                <Typography variant="h3" sx={{ fontWeight: 800, fontFamily: 'heading', mb: 1 }}>89</Typography>
                <Typography variant="body2" sx={{ color: 'success.main', fontWeight: 600, display: 'flex', alignItems: 'center' }}>
                  <TrendingUpRounded fontSize="small" sx={{ mr: 0.5 }} /> +5% from last month
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Card sx={{ borderRadius: 4, height: '100%' }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: 'error.50', color: 'error.main' }}>
                    <TrendingUpRounded />
                  </Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.secondary' }}>Discarded Units</Typography>
                </Box>
                <Typography variant="h3" sx={{ fontWeight: 800, fontFamily: 'heading', mb: 1 }}>3</Typography>
                <Typography variant="body2" sx={{ color: 'error.main', fontWeight: 600 }}>
                  Due to expiration
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Detailed Stats */}
          <Grid item xs={12} md={6}>
            <Card sx={{ borderRadius: 4 }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>Donation Demographics</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {DEMOGRAPHIC_STATS.map((stat) => (
                    <Box key={stat.label}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>{stat.label}</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 700 }}>{stat.value}%</Typography>
                      </Box>
                      <LinearProgress variant="determinate" value={stat.value} color={stat.color} sx={{ height: 8, borderRadius: 4 }} />
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card sx={{ borderRadius: 4, height: '100%' }}>
              <CardContent sx={{ p: 4, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', height: '100%' }}>
                <Typography variant="h6" sx={{ color: 'text.secondary', mb: 2 }}>
                  Advanced Charting Integration Ready
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', maxWidth: 300 }}>
                  Placeholder for Recharts or Chart.js integration to visualize blood collection trends over the year.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

        </Grid>
      </motion.div>
    </Box>
  )
}

export default Analytics
