import { BackTo } from '@/components/buttons/BackTo'
import { TicketForm } from '@/components/forms/ticketForm'
import { db, getTicketById } from '@/services/db'
import { useLocalSearchParams } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, SafeAreaView, ScrollView, Text } from 'react-native'

export default function EditTicket() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [ticket, setTicket] = useState<any>(null) // Adjust type as needed

  useEffect(() => {
    setIsLoading(true)
    async function fetchTicket() {
      setError(null)
      try {
        setTicket(await getTicketById({ id, db }))
      } catch (error) {
        setError('Error fetching ticket: ' + error)
      }
      setIsLoading(false)
    }
    fetchTicket()
  }, [])

  if (error) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <BackTo />
          <ActivityIndicator
            size="large"
            color="#FF3B30"
            style={{ marginTop: '80%', alignItems: 'center' }}
          />
          <Text style={{ color: 'red', textAlign: 'center', marginTop: 20 }}>
            {error}
          </Text>
        </ScrollView>
      </SafeAreaView>
    )
  }

  if (isLoading || !ticket) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <BackTo />
          <ActivityIndicator
            size="large"
            color="#007AFF"
            style={{ marginTop: '80%', alignItems: 'center' }}
          />
        </ScrollView>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <BackTo />
        <TicketForm editMode={true} initialData={ticket} />
      </ScrollView>
    </SafeAreaView>
  )
}
