import React, { forwardRef } from 'react'
import { exportElementAsPDF } from './Exporter'

const PreviewPanel = forwardRef(({ content }, ref) => {
  async function downloadPDF(){
    const el = window.document.getElementById('doc-preview');
    await exportElementAsPDF(el, 'document.pdf');
  }

  return (
    <div className="glass p-6 preview-panel" ref={ref}>
      <div className="flex justify-between items-center mb-4 preview-panel__header">
        <h3 className="font-semibold">Live Preview</h3>
        <button onClick={downloadPDF} className="text-sm bg-blue-600 text-white px-3 py-1 rounded">Download PDF</button>
      </div>
      <div id="doc-preview" className="doc-preview preview-panel__content scrollbar-hidden">
        {content ? (
          <pre className="whitespace-pre-wrap text-sm">{content}</pre>
        ) : (
          <div className="text-gray-500">No document yet. Fill details and click Generate.</div>
        )}
      </div>
    </div>
  )
})

export default PreviewPanel
