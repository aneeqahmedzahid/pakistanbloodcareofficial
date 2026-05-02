import React from 'react'
import { motion } from 'framer-motion'
import { Box, Typography, Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, IconButton, Button } from '@mui/material'
import { CheckCircleRounded, CancelRounded, AddRounded } from '@mui/icons-material'
import toast from 'react-hot-toast'

const MOCK_BANKS = [
  { id: '1', name: 'Jinnah Hospital', city: 'Karachi', status: 'verified', contact: '021-99201300' },
  { id: '2', name: 'Indus Hospital', city: 'Lahore', status: 'pending', contact: '042-111-111-880' },
  { id: '3', name: 'Aga Khan Hospital', city: 'Karachi', status: 'verified', contact: '021-111-911-911' },
]

const ManageBloodBanks: React.FC = () => {
  const handleVerify = () => toast.success('Blood Bank verified successfully!')

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 800, fontFamily: 'heading', mb: 0.5 }}>
              Manage Blood Banks
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              Verify and manage institutional accounts across Pakistan.
            </Typography>
          </Box>
          <Button variant="contained" startIcon={<AddRounded />} sx={{ borderRadius: '10px', fontWeight: 600 }}>
            Add Hospital
          </Button>
        </Box>

        <Card sx={{ borderRadius: 4, boxShadow: 'var(--shadow-card)', overflow: 'hidden' }}>
          <TableContainer>
            <Table>
              <TableHead sx={{ bgcolor: 'rgba(0,0,0,0.02)' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Hospital / Bank Name</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>City</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Contact</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>Verification</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {MOCK_BANKS.map((row) => (
                  <TableRow key={row.id} hover>
                    <TableCell sx={{ fontWeight: 600 }}>{row.name}</TableCell>
                    <TableCell>{row.city}</TableCell>
                    <TableCell>{row.contact}</TableCell>
                    <TableCell>
                      <Chip 
                        label={row.status} 
                        size="small"
                        color={row.status === 'verified' ? 'success' : 'warning'}
                        sx={{ textTransform: 'capitalize', fontWeight: 600 }}
                      />
                    </TableCell>
                    <TableCell align="right">
                      {row.status === 'pending' ? (
                        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                          <IconButton color="success" size="small" onClick={handleVerify} title="Verify">
                            <CheckCircleRounded fontSize="small" />
                          </IconButton>
                          <IconButton color="error" size="small" title="Reject">
                            <CancelRounded fontSize="small" />
                          </IconButton>
                        </Box>
                      ) : (
                        <span className="text-surface-400 text-xs">Verified</span>
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

export default ManageBloodBanks
