import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import ChatWindow from '../components/chat/ChatWindow'
import DocumentPreview from '../components/document/DocumentPreview'
import { motion } from 'framer-motion'

const titleMap = { rti: 'RTI Application', fir: 'FIR Draft', complaint: 'Consumer Complaint' }

export default function Workspace(){
  const { type } = useParams()
  const [answers, setAnswers] = useState({})

  return (
    <motion.div initial={{opacity:0, y:6}} animate={{opacity:1,y:0}} className="grid md:grid-cols-3 gap-6">
      <div className="md:col-span-1">
        <div className="text-sm muted mb-2">Template</div>
        <div className="text-2xl font-bold card-title mb-4">{titleMap[type] || 'Document'}</div>
        <ChatWindow onAnswersChange={setAnswers} />
      </div>

      <div className="md:col-span-2">
        <DocumentPreview initialContent={`Template: ${titleMap[type] || ''}\n\n(Generated document will appear here)`} />
      </div>
    </motion.div>
  )
}
