import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Box, Typography, Card, CardContent, Button, Radio, RadioGroup, FormControlLabel, FormControl } from '@mui/material'
import { AssignmentTurnedInRounded, ArrowForwardRounded, FavoriteRounded } from '@mui/icons-material'
import { ROUTES } from '../../router/routes'

const QUESTIONS = [
  { id: 'q1', text: 'Are you between the ages of 18 and 65?' },
  { id: 'q2', text: 'Do you weigh at least 50 kg (110 lbs)?' },
  { id: 'q3', text: 'Have you donated whole blood in the last 90 days?' },
  { id: 'q4', text: 'Have you had a tattoo or piercing in the last 6 months?' },
  { id: 'q5', text: 'Are you currently taking antibiotics for an infection?' },
  { id: 'q6', text: 'Have you tested positive for HIV, Hepatitis B, or Hepatitis C?' },
]

const EligibilityTest: React.FC = () => {
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)

  const handleAnswer = (id: string, val: string) => {
    setAnswers(prev => ({ ...prev, [id]: val }))
  }

  const allAnswered = QUESTIONS.length === Object.keys(answers).length

  // Logic: Yes to Q1, Q2 and No to Q3-Q6 means eligible
  const isEligible = 
    answers.q1 === 'yes' && answers.q2 === 'yes' && 
    answers.q3 === 'no' && answers.q4 === 'no' && 
    answers.q5 === 'no' && answers.q6 === 'no'

  const handleSubmit = () => setSubmitted(true)

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto' }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <div className="w-16 h-16 rounded-full bg-primary-50 text-primary-700 flex items-center justify-center mx-auto mb-4 shadow-glow-green">
            <AssignmentTurnedInRounded sx={{ fontSize: 32 }} />
          </div>
          <Typography variant="h4" sx={{ fontWeight: 800, fontFamily: 'heading', mb: 1 }}>
            Eligibility Test
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 500, mx: 'auto' }}>
            Answer a few quick questions to determine if you are currently eligible to donate blood.
          </Typography>
        </Box>

        {!submitted ? (
          <Card sx={{ borderRadius: 4, boxShadow: 'var(--shadow-card)' }}>
            <CardContent sx={{ p: { xs: 3, md: 5 } }}>
              {QUESTIONS.map((q, i) => (
                <Box key={q.id} sx={{ mb: 4, pb: 4, borderBottom: i !== QUESTIONS.length - 1 ? '1px solid' : 'none', borderColor: 'divider' }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, display: 'flex', gap: 2 }}>
                    <span className="text-primary-600 font-black">{i + 1}.</span> {q.text}
                  </Typography>
                  <FormControl>
                    <RadioGroup row value={answers[q.id] || ''} onChange={(e) => handleAnswer(q.id, e.target.value)}>
                      <FormControlLabel value="yes" control={<Radio color="primary" />} label="Yes" sx={{ mr: 4 }} />
                      <FormControlLabel value="no" control={<Radio color="primary" />} label="No" />
                    </RadioGroup>
                  </FormControl>
                </Box>
              ))}

              <Box sx={{ display: 'flex', justifyContent: 'flex-end', pt: 2 }}>
                <Button 
                  variant="contained" 
                  size="large"
                  disabled={!allAnswered}
                  onClick={handleSubmit}
                  sx={{ borderRadius: '10px', px: 6, fontWeight: 700 }}
                >
                  Check Eligibility
                </Button>
              </Box>
            </CardContent>
          </Card>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
            <Card sx={{ borderRadius: 4, textAlign: 'center', p: 4 }}>
              <CardContent>
                {isEligible ? (
                  <>
                    <FavoriteRounded sx={{ fontSize: 64, color: '#C8102E', mb: 2 }} />
                    <Typography variant="h5" sx={{ fontWeight: 800, mb: 2, color: 'success.700' }}>
                      You are eligible to donate!
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4 }}>
                      Thank you for your willingness to help. You can now book an appointment at a nearby blood bank.
                    </Typography>
                    <Button variant="contained" component={Link} to={ROUTES.BOOK_APPOINTMENT} endIcon={<ArrowForwardRounded />} size="large" sx={{ borderRadius: '12px', fontWeight: 700, px: 4 }}>
                      Book Appointment Now
                    </Button>
                  </>
                ) : (
                  <>
                    <Typography sx={{ fontSize: '4rem', mb: 2 }}>⏳</Typography>
                    <Typography variant="h5" sx={{ fontWeight: 800, mb: 2, color: 'error.700' }}>
                      You are currently not eligible
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4 }}>
                      Based on your answers, you do not meet the criteria to donate blood at this time. Please try again later or consult a medical professional.
                    </Typography>
                    <Button variant="outlined" onClick={() => setSubmitted(false)} sx={{ borderRadius: '12px' }}>
                      Retake Test
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </motion.div>
    </Box>
  )
}

export default EligibilityTest
