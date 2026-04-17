import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import api from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('auth_token')
    if (!token) {
      setLoading(false)
      return
    }

    api.get('/auth/me')
      .then((response) => {
        setUser(response.data.user)
      })
      .catch(() => {
        localStorage.removeItem('auth_token')
        setUser(null)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  async function login(credentials) {
    const response = await api.post('/auth/login', credentials)
    localStorage.setItem('auth_token', response.data.token)
    setUser(response.data.user)
    return response.data.user
  }

  async function signup(payload) {
    const response = await api.post('/auth/signup', payload)
    localStorage.setItem('auth_token', response.data.token)
    setUser(response.data.user)
    return response.data.user
  }

  function logout() {
    localStorage.removeItem('auth_token')
    setUser(null)
  }

  const value = useMemo(() => ({
    user,
    loading,
    isAuthenticated: Boolean(user),
    login,
    signup,
    logout
  }), [user, loading])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
