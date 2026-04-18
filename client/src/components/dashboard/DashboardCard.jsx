import React from 'react'
import { Link } from 'react-router-dom'
import { useI18n } from '../../i18n'

export default function DashboardCard({ title, desc, to }){
  const { t } = useI18n()
  return (
    <div className="glass p-6 rounded-lg">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-sm muted">{t('template')}</div>
          <div className="text-xl font-semibold card-title">{title}</div>
          <div className="text-sm muted mt-2">{desc}</div>
        </div>
        <div className="flex items-center gap-2">
          <Link to={to} className="btn-primary">{t('open')}</Link>
        </div>
      </div>
    </div>
  )
}
