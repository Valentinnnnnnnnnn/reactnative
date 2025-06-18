import { TicketType } from '@/types/ticket'
import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

export function Ticket({ id, title, status, priority, category }: TicketType) {
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
        console.log('Redirecting to ticket with id:', id)
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
