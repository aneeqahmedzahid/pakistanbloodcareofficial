import React from 'react'
import { motion } from 'framer-motion'
import { Box, Typography, Card, CardContent } from '@mui/material'

const NationalAnalytics: React.FC = () => {
  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 800, fontFamily: 'heading', mb: 0.5 }}>
            National Analytics
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            Macro-level data for government reporting and platform optimization.
          </Typography>
        </Box>

        <Card sx={{ borderRadius: 4, height: 400, boxShadow: 'var(--shadow-card)' }}>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <Typography variant="h6" sx={{ color: 'text.secondary', mb: 2 }}>
              Data Visualization Module
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center', maxWidth: 500 }}>
              This module will integrate with robust charting libraries to display nationwide donation trends, city-by-city shortages, and predictive analytics for blood demand.
            </Typography>
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  )
}

export default NationalAnalytics
