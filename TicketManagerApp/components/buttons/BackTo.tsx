import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

export function BackTo() {
  const navigation = useNavigation()
  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={{
        alignSelf: 'flex-start',
        width: '100%',
        backgroundColor: 'transparent',
      }}
    >
      <Text
        style={{
          textAlign: 'left',
          paddingTop: 60,
          color: '#007AFF',
          fontSize: 16,
          paddingBottom: 10,
          paddingHorizontal: 10,
        }}
      >
        {'< Back to tickets'}
      </Text>
    </TouchableOpacity>
  )
}
