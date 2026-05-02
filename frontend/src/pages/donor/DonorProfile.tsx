import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Box, Typography, Card, CardContent, Grid, TextField, Button, MenuItem, InputAdornment, Alert } from '@mui/material'
import { SaveRounded, PersonRounded, FavoriteRounded } from '@mui/icons-material'
import { useAuthStore } from '../../stores/authStore'
import { BLOOD_GROUPS, PAKISTAN_CITIES } from '../../config/constants'
import toast from 'react-hot-toast'

const schema = z.object({
  full_name: z.string().min(3, 'Name must be at least 3 characters'),
  phone: z.string().min(10, 'Enter a valid phone number'),
  city: z.string().min(1, 'Select a city'),
  blood_group: z.string().min(1, 'Select a blood group'),
  weight_kg: z.coerce.number().min(45, 'Weight must be at least 45kg to donate').max(200),
  date_of_birth: z.string().min(1, 'Date of birth is required'),
  gender: z.enum(['male', 'female', 'other']),
  address: z.string().optional(),
})

type ProfileFormInput = z.input<typeof schema>
type ProfileForm = z.output<typeof schema>

const DonorProfile: React.FC = () => {
  const { user } = useAuthStore()
  const [loading, setLoading] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')

  const { register, handleSubmit, formState: { errors, isDirty } } = useForm<ProfileFormInput, unknown, ProfileForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      full_name: user?.full_name || '',
      phone: user?.phone || '',
      city: user?.city || 'Karachi',
      blood_group: 'O+', // Would come from DB
      weight_kg: 70,
      date_of_birth: '1995-01-01',
      gender: 'male',
      address: '',
    }
  })

  const onSubmit: SubmitHandler<ProfileForm> = async (data) => {
    setLoading(true)
    setSuccessMsg('')
    try {
      // Simulate API call
      await new Promise(res => setTimeout(res, 1000))
      console.log('Profile update:', data)
      toast.success('Profile updated successfully!')
      setSuccessMsg('Your profile has been updated.')
    } catch {
      toast.error('Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto' }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 800, fontFamily: 'heading', mb: 0.5 }}>
            My Profile
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            Manage your personal and medical information.
          </Typography>
        </Box>

        <Card sx={{ mb: 4, borderRadius: 4, boxShadow: 'var(--shadow-card)' }}>
          <CardContent sx={{ p: 4 }}>
            {successMsg && <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }}>{successMsg}</Alert>}
            
            <form onSubmit={handleSubmit(onSubmit)}>
              <Typography variant="h6" sx={{ fontWeight: 700, fontFamily: 'heading', mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                <PersonRounded color="primary" /> Personal Information
              </Typography>
              
              <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Full Name" {...register('full_name')} error={!!errors.full_name} helperText={errors.full_name?.message} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Email Address" value={user?.email} disabled />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Phone Number" {...register('phone')} error={!!errors.phone} helperText={errors.phone?.message} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField select fullWidth label="City" {...register('city')} defaultValue={user?.city || 'Karachi'}>
                    {PAKISTAN_CITIES.map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label="Detailed Address" {...register('address')} error={!!errors.address} helperText={errors.address?.message} />
                </Grid>
              </Grid>

              <Typography variant="h6" sx={{ fontWeight: 700, fontFamily: 'heading', mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                <FavoriteRounded color="error" /> Medical Profile
              </Typography>

              <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6}>
                  <TextField select fullWidth label="Blood Group" {...register('blood_group')} defaultValue="O+">
                    {BLOOD_GROUPS.map(g => <MenuItem key={g} value={g}>{g}</MenuItem>)}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Weight (kg)" type="number" {...register('weight_kg')} error={!!errors.weight_kg} helperText={errors.weight_kg?.message} 
                    InputProps={{ endAdornment: <InputAdornment position="end">kg</InputAdornment> }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Date of Birth" type="date" InputLabelProps={{ shrink: true }} {...register('date_of_birth')} error={!!errors.date_of_birth} helperText={errors.date_of_birth?.message} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField select fullWidth label="Gender" {...register('gender')} defaultValue="male">
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </TextField>
                </Grid>
              </Grid>

              <Box sx={{ display: 'flex', justifyContent: 'flex-end', pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
                <Button 
                  variant="contained" 
                  type="submit" 
                  disabled={loading || !isDirty}
                  startIcon={<SaveRounded />}
                  sx={{ borderRadius: '10px', px: 4, py: 1.5, fontWeight: 700 }}
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </Button>
              </Box>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  )
}

export default DonorProfile
