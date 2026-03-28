import api from './api'
import type { Role, User } from '../types/userTypes'

export const signup = async (username: string, password: string, role: Role) => {
  try {
    const response = await api.post('/api/auth/signup', { username, password, role })
    return response.data
  } catch (error) {
    throw error
  }
}

export const login = async (username: string, password: string): Promise<User> => {
  try {
    const response = await api.post('/api/auth/login', { username, password })
    return response.data as User
  } catch (error) {
    throw error
  }
}

export const getCurrentUser = async (): Promise<User> => {
  try {
    const response = await api.get('/api/users/current')
    return response.data as User
  } catch (error) {
    throw error
  }
}



