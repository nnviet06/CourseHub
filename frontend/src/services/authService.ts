import api from './api'
import { Role } from '../types/userTypes'


export const signup = async (username: string, password: string, role: Role) => {
  try {
    const response = await api.post('/api/auth/signup', { username, password, role })
    return response.data
  } catch (error) {
    throw error
  }
}

export const login = async (username: string, password: string) => {
  try {
    const response = await api.post('/api/auth/login', { username, password })
    return response.data
  } catch (error) {
    throw error
  }
}



