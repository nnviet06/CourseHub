import { createContext } from 'react'
import type { User } from '../types/userTypes'

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: Error | null;
  login: (username: string, password: string) => Promise<void>;
}

const defaultAuthContext = {
  user: null,
  loading: true,
  error: null,
  login: async () => { }
}

const AuthContext = createContext<AuthContextType>(defaultAuthContext)

export default AuthContext

