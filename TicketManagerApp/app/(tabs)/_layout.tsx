import { getMyTickets } from '@/services/db'
import { TicketType } from '@/types/ticket'
import { TicketContext } from '@/utils/TicketContext'
import { Ionicons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import React from 'react'

export default function TabsLayout() {
  const [isLoading, setIsLoading] = React.useState(true)
  const [tickets, setTickets] = React.useState<TicketType[]>([])

  async function loadTickets() {
    setIsLoading(true)
    try {
      const data = await getMyTickets()
      const newTickets = data.map((ticket) => {
        const t = ticket as TicketType
        return {
          ...t,
          title: t.title,
          status: t.status,
          priority: t.priority,
          category: t.category,
        }
      })
      setTickets(newTickets)
    } catch (error) {
      console.error('Error loading tickets:', error)
      alert('Error loading tickets. Please try again later.')
    }
    setIsLoading(false)
  }

  React.useEffect(() => {
    loadTickets()
  }, [])

  return (
    <TicketContext.Provider value={{ isLoading, tickets, loadTickets }}>
      <Tabs screenOptions={{ headerShown: false }}>
        <Tabs.Screen
          name="home"
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="(tickets)"
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="ticket" size={size} color={color} />
            ),
            title: 'Tickets',
          }}
        />
      </Tabs>
    </TicketContext.Provider>
  )
}
