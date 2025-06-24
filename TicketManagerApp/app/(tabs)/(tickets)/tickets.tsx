import { CreateTicket } from '@/components/buttons/CreateTicket'
import { Ticket } from '@/components/ui/Ticket'
import { TicketContext } from '@/utils/TicketContext'
import React, { useCallback, useContext, useState } from 'react'
import { ActivityIndicator, RefreshControl, Text, View } from 'react-native'
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler'

export default function Home() {
  const { tickets, isLoading, loadTickets } = useContext(TicketContext)

  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = useCallback(async () => {
    setRefreshing(true)
    await loadTickets()
    setRefreshing(false)
  }, [loadTickets])

  if (isLoading && tickets.length === 0) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#f0f0f0',
        }}
      >
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={{ marginTop: 16, fontSize: 16, color: '#333' }}>
          Chargement...
        </Text>
      </View>
    )
  }

  return (
    <>
      <CreateTicket />
      <GestureHandlerRootView style={{ flex: 1, backgroundColor: '#fff' }}>
        <FlatList
          data={tickets}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <Ticket {...item} />}
          ListHeaderComponent={<View style={{ height: 50 }} />}
          contentContainerStyle={{
            padding: 20,
            backgroundColor: '#fff',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}
          style={{ flex: 1 }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#555']}
              progressBackgroundColor={'#fff'}
              progressViewOffset={70}
            />
          }
        />
      </GestureHandlerRootView>
    </>
  )
}
