import React from 'react'
import { NavLink } from 'react-router-dom'
import { documentCatalog } from '../../data/documentCatalog'
import { useTranslation } from '../../i18n'

export default function Sidebar(){
  const { t } = useTranslation()
  const items = [
    { to: '/dashboard', label: t('nav.dashboard') },
    ...documentCatalog.map((document) => ({
      to: `/workspace/${document.key}`,
      label: document.title
    }))
  ]

  return (
    <aside className="w-64 hidden lg:block sidebar-shell">
      <div className="glass p-4 space-y-4 sidebar-card">
        <div className="sidebar-label">{t('sidebar.workspace')}</div>
        <nav className="space-y-2 max-h-[75vh] overflow-y-auto pr-1 scrollbar-hidden">
          {items.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({isActive}) => `sidebar-link ${isActive ? 'sidebar-link--active' : ''}`}
            >
              <span className="sidebar-link__badge">{t('sidebar.doc_badge')}</span>
              <span className="text-sm min-w-0">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  )
}
