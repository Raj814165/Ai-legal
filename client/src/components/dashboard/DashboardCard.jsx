import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from '../../i18n'

export default function DashboardCard({ title, desc, to }){
  const { t } = useTranslation()
  return (
    <div className="glass dashboard-card">
      <div className="dashboard-card__body">
        <div className="min-w-0">
          <div className="text-sm muted">{t('dashboard.card.template')}</div>
          <div className="text-xl font-semibold card-title">{title}</div>
          <div className="text-sm muted mt-2">{desc}</div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Link to={to} className="btn-primary">{t('dashboard.card.open')}</Link>
        </div>
      </div>
    </div>
  )
}
