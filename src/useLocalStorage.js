import { useEffect, useState } from 'react'

// Robust localStorage hook:
// - JSON serialize/parse
// - try/catch for private mode/quota errors
// - cross-tab sync via 'storage' event
export function useLocalStorage(key, initialValue) {
  const readValue = () => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch {
      return initialValue
    }
  }

  const [value, setValue] = useState(readValue)

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Ignore write errors (e.g., quota, privacy)
    }
  }, [key, value])

  // Sync across tabs/windows
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === key) setValue(readValue())
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [key])

  return [value, setValue]
}