import React from 'react'
import { motion } from 'framer-motion'
import { Box, Typography, Card, CardContent, Button, Grid, Chip } from '@mui/material'
import { AddRounded, CampaignRounded } from '@mui/icons-material'

const Campaigns: React.FC = () => {
  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 800, fontFamily: 'heading', mb: 0.5 }}>
              Donation Campaigns
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              Organize and broadcast national or city-wide blood donation drives.
            </Typography>
          </Box>
          <Button variant="contained" startIcon={<AddRounded />} sx={{ borderRadius: '10px', fontWeight: 600 }}>
            New Campaign
          </Button>
        </Box>

        <Grid container spacing={3}>
          {[
            { title: 'World Blood Donor Day Drive', city: 'Nationwide', date: 'June 14, 2026', status: 'upcoming' },
            { title: 'University Outreach Program', city: 'Lahore', date: 'May 10, 2026', status: 'active' },
          ].map((camp, i) => (
            <Grid item xs={12} md={6} key={i}>
              <Card sx={{ borderRadius: 4, boxShadow: 'var(--shadow-card)' }}>
                <CardContent sx={{ p: 4, display: 'flex', gap: 3 }}>
                  <Box sx={{ w: 64, h: 64, borderRadius: 3, bgcolor: 'primary.50', color: 'primary.main', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <CampaignRounded sx={{ fontSize: 32 }} />
                  </Box>
                  <Box sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                      <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.2 }}>{camp.title}</Typography>
                      <Chip label={camp.status} size="small" color={camp.status === 'active' ? 'success' : 'info'} sx={{ textTransform: 'capitalize', fontWeight: 600 }} />
                    </Box>
                    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                      {camp.city} • {camp.date}
                    </Typography>
                    <Button variant="outlined" size="small" sx={{ borderRadius: '8px' }}>Manage Drive</Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </motion.div>
    </Box>
  )
}

export default Campaigns
