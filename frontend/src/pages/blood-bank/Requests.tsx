import React from 'react'
import { motion } from 'framer-motion'
import { Box, Typography, Card, CardContent, Grid, Button, Chip } from '@mui/material'
import { CheckCircleRounded, CancelRounded } from '@mui/icons-material'
import toast from 'react-hot-toast'

const MOCK_REQUESTS = [
  { id: '1', patient: 'Ahmad Ali', hospital: 'Aga Khan Hospital', group: 'O+', units: 3, urgency: 'critical', status: 'pending' },
  { id: '2', patient: 'Ayesha Khan', hospital: 'Indus Hospital', group: 'B-', units: 1, urgency: 'urgent', status: 'pending' },
]

const Requests: React.FC = () => {
  const handleAction = (action: string) => {
    if (action === 'approve') {
      toast.success('Request approved! Stock reserved for patient.')
    } else {
      toast.error('Request rejected.')
    }
  }

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto' }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 800, fontFamily: 'heading', mb: 0.5 }}>
            Incoming Blood Requests
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            Review and fulfill emergency requests from patients and other hospitals.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {MOCK_REQUESTS.map((req, i) => (
            <Grid item xs={12} key={req.id}>
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>
                <Card sx={{ borderRadius: 4, boxShadow: 'var(--shadow-card)', borderLeft: '6px solid', borderLeftColor: req.urgency === 'critical' ? 'error.main' : 'warning.main' }}>
                  <CardContent sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                    <Box>
                      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 1 }}>
                        <Chip label={req.urgency.toUpperCase()} size="small" color={req.urgency === 'critical' ? 'error' : 'warning'} sx={{ fontWeight: 800, fontSize: '0.7rem' }} />
                        <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>Just Now</Typography>
                      </Box>
                      <Typography variant="h6" sx={{ fontWeight: 800 }}>
                        {req.patient} needs <span className="text-blood-600">{req.units} Units of {req.group}</span>
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                        Location: {req.hospital}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <Button variant="outlined" color="error" onClick={() => handleAction('reject')} startIcon={<CancelRounded />} sx={{ borderRadius: '8px' }}>
                        Reject
                      </Button>
                      <Button variant="contained" color="success" onClick={() => handleAction('approve')} startIcon={<CheckCircleRounded />} sx={{ borderRadius: '8px', fontWeight: 700 }}>
                        Fulfill Request
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </motion.div>
    </Box>
  )
}

export default Requests
