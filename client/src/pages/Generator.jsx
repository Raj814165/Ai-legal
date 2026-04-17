import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PreviewPanel from '../components/document/PreviewPanel'
import FormFields from '../components/forms/FormFields'
import axios from 'axios'
import { documentByType } from '../data/documentCatalog'

export default function Generator(){
  const { type } = useParams();
  const activeDocument = documentByType[type];
  const [language, setLanguage] = useState('en');
  const [answers, setAnswers] = useState({});
  const [docContent, setDocContent] = useState('');

  useEffect(() => {
    setLanguage('en');
    setAnswers({});
    setDocContent('');
  }, [type]);

  async function handleGenerate() {
    const res = await axios.post('/api/generate', { docType: type, language, answers });
    setDocContent(res.data.document);
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
              <div className="generator-sidebar__eyebrow">Document Builder</div>
              <h2 className="font-semibold text-lg mt-1">{activeDocument.title}</h2>
              <p className="muted mt-2 text-sm">{activeDocument.desc}</p>
            </div>
          </div>
          <div className="mt-3">
            <label className="text-sm muted">Language</label>
            <select value={language} onChange={(e) => setLanguage(e.target.value)} className="form-select mt-1 w-full">
              <option value="en">English</option>
              <option value="hi">Hindi</option>
            </select>
          </div>
          <div className="generator-form-area scrollbar-hidden">
            <FormFields questions={activeDocument.questions} answers={answers} onChange={setAnswers} />
          </div>
          <div className="generator-actions">
            <button onClick={handleGenerate} className="w-full btn-primary">Generate Document</button>
          </div>
        </div>
      </div>
      <div className="workspace-pane workspace-pane--preview min-h-0">
        <PreviewPanel content={docContent} />
      </div>
    </div>
  )
}
