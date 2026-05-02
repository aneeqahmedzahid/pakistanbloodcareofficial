import React from 'react'
import { motion } from 'framer-motion'
import { Box, Typography, Grid, Card, CardContent, LinearProgress, Chip } from '@mui/material'
import { DONOR_BADGES } from '../../config/constants'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.4 } })
}

const MyBadges: React.FC = () => {
  const userDonations = 4

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto' }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 800, fontFamily: 'heading', mb: 0.5 }}>
            My Badges
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            Earn badges and achievements by saving lives. Your total donations: <strong className="text-primary-700">{userDonations}</strong>
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {DONOR_BADGES.map((badge, i) => {
            const isEarned = userDonations >= badge.threshold
            const progress = Math.min(100, (userDonations / badge.threshold) * 100)

            return (
              <Grid item xs={12} sm={6} md={4} key={badge.id}>
                <motion.div custom={i} initial="hidden" animate="visible" variants={fadeUp}>
                  <Card sx={{ 
                    borderRadius: 4, height: '100%',
                    bgcolor: isEarned ? 'background.paper' : 'surface.50',
                    border: '1px solid',
                    borderColor: isEarned ? 'primary.200' : 'divider',
                    boxShadow: isEarned ? '0 8px 24px rgba(1, 65, 28, 0.1)' : 'none',
                    opacity: isEarned ? 1 : 0.8
                  }}>
                    <CardContent sx={{ p: 4, textAlign: 'center' }}>
                      <Box sx={{ 
                        fontSize: '3.5rem', mb: 2, 
                        filter: isEarned ? 'none' : 'grayscale(100%) opacity(50%)'
                      }}>
                        {badge.icon}
                      </Box>
                      <Typography variant="h6" sx={{ fontWeight: 700, fontFamily: 'heading', mb: 1, color: isEarned ? 'text.primary' : 'text.secondary' }}>
                        {badge.label}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
                        Requires {badge.threshold} donation{badge.threshold > 1 ? 's' : ''}
                      </Typography>
                      
                      {!isEarned && (
                        <Box sx={{ width: '100%' }}>
                          <LinearProgress variant="determinate" value={progress} sx={{ height: 6, borderRadius: 3, mb: 1, bgcolor: 'surface.200' }} />
                          <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                            {userDonations} / {badge.threshold} completed
                          </Typography>
                        </Box>
                      )}
                      
                      {isEarned && (
                        <Chip label="Earned" color="primary" size="small" sx={{ fontWeight: 600 }} />
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            )
          })}
        </Grid>
      </motion.div>
    </Box>
  )
}

export default MyBadges
