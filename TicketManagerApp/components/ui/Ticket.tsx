import { TicketType } from '@/types/ticket'
import { useRouter } from 'expo-router'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import {
  categoryColors,
  priorityColors,
  statusColors,
} from '../../constants/Colors'

export function Ticket({ id, title, status, priority, category }: TicketType) {
  const router = useRouter()

  const onPress = () => {
    router.push(`/(tickets)/${id}/details`)
  }

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.row}>
        <View style={[styles.badge, { backgroundColor: statusColors[status] }]}>
          <Text style={styles.badgeText}>{status.toUpperCase()}</Text>
        </View>
        <View
          style={[styles.badge, { backgroundColor: priorityColors[priority] }]}
        >
          <Text style={styles.badgeText}>{priority.toUpperCase()}</Text>
        </View>
        <View
          style={[styles.badge, { backgroundColor: categoryColors[category] }]}
        >
          <Text style={styles.badgeText}>{category.toUpperCase()}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    // Shadows for iOS
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    // Elevation for Android
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  badge: {
    flex: 1,
    marginHorizontal: 4,
    paddingVertical: 6,
    borderRadius: 12,
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
  },
})
