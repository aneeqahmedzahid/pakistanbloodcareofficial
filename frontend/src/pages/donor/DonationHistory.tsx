import React from 'react'
import { motion } from 'framer-motion'
import { Box, Typography, Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, IconButton } from '@mui/material'
import { DownloadRounded } from '@mui/icons-material'

const MOCK_HISTORY = [
  { id: '1', date: '2026-03-15', bank: 'Jinnah Hospital', component: 'Whole Blood', units: 1, status: 'completed' },
  { id: '2', date: '2025-12-02', bank: 'Indus Hospital', component: 'Whole Blood', units: 1, status: 'completed' },
  { id: '3', date: '2026-06-15', bank: 'Aga Khan Hospital', component: 'Platelets', units: 1, status: 'upcoming' },
]

const DonationHistory: React.FC = () => {
  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto' }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 800, fontFamily: 'heading', mb: 0.5 }}>
            Donation History
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            View your past donations, upcoming appointments, and download certificates.
          </Typography>
        </Box>

        <Card sx={{ borderRadius: 4, boxShadow: 'var(--shadow-card)', overflow: 'hidden' }}>
          <TableContainer>
            <Table>
              <TableHead sx={{ bgcolor: 'rgba(0,0,0,0.02)' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Blood Bank / Hospital</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Component</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>Certificate</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {MOCK_HISTORY.map((row) => (
                  <TableRow key={row.id} hover>
                    <TableCell sx={{ fontWeight: 500 }}>{row.date}</TableCell>
                    <TableCell>{row.bank}</TableCell>
                    <TableCell>{row.component}</TableCell>
                    <TableCell>
                      <Chip 
                        label={row.status} 
                        size="small"
                        color={row.status === 'completed' ? 'success' : 'primary'}
                        sx={{ textTransform: 'capitalize', fontWeight: 600 }}
                      />
                    </TableCell>
                    <TableCell align="right">
                      {row.status === 'completed' ? (
                        <IconButton color="primary" size="small" title="Download Certificate">
                          <DownloadRounded fontSize="small" />
                        </IconButton>
                      ) : (
                        <span className="text-surface-400 text-xs">N/A</span>
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

export default DonationHistory
