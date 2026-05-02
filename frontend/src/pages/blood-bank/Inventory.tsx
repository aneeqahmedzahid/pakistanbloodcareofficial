import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Box, Typography, Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, IconButton, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem } from '@mui/material'
import { AddRounded, EditRounded, DeleteRounded } from '@mui/icons-material'
import { BLOOD_GROUPS, BLOOD_COMPONENTS } from '../../config/constants'
import toast from 'react-hot-toast'

// Mock Data
const MOCK_INVENTORY = BLOOD_GROUPS.flatMap(group => 
  ['Whole Blood', 'Red Cells', 'Plasma'].map((comp, i) => ({
    id: `${group}-${i}`,
    group,
    component: comp,
    units: Math.floor(Math.random() * 30),
    expiry: '2026-06-15',
    status: Math.random() > 0.8 ? 'critical' : 'optimal'
  }))
)

const Inventory: React.FC = () => {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ group: 'O+', component: 'Whole Blood', units: 1 })

  const handleSave = () => {
    toast.success('Inventory updated successfully')
    setOpen(false)
  }

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 800, fontFamily: 'heading', mb: 0.5 }}>
              Blood Inventory
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              Manage available blood units and components.
            </Typography>
          </Box>
          <Button 
            variant="contained" 
            onClick={() => setOpen(true)}
            startIcon={<AddRounded />}
            sx={{ borderRadius: '10px', fontWeight: 600, background: 'linear-gradient(135deg, #01411C, #016b2e)' }}
          >
            Add Stock
          </Button>
        </Box>

        <Card sx={{ borderRadius: 4, boxShadow: 'var(--shadow-card)', overflow: 'hidden' }}>
          <TableContainer>
            <Table>
              <TableHead sx={{ bgcolor: 'rgba(0,0,0,0.02)' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Blood Group</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Component</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Units Available</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Nearest Expiry</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {MOCK_INVENTORY.slice(0, 10).map((row) => (
                  <TableRow key={row.id} hover>
                    <TableCell>
                      <Box sx={{ w: 32, h: 32, borderRadius: 1, bgcolor: 'blood.50', color: 'blood.700', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
                        {row.group}
                      </Box>
                    </TableCell>
                    <TableCell sx={{ fontWeight: 500 }}>{row.component}</TableCell>
                    <TableCell sx={{ fontWeight: 800, fontSize: '1.1rem' }}>{row.units}</TableCell>
                    <TableCell>{row.expiry}</TableCell>
                    <TableCell>
                      <Chip 
                        label={row.status === 'critical' ? 'Low Stock' : 'Optimal'} 
                        size="small"
                        color={row.status === 'critical' ? 'error' : 'success'}
                        sx={{ fontWeight: 600 }}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <IconButton color="primary" size="small"><EditRounded fontSize="small" /></IconButton>
                      <IconButton color="error" size="small"><DeleteRounded fontSize="small" /></IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </motion.div>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
        <DialogTitle sx={{ fontWeight: 800, fontFamily: 'heading' }}>Add Blood Stock</DialogTitle>
        <DialogContent dividers>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 1 }}>
            <TextField select label="Blood Group" value={form.group} onChange={e => setForm({...form, group: e.target.value})} fullWidth>
              {BLOOD_GROUPS.map(g => <MenuItem key={g} value={g}>{g}</MenuItem>)}
            </TextField>
            <TextField select label="Component" value={form.component} onChange={e => setForm({...form, component: e.target.value})} fullWidth>
              {BLOOD_COMPONENTS.map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
            </TextField>
            <TextField label="Units" type="number" value={form.units} onChange={e => setForm({...form, units: parseInt(e.target.value)})} fullWidth />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2, px: 3 }}>
          <Button onClick={() => setOpen(false)} sx={{ fontWeight: 600 }}>Cancel</Button>
          <Button variant="contained" onClick={handleSave} sx={{ borderRadius: '8px', fontWeight: 600 }}>Save Stock</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default Inventory
