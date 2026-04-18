import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Sun, Moon, Scale, Sparkles } from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'
import { useAuth } from '../../contexts/AuthContext'
import { useLanguage } from '../../contexts/LanguageContext'
import { useTranslation } from '../../i18n'
import { motion } from 'framer-motion'

export default function Navbar(){
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const { user, isAuthenticated, logout } = useAuth()
  const { language, setLanguage } = useLanguage()
  const { t } = useTranslation()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <motion.header initial={{y:-12, opacity:0}} animate={{y:0, opacity:1}} transition={{duration:0.35}} className="w-full topbar-shell">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0">
          <Link to="/" className="flex items-center gap-3 min-w-0">
            <div className="brand-mark">
              <Scale size={18} />
            </div>
            <div className="min-w-0">
              <div className="text-sm font-semibold truncate">{t('brand.title')}</div>
              <div className="text-xs muted truncate">{t('brand.subtitle')}</div>
            </div>
          </Link>
          {!isAuthenticated ? (
            <nav className="topbar-links hidden md:flex">
                <a href="#features" className="topbar-link">{t('nav.features')}</a>
                <a href="#templates" className="topbar-link">{t('nav.templates')}</a>
                <a href="#process" className="topbar-link">{t('nav.process')}</a>
            </nav>
          ) : null}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1">
            <button onClick={() => setLanguage('en')} className={`text-sm px-2 py-1 rounded ${language === 'en' ? 'btn-primary' : 'btn-ghost'}`}>EN</button>
            <button onClick={() => setLanguage('hi')} className={`text-sm px-2 py-1 rounded ${language === 'hi' ? 'btn-primary' : 'btn-ghost'}`}>HI</button>
          </div>
          <button onClick={toggleTheme} className="btn-ghost" aria-label="Toggle theme">
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="btn-ghost">{t('nav.dashboard')}</Link>
              <div className="nav-user-chip">
                <div className="nav-user-avatar">
                  {(() => {
                    const name = user?.name || 'User'
                    const parts = name.split(' ').filter(Boolean)
                    const initials = parts.length ? (parts.length === 1 ? parts[0][0] : parts[0][0] + parts[parts.length-1][0]) : 'U'
                    return <span className="nav-user-avatar__initials">{initials.toUpperCase()}</span>
                  })()}
                </div>
                <div className="nav-user-info">
                  <span className="nav-user-chip__name">{user?.name || 'User'}</span>
                </div>
              </div>
              <button onClick={handleLogout} className="btn-primary">{t('nav.logout')}</button>
            </>
          ) : (
            <>
              <div className="hidden lg:flex topbar-status">
                <Sparkles size={14} />
                <span>{t('nav.assistant_status')}</span>
              </div>
              <Link to="/login" className="btn-ghost">{t('nav.login')}</Link>
              <Link to="/signup" className="btn-primary">{t('nav.signup')}</Link>
            </>
          )}
        </div>
      </div>
    </motion.header>
  )
}
