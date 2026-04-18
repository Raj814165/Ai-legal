import React, { useEffect, useRef, useState } from 'react'
import MessageBubble from './MessageBubble'
import ChatInput from './ChatInput'
import { useTranslation } from '../../i18n'

export default function ChatWindow({ onAnswersChange }){
  const { t } = useTranslation()
  const [messages, setMessages] = useState([
    { role: 'ai', text: t('chat.welcome'), time: new Date().toLocaleTimeString() }
  ])
  const [isTyping, setIsTyping] = useState(false)
  const containerRef = useRef()

  useEffect(()=>{
    containerRef.current?.scrollTo({ top: containerRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, isTyping])

  function handleSend(text){
    const userMsg = { role: 'user', text, time: new Date().toLocaleTimeString() }
    setMessages(m=>[...m, userMsg])
    if(onAnswersChange) onAnswersChange({ lastUserInput: text })

    // show typing indicator, then push AI reply
    setIsTyping(true)
    setTimeout(()=>{
      const aiMsg = { role: 'ai', text: t('chat.ai_acknowledge'), time: new Date().toLocaleTimeString() }
      setIsTyping(false)
      setMessages(m=>[...m, aiMsg])
    }, 900)
  }

  return (
    <div className="glass p-4 chat-panel">
      <div ref={containerRef} className="messages flex-1">
        {messages.map((m, i)=> <MessageBubble key={i} msg={m} />)}
        {isTyping ? (
          <div className="message ai typing">
            <div className="typing-indicator">
              <span className="typing-dot" />
              <span className="typing-dot" />
              <span className="typing-dot" />
            </div>
          </div>
        ) : null}
      </div>
      <ChatInput onSend={handleSend} disabled={isTyping} />
    </div>
  )
}
