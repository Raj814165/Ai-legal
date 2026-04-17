import React from 'react'
import { Link } from 'react-router-dom'

export default function DashboardCard({ title, desc, to }){
  return (
    <div className="glass p-6 rounded-lg">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-sm muted">Template</div>
          <div className="text-xl font-semibold card-title">{title}</div>
          <div className="text-sm muted mt-2">{desc}</div>
        </div>
        <div className="flex items-center gap-2">
          <Link to={to} className="btn-primary">Open</Link>
        </div>
      </div>
    </div>
  )
}
