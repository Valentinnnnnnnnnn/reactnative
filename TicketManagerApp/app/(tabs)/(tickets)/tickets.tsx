import { CreateTicket } from '@/components/buttons/CreateTicket'
import { Ticket } from '@/components/ui/Ticket'
import { db, getMyTickets } from '@/services/db'
import { TicketType } from '@/types/ticket'
import React from 'react'
import { RefreshControl } from 'react-native'
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler'

export default function Home() {
  const [tickets, setTickets] = React.useState<TicketType[]>([])
  const [refreshing, setRefreshing] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(true)

  async function loadTickets() {
    setTickets([])
    setIsLoading(true)
    try {
      const data = await getMyTickets()
      setTickets((prevTickets) => {
        return data.map((ticket) => {
          const t = ticket as TicketType
          return {
            ...t,
            title: t.title,
            status: t.status,
            priority: t.priority,
            category: t.category,
          }
        })
      })
    } catch (error) {
      console.error('Error loading tickets:', error)
      alert('Error loading tickets. Please try again later.')
    }
    setIsLoading(false)
  }

  // Load tickets when the component mounts
  React.useEffect(() => {
    loadTickets()
  }, [])

  if (refreshing || isLoading) {
    return (
      <GestureHandlerRootView
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <RefreshControl
          refreshing={true}
          onRefresh={loadTickets}
          colors={['grey']}
          progressBackgroundColor={'black'}
        />
      </GestureHandlerRootView>
    )
  }

  return (
    <>
      <CreateTicket />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <FlatList
          data={tickets}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <Ticket {...item} />}
          contentContainerStyle={{ padding: 16 }}
          style={{ top: 60 }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={loadTickets}
              colors={['grey']}
              progressBackgroundColor={'black'}
            />
          }
        />
      </GestureHandlerRootView>
    </>
  )
}
