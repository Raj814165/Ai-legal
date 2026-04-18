import React from 'react'
import { useParams } from 'react-router-dom'
import Chat from '../components/Chat'
import DocumentPreview from '../components/DocumentPreview'

export default function Workspace(){
  const { type } = useParams()

  return (
    <div className="min-h-screen p-10 grid grid-cols-12 gap-8">
      <div className="col-span-5">
        <div className="text-sm uppercase text-primaryDark mb-2">Chat intake</div>
        <Chat />
      </div>

      <div className="col-span-7">
        <div className="text-sm uppercase text-primaryDark mb-2">Preview</div>
        <DocumentPreview content={`Template: ${type || 'Generic'}\n\n(Generated document will appear here)`} />
      </div>
    </div>
  )
}
