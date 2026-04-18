import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Sun, Moon, Menu } from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'
import { useAuth } from '../../contexts/AuthContext'
import { useLanguage } from '../../contexts/LanguageContext'
  import { useI18n } from '../../i18n'
  import { motion } from 'framer-motion'

export default function Navbar({ onMenuClick, mobileOpen = false }){
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const { user, isAuthenticated, logout } = useAuth()
  const { language, setLanguage } = useLanguage()
  const { t } = useI18n()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <motion.header initial={{y:-12, opacity:0}} animate={{y:0, opacity:1}} transition={{duration:0.35}} className="w-full">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={onMenuClick} className="p-2 rounded-md hover-theme glass text-sm font-semibold" aria-label={t('menuToggle')} aria-expanded={mobileOpen}><Menu size={16} /></button>
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-tr from-indigo-500 to-teal-400 rounded-full flex items-center justify-center shadow-lg">AI</div>
            <div className="hidden sm:block">
                <div className="text-sm font-semibold">{t('appName')}</div>
                <div className="text-xs muted">{t('appTagline')}</div>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <select className="form-select navbar-language" value={language} onChange={(e) => setLanguage(e.target.value)} aria-label="Select language">
              <option value="en">English</option>
              <option value="hi">हिन्दी</option>
            </select>
          </div>

          <button onClick={toggleTheme} className="btn-ghost" aria-label={t('toggleTheme')}>
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="btn-ghost">{t('dashboard')}</Link>
              <div className="nav-user-chip">
                <span className="nav-user-chip__name">{user?.name || 'User'}</span>
                <span className="nav-user-chip__email">{user?.email || ''}</span>
              </div>
              <button onClick={handleLogout} className="btn-primary">{t('logout')}</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-ghost">{t('login')}</Link>
              <Link to="/signup" className="btn-primary">{t('signup')}</Link>
            </>
          )}
        </div>
      </div>
    </motion.header>
  )
}
