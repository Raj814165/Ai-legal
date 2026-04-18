import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import PreviewPanel from '../components/document/PreviewPanel'
import FormFields from '../components/forms/FormFields'
import api from '../services/api'
import { documentByType } from '../data/documentCatalog'
import { useLanguage } from '../contexts/LanguageContext'
import { useTranslation } from '../i18n'

export default function Generator(){
  const { type } = useParams();
  const activeDocument = documentByType[type];
  const { language, setLanguage } = useLanguage();
  const { t } = useTranslation()
  const [answers, setAnswers] = useState({});
  const [docContent, setDocContent] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setAnswers({});
    setDocContent('');
    setError('');
  }, [type]);

  async function handleGenerate() {
    setError('');
    setLoading(true);
    try {
      const res = await api.post('/generate', { docType: type, language, answers });
      setDocContent(res.data.document);
    } catch (err) {
      setError(err.response?.data?.error || 'Unable to generate document');
    } finally {
      setLoading(false);
    }
  }

  if (!activeDocument) {
    return (
      <div className="glass p-6">
        <h2 className="font-semibold text-lg">{t('generator.not_found_title')}</h2>
        <p className="muted mt-2 text-sm">{t('generator.not_found_desc')}</p>
      </div>
    )
  }

  return (
    <div className="workspace-shell">
      <div className="workspace-pane workspace-pane--builder min-h-0">
        <div className="glass p-5 generator-sidebar generator-card">
          <div className="generator-sidebar__header">
            <div>
              <div className="generator-sidebar__eyebrow">{t('generator.document_builder')}</div>
              <h2 className="font-semibold text-lg mt-1">{activeDocument.title}</h2>
              <p className="muted mt-2 text-sm">{activeDocument.desc}</p>
            </div>
          </div>
          <div className="mt-3">
            <label className="text-sm muted">{t('generator.language_label')}</label>
            <select value={language} onChange={(e) => setLanguage(e.target.value)} className="form-select mt-1 w-full">
              <option value="en">{t('generator.english')}</option>
              <option value="hi">{t('generator.hindi')}</option>
            </select>
          </div>
          <div className="generator-form-area scrollbar-hidden">
            <FormFields questions={activeDocument.questions} answers={answers} onChange={setAnswers} />
          </div>
          <div className="generator-actions">
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleGenerate} className="w-full btn-primary" disabled={loading}>
              {loading ? t('generator.generating') : t('generator.generate_document')}
            </motion.button>
            {error ? <p className="mt-3 text-sm text-red-500">{error}</p> : null}
          </div>
        </div>
      </div>
      <div className="workspace-pane workspace-pane--preview min-h-0">
        <PreviewPanel content={docContent} answers={answers} language={language} title={activeDocument.title} />
      </div>
    </div>
  )
}
