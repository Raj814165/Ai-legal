import React, { forwardRef } from 'react'
import { Download } from 'lucide-react'
import { exportElementAsPDF } from './Exporter'
import { useTranslation } from '../../i18n'

const PreviewPanel = forwardRef(({ content, answers = {}, language, title }, ref) => {
  async function downloadPDF(){
    const el = window.document.getElementById('doc-preview');
    await exportElementAsPDF(el, 'document.pdf');
  }

  function renderLivePreview(){
    const keys = Object.keys(answers || {})
    if(!keys.length) return null
    let s = `${title || 'Draft Document'}\n\nLanguage: ${language || 'en'}\n\n`
    keys.forEach((k) => {
      const v = answers[k]
      s += `${k}: ${v || '—'}\n\n`
    })
    return s
  }

  const live = renderLivePreview()
  const { t } = useTranslation()

  return (
    <div className="glass p-6 preview-panel" ref={ref}>
      <div className="flex justify-between items-center mb-4 preview-panel__header">
        <h3 className="font-semibold">{t('preview.live_preview')}</h3>
        <button onClick={downloadPDF} className="btn-primary inline-flex items-center gap-2 text-sm">
          <Download size={14} />
          <span>{t('preview.download_pdf')}</span>
        </button>
      </div>
      <div id="doc-preview" className="doc-preview preview-panel__content scrollbar-hidden">
        {content ? (
          <pre className="whitespace-pre-wrap text-sm">{content}</pre>
        ) : live ? (
          <pre className="whitespace-pre-wrap text-sm">{live}</pre>
        ) : (
          <div className="text-gray-500">{t('preview.no_document')}</div>
        )}
      </div>
    </div>
  )
})

export default PreviewPanel
