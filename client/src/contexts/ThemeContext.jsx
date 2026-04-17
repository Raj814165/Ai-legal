import React, { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext()

export function ThemeProvider({ children }){
  const [theme, setTheme] = useState(()=>{
    try{
      const stored = localStorage.getItem('theme')
      if(stored) return stored
      const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches
      return prefersLight ? 'light' : 'dark'
    }catch(e){
      return 'dark'
    }
  })

  useEffect(()=>{
    const root = document.documentElement
    root.classList.remove('theme-light','theme-dark')
    root.classList.add(`theme-${theme}`)
    try{ localStorage.setItem('theme', theme) }catch(e){}
  },[theme])

  function toggleTheme(){ setTheme(t => t === 'light' ? 'dark' : 'light') }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme(){ return useContext(ThemeContext) }
