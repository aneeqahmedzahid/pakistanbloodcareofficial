import React from 'react'
import { motion } from 'framer-motion'
import { Box, Typography, Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, Button } from '@mui/material'
import toast from 'react-hot-toast'

const MOCK_APPOINTMENTS = [
  { id: '1', name: 'Zaid Ali', group: 'O+', date: 'Today, 10:00 AM', status: 'pending' },
  { id: '2', name: 'Fatima Noor', group: 'B-', date: 'Today, 11:30 AM', status: 'pending' },
  { id: '3', name: 'Omar Farooq', group: 'A+', date: 'Yesterday', status: 'completed' },
]

const Appointments: React.FC = () => {
  const handleComplete = () => {
    toast.success('Donation marked as complete! Units added to inventory.')
  }

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto' }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 800, fontFamily: 'heading', mb: 0.5 }}>
            Donor Appointments
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            Manage scheduled donations and update statuses.
          </Typography>
        </Box>

        <Card sx={{ borderRadius: 4, boxShadow: 'var(--shadow-card)', overflow: 'hidden' }}>
          <TableContainer>
            <Table>
              <TableHead sx={{ bgcolor: 'rgba(0,0,0,0.02)' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Donor Name</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Blood Group</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Schedule</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {MOCK_APPOINTMENTS.map((row) => (
                  <TableRow key={row.id} hover>
                    <TableCell sx={{ fontWeight: 600 }}>{row.name}</TableCell>
                    <TableCell>
                      <Chip label={row.group} size="small" sx={{ fontWeight: 700, bgcolor: 'blood.50', color: 'blood.700' }} />
                    </TableCell>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>
                      <Chip 
                        label={row.status} 
                        size="small"
                        color={row.status === 'completed' ? 'success' : 'warning'}
                        sx={{ textTransform: 'capitalize', fontWeight: 600 }}
                      />
                    </TableCell>
                    <TableCell align="right">
                      {row.status === 'pending' && (
                        <Button variant="contained" size="small" color="success" onClick={handleComplete} sx={{ borderRadius: '6px' }}>
                          Mark Complete
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </motion.div>
    </Box>
  )
}

export default Appointments
