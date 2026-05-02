import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Box, Typography, Card, Grid, TextField, Button, Chip, Avatar } from '@mui/material'
import { SearchRounded, VerifiedRounded } from '@mui/icons-material'
import { Navbar } from '../../components/layout/Navbar'
import { Footer } from '../../components/layout/Footer'
import { PAKISTAN_CITIES, BLOOD_GROUPS } from '../../config/constants'

const MOCK_DONORS = [
  { id: '1', name: 'Ali K.', group: 'O+', city: 'Karachi', distance: '1.2 km', donations: 12 },
  { id: '2', name: 'Sara A.', group: 'O+', city: 'Karachi', distance: '3.5 km', donations: 4 },
  { id: '3', name: 'Usman T.', group: 'O+', city: 'Karachi', distance: '5.0 km', donations: 8 },
  { id: '4', name: 'Hassan R.', group: 'O+', city: 'Karachi', distance: '6.2 km', donations: 1 },
]

const FindDonor: React.FC = () => {
  const [city, setCity] = useState('Karachi')
  const [group, setGroup] = useState('O+')

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-900 flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-28 pb-16">
        <Box sx={{ maxWidth: 1200, mx: 'auto', px: 3 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <Typography variant="h3" sx={{ fontWeight: 800, fontFamily: 'heading', mb: 2, color: 'text.primary' }}>
                Find a Donor
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 600, mx: 'auto' }}>
                Search for eligible, verified blood donors in your city.
              </Typography>
            </Box>

            {/* Filter Bar */}
            <Card sx={{ borderRadius: 4, mb: 6, p: 2, boxShadow: 'var(--shadow-card)' }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <TextField select fullWidth label="Blood Group" value={group} onChange={e => setGroup(e.target.value)} SelectProps={{ native: true }}>
                    {BLOOD_GROUPS.map(g => <option key={g} value={g}>{g}</option>)}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={5}>
                  <TextField select fullWidth label="City" value={city} onChange={e => setCity(e.target.value)} SelectProps={{ native: true }}>
                    {PAKISTAN_CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Button variant="contained" fullWidth startIcon={<SearchRounded />} sx={{ height: '100%', borderRadius: '10px', fontWeight: 700, fontSize: '1rem', background: 'linear-gradient(135deg, #C8102E, #9b0b22)' }}>
                    Search Donors
                  </Button>
                </Grid>
              </Grid>
            </Card>

            <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
              {MOCK_DONORS.length} Donors Found for {group} in {city}
            </Typography>

            <Grid container spacing={3}>
              {MOCK_DONORS.map((donor, i) => (
                <Grid item xs={12} sm={6} md={3} key={donor.id}>
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}>
                    <Card sx={{ borderRadius: 4, textAlign: 'center', transition: 'all 0.2s', '&:hover': { transform: 'translateY(-4px)', boxShadow: 'var(--shadow-card-hover)' } }}>
                      <Box sx={{ p: 4 }}>
                        <Avatar sx={{ width: 64, height: 64, mx: 'auto', mb: 2, bgcolor: 'primary.main', fontSize: '1.5rem', fontWeight: 700 }}>
                          {donor.name[0]}
                        </Avatar>
                        <Typography variant="h6" sx={{ fontWeight: 800, fontFamily: 'heading', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
                          {donor.name} <VerifiedRounded color="primary" fontSize="small" />
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, my: 2 }}>
                          <Chip label={donor.group} sx={{ bgcolor: 'blood.50', color: 'blood.700', fontWeight: 800 }} />
                          <Chip label={donor.distance} variant="outlined" sx={{ fontWeight: 600 }} />
                        </Box>
                        <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, display: 'block', mb: 3 }}>
                          {donor.donations} Past Donations
                        </Typography>
                        <Button variant="outlined" fullWidth sx={{ borderRadius: '8px', fontWeight: 600 }}>
                          Contact Donor
                        </Button>
                      </Box>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Box>
      </main>
      
      <Footer />
    </div>
  )
}

export default FindDonor
