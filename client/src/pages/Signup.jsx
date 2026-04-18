import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useI18n } from '../i18n'

export default function Signup() {
  const navigate = useNavigate()
  const { signup } = useAuth()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const { t } = useI18n()

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
          <div className="auth-kicker">{t('createAccountTitle')}</div>
          <h1 className="text-2xl font-bold mt-2">{t('registerToStart')}</h1>
          <p className="muted mt-2 text-sm">{t('createAccountSub')}</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <label className="form-field">
            <span className="form-field__label">{t('fullName')}</span>
            <input
              type="text"
              className="form-input"
              value={form.name}
              onChange={(e) => setForm((current) => ({ ...current, name: e.target.value }))}
              placeholder={t('enterFullName')}
              required
            />
          </label>

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
              placeholder={t('createPassword')}
              minLength={6}
              required
            />
          </label>

          {error ? <div className="auth-error">{error}</div> : null}

          <button type="submit" className="btn-primary w-full" disabled={submitting}>
            {submitting ? t('creatingAccount') : t('signup')}
          </button>
        </form>

        <p className="text-sm muted">
          {t('alreadyHaveAccount')} <Link to="/login" className="auth-link">{t('login')}</Link>
        </p>
      </div>
    </div>
  )
}
