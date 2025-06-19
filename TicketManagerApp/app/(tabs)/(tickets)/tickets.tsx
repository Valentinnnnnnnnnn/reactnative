import { CreateTicket } from '@/components/buttons/CreateTicket'
import { Ticket } from '@/components/ui/Ticket'
import { TicketContext } from '@/utils/TicketContext'
import React, { useContext } from 'react'
import { RefreshControl } from 'react-native'
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler'

export default function Home() {
  const { tickets, isLoading, loadTickets } = useContext(TicketContext)
  const [refreshing, setRefreshing] = React.useState(false)

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
              enabled={!isLoading}
              progressViewOffset={30}
            />
          }
        />
      </GestureHandlerRootView>
    </>
  )
}
