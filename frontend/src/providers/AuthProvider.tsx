import { useEffect, useState } from 'react'    // Add useEffect
import type { User } from '@/types/userTypes'
import AuthContext from '@/contexts/AuthContext'
import { login as loginService, getCurrentUser } from '@/services/authService'


const AuthProvider = ({ children }: { children: React.ReactNode }) => {

  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState<boolean>(true)   // Start true for initial check
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    getCurrentUser()
      .then(setUser)
      .catch(() => setError(null))
      .finally(() => setLoading(false))
  }, [])

  const login = async (username: string, password: string): Promise<void> => {
    setLoading(true)
    setError(null)
    try {
      const userData = await loginService(username, password)
      setUser(userData)
    } catch (err) {
      setError(err as Error)
    } finally {
      setLoading(false)
    }
  }
  return (
    <AuthContext.Provider value={{ user, loading, error, login }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
