import React, { useState } from 'react'
import { Send } from 'lucide-react'

export default function ChatInput({ onSend }){
  const [value, setValue] = useState('')
  function submit(){
    if(!value.trim()) return
    onSend(value.trim())
    setValue('')
  }
  return (
    <div className="mt-3 flex gap-2 items-center">
      <input value={value} onChange={e=>setValue(e.target.value)} onKeyDown={e=> e.key==='Enter' && submit()} placeholder="Describe your issue or provide details..." className="flex-1 form-input" />
      <button onClick={submit} className="btn-primary flex items-center gap-2"><Send size={16}/> Send</button>
    </div>
  )
}
