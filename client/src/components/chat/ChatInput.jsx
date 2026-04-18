import React, { useState } from 'react'
import { Send } from 'lucide-react'

export default function ChatInput({ onSend, disabled = false }){
  const [value, setValue] = useState('')
  function submit(){
    if(disabled) return
    if(!value.trim()) return
    onSend(value.trim())
    setValue('')
  }
  return (
    <div className="mt-3 flex gap-2 items-center">
      <input
        value={value}
        onChange={e=>setValue(e.target.value)}
        onKeyDown={e=> e.key==='Enter' && submit()}
        placeholder={disabled ? "Please wait..." : "Describe your issue or provide details..."}
        className={`flex-1 form-input ${disabled ? 'opacity-70' : ''}`}
        disabled={disabled}
      />
      <button onClick={submit} className="btn-primary flex items-center gap-2" disabled={disabled}>
        <Send size={16}/> {disabled ? 'Sending...' : 'Send'}
      </button>
    </div>
  )
}
