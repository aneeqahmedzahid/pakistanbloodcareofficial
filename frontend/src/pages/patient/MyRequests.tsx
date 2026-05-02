import React from 'react'
import { motion } from 'framer-motion'
import { Box, Typography, Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, IconButton } from '@mui/material'
import { VisibilityRounded } from '@mui/icons-material'

const MOCK_REQUESTS = [
  { id: '1', patient: 'Ahmad Ali', group: 'O+', units: 3, date: '2026-05-01', status: 'matched', urgency: 'critical' },
  { id: '2', patient: 'Ayesha Khan', group: 'B-', units: 1, date: '2026-03-12', status: 'fulfilled', urgency: 'urgent' },
  { id: '3', patient: 'Zainab Noor', group: 'A+', units: 2, date: '2025-11-05', status: 'fulfilled', urgency: 'normal' },
]

const MyRequests: React.FC = () => {
  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto' }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 800, fontFamily: 'heading', mb: 0.5 }}>
            My Requests
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            History of your submitted blood requests and their fulfillment status.
          </Typography>
        </Box>

        <Card sx={{ borderRadius: 4, boxShadow: 'var(--shadow-card)', overflow: 'hidden' }}>
          <TableContainer>
            <Table>
              <TableHead sx={{ bgcolor: 'rgba(0,0,0,0.02)' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Patient Name</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Blood</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Urgency</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {MOCK_REQUESTS.map((row) => (
                  <TableRow key={row.id} hover>
                    <TableCell sx={{ fontWeight: 500 }}>{row.date}</TableCell>
                    <TableCell>{row.patient}</TableCell>
                    <TableCell>
                      <span className="font-bold text-blood-600">{row.group}</span> ({row.units} Units)
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={row.urgency} 
                        size="small"
                        color={row.urgency === 'critical' ? 'error' : row.urgency === 'urgent' ? 'warning' : 'primary'}
                        sx={{ textTransform: 'capitalize', fontWeight: 600, fontSize: '0.75rem' }}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={row.status} 
                        size="small"
                        color={row.status === 'fulfilled' ? 'success' : row.status === 'matched' ? 'info' : 'default'}
                        sx={{ textTransform: 'capitalize', fontWeight: 600 }}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <IconButton color="primary" size="small" title="View Details">
                        <VisibilityRounded fontSize="small" />
                      </IconButton>
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

export default MyRequests
