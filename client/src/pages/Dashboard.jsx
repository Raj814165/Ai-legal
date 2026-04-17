import React from 'react'
import DashboardCard from '../components/dashboard/DashboardCard'
import { documentCatalog } from '../data/documentCatalog'

export default function Dashboard(){
  return (
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
  )
}
