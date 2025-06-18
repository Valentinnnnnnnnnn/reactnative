import { useAuth } from '@/utils/AuthProvider'
import { useRouter } from 'expo-router'
import React from 'react'
import Login from './login'

type Props = {}

function Index({}: Props) {
  return <Login></Login>
}

export default Index
