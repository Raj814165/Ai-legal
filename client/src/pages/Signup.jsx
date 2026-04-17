import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Signup() {
  const navigate = useNavigate()
  const { signup } = useAuth()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSubmitting(true)

    try {
      await signup(form)
      navigate('/dashboard', { replace: true })
    } catch (err) {
      setError(err.response?.data?.error || 'Unable to sign up')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="auth-shell">
      <div className="glass auth-card">
        <div>
          <div className="auth-kicker">Create Account</div>
          <h1 className="text-2xl font-bold mt-2">Register to start</h1>
          <p className="muted mt-2 text-sm">Create your account to access document templates and the protected workspace.</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <label className="form-field">
            <span className="form-field__label">Full name</span>
            <input
              type="text"
              className="form-input"
              value={form.name}
              onChange={(e) => setForm((current) => ({ ...current, name: e.target.value }))}
              placeholder="Enter your full name"
              required
            />
          </label>

          <label className="form-field">
            <span className="form-field__label">Email</span>
            <input
              type="email"
              className="form-input"
              value={form.email}
              onChange={(e) => setForm((current) => ({ ...current, email: e.target.value }))}
              placeholder="Enter your email"
              required
            />
          </label>

          <label className="form-field">
            <span className="form-field__label">Password</span>
            <input
              type="password"
              className="form-input"
              value={form.password}
              onChange={(e) => setForm((current) => ({ ...current, password: e.target.value }))}
              placeholder="Create a password"
              minLength={6}
              required
            />
          </label>

          {error ? <div className="auth-error">{error}</div> : null}

          <button type="submit" className="btn-primary w-full" disabled={submitting}>
            {submitting ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

        <p className="text-sm muted">
          Already have an account? <Link to="/login" className="auth-link">Login</Link>
        </p>
      </div>
    </div>
  )
}
