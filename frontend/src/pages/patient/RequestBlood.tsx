import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Box, Typography, Card, CardContent, Grid, TextField, Button, MenuItem, InputAdornment } from '@mui/material'
import { SendRounded, PersonRounded, PhoneRounded, LocalHospitalRounded } from '@mui/icons-material'
import toast from 'react-hot-toast'
import { ROUTES } from '../../router/routes'
import { BLOOD_GROUPS, BLOOD_COMPONENTS, URGENCY_LEVELS, URGENCY_LABELS, PAKISTAN_CITIES } from '../../config/constants'

const schema = z.object({
  patient_name: z.string().min(3, 'Patient name is required'),
  contact_phone: z.string().min(10, 'Valid contact number is required'),
  blood_group: z.string().min(1, 'Blood group is required'),
  component: z.string().min(1, 'Component is required'),
  units_needed: z.coerce.number().min(1, 'At least 1 unit is required').max(10),
  urgency: z.enum([URGENCY_LEVELS.CRITICAL, URGENCY_LEVELS.URGENT, URGENCY_LEVELS.NORMAL]),
  hospital_name: z.string().min(3, 'Hospital name is required'),
  city: z.string().min(1, 'City is required'),
  notes: z.string().optional(),
})

type RequestFormInput = z.input<typeof schema>
type RequestForm = z.output<typeof schema>

const RequestBlood: React.FC = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<RequestFormInput, unknown, RequestForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      blood_group: 'O+',
      component: 'Whole Blood',
      units_needed: 1,
      urgency: 'urgent',
      city: 'Karachi',
    }
  })

  const onSubmit: SubmitHandler<RequestForm> = async (data) => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(res => setTimeout(res, 1200))
      console.log('Blood request created:', data)
      toast.success('Blood request submitted successfully! We are looking for donors.')
      navigate(ROUTES.PATIENT_DASHBOARD)
    } catch {
      toast.error('Failed to submit request. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto' }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 800, fontFamily: 'heading', mb: 0.5 }}>
            Request Blood
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            Submit an emergency blood request. Our smart matching system will alert eligible donors nearby.
          </Typography>
        </Box>

        <Card sx={{ borderRadius: 4, boxShadow: 'var(--shadow-card)' }}>
          {/* Emergency Banner */}
          <Box sx={{ bgcolor: 'error.main', color: 'white', p: 2, textAlign: 'center' }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
              🚨 For absolute critical emergencies, please submit this form and call our helpline immediately.
            </Typography>
          </Box>

          <CardContent sx={{ p: 4 }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 3, color: 'text.primary', borderBottom: '1px solid', borderColor: 'divider', pb: 1 }}>
                Patient Details
              </Typography>
              
              <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Patient Full Name" {...register('patient_name')} error={!!errors.patient_name} helperText={errors.patient_name?.message}
                    InputProps={{ startAdornment: <InputAdornment position="start"><PersonRounded fontSize="small" /></InputAdornment> }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Contact Phone Number" {...register('contact_phone')} error={!!errors.contact_phone} helperText={errors.contact_phone?.message}
                    InputProps={{ startAdornment: <InputAdornment position="start"><PhoneRounded fontSize="small" /></InputAdornment> }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Hospital Name" {...register('hospital_name')} error={!!errors.hospital_name} helperText={errors.hospital_name?.message}
                    InputProps={{ startAdornment: <InputAdornment position="start"><LocalHospitalRounded fontSize="small" /></InputAdornment> }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField select fullWidth label="City" {...register('city')} error={!!errors.city} helperText={errors.city?.message} defaultValue="Karachi">
                    {PAKISTAN_CITIES.map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
                  </TextField>
                </Grid>
              </Grid>

              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 3, color: 'text.primary', borderBottom: '1px solid', borderColor: 'divider', pb: 1 }}>
                Blood Requirements
              </Typography>

              <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6}>
                  <TextField select fullWidth label="Blood Group Required" {...register('blood_group')} defaultValue="O+">
                    {BLOOD_GROUPS.map(g => <MenuItem key={g} value={g}>{g}</MenuItem>)}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField select fullWidth label="Component" {...register('component')} defaultValue="Whole Blood">
                    {BLOOD_COMPONENTS.map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Units Needed" type="number" {...register('units_needed')} error={!!errors.units_needed} helperText={errors.units_needed?.message} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField select fullWidth label="Urgency Level" {...register('urgency')} defaultValue="urgent">
                    {Object.entries(URGENCY_LABELS).map(([val, label]) => (
                      <MenuItem key={val} value={val}>{label}</MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth multiline rows={3} label="Additional Notes / Medical Case Details" {...register('notes')} />
                </Grid>
              </Grid>

              <Box sx={{ display: 'flex', justifyContent: 'flex-end', pt: 2 }}>
                <Button 
                  variant="contained" 
                  type="submit" 
                  size="large"
                  disabled={loading}
                  endIcon={<SendRounded />}
                  sx={{ borderRadius: '10px', px: 6, py: 1.5, fontWeight: 700, background: 'linear-gradient(135deg, #C8102E, #9b0b22)' }}
                >
                  {loading ? 'Submitting...' : 'Submit Request'}
                </Button>
              </Box>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  )
}

export default RequestBlood
