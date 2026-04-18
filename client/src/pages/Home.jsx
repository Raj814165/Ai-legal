import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, BadgeCheck, FileText, Languages, ShieldCheck, Sparkles } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useTranslation } from '../i18n'

const metrics = [
  { value: '10+', label: 'legal templates' },
  { value: '2', label: 'languages supported' },
  { value: '1', label: 'guided workflow' }
]

const features = [
  { icon: ShieldCheck, title: 'Court-ready structure', desc: 'Every draft follows a formal layout so you start from a serious legal format instead of a blank page.' },
  { icon: Languages, title: 'English and Hindi', desc: 'Switch languages without losing the document structure, dates, or core facts you already entered.' },
  { icon: FileText, title: 'Templates that match real use', desc: 'RTI, FIR, legal notice, tenant complaint, affidavits, cyber complaint, employment complaint, and more.' }
]

const workflow = [
  { step: '01', title: 'Choose a template', desc: 'Pick the legal document you need from the dashboard and open the guided workspace.' },
  { step: '02', title: 'Answer simple prompts', desc: 'Fill names, dates, facts, and locations in a clear form instead of drafting from scratch.' },
  { step: '03', title: 'Generate and export', desc: 'Review the draft, refine the text, and download a polished PDF for the next step.' }
]

const templateGroups = [
  'RTI Application',
  'FIR Draft',
  'Legal Notice',
  'Tenant Complaint',
  'Affidavit',
  'Cyber Complaint'
]

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0 }
}

const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

const orbitCards = [
  { kicker: 'Fast intake', title: 'Facts become structure', body: 'Question-based input keeps the drafting flow simple even for first-time users.' },
  { kicker: 'Safer output', title: 'Formal tone by default', body: 'The system arranges your answers into a cleaner legal layout with fewer formatting mistakes.' },
  { kicker: 'Ready to share', title: 'Preview before export', body: 'Generate, review, and download from one workspace instead of moving between tools.' }
]

export default function Home(){
  const { isAuthenticated } = useAuth()
  const { t } = useTranslation()

  return (
    <div className="landing-shell py-8 md:py-12">
      <motion.section
        initial="hidden"
        animate="show"
        variants={stagger}
        className="landing-hero"
      >
        <div className="landing-grid">
          <motion.div variants={fadeUp} className="landing-copy">
            <div className="landing-kicker">
              <Sparkles size={14} />
              <span>{t('hero.kicker')}</span>
            </div>
            <h1 className="landing-title">
              {t('hero.title')}
            </h1>
            <p className="landing-subtitle">
              {t('hero.subtitle')}
            </p>
            <div className="landing-actions">
              <Link to={isAuthenticated ? '/dashboard' : '/signup'} className="btn-primary landing-cta">
                <span>{isAuthenticated ? t('hero.open_workspace') : t('hero.start_drafting')}</span>
                <ArrowRight size={16} />
              </Link>
              <Link to={isAuthenticated ? '/dashboard' : '/login'} className="btn-ghost">
                {isAuthenticated ? t('nav.templates') : t('hero.sign_in')}
              </Link>
            </div>
            <motion.div variants={stagger} className="landing-metrics">
              {metrics.map((metric) => (
                <motion.div key={metric.label} variants={fadeUp} className="landing-metric">
                  <div className="landing-metric__value">{metric.value}</div>
                  <div className="landing-metric__label">{metric.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div variants={fadeUp} className="landing-stage">
            <div className="landing-stage__halo landing-stage__halo--one" />
            <div className="landing-stage__halo landing-stage__halo--two" />
            <div className="landing-stage__panel glass">
              <div className="landing-stage__panel-top">
                <div>
                  <div className="landing-stage__eyebrow">Live drafting board</div>
                  <h2 className="landing-stage__title">One place for intake, drafting, preview, and export</h2>
                </div>
                <div className="landing-badge">
                  <BadgeCheck size={14} />
                  <span>Protected workspace</span>
                </div>
              </div>
              <div className="landing-template-cloud" id="templates">
                {templateGroups.map((group) => (
                  <span key={group} className="landing-template-pill">{group}</span>
                ))}
              </div>
              <div className="landing-orbit">
                {orbitCards.map((card) => (
                  <div key={card.title} className="landing-orbit__card">
                    <div className="landing-orbit__kicker">{card.kicker}</div>
                    <div className="landing-orbit__title">{card.title}</div>
                    <p className="landing-orbit__body">{card.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        id="features"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        variants={stagger}
        className="landing-section"
      >
        <div className="landing-section__intro">
          <div className="landing-kicker">Why it feels better</div>
          <h2 className="landing-section__title">A cleaner legal drafting experience with more confidence built in</h2>
        </div>
        <div className="landing-card-grid">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <motion.article key={feature.title} variants={fadeUp} className="landing-feature glass">
                <div className="landing-feature__icon">
                  <Icon size={18} />
                </div>
                <h3 className="landing-feature__title">{feature.title}</h3>
                <p className="landing-feature__desc">{feature.desc}</p>
              </motion.article>
            )
          })}
        </div>
      </motion.section>

      <motion.section
        id="process"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={stagger}
        className="landing-section"
      >
        <div className="landing-process glass">
          <div className="landing-section__intro">
            <div className="landing-kicker">How it works</div>
            <h2 className="landing-section__title">From facts to formatted draft in three steps</h2>
          </div>
          <div className="landing-process__grid">
            {workflow.map((item) => (
              <motion.div key={item.step} variants={fadeUp} className="landing-process__item">
                <div className="landing-process__step">{item.step}</div>
                <h3 className="landing-process__title">{item.title}</h3>
                <p className="landing-process__desc">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
        className="landing-section"
      >
      <div className="landing-cta-band glass">
          <div>
            <div className="landing-kicker">{t('landing.ready')}</div>
            <h2 className="landing-section__title">{t('landing.cta')}</h2>
          </div>
          <div className="landing-actions">
            <Link to={isAuthenticated ? '/dashboard' : '/signup'} className="btn-primary landing-cta">
              <span>{isAuthenticated ? t('landing.cta') : t('landing.create_account')}</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </motion.section>
    </div>
  )
}
