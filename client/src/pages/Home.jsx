import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useI18n } from '../i18n'

export default function Home(){
  const { isAuthenticated } = useAuth()
  const { t } = useI18n()

  const features = [
    { badge: '01', title: t('feature1Title'), desc: t('feature1Desc') },
    { badge: '02', title: t('feature2Title'), desc: t('feature2Desc') },
    { badge: '03', title: t('feature3Title'), desc: t('feature3Desc') },
    { badge: '04', title: t('feature4Title'), desc: t('feature4Desc') }
  ]

  return (
    <div className="py-12">
      <div className="hero-grad glass p-12 rounded-2xl">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl font-extrabold mb-4">{t('appName')} - {t('appTagline')}</h1>
            <p className="muted mb-6">{t('feature1Desc')}</p>
            <div className="flex gap-3">
              <Link to={isAuthenticated ? '/dashboard' : '/signup'} className="btn-primary">
                {isAuthenticated ? t('startLegalHelp') : t('createAccount')}
              </Link>
              <Link to={isAuthenticated ? '/dashboard' : '/login'} className="btn-ghost">
                {isAuthenticated ? t('exploreTemplates') : t('login')}
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {features.map((feature, idx) => {
              return (
                <div key={idx} className="glass p-4 flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-tr from-indigo-500 to-teal-400 rounded-lg flex items-center justify-center text-sm font-semibold">
                    {feature.badge}
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{feature.title}</div>
                    <div className="text-xs muted">{feature.desc}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
