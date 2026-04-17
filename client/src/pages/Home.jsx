import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const features = [
  { badge: '01', title: '10 Legal Drafts', desc: 'RTI, FIR, affidavits, notices, complaints, and court applications.' },
  { badge: '02', title: 'Complaint-Ready Formats', desc: 'Consumer, cyber, accident, and tenant complaint formats in a formal tone.' },
  { badge: '03', title: 'Workplace Support', desc: 'Draft employment complaints for unpaid salary and workplace disputes.' },
  { badge: '04', title: 'Bilingual Output', desc: 'Generate English and Hindi drafts that are ready to preview and export.' }
]

export default function Home(){
  const { isAuthenticated } = useAuth()

  return (
    <div className="py-12">
      <div className="hero-grad glass p-12 rounded-2xl">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl font-extrabold mb-4">AI Legal Aid - Multi-Document Legal Drafting</h1>
            <p className="muted mb-6">Generate RTI applications, FIR drafts, legal notices, rental complaints, affidavits, employment complaints, cyber complaints, accident complaints, and basic court applications in English and Hindi.</p>
            <div className="flex gap-3">
              <Link to={isAuthenticated ? '/dashboard' : '/signup'} className="btn-primary">
                {isAuthenticated ? 'Start Legal Help' : 'Create Account'}
              </Link>
              <Link to={isAuthenticated ? '/dashboard' : '/login'} className="btn-ghost">
                {isAuthenticated ? 'Explore Templates' : 'Login'}
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
