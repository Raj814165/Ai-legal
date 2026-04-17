import React, { useState, useRef } from 'react'
import { Download } from 'lucide-react'
import { exportElementAsPDF } from './Exporter'
import EditableDocument from './EditableDocument'

export default function DocumentPreview({ initialContent='' }){
  const [content, setContent] = useState(initialContent || 'No document generated yet.')
  const previewRef = useRef()

  async function handleDownload(){
    const el = document.getElementById('workspace-doc-preview')
    await exportElementAsPDF(el, 'legal-document.pdf')
  }

  return (
    <div className="glass p-4">
      <div className="flex items-center justify-between mb-4 doc-toolbar">
        <div>
          <div className="text-sm font-semibold">Document Preview</div>
          <div className="text-xs muted">Formatted legal document — editable</div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={handleDownload} className="btn-ghost flex items-center gap-2"><Download size={16}/> Download PDF</button>
        </div>
      </div>

      <div id="workspace-doc-preview" className="doc-preview" ref={previewRef}>
        <EditableDocument initial={content} onChange={setContent} />
      </div>
    </div>
  )
}
