import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, useAnimation, type Variants } from 'framer-motion'
import { Button, Chip } from '@mui/material'
import {
  FavoriteRounded, SearchRounded, LocalHospitalRounded,
  EmojiEventsRounded, SpeedRounded,
  NotificationsActiveRounded, SecurityRounded,
  ArrowForwardRounded, MapRounded, CheckCircleRounded,
  AppRegistrationRounded, VerifiedUserRounded, LinkRounded,
} from '@mui/icons-material'
import { Navbar }  from '../../components/layout/Navbar'
import { Footer }  from '../../components/layout/Footer'
import { ROUTES }  from '../../router/routes'
import { PLATFORM_MANAGER, BLOOD_GROUPS } from '../../config/constants'

// ─── Animation Variants ──────────────────────────────────────
const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}
const stagger: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.12 } },
}
const scaleIn: Variants = {
  hidden:  { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
}

// ─── Animated Section Wrapper ────────────────────────────────
const AnimSection: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  const ref      = useRef(null)
  const inView   = useInView(ref, { once: true, margin: '-80px' })
  const controls = useAnimation()

  useEffect(() => {
    if (inView) controls.start('visible')
  }, [inView, controls])

  return (
    <motion.div ref={ref} initial="hidden" animate={controls} variants={stagger} className={className}>
      {children}
    </motion.div>
  )
}

// ─── Stats Data ───────────────────────────────────────────────
const STATS = [
  { value: '50,000+', label: 'Registered Donors',   icon: <FavoriteRounded sx={{ fontSize: 40, color: '#C8102E' }} /> },
  { value: '1,200+',  label: 'Blood Banks & Hospitals', icon: <LocalHospitalRounded sx={{ fontSize: 40, color: '#4B5563' }} /> },
  { value: '120+',    label: 'Cities Covered',       icon: <MapRounded sx={{ fontSize: 40, color: '#C8102E' }} /> },
  { value: '98%',     label: 'Request Fulfillment',  icon: <CheckCircleRounded sx={{ fontSize: 40, color: '#4B5563' }} /> },
]

// ─── Features Data ────────────────────────────────────────────
const FEATURES = [
  {
    icon:  <SearchRounded sx={{ fontSize: 28 }} />,
    title: 'Smart Donor Matching',
    desc:  'AI-powered blood type compatibility matching connects patients with eligible donors nearby in seconds.',
    color: 'from-green-500 to-primary-700',
  },
  {
    icon:  <NotificationsActiveRounded sx={{ fontSize: 28 }} />,
    title: 'Real-Time Alerts',
    desc:  'Instant notifications for emergency requests, appointment reminders, and critical stock alerts.',
    color: 'from-blue-500 to-blue-700',
  },
  {
    icon:  <LocalHospitalRounded sx={{ fontSize: 28 }} />,
    title: 'Hospital Network',
    desc:  'Live blood inventory tracking across 1,200+ hospitals and blood banks nationwide.',
    color: 'from-blood-500 to-blood-700',
  },
  {
    icon:  <EmojiEventsRounded sx={{ fontSize: 28 }} />,
    title: 'Donor Gamification',
    desc:  'Earn badges, climb leaderboards, and celebrate your life-saving journey with our rewards system.',
    color: 'from-yellow-500 to-orange-600',
  },
  {
    icon:  <SpeedRounded sx={{ fontSize: 28 }} />,
    title: 'Emergency Response',
    desc:  'Critical blood requests are escalated automatically with priority matching within 6 hours.',
    color: 'from-red-500 to-blood-700',
  },
  {
    icon:  <SecurityRounded sx={{ fontSize: 28 }} />,
    title: 'Verified & Secure',
    desc:  'All donors and blood banks are verified. Your data is secured with enterprise-grade encryption.',
    color: 'from-purple-500 to-purple-700',
  },
]

// ─── How It Works Steps ──────────────────────────────────────
const HOW_IT_WORKS = [
  { step: '01', title: 'Register',     desc: 'Create your account as a donor, patient, or blood bank in under 2 minutes.', icon: <AppRegistrationRounded sx={{ fontSize: 32, color: '#C8102E' }} /> },
  { step: '02', title: 'Get Verified', desc: 'Complete your profile and eligibility check. Donors get verified instantly.', icon: <VerifiedUserRounded sx={{ fontSize: 32, color: '#4B5563' }} /> },
  { step: '03', title: 'Connect',      desc: 'Donors get matched with nearby requests. Blood banks manage inventory live.', icon: <LinkRounded sx={{ fontSize: 32, color: '#C8102E' }} /> },
  { step: '04', title: 'Save Lives',   desc: 'Donate blood, fulfill requests, and earn recognition for every contribution.', icon: <FavoriteRounded sx={{ fontSize: 32, color: '#4B5563' }} /> },
]

// ─── Testimonials ─────────────────────────────────────────────
const TESTIMONIALS = [
  {
    name:  'Dr. Ahmed Raza',
    role:  'Cardiologist, Lahore',
    text:  'Pakistan Bloodcare reduced our emergency procurement time from 6 hours to under 45 minutes. It\'s a genuine lifesaver.',
    avatar: 'A',
  },
  {
    name:  'Fatima Malik',
    role:  'Regular Donor, Karachi',
    text:  'I\'ve donated 12 times using this platform. The badges and leaderboard keep me motivated to donate more!',
    avatar: 'F',
  },
  {
    name:  'Ali Hassan',
    role:  'Blood Bank Director, Islamabad',
    text:  'Our inventory management has never been easier. Real-time tracking has eliminated stock shortages completely.',
    avatar: 'A',
  },
]

// ─── Blood Group Pill ─────────────────────────────────────────
const BloodGroupPill: React.FC<{ group: string; delay: number }> = ({ group, delay }) => (
  <motion.div
    variants={scaleIn}
    transition={{ delay }}
    whileHover={{ scale: 1.15, rotate: [-2, 2, 0] }}
    className="cursor-pointer"
  >
    <Link to={`${ROUTES.FIND_DONOR}?group=${group}`} className="no-underline">
      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white font-heading font-bold text-lg sm:text-xl shadow-lg hover:bg-blood-600 hover:border-blood-400 transition-all duration-300">
        {group}
      </div>
    </Link>
  </motion.div>
)

// ─── Landing Page ─────────────────────────────────────────────
const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-surface-900">
      <Navbar />

      {/* ══════ HERO SECTION ══════ */}
      <section className="hero-bg min-h-screen relative flex items-center overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-blood-600/20 blur-3xl" />
          {/* Floating blood drops */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-3xl sm:text-4xl opacity-10"
              style={{ left: `${15 + i * 15}%`, top: `${20 + (i % 3) * 20}%` }}
              animate={{ y: [-10, 10, -10], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
            >
              🩸
            </motion.div>
          ))}
        </div>

        <div className="container-xl relative z-10 pt-28 pb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left — Hero Text */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="text-white"
            >
              <motion.div variants={fadeUp} className="mb-4">
                <Chip
                  label="🇵🇰 Pakistan's Official National Platform"
                  sx={{
                    background: 'rgba(255,255,255,0.15)',
                    color: '#fff',
                    fontWeight: 600,
                    fontSize: '0.8rem',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255,255,255,0.25)',
                  }}
                />
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.1] mb-6"
              >
                Every Drop of Blood{' '}
                <span className="text-blood-300">Saves a Life.</span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="text-white/80 text-lg sm:text-xl leading-relaxed mb-8 max-w-lg"
              >
                Pakistan's most advanced blood donation platform — connecting
                50,000+ donors with patients, hospitals, and blood banks
                across every city in Pakistan.
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
                <Link to={ROUTES.REGISTER} className="no-underline">
                  <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                    <Button
                      variant="contained"
                      size="large"
                      startIcon={<FavoriteRounded />}
                      sx={{
                        background:   '#C8102E',
                        color:        '#fff',
                        borderRadius: '14px',
                        px: 4, py: 1.5,
                        fontSize:     '1rem',
                        fontWeight:   700,
                        boxShadow:    '0 8px 24px rgba(200,16,46,0.5)',
                        '&:hover':    { background: '#a00d25', boxShadow: '0 12px 32px rgba(200,16,46,0.6)' },
                      }}
                    >
                      Register as Donor
                    </Button>
                  </motion.div>
                </Link>
                <Link to={ROUTES.EMERGENCY} className="no-underline">
                  <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                    <Button
                      variant="outlined"
                      size="large"
                      startIcon={<LocalHospitalRounded />}
                      sx={{
                        color:        '#fff',
                        borderColor:  'rgba(255,255,255,0.5)',
                        borderRadius: '14px',
                        px: 4, py: 1.5,
                        fontSize:     '1rem',
                        fontWeight:   600,
                        backdropFilter: 'blur(8px)',
                        background:   'rgba(255,255,255,0.08)',
                        '&:hover': {
                          borderColor: '#fff',
                          background:  'rgba(255,255,255,0.15)',
                        },
                      }}
                    >
                      Request Blood Now
                    </Button>
                  </motion.div>
                </Link>
              </motion.div>

              {/* Trust badges */}
              <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mt-10">
                {[
                  '✅ Verified Donors',
                  '🔒 Secure Platform',
                  '📍 120+ Cities',
                  '⚡ 24/7 Support',
                ].map((badge) => (
                  <span key={badge} className="text-white/70 text-sm font-medium flex items-center gap-1">
                    {badge}
                  </span>
                ))}
              </motion.div>
            </motion.div>

            {/* Right — Blood Groups & Stats Card */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="hidden lg:block"
            >
              {/* Glass Stats Card */}
              <div className="glass-card p-8 mb-6">
                <p className="text-white/60 text-sm font-semibold mb-4 uppercase tracking-wider">
                  Find Donors By Blood Group
                </p>
                <div className="grid grid-cols-4 gap-3">
                  {BLOOD_GROUPS.map((group, i) => (
                    <BloodGroupPill key={group} group={group} delay={i * 0.05} />
                  ))}
                </div>
              </div>

              {/* Live Request Ticker */}
              <div className="glass-card p-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-blood-400 animate-pulse" />
                  <span className="text-white/60 text-xs font-semibold uppercase tracking-wider">
                    Live Emergency Requests
                  </span>
                </div>
                {[
                  { group: 'O+',  city: 'Lahore',     urgency: '🚨 Critical' },
                  { group: 'B-',  city: 'Karachi',    urgency: '⚠️ Urgent' },
                  { group: 'AB+', city: 'Islamabad',  urgency: '📋 Normal' },
                ].map((req, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + i * 0.2 }}
                    className="flex items-center justify-between py-2.5 border-b border-white/10 last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-blood-600/80 flex items-center justify-center text-white font-bold text-sm">
                        {req.group}
                      </div>
                      <div>
                        <p className="text-white text-sm font-medium">{req.city}</p>
                        <p className="text-white/50 text-xs">{req.urgency}</p>
                      </div>
                    </div>
                    <Link to={ROUTES.EMERGENCY} className="no-underline">
                      <span className="text-primary-300 text-xs font-semibold hover:text-white transition-colors">
                        Respond →
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-16"
          >
            {STATS.map((stat) => (
              <div key={stat.label} className="glass-card p-5 text-center">
                <div className="text-3xl mb-1">{stat.icon}</div>
                <div className="text-white font-heading font-black text-2xl sm:text-3xl">{stat.value}</div>
                <div className="text-white/60 text-xs sm:text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 80L60 69C120 58 240 36 360 30C480 24 600 36 720 47C840 58 960 69 1080 69C1200 69 1320 58 1380 53L1440 47V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0Z" fill="white" className="dark:fill-surface-900" />
          </svg>
        </div>
      </section>

      {/* ══════ FEATURES SECTION ══════ */}
      <section className="section-padding bg-white dark:bg-surface-900">
        <AnimSection className="container-xl">
          <motion.div variants={fadeUp} className="text-center mb-14">
            <Chip label="Why Choose Us" sx={{ background: '#e6f4ec', color: '#01411C', fontWeight: 700, mb: 2 }} />
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-surface-900 dark:text-white mb-4">
              Everything You Need to{' '}
              <span className="gradient-text">Save Lives</span>
            </h2>
            <p className="text-surface-500 text-lg max-w-2xl mx-auto">
              A complete ecosystem for blood donation management — from finding donors to managing hospital inventories.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feature, i) => (
              <motion.div
                key={feature.title}
                variants={fadeUp}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className="bg-white dark:bg-surface-800 rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 border border-surface-100 dark:border-surface-700 group"
              >
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="font-heading font-bold text-lg text-surface-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-surface-500 dark:text-surface-400 text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </AnimSection>
      </section>

      {/* ══════ HOW IT WORKS ══════ */}
      <section className="section-padding bg-surface-50 dark:bg-surface-800/50">
        <AnimSection className="container-xl">
          <motion.div variants={fadeUp} className="text-center mb-14">
            <Chip label="Simple Process" sx={{ background: '#fce8eb', color: '#C8102E', fontWeight: 700, mb: 2 }} />
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-surface-900 dark:text-white mb-4">
              How It Works
            </h2>
            <p className="text-surface-500 text-lg max-w-xl mx-auto">
              From registration to donation — it's simple, fast, and rewarding.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* Connector line */}
            <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-primary-200 via-blood-300 to-primary-200 z-0" />

            {HOW_IT_WORKS.map((step, i) => (
              <motion.div
                key={step.step}
                variants={scaleIn}
                transition={{ delay: i * 0.15 }}
                className="relative z-10 text-center"
              >
                <div className="w-24 h-24 rounded-full bg-white dark:bg-surface-800 border-4 border-primary-100 dark:border-primary-900 shadow-card mx-auto mb-4 flex flex-col items-center justify-center">
                  <span className="text-3xl">{step.icon}</span>
                  <span className="text-primary-700 font-heading font-black text-xs mt-0.5">{step.step}</span>
                </div>
                <h3 className="font-heading font-bold text-lg text-surface-900 dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-surface-500 text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </AnimSection>
      </section>

      {/* ══════ TESTIMONIALS ══════ */}
      <section className="section-padding bg-white dark:bg-surface-900">
        <AnimSection className="container-xl">
          <motion.div variants={fadeUp} className="text-center mb-14">
            <Chip label="Real Stories" sx={{ background: '#e6f4ec', color: '#01411C', fontWeight: 700, mb: 2 }} />
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-surface-900 dark:text-white">
              Trusted by Donors, Doctors & Hospitals
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                variants={fadeUp}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-white dark:bg-surface-800 rounded-2xl p-6 shadow-card border border-surface-100 dark:border-surface-700"
              >
                <div className="text-blood-500 text-2xl mb-3">"</div>
                <p className="text-surface-600 dark:text-surface-300 text-sm leading-relaxed mb-5">
                  {t.text}
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-600 to-blood-600 flex items-center justify-center text-white font-bold text-sm">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-surface-900 dark:text-white text-sm">{t.name}</p>
                    <p className="text-surface-400 text-xs">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimSection>
      </section>

      {/* ══════ FINAL CTA ══════ */}
      <section className="hero-bg section-padding">
        <AnimSection className="container-xl text-center">
          <motion.div variants={fadeUp}>
            <div className="text-5xl mb-6 animate-float">🩸</div>
            <h2 className="font-heading font-black text-4xl sm:text-5xl text-white mb-4">
              Be the Reason Someone Lives
            </h2>
            <p className="text-white/75 text-lg mb-8 max-w-xl mx-auto">
              Join 50,000+ Pakistani heroes who have already saved lives.
              One donation can save up to 3 lives.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={ROUTES.REGISTER} className="no-underline">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                  <Button
                    variant="contained"
                    size="large"
                    endIcon={<ArrowForwardRounded />}
                    sx={{
                      background: '#C8102E', color: '#fff', borderRadius: '14px',
                      px: 5, py: 1.8, fontSize: '1.05rem', fontWeight: 700,
                      boxShadow: '0 8px 24px rgba(200,16,46,0.5)',
                      '&:hover': { background: '#a00d25' },
                    }}
                  >
                    Start Donating Today
                  </Button>
                </motion.div>
              </Link>
              <Link to={ROUTES.FIND_DONOR} className="no-underline">
                <Button
                  variant="outlined"
                  size="large"
                  sx={{
                    color: '#fff', borderColor: 'rgba(255,255,255,0.5)', borderRadius: '14px',
                    px: 5, py: 1.8, fontSize: '1.05rem', fontWeight: 600,
                    '&:hover': { borderColor: '#fff', background: 'rgba(255,255,255,0.1)' },
                  }}
                >
                  Find a Donor
                </Button>
              </Link>
            </div>
            <p className="text-white/50 text-sm mt-6">
              📞 Contact Manager: {PLATFORM_MANAGER.name} — {PLATFORM_MANAGER.phone} — {PLATFORM_MANAGER.email}
            </p>
          </motion.div>
        </AnimSection>
      </section>

      <Footer />
    </div>
  )
}

export default Landing
