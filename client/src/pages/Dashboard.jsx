import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { documentCatalog } from '../data/documentCatalog'
import DashboardCard from '../components/dashboard/DashboardCard'
import { useTranslation } from '../i18n'

export default function Dashboard(){
  const { t } = useTranslation()
  return (
    <div className="landing-shell py-6 md:py-8">
      <motion.section className="landing-hero">
        <div className="landing-grid">
          <div className="landing-copy">
            <div className="landing-kicker">{t('dashboard.kicker')}</div>
            <h1 className="landing-title">{t('dashboard.title')}</h1>
            <p className="landing-subtitle">{t('dashboard.subtitle')}</p>
            <div className="landing-actions">
              <Link to="/workspace/rti" className="btn-primary landing-cta">{t('dashboard.start_rti')}</Link>
              <Link to="/chat" className="btn-ghost">{t('dashboard.open_chat')}</Link>
            </div>
          </div>

          <div className="landing-stage">
            <div className="landing-stage__panel glass p-5">
              <div className="landing-stage__panel-top">
                <div>
                  <div className="landing-stage__eyebrow">Quick access</div>
                  <h2 className="landing-stage__title">All templates & tools</h2>
                </div>
                <div className="landing-badge">{t('sidebar.workspace')}</div>
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {documentCatalog.map((doc) => (
                  <DashboardCard key={doc.key} title={doc.title} desc={doc.desc} to={`/workspace/${doc.key}`} />
                ))}

                <DashboardCard key="chat" title={t('chat.title')} desc={t('chat.subtitle')} to="/chat" />
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  )
}
