import React from 'react'
import ChatWindow from '../components/chat/ChatWindow'
import { useTranslation } from '../i18n'

export default function Chat(){
  const { t } = useTranslation()
  return (
    <div className="landing-shell py-6 md:py-8">
      <div className="glass p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="landing-kicker">{t('chat.assistant')}</div>
            <h1 className="landing-section__title">{t('chat.title')}</h1>
            <p className="muted mt-2 text-sm">{t('chat.subtitle')}</p>
          </div>
        </div>

        <div className="mt-4">
          <ChatWindow />
        </div>
      </div>
    </div>
  )
}
