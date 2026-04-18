import React, { createContext, useContext, useEffect, useState } from 'react'

const LanguageContext = createContext()

export function LanguageProvider({ children }){
  const [language, setLanguage] = useState(()=>{
    try{
      const stored = localStorage.getItem('site_language')
      if(stored) return stored
      return 'en'
    }catch(e){
      return 'en'
    }
  })

  useEffect(()=>{
    try{ localStorage.setItem('site_language', language) }catch(e){}
  },[language])

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage(){ return useContext(LanguageContext) }
