import { useColorScheme } from '@/hooks/useColorScheme'
import AuthProvider from '@/utils/AuthProvider'
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native'
import React from 'react'
import Tickets from './tickets'

export default function RootLayout() {
  const colorScheme = useColorScheme()

  return (
    <AuthProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Tickets />
      </ThemeProvider>
    </AuthProvider>
  )
}
