import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useI18n } from '../i18n'

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const { t } = useI18n()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSubmitting(true)

    try {
      await login(form)
      const nextPath = location.state?.from?.pathname || '/dashboard'
      navigate(nextPath, { replace: true })
    } catch (err) {
      setError(err.response?.data?.error || 'Unable to login')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="auth-shell">
      <div className="glass auth-card">
        <div>
          <div className="auth-kicker">{t('welcomeBack')}</div>
          <h1 className="text-2xl font-bold mt-2">{t('loginToContinue')}</h1>
          <p className="muted mt-2 text-sm">{t('signinText')}</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <label className="form-field">
            <span className="form-field__label">{t('emailLabel')}</span>
            <input
              type="email"
              className="form-input"
              value={form.email}
              onChange={(e) => setForm((current) => ({ ...current, email: e.target.value }))}
              placeholder={t('enterEmail')}
              required
            />
          </label>

          <label className="form-field">
            <span className="form-field__label">{t('passwordLabel')}</span>
            <input
              type="password"
              className="form-input"
              value={form.password}
              onChange={(e) => setForm((current) => ({ ...current, password: e.target.value }))}
              placeholder={t('passwordLabel')}
              required
            />
          </label>

          {error ? <div className="auth-error">{error}</div> : null}

          <button type="submit" className="btn-primary w-full" disabled={submitting}>
            {submitting ? t('login') + '...' : t('login')}
          </button>
        </form>

        <p className="text-sm muted">
          {t('needAccount')} <Link to="/signup" className="auth-link">{t('signup')}</Link>
        </p>
      </div>
    </div>
  )
}
