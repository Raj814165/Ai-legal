import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Sun, Moon, Menu } from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'
import { useAuth } from '../../contexts/AuthContext'
import { motion } from 'framer-motion'

export default function Navbar({ onMenuClick }){
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const { user, isAuthenticated, logout } = useAuth()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <motion.header initial={{y:-12, opacity:0}} animate={{y:0, opacity:1}} transition={{duration:0.35}} className="w-full">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={onMenuClick} className="p-2 rounded-md hover:bg-white/3 glass text-sm font-semibold" aria-label="Toggle menu" aria-expanded="false"><Menu size={16} /></button>
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-tr from-indigo-500 to-teal-400 rounded-full flex items-center justify-center shadow-lg">AI</div>
            <div className="hidden sm:block">
              <div className="text-sm font-semibold">AI Legal Aid</div>
              <div className="text-xs muted">Legal document generator</div>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={toggleTheme} className="btn-ghost" aria-label="Toggle theme">
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="btn-ghost">Dashboard</Link>
              <div className="nav-user-chip">
                <span className="nav-user-chip__name">{user?.name || 'User'}</span>
                <span className="nav-user-chip__email">{user?.email || ''}</span>
              </div>
              <button onClick={handleLogout} className="btn-primary">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-ghost">Login</Link>
              <Link to="/signup" className="btn-primary">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </motion.header>
  )
}
