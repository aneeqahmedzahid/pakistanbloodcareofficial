import React from 'react'
import { motion } from 'framer-motion'
import { Box, Typography, Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'

const AuditLog: React.FC = () => {
  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 800, fontFamily: 'heading', mb: 0.5 }}>
            Security Audit Log
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            System-wide security logs and admin actions for accountability.
          </Typography>
        </Box>

        <Card sx={{ borderRadius: 4, boxShadow: 'var(--shadow-card)', overflow: 'hidden' }}>
          <TableContainer>
            <Table>
              <TableHead sx={{ bgcolor: 'rgba(0,0,0,0.02)' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Timestamp</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Admin / User</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Action</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>IP Address</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow hover>
                  <TableCell>2026-05-01 10:45 AM</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Rukhsar Rajpoot</TableCell>
                  <TableCell>Verified blood bank: Indus Hospital</TableCell>
                  <TableCell>192.168.1.1</TableCell>
                </TableRow>
                <TableRow hover>
                  <TableCell>2026-05-01 09:12 AM</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>System</TableCell>
                  <TableCell>Automated backup successful</TableCell>
                  <TableCell>localhost</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </motion.div>
    </Box>
  )
}

export default AuditLog
