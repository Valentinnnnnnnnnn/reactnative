import { useColorScheme } from '@/hooks/useColorScheme'
import AuthProvider from '@/utils/AuthProvider'
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native'
import { Tabs } from 'expo-router'
import React from 'react'

export default function RootLayout() {
  const colorScheme = useColorScheme()

  return (
    <AuthProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarStyle: { display: 'none' },
          }}
        >
          <Tabs.Screen name="tickets" options={{ title: 'Tickets' }} />
          <Tabs.Screen name="create" options={{ title: 'Create' }} />
          <Tabs.Screen
            name="[id]/details"
            options={{ title: 'Ticket Detail' }}
          />
        </Tabs>
      </ThemeProvider>
    </AuthProvider>
  )
}
