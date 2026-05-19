import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { Country } from './types'

const STORAGE_KEY = 'oilcycle.country'

interface CountryState {
  country: Country
  setCountry: (c: Country) => void
}

const CountryContext = createContext<CountryState | null>(null)

function readInitial(): Country {
  if (typeof window === 'undefined') return 'IE'
  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored === 'IE' || stored === 'UK') return stored
  const lang = window.navigator.language.toLowerCase()
  if (lang.includes('gb') || lang.includes('en-uk')) return 'UK'
  return 'IE'
}

export function CountryProvider({ children }: { children: ReactNode }) {
  const [country, setCountryState] = useState<Country>(readInitial)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, country)
  }, [country])

  return (
    <CountryContext.Provider value={{ country, setCountry: setCountryState }}>
      {children}
    </CountryContext.Provider>
  )
}

export function useCountry(): CountryState {
  const v = useContext(CountryContext)
  if (!v) throw new Error('useCountry must be used inside CountryProvider')
  return v
}
