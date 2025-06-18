import { AuthContext } from '@/utils/AuthProvider'
import { useContext } from 'react'

export function useAuth() {
  return useContext(AuthContext)
}
