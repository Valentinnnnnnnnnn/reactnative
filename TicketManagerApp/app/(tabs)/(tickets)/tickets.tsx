import { CreateTicket } from '@/components/buttons/CreateTicket'
import { Ticket } from '@/components/ui/Ticket'
import { db, getMyTickets } from '@/services/db'
import { TicketType } from '@/types/ticket'
import { useRouter } from 'expo-router'
import React from 'react'
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler'

export default function Home() {
  const [tickets, setTickets] = React.useState<TicketType[]>([])
  React.useEffect(() => {
    async function loadTickets() {
      try {
        const data = await getMyTickets(db)
        setTickets(
          data.map((ticket) => {
            const t = ticket as TicketType
            return {
              ...t,
              title: t.title,
              status: t.status,
              priority: t.priority,
              category: t.category,
            }
          })
        )
        console.log('Tickets loaded:', data)
      } catch (error) {
        console.error('Error loading tickets:', error)
      }
    }
    loadTickets()
  }, [])

  const router = useRouter()
  function redirectfun() {
    router.push('./create')
  }

  return (
    <>
      <CreateTicket redirect={redirectfun} />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <FlatList
          data={tickets}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <Ticket {...item} />}
          contentContainerStyle={{ padding: 16 }}
          style={{ top: 60 }}
        />
      </GestureHandlerRootView>
    </>
  )
}
