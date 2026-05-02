import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Box, Typography, Card, CardContent, Grid, TextField, Button, MenuItem } from '@mui/material'
import { CalendarMonthRounded, LocalHospitalRounded, AccessTimeRounded } from '@mui/icons-material'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../router/routes'

const MOCK_BANKS = [
  { id: '1', name: 'Jinnah Post Graduate Medical Centre', city: 'Karachi' },
  { id: '2', name: 'Indus Hospital Blood Center', city: 'Karachi' },
  { id: '3', name: 'Aga Khan University Hospital', city: 'Karachi' },
]

const TIME_SLOTS = ['09:00 AM', '10:00 AM', '11:00 AM', '01:00 PM', '02:00 PM', '04:00 PM']

const BookAppointment: React.FC = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [bankId, setBankId] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')

  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!bankId || !date || !time) return toast.error('Please fill all fields')

    setLoading(true)
    try {
      // simulate API call
      await new Promise(res => setTimeout(res, 1000))
      toast.success('Appointment booked successfully!')
      navigate(ROUTES.DONATION_HISTORY)
    } catch {
      toast.error('Failed to book appointment')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto' }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 800, fontFamily: 'heading', mb: 0.5 }}>
            Book an Appointment
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            Schedule your next blood donation at a verified blood bank.
          </Typography>
        </Box>

        <Card sx={{ borderRadius: 4, boxShadow: 'var(--shadow-card)' }}>
          <CardContent sx={{ p: 4 }}>
            <form onSubmit={handleBook}>
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LocalHospitalRounded color="primary" fontSize="small" /> Select Blood Bank
                  </Typography>
                  <TextField select fullWidth required value={bankId} onChange={e => setBankId(e.target.value)} label="Choose Hospital/Bank">
                    {MOCK_BANKS.map(b => <MenuItem key={b.id} value={b.id}>{b.name} ({b.city})</MenuItem>)}
                  </TextField>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CalendarMonthRounded color="primary" fontSize="small" /> Select Date
                  </Typography>
                  <TextField type="date" fullWidth required value={date} onChange={e => setDate(e.target.value)} InputLabelProps={{ shrink: true }} />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <AccessTimeRounded color="primary" fontSize="small" /> Select Time
                  </Typography>
                  <TextField select fullWidth required value={time} onChange={e => setTime(e.target.value)} label="Choose Time Slot">
                    {TIME_SLOTS.map(t => <MenuItem key={t} value={t}>{t}</MenuItem>)}
                  </TextField>
                </Grid>

                <Grid item xs={12}>
                  <Button type="submit" variant="contained" size="large" fullWidth disabled={loading} sx={{ borderRadius: '12px', py: 1.5, fontWeight: 700 }}>
                    {loading ? 'Confirming...' : 'Confirm Appointment'}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  )
}

export default BookAppointment
