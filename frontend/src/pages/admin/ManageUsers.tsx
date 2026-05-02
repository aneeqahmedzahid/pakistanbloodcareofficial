import React from 'react'
import { motion } from 'framer-motion'
import { Box, Typography, Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, IconButton } from '@mui/material'
import { BlockRounded, EditRounded } from '@mui/icons-material'

const MOCK_USERS = [
  { id: '1', name: 'Ahmed Ali', email: 'ahmed@example.com', role: 'donor', city: 'Karachi', status: 'active' },
  { id: '2', name: 'Sara Khan', email: 'sara@example.com', role: 'patient', city: 'Lahore', status: 'active' },
  { id: '3', name: 'Usman Tariq', email: 'usman@example.com', role: 'donor', city: 'Islamabad', status: 'banned' },
]

const ManageUsers: React.FC = () => {
  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 800, fontFamily: 'heading', mb: 0.5 }}>
            User Management
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            Manage donors, patients, and platform staff.
          </Typography>
        </Box>

        <Card sx={{ borderRadius: 4, boxShadow: 'var(--shadow-card)', overflow: 'hidden' }}>
          <TableContainer>
            <Table>
              <TableHead sx={{ bgcolor: 'rgba(0,0,0,0.02)' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Role</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>City</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {MOCK_USERS.map((row) => (
                  <TableRow key={row.id} hover>
                    <TableCell sx={{ fontWeight: 600 }}>{row.name}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>
                      <Chip label={row.role} size="small" sx={{ textTransform: 'capitalize' }} />
                    </TableCell>
                    <TableCell>{row.city}</TableCell>
                    <TableCell>
                      <Chip 
                        label={row.status} 
                        size="small"
                        color={row.status === 'active' ? 'success' : 'error'}
                        sx={{ textTransform: 'capitalize', fontWeight: 600 }}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <IconButton color="primary" size="small"><EditRounded fontSize="small" /></IconButton>
                      {row.status === 'active' && (
                        <IconButton color="error" size="small" title="Ban User"><BlockRounded fontSize="small" /></IconButton>
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

export default ManageUsers
