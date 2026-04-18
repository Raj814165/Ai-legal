import React from 'react'
import DashboardCard from '../components/dashboard/DashboardCard'
import { documentCatalog } from '../data/documentCatalog'
import { useI18n } from '../i18n'

export default function Dashboard(){
  const { t } = useI18n()
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">{t('dashboard')}</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {documentCatalog.map((document) => (
          <DashboardCard
            key={document.key}
            title={document.title}
            desc={document.desc}
            to={`/workspace/${document.key}`}
          />
        ))}
      </div>
    </div>
  )
}
