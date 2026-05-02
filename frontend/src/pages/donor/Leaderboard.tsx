import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Box, Typography, Card, Tabs, Tab, Avatar, Chip } from '@mui/material'

const MOCK_LEADERS_NATIONAL = [
  { rank: 1, name: 'Ali Khan', city: 'Karachi', donations: 45, group: 'O+' },
  { rank: 2, name: 'Usman Tariq', city: 'Lahore', donations: 38, group: 'A-' },
  { rank: 3, name: 'Sara Ahmed', city: 'Islamabad', donations: 32, group: 'B+' },
  { rank: 4, name: 'Hassan Raza', city: 'Multan', donations: 29, group: 'O-' },
  { rank: 5, name: 'Fahad Mustafa', city: 'Peshawar', donations: 25, group: 'AB+' },
]

const MOCK_LEADERS_CITY = [
  { rank: 1, name: 'Ali Khan', city: 'Karachi', donations: 45, group: 'O+' },
  { rank: 2, name: 'Zainab Noor', city: 'Karachi', donations: 24, group: 'B-' },
  { rank: 3, name: 'Kamran Akmal', city: 'Karachi', donations: 21, group: 'O+' },
]

const Leaderboard: React.FC = () => {
  const [tab, setTab] = useState(0)
  const leaders = tab === 0 ? MOCK_LEADERS_NATIONAL : MOCK_LEADERS_CITY

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto' }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 800, fontFamily: 'heading', mb: 0.5 }}>
            Top Donors Leaderboard
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            Celebrating the heroes saving lives across Pakistan.
          </Typography>
        </Box>

        <Card sx={{ borderRadius: 4, boxShadow: 'var(--shadow-card)' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tab} onChange={(_, v) => setTab(v)} centered sx={{ pt: 1 }}>
              <Tab label="National Top 50" sx={{ fontWeight: 600 }} />
              <Tab label="My City (Karachi)" sx={{ fontWeight: 600 }} />
            </Tabs>
          </Box>

          <Box sx={{ p: { xs: 2, sm: 4 } }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {leaders.map((l, i) => (
                <motion.div 
                  key={l.rank}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center justify-between p-4 rounded-2xl bg-surface-50 dark:bg-surface-800 border border-surface-100 dark:border-surface-700"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-8 text-center font-heading font-black text-xl text-surface-400">
                      {l.rank === 1 ? '🥇' : l.rank === 2 ? '🥈' : l.rank === 3 ? '🥉' : `#${l.rank}`}
                    </div>
                    <Avatar sx={{ bgcolor: i < 3 ? 'primary.main' : 'surface.400' }}>{l.name[0]}</Avatar>
                    <div>
                      <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'text.primary', lineHeight: 1.2 }}>
                        {l.name}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        {l.city}
                      </Typography>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <Chip label={l.group} size="small" sx={{ bgcolor: 'blood.50', color: 'blood.700', fontWeight: 700 }} />
                    <div className="text-right">
                      <Typography variant="subtitle1" sx={{ fontWeight: 800, color: 'primary.main', lineHeight: 1.2 }}>
                        {l.donations}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        Donations
                      </Typography>
                    </div>
                  </div>
                </motion.div>
              ))}
            </Box>
          </Box>
        </Card>
      </motion.div>
    </Box>
  )
}

export default Leaderboard
