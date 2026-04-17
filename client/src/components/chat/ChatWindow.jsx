import React, { useEffect, useRef, useState } from 'react'
import MessageBubble from './MessageBubble'
import ChatInput from './ChatInput'

export default function ChatWindow({ onAnswersChange }){
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Hello — I can help you create a formal legal document. Which template would you like to use?', time: new Date().toLocaleTimeString() }
  ])
  const containerRef = useRef()

  useEffect(()=>{
    containerRef.current?.scrollTo({ top: containerRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages])

  function handleSend(text){
    const userMsg = { role: 'user', text, time: new Date().toLocaleTimeString() }
    setMessages(m=>[...m, userMsg])
    // propagate answers as simple key-value placeholder for workspace
    if(onAnswersChange) onAnswersChange({ lastUserInput: text })

    // mock AI reply
    setTimeout(()=>{
      setMessages(m=>[...m, { role: 'ai', text: 'Thanks — I have noted this and will draft the document accordingly.', time: new Date().toLocaleTimeString() }])
    }, 800)
  }

  return (
    <div className="glass p-4 chat-panel">
      <div ref={containerRef} className="messages flex-1">
        {messages.map((m, i)=> <MessageBubble key={i} msg={m} />)}
      </div>
      <ChatInput onSend={handleSend} />
    </div>
  )
}
