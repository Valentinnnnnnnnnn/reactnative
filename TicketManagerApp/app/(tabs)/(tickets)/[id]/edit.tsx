import { BackTo } from '@/components/buttons/BackTo'
import { TicketForm } from '@/components/forms/ticketForm'
import { getTicketById } from '@/services/db'
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
        setTicket(await getTicketById({ id }))
      } catch (error) {
        setError('Error fetching ticket: ' + error)
      }
      setIsLoading(false)
    }
    fetchTicket()
  }, [id])

  if (error) {
    return (
      <>
        <BackTo />
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
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
      </>
    )
  }

  if (isLoading || !ticket) {
    return (
      <>
        <BackTo />
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <ActivityIndicator
              size="large"
              color="#007AFF"
              style={{ marginTop: '80%', alignItems: 'center' }}
            />
          </ScrollView>
        </SafeAreaView>
      </>
    )
  }

  return (
    <>
      <BackTo />
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <TicketForm editMode={true} initialData={ticket} />
        </ScrollView>
      </SafeAreaView>
    </>
  )
}
