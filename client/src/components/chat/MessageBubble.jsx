import React from 'react'

export default function MessageBubble({ msg }){
  const isUser = msg.role === 'user'
  return (
    <div className={`message ${isUser ? 'user ml-auto' : 'ai'}`}>
      <div className="text-sm">{msg.text}</div>
      <div className="text-xs muted mt-1">{msg.time}</div>
    </div>
  )
}
