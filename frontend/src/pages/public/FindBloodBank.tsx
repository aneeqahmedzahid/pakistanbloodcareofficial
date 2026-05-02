import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Box, Typography, Card, Grid, TextField, InputAdornment, Button, Chip } from '@mui/material'
import { SearchRounded, MapRounded, LocalHospitalRounded, PhoneRounded } from '@mui/icons-material'
import { Navbar } from '../../components/layout/Navbar'
import { Footer } from '../../components/layout/Footer'
import { PAKISTAN_CITIES } from '../../config/constants'

const MOCK_BANKS = [
  { id: '1', name: 'Jinnah Hospital Blood Bank', city: 'Karachi', address: 'Rafiqui Shaheed Road', contact: '021-99201300', status: 'verified', distance: '2.4 km' },
  { id: '2', name: 'Indus Hospital Blood Center', city: 'Karachi', address: 'Korangi Crossing', contact: '021-111-111-880', status: 'verified', distance: '8.1 km' },
  { id: '3', name: 'Aga Khan University Hospital', city: 'Karachi', address: 'Stadium Road', contact: '021-111-911-911', status: 'verified', distance: '5.6 km' },
]

const FindBloodBank: React.FC = () => {
  const [city, setCity] = useState('Karachi')
  const [search, setSearch] = useState('')

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-900 flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-28 pb-16">
        <Box sx={{ maxWidth: 1200, mx: 'auto', px: 3 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <Typography variant="h3" sx={{ fontWeight: 800, fontFamily: 'heading', mb: 2, color: 'text.primary' }}>
                Find a Blood Bank
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 600, mx: 'auto' }}>
                Locate verified blood banks and hospital reserves near you across Pakistan.
              </Typography>
            </Box>

            {/* Search Bar */}
            <Card sx={{ borderRadius: 4, mb: 6, p: 2, boxShadow: 'var(--shadow-card)' }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={5}>
                  <TextField 
                    fullWidth 
                    label="Search Hospital/Bank" 
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    InputProps={{ startAdornment: <InputAdornment position="start"><SearchRounded /></InputAdornment> }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField select fullWidth label="City" value={city} onChange={e => setCity(e.target.value)} SelectProps={{ native: true }}>
                    {PAKISTAN_CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Button variant="contained" fullWidth sx={{ height: '100%', borderRadius: '10px', fontWeight: 700, fontSize: '1rem' }}>
                    Search
                  </Button>
                </Grid>
              </Grid>
            </Card>

            <Grid container spacing={4}>
              {/* Map Placeholder */}
              <Grid item xs={12} md={7}>
                <Card sx={{ borderRadius: 4, height: 500, bgcolor: 'surface.100', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '2px dashed', borderColor: 'divider' }}>
                  <MapRounded sx={{ fontSize: 64, color: 'primary.300', mb: 2 }} />
                  <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 700 }}>
                    Interactive Map Integration
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', maxWidth: 300, textAlign: 'center' }}>
                    Leaflet.js will be rendered here, plotting all {city} verified blood banks on the map.
                  </Typography>
                </Card>
              </Grid>

              {/* List */}
              <Grid item xs={12} md={5}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
                  Verified Banks in {city}
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {MOCK_BANKS.map((bank, i) => (
                    <motion.div key={bank.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>
                      <Card sx={{ borderRadius: 3, transition: 'all 0.2s', '&:hover': { transform: 'translateY(-4px)', boxShadow: 'var(--shadow-card-hover)' } }}>
                        <Box sx={{ p: 3 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <LocalHospitalRounded color="primary" />
                              <Typography variant="subtitle1" sx={{ fontWeight: 800, lineHeight: 1.2 }}>{bank.name}</Typography>
                            </Box>
                            <Chip label={bank.distance} size="small" color="primary" sx={{ fontWeight: 700 }} />
                          </Box>
                          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2, pl: 4 }}>
                            {bank.address}, {bank.city}
                          </Typography>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pl: 4 }}>
                            <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, fontWeight: 600 }}>
                              <PhoneRounded fontSize="small" /> {bank.contact}
                            </Typography>
                            <Chip label="Verified" size="small" color="success" sx={{ height: 20, fontSize: '0.65rem', fontWeight: 700 }} />
                          </Box>
                        </Box>
                      </Card>
                    </motion.div>
                  ))}
                </Box>
              </Grid>
            </Grid>
          </motion.div>
        </Box>
      </main>
      
      <Footer />
    </div>
  )
}

export default FindBloodBank
