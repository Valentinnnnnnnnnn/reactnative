import { TicketType } from '@/types/ticket'
import { useRouter } from 'expo-router'
import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

export function Ticket({ id, title, status, priority, category }: TicketType) {
  const router = useRouter()

  return (
    <TouchableOpacity
      style={{
        padding: 16,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginVertical: 8,
      }}
      onPress={() => {
        router.push(`/(tickets)/${id}`)
      }}
    >
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 4 }}>
        {title}
      </Text>
      <Text>Status: {status}</Text>
      <Text>Priority: {priority}</Text>
      <Text>Category: {category}</Text>
    </TouchableOpacity>
  )
}
