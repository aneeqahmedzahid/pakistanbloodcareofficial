import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FavoriteRounded, PhoneRounded, EmailRounded, LocationOnRounded,
  FacebookRounded, Twitter, LinkedIn, YouTube,
} from '@mui/icons-material'
import { ROUTES } from '../../router/routes'
import { PLATFORM_MANAGER, BLOOD_GROUPS, APP_NAME } from '../../config/constants'

const FOOTER_LINKS = {
  Platform: [
    { label: 'Find a Donor',    href: ROUTES.FIND_DONOR },
    { label: 'Find Blood Bank', href: ROUTES.FIND_BANK },
    { label: 'Emergency Request',href: ROUTES.EMERGENCY },
    { label: 'Donor Leaderboard',href: ROUTES.LEADERBOARD },
  ],
  'Get Involved': [
    { label: 'Register as Donor',   href: ROUTES.REGISTER },
    { label: 'Register Blood Bank', href: ROUTES.REGISTER },
    { label: 'Request Blood',       href: ROUTES.REQUEST_BLOOD },
    { label: 'View Campaigns',      href: ROUTES.ADMIN_CAMPAIGNS },
  ],
  'Blood Info': BLOOD_GROUPS.map((g) => ({ label: `Blood Group ${g}`, href: ROUTES.FIND_DONOR })),
}

const SOCIAL_LINKS = [
  { icon: <FacebookRounded />, href: '#', label: 'Facebook' },
  { icon: <Twitter />,         href: '#', label: 'Twitter' },
  { icon: <LinkedIn />,        href: '#', label: 'LinkedIn' },
  { icon: <YouTube />,         href: '#', label: 'YouTube' },
]

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-surface-900 dark:bg-black text-surface-300">
      {/* Emergency CTA Banner */}
      <div className="bg-gradient-to-r from-blood-600 to-blood-700 py-4 px-4">
        <div className="container-xl flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center animate-pulse-slow">
              <FavoriteRounded sx={{ color: '#fff', fontSize: 18 }} />
            </div>
            <span className="text-white font-semibold text-sm sm:text-base">
              🚨 Need blood urgently? We're here 24/7 — Call{' '}
              <a href={`tel:${PLATFORM_MANAGER.phone}`} className="underline font-bold">
                {PLATFORM_MANAGER.phone}
              </a>
            </span>
          </div>
          <Link to={ROUTES.EMERGENCY} className="no-underline">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="bg-white text-blood-600 font-bold text-sm px-5 py-2 rounded-xl hover:shadow-lg transition-all"
            >
              Emergency Request →
            </motion.button>
          </Link>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-xl py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src="/logo.png" alt="Pakistan Bloodcare Official" className="w-12 h-12 rounded-full object-cover bg-white" />
              <div>
                <p className="font-heading font-bold text-white text-lg leading-tight">
                  Pakistan Bloodcare
                </p>
                <p className="text-blood-400 text-xs font-semibold">Official National Platform</p>
              </div>
            </div>

            <p className="text-surface-400 text-sm leading-relaxed mb-6 max-w-xs">
              Pakistan's trusted national blood donation management platform — connecting donors,
              blood banks, hospitals, and patients to save lives across Pakistan.
            </p>

            {/* Manager Contact */}
            <div className="bg-surface-800 rounded-2xl p-4 mb-6 border border-surface-700">
              <p className="text-white font-semibold text-sm mb-3">📞 Platform Manager</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-surface-300 text-sm">
                  <PhoneRounded sx={{ fontSize: 15, color: '#2da260' }} />
                  <a href={`tel:${PLATFORM_MANAGER.phone}`} className="hover:text-white transition-colors">
                    {PLATFORM_MANAGER.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-surface-300 text-sm">
                  <EmailRounded sx={{ fontSize: 15, color: '#2da260' }} />
                  <a href={`mailto:${PLATFORM_MANAGER.email}`} className="hover:text-white transition-colors">
                    {PLATFORM_MANAGER.email}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-surface-300 text-sm">
                  <LocationOnRounded sx={{ fontSize: 15, color: '#2da260' }} />
                  <span>{PLATFORM_MANAGER.name} — {PLATFORM_MANAGER.role}</span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  whileHover={{ y: -2, scale: 1.1 }}
                  className="w-9 h-9 rounded-xl bg-surface-800 border border-surface-700 flex items-center justify-center text-surface-400 hover:text-white hover:bg-primary-700 hover:border-primary-700 transition-all duration-200 no-underline"
                >
                  {React.cloneElement(s.icon, { sx: { fontSize: 17 } })}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(FOOTER_LINKS).slice(0, 2).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
                {title}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-surface-400 text-sm hover:text-primary-400 transition-colors no-underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Blood Groups Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
              Blood Groups
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {BLOOD_GROUPS.map((group) => (
                <Link
                  key={group}
                  to={`${ROUTES.FIND_DONOR}?group=${group}`}
                  className="no-underline"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center justify-center h-9 rounded-lg bg-surface-800 border border-surface-700 text-blood-400 text-sm font-bold hover:bg-blood-600 hover:text-white hover:border-blood-600 transition-all duration-200"
                  >
                    {group}
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-surface-800 py-5 px-4">
        <div className="container-xl flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-surface-500 text-sm text-center sm:text-left">
            © {currentYear} {APP_NAME}. All rights reserved. 🇵🇰
          </p>
          <div className="flex items-center gap-4">
            {['Privacy Policy', 'Terms of Service', 'Contact Us'].map((item) => (
              <Link key={item} to="#" className="text-surface-500 text-xs hover:text-surface-300 transition-colors no-underline">
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
