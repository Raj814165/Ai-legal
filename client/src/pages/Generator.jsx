import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PreviewPanel from '../components/document/PreviewPanel'
import FormFields from '../components/forms/FormFields'
import api from '../services/api'
import { useLanguage } from '../contexts/LanguageContext'
import { useI18n } from '../i18n'
import { documentByType } from '../data/documentCatalog'

export default function Generator(){
  const { type } = useParams();
  const activeDocument = documentByType[type];
  const { language: siteLanguage } = useLanguage()
  const [language, setLanguage] = useState(siteLanguage || 'en');
  const { t } = useI18n()
  const [answers, setAnswers] = useState({});
  const [docContent, setDocContent] = useState('');

  useEffect(() => {
    setLanguage(siteLanguage || 'en');
    setAnswers({});
    setDocContent('');
  }, [type, siteLanguage]);

  async function handleGenerate() {
    try {
      const res = await api.post('/generate', { docType: type, language, answers });
      setDocContent(res.data.document);
    } catch (err) {
      console.error('Generate error', err);
      setDocContent('Failed to generate document.');
    }
  }

  if (!activeDocument) {
    return (
      <div className="glass p-6">
        <h2 className="font-semibold text-lg">Document type not found</h2>
        <p className="muted mt-2 text-sm">Choose one of the supported legal document templates from the dashboard.</p>
      </div>
    )
  }

  return (
    <div className="workspace-shell">
      <div className="workspace-pane workspace-pane--builder min-h-0">
        <div className="glass p-5 generator-sidebar generator-card">
          <div className="generator-sidebar__header">
            <div>
              <div className="generator-sidebar__eyebrow">{t('documentBuilder')}</div>
              <h2 className="font-semibold text-lg mt-1">{activeDocument.title}</h2>
              <p className="muted mt-2 text-sm">{activeDocument.desc}</p>
            </div>
          </div>
          <div className="mt-3">
            <label className="text-sm muted">{t('languageLabel')}</label>
            <select value={language} onChange={(e) => setLanguage(e.target.value)} className="form-select mt-1 w-full">
              <option value="en">English</option>
              <option value="hi">Hindi</option>
            </select>
          </div>
          <div className="generator-form-area scrollbar-hidden">
            <FormFields questions={activeDocument.questions} answers={answers} onChange={setAnswers} />
          </div>
          <div className="generator-actions">
            <button onClick={handleGenerate} className="w-full btn-primary">{t('generateDocument')}</button>
          </div>
        </div>
      </div>
      <div className="workspace-pane workspace-pane--preview min-h-0">
        <PreviewPanel content={docContent} />
      </div>
    </div>
  )
}
