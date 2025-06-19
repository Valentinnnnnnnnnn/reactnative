import { BackTo } from '@/components/buttons/BackTo'
import { TicketDetails } from '@/components/ui/TicketDetails'
import { db, getTicketById } from '@/services/db'
import { TicketType } from '@/types/ticket'
import { useLocalSearchParams } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Text, View } from 'react-native'

export default function TicketDetail() {
  const [details, setDetails] = useState<TicketType | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { id } = useLocalSearchParams<{ id: string }>()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchTicket() {
      setIsLoading(true)
      try {
        const ticket = await getTicketById({ id })
        setDetails(ticket)
      } catch (error) {
        setError('Error fetching ticket' + error)
      } finally {
        setIsLoading(false)
      }
    }
    if (!details) {
      fetchTicket()
    }
  }, [id])

  if (isLoading || !details) {
    return (
      <View style={{ flex: 1, marginTop: 60 }}>
        <BackTo />
        <ActivityIndicator
          size="large"
          color="#007AFF"
          style={{ marginTop: '80%', alignItems: 'center' }}
        />
      </View>
    )
  }

  if (error) {
    return (
      <View style={{ flex: 1, marginTop: 60 }}>
        <BackTo />
        <Text style={{ color: 'red', textAlign: 'center', marginTop: 20 }}>
          {error}
        </Text>
      </View>
    )
  }

  return <TicketDetails ticketData={details} />
}
