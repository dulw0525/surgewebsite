"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { zhCN, type Translations } from './locales/zh-CN'
import { zhTW } from './locales/zh-TW'
import { en } from './locales/en'

export type Locale = 'zh-CN' | 'zh-TW' | 'en'

const locales: Record<Locale, Translations> = {
  'zh-CN': zhCN,
  'zh-TW': zhTW,
  'en': en,
}

export const languages: { code: Locale; label: string }[] = [
  { code: 'zh-CN', label: '简体中文' },
  { code: 'zh-TW', label: '繁體中文' },
  { code: 'en', label: 'English' },
]

interface I18nContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: Translations
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('zh-CN')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedLocale = localStorage.getItem('locale') as Locale
    if (savedLocale && locales[savedLocale]) {
      setLocaleState(savedLocale)
    }
  }, [])

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
    localStorage.setItem('locale', newLocale)
    document.documentElement.lang = newLocale
  }

  const t = locales[locale]

  // Prevent hydration mismatch by returning default locale on server
  if (!mounted) {
    return (
      <I18nContext.Provider value={{ locale: 'zh-CN', setLocale, t: zhCN }}>
        {children}
      </I18nContext.Provider>
    )
  }

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider')
  }
  return context
}
