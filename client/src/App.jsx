import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Landing from './pages/Home'
import Dashboard from './pages/Dashboard'
import Chat from './pages/Chat'
import Generator from './pages/Generator'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Navbar from './components/layout/Navbar'
import Sidebar from './components/layout/Sidebar'
import ProtectedRoute from './components/auth/ProtectedRoute'
import PublicOnlyRoute from './components/auth/PublicOnlyRoute'
import { useAuth } from './contexts/AuthContext'
import { LanguageProvider } from './contexts/LanguageContext'

export default function App(){
  const location = useLocation()
  const { isAuthenticated } = useAuth()
  const showSidebar = isAuthenticated && (
    location.pathname === '/dashboard' || location.pathname.startsWith('/workspace/')
  )

  return (
    <LanguageProvider>
      <div className="min-h-screen app-shell">
        <Navbar />
        <div className={`max-w-7xl mx-auto px-4 py-6 app-frame ${showSidebar ? 'app-frame--with-sidebar' : ''}`}>
          {showSidebar ? <Sidebar /> : null}
          <div className="flex-1 min-w-0 app-page">
            <Routes>
              <Route path="/" element={<Landing/>} />
              <Route path="/login" element={<PublicOnlyRoute><Login/></PublicOnlyRoute>} />
              <Route path="/signup" element={<PublicOnlyRoute><Signup/></PublicOnlyRoute>} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
              <Route path="/chat" element={<ProtectedRoute><Chat/></ProtectedRoute>} />
              <Route path="/workspace/:type" element={<ProtectedRoute><Generator/></ProtectedRoute>} />
            </Routes>
          </div>
        </div>
      </div>
    </LanguageProvider>
  )
}
