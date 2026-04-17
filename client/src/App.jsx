import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Landing from './pages/Home'
import Dashboard from './pages/Dashboard'
import Generator from './pages/Generator'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Navbar from './components/layout/Navbar'
import Sidebar from './components/layout/Sidebar'
import ProtectedRoute from './components/auth/ProtectedRoute'
import PublicOnlyRoute from './components/auth/PublicOnlyRoute'
import { useAuth } from './contexts/AuthContext'

export default function App(){
  const location = useLocation()
  const { isAuthenticated } = useAuth()
  const showSidebar = isAuthenticated && (
    location.pathname === '/dashboard' || location.pathname.startsWith('/workspace/')
  )

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-6 flex gap-6">
        {showSidebar ? <Sidebar /> : null}
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Landing/>} />
            <Route path="/login" element={<PublicOnlyRoute><Login/></PublicOnlyRoute>} />
            <Route path="/signup" element={<PublicOnlyRoute><Signup/></PublicOnlyRoute>} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
            <Route path="/workspace/:type" element={<ProtectedRoute><Generator/></ProtectedRoute>} />
          </Routes>
        </div>
      </div>
    </div>
  )
}
