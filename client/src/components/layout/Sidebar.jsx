import React from 'react'
import { NavLink } from 'react-router-dom'
import { documentCatalog } from '../../data/documentCatalog'

const items = [
  { to: '/dashboard', label: 'Dashboard' },
  ...documentCatalog.map((document) => ({
    to: `/workspace/${document.key}`,
    label: document.title
  }))
]

export default function Sidebar({ mobileOpen = false, onClose = () => {} }){
  const content = (
    <div className="glass p-4 space-y-4">
      <div className="text-xs muted uppercase">Workspace</div>
      <nav className="space-y-2 max-h-[75vh] overflow-y-auto pr-1 scrollbar-hidden">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({isActive}) => `flex items-center gap-3 p-3 rounded-md transition-colors nav-link ${isActive ? 'nav-active' : 'nav-inactive'}`}
          >
            <span className="text-sky-300 shrink-0 text-xs font-semibold">DOC</span>
            <span className="text-sm">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  )

  return (
    <>
      <aside className="w-64 hidden lg:block">{content}</aside>

      {mobileOpen ? (
        <div className="lg:hidden fixed inset-0 z-40">
          <div className="absolute inset-0 bg-black/40" onClick={onClose} />
          <div className="absolute left-0 top-0 bottom-0 w-64">{content}</div>
        </div>
      ) : null}
    </>
  )
}
